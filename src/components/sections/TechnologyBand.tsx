import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * Technology band: the platforms teams work in, shown as plain text names in
 * hairline blocks — never vendor logos — plus the required trademark note.
 *
 * Server Component — content comes from `siteConfig.technology`.
 */
export function TechnologyBand({
  id = "technology",
  tone = "card",
}: {
  /** Section anchor, e.g. "technology". */
  id?: string;
  /** Background treatment (home page uses card, /how-we-work uses default). */
  tone?: "card" | "default" | "muted";
} = {}) {
  if (!siteConfig.features.technology) return null;
  const { technology } = siteConfig;

  return (
    <Section id={id} tone={tone} padding="md" className="border-b border-border">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SlideUp className="flex flex-col gap-6">
              <SectionHeading {...technology.heading} />

              <p className="text-sm leading-relaxed text-muted-foreground">
                {technology.intro}
              </p>
            </SlideUp>
          </div>

          <div className="lg:col-span-7">
            <SlideUp delay={0.1}>
              <div className="grid gap-6 sm:grid-cols-2">
                {technology.groups.map((group) => (
                  <div
                    key={group.id}
                    className="rounded-lg border border-border bg-background"
                  >
                    <h3 className="border-b border-border px-5 py-3.5 text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
                      {group.label}
                    </h3>
                    <ul className="divide-y divide-border">
                      {group.platforms.map((platform) => (
                        <li
                          key={platform}
                          className="flex items-center justify-between gap-4 px-5 py-3.5"
                        >
                          <span className="text-sm font-medium text-foreground">
                            {platform}
                          </span>
                          <span
                            className="size-1.5 rounded-sm bg-primary/40"
                            aria-hidden="true"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SlideUp>
          </div>
        </div>

        <p className="mt-8 max-w-4xl text-xs leading-relaxed text-muted-foreground/80">
          {technology.footnote}
        </p>
      </Container>
    </Section>
  );
}

TechnologyBand.displayName = "TechnologyBand";
