import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";

const { company, seo } = siteConfig;

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${company.name} handles information submitted through this website.`,
};

/** Small heading used between policy sections. */
function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </p>
  );
}

/**
 * Privacy policy. Written for the way this site actually works: one enquiry
 * form, a local theme preference and no tracking. Update it before launch if
 * analytics, chat widgets or other scripts are added.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy policy"
        eyebrow="Legal"
        description={`What this website collects, why, and what it does not.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
      />

      <Section padding="lg">
        <div className="flex max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-4">
            <H2>Information you submit</H2>
            <P>
              This website has one form: the enquiry form on the contact page. When you
              send it, we receive the details you type in — your name, work email,
              optional phone number, optional company name, the functions you select,
              the approximate team size you select and your message. We use those
              details only to respond to your enquiry and to prepare the scoped
              engagement model you asked for.
            </P>
            <P>
              We do not sell, rent or trade your details, and we do not add you to a
              mailing list unless you ask to be added.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Technical data and cookies</H2>
            <P>
              This website does not use advertising, analytics or tracking cookies. Your
              colour-theme choice (light or dark) is stored in your own browser and is
              not sent to us. Standard server logs may record IP address, requested URL,
              browser and timestamp for security and debugging purposes, and are kept
              only as long as needed for that purpose.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Sharing and retention</H2>
            <P>
              Enquiry details are shared only with the people inside {company.name} who
              need them to answer you. Information is retained for as long as it is
              needed to handle the enquiry and any resulting engagement, and then
              deleted or anonymised.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Your choices</H2>
            <P>
              You can ask what information we hold about you, ask us to correct it, or
              ask us to delete it — subject to any records we must keep for legal or
              legitimate business reasons. Use the contact page and we will respond to
              the address you provide.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <H2>Changes to this policy</H2>
            <P>
              We will update this page when the way the site handles information
              changes. The date of the most recent update is shown below.
            </P>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().getFullYear()} · {seo.siteUrl}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
