import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { cn } from "@/lib/utils";

const { services, seo, hero } = siteConfig;

export const metadata: Metadata = {
  title: "Services",
  description: services.heading.subtitle ?? seo.description,
};

/**
 * All services at a glance. Each card links to its detail route
 * (`service.href` → `/services/[slug]`); meta, features and badges come
 * straight from `siteConfig.services`.
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

      <Section padding="lg">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => {
            const meta = [service.startingPrice, service.timeline]
              .filter((part): part is string => Boolean(part))
              .join(" · ");

            return (
              <StaggerItem key={service.id} className="h-full">
                <Card
                  interactive
                  className={cn(
                    "group h-full",
                    service.featured && "border-primary/40 ring-1 ring-primary/15",
                  )}
                >
                  <div className="flex h-full flex-col p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ConfigIcon name={service.icon} className="size-5" />
                      </span>

                      {service.badge ? (
                        <Badge
                          variant="accent"
                          icon={
                            <ConfigIcon
                              name={service.badge.icon}
                              className="size-3.5"
                            />
                          }
                        >
                          {service.badge.label}
                        </Badge>
                      ) : null}
                    </div>

                    <h2 className="mt-5 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      <Link
                        href={service.href}
                        className="underline-offset-4 hover:text-primary hover:underline"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.shortDescription}
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-border/60 pt-4">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        {meta}
                      </p>
                      {services.linkLabel ? (
                        <Link
                          href={service.href}
                          className="group/link inline-flex items-center gap-1 text-sm font-medium text-primary"
                        >
                          {services.linkLabel}
                          <ArrowRight
                            className="size-4 transition-transform group-hover/link:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <SlideUp delay={0.1} className="mt-12 flex justify-center">
          <Link
            href={hero.primaryCta.href}
            target={hero.primaryCta.external ? "_blank" : undefined}
            rel={hero.primaryCta.external ? "noopener noreferrer" : undefined}
            className={buttonVariants({ size: "lg" })}
          >
            {hero.primaryCta.label}
          </Link>
        </SlideUp>
      </Section>
    </>
  );
}
