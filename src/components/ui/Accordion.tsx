"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Minimal shape so `siteConfig.faq.items` (Faq[]) can be passed directly. */
export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Item open on first render (defaults to none). */
  defaultOpenId?: string;
  /** Allow several items to stay open at once. */
  allowMultiple?: boolean;
  className?: string;
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/**
 * Animated accessible accordion (used by the FAQ section).
 *
 * ARIA pattern: each trigger is a <button aria-expanded aria-controls> inside a
 * heading, each panel is a labelled region. Height/opacity animate with
 * framer-motion; animation is skipped entirely when the visitor prefers
 * reduced motion.
 */
export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const reduceMotion = useReducedMotion();
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : [],
  );

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((current) => {
        const isOpen = current.includes(id);
        if (!allowMultiple) return isOpen ? [] : [id];
        return isOpen ? current.filter((openId) => openId !== id) : [...current, id];
      });
    },
    [allowMultiple],
  );

  return (
    <div
      className={cn(
        "divide-y divide-border overflow-hidden rounded-lg border border-border bg-card",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${item.id}-trigger`;
        const panelId = `${item.id}-panel`;

        return (
          <div key={item.id}>
            <h3 className="flex">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-medium text-foreground sm:px-6",
                  "transition-colors hover:text-primary",
                )}
              >
                <span>{item.question}</span>
                <motion.span
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 0.2, ease: EASE }
                  }
                >
                  <ChevronDown className="size-5" />
                </motion.span>
              </button>
            </h3>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.28, ease: EASE }
              }
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:text-base">
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

Accordion.displayName = "Accordion";
