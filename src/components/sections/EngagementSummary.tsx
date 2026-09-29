import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * Engagement summary: the published rate structure as four hairline cells,
 * the mandatory pricing caveat and the two CTAs. The full terms live on
 * /engagement — this is the abbreviated version for the home page.
 *
 * Server Component — content comes from `siteConfig.engagement`.
 */
export function EngagementSummary({
  id = "engagement",
  tone = "muted",
}: {
  /** Section anchor, e.g. "engagement". */
  id?: string;
  /** Background treatment. */
  tone?: "default" | "muted" | "card";
} = {}) {
  if (!siteConfig.features.engagement) return null;
  const { engagement } = siteConfig;

  return (
    <Section id={id} tone={tone} padding="md" className="border-b border-border">
      <Container>
        <SlideUp>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <SectionHeading {...engagement.heading} />
            <Link
              href="/engagement"
              className={buttonVariants({ variant: "outline", className: "shrink-0" })}
            >
              View engagement model
            </Link>
          </div>
        </SlideUp>

        <SlideUp delay={0.1}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {engagement.summary.map((row) => (
              <div key={row.label} className="bg-card px-6 py-6">
                <dt className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase">
                  {row.label}
                </dt>
                <dd className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {row.value}
                </dd>
                {row.note ? (
                  <dd className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {row.note}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </SlideUp>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {engagement.caveat}
          </p>

          <Link
            href={engagement.cta.href}
            className={buttonVariants({ className: "shrink-0" })}
          >
            {engagement.cta.label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}

EngagementSummary.displayName = "EngagementSummary";
