"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn, formatNumber } from "@/lib/utils";

/**
 * Number that counts up from 0 the first time it scrolls into view — used by
 * the stats section. The final value is rendered on the server, so the number
 * is correct for SEO, print and visitors without JavaScript.
 *
 *   <Counter value={250} suffix="+" />
 *   <Counter value={4.9} decimals={1} />
 */
export interface CounterProps {
  value: number;
  className?: string;
  /** Text shown before the number, e.g. "$". */
  prefix?: string;
  /** Text shown after the number, e.g. "%". */
  suffix?: string;
  /** Digits after the decimal point (0 = rounded to whole numbers). */
  decimals?: number;
  /** Seconds the count-up lasts. */
  duration?: number;
}

export function Counter({
  value,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion() ?? false;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    // With reduced motion the server-rendered value is already correct and
    // `display` never changes; otherwise the animation starts on the first
    // frame (asynchronously, so no state update happens inside the effect).
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();
    const totalMs = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / totalMs, 1);
      // easeOutQuart: fast start, gentle settle — reads as "confident".
      const eased = 1 - (1 - progress) ** 4;
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  const text =
    decimals > 0 ? display.toFixed(decimals) : formatNumber(Math.round(display));

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

Counter.displayName = "Counter";
