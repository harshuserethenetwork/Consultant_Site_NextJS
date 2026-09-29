import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessDiagram } from "@/components/sections/ProcessDiagram";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { TechnologyBand } from "@/components/sections/TechnologyBand";
import { CTA } from "@/components/sections/CTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";

const { process } = siteConfig;

export const metadata: Metadata = {
  title: "How we work",
  description:
    "How a Process IQ Tech engagement runs: scoping, team formation, execution, quality and escalation, and continuous review.",
};

/**
 * How we work: the full engagement sequence, the weekly coverage diagram, the
 * quality and escalation block, and the platforms teams work in. Anchors
 * (#coverage, #quality, #technology) are referenced from the footer.
 *
 * Server Component — every string comes from `siteConfig`.
 */
export default function HowWeWorkPage() {
  const qualityStep = process.steps.find((step) =>
    step.title.toLowerCase().includes("quality"),
  );

  return (
    <>
      <PageHeader
        title={process.heading.title}
        highlight={process.heading.highlight}
        eyebrow={process.heading.eyebrow}
        description={process.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How we work" }]}
      />

      <ProcessDiagram
        id="process"
        tone="default"
        heading={{
          eyebrow: "The sequence",
          title: "Five steps, in order",
        }}
      />

      <CoverageSection id="coverage" />

      {/* ----------------------------------------------------------- quality */}
      <Section
        id="quality"
        tone="muted"
        padding="md"
        className="border-t border-border"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SlideUp>
                <SectionHeading
                  eyebrow="Quality & escalation"
                  title={qualityStep?.title ?? "Quality & escalation"}
                  subtitle={qualityStep?.description}
                />
              </SlideUp>
            </div>

            <div className="lg:col-span-7">
              <SlideUp delay={0.1}>
                <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {process.note}
                  </p>

                  <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                    {process.steps
                      .filter((step) => step !== qualityStep)
                      .map((step) => (
                        <div key={step.index} className="bg-background px-5 py-4">
                          <dt className="font-mono text-xs text-primary">
                            {step.index}
                          </dt>
                          <dd className="mt-2 text-sm font-medium text-foreground">
                            {step.title}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              </SlideUp>
            </div>
          </div>
        </Container>
      </Section>

      <TechnologyBand id="technology" tone="default" />

      <CTA />
    </>
  );
}
