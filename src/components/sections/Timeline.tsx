"use client";

import type { Variants } from "framer-motion";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import {
  EASE_OUT,
  staggerContainerVariants,
  staggerItemVariants,
  staticVariants,
} from "@/lib/animations";

/**
 * The milestone rail on /about: a vertical line that draws itself as the
 * section scrolls into view, with each milestone cascading in after it.
 *
 * Client Component (framer-motion drives the reveal), but it reads its data
 * straight from `siteConfig.about.timeline`, so no props are needed.
 * Reduced-motion visitors get the final state instantly.
 */
export function Timeline() {
  const reduced = useReducedMotion() ?? false;
  const items = siteConfig.about.timeline;

  if (items.length === 0) return null;

  const itemVariants: Variants = reduced ? staticVariants : staggerItemVariants;

  return (
    <div className="relative mx-auto mt-12 max-w-3xl">
      {/* The rail: draws top → bottom the first time the timeline is seen. */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-5 w-px origin-top bg-gradient-to-b from-primary via-primary/40 to-transparent sm:left-7"
        initial={{ scaleY: reduced ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: reduced ? 0 : 1.1, ease: EASE_OUT }}
      />

      <motion.ol
        className="flex flex-col gap-10"
        variants={
          reduced
            ? staticVariants
            : staggerContainerVariants({ stagger: 0.12, delay: 0.15 })
        }
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {items.map((item) => (
          <motion.li
            key={`${item.year}-${item.title}`}
            variants={itemVariants}
            className="relative flex gap-5 sm:gap-7"
          >
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-background text-primary shadow-sm sm:size-14">
              <ConfigIcon name={item.icon} className="size-5 sm:size-6" />
            </span>

            <div className="pt-1">
              <p className="font-mono text-sm font-semibold text-primary">
                {item.year}
              </p>
              <h3 className="mt-1 font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

Timeline.displayName = "Timeline";
