import { Hero } from "@/components/sections/Hero";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Stats } from "@/components/sections/Stats";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

/**
 * Home page. Sections render (or not) according to `siteConfig.features`,
 * so this file stays a plain list in page order:
 *
 *   hero → client logos → about → services → stats → work →
 *   testimonials → pricing → FAQ → call to action
 *
 * The `(marketing)` route group shares the root layout — it adds the header,
 * footer and theme provider — so no layout file is needed here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsMarquee />
      <AboutPreview />
      <ServicesPreview />
      <Stats />
      <FeaturedProjects />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
