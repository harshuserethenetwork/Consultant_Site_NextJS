import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

/**
 * POST /api/contact — receives the contact form submission.
 *
 * Order of defence (all four run before anything reaches the inbox):
 *   1. Rate limit  — in-memory, 5 attempts per 10 minutes per IP.
 *                    (Per-instance; swap for Redis/KV when you scale out.)
 *   2. Honeypot    — hidden "website" field must stay empty; when it is
 *                    filled we reply with a fake success so bots learn
 *                    nothing. (Checked on the raw body, before zod.)
 *   3. Validation  — the same zod schema the browser uses, re-run here so
 *                    crafted requests can never bypass it.
 *   4. Delivery    — sendEmail() at the bottom of this file; wire your
 *                    provider there (a commented Resend example is ready).
 */

/* ------------------------------- rate limit ------------------------------- */

const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX_ATTEMPTS = 5;
const attemptsByIp = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Records one attempt; returns how long to wait when the limit is hit. */
function rateLimit(ip: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (attemptsByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_MAX_ATTEMPTS) {
    attemptsByIp.set(ip, recent);
    const oldest = recent[0] ?? now;
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + RATE_WINDOW_MS - now) / 1000)),
    };
  }

  recent.push(now);
  attemptsByIp.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (attemptsByIp.size > 1000) {
    for (const [key, hits] of attemptsByIp) {
      const stillActive = hits.filter((t) => now - t < RATE_WINDOW_MS);
      if (stillActive.length === 0) attemptsByIp.delete(key);
      else attemptsByIp.set(key, stillActive);
    }
  }

  return { limited: false, retryAfterSeconds: 0 };
}

/* --------------------------------- handler -------------------------------- */

export async function POST(request: Request): Promise<Response> {
  // 1. Rate limit — cheapest check first.
  const { limited, retryAfterSeconds } = rateLimit(getClientIp(request));
  if (limited) {
    return Response.json(
      {
        ok: false,
        error:
          "Too many messages from your network. Please wait a few minutes and try again.",
      },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  // 2. Body — must be JSON.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // 3. Honeypot — pretend success so the bot cannot tell it was caught.
  const honeypot =
    typeof body === "object" && body !== null && "website" in body
      ? (body as { website: unknown }).website
      : undefined;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return Response.json({ ok: true });
  }

  // 4. Validation — map issues to { fieldName: message } for inline display.
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "");
      if (field && !(field in errors)) errors[field] = issue.message;
    }
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  // 5. Delivery.
  try {
    await sendEmail(parsed.data);
  } catch (error) {
    console.error("[contact] failed to send:", error);
    return Response.json(
      { ok: false, error: "We couldn't send your message. Please try again shortly." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}

/* ------------------------------- delivery --------------------------------- */

/**
 * sendEmail — THE PLACE TO PLUG IN YOUR EMAIL PROVIDER.
 *
 * Recipient comes from the environment (CONTACT_FORM_TO_EMAIL). Behaviour:
 *   • No RESEND_API_KEY  → logged to the console and treated as sent, so the
 *                          flow keeps working during local development.
 *   • RESEND_API_KEY set → CONTACT_FORM_TO_EMAIL becomes mandatory, then it
 *                          throws until you implement the provider below
 *                          (prevents silently "accepting" real mail in
 *                          production without delivery configured).
 *
 * With Resend (npm install resend), replace the body of this function with:
 *
 *   import { Resend } from "resend";
 *
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   const { error } = await resend.emails.send({
 *     from: process.env.CONTACT_FORM_FROM_EMAIL ?? "Nexora Website <onboarding@resend.dev>",
 *     to: [process.env.CONTACT_FORM_TO_EMAIL],
 *     replyTo: values.email,   // "Reply" lands straight in the sender's inbox
 *     subject: `[Contact] ${values.subject}`,
 *     text: [
 *       `Name:  ${values.name}`,
 *       `Email: ${values.email}`,
 *       values.phone ? `Phone: ${values.phone}` : null,
 *       "",
 *       values.message,
 *     ]
 *       .filter(Boolean)
 *       .join("\n"),
 *   });
 *   if (error) throw new Error(`Resend: ${error.message}`);
 *
 * SMTP/nodemailer works the same way: build a transporter, then
 * `await transporter.sendMail({ from, to, replyTo, subject, text })`.
 */
async function sendEmail(values: ContactFormValues): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    if (!process.env.CONTACT_FORM_TO_EMAIL) {
      console.warn(
        "[contact] CONTACT_FORM_TO_EMAIL is not set — configure it in .env.local (see .env.example).",
      );
    }
    console.info("[contact] RESEND_API_KEY not set — message logged instead of sent:", {
      ...values,
      website: undefined,
    });
    return;
  }

  if (!process.env.CONTACT_FORM_TO_EMAIL) {
    throw new Error(
      "CONTACT_FORM_TO_EMAIL is not set — add it to .env.local (see .env.example).",
    );
  }

  throw new Error(
    "sendEmail(): RESEND_API_KEY is set but no provider is implemented — follow the Resend example in this file.",
  );
}
