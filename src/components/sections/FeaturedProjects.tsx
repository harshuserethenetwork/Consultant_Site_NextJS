import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { MediaImage } from "@/components/ui/MediaImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { cn } from "@/lib/utils";

/**
 * "Selected work" grid. Each card links to its case-study route
 * (`/projects/[slug]`); the whole card is the link so keyboard and screen
 * reader users get one clear target, with the overlay purely decorative.
 *
 * Server Component — all content comes from `siteConfig.projects`.
 */
export function FeaturedProjects() {
  if (!siteConfig.features.projects) return null;
  const { projects } = siteConfig;

  return (
    <Section id="projects" padding="lg">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SlideUp>
          <SectionHeading {...projects.heading} className="max-w-2xl" />
        </SlideUp>

        {projects.cta ? (
          <SlideUp delay={0.1}>
            <Link
              href={projects.cta.href}
              target={projects.cta.external ? "_blank" : undefined}
              rel={projects.cta.external ? "noopener noreferrer" : undefined}
              className={buttonVariants({ variant: "outline" })}
            >
              {projects.cta.label}
            </Link>
          </SlideUp>
        ) : null}
      </div>

      <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {projects.items.map((project) => (
          <StaggerItem key={project.id} className="h-full">
            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
                project.featured && "ring-1 ring-primary/15",
              )}
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-muted/30">
                <MediaImage
                  image={project.image}
                  className="transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                />

                <Badge
                  variant="outline"
                  className="absolute top-3 left-3 border-transparent bg-background/85 text-foreground backdrop-blur-sm"
                >
                  {project.category}
                </Badge>

                {project.badge ? (
                  <Badge
                    variant="primary"
                    className="absolute top-3 right-3 border-transparent bg-primary text-primary-foreground"
                    icon={<ConfigIcon name={project.badge.icon} className="size-3.5" />}
                  >
                    {project.badge.label}
                  </Badge>
                ) : null}

                <div
                  className="absolute inset-0 flex items-center justify-center bg-foreground/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-background text-foreground shadow-lg">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{project.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {project.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>

                {project.results && project.results.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                    {project.results.map((result) => (
                      <li key={result.label} className="text-xs">
                        <span className="font-heading font-bold text-primary">
                          {result.value}
                        </span>{" "}
                        <span className="text-muted-foreground">{result.label}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {project.tags.length > 0 ? (
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md bg-muted px-2 py-0.5 text-[0.7rem] text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

FeaturedProjects.displayName = "FeaturedProjects";
