import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/types/config";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MediaImage } from "@/components/ui/MediaImage";
import { formatDate } from "@/lib/utils";

/**
 * Article preview used on /blog (grid) and in the related-posts block of
 * /blog/[slug]. The whole card is clickable through a stretched link on the
 * title, so screen readers hear one link per card.
 *
 * Server Component — content comes straight from `site.config.ts`.
 */
export interface BlogCardProps {
  post: BlogPost;
  /** Heading level so cards stay correct under their section heading. */
  headingLevel?: "h2" | "h3";
  /** Responsive `sizes` hint for the cover image. */
  sizes?: string;
}

const DEFAULT_SIZES = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

export function BlogCard({
  post,
  headingLevel = "h2",
  sizes = DEFAULT_SIZES,
}: BlogCardProps) {
  const HeadingTag = headingLevel === "h3" ? "h3" : "h2";
  const titleClasses =
    "font-heading text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary";

  return (
    <Card interactive className="group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden border-b border-border bg-muted/30">
        <MediaImage
          image={post.image}
          sizes={sizes}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {post.readingTime}
          </span>
        </div>

        <HeadingTag className={titleClasses}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </HeadingTag>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary"
        >
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Card>
  );
}

BlogCard.displayName = "BlogCard";
