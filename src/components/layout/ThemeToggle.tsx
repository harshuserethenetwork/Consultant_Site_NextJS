"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ThemeChoice = "light" | "dark" | "system";

const ORDER: ThemeChoice[] = ["light", "dark", "system"];
const CHOICE_LABEL: Record<ThemeChoice, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};
const CHOICE_ICONS: Record<ThemeChoice, LucideIcon> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

/**
 * `true` on the client, `false` during SSR and hydration — without an effect.
 * next-themes resolves the theme on the client only, so the icon must wait
 * until hydration finishes or React would see different markup on each side.
 */
const emptySubscribe = () => () => {};
const getMounted = () => true;
const getServerMounted = () => false;

/**
 * Cycles light → dark → system.
 *
 * Until hydration completes an empty, correctly sized slot is rendered — no
 * layout shift and no flash. The `aria-label` always names the current and
 * the next theme, so keyboard and screen-reader users get the same
 * information regardless of which theme is active (WCAG 2.2.1).
 */
export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getMounted, getServerMounted);

  const current: ThemeChoice = ORDER.includes(theme as ThemeChoice)
    ? (theme as ThemeChoice)
    : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = CHOICE_ICONS[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Colour theme: ${CHOICE_LABEL[current]}. Switch to ${CHOICE_LABEL[next]}.`}
      title={`Theme: ${CHOICE_LABEL[current]}`}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "rounded-md",
        className,
      )}
    >
      {mounted ? (
        <Icon className="size-4" aria-hidden="true" />
      ) : (
        <span className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}

ThemeToggle.displayName = "ThemeToggle";
