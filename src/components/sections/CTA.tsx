import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * Full-width conversion band shown before the footer: solid primary colour,
 * no gradients, orbs or imagery — one headline, verified facts and the two
 * CTAs. The heading is styled by hand because `SectionHeading` assumes a
 * light background for its eyebrow and highlight.
 *
 * Server Component — all content comes from `siteConfig.cta`.
 */
export function CTA() {
  if (!siteConfig.features.cta) return null;
  const { cta } = siteConfig;

  return (
    <Section id="cta" bleed tone="primary" padding="lg">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SlideUp className="flex flex-col items-start gap-6 text-primary-foreground">
              {cta.eyebrow ? (
                <p className="text-xs font-semibold tracking-[0.18em] text-primary-foreground/70 uppercase">
                  {cta.eyebrow}
                </p>
              ) : null}

              <h2 className="max-w-3xl font-heading text-[1.875rem] leading-[1.15] font-semibold tracking-tight sm:text-[2.25rem] lg:text-[2.75rem]">
                {renderTitle(cta.title, cta.highlight)}
              </h2>

              <p className="max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
                {cta.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={cta.primaryCta.href}
                  target={cta.primaryCta.external ? "_blank" : undefined}
                  rel={cta.primaryCta.external ? "noopener noreferrer" : undefined}
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary",
                  })}
                >
                  {cta.primaryCta.label}
                </Link>

                {cta.secondaryCta ? (
                  <Link
                    href={cta.secondaryCta.href}
                    target={cta.secondaryCta.external ? "_blank" : undefined}
                    rel={cta.secondaryCta.external ? "noopener noreferrer" : undefined}
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className:
                        "border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                    })}
                  >
                    {cta.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </SlideUp>
          </div>

          {cta.bullets && cta.bullets.length > 0 ? (
            <div className="lg:col-span-5">
              <SlideUp delay={0.1}>
                <dl className="divide-y divide-primary-foreground/20 border-y border-primary-foreground/20">
                  {cta.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-baseline justify-between gap-6 py-4"
                    >
                      <dt className="flex items-center gap-2.5 text-sm text-primary-foreground/80">
                        <Check className="size-4 shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </dt>
                    </div>
                  ))}
                </dl>
              </SlideUp>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

CTA.displayName = "CTA";

/**
 * Splits the title on the highlighted words. On the primary band the highlight
 * becomes a small accent chip so it stays readable in both themes.
 */
function renderTitle(title: string, highlight?: string): ReactNode {
  if (!highlight || !title.includes(highlight)) return title;

  const parts = title.split(highlight);
  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <span className="rounded-sm bg-accent px-1.5 text-accent-foreground">
          {highlight}
        </span>
      ) : null}
    </Fragment>
  ));
}
