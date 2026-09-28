import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerSize } from "@/components/ui/Container";

export type SectionTone = "default" | "muted" | "card" | "primary" | "gradient";

export type SectionPadding = "none" | "sm" | "md" | "lg";

const TONE_CLASSES: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted/60 text-foreground",
  card: "bg-card text-foreground",
  primary: "bg-primary text-primary-foreground",
  gradient:
    "bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground",
};

const PADDING_CLASSES: Record<SectionPadding, string> = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20 lg:py-24",
  lg: "py-20 md:py-28 lg:py-32",
};

/**
 * Generic page section: vertical rhythm + background tone + a centred
 * `Container` around its children. Sections are Server Components by default —
 * add "use client" in the section file itself if it needs interactivity.
 */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Anchor id, e.g. "services" for `/#services` links in the navigation. */
  id?: string;
  /** Background treatment. */
  tone?: SectionTone;
  /** Vertical spacing. */
  padding?: SectionPadding;
  /** Width of the inner container. */
  containerSize?: ContainerSize;
  /** Render children without the container (full-bleed content). */
  bleed?: boolean;
  children?: ReactNode;
}

export function Section({
  id,
  tone = "default",
  padding = "md",
  containerSize = "lg",
  bleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate scroll-mt-24",
        TONE_CLASSES[tone],
        PADDING_CLASSES[padding],
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}

Section.displayName = "Section";
