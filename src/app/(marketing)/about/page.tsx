import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { ExperiencePrinciples } from "@/components/sections/ExperiencePrinciples";
import { CTA } from "@/components/sections/CTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";

const { about, seo } = siteConfig;

export const metadata: Metadata = {
  title: "About",
  description: about.heading.subtitle ?? seo.description,
};

/**
 * About: the company story, the management-experience block with operating
 * principles (its own section component, also used on the home page) and the
 * four engagement decisions, closed by the site CTA.
 *
 * Server Component — every string comes from `siteConfig.about`.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={about.heading.title}
        highlight={about.heading.highlight}
        eyebrow={about.heading.eyebrow}
        description={about.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* ------------------------------------------------------------- story */}
      <Section padding="md">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SlideUp>
              <SectionHeading {...about.story.heading} />
            </SlideUp>
          </div>

          <div className="lg:col-span-7">
            <SlideUp delay={0.1} className="flex flex-col gap-5">
              {about.story.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </SlideUp>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- experience */}
      <ExperiencePrinciples tone="muted" />

      {/* --------------------------------------------------------- approach */}
      <Section id="approach" padding="md" className="border-t border-border">
        <SlideUp>
          <SectionHeading {...about.approach.heading} />
        </SlideUp>

        <SlideUp delay={0.1}>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {about.approach.items.map((item, index) => (
              <li key={item.title} className="flex flex-col gap-3 bg-card p-6">
                <span className="font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </SlideUp>

        {about.cta ? (
          <div className="mt-8">
            <Link
              href={about.cta.href}
              className={buttonVariants({ variant: "outline" })}
            >
              {about.cta.label}
            </Link>
          </div>
        ) : null}
      </Section>

      <CTA />
    </>
  );
}
