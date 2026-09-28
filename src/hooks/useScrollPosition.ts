"use client";

import { useEffect, useState } from "react";

/**
 * `true` once the page has been scrolled further than `threshold` px.
 * The header uses it to switch from transparent to solid:
 *
 *   const scrolled = useScrollPosition(24);
 *   <header className={scrolled ? "bg-background/85 backdrop-blur" : ""} />
 *
 * The listener is passive and only calls `setState` when the boolean actually
 * changes, so scrolling stays cheap. The initial value is `false` on the
 * server and is corrected right after mount (no hydration mismatch).
 */
export function useScrollPosition(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
