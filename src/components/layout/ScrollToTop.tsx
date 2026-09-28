"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { EASE_OUT } from "@/lib/animations";

/**
 * Floating "back to top" control. Appears once the visitor has scrolled past
 * `threshold`, fades away again near the top, and respects
 * prefers-reduced-motion for both the animation and the scroll behaviour.
 *
 * Sits at z-40 — above page content, below the sticky header (z-50) and the
 * mobile menu overlay.
 */
const VISIBILITY_THRESHOLD = 480;

export function ScrollToTop() {
  const visible = useScrollPosition(VISIBILITY_THRESHOLD);
  const reduced = useReducedMotion() ?? false;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={handleClick}
          aria-label="Scroll to top"
          title="Scroll to top"
          initial={reduced ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: EASE_OUT }}
          className="fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 active:bg-primary sm:right-6 sm:bottom-6"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

ScrollToTop.displayName = "ScrollToTop";
