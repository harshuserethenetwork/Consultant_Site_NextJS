import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import { cn } from "@/lib/utils";

/**
 * Weekly coverage diagram: seven day columns with the standard and extended
 * bands drawn over them, plus the footnote that scopes 24/7 capability.
 *
 * Server Component — content comes from `siteConfig.coverage`.
 */
export function CoverageSection({
  id = "coverage",
}: {
  /** Section anchor, e.g. "coverage". */
  id?: string;
} = {}) {
  const { coverage } = siteConfig;

  return (
    <Section id={id} tone="default" padding="md" className="border-t border-border">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SlideUp className="flex flex-col gap-5">
              <SectionHeading {...coverage.heading} />
            </SlideUp>
          </div>

          <div className="lg:col-span-7">
            <SlideUp delay={0.1}>
              <div className="rounded-lg border border-border bg-card">
                <div className="grid grid-cols-7 border-b border-border">
                  {coverage.columns.map((day) => (
                    <div
                      key={day}
                      className="px-2 py-3 text-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="divide-y divide-border">
                  {coverage.bands.map((band) => (
                    <div key={band.id} className="p-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm font-medium text-foreground">
                          {band.label}
                        </span>
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
                              className={cn(
                                "flex h-10 items-center justify-center rounded-sm border text-[11px] font-medium",
                                covered
                                  ? band.highlighted
                                    ? "border-accent/60 bg-accent/15 text-accent-foreground dark:text-accent"
                                    : "border-primary/30 bg-primary/10 text-primary"
                                  : "border-border bg-background text-muted-foreground/60",
                              )}
                            >
                              {covered ? day : "—"}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SlideUp>

            {coverage.footnote ? (
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                {coverage.footnote}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}

CoverageSection.displayName = "CoverageSection";
