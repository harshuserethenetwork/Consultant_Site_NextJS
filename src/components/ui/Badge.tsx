import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "primary" | "secondary" | "accent" | "outline" | "ghost";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary:
    "border-transparent bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
  secondary:
    "border-transparent bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-foreground",
  accent:
    "border-transparent bg-accent/15 text-accent-foreground dark:bg-accent/20 dark:text-accent",
  outline: "border-border bg-transparent text-foreground",
  ghost: "border-transparent bg-muted text-muted-foreground",
};

/**
 * Small pill for labels such as "Most popular", tags or statuses.
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
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs leading-none font-medium",
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
