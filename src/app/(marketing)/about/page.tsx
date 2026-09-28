import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/components/ui/Button";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHeader } from "@/components/sections/PageHeader";
import { TeamCard } from "@/components/sections/TeamCard";
import { Timeline } from "@/components/sections/Timeline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { publicAssetExists } from "@/lib/images";
import { getInitials } from "@/lib/utils";

const { about, team, company } = siteConfig;

export const metadata: Metadata = {
  title: "About us",
  description: about.heading.subtitle ?? company.description,
};

/**
 * The full company story: page header, story + collage, mission & vision
 * cards, values grid, the animated milestone timeline and the team grid.
 *
 * Every string comes from `site.config.ts` (`about`, `team` blocks).
 */
export default function AboutPage() {
  const pillars = [
    { key: "mission", ...about.missionVision.mission },
    { key: "vision", ...about.missionVision.vision },
  ];

  return (
    <>
      <PageHeader
        title={about.heading.title}
        highlight={about.heading.highlight}
        eyebrow={about.heading.eyebrow}
        description={about.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />

      {/* ---------------------------------------------------------------- story */}
      <Section id="story" padding="lg">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <SlideUp className="flex flex-col gap-6">
            <SectionHeading {...about.subsections.story} as="h2" />

            <div className="space-y-4">
              {about.story.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-lg leading-relaxed text-foreground"
                      : "leading-relaxed text-muted-foreground"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {about.signature ? (
              <div className="flex items-center gap-4 border-t border-border pt-6">
                <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {about.signature.image &&
                  publicAssetExists(about.signature.image.src) ? (
                    <Image
                      src={about.signature.image.src}
                      alt={about.signature.image.alt}
                      width={96}
                      height={96}
                      className="size-full object-cover"
                    />
                  ) : (
                    getInitials(about.signature.name)
                  )}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {about.signature.name}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {about.signature.role}
                  </span>
                </span>
              </div>
            ) : null}
          </SlideUp>

          <FadeIn delay={0.1} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-lg">
              <MediaImage image={about.image} sizes="(min-width: 1024px) 46vw, 100vw" />
            </div>

            {about.secondaryImage ? (
              <div className="absolute right-4 -bottom-6 hidden overflow-hidden rounded-xl border border-border bg-card shadow-xl sm:block lg:-right-6">
                <div className="relative aspect-[4/3] w-40 lg:w-48">
                  <MediaImage image={about.secondaryImage} sizes="192px" />
                </div>
              </div>
            ) : null}
          </FadeIn>
        </div>
      </Section>

      {/* ------------------------------------------------------ mission & vision */}
      <Section id="purpose" tone="muted" padding="lg">
        <SlideUp className="flex justify-center">
          <SectionHeading {...about.subsections.missionVision} align="center" />
        </SlideUp>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.key} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <ConfigIcon name={pillar.icon} className="size-6" />
                </span>
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {pillar.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* --------------------------------------------------------------- values */}
      <Section id="values" padding="lg">
        <SlideUp className="flex justify-center">
          <SectionHeading {...about.subsections.values} align="center" />
        </SlideUp>

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {about.values.map((value) => (
            <StaggerItem key={value.title} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <ConfigIcon name={value.icon} className="size-5" />
                </span>
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ------------------------------------------------------------- timeline */}
      <Section id="timeline" tone="muted" padding="lg">
        <SlideUp className="flex justify-center">
          <SectionHeading {...about.subsections.timeline} align="center" />
        </SlideUp>

        <Timeline />
      </Section>

      {/* ----------------------------------------------------------------- team */}
      <Section id="team" padding="lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SlideUp>
            <SectionHeading {...team.heading} className="max-w-2xl" />
          </SlideUp>

          {team.cta ? (
            <SlideUp delay={0.1}>
              <Link
                href={team.cta.href}
                target={team.cta.external ? "_blank" : undefined}
                rel={team.cta.external ? "noopener noreferrer" : undefined}
                className={buttonVariants({ variant: "outline" })}
              >
                {team.cta.label}
              </Link>
            </SlideUp>
          ) : null}
        </div>

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {team.members.map((member) => (
            <StaggerItem key={member.id} className="h-full">
              <TeamCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
