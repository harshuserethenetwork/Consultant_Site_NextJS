"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Moves its content at a different speed than the page while you scroll,
 * creating depth. Wrap an image or a decorative panel — never text you need
 * to read.
 *
 *   <ParallaxWrapper className="aspect-video overflow-hidden rounded-2xl">
 *     <img … />
 *   </ParallaxWrapper>
 *
 * The outer element measures the scroll; the inner one receives the offset,
 * so the measurement is never skewed by the transform it drives.
 */
export interface ParallaxWrapperProps {
  children?: ReactNode;
  className?: string;
  /** Travel distance in px across the full scroll range (positive = down first). */
  offset?: number;
}

export function ParallaxWrapper({
  children,
  className,
  offset = 48,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

ParallaxWrapper.displayName = "ParallaxWrapper";
