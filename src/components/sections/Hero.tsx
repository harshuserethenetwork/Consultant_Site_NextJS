import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * First screen of the home page: badge, headline, calls to action, proof
 * points and the hero image. Every string comes from `siteConfig.hero`.
 *
 * Server Component — the animations live in client wrappers imported above.
 */
export function Hero() {
  if (!siteConfig.features.hero) return null;
  const { hero } = siteConfig;

  return (
    <Section id="home" bleed className="overflow-hidden">
      <HeroBackground />

      <Container className="py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SlideUp className="flex flex-col items-start gap-6">
            {hero.badge ? (
              <Badge
                variant="secondary"
                icon={<ConfigIcon name={hero.badge.icon} className="size-4" />}
              >
                {hero.badge.label}
              </Badge>
            ) : null}

            <SectionHeading
              as="h1"
              eyebrow={hero.eyebrow}
              title={hero.title}
              highlight={hero.highlight}
              subtitle={hero.subtitle}
              className="max-w-2xl"
            />

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={hero.primaryCta.href}
                target={hero.primaryCta.external ? "_blank" : undefined}
                rel={hero.primaryCta.external ? "noopener noreferrer" : undefined}
                className={buttonVariants({ size: "lg", className: "group" })}
              >
                {hero.primaryCta.label}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              {hero.secondaryCta ? (
                <Link
                  href={hero.secondaryCta.href}
                  target={hero.secondaryCta.external ? "_blank" : undefined}
                  rel={hero.secondaryCta.external ? "noopener noreferrer" : undefined}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })}
                >
                  {hero.secondaryCta.label}
                </Link>
              ) : null}
            </div>

            {hero.highlights && hero.highlights.length > 0 ? (
              <ul className="grid w-full gap-3 sm:grid-cols-3">
                {hero.highlights.map((highlight) => (
                  <li
                    key={highlight.label}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <ConfigIcon name={highlight.icon} className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {highlight.label}
                      </p>
                      {highlight.description ? (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {highlight.description}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            {hero.trustNote ? (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star
                  className="size-4 shrink-0 fill-primary text-primary"
                  aria-hidden="true"
                />
                {hero.trustNote}
              </p>
            ) : null}
          </SlideUp>

          <FadeIn delay={0.15} className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent blur-2xl"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-2xl">
              {hero.image ? (
                <MediaImage
                  image={hero.image}
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              ) : (
                <HeroArtFallback />
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

Hero.displayName = "Hero";

/** Decorative backdrop: faint dot grid + two slowly drifting colour glows. */
function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,black,transparent)] [background-size:32px_32px] opacity-40" />
      <div className="absolute -top-24 right-[-10%] size-96 animate-float rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-[-25%] left-[-10%] size-[26rem] animate-float-slow rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/5 to-transparent" />
    </div>
  );
}

/** Shown only when the config has no hero image at all. */
function HeroArtFallback() {
  return (
    <div
      className="grid size-full place-items-center bg-gradient-to-br from-muted via-background to-primary/10"
      aria-hidden="true"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="size-7" />
      </span>
    </div>
  );
}
