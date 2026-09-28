import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { Section, type SectionTone } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";
import { cn } from "@/lib/utils";

/** Background treatment behind the page title. */
export type PageHeaderBackground = "gradient" | "muted" | "default";

/** One crumb of the trail; omit `href` for the current (last) page. */
export interface PageHeaderCrumb {
  label: string;
  href?: string;
}

const BACKGROUND_TONES: Record<PageHeaderBackground, SectionTone> = {
  gradient: "gradient",
  muted: "muted",
  default: "default",
};

/** Tone-aware text classes: the gradient flips everything to on-primary. */
interface PageHeaderText {
  eyebrow: string;
  title: string;
  description: string;
  crumb: string;
  crumbLink: string;
  crumbCurrent: string;
}

const TEXT: Record<PageHeaderBackground, PageHeaderText> = {
  gradient: {
    eyebrow: "text-primary-foreground/75",
    title: "text-primary-foreground",
    description: "text-primary-foreground/85",
    crumb: "text-primary-foreground/70",
    crumbLink: "hover:text-primary-foreground",
    crumbCurrent: "text-primary-foreground",
  },
  default: {
    eyebrow: "text-primary",
    title: "text-foreground",
    description: "text-muted-foreground",
    crumb: "text-muted-foreground",
    crumbLink: "hover:text-foreground",
    crumbCurrent: "text-foreground",
  },
  muted: {
    eyebrow: "text-primary",
    title: "text-foreground",
    description: "text-muted-foreground",
    crumb: "text-muted-foreground",
    crumbLink: "hover:text-foreground",
    crumbCurrent: "text-foreground",
  },
};

/**
 * Banner at the top of every inner page: breadcrumb trail, optional eyebrow,
 * the `h1` title (with the accent `highlight`) and a supporting line.
 *
 * The heading is styled by hand instead of `<SectionHeading>` because that
 * component renders `h2`-style classes and a `text-primary` highlight, which
 * would disappear on a `gradient` background — here both adapt to the tone.
 *
 * Server Component — all content is passed in from `site.config.ts`.
 */
export interface PageHeaderProps {
  /** Page `h1`. */
  title: string;
  /** Words inside `title` highlighted with the accent colour. */
  highlight?: string;
  /** Small line above the title, e.g. "What we do". */
  eyebrow?: string;
  /** Supporting sentence under the title. */
  description?: string;
  /** Crumbs from the home page down to this page; the last one is current. */
  breadcrumbs?: PageHeaderCrumb[];
  /** Background treatment (default: brand gradient). */
  background?: PageHeaderBackground;
  className?: string;
}

function renderTitle(
  title: string,
  highlight: string | undefined,
  background: PageHeaderBackground,
): ReactNode {
  if (!highlight || !title.includes(highlight)) return title;

  const parts = title.split(highlight);
  const highlightClass =
    background === "gradient"
      ? "rounded-md bg-accent px-2 text-accent-foreground"
      : "text-primary";

  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <span className={highlightClass}>{highlight}</span>
      ) : null}
    </Fragment>
  ));
}

function Breadcrumbs({
  crumbs,
  background,
}: {
  crumbs: PageHeaderCrumb[];
  background: PageHeaderBackground;
}) {
  const text = TEXT[background];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm sm:gap-2">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          const isHome = crumb.href === "/";

          return (
            <Fragment key={`${crumb.label}-${index}`}>
              {index > 0 ? (
                <li aria-hidden="true" className="flex items-center">
                  <ChevronRight className={cn("size-3.5", text.crumb)} />
                </li>
              ) : null}
              <li className="flex items-center gap-1.5">
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:underline",
                      text.crumb,
                      text.crumbLink,
                    )}
                  >
                    {isHome ? <House className="size-3.5" aria-hidden="true" /> : null}
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn("font-medium", text.crumbCurrent)}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHeader({
  title,
  highlight,
  eyebrow,
  description,
  breadcrumbs,
  background = "gradient",
  className,
}: PageHeaderProps) {
  const text = TEXT[background];

  return (
    <Section
      tone={BACKGROUND_TONES[background]}
      padding="md"
      className={cn("overflow-hidden", className)}
    >
      {background === "gradient" ? (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -top-24 right-[-8%] size-72 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute bottom-[-40%] left-[-6%] size-80 rounded-full bg-accent/25 blur-3xl" />
        </div>
      ) : null}

      <SlideUp className="flex flex-col gap-5">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs crumbs={breadcrumbs} background={background} />
        ) : null}

        {eyebrow ? (
          <p
            className={cn(
              "text-sm font-semibold tracking-widest uppercase",
              text.eyebrow,
            )}
          >
            {eyebrow}
          </p>
        ) : null}

        <h1
          className={cn(
            "font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
            text.title,
          )}
        >
          {renderTitle(title, highlight, background)}
        </h1>

        {description ? (
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed sm:text-lg",
              text.description,
            )}
          >
            {description}
          </p>
        ) : null}
      </SlideUp>
    </Section>
  );
}

PageHeader.displayName = "PageHeader";
