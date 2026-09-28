/**
 * Shared motion presets used by every wrapper in `src/components/animations/`.
 *
 * Why one file:
 *   • The curves and timings stay identical across the whole site.
 *   • Sections never talk to framer-motion directly — they use the wrappers.
 *
 * Reduced motion: every wrapper checks `useReducedMotion()` and collapses its
 * duration to 0, so visitors who disable animation still get the final state
 * instantly (WCAG 2.3.3). The CSS `prefers-reduced-motion` rule in
 * `src/app/globals.css` does NOT cover these animations because framer-motion
 * drives inline styles from JavaScript.
 */
import type { Variants } from "framer-motion";

/** Smooth, overshoot-free deceleration — the default curve of the site. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Symmetric curve for continuous motion (marquees, parallax). */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Opacity only — for elements that should appear without moving. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Rises into place: the default entrance for headings, cards and grids. */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

/** Enters from the left edge (copy next to an image). */
export const slideFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

/** Enters from the right edge (images next to copy). */
export const slideFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

/** Subtle pop — badges, avatars, floating UI. */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

/**
 * Same shape as the presets above but with no visible change. Swap this in
 * when `prefers-reduced-motion` is active: the wrapper keeps its normal
 * `initial`/`whileInView` wiring, it just starts and ends in the final state.
 */
export const staticVariants: Variants = {
  hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
  visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0 } },
};

export interface StaggerOptions {
  /** Seconds between each child. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delay?: number;
}

/** Parent variant: itself stays still, its children cascade in. */
export function staggerContainerVariants({
  stagger = 0.09,
  delay = 0.08,
}: StaggerOptions = {}): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

/** Child variant used with `staggerContainerVariants` / `<StaggerItem>`. */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

/** Default viewport trigger: once visible by 25%, animate once, never again. */
export const DEFAULT_VIEWPORT = { once: true, amount: 0.25 } as const;
