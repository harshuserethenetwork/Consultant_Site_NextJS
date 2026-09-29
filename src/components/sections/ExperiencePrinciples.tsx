import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";

/**
 * Experience + operating principles: the approved management-experience
 * statement, supporting paragraphs and the five principles. The wording of
 * the statement is fixed — never rewrite it as a company age or track record.
 *
 * Server Component — content comes from `siteConfig.about.experience`.
 */
export function ExperiencePrinciples({
  id = "experience",
  tone = "default",
}: {
  /** Section anchor, e.g. "experience". */
  id?: string;
  /** Background treatment. */
  tone?: "default" | "muted" | "card";
} = {}) {
  if (!siteConfig.features.experience) return null;
  const { about } = siteConfig;
  const experience = about.experience;

  return (
    <Section id={id} tone={tone} padding="md">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SlideUp className="flex flex-col gap-6">
              <SectionHeading {...experience.heading} />

              <p className="font-heading text-3xl leading-tight font-semibold tracking-tight text-primary sm:text-4xl">
                {experience.statement}
              </p>

              <div className="flex flex-col gap-4">
                {experience.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {experience.cta ? (
                <div>
                  <Link
                    href={experience.cta.href}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    {experience.cta.label}
                  </Link>
                </div>
              ) : null}
            </SlideUp>
          </div>

          <div className="lg:col-span-7">
            <SlideUp delay={0.1}>
              <SectionHeading
                {...experience.principles.heading}
                as="h3"
                className="mb-6"
              />

              <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border">
                {experience.principles.items.map((principle, index) => (
                  <li
                    key={principle.id}
                    className="flex flex-col gap-2 bg-card px-6 py-5 sm:flex-row sm:gap-6"
                  >
                    <span className="font-mono text-xs text-primary sm:pt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span className="font-heading text-base font-semibold text-foreground">
                        {principle.title}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {principle.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </SlideUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}

ExperiencePrinciples.displayName = "ExperiencePrinciples";
