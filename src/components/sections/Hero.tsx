import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";
import { siteConfig } from "@/config/site.config";

/**
 * Home hero: text-led headline and CTAs on the left, a code-built coverage
 * diagram on the right (no stock imagery, no orbs). The facts under the
 * headline and the diagram come straight from `siteConfig` — only verified
 * engagement terms are ever shown here.
 *
 * Server Component.
 */

function CoverageDiagram() {
  const { coverage, hero } = siteConfig;

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
        <span className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
          {hero.diagramLabel ?? coverage.heading.title}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {coverage.columns[0]}–{coverage.columns[coverage.columns.length - 1]}
        </span>
      </div>

      <div className="px-5 py-4">
        {coverage.bands.map((band, index) => (
          <div
            key={band.id}
            className={cn(
              "py-4",
              index > 0 && "border-t border-border",
              index === 0 && "pt-0",
              index === coverage.bands.length - 1 && "pb-0",
            )}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-foreground">{band.label}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {band.value}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-1.5">
              {coverage.columns.map((day) => {
                const covered = band.days.includes(day);
                return (
                  <div
                    key={day}
                    title={`${day}: ${covered ? band.value : "not covered"}`}
                    className={cn(
                      "flex h-9 items-center justify-center rounded-sm border text-[11px] font-medium",
                      covered
                        ? band.highlighted
                          ? "border-accent/60 bg-accent/15 text-accent-foreground dark:text-accent"
                          : "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground/60",
                    )}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-5 py-3.5">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="size-2.5 rounded-sm border border-primary/30 bg-primary/10"
            aria-hidden="true"
          />
          Standard window
        </span>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="size-2.5 rounded-sm border border-accent/60 bg-accent/15"
            aria-hidden="true"
          />
          Extended / 24/7 when scoped
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  if (!siteConfig.features.hero) return null;
  const { hero } = siteConfig;

  return (
    <Section id="hero" padding="lg" className="border-b border-border">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SlideUp className="flex flex-col items-start gap-6">
              {hero.eyebrow ? (
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  {hero.eyebrow}
                </p>
              ) : null}

              <h1 className="max-w-3xl font-heading text-[2.5rem] leading-[1.06] font-semibold tracking-tight sm:text-[3rem] lg:text-[3.5rem]">
                {hero.highlight && hero.title.includes(hero.highlight)
                  ? hero.title.split(hero.highlight).map((part, index, parts) => (
                      <span key={`${part}-${index}`}>
                        {part}
                        {index < parts.length - 1 ? (
                          <span className="text-primary">{hero.highlight}</span>
                        ) : null}
                      </span>
                    ))
                  : hero.title}
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={hero.primaryCta.href}
                  target={hero.primaryCta.external ? "_blank" : undefined}
                  rel={hero.primaryCta.external ? "noopener noreferrer" : undefined}
                  className={buttonVariants({ size: "lg" })}
                >
                  {hero.primaryCta.label}
                </Link>

                {hero.secondaryCta ? (
                  <Link
                    href={hero.secondaryCta.href}
                    target={hero.secondaryCta.external ? "_blank" : undefined}
                    rel={hero.secondaryCta.external ? "noopener noreferrer" : undefined}
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                  >
                    {hero.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </SlideUp>

            {hero.qualifiers && hero.qualifiers.length > 0 ? (
              <SlideUp delay={0.12}>
                <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                  {hero.qualifiers.map((qualifier) => (
                    <div key={qualifier.label} className="bg-card px-5 py-4">
                      <dt className="font-heading text-sm font-semibold text-foreground">
                        {qualifier.label}
                      </dt>
                      {qualifier.description ? (
                        <dd className="mt-1 text-xs text-muted-foreground">
                          {qualifier.description}
                        </dd>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </SlideUp>
            ) : null}
          </div>

          <div className="lg:col-span-5">
            <SlideUp delay={0.18}>
              <CoverageDiagram />
            </SlideUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}

Hero.displayName = "Hero";
