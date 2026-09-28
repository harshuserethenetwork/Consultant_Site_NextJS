import Link from "next/link";
import { Check, X } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { PricingPlan } from "@/types/config";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Pricing plans. Renders nothing when `siteConfig.features.pricing` is false.
 * The highlighted plan gets a ring + the plan badge; exclusions are shown
 * struck through so nothing feels hidden.
 *
 * Server Component — all content comes from `siteConfig.pricing`.
 */
export function Pricing() {
  if (!siteConfig.features.pricing) return null;
  const { pricing } = siteConfig;
  if (pricing.plans.length === 0) return null;

  return (
    <Section id="pricing" padding="lg">
      <SlideUp className="flex justify-center">
        <SectionHeading {...pricing.heading} align="center" />
        {pricing.note ? (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {pricing.note}
          </p>
        ) : null}
      </SlideUp>

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3 lg:mt-14">
        {pricing.plans.map((plan) => (
          <StaggerItem key={plan.id} className="h-full">
            <PlanCard plan={plan} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {pricing.footnote || pricing.cta ? (
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          {pricing.footnote ? (
            <p className="text-sm text-muted-foreground">{pricing.footnote}</p>
          ) : null}

          {pricing.cta ? (
            <Link
              href={pricing.cta.href}
              target={pricing.cta.external ? "_blank" : undefined}
              rel={pricing.cta.external ? "noopener noreferrer" : undefined}
              className={buttonVariants({ variant: "outline" })}
            >
              {pricing.cta.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </Section>
  );
}

Pricing.displayName = "Pricing";

function PlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col p-6 sm:p-8",
        plan.highlighted && "border-primary/60 shadow-xl ring-2 ring-primary/20",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            {plan.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {plan.description}
          </p>
        </div>

        {plan.badge ? (
          <Badge
            variant="primary"
            className="shrink-0"
            icon={<ConfigIcon name={plan.badge.icon} className="size-3.5" />}
          >
            {plan.badge.label}
          </Badge>
        ) : null}
      </div>

      <div className="mt-6">
        <p className="flex items-baseline gap-1.5">
          <span className="font-heading text-4xl font-bold tracking-tight text-foreground">
            {formatPrice(plan.price.currency, plan.price.amount)}
          </span>
          {plan.price.period ? (
            <span className="text-sm font-medium text-muted-foreground">
              {plan.price.period}
            </span>
          ) : null}
        </p>
        {plan.price.note ? (
          <p className="mt-1 text-xs text-muted-foreground">{plan.price.note}</p>
        ) : null}
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.exclusions && plan.exclusions.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {plan.exclusions.map((exclusion) => (
            <li
              key={exclusion}
              className="flex items-start gap-2 text-sm text-muted-foreground/80 line-through"
            >
              <X className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{exclusion}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-6">
        <Link
          href={plan.cta.href}
          target={plan.cta.external ? "_blank" : undefined}
          rel={plan.cta.external ? "noopener noreferrer" : undefined}
          className={cn(
            buttonVariants({ variant: plan.highlighted ? "primary" : "outline" }),
            "w-full",
          )}
        >
          {plan.cta.label}
        </Link>
      </div>
    </Card>
  );
}
