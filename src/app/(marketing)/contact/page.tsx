import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const { contact, company, socials } = siteConfig;

export const metadata: Metadata = {
  title: "Contact",
  description: contact.heading.subtitle ?? company.description,
};

/**
 * /contact — four contact-method cards, the message form (client component,
 * POSTs to /api/contact), the embedded office map and social links.
 *
 * Every string comes from `siteConfig.contact`.
 */
export default function ContactPage() {
  // "San Francisco, California 94103" from the city/region/postalCode parts.
  const cityLine = [
    contact.region ? `${contact.city}, ${contact.region}` : contact.city,
    contact.postalCode,
  ]
    .filter(Boolean)
    .join(" ");

  const addressLines = [contact.address, cityLine, contact.country];
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  const infoCards = [
    {
      id: "email",
      icon: Mail,
      title: "Email",
      content: (
        <a
          href={`mailto:${contact.email}`}
          className="font-medium break-all text-foreground transition-colors hover:text-primary"
        >
          {contact.email}
        </a>
      ),
    },
    {
      id: "phone",
      icon: Phone,
      title: "Phone",
      content: (
        <a
          href={telHref}
          className="font-medium text-foreground transition-colors hover:text-primary"
        >
          {contact.phone}
        </a>
      ),
    },
    {
      id: "address",
      icon: MapPin,
      title: "Address",
      content: (
        <address className="not-italic">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
    },
    {
      id: "hours",
      icon: Clock,
      title: "Working hours",
      content: (
        <dl className="flex flex-col gap-1.5">
          {contact.workingHours.map((entry) => (
            <div
              key={entry.days}
              className="flex items-baseline justify-between gap-4 text-sm"
            >
              <dt className="text-muted-foreground">{entry.days}</dt>
              <dd
                className={
                  entry.closed ? "text-muted-foreground" : "font-medium text-foreground"
                }
              >
                {entry.hours}
              </dd>
            </div>
          ))}
        </dl>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={contact.heading.title}
        highlight={contact.heading.highlight}
        eyebrow={contact.heading.eyebrow}
        description={contact.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* -------------------------------------------------------- contact cards */}
      <Section id="contact" padding="md">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card) => (
            <StaggerItem key={card.id} className="h-full">
              <Card className="flex h-full flex-col gap-3.5 p-6">
                <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <card.icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                  {card.title}
                </h2>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {card.content}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ----------------------------------------- form + map + social links */}
      <Section tone="muted" padding="lg">
        <SlideUp className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <Card className="p-6 sm:p-8 lg:col-span-3">
            <ContactForm form={contact.form} />
          </Card>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card className="overflow-hidden">
              <iframe
                title="Google Maps — Nexora office"
                src={contact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-64 w-full border-0 sm:h-72"
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                {contact.socialsLabel}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {socials.map((social) => (
                  <li key={`${social.platform}-${social.url}`}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </SlideUp>
      </Section>
    </>
  );
}
