/**
 * Builds the CSS variables that drive the entire colour theme.
 *
 * The values come from `siteConfig.theme.colors` (see `src/config/site.config.ts`).
 * `src/app/layout.tsx` renders the result as a `<style>` tag in <head>, which is
 * why editing the config re-themes the site with no code changes:
 *
 *   :root  { --background:#FFFFFF; --primary:#4F46E5; … }   ← light palette
 *   .dark  { --background:#0B1220; --primary:#6366F1; … }   ← dark palette
 *
 * `next-themes` toggles the `.dark` class on <html>, so both blocks resolve on
 * the same element and the `.dark` block wins whenever the class is present.
 */
import { siteConfig } from "@/config/site.config";
import type { ThemePalette, ThemeRadius } from "@/types/config";

/** `key in site.config.ts`  →  `CSS custom property` */
export const PALETTE_VARIABLES: Readonly<Record<keyof ThemePalette, string>> = {
  background: "--background",
  surface: "--surface",
  foreground: "--foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  border: "--border",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  ring: "--ring",
};

/** Base corner radius for each `theme.radius` option in the config. */
const RADIUS_SCALE: Readonly<Record<ThemeRadius, string>> = {
  none: "0px",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
};

/**
 * Semantic aliases so components can use familiar names
 * (`bg-card`, `border-input`, …) without duplicating values.
 */
const DERIVED_TOKENS =
  "--card:var(--surface);--card-foreground:var(--foreground);--input:var(--border);";

/** Serialises one palette (light or dark) into `--name:value;` declarations. */
export function paletteDeclarations(palette: ThemePalette): string {
  let declarations = "";
  for (const key of Object.keys(PALETTE_VARIABLES) as Array<keyof ThemePalette>) {
    declarations += `${PALETTE_VARIABLES[key]}:${palette[key]};`;
  }
  return declarations;
}

/** Full stylesheet injected into <head> by the root layout. */
export function getThemeCss(): string {
  const { colors, radius } = siteConfig.theme;
  const radiusDeclaration = `--radius:${RADIUS_SCALE[radius]};`;

  return [
    `:root{${radiusDeclaration}${paletteDeclarations(colors.light)}${DERIVED_TOKENS}}`,
    `.dark{${paletteDeclarations(colors.dark)}${DERIVED_TOKENS}}`,
  ].join("");
}

/** The raw palette of a mode — handy for Open Graph/viewport colours. */
export function getPalette(mode: "light" | "dark"): ThemePalette {
  return siteConfig.theme.colors[mode];
}
