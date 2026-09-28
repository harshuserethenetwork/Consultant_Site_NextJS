/**
 * Small, dependency-free helpers shared across the site.
 * `cn()` is the one you will use most: it merges Tailwind classes and resolves
 * conflicts (later classes win), e.g. cn("p-4", className).
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site.config";

/** Merge class names, dropping Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Turn a site-relative path into an absolute URL using `seo.siteUrl`. */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.seo.siteUrl.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

/** "2026-02-14" -> "Feb 14, 2026" (locale can be overridden). */
export function formatDate(
  isoDate: string,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
): string {
  // A bare date is parsed as UTC, which shifts the day in western time zones.
  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? `${isoDate}T00:00:00` : isoDate,
  );
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString(locale, options);
}

/** 1234567 -> "1,234,567" */
export function formatNumber(value: number, locale = "en-US"): string {
  return value.toLocaleString(locale);
}

/** Builds a price label; amounts that are already words ("Custom") pass through. */
export function formatPrice(currency: string, amount: string): string {
  if (!currency) return amount;
  return `${currency}${amount}`;
}

/** "Amelia Hartley" -> "AH" (used for avatar fallbacks). */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/** "Hello, World!" -> "hello-world" (URL-safe slug). */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      // NFKD splits accents into base letter + combining mark; the mark is then
      // dropped by the character class below, so "Café" becomes "cafe".
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

/** Cut a string at `maxLength` and append an ellipsis. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

/** True when `pathname` points at the current route (hashes are ignored). */
export function isActivePath(pathname: string, href: string): boolean {
  const clean = (value: string) => value.split("#")[0].replace(/\/+$/, "") || "/";
  const target = clean(href);
  if (target === "/") return clean(pathname) === "/";
  return clean(pathname) === target || clean(pathname).startsWith(`${target}/`);
}
