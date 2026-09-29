/**
 * Form validation schemas.
 *
 * One schema serves both sides of the wire:
 *   • Client — react-hook-form's `zodResolver` (inline field errors).
 *   • Server — the contact API route re-runs it before touching the inbox.
 *
 * Messages are part of the schema (not the UI) so both sides agree on them.
 */
import { z } from "zod";

/** Phone numbers we accept: optional, international or local, 7–20 digits. */
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.email("Enter a valid email address").max(254, "Email address is too long"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .refine(
      (value) => value === "" || PHONE_PATTERN.test(value),
      "Enter a valid phone number",
    )
    .optional(),
  company: z.string().trim().max(150, "Company name is too long").optional(),
  /** Which functions the enquiry covers — one of the configured options. */
  needs: z.string().trim().max(100).optional(),
  /** Approximate team size — one of the configured options. */
  teamSize: z.string().trim().max(100).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  /**
   * Honeypot — always empty for humans. The API short-circuits when it is
   * filled in; the schema keeps it that way if anyone bypasses the API check.
   */
  website: z.string().max(0, "This field must be empty").optional(),
});

/** Inferred form values used by react-hook-form (client) and the API (server). */
export type ContactFormValues = z.infer<typeof contactFormSchema>;
