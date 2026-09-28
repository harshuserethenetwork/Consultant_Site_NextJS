"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations";

/**
 * Rises into place when it scrolls into the viewport — the standard entrance
 * for headings, cards and grids.
 *
 *   <SlideUp><h2>…</h2></SlideUp>
 *   <SlideUp delay={0.15} distance={64}>…</SlideUp>
 */
export interface SlideUpProps {
  children?: ReactNode;
  className?: string;
  /** Distance travelled upward, in px. */
  distance?: number;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Seconds the animation lasts. */
  duration?: number;
  /** Percentage of the element that must be visible before it animates. */
  amount?: number;
  /** Animate only the first time the element enters the viewport. */
  once?: boolean;
}

export function SlideUp({
  children,
  className,
  distance = 40,
  delay = 0,
  duration = 0.65,
  amount = 0.25,
  once = true,
}: SlideUpProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}

SlideUp.displayName = "SlideUp";
