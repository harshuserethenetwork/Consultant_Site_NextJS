import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { BlogPost } from "@/types/config";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHeader } from "@/components/sections/PageHeader";
import { BlogCard } from "@/components/sections/BlogCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlideUp } from "@/components/animations/SlideUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { formatDate, getInitials } from "@/lib/utils";
import { publicAssetExists } from "@/lib/images";

const { blog, features, seo } = siteConfig;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs (and every slug when the blog is disabled) 404 at the router
 *  level — before streaming starts — so they get a real 404 status code. */
export const dynamicParams = false;

/** One static route per article, e.g. /blog/why-discovery-saves-you-money. */
export function generateStaticParams(): { slug: string }[] {
  if (!features.showBlog) return [];
  return blog.posts.map((post) => ({ slug: post.slug }));
}

function findPost(slug: string): BlogPost | undefined {
  return blog.posts.find((post) => post.slug === slug);
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post || !features.showBlog) return {};

  const image = publicAssetExists(post.image.src) ? post.image.src : seo.ogImage;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: siteConfig.company.name,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: image,
          width: post.image.width ?? 1200,
          height: post.image.height ?? 675,
          alt: post.image.alt,
        },
      ],
    },
  };
}

/**
 * Article page: byline, cover image, the config-driven body (sections of
 * headings + paragraphs), tags and a related-posts grid. Gated by
 * `features.showBlog`; unknown slugs render the branded 404.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  if (!features.showBlog) notFound();

  const post = findPost(slug);
  if (!post) notFound();

  // Same-category posts first, then the rest — at most three cards.
  const related = blog.posts
    .filter((other) => other.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) - Number(a.category === post.category),
    )
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title={post.title}
        eyebrow={post.category}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* ------------------------------------------------------------ article */}
      <Section padding="lg">
        <article className="mx-auto flex max-w-3xl flex-col gap-8">
          <SlideUp className="flex flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary">
                {getInitials(post.author.name)}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {post.author.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.author.role}
                </span>
              </span>
            </span>

            <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" aria-hidden="true" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden="true" />
                {post.readingTime}
              </span>
            </span>
          </SlideUp>

          <SlideUp delay={0.05}>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-lg">
              <MediaImage
                image={post.image}
                sizes="(min-width: 1024px) 48rem, 100vw"
                priority
              />
            </div>
          </SlideUp>

          <SlideUp delay={0.1} className="flex flex-col gap-8">
            <p className="text-lg leading-relaxed text-foreground sm:text-xl">
              {post.excerpt}
            </p>

            {post.content.map((section, index) => (
              <div
                key={section.heading ?? `section-${index}`}
                className="flex flex-col gap-4"
              >
                {section.heading ? (
                  <h2 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {section.heading}
                  </h2>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-muted-foreground sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            {post.tags.length > 0 ? (
              <div className="border-t border-border pt-6">
                <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                  Tags
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </SlideUp>
        </article>
      </Section>

      {/* -------------------------------------------------------- related posts */}
      {related.length > 0 ? (
        <Section tone="muted" padding="lg">
          <div className="flex flex-col gap-8">
            <SectionHeading {...blog.related} align="center" />

            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <StaggerItem key={other.id}>
                  <BlogCard post={other} headingLevel="h3" />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="flex justify-center">
              <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                All insights
              </Link>
            </div>
          </div>
        </Section>
      ) : null}
    </>
  );
}
