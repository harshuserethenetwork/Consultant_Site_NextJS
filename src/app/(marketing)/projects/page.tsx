import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectFilter } from "@/components/sections/ProjectFilter";
import { Section } from "@/components/ui/Section";
import { publicAssetExists } from "@/lib/images";

const { projects, seo } = siteConfig;

export const metadata: Metadata = {
  title: "Projects",
  description: projects.heading.subtitle ?? seo.description,
};

/**
 * Portfolio listing with the animated category filter. The grid itself is a
 * client component; this page stays a Server Component and only prepares the
 * data — including whether each image file actually exists (the client bundle
 * must never touch the file system).
 *
 * Server Component.
 */
export default function ProjectsPage() {
  const items = projects.items.map((project) => ({
    slug: project.slug,
    title: project.title,
    client: project.client,
    category: project.category,
    summary: project.summary,
    year: project.year,
    tags: project.tags,
    featured: project.featured,
    badge: project.badge,
    results: project.results,
    image: {
      src: project.image.src,
      alt: project.image.alt,
      width: project.image.width,
      height: project.image.height,
      exists: publicAssetExists(project.image.src),
    },
  }));

  return (
    <>
      <PageHeader
        title={projects.heading.title}
        highlight={projects.heading.highlight}
        eyebrow={projects.heading.eyebrow}
        description={projects.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <Section padding="lg">
        <ProjectFilter projects={items} categories={projects.categories} />
      </Section>
    </>
  );
}
