import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/config/site.config";

/**
 * Blog gate at the request level.
 *
 * The /blog listing is a static route, so its `notFound()` prerenders and is
 * served with a soft-404 status (200 + noindex). When the blog is disabled
 * we intercept the request here — before any route renders — and rewrite it
 * to a path that matches no route, so Next serves the branded 404 page with
 * a real 404 status code. Unknown slugs are already genuine 404s via
 * `dynamicParams = false` on /blog/[slug].
 */
export function proxy(request: NextRequest) {
  if (siteConfig.features.showBlog) {
    return NextResponse.next();
  }
  return NextResponse.rewrite(new URL("/blog-disabled", request.url));
}

export const config = {
  matcher: ["/blog"],
};
