import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { ProcessDiagram } from "@/components/sections/ProcessDiagram";
import { TechnologyBand } from "@/components/sections/TechnologyBand";
import { ExperiencePrinciples } from "@/components/sections/ExperiencePrinciples";
import { EngagementSummary } from "@/components/sections/EngagementSummary";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

/**
 * Home page. Sections render (or not) according to `siteConfig.features`,
 * so this file stays a plain list in page order:
 *
 *   hero → capabilities → process → technology → experience →
 *   engagement → FAQ → call to action
 *
 * The `(marketing)` route group shares the root layout — it adds the header,
 * footer and theme provider — so no layout file is needed here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <ProcessDiagram />
      <TechnologyBand />
      <ExperiencePrinciples />
      <EngagementSummary />
      <FAQ />
      <CTA />
    </>
  );
}
