import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { cn } from "@/lib/utils";

/**
 * Grid of service cards (every entry of `siteConfig.services.items`) with the
 * section heading, the section CTA and a per-card link. Card content comes
 * from the config; the icons are resolved through <ConfigIcon>.
 *
 * Server Component.
 */
export function ServicesPreview() {
  if (!siteConfig.features.services) return null;
  const { services } = siteConfig;

  return (
    <Section id="services" tone="muted" padding="lg">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SlideUp>
          <SectionHeading {...services.heading} className="max-w-2xl" />
        </SlideUp>

        {services.cta ? (
          <SlideUp delay={0.1}>
            <Link
              href={services.cta.href}
              target={services.cta.external ? "_blank" : undefined}
              rel={services.cta.external ? "noopener noreferrer" : undefined}
              className={buttonVariants({ variant: "outline" })}
            >
              {services.cta.label}
            </Link>
          </SlideUp>
        ) : null}
      </div>

      <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
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
                          <ConfigIcon name={service.badge.icon} className="size-3.5" />
                        }
                      >
                        {service.badge.label}
                      </Badge>
                    ) : null}
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.shortDescription}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-border/60 pt-4">
                    {service.features.slice(0, 3).map((feature) => (
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
                    <p className="text-xs font-medium text-muted-foreground">{meta}</p>
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
    </Section>
  );
}

ServicesPreview.displayName = "ServicesPreview";
