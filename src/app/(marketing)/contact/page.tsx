import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { SlideUp } from "@/components/animations/SlideUp";

const { contact, company, socials } = siteConfig;

export const metadata: Metadata = {
  title: "Contact",
  description: contact.heading.subtitle ?? company.description,
};

/**
 * /contact — the enquiry form plus a "what helps us scope quickly" card.
 *
 * Only configured channels render: no email, phone, address, map or social
 * links are published until they are real and monitored, so nothing is
 * invented here. Every string comes from `siteConfig.contact`.
 */
export default function ContactPage() {
  const hasChannel = Boolean(
    contact.email || contact.phone || contact.address || contact.workingHours,
  );

  return (
    <>
      <PageHeader
        title={contact.heading.title}
        highlight={contact.heading.highlight}
        eyebrow={contact.heading.eyebrow}
        description={contact.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section id="contact" padding="lg">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <SlideUp>
              <Card className="p-6 sm:p-8">
                <ContactForm form={contact.form} />
              </Card>
            </SlideUp>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            {contact.guidance ? (
              <SlideUp delay={0.1}>
                <Card className="p-6">
                  <h2 className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
                    {contact.guidance.title}
                  </h2>
                  <ul className="mt-4 divide-y divide-border border-y border-border">
                    {contact.guidance.items.map((item) => (
                      <li
                        key={item}
                        className="py-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </SlideUp>
            ) : null}

            {hasChannel ? (
              <SlideUp delay={0.15}>
                <Card className="p-6">
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="block text-sm font-medium break-all text-foreground transition-colors hover:text-primary"
                    >
                      {contact.email}
                    </a>
                  ) : null}
                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                      className="mt-3 block text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {contact.phone}
                    </a>
                  ) : null}
                  {contact.address ? (
                    <address className="mt-3 text-sm text-muted-foreground not-italic">
                      {contact.address}
                    </address>
                  ) : null}
                </Card>
              </SlideUp>
            ) : null}

            {socials.length > 0 && contact.socialsLabel ? (
              <SlideUp delay={0.2}>
                <Card className="p-6">
                  <h2 className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
                    {contact.socialsLabel}
                  </h2>
                </Card>
              </SlideUp>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
