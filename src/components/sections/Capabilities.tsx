import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import { cn } from "@/lib/utils";

/**
 * Capabilities: the four service categories, each with the services it
 * contains, laid out as hairline-separated rows instead of floating cards.
 * Every title links to its service detail page.
 *
 * Server Component — content comes from `siteConfig.services`.
 */
export function Capabilities() {
  if (!siteConfig.features.capabilities) return null;
  const { services } = siteConfig;

  return (
    <Section id="capabilities" tone="default" padding="md">
      <Container>
        <SlideUp>
          <div className="flex flex-col gap-6 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <SectionHeading {...services.heading} />
            {services.intro ? (
              <p className="max-w-md shrink-0 text-sm leading-relaxed text-muted-foreground lg:text-right">
                {services.intro}
              </p>
            ) : null}
          </div>
        </SlideUp>

        <div>
          {services.categories.map((category) => {
            const items = services.items.filter(
              (service) => service.category === category.id,
            );

            return (
              <div
                key={category.id}
                id={category.anchor}
                className="grid gap-8 border-b border-border py-10 lg:grid-cols-12 lg:gap-12 lg:py-12"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-primary">
                      {category.index}
                    </span>
                    <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {category.name}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {category.summary}
                  </p>

                  <p className="mt-4 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground/90 italic">
                    {category.problem}
                  </p>

                  <Link
                    href={`/services#${category.anchor}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    All {category.name.toLowerCase()} services
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>

                <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
                  {items.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={service.href}
                        className="group -m-1 flex h-full flex-col gap-2 rounded-md border border-transparent p-1 transition-colors hover:border-border hover:bg-muted/60"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-heading text-base font-semibold text-foreground">
                            {service.title}
                          </span>
                          <ArrowRight
                            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {service.shortDescription}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
          <p className={cn("max-w-2xl text-sm text-muted-foreground")}>
            Any function above can be scoped on its own, or several functions
            can be combined into one managed team under the same engagement.
          </p>
          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            View all services
          </Link>
        </div>
      </Container>
    </Section>
  );
}

Capabilities.displayName = "Capabilities";
