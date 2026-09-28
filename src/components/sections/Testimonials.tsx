import { siteConfig } from "@/config/site.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import { publicAssetExists } from "@/lib/images";
import {
  TestimonialsCarousel,
  type TestimonialSlide,
} from "@/components/sections/TestimonialsCarousel";

/**
 * Client-quotes section. This wrapper is a Server Component so it can check
 * which avatar files exist; the sliding itself lives in the client child
 * <TestimonialsCarousel>.
 *
 * All content comes from `siteConfig.testimonials`.
 */
export function Testimonials() {
  if (!siteConfig.features.testimonials) return null;
  const { testimonials } = siteConfig;

  const items: TestimonialSlide[] = testimonials.items.map((item) => ({
    id: item.id,
    quote: item.quote,
    rating: item.rating,
    project: item.project,
    author: {
      name: item.author.name,
      role: item.author.role,
      company: item.author.company,
    },
    avatar:
      item.author.image && publicAssetExists(item.author.image.src)
        ? { src: item.author.image.src, alt: item.author.image.alt }
        : null,
  }));

  if (items.length === 0) return null;

  return (
    <Section id="testimonials" tone="muted" padding="lg">
      <SlideUp className="flex justify-center">
        <SectionHeading {...testimonials.heading} align="center" />
      </SlideUp>

      <TestimonialsCarousel items={items} />
    </Section>
  );
}

Testimonials.displayName = "Testimonials";
