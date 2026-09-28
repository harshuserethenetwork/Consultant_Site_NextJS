"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations";

/**
 * Appears in place when it scrolls into the viewport (pure opacity fade).
 *
 *   <FadeIn><p>Slowly revealed, never moved.</p></FadeIn>
 *
 * Needs `"use client"` (it uses framer-motion) but may be nested inside a
 * Server Component — the boundary is declared here, not in the section.
 */
export interface FadeInProps {
  children?: ReactNode;
  className?: string;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Seconds the animation lasts. */
  duration?: number;
  /** Optional vertical drift in px — leave 0 for a clean fade. */
  y?: number;
  /** Percentage of the element that must be visible before it animates. */
  amount?: number;
  /** Animate only the first time the element enters the viewport. */
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 0,
  amount = 0.25,
  once = true,
}: FadeInProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
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

FadeIn.displayName = "FadeIn";
