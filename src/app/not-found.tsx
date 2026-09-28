import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * 404 UI rendered for unknown routes — including the `notFound()` calls in
 * /services/[slug], /projects/[slug], /blog/[slug] and the feature-gated
 * pages. Sits inside the root layout, so the header, footer and theme still
 * work.
 *
 * Animated on purpose: a floating pair of brand blobs behind a SlideUp
 * entrance (both respect prefers-reduced-motion — see globals.css and the
 * reduced-motion handling inside SlideUp).
 */
export default function NotFound() {
  return (
    <Section
      padding="none"
      className="relative flex flex-1 items-center overflow-hidden"
    >
      {/* Ambient brand shapes, same language as the hero / page headers. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-8%] size-72 animate-float-slow rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-6%] size-80 animate-float rounded-full bg-accent/20 blur-3xl" />
      </div>

      <SlideUp className="flex w-full flex-col items-center gap-6 px-4 py-24 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary ring-4 ring-primary/5">
          <SearchX className="size-8" aria-hidden="true" />
        </span>

        <p
          aria-hidden="true"
          className="font-heading text-7xl leading-none font-bold tracking-tighter text-primary sm:text-8xl"
        >
          404
        </p>

        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Page not found
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Go home
          </Link>
          <Link
            href="/services"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Browse services
          </Link>
        </div>
      </SlideUp>
    </Section>
  );
}
