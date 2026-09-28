"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations";

/**
 * Cross-page transition wrapper: the outgoing page fades/lifts out, the new
 * one rises in. Keyed by pathname, so every navigation (including
 * /blog → /blog/[slug]) plays once; staying on the same path does nothing.
 *
 * `AnimatePresence initial={false}` skips the animation on the very first
 * paint, so there is no flash on load, and `mode="wait"` guarantees only one
 * page is mounted at a time. Reduced-motion visitors get an instant swap.
 *
 * Wired in the root layout around the <main> children; the wrapper is a flex
 * column with `flex-1` so pages that stretch (404, loading) keep working.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion() ?? false;

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
        className="flex flex-1 flex-col"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
        transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

PageTransition.displayName = "PageTransition";
