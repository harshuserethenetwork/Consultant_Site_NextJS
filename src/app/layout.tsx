import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/config/site.config";
import { getThemeCss } from "@/lib/theme";
import { cn } from "@/lib/utils";
import "./globals.css";

/**
 * Fonts are self-hosted by next/font (no Google requests at runtime).
 *
 * The three `variable` names must stay in sync with `fontFamily` in
 * `tailwind.config.ts` and with `siteConfig.theme.fonts`:
 *   Inter          → --font-body     → font-sans
 *   Archivo        → --font-heading  → font-heading
 *   JetBrains Mono → --font-mono     → font-mono
 */
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const headingFont = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const { seo, company, theme, features } = siteConfig;

/** Open Graph images are optional: the file ships with a later design pass. */
const ogImages = seo.ogImage
  ? [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${company.name} — ${company.tagline}`,
      },
    ]
  : [];

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.name,
  icons: { icon: company.favicon },
  openGraph: {
    type: seo.type ?? "website",
    locale: seo.locale ?? "en_US",
    url: seo.siteUrl,
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    images: ogImages,
  },
  twitter: {
    card: seo.twitter.card,
    site: seo.twitter.site || undefined,
    creator: seo.twitter.creator || undefined,
    title: seo.title,
    description: seo.description,
    images: seo.ogImage ? [seo.ogImage] : undefined,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: theme.colors.light.background },
    { media: "(prefers-color-scheme: dark)", color: theme.colors.dark.background },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        bodyFont.variable,
        headingFont.variable,
        monoFont.variable,
        "antialiased",
      )}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        {/*
          The light + dark colour tokens generated from site.config.ts.
          React hoists it into <head> and keeps it ahead of page styles, so the
          correct palette is available before the first paint (no theme flash).
        */}
        <style
          href="site-theme"
          precedence="high"
          dangerouslySetInnerHTML={{ __html: getThemeCss() }}
        />

        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
          >
            Skip to main content
          </a>

          {features.header ? <Header /> : null}

          <main id="main-content" className="flex flex-1 flex-col">
            <PageTransition>{children}</PageTransition>
          </main>

          {features.footer ? <Footer /> : null}

          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
