import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { Badge } from "@/components/ui/Badge";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/config/site.config";
import type { NavLink, SocialPlatform } from "@/types/config";

/**
 * Site footer: newsletter band, brand column, link columns from
 * `navigation.footer`, trust badges and the legal row.
 *
 * Server Component — only `NewsletterForm` is a client component. Every string
 * comes from `siteConfig`; nothing here is hardcoded.
 */

const LINK_CLASS =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

function FooterLink({ link }: { link: NavLink }) {
  const external = link.external ?? link.href.startsWith("http");

  return external ? (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className={LINK_CLASS}
    >
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={LINK_CLASS}>
      {link.label}
    </Link>
  );
}

function SocialLink({
  url,
  platform,
  label,
}: {
  url: string;
  platform: SocialPlatform;
  label: string;
}) {
  const external = url.startsWith("http");

  return (
    <a
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <SocialIcon platform={platform} />
    </a>
  );
}

export function Footer() {
  const { company, footer, navigation, socials, features } = siteConfig;
  const newsletter = footer.newsletter;
  const footerSocials = socials.filter((social) => social.showInFooter);
  const year = new Date().getFullYear();
  const copyright = footer.copyright
    .replace("{year}", String(year))
    .replace("{name}", company.name);

  return (
    <footer className="border-t border-border bg-card text-foreground">
      {newsletter ? (
        <div className="border-b border-border bg-muted/40">
          <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h2 className="font-heading text-xl font-semibold">{newsletter.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {newsletter.description}
              </p>
            </div>
            <div className="w-full md:max-w-md">
              <NewsletterForm newsletter={newsletter} />
            </div>
          </Container>
        </div>
      ) : null}

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="flex max-w-md flex-col gap-5">
            <div className="flex items-center gap-3">
              <Image
                src={company.logo.light}
                alt={company.logo.alt}
                width={120}
                height={40}
                unoptimized
                className="h-9 w-auto dark:hidden"
              />
              <Image
                src={company.logo.dark}
                alt=""
                width={120}
                height={40}
                unoptimized
                aria-hidden="true"
                className="hidden h-9 w-auto dark:block"
              />
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {footer.description}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {footerSocials.map((social) => (
                <SocialLink
                  key={`${social.platform}-${social.url}`}
                  url={social.url}
                  platform={social.platform}
                  label={social.label}
                />
              ))}
            </div>

            {footer.badges?.length ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {footer.badges.map((badge) => (
                  <Badge
                    key={badge.label}
                    variant="outline"
                    icon={<ConfigIcon name={badge.icon} className="size-3.5" />}
                  >
                    {badge.label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {navigation.footer.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links
                    .filter((link) => features.showBlog || link.href !== "/blog")
                    .map((link) => (
                      <li key={`${link.label}-${link.href}`}>
                        <FooterLink link={link} />
                      </li>
                    ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">{copyright}</p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {navigation.legal.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

Footer.displayName = "Footer";
