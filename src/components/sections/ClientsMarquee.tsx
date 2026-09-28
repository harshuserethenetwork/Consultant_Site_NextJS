import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import type { Client } from "@/types/config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";
import { publicAssetExists } from "@/lib/images";
import { cn } from "@/lib/utils";

const CELL_CLASSES =
  "mr-12 flex h-10 w-36 shrink-0 items-center justify-center text-muted-foreground opacity-60 grayscale transition duration-300 hover:text-foreground hover:opacity-100 hover:grayscale-0 sm:mr-16 sm:w-40";

const LOGO_CLASSES = "h-8 w-auto max-w-[8.5rem] object-contain";

/**
 * Infinite client-logo strip. Two identical copies scroll inside one track
 * (the `marquee` animation moves it by exactly -50%), the whole row pauses on
 * hover, and logos are grey until you point at them.
 *
 * Server Component + CSS animation — no JavaScript needed for the movement.
 * Logos without a file in /public fall back to the client name as a wordmark.
 */
export function ClientsMarquee() {
  if (!siteConfig.features.clients) return null;
  const { clients } = siteConfig;
  if (clients.items.length === 0) return null;

  const track = [...clients.items, ...clients.items];

  return (
    <Section
      id="clients"
      bleed
      padding="sm"
      className="border-b border-border bg-muted/30"
    >
      <Container>
        {clients.title ? (
          <SlideUp>
            <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
              {clients.title}
            </p>
          </SlideUp>
        ) : null}
      </Container>

      <div className="group/marquee relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center group-hover/marquee:[animation-play-state:paused]">
          {track.map((client, index) => {
            const duplicate = index >= clients.items.length;
            const logo = renderLogo(client);

            return (
              <li
                key={`${client.id}-${index}`}
                className={CELL_CLASSES}
                aria-hidden={duplicate || undefined}
              >
                {client.url ? (
                  <Link
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={duplicate ? -1 : undefined}
                    className="flex h-full w-full items-center justify-center"
                  >
                    {logo}
                  </Link>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

ClientsMarquee.displayName = "ClientsMarquee";

/** The client's logo file, its dark-mode variant, or the client name as text. */
function renderLogo(client: Client): ReactNode {
  const hasLogo = publicAssetExists(client.logo.src);
  const hasLogoDark = client.logoDark ? publicAssetExists(client.logoDark.src) : false;

  if (hasLogo) {
    return (
      <Image
        src={client.logo.src}
        alt={client.logo.alt}
        width={160}
        height={40}
        unoptimized
        className={hasLogoDark ? cn(LOGO_CLASSES, "dark:hidden") : LOGO_CLASSES}
      />
    );
  }

  if (hasLogoDark && client.logoDark) {
    return (
      <Image
        src={client.logoDark.src}
        alt={client.logoDark.alt}
        width={160}
        height={40}
        unoptimized
        className={LOGO_CLASSES}
      />
    );
  }

  return (
    <span className="font-heading text-sm font-semibold tracking-tight">
      {client.name}
    </span>
  );
}
