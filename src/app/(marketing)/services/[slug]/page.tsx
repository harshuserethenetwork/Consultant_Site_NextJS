import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, Wallet } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { Service } from "@/types/config";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfigIcon } from "@/components/ui/ConfigIcon";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTA } from "@/components/sections/CTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const { services, seo } = siteConfig;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs 404 at the router level — before streaming starts — so they
 *  get a real 404 status code instead of a streamed 200. */
export const dynamicParams = false;

/** One static route per service, e.g. /services/custom-software-development. */
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
      url: `/services/${service.slug}`,
      siteName: siteConfig.company.name,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: service.title }],
      type: "website",
    },
  };
}

/**
 * Service detail: page header, full description, the "what's included" list,
 * a meta sidebar with the enquiry button, related services and the site CTA.
 * Unknown slugs render the 404 via `notFound()`.
 */
export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const related = services.items.filter((item) => item.id !== service.id).slice(0, 3);

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* ------------------------------------------------------------ overview */}
      <Section padding="lg">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <SlideUp className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <ConfigIcon name={service.icon} className="size-6" />
                </span>

                {service.badge ? (
                  <Badge
                    variant="accent"
                    icon={<ConfigIcon name={service.badge.icon} className="size-3.5" />}
                  >
                    {service.badge.label}
                  </Badge>
                ) : null}
              </div>

              <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                {service.description}
              </p>
            </SlideUp>

            {/* what's included */}
            <SlideUp delay={0.1} className="flex flex-col gap-6">
              <SectionHeading {...services.detail.features} as="h2" />

              <ul className="grid gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2 sm:p-8">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
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
                <dl className="flex flex-col gap-5">
                  {service.startingPrice ? (
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Wallet className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs text-muted-foreground">Investment</dt>
                        <dd className="font-heading text-lg font-semibold text-foreground">
                          {service.startingPrice}
                        </dd>
                      </div>
                    </div>
                  ) : null}

                  {service.timeline ? (
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Clock className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Typical timeline
                        </dt>
                        <dd className="font-heading text-lg font-semibold text-foreground">
                          {service.timeline}
                        </dd>
                      </div>
                    </div>
                  ) : null}
                </dl>

                <Link
                  href={services.detail.cta.href}
                  target={services.detail.cta.external ? "_blank" : undefined}
                  rel={services.detail.cta.external ? "noopener noreferrer" : undefined}
                  className={buttonVariants({ className: "mt-7 w-full" })}
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
                  className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ConfigIcon name={item.icon} className="size-5" />
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
