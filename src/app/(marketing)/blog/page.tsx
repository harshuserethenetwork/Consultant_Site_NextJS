import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHeader } from "@/components/sections/PageHeader";
import { BlogCard } from "@/components/sections/BlogCard";
import { Section } from "@/components/ui/Section";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { formatDate, getInitials } from "@/lib/utils";

const { blog, features, company } = siteConfig;

export async function generateMetadata(): Promise<Metadata> {
  if (!features.showBlog) return {};

  return {
    title: "Insights",
    description: blog.heading.subtitle,
    openGraph: {
      title: "Insights",
      description: blog.heading.subtitle,
      url: "/blog",
      siteName: company.name,
      type: "website",
    },
  };
}

/**
 * /blog — the article index, gated by `features.showBlog` (disabled means
 * `notFound()`). The featured post gets a wide hero card; the rest land in
 * a staggered grid.
 */
export default function BlogIndexPage() {
  if (!features.showBlog) notFound();

  const featured = blog.posts.find((post) => post.featured);
  const remaining = blog.posts.filter((post) => post !== featured);

  return (
    <>
      <PageHeader
        title={blog.heading.title}
        highlight={blog.heading.highlight}
        eyebrow={blog.heading.eyebrow}
        description={blog.heading.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      {/* --------------------------------------------------------- featured */}
      {featured ? (
        <Section padding="md">
          <SlideUp>
            <Card interactive className="group relative overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video overflow-hidden border-b border-border bg-muted/30 md:aspect-auto md:min-h-72 md:border-r md:border-b-0">
                  <MediaImage
                    image={featured.image}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-4 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent">Featured</Badge>
                    <Badge variant="secondary">{featured.category}</Badge>
                  </div>

                  <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="after:absolute after:inset-0"
                    >
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {featured.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 font-heading text-xs font-semibold text-primary">
                        {getInitials(featured.author.name)}
                      </span>
                      <span className="font-medium text-foreground">
                        {featured.author.name}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5" aria-hidden="true" />
                      <time dateTime={featured.publishedAt}>
                        {formatDate(featured.publishedAt)}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {featured.readingTime}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-primary"
                  >
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Card>
          </SlideUp>
        </Section>
      ) : null}

      {/* ----------------------------------------------------------- grid */}
      {remaining.length > 0 ? (
        <Section
          id="articles"
          tone={featured ? "muted" : "default"}
          padding={featured ? "sm" : "md"}
        >
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {remaining.map((post) => (
              <StaggerItem key={post.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      ) : null}
    </>
  );
}
