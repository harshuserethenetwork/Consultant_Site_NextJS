"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";

/**
 * Root error boundary: catches unexpected render errors in the route segment
 * below the root layout (header/footer/Theme stay alive).
 *
 * Client Component — required by the error.tsx convention. Next 16 passes
 * `retry` (stable since v16.3), which re-fetches and re-renders the failed
 * segment; `reset` still exists but `retry` is the recommended default.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div
        role="alert"
        className="w-full max-w-lg animate-fade-in-up rounded-2xl border border-destructive/30 bg-card p-8 text-center shadow-lg"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <TriangleAlert className="size-7" aria-hidden="true" />
        </span>

        <h1 className="mt-5 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          An unexpected error occurred while loading this page. You can try again, or
          head back to the homepage.
        </p>

        {error.digest ? (
          <p className="mt-4 text-xs text-muted-foreground">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => retry()} className={buttonVariants()}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Try again
          </button>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
