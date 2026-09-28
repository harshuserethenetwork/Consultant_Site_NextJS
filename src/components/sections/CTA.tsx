import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * Full-width gradient banner shown before the footer. The heading is styled
 * by hand (not <SectionHeading>) because the eyebrow/highlight of that
 * component use `text-primary`, which would disappear on a primary background.
 *
 * Server Component — all content comes from `siteConfig.cta`.
 */
export function CTA() {
  if (!siteConfig.features.cta) return null;
  const { cta } = siteConfig;

  return (
    <Section id="cta" bleed tone="gradient" padding="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-24 right-[-8%] size-80 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-8%] size-96 rounded-full bg-accent/25 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SlideUp className="flex flex-col items-start gap-6 text-primary-foreground">
              {cta.eyebrow ? (
                <p className="text-sm font-semibold tracking-widest text-primary-foreground/80 uppercase">
                  {cta.eyebrow}
                </p>
              ) : null}

              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {renderTitle(cta.title, cta.highlight)}
              </h2>

              <p className="max-w-2xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
                {cta.description}
              </p>

              {cta.bullets && cta.bullets.length > 0 ? (
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {cta.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-sm font-medium text-primary-foreground"
                    >
                      <Check className="size-4 shrink-0" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

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
                        "border-primary-foreground/50 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                    })}
                  >
                    {cta.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </SlideUp>
          </div>

          {cta.image ? (
            <FadeIn delay={0.15} className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-primary-foreground/25">
                <MediaImage image={cta.image} sizes="(min-width: 1024px) 38vw, 100vw" />
              </div>
            </FadeIn>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

CTA.displayName = "CTA";

/**
 * Splits the title on the highlighted words. On the gradient the highlight
 * becomes a solid accent chip (readable in both themes) instead of the
 * `text-primary` span used on light sections.
 */
function renderTitle(title: string, highlight?: string): ReactNode {
  if (!highlight || !title.includes(highlight)) return title;

  const parts = title.split(highlight);
  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <span className="rounded-md bg-accent px-2 text-accent-foreground">
          {highlight}
        </span>
      ) : null}
    </Fragment>
  ));
}
