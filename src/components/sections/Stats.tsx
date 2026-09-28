import { siteConfig } from "@/config/site.config";
import { Card } from "@/components/ui/Card";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import { Counter } from "@/components/animations/Counter";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

/**
 * Animated counters ("250+ projects delivered"). The value lives in the
 * config as text ("250", "98", "4.9") so it can carry any suffix; this file
 * splits it into the number and the decimal places <Counter> needs.
 *
 * Server Component.
 */
export function Stats() {
  if (!siteConfig.features.stats) return null;
  const { stats } = siteConfig;

  return (
    <Section id="stats" tone="muted" padding="md">
      {stats.heading ? (
        <SlideUp className="flex justify-center">
          <SectionHeading {...stats.heading} align="center" />
        </SlideUp>
      ) : null}

      <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4">
        {stats.items.map((stat) => {
          const { numeric, decimals } = parseStatValue(stat.value);

          return (
            <StaggerItem key={stat.id} className="h-full">
              <Card className="h-full p-6 text-center sm:p-7">
                {stat.icon ? (
                  <span className="mx-auto grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <ConfigIcon name={stat.icon} className="size-5" />
                  </span>
                ) : null}

                <p className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground">
                  <Counter
                    value={numeric}
                    decimals={decimals}
                    suffix={stat.suffix ?? ""}
                  />
                </p>

                <p className="mt-2 text-sm font-semibold text-foreground">
                  {stat.label}
                </p>

                {stat.description ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                ) : null}
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

Stats.displayName = "Stats";

/**
 * "250+" -> { numeric: 250, decimals: 0 }, "4.9" -> { numeric: 4.9, decimals: 1 }.
 * Anything that is not a digit or a dot (commas, currency signs) is ignored.
 */
function parseStatValue(value: string): { numeric: number; decimals: number } {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const dotIndex = cleaned.indexOf(".");
  const decimals = dotIndex === -1 ? 0 : cleaned.length - dotIndex - 1;
  const numeric = Number.parseFloat(cleaned);
  return { numeric: Number.isFinite(numeric) ? numeric : 0, decimals };
}
