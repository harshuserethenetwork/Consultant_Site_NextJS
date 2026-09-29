import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { Service } from "@/types/config";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTA } from "@/components/sections/CTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const { services, seo, engagement } = siteConfig;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs 404 at the router level — before streaming starts — so they
 *  get a real 404 status code instead of a streamed 200. */
export const dynamicParams = false;

/** One static route per service, e.g. /services/customer-support. */
export function generateStaticParams(): { slug: string }[] {
  return services.items.map((service) => ({ slug: service.slug }));
}

function findService(slug: string): Service | undefined {
  return services.items.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      url: `${seo.siteUrl}/services/${service.slug}`,
      siteName: siteConfig.company.name,
      images: seo.ogImage
        ? [
            {
              url: seo.ogImage,
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ]
        : [],
      type: "website",
    },
  };
}

/**
 * Service detail: breadcrumbs, the full description, the "what we handle"
 * checklist, an engagement sidebar with the published rate structure, related
 * services from the same category and the site CTA.
 */
export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const category = services.categories.find((item) => item.id === service.category);
  const related = services.items.filter(
    (item) => item.category === service.category && item.id !== service.id,
  );

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.shortDescription}
        eyebrow={category?.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          ...(category
            ? [
                {
                  label: category.name,
                  href: `/services#${category.anchor}`,
                },
              ]
            : []),
          { label: service.title },
        ]}
      />

      {/* ------------------------------------------------------------ overview */}
      <Section padding="lg">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <SlideUp className="flex flex-col gap-6">
              {category ? <Badge variant="outline">{category.name}</Badge> : null}

              <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                {service.description}
              </p>
            </SlideUp>

            {/* what we handle */}
            <SlideUp delay={0.1} className="flex flex-col gap-6">
              <SectionHeading {...services.detail.features} as="h2" />

              <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 bg-card px-6 py-4 text-sm leading-relaxed text-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </SlideUp>
          </div>

          {/* ----------------------------------------------------------- sidebar */}
          <SlideUp delay={0.15}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Card className="p-6 sm:p-8">
                <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase">
                  {services.detail.engagementLabel}
                </p>

                <dl className="mt-5 divide-y divide-border border-y border-border">
                  {engagement.summary.map((row) => (
                    <div key={row.label} className="py-4">
                      <dt className="text-xs text-muted-foreground">{row.label}</dt>
                      <dd className="mt-1 font-heading text-lg font-semibold text-foreground">
                        {row.value}
                      </dd>
                      {row.note ? (
                        <dd className="mt-0.5 text-xs text-muted-foreground">
                          {row.note}
                        </dd>
                      ) : null}
                    </div>
                  ))}
                </dl>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {engagement.caveat}
                </p>

                <Link
                  href={services.detail.cta.href}
                  target={services.detail.cta.external ? "_blank" : undefined}
                  rel={services.detail.cta.external ? "noopener noreferrer" : undefined}
                  className={buttonVariants({ className: "mt-6 w-full" })}
                >
                  {services.detail.cta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Card>
            </div>
          </SlideUp>
        </div>
      </Section>

      {/* --------------------------------------------------------- related */}
      {related.length > 0 ? (
        <Section id="related" tone="muted" padding="lg">
          <SlideUp>
            <SectionHeading {...services.detail.related} />
          </SlideUp>

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground/30"
                >
                  <span className="font-mono text-xs text-primary">
                    {
                      services.categories.find((entry) => entry.id === item.category)
                        ?.index
                    }
                  </span>

                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.shortDescription}
                  </p>

                  {services.linkLabel ? (
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary">
                      {services.linkLabel}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  ) : null}
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      ) : null}

      <CTA />
    </>
  );
}
