import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { MediaImage } from "@/components/ui/MediaImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * Condensed "who we are" block: story, values and a link to the full about
 * content. Text first in the DOM (mobile), image on the left at `lg`.
 * All copy comes from `siteConfig.about`.
 *
 * Server Component.
 */
export function AboutPreview() {
  if (!siteConfig.features.about) return null;
  const { about } = siteConfig;
  const paragraphs = about.story.slice(0, 2);

  return (
    <Section id="about" padding="lg">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <SlideUp className="flex flex-col gap-6">
            <SectionHeading {...about.heading} />

            <div className="space-y-4">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </SlideUp>

          <FadeIn delay={0.1}>
            {about.values.length > 0 ? (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {about.values.map((value) => (
                  <li
                    key={value.title}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <ConfigIcon name={value.icon} className="size-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {value.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            {about.cta ? (
              <Link
                href={about.cta.href}
                target={about.cta.external ? "_blank" : undefined}
                rel={about.cta.external ? "noopener noreferrer" : undefined}
                className={buttonVariants({
                  variant: "outline",
                  className: "group mt-8",
                })}
              >
                {about.cta.label}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ) : null}
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="relative lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-lg">
            <MediaImage image={about.image} sizes="(min-width: 1024px) 46vw, 100vw" />
          </div>

          {about.secondaryImage ? (
            <div className="absolute right-4 -bottom-6 hidden overflow-hidden rounded-xl border border-border bg-card shadow-xl sm:block lg:-right-6">
              <div className="relative aspect-[4/3] w-40 lg:w-48">
                <MediaImage image={about.secondaryImage} sizes="192px" />
              </div>
            </div>
          ) : null}
        </FadeIn>
      </div>
    </Section>
  );
}

AboutPreview.displayName = "AboutPreview";
