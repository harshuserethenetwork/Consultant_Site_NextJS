import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const { services, seo, hero } = siteConfig;

export const metadata: Metadata = {
  title: "Services",
  description: services.heading.subtitle ?? seo.description,
};

/**
 * Services index: one anchored section per category (`/services#back-office`),
 * each listing the services it contains as cards that link to their detail
 * route. Grouping, copy and links all come from `siteConfig.services`.
 *
 * Server Component.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title={services.heading.title}
        highlight={services.heading.highlight}
        eyebrow={services.heading.eyebrow}
        description={services.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <Section padding="sm">
        <nav aria-label="Service categories">
          <ul className="flex flex-wrap gap-2">
            {services.categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.anchor}`}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  <span className="font-mono text-xs text-primary">
                    {category.index}
                  </span>
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {services.categories.map((category) => {
        const items = services.items.filter(
          (service) => service.category === category.id,
        );

        return (
          <Section
            key={category.id}
            id={category.anchor}
            padding="sm"
            className={
              category.id === "process-advisory" ? "" : "border-t border-border"
            }
          >
            <SlideUp className="grid gap-6 border-b border-border pb-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-primary">
                    {category.index}
                  </span>
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {category.name}
                  </h2>
                </div>
              </div>

              <div className="lg:col-span-7">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {category.summary}
                </p>
                <p className="mt-3 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground/90 italic">
                  {category.problem}
                </p>
              </div>
            </SlideUp>

            <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => (
                <StaggerItem key={service.id} className="h-full">
                  <Link
                    href={service.href}
                    className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground/30"
                  >
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                      {service.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.shortDescription}
                    </p>

                    {services.linkLabel ? (
                      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-primary">
                        {services.linkLabel}
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Section>
        );
      })}

      <Section padding="md" className="border-t border-border">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <SectionHeading
            eyebrow={services.heading.eyebrow}
            title={services.intro ?? services.heading.title}
            as="h2"
            className="max-w-2xl"
          />
          <Link
            href={hero.primaryCta.href}
            target={hero.primaryCta.external ? "_blank" : undefined}
            rel={hero.primaryCta.external ? "noopener noreferrer" : undefined}
            className={buttonVariants({ size: "lg", className: "shrink-0" })}
          >
            {hero.primaryCta.label}
          </Link>
        </div>
      </Section>
    </>
  );
}
