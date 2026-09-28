import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContainerSize = "sm" | "md" | "lg" | "full";

/**
 * Max width per size. The default ("lg") matches the 1280px cap configured for
 * `.container` in `tailwind.config.ts`.
 */
const SIZE_CLASSES: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-none",
};

/**
 * Horizontally centred, responsive page gutter.
 * Padding values mirror `theme.container.padding` in `tailwind.config.ts`.
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Content width: sm 768px · md 1024px · lg 1280px (default) · full none. */
  size?: ContainerSize;
  children?: ReactNode;
}

export function Container({
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10",
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Container.displayName = "Container";
