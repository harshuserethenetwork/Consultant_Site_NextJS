import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "primary" | "secondary" | "accent" | "outline" | "ghost";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary:
    "border-primary/30 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary",
  secondary:
    "border-secondary/25 bg-secondary/10 text-secondary dark:border-secondary/40 dark:bg-secondary/25 dark:text-secondary-foreground",
  accent:
    "border-accent/45 bg-accent/15 text-accent-foreground dark:border-accent/40 dark:bg-accent/15 dark:text-accent",
  outline: "border-border bg-transparent text-foreground",
  ghost: "border-transparent bg-muted text-muted-foreground",
};

/**
 * Small rectangular label for scope tags and status notes.
 * Server Component.
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Icon element rendered before the label (use lucide-react components). */
  icon?: ReactNode;
  children?: ReactNode;
}

export function Badge({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[0.6875rem] leading-none font-semibold tracking-[0.08em] uppercase",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}

Badge.displayName = "Badge";
