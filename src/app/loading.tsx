/**
 * Instant loading UI while a route segment streams in (loading.tsx
 * convention). A static skeleton shaped like a page header + card grid, so
 * the swap to real content feels like a continuation, not a jump.
 *
 * Server Component — pure markup, no client JS. The global
 * prefers-reduced-motion rule in globals.css stops the pulse animation for
 * visitors who ask for it.
 */
export default function Loading() {
  return (
    <div role="status" className="flex flex-1 flex-col">
      <span className="sr-only">Loading page…</span>

      {/* Header band, mirroring <PageHeader>. */}
      <div className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent py-16 sm:py-20">
        <div className="container flex flex-col gap-4">
          <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
          <div className="h-9 w-2/3 max-w-xl animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 max-w-lg animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Content band, mirroring a card grid. */}
      <div className="container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <div className="aspect-video animate-pulse bg-muted" />
              <div className="flex flex-col gap-3 p-6">
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                <div className="h-5 w-11/12 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
