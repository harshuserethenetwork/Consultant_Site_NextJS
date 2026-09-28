"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Badge as BadgeData, ProjectResult } from "@/types/config";
import { Badge } from "@/components/ui/Badge";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { EASE_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * The project image, resolved on the server: `exists` says whether the file
 * is actually in /public, so the browser bundle never touches the file system.
 */
export interface ProjectCardImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  exists: boolean;
}

/** Serialisable slice of `Project` handed from the server page to the grid. */
export interface ProjectCardData {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  year: string;
  tags: string[];
  featured?: boolean;
  badge?: BadgeData;
  results?: ProjectResult[];
  image: ProjectCardImage;
}

export interface ProjectFilterProps {
  projects: ProjectCardData[];
  /** Filter buttons, first entry shows every project (config: "All"). */
  categories: string[];
}

/**
 * Category filter + project grid. Switching category animates the change:
 * cards scale/fade out and the remaining ones slide into place (framer-motion
 * layout animation), disabled entirely for reduced-motion visitors.
 *
 * Client Component — the only interactive part of /projects.
 */
export function ProjectFilter({ projects, categories }: ProjectFilterProps) {
  const reduced = useReducedMotion() ?? false;
  /** The first entry (config: "All") is the catch-all filter. */
  const allCategory = categories[0] ?? "All";
  const [active, setActive] = useState(allCategory);

  const filtered = useMemo(() => {
    if (active === allCategory) return projects;
    return projects.filter((project) => project.category === active);
  }, [active, allCategory, projects]);

  return (
    <div>
      {/* Category pills */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        {categories.map((category) => {
          const isActive = category === active;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only">
        {filtered.length} of {projects.length} projects shown
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-12 rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          No projects in this category yet.
        </p>
      ) : (
        <motion.div
          layout={!reduced}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

ProjectFilter.displayName = "ProjectFilter";

/** One case-study card; the whole card is a single link to its detail page. */
function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        project.featured && "ring-1 ring-primary/15",
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-muted/30">
        {project.image.exists ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width ?? 1200}
            height={project.image.height ?? 800}
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <MediaPlaceholder src={project.image.src} alt={project.image.alt} />
        )}

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
  );
}
