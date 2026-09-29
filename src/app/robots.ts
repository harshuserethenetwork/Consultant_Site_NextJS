import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

/**
 * robots.ts — allow all crawlers and point them at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.seo.siteUrl}/sitemap.xml`,
  };
}
