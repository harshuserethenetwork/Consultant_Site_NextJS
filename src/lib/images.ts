/**
 * Server-side helpers for files stored in /public.
 *
 * The starter ships without photography or screenshots (they are yours to
 * add), so sections ask `publicAssetExists()` before rendering an `<Image>`.
 * If the file is missing they draw a styled placeholder instead of a broken
 * image icon — and the real image appears automatically on the next build
 * once you drop it into /public.
 *
 * Only import this from Server Components: it uses `node:fs`.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

/** True when `src` points at a file that currently exists inside /public. */
export function publicAssetExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  // `..` would escape /public — never treat such a path as an asset.
  if (src.includes("..")) return false;
  return existsSync(join(process.cwd(), "public", src));
}
