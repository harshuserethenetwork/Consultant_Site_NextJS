import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTA } from "@/components/sections/CTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";

const { engagement } = siteConfig;

export const metadata: Metadata = {
  title: "Engagement model",
  description:
    "The published Process IQ Tech engagement structure: $1,800 per employee per month, 5 employee minimum, 9 hrs/day standard coverage and the payment schedule.",
};

/** Hairline definition row: label on the left, value + note on the right. */
function TermRow({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="grid gap-2 px-6 py-5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6">
      <dt className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd>
        <span className="block font-heading text-base font-semibold text-foreground">
          {value}
        </span>
        {note ? (
          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
            {note}
          </span>
        ) : null}
      </dd>
    </div>
  );
}

/**
 * Engagement model: the commercial structure published in full — rate table,
 * what the rate includes, the payment schedule and the variables that move
 * the final price, closed by the mandatory caveat and the enquiry CTA.
 *
 * Server Component — every figure comes from `siteConfig.engagement`.
 */
export default function EngagementPage() {
  return (
    <>
      <PageHeader
        title={engagement.heading.title}
        highlight={engagement.heading.highlight}
        eyebrow={engagement.heading.eyebrow}
        description={engagement.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Engagement" }]}
      />

      {/* ------------------------------------------------------------ intro */}
      <Section padding="sm">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {engagement.intro}
        </p>
      </Section>

      {/* ----------------------------------------------------------- terms */}
      <Section id="terms" tone="muted" padding="md">
        <SlideUp>
          <SectionHeading
            eyebrow="Commercial terms"
            title="The structure, in full"
            subtitle="Everything the published rate depends on, before anyone from our side speaks to you."
          />
        </SlideUp>

        <SlideUp delay={0.1}>
          <dl className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
            {engagement.terms.map((term) => (
              <TermRow
                key={term.label}
                label={term.label}
                value={term.value}
                note={term.note}
              />
            ))}
          </dl>
        </SlideUp>

        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {engagement.caveat}
        </p>
      </Section>

      {/* --------------------------------------------------------- included */}
      <Section id="included" padding="md" className="border-b border-border">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SlideUp>
              <SectionHeading {...engagement.included.heading} />
            </SlideUp>
          </div>

          <div className="lg:col-span-7">
            <SlideUp delay={0.1}>
              <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {engagement.included.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-card px-6 py-4 text-sm text-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {engagement.included.note ? (
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {engagement.included.note}
                </p>
              ) : null}
            </SlideUp>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- payment */}
      <Section id="payment" tone="muted" padding="md">
        <SlideUp>
          <SectionHeading {...engagement.payment.heading} />
        </SlideUp>

        <SlideUp delay={0.1}>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
            {engagement.payment.steps.map((step) => (
              <li key={step.index} className="flex flex-col gap-3 bg-card p-6">
                <span className="font-mono text-xs text-primary">{step.index}</span>
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </SlideUp>

        {engagement.payment.note ? (
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {engagement.payment.note}
          </p>
        ) : null}
      </Section>

      {/* -------------------------------------------------------- variables */}
      <Section id="variables" padding="md" className="border-b border-border">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SlideUp>
              <SectionHeading {...engagement.variables.heading} />
            </SlideUp>
          </div>

          <div className="lg:col-span-7">
            <SlideUp delay={0.1}>
              <ol className="divide-y divide-border border-y border-border">
                {engagement.variables.items.map((item, index) => (
                  <li key={item} className="flex items-start gap-4 py-4">
                    <span className="font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>

              {engagement.variables.note ? (
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {engagement.variables.note}
                </p>
              ) : null}

              <div className="mt-8">
                <Link href={engagement.cta.href} className={buttonVariants()}>
                  {engagement.cta.label}
                </Link>
              </div>
            </SlideUp>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
