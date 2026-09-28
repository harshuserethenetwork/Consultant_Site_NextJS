"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonVariants } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/config/site.config";
import type { NavItem, NavLink } from "@/types/config";
import { cn } from "@/lib/utils";

/**
 * Slide-over navigation for phones and tablets (`< lg`).
 *
 * Rendered by <Header /> even while closed, so `AnimatePresence` can play the
 * exit animation. It locks page scroll while open, closes on Escape or on any
 * link click, and traps the first focus on its close button.
 */
export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

function NavLinkRow({
  item,
  onNavigate,
  nested = false,
}: {
  item: NavLink;
  onNavigate: () => void;
  nested?: boolean;
}) {
  const external = item.external ?? item.href.startsWith("http");
  const className = cn(
    "flex flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted",
    nested && "px-2 py-2",
  );

  const content = (
    <>
      <span className="flex items-center gap-2 text-sm font-medium text-foreground sm:text-base">
        {item.label}
        {item.badge ? (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-accent-foreground uppercase dark:text-accent">
            {item.badge}
          </span>
        ) : null}
      </span>
      {item.description ? (
        <span className="text-xs text-muted-foreground">{item.description}</span>
      ) : null}
    </>
  );

  return external ? (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
      onClick={onNavigate}
    >
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const reduced = useReducedMotion() ?? false;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { company, socials, hero } = siteConfig;
  const headerSocials = socials.filter((social) => social.showInHeader);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 size-full cursor-default bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={`${company.name} menu`}
            className="absolute inset-y-0 right-0 flex w-[min(24rem,100vw)] flex-col overflow-y-auto border-l border-border bg-background shadow-2xl"
            initial={{ x: reduced ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduced ? 0 : "100%" }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 34 }
            }
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <span className="font-heading text-lg font-bold">{company.name}</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Main menu" className="flex-1 px-4 py-4">
              <ul className="flex flex-col divide-y divide-border/60">
                {items.map((item) => (
                  <li key={`${item.label}-${item.href}`} className="py-1">
                    <NavLinkRow item={item} onNavigate={onClose} />
                    {item.children?.length ? (
                      <ul className="mb-1 ml-3 flex flex-col gap-1 border-l border-border pl-3">
                        {item.children.map((child) => (
                          <li key={`${child.label}-${child.href}`}>
                            <NavLinkRow item={child} onNavigate={onClose} nested />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-border px-6 py-6">
              <Link
                href={hero.primaryCta.href}
                onClick={onClose}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                {hero.primaryCta.label}
              </Link>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {headerSocials.map((social) => {
                    const external = social.url.startsWith("http");
                    return (
                      <a
                        key={`${social.platform}-${social.url}`}
                        href={social.url}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer noopener" : undefined}
                        aria-label={social.label}
                        className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <SocialIcon platform={social.platform} />
                      </a>
                    );
                  })}
                </div>
                <ThemeToggle />
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

MobileMenu.displayName = "MobileMenu";
