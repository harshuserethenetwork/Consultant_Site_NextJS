"use client";

import { useState, type ReactNode } from "react";
import type { SelectHTMLAttributes } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleCheck, Send } from "lucide-react";
import { useForm, type Path } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input, fieldClasses } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/animations";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import type { ContactFormConfig } from "@/types/config";

/**
 * Native `<select>` sharing the same chrome as `Input`, so the two look
 * identical in both themes.
 */
function Select({
  id,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      id={id}
      className={cn(fieldClasses, "h-11 appearance-none pr-9", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A6878' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
      }}
      {...props}
    >
      {children}
    </select>
  );
}

/**
 * One labelled control: label on top, field, inline error underneath.
 * Every field id/error pairing keeps `aria-invalid` + `aria-describedby`
 * wired up (WCAG 3.3.1 — errors are identified and attached to their input).
 */
interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  note?: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, required, note, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-destructive">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
        {note ? (
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
            {`(${note})`}
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface ContactFormProps {
  form: ContactFormConfig;
}

/**
 * Contact form for /contact.
 *
 * Validation runs client-side (zod + react-hook-form, errors shown inline per
 * field) and again on the server in `src/app/api/contact/route.ts`. The API
 * can reply with `errors` keyed by field — those are merged back into the
 * form with `setError`, so server-side rejections look exactly like local
 * ones.
 */
export function ContactForm({ form }: ContactFormProps) {
  const reduced = useReducedMotion() ?? false;
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      needs: "",
      teamSize: "",
      message: "",
      website: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: unknown = await response.json().catch(() => null);
      const payload =
        typeof data === "object" && data !== null
          ? (data as Record<string, unknown>)
          : {};

      if (response.ok) {
        reset();
        setStatus("success");
        return;
      }

      // 422 — schema rejected specific fields: surface them inline.
      if (payload.errors && typeof payload.errors === "object") {
        const fieldErrors = payload.errors as Record<string, string>;
        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field as Path<ContactFormValues>, { type: "server", message });
        });
        return;
      }

      // 429 / 500 — server message when present, generic copy otherwise.
      setSubmitError(
        typeof payload.error === "string" && payload.error.length > 0
          ? payload.error
          : form.errorMessage,
      );
    } catch {
      setSubmitError(form.errorMessage);
    }
  };

  const handleReset = () => {
    reset();
    setSubmitError(null);
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: EASE_OUT }}
        className="flex flex-col items-start gap-5 rounded-lg border border-success/40 bg-success/10 p-6 sm:p-8"
      >
        <span className="grid size-12 place-items-center rounded-full bg-success text-success-foreground">
          <CircleCheck className="size-6" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-foreground">{form.successTitle}</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            {form.successMessage}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={handleReset}>
          {form.resetLabel}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label={form.nameLabel}
          required
          error={errors.name?.message}
        >
          <Input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder={form.namePlaceholder}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
        </Field>

        <Field
          id="contact-email"
          label={form.emailLabel}
          required
          error={errors.email?.message}
        >
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
        </Field>

        <Field
          id="contact-phone"
          label={form.phoneLabel}
          note={form.phoneNote}
          error={errors.phone?.message}
        >
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder={form.phonePlaceholder}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            {...register("phone")}
          />
        </Field>

        <Field id="contact-company" label={form.companyLabel} note="Optional">
          <Input
            id="contact-company"
            type="text"
            autoComplete="organization"
            placeholder={form.companyPlaceholder}
            {...register("company")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-needs" label={form.needsLabel}>
          <Select id="contact-needs" {...register("needs")}>
            <option value="">Select an option</option>
            {form.needsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        <Field id="contact-team-size" label={form.teamSizeLabel}>
          <Select id="contact-team-size" {...register("teamSize")}>
            <option value="">Select an option</option>
            {form.teamSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id="contact-message"
        label={form.messageLabel}
        required
        error={errors.message?.message}
      >
        <Textarea
          id="contact-message"
          rows={6}
          placeholder={form.messagePlaceholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
      </Field>

      {/* Honeypot — hidden from humans (and keyboards), tempting for bots. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <AnimatePresence initial={false}>
        {submitError ? (
          <motion.p
            key="submit-error"
            role="alert"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: EASE_OUT }}
            className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
          >
            {submitError}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingLabel={form.submittingLabel}
        >
          <Send className="size-4" aria-hidden="true" />
          {form.submitLabel}
        </Button>
      </div>
    </form>
  );
}

ContactForm.displayName = "ContactForm";
