"use client";

import { createContext, useContext, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
  staticVariants,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * A grid whose children animate one after another instead of all at once.
 *
 *   <StaggerContainer className="grid gap-6 md:grid-cols-3">
 *     <StaggerItem>…</StaggerItem>
 *     <StaggerItem>…</StaggerItem>
 *   </StaggerContainer>
 *
 * The timing lives on the container; `StaggerItem` reads it from context, so
 * there is nothing to pass down manually. Children must be direct descendants
 * (no intermediate DOM wrapper) for framer-motion to apply the stagger delay.
 */
const ItemVariantsContext = createContext<Variants>(staggerItemVariants);

export interface StaggerContainerProps {
  children?: ReactNode;
  className?: string;
  /** Seconds between each child. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delay?: number;
  /** Percentage of the container that must be visible before it animates. */
  amount?: number;
  /** Animate only the first time the container enters the viewport. */
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.09,
  delay = 0.08,
  amount = 0.2,
  once = true,
}: StaggerContainerProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <ItemVariantsContext.Provider
      value={reduced ? staticVariants : staggerItemVariants}
    >
      <motion.div
        className={cn(className)}
        variants={staggerContainerVariants({ stagger, delay })}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
      >
        {children}
      </motion.div>
    </ItemVariantsContext.Provider>
  );
}

StaggerContainer.displayName = "StaggerContainer";

export interface StaggerItemProps {
  children?: ReactNode;
  className?: string;
}

/** One cell of a `<StaggerContainer>`. Inherits the cascade timing. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  const variants = useContext(ItemVariantsContext);

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}

StaggerItem.displayName = "StaggerItem";
