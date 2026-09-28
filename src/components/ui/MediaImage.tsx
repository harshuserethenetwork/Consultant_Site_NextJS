import Image from "next/image";
import type { ImageAsset } from "@/types/config";
import { publicAssetExists } from "@/lib/images";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/utils";

/**
 * Renders an `ImageAsset` from the config.
 *
 * The starter ships without photography: if the file is not in /public yet,
 * a styled placeholder (alt text + expected path) is drawn instead, so the
 * layout never shows a broken image. Drop the file into /public and it
 * appears on the next build.
 *
 * Server Component (it reads the file system) — only import it from server
 * code. The parent element owns the size (`aspect-*`, `h-*`, …); the image
 * fills it with `object-cover`.
 */
export interface MediaImageProps {
  image: ImageAsset;
  /** Extra classes for the placeholder (the image itself when it exists). */
  className?: string;
  /** Responsive `sizes` hint passed to next/image. */
  sizes?: string;
  /** Load without waiting for lazy-loading (use for above-the-fold images). */
  priority?: boolean;
}

export function MediaImage({
  image,
  className,
  sizes,
  priority = false,
}: MediaImageProps) {
  if (!publicAssetExists(image.src)) {
    return <MediaPlaceholder src={image.src} alt={image.alt} className={className} />;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 1200}
      height={image.height ?? 900}
      sizes={sizes}
      priority={priority}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

MediaImage.displayName = "MediaImage";
