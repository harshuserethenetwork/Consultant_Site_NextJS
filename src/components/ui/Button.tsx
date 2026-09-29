import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

/**
 * Focus rings come from the global `:focus-visible` rule in
 * `src/app/globals.css`, so every interactive element on the site gets the same
 * accessible focus indicator (WCAG 2.4.7) without repeating it here.
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary/60 hover:text-primary",
  ghost:
    "border border-transparent bg-transparent text-foreground hover:bg-muted hover:text-foreground",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-10 gap-1.5 px-3.5 text-sm",
  md: "h-11 gap-2 px-5 text-sm",
  lg: "h-12 gap-2.5 px-6 text-[0.95rem]",
  icon: "size-11 p-0",
};

const BASE_CLASSES =
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

export interface ButtonOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Class string for the button look — use it on `<Link>` or any other element:
 *   <Link className={buttonVariants({ variant: "outline" })} href="/contact">
 */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: ButtonOptions = {}): string {
  return cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks further clicks. */
  isLoading?: boolean;
  /** Announced to screen readers while loading (defaults to "Loading"). */
  loadingLabel?: string;
  children?: ReactNode;
}

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingLabel = "Loading",
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span className="sr-only">{loadingLabel}</span>
        </>
      ) : null}
      {children}
    </button>
  );
}

Button.displayName = "Button";
