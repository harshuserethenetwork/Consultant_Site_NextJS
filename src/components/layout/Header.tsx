"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/config/site.config";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import type { NavItem } from "@/types/config";
import { cn } from "@/lib/utils";

const ITEM_CLASS =
  "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground";

const MENU_PANEL =
  "invisible absolute left-0 top-full z-40 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100";

function renderAnchor(
  href: string,
  external: boolean,
  className: string,
  content: ReactNode,
) {
  return external ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

/** One row of the desktop navigation; rows with children get a dropdown. */
function DesktopNavItem({ item }: { item: NavItem }) {
  const external = item.external ?? item.href.startsWith("http");
  const hasChildren = Boolean(item.children?.length);

  const label = (
    <>
      {item.label}
      {hasChildren ? (
        <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
      ) : null}
    </>
  );

  if (!hasChildren) {
    return renderAnchor(item.href, external, ITEM_CLASS, label);
  }

  return (
    <div className="group relative">
      {renderAnchor(item.href, external, ITEM_CLASS, label)}

      <div className={MENU_PANEL}>
        <div className="grid w-[34rem] grid-cols-2 gap-1 rounded-lg border border-border bg-card p-2 shadow-lg">
          {item.children?.map((child) => {
            const childExternal = child.external ?? child.href.startsWith("http");
            return renderAnchor(
              child.href,
              childExternal,
              "flex flex-col gap-1 rounded-md border border-transparent p-3 transition-colors hover:border-border hover:bg-muted",
              <>
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {child.label}
                  {child.badge ? (
                    <span className="rounded-sm border border-border px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                      {child.badge}
                    </span>
                  ) : null}
                </span>
                {child.description ? (
                  <span className="text-xs text-muted-foreground">
                    {child.description}
                  </span>
                ) : null}
              </>,
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Site header: logo, primary navigation (with category dropdowns), theme
 * toggle, main CTA and the mobile menu trigger.
 *
 * Solid surface with a hairline bottom border — no blur, no floating glass —
 * so the navigation stays legible over any section. `sticky top-0 z-50`
 * keeps it above every section.
 */
export function Header() {
  const scrolled = useScrollPosition(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const { navigation, company, socials, hero } = siteConfig;
  const headerSocials = socials.filter((social) => social.showInHeader);
  const headerNav = navigation.header;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background transition-colors duration-300",
        scrolled ? "border-border" : "border-border/50",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          aria-label={`${company.name} — home`}
          className="flex shrink-0 items-center"
        >
          <Image
            src={company.logo.light}
            alt={company.logo.alt}
            width={120}
            height={40}
            priority
            unoptimized
            className="h-9 w-auto dark:hidden"
          />
          <Image
            src={company.logo.dark}
            alt=""
            width={120}
            height={40}
            priority
            unoptimized
            aria-hidden="true"
            className="hidden h-9 w-auto dark:block"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {headerNav.map((item) => (
            <DesktopNavItem key={`${item.label}-${item.href}`} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-1 xl:flex">
            {headerSocials.map((social) => {
              const external = social.url.startsWith("http");
              return (
                <a
                  key={`${social.platform}-${social.url}`}
                  href={social.url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              );
            })}
          </div>

          <ThemeToggle />

          <Link
            href={hero.primaryCta.href}
            className={cn(buttonVariants({ size: "md" }), "hidden sm:inline-flex")}
          >
            {hero.primaryCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={headerNav}
      />
    </header>
  );
}

Header.displayName = "Header";
