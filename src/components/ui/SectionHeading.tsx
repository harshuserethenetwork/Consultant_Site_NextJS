import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionHeading as SectionHeadingData } from "@/types/config";

export type SectionHeadingAlign = "left" | "center";
export type SectionHeadingLevel = "h1" | "h2" | "h3";

/**
 * The heading block used at the top of every section.
 * Pass `siteConfig.<section>.heading` straight into it.
 *
 * The `highlight` words are wrapped in a span so they take the brand colour
 * (WCAG AA: `text-primary` on the page background).
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
  h1: "text-[2.5rem] leading-[1.06] sm:text-[3rem] lg:text-[3.5rem]",
  h2: "text-[1.875rem] leading-[1.15] sm:text-[2.25rem] lg:text-[2.75rem]",
  h3: "text-xl leading-tight sm:text-2xl lg:text-3xl",
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
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}

      <HeadingTag
        className={cn(
          "font-heading font-semibold tracking-tight text-foreground",
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
