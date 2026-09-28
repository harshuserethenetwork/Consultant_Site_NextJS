import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionHeading as SectionHeadingData } from "@/types/config";

export type SectionHeadingAlign = "left" | "center";
export type SectionHeadingLevel = "h1" | "h2" | "h3";

/**
 * The heading block used at the top of every section.
 * Pass `siteConfig.<section>.heading` straight into it.
 *
 * The `highlight` words are wrapped in a span so they can take the accent
 * colour (WCAG AA: `text-primary` on the page background).
 *
 * Server Component — no "use client" needed.
 */
export interface SectionHeadingProps extends SectionHeadingData {
  align?: SectionHeadingAlign;
  as?: SectionHeadingLevel;
  className?: string;
  /** Extra node rendered under the subtitle (buttons, tabs, …). */
  children?: ReactNode;
}

const ALIGN_CLASSES: Record<SectionHeadingAlign, string> = {
  left: "items-start text-left",
  center: "mx-auto items-center text-center",
};

const HEADING_CLASSES: Record<SectionHeadingLevel, string> = {
  h1: "text-4xl sm:text-5xl lg:text-6xl",
  h2: "text-3xl sm:text-4xl lg:text-5xl",
  h3: "text-2xl sm:text-3xl lg:text-4xl",
};

function renderTitle(title: string, highlight?: string): ReactNode {
  if (!highlight || !title.includes(highlight)) return title;

  const parts = title.split(highlight);
  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <span className="text-primary">{highlight}</span>
      ) : null}
    </Fragment>
  ));
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "left",
  as: HeadingTag = "h2",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex max-w-3xl flex-col gap-4", ALIGN_CLASSES[align], className)}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}

      <HeadingTag
        className={cn(
          "font-heading font-bold tracking-tight text-foreground",
          HEADING_CLASSES[HeadingTag],
        )}
      >
        {renderTitle(title, highlight)}
      </HeadingTag>

      {subtitle ? (
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}

      {children}
    </div>
  );
}

SectionHeading.displayName = "SectionHeading";
