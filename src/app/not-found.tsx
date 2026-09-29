import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * 404 UI rendered for unknown routes — including the `notFound()` calls in
 * /services/[slug] and any feature-gated page. Sits inside the root layout,
 * so the header, footer and theme still work.
 */
export default function NotFound() {
  return (
    <Section
      padding="none"
      className="relative flex flex-1 items-center border-b border-border"
    >
      <SlideUp className="flex w-full flex-col items-center gap-6 px-4 py-24 text-center">
        <span className="grid size-14 place-items-center rounded-md bg-primary/10 text-primary">
          <SearchX className="size-6" aria-hidden="true" />
        </span>

        <p
          aria-hidden="true"
          className="font-mono text-5xl leading-none font-medium tracking-tight text-primary sm:text-6xl"
        >
          404
        </p>

        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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
