"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { NewsletterConfig } from "@/types/config";

/**
 * Email-only subscription form used in the footer.
 *
 * Validation runs in the browser with zod (identical rules could be re-used in
 * a server action later). There is no backend yet, so a successful submit
 * resolves after a short delay and swaps the form for the confirmation
 * message from `siteConfig.footer.newsletter.successMessage`.
 */
const newsletterSchema = z.object({
  email: z.email("Enter a valid email address"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export interface NewsletterFormProps {
  newsletter: NewsletterConfig;
}

export function NewsletterForm({ newsletter }: NewsletterFormProps) {
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = async () => {
    // Replace with a POST to your email provider when a backend exists.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubscribed(true);
    reset();
  };

  if (subscribed) {
    return (
      <p
        role="status"
        className="rounded-md border border-success/40 bg-success/10 px-4 py-3 text-sm font-medium text-success"
      >
        {newsletter.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder={newsletter.placeholder}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "newsletter-error" : "newsletter-disclaimer"}
          className="bg-background"
          {...register("email")}
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingLabel="Subscribing"
          className="shrink-0"
        >
          {newsletter.buttonText}
        </Button>
      </div>

      {errors.email ? (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-destructive">
          {errors.email.message}
        </p>
      ) : null}

      {newsletter.disclaimer ? (
        <p id="newsletter-disclaimer" className="mt-2 text-xs text-muted-foreground">
          {newsletter.disclaimer}
        </p>
      ) : null}
    </form>
  );
}

NewsletterForm.displayName = "NewsletterForm";
