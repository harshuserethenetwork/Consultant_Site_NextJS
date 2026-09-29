import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * Process diagram: the five-step engagement lifecycle as a hairline grid of
 * numbered cells, read left to right on desktop and top to bottom on mobile.
 *
 * Server Component — content comes from `siteConfig.process`.
 */
export function ProcessDiagram({
  id = "process",
  tone = "muted",
  heading,
}: {
  /** Section anchor, e.g. "process". */
  id?: string;
  /** Background treatment (the home page uses muted, /how-we-work uses default). */
  tone?: "muted" | "default" | "card";
  /** Override the default `siteConfig.process.heading`. */
  heading?: typeof siteConfig.process.heading;
} = {}) {
  if (!siteConfig.features.process) return null;
  const { process } = siteConfig;
  const headingData = heading ?? process.heading;

  return (
    <Section id={id} tone={tone} padding="md">
      <Container>
        <SlideUp className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionHeading {...headingData} />
          {process.intro ? (
            <p className="max-w-md shrink-0 text-sm leading-relaxed text-muted-foreground lg:text-right">
              {process.intro}
            </p>
          ) : null}
        </SlideUp>

        <SlideUp delay={0.1}>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-5">
            {process.steps.map((step) => (
              <li key={step.index} className="flex flex-col gap-3 bg-card p-6">
                <span className="font-mono text-xs text-primary">{step.index}</span>
                <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </SlideUp>

        <div className="mt-8 flex flex-col gap-5 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          {process.note ? (
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {process.note}
            </p>
          ) : null}

          {process.cta ? (
            <Link
              href={process.cta.href}
              className={buttonVariants({
                variant: "outline",
                className: "shrink-0",
              })}
            >
              {process.cta.label}
            </Link>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

ProcessDiagram.displayName = "ProcessDiagram";
