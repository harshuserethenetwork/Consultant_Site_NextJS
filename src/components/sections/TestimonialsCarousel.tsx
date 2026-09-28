"use client";

import { useEffect, useState, type FocusEvent } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";

/**
 * One testimonial, prepared on the server: the avatar is only present when
 * its file actually exists in /public (otherwise initials are rendered).
 */
export interface TestimonialSlide {
  id: string;
  quote: string;
  rating: number;
  project?: string;
  author: { name: string; role: string; company: string };
  avatar: { src: string; alt: string } | null;
}

/** Milliseconds between automatic slide changes. */
const AUTOPLAY_MS = 6000;

/**
 * Auto-advancing slider built with a translated track (no extra library).
 * Autoplay stops while the pointer is over the carousel or any control has
 * keyboard focus, and is disabled entirely for reduced-motion visitors.
 */
export function TestimonialsCarousel({ items }: { items: TestimonialSlide[] }) {
  const reduced = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduced || items.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduced, items.length]);

  if (items.length === 0) return null;

  const goTo = (next: number) => setIndex((next + items.length) % items.length);

  return (
    <div
      className="relative mx-auto mt-10 max-w-4xl lg:mt-14"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div
          className="flex"
          style={{
            transform: `translate3d(-${index * 100}%, 0, 0)`,
            transition: reduced
              ? "none"
              : "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {items.map((item, itemIndex) => (
            <figure
              key={item.id}
              className="flex w-full shrink-0 flex-col p-6 sm:p-10"
              aria-hidden={itemIndex !== index}
            >
              <Quote className="size-8 text-primary/30" aria-hidden="true" />

              <Rating rating={item.rating} />

              <blockquote className="mt-4 text-lg leading-relaxed text-foreground sm:text-xl">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {item.avatar ? (
                    <Image
                      src={item.avatar.src}
                      alt={item.avatar.alt}
                      width={96}
                      height={96}
                      className="size-full object-cover"
                    />
                  ) : (
                    getInitials(item.author.name)
                  )}
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {item.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.author.role} · {item.author.company}
                  </p>
                </div>

                {item.project ? (
                  <span className="ml-auto hidden rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-block">
                    {item.project}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={() => goTo(index - 1)}
        className="absolute top-1/2 -left-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:border-primary/60 hover:text-primary sm:inline-flex"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label="Next testimonial"
        onClick={() => goTo(index + 1)}
        className="absolute top-1/2 -right-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:border-primary/60 hover:text-primary sm:inline-flex"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to testimonial ${itemIndex + 1}`}
            aria-current={itemIndex === index}
            onClick={() => goTo(itemIndex)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              itemIndex === index
                ? "w-6 bg-primary"
                : "w-2 bg-border hover:bg-muted-foreground/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}

TestimonialsCarousel.displayName = "TestimonialsCarousel";

/** Five-star row; `role="img"` so the score is announced once, not star by star. */
function Rating({ rating }: { rating: number }) {
  return (
    <div
      className="mt-4 flex items-center gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, starIndex) => (
        <Star
          key={starIndex}
          aria-hidden="true"
          className={cn(
            "size-4",
            starIndex < rating ? "fill-primary text-primary" : "text-border",
          )}
        />
      ))}
    </div>
  );
}
