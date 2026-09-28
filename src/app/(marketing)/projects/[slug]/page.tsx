import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Layers, Users } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { Project } from "@/types/config";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";
import { publicAssetExists } from "@/lib/images";

const { projects, seo } = siteConfig;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs 404 at the router level — before streaming starts — so they
 *  get a real 404 status code instead of a streamed 200. */
export const dynamicParams = false;

/** One static route per case study, e.g. /projects/orbit-pay. */
export function generateStaticParams(): { slug: string }[] {
  return projects.items.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string): Project | undefined {
  return projects.items.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  const image = publicAssetExists(project.image.src) ? project.image.src : seo.ogImage;

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      siteName: siteConfig.company.name,
      images: [
        {
          url: image,
          width: project.image.width ?? 1200,
          height: project.image.height ?? 800,
          alt: project.image.alt,
        },
      ],
      type: "article",
    },
  };
}

/**
 * Case-study detail: hero header, big image, full description with results
 * and tags, a facts sidebar, and previous/next links that walk the config
 * list in order. Unknown slugs render the 404 via `notFound()`.
 */
export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const index = projects.items.indexOf(project);
  const previous = index > 0 ? projects.items[index - 1] : null;
  const next = index < projects.items.length - 1 ? projects.items[index + 1] : null;

  return (
    <>
      <PageHeader
        title={project.title}
        eyebrow={project.category}
        description={project.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      {/* ------------------------------------------------------------ article */}
      <Section padding="lg">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <SlideUp>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-lg">
                <MediaImage
                  image={project.image}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                />
              </div>
            </SlideUp>

            <SlideUp delay={0.1} className="flex flex-col gap-6">
              <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                {project.description}
              </p>

              {project.results && project.results.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {project.results.map((result) => (
                    <li
                      key={result.label}
                      className="rounded-xl border border-border bg-card p-5 shadow-sm"
                    >
                      <p className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                        {result.value}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {result.label}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}

              {project.tags.length > 0 ? (
                <div>
                  <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                    Technologies
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </SlideUp>
          </div>

          {/* ----------------------------------------------------------- facts */}
          <SlideUp delay={0.15}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Card className="p-6 sm:p-8">
                <dl className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Users className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-xs text-muted-foreground">Client</dt>
                      <dd className="font-heading text-base font-semibold text-foreground">
                        {project.client}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Calendar className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-xs text-muted-foreground">Launched</dt>
                      <dd className="font-heading text-base font-semibold text-foreground">
                        {project.year}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Layers className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-xs text-muted-foreground">Industry</dt>
                      <dd className="font-heading text-base font-semibold text-foreground">
                        {project.category}
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-7 flex flex-col gap-3">
                  {projects.cta ? (
                    <Link
                      href={projects.cta.href}
                      target={projects.cta.external ? "_blank" : undefined}
                      rel={projects.cta.external ? "noopener noreferrer" : undefined}
                      className={buttonVariants({ className: "w-full" })}
                    >
                      {projects.cta.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  ) : null}

                  <Link
                    href="/projects"
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                  >
                    All projects
                  </Link>
                </div>
              </Card>
            </div>
          </SlideUp>
        </div>
      </Section>

      {/* --------------------------------------------------- previous / next */}
      <Section tone="muted" padding="sm">
        <nav
          aria-label="Project navigation"
          className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-between"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex max-w-sm flex-col gap-1 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 sm:w-full"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Previous project
              </span>
              <span className="font-heading text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" className="hidden sm:block sm:w-full" />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex max-w-sm flex-col gap-1 rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-colors hover:border-primary/40 sm:ml-auto sm:w-full sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase sm:justify-end">
                Next project
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="font-heading text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </Section>
    </>
  );
}
