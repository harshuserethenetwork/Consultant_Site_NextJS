"use client";

import type { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { siteConfig } from "@/config/site.config";

/**
 * Colour theme provider (next-themes).
 *
 * SSR-safe and flash-free: next-themes runs a tiny inline script *before* the
 * first paint that reads the saved preference from localStorage (or the OS
 * setting) and applies `.dark` to <html>. Our CSS variables are already in
 * <head> from the server, so the correct palette paints immediately.
 *
 * `<html suppressHydrationWarning>` (root layout) is required because the class
 * is added on the client after the server rendered it.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={siteConfig.theme.defaultTheme}
      enableSystem
      enableColorScheme
      storageKey="site-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
