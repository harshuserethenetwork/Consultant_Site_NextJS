# Process IQ Tech — Website Audit Report

> **Audit type:** Read-only inspection. No project files were modified, created, deleted, renamed or rewritten during the audit itself (this report file was created afterwards on request).
>
> **Verification:** `git status` clean · `tsc --noEmit` exits 0 · `eslint .` exits 0.

---

## Executive summary

> **Headline finding:** The project contains **zero Process IQ Tech content**. It is a fully-populated demo site for a fictional software agency called **"Nexora"** (San Francisco, founded 2014, custom software / cloud / AI). Every piece of copy, every service, every stat, testimonial, client, team member, price and case study belongs to *Nexora*, not to your client. A grep for `Process IQ|ProcessIQ|processiq` across `src/` returns **0 matches**.

The good news: the **engineering foundation is strong** — App Router, TypeScript strict, Tailwind v4, config-driven content, accessible primitives, clean lint/typecheck. Roughly 70% of the value is a well-built skeleton that needs to be re-contented and re-skin-ned, not rewritten.

The bad news: **every image is missing**, **no email is actually delivered**, **SEO basics (sitemap/robots/canonical/JSON-LD) are absent**, and the site publishes **fabricated certifications, clients, testimonials and metrics** that must never go live.

---

# 1. Technology Stack

| Area | Finding | Evidence |
|---|---|---|
| **Next.js** | **16.3.6** (App Router; brand-new major) | `package.json:19` |
| **React** | **19.2.8** (react + react-dom) | `package.json:21-22` |
| **TypeScript** | **5.9.3** (`^5`), `strict: true` | `package.json:37`, `tsconfig.json:7` |
| **Router** | **App Router only** — `src/app/`, no `pages/` | repo tree |
| **Route group** | `(marketing)` group, no nested layout inside it | `src/app/(marketing)/` |
| **Styling** | **Tailwind CSS v4.3.3** via `@import "tailwindcss"` + `@config "../../tailwind.config.ts"` (v4 hybrid: JS config kept, loaded by v4 directive) | `src/app/globals.css:12-13` |
| **CSS tokens** | Theme colors are **not** in CSS files — generated at runtime from config by `src/lib/theme.ts` and injected as a `<style href="site-theme" precedence="high">` tag | `src/app/layout.tsx:109-113` |
| **UI library** | **None** (no shadcn, Radix, MUI, Headless UI). Hand-built primitives in `src/components/ui/` (14 files) | — |
| **Animation** | **framer-motion 13.4.4** + CSS keyframes (`marquee`, `float`, `fade-in-up`) in Tailwind config | `package.json:17` |
| **Icons** | **lucide-react 1.48.0** (22 glyphs mapped by name in `src/lib/icons.ts`) + hand-inlined brand SVG paths in `SocialIcon.tsx` (simple-icons) | — |
| **Forms** | **react-hook-form 7.89.0** | `package.json:23` |
| **Validation** | **zod 4.6.5** + **@hookform/resolvers 5.9.1** — one shared schema, run on client *and* server | `src/lib/validations.ts` |
| **API / backend** | **One Route Handler**: `POST /api/contact`. No tRPC, no server actions | `src/app/api/contact/route.ts` |
| **Database** | **None** (no Prisma/Drizzle/Supabase/Firebase in deps) | — |
| **Auth** | **None** | — |
| **3rd-party integrations** | Google Maps `<iframe>` on `/contact`; WhatsApp/mailto deep links. Email provider (Resend) **referenced but not installed** | `route.ts:133-156` |
| **Analytics** | **None installed.** `NEXT_PUBLIC_GA_MEASUREMENT_ID` is documented in `.env.example:22` but **never referenced in code** | grep = 0 hits |
| **CMS** | **None.** All content lives in a single TS file | `src/config/site.config.ts` (1,521 lines) |
| **Theme** | `next-themes 0.4.6` (light/dark/system, class strategy) | `ThemeProvider.tsx` |
| **Utilities** | `clsx` + `tailwind-merge` (`cn()`), `lucide-react` | — |
| **Package manager** | **npm** (`package-lock.json`, no yarn/pnpm/bun lockfiles) | repo root |
| **Lint / Format** | ESLint 9 flat config (`eslint-config-next/core-web-vitals` + `/typescript`) — **passes clean**; Prettier 3 + `prettier-plugin-tailwindcss` | `eslint.config.mjs`, `.prettierrc.json` |
| **Middleware** | Next 16 **`src/proxy.ts`** (the middleware replacement) — rewrites `/blog` → `/blog-disabled` when blog is off | `src/proxy.ts` |
| **next.config.ts** | **Empty** — no image domains, no headers, no bundle config | `next.config.ts` |
| **Tests / CI** | **None** (no test files, no `.github/`, no test deps) | — |
| **Node/types** | `@types/node ^20`, `@types/react ^19` | `package.json:29-31` |

### Installed versions (verified from `node_modules`)

```
next 16.3.6
react 19.2.8
tailwindcss 4.3.3
framer-motion 13.4.4
zod 4.6.5
typescript 5.9.3
```

**Notable:** Next 16 is a post-training-data major. `AGENTS.md` mandates reading `node_modules/next/dist/docs/` before writing code — relevant for the redesign phase. The project already uses `error.tsx`'s `retry` (stable since 16.3.0) rather than the deprecated `reset`, and `proxy.ts` instead of `middleware.ts` — so it is already idiomatic Next 16.

---

# 2. Project Architecture

```
Org_Next/
├── public/
│   ├── images/                 ← EXISTS BUT 100% EMPTY (untracked empty dir)
│   ├── logos/                  ← logo-light.svg, logo-dark.svg (the only real brand assets)
│   └── *.svg                   ← 5 stock create-next-app SVGs (unused)
├── src/
│   ├── app/
│   │   ├── layout.tsx          Root: fonts, metadata, theme CSS, header/footer/skip-link
│   │   ├── globals.css         Tailwind v4 entry + base/a11y/reduced-motion rules
│   │   ├── loading.tsx         Skeleton (server)
│   │   ├── error.tsx           Client, role=alert, retry()
│   │   ├── not-found.tsx       Server, 404
│   │   ├── favicon.ico
│   │   ├── api/contact/route.ts  POST: rate-limit → honeypot → zod → sendEmail()
│   │   └── (marketing)/        Route group sharing the root layout (no own layout)
│   │       ├── page.tsx  about/  blog/  contact/  projects/  services/
│   ├── components/
│   │   ├── animations/         5 client wrappers (FadeIn, SlideUp, Stagger, Counter, Parallax*)
│   │   ├── layout/             Header, Footer, MobileMenu, NewsletterForm, PageTransition, ScrollToTop, ThemeToggle
│   │   ├── providers/          ThemeProvider (next-themes)
│   │   ├── sections/           15 page sections
│   │   └── ui/                 14 primitives (Button, Card, Input, Section, MediaImage…)
│   ├── config/site.config.ts   ★ THE content database (1,521 lines / 60 KB)
│   ├── hooks/useScrollPosition.ts
│   ├── lib/                    animations, icons, images, theme, utils, validations
│   ├── types/config.ts         ★ Full typed schema (779 lines)
│   └── proxy.ts                Next 16 request interceptor (blog gate)
├── tailwind.config.ts          Loaded by Tailwind v4 @config directive
├── next.config.ts              EMPTY
└── tsconfig.json               strict, @/* → ./src/*
```

## Purpose of key directories

| Path | Purpose | Notes |
|---|---|---|
| `src/app` | App Router routes + global shell | One route group `(marketing)`; no nested layouts |
| `src/app/api` | Server route handlers | Exactly one endpoint |
| `pages/` | **Does not exist** | App Router only |
| `src/components/sections` | Page-level compositions | Read `siteConfig` directly (coupled) |
| `src/components/ui` | Reusable primitives | Truly reusable, prop-driven |
| `src/components/layout` | Site chrome | Config-driven |
| `src/config` | **All business content** | Single source of truth |
| `src/types` | Config schema types | Very thorough (779 lines) |
| `src/lib` | Pure helpers | Some dead exports |
| `src/hooks` | One scroll hook | — |
| `public` | Static assets | **`images/` empty — the biggest gap** |
| `styles/` | **Does not exist** | Single `globals.css` |
| API routes | `src/app/api/contact/route.ts` | Only endpoint |
| Config files | `next.config.ts` (empty), `tailwind.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.json`, `postcss.config.mjs` | — |

## Component coupling

**Truly reusable (prop-driven, no config import):**
`Button`(+`buttonVariants`), `Card`, `Badge`, `Input`, `Textarea`, `Container`, `Section`, `SectionHeading`, `SocialIcon`, `ConfigIcon`, `Accordion`, `MediaPlaceholder`, `PageHeader`, `BlogCard`, `TeamCard`, `TestimonialsCarousel`, all 5 animation wrappers.

**Tightly coupled (import `siteConfig` directly + feature-flag themselves):**
`Header`, `Footer`, `MobileMenu`, `Hero`, `AboutPreview`, `ServicesPreview`, `Stats`, `FeaturedProjects`, `Testimonials`, `Pricing`, `FAQ`, `ClientsMarquee`, `CTA`, `Timeline` ← *reads config from a **client** component with no feature gate*.

**Hybrid (props but wired to config at the call site):** `ProjectFilter`, `ContactForm`, `NewsletterForm`.

**Architecture verdict:** The config-driven design is genuinely good — the entire site can be re-branded by editing one file. But it also means "replacing Nexora with Process IQ Tech" is *mostly* a data problem, not a code problem.

---

# 3. Existing Routes

| Route | Purpose | Main Components | Current State | Keep/Redesign |
|---|---|---|---|---|
| `/` | Homepage (10 sections) | Hero, ClientsMarquee, AboutPreview, ServicesPreview, Stats, FeaturedProjects, Testimonials, Pricing, FAQ, CTA | Builds & renders; **all imagery is placeholder**; content is 100% Nexora | **Keep route, full content + visual redesign** |
| `/about` | Company story, mission/vision, values, timeline, team | PageHeader, Section, TeamCard, Timeline, MediaImage | Renders; 4 fake team members, fabricated 5-point timeline | **Keep route, replace all content** |
| `/services` | Service grid (5 items) | PageHeader, Card, StaggerContainer | Renders; card markup **duplicated** from `ServicesPreview` | **Keep route, redesign — content must become BPM/Operations/HR services** |
| `/services/[slug]` | Service detail (5 slugs, `dynamicParams=false`) | PageHeader, Card, CTA | Renders; no `Service` JSON-LD; not feature-gated | **Keep route, re-architect content model for new service taxonomy** |
| `/projects` | Portfolio w/ animated category filter | PageHeader, ProjectFilter | Renders; 6 fabricated case studies with fake metrics | **Decision needed: keep as case studies or remove** |
| `/projects/[slug]` | Case-study detail (6 slugs, `dynamicParams=false`) | PageHeader, MediaImage | Renders; fabricated ROI numbers | **Decision needed** |
| `/blog` | Insights index | PageHeader, BlogCard | Renders; OG object **drops the image**; feature-gated | **Keep if content strategy exists, else hide via `features.showBlog=false`** |
| `/blog/[slug]` | Article detail (3 posts, `dynamicParams=false`) | PageHeader, BlogCard | Renders; good article OG metadata; **no `BlogPosting` JSON-LD** | Keep/replace per content strategy |
| `/contact` | Contact cards + form + map | PageHeader, ContactForm, Card, iframe | **Form + API fully functional**; map points at San Francisco | **Keep route, replace all contact data** |
| `POST /api/contact` | Contact form backend | zod + in-memory rate limit + honeypot | Works; email delivery is a **stub** | **Keep, wire real provider** |
| `/error` | Client error boundary | — | Good (role=alert, retry, digest) | Keep |
| `/loading` | Route skeleton | — | Good (server, role=status) | Keep |
| `/not-found` | 404 | — | Good | Keep |
| `/privacy` `/terms` `/cookies` | Linked in footer legal row | — | **404 — routes do not exist** | **CRITICAL: create or remove links** |
| `/sitemap.xml` | Linked in footer legal row | — | **404 — no `sitemap.ts`** | **CRITICAL: create** |
| `/blog-disabled` | Rewrite target in `proxy.ts` | — | Intentionally nonexistent → real 404 | Keep |
| `robots.txt` | — | — | **Missing** | Create |
| `manifest.json` | — | — | Missing | Optional |

**Total: 9 real pages, 1 API route, 3 boundary files, 3 broken legal links.**

---

# 4. Existing Components

## 4.1 Inventory (53 components + 1 hook + 6 libs)

**`ui/` (14)** — Accordion, Badge, Button, Card, ConfigIcon, Container, Input, MediaImage, MediaPlaceholder, Section, SectionHeading, SocialIcon, Textarea *(+ unused `CardHeader/Title/Description/Content/Footer`)*

**`layout/` (7)** — Header, Footer, MobileMenu, NewsletterForm, PageTransition, ScrollToTop, ThemeToggle

**`sections/` (15)** — AboutPreview, BlogCard, ClientsMarquee, CTA, FAQ, FeaturedProjects, PageHeader, Pricing, ProjectFilter, ServicesPreview, Stats, TeamCard, Testimonials, TestimonialsCarousel, Timeline

**`animations/` (5)** — Counter, FadeIn, **ParallaxWrapper ⚠️ dead code**, SlideUp, StaggerContainer

**`providers/` (1)** — ThemeProvider

## 4.2 Quality grade per component

| Component | Server/Client | Grade | Key notes |
|---|---|---|---|
| Button | Server-safe | **A** | 4 variants × 4 sizes, `buttonVariants()` factory, `aria-busy` + sr-only loading label, real `<button type="button">` |
| Card | Server | **B+** | `interactive` is hover-only (no keyboard lift) |
| Input/Textarea | Server | **A−** | Shared `fieldClasses`; `[aria-invalid]` styling contract; React 19 ref-as-prop |
| Accordion | Client | **A−** | Canonical APG disclosure; fixed `h3`; **id collisions** across FAQ groups |
| MediaImage / MediaPlaceholder | Server | **B+** | Missing file → styled `<div>`, **no 404 request**; but placeholder **publicly prints the file path**; uses sync `existsSync` at render |
| Section / Container | Server | **A** | tone/padding maps, `scroll-mt-24`, `isolate` |
| SectionHeading | Server | **A** | `as` prop, exhaustive type scale, guarded highlight split |
| PageHeader | Server | **A−** | Excellent breadcrumb markup; `background="muted"/"default"` never used |
| SocialIcon | Server | **A** | Inlined brand paths, `aria-hidden`, unknown → null |
| Header | Client | **B** | Sticky + scroll state; `group-hover` dropdowns; **no keyboard-openable dropdown**; socials hidden <1280px |
| MobileMenu | Client | **C+** | `aria-modal`, Escape ✅, scroll lock ✅ — but **no focus trap, no focus restore, background not inert**; fixed overlay nested inside permanently `backdrop-blur` header → **possible containing-block bug** |
| Footer | Server | **A−** | Config-driven, newsletter band, badges |
| NewsletterForm | Client | **C** | **Fakes success after 900 ms — posts nowhere, no API route exists** |
| ThemeToggle | Client | **A** | `useSyncExternalStore` mounted flag → no hydration mismatch |
| PageTransition | Client | **B−** | `mode="wait"` adds ~300 ms perceived latency to every navigation |
| ScrollToTop | Client | **A** | Reduced-motion aware scroll behavior |
| Hero | Server | **A−** | Dot-grid + drifting orbs, 3 proof cards, trust note; all gated on config |
| ContactForm | Client | **A** | Best component in the repo: inline field errors, server-error merge, honeypot, `noValidate`, full aria wiring |
| TestimonialsCarousel | Client | **B+** | Pause on hover **and focus**, `aria-roledescription`, dots w/ `aria-current`; **no arrow keys, no `aria-live`**, prev/next hidden <640px |
| ProjectFilter | Client | **A−** | `aria-pressed`, `role="status"` count, reduced-motion layout off; card markup duplicates FeaturedProjects (already diverged) |
| Stats/Counter | Server + Client | **A** | SSR renders **final value**, animates on view, reduced-motion keeps SSR value |
| FAQ | Server | **A−** | Consecutive-only category grouping (reordering config splits groups) |
| Pricing | Server | **C+** | **`pricing.note` sits in a `flex justify-center` row beside the heading** → squeezes horizontally at 375px |
| ClientsMarquee | Server | **B−** | Duplicate track `aria-hidden` + `tabIndex=-1` ✅; **pause is hover-only** (WCAG 2.2.2); no region label |
| Timeline | Client | **B** | Reads config client-side, **not feature-gated**, duplicate-key risk |
| ParallaxWrapper | Client | **F** | **Never imported — dead code** |

**Dead components: 1 (`ParallaxWrapper`). Dead exports: ~12** (`absoluteUrl`, `slugify`, `truncate`, `isActivePath`, `getIcon`, `getPalette`, `EASE_IN_OUT`, `fadeVariants`, `slideUpVariants`, `slideFromLeftVariants`, `slideFromRightVariants`, `scaleInVariants`, `DEFAULT_VIEWPORT`, plus unused `Card*` subcomponents and `Badge` `ghost` variant).

**None of the 15 section components is dead code** — every one is reachable from a rendered route.

---

# 5. Current UI/UX Analysis

## Navbar

- **Layout:** `sticky top-0 z-50`, `h-16` (mobile) / `h-20` (lg). Logo left → nav center → [socials · theme toggle · CTA · hamburger] right.
- **Navigation:** Home · Company▾ · Services▾ · Work · Pricing · Insights · Contact. Two mega-dropdowns (`w-[32rem]` 2-col panels with descriptions + `Hiring` badge).
- **CTA:** "Start your project" → `/contact`, hidden below `sm` (640px).
- **Mobile menu:** Right slide-over `w-[min(24rem,100vw)]`, spring animation, backdrop blur, Escape + backdrop-click close. **No focus trap, no focus return.**
- **Sticky behavior:** Transparent at top → `bg-background/85 + backdrop-blur-md + border-b + shadow-sm` after 24px scroll.
- **Issues:** dropdowns are **hover/focus-within only** (no click toggle, no Escape, no arrow keys); social icons only appear ≥1280px; theme toggle occupies prime mobile real estate next to the hamburger.

## Hero

- **Headline:** "We build digital products that move your business forward" (highlight = "move your business forward") — **generic SaaS copy, not Process IQ**.
- **Supporting:** 3-sentence subtitle, eyebrow "Trusted digital partner since 2014".
- **CTA:** Primary "Start your project" + outline "Explore our work" (`/#projects`).
- **Visual:** Right column, 4:3 framed image with gradient glow; **file missing → placeholder panel showing the alt text and file path**. Decorative dot-grid + two `animate-float` orbs.
- **Layout:** 2-col `lg:grid-cols-2`, vertically centered, `py-16 md:py-24 lg:py-28`.
- **Extras:** Badge "New: AI delivery squads", 3 proof cards (ISO 27001 / 24h response / 40+ experts — **all fabricated**), star trust note "Rated 4.9/5 by 120+ clients across 14 countries" (**fabricated**).

## Homepage sections (order & hierarchy)

1. Hero (`#home`) → 2. ClientsMarquee (`#clients`) → 3. AboutPreview (`#about`) → 4. ServicesPreview (`#services`) → 5. Stats (`#stats`) → 6. FeaturedProjects (`#projects`) → 7. Testimonials (`#testimonials`) → 8. Pricing (`#pricing`) → 9. FAQ (`#faq`) → 10. CTA (`#cta`)

- **Content hierarchy:** Solid narrative arc (who → proof → what → numbers → work → social proof → cost → objections → convert).
- **Visual hierarchy:** Alternating tones (`default` → `sm/bleed` → `lg` → `muted` → `default`…) give good rhythm; every section uses `SectionHeading` with eyebrow + highlighted title.
- **Repetition:** "Learn more"-style links appear in 4 sections; the same `Card` chrome repeats 6×; the same fade-up entrance animation runs on essentially every element (monotonous).
- **Spacing:** Consistent `py` scale via `Section padding` map — genuinely well done.

## Cards

- **Design:** `rounded-2xl border border-border bg-card`, `p-6 sm:p-7/8`.
- **Consistency:** High within `ui/Card`, but **3 cards are duplicated across files** (project card ×2, service card ×2, blog featured card ×1) and have already drifted (badge icon present in one, missing in the other).
- **Hover:** `-translate-y-1` + ring + shadow; **not keyboard-reachable** (only when wrapped in a link, which is the usual case).

## Buttons

- **Primary:** `bg-primary text-primary-foreground`, indigo `#4F46E5`.
- **Secondary:** `bg-secondary` (near-black slate) / `outline` / `ghost`.
- **Hover:** `hover:bg-primary/90` style transitions + arrow `group-hover:translate-x-1`.
- **Accessibility:** Global `:focus-visible` outline (2px `var(--ring)`), mouse focus suppressed. Sizes `h-9/h-10/h-12` — **`sm`/`md` are 36/40px, below the 44px AAA touch target** (passes the 24px AA minimum). Loading state is exemplary.

## Forms

- **Structure:** Contact = name/email/phone/subject/message + hidden honeypot. Newsletter = email only.
- **Validation:** zod schema shared client+server, `mode: "onBlur"`, inline `role="alert"` errors, `aria-invalid` + `aria-describedby`.
- **UX:** Success replaces the form with an animated confirmation + "send another" reset. Server 422 errors map back to fields. 429/500 show a banner.
- **Backend:** `/api/contact` → rate limit (5/10 min/IP, in-memory) → JSON parse → honeypot → zod → `sendEmail()`. **`sendEmail` only logs to console unless `RESEND_API_KEY` is set, in which case it *throws* because no provider is implemented.** So **no email actually reaches anyone today.**
- **Newsletter:** **Fake — 900 ms delay then success. No endpoint.**

## Footer

- **Navigation:** 4 columns (Company / Services / Resources / Get in touch) + brand column w/ logo, description, 6 social icons, 3 trust badges.
- **Contact info:** email, phone, WhatsApp, "Book a meeting".
- **Legal row:** Privacy policy · Terms of service · Cookie policy · Sitemap — **all four 404.**
- **Design:** Newsletter band on `bg-muted/40` above the main footer; strong typographic structure.
- **Issues:** 2-column grid at 320–639px squeezes long URLs like `hello@nexora.tech`; fabricated ISO/AWS/GDPR badges.

---

# 6. Brand & Assets

## What actually exists

| Asset | Status | Preserve? |
|---|---|---|
| `public/logos/logo-light.svg` (615 B) | ✅ Real, but **it's the Nexora wordmark** | ❌ Replace — but **keep the light/dark/system trio pattern** |
| `public/logos/logo-dark.svg` (615 B) | ✅ Real (Nexora) | ❌ Replace |
| `src/app/favicon.ico` (25 KB) | ✅ Real (Nexora) | ❌ Replace |
| `public/images/` | ⚠️ **Empty directory** | Populate |
| `public/*.svg` (file, globe, next, vercel, window) | Stock create-next-app | 🗑 Delete (unused) |
| **26 `/images/...` references in config** | ❌ **All 404 → placeholder panels** | Populate |
| **6 `/logos/client-*.svg`** | ❌ Missing → text wordmark fallback | Populate or remove section |
| `/images/seo/og-cover.png` | ❌ Missing → **all social shares have no image** | Create (1200×630) |

## Colors (from `site.config.ts:205-238`)

| Token | Light | Dark |
|---|---|---|
| background | `#FFFFFF` | `#0B1220` |
| surface | `#F8FAFC` | `#111A2C` |
| foreground | `#0B1220` | `#E2E8F0` |
| muted | `#F1F5F9` | `#1B2437` |
| mutedForeground | `#64748B` | `#94A3B8` |
| border | `#E2E8F0` | `#1F2B41` |
| **primary** | **`#4F46E5`** (indigo) | `#6366F1` |
| secondary | `#0F172A` | `#1E293B` |
| **accent** | **`#06B6D4`** (cyan) | `#22D3EE` |
| ring | `#4F46E5` | `#6366F1` |

Plus feedback tokens in `globals.css`: destructive `#dc2626`, success `#16a34a`.

→ **This is Indigo/Cyan — a generic dev-tool palette. Not Process IQ's brand** (unless you decide it is).

## Typography

- **Heading:** **Sora** (700, `-0.02em`, `text-wrap: balance`)
- **Body:** **Inter** (400–600, `optimizeLegibility`)
- **Mono:** **JetBrains Mono** (code/some metadata)
- All via `next/font/google` → **self-hosted, zero runtime Google requests, `display: swap`** ✅
- Type scale is consistent: h1 `text-4xl→6xl`, h2 `text-3xl→5xl`, h3 `text-2xl→4xl`.
- **Font files:** none in repo (next/font downloads & caches at build).

## Icons

lucide-react (22 mapped names) + 14 hand-inlined social brand paths. **Reuse the mapping infrastructure**; only swap where brand-specific.

## Images / Illustrations / Backgrounds / Patterns

- **Zero real images exist.**
- Decorative patterns are all CSS: dot-grid radial gradient (Hero), blurred orbs, gradient section tones, marquee mask.

## Preserved vs replaced summary

- **Preserve:** architecture, token/theme system, dual-logo mechanism, `next/font` setup, typography scale, decorative CSS patterns, component API design.
- **Replace:** every string in `site.config.ts`, logos, favicon, og-image, all imagery, color palette (if brand differs), legal/social/SEO URLs.

---

# 7. Responsive Analysis

> Code-level analysis (no device testing performed).

| Breakpoint | Assessment | Likely issues |
|---|---|---|
| **320px** | 🟡 Mostly OK | Header collapses to logo + theme toggle + hamburger (CTA hidden) ✅. MobileMenu `w-[min(24rem,100vw)]` ✅. **Footer 2-col grid** squeezes `hello@nexora.tech` / `+1 (415) 555-0142` links. **Pricing note** sits beside the heading in a non-wrapping flex row. `text-4xl` h1 on a 288px content box → very tight line lengths for a 10-word headline. |
| **375px** | 🟡 | Same Pricing-note squeeze. Contact form is 1-col ✅. Marquee is clipped ✅. Hero proof cards stack ✅. |
| **390px** | 🟢 | Same as 375 with more room. |
| **414px** | 🟢 | No issues identified. |
| **640px (`sm`)** | 🟡 | **Pricing still 1 column** until `md` (768) — tablets in portrait 640–767 get a very tall single column (no `sm:grid-cols-2`). Testimonials **prev/next buttons hidden below `sm`** → dots only. `TeamCard` `sizes` says `45vw` but grid is `50vw` → undersized source. |
| **768px (`md`)** | 🟡 | Pricing jumps 1→3 columns at exactly 768 → ~230px cards with `p-6`, `text-4xl` price and 6–7 feature rows. Tight but survivable. `BlogCard` `sizes` claims `33vw` while `/blog` grid is 2-col here (should be `50vw`). |
| **1024px (`lg`)** | 🟢 | Desktop nav + dropdowns activate. Mega-panel `w-[32rem]`=512px could clip at the right edge if a dropdown opens on a right-side nav item (Services is 3rd of 6 — currently safe). FAQ becomes sticky 2/5 + 3/5 ✅. |
| **1280px (`xl`)** | 🟡 | Header social icons appear here — adding 2 icons + a button can crowd the nav at exactly 1280. |
| **1440px** | 🟢 | Content capped at `max-w-7xl` = **1280px**, centered. |
| **1920px** | 🟡 | **No `2xl` layouts anywhere** — content stays 1280px wide, leaving ~320px dead margin per side. Site looks narrow/empty on ultrawide. Tailwind `container` config caps at `2xl: 1280px` but **components use `Container` (max-w-7xl), not `.container`** — so that config is partly unused. |

## Specific problem scan

| Category | Findings |
|---|---|
| **Horizontal overflow** | Low risk. Hero/CTA/PageHeader decorative orbs all sit inside `Section` with `overflow-hidden` ✅. `Marquee` is clipped ✅. No `w-[…px]` or `vw` widths on content. **Only fixed width in the codebase:** `Header` dropdown `w-[32rem]` (desktop-only). |
| **Bad spacing** | Pricing heading+note flex-row bug; `AboutPreview` secondary image is `absolute -bottom-6` on a section **without `overflow-hidden`** → overlaps the next section on `sm+`; body scroll-lock in MobileMenu adds no scrollbar-width compensation → ~15px layout shift. |
| **Broken grids** | Pricing 1-col 640–767. Footer 2-col below `sm` (should be 1-col). Footer has a redundant `grid-cols-2 sm:grid-cols-2`. |
| **Typography** | `text-4xl` h1 at 320px with a 51-char headline. No `fluid`/clamp type — discrete jumps cause noticeable steps. `MediaPlaceholder` prints `max-w-56 text-[0.65rem] break-all` paths (ugly at any width). |
| **Navigation** | Header socials only ≥1280. Desktop dropdowns have no keyboard activation. MobileMenu `fixed` inside a `backdrop-blur` header → potential containing-block collapse (verify in browser). |
| **Images** | **All images are placeholders** — the single biggest responsive/visual problem. Once added: `BlogCard` and `TeamCard` `sizes` values don't match their actual grids. |
| **Forms** | Contact form 2-col from `sm` ✅; map iframe `h-64 sm:h-72` ✅; inputs `h-11` ✅. No issues. |
| **Footer** | 2-col below 640 causes long-URL wrapping; badge row wraps OK; legal row wraps OK. |

---

# 8. Functionality Analysis

## ✅ Works today

| Feature | Detail |
|---|---|
| **Contact form** | Full pipeline: RHF + zod client validation → `fetch('/api/contact')` → inline server errors → animated success state. |
| **Contact API** | In-memory rate limiting (5/10 min/IP with `Retry-After`), JSON guard, honeypot (fake success), server-side zod re-validation → 422 field errors. |
| **Navigation** | All internal links resolve to real routes; `/#section` anchors work (`scroll-padding-top: 6rem`, `scroll-mt-24` on sections); `isActivePath()` available. |
| **Mobile menu** | Opens/closes, Escape closes, backdrop closes, body scroll locks, links close on navigate. |
| **Theme switching** | Light → dark → system cycle, persisted (`storageKey="site-theme"`), **no FOUC** (inline theme CSS + next-themes pre-paint script). |
| **Animations** | Fade/slide/stagger entrances, counters, carousel autoplay, marquee, page transitions, floating orbs — **all with reduced-motion fallbacks**. |
| **Project filter** | Client-side category filter with layout animation + live region announcement. |
| **Blog / service / project detail routes** | `generateStaticParams` + `dynamicParams=false` → real 404s for unknown slugs. |
| **Blog feature gate** | `proxy.ts` rewrites `/blog` → 404 when `features.showBlog=false`. |
| **Error/loading/404 boundaries** | All three exist and are well-built. |
| **Skip link + `main#main-content`** | ✅ |
| **Theme-aware dual logos** | ✅ |

## ⚠️ Broken or non-functional

| Feature | Problem |
|---|---|
| **Email delivery** | `sendEmail()` is a stub. Without `RESEND_API_KEY` → logs to console only. **With** `RESEND_API_KEY` set → **throws an error** (provider not implemented). **No message ever reaches an inbox.** |
| **Newsletter form** | Fakes success after 900 ms. **No API route, no persistence.** |
| **All imagery** | 26 image refs + 6 client logos + og-image → files don't exist. |
| **Footer legal links** | `/privacy`, `/terms`, `/cookies`, `/sitemap.xml` → **404**. |
| **Analytics** | Env var documented, **never used**. |
| **GA / GTM / pixels** | None. |
| **`inquiryTypes` / `budgetRanges`** | Config defines dropdown options — **no select component exists, the form doesn't use them** (dead config). |
| **`features.about/services/projects/team`** | Toggles exist but **do not gate their routes** — only `showBlog` works at route level. |
| **WhatsApp / social links** | All point to `nexora.*` / `example.com` — wrong destinations. |
| **Google Map** | Embeds San Francisco. |

## Not present (so "do not break" is trivial)

Auth, database, payments, CMS, i18n, websockets, background jobs, file uploads, search.

---

# 9. SEO Analysis

## ✅ Present

- `metadataBase` from `seo.siteUrl`, title template (`%s | Nexora`), description, keywords, `applicationName`, authors, creator, icons.
- Open Graph (`type`, `locale`, `url`, `siteName`, `title`, `description`, 1200×630 image) + Twitter `summary_large_image`.
- `robots: { index: true, follow: true }` meta.
- `viewport` with `colorScheme: "light dark"` + theme-color per scheme.
- Per-page `title`/`description` on all 9 pages; `/blog/[slug]` has full **article** OG (`publishedTime`, `authors`, `section`, `tags`, image w/ fallback).
- Heading hierarchy is **correct everywhere**: single `h1` via `PageHeader`, `h2` sections, `h3` cards. No skips, no duplicates.
- **Every image has `alt`** — enforced by the `ImageAsset` type (`alt` required).
- Breadcrumb navigation with `aria-current="page"`.
- `dynamicParams=false` on all detail routes → clean 404 status codes.

## ❌ Problems (ranked)

| # | Severity | Issue |
|---|---|---|
| 1 | **Critical** | **No `alternates.canonical` on any page.** Grep for `canonical\|alternates` = only `metadataBase`. |
| 2 | **Critical** | **No `sitemap.ts`** — and the footer links to `/sitemap.xml` (404). |
| 3 | **Critical** | **No `robots.ts`** — no `robots.txt`. |
| 4 | **Critical** | **Zero structured data.** `grep 'ld+json\|schema.org'` across the whole repo = **0 hits**. Missing `Organization`, `WebSite`, `BreadcrumbList`, `Service`/`Offer`, `FAQPage`, `BlogPosting`. |
| 5 | **Critical** | **`seo.ogImage` = `/images/seo/og-cover.png` does not exist** → social shares render without an image (or with a 404). |
| 6 | **High** | **`seo.siteUrl = "https://www.nexora.tech"`** — wrong domain; propagates into OG/Twitter URLs. |
| 7 | **High** | Footer legal links → 404 (`/privacy`, `/terms`, `/cookies`). Thin/404 outbound links hurt trust signals. |
| 8 | **High** | **Fabricated claims** — ISO 27001, AWS Advanced Partner, "4.9/5 by 120+ clients", 98% satisfaction. Publishing unverifiable certification claims is a **legal/compliance risk**, not just an SEO one. |
| 9 | **Medium** | `/blog` index `generateMetadata` returns an `openGraph` object **without `images`** → replaces the parent's OG object and **drops the share image for that route**. |
| 10 | **Medium** | `/about` and `/services/[slug]` define no OG at all (inherit only partially). |
| 11 | **Medium** | Page titles (`"About us"`, `"Insights"`, `"Contact"`…) are **hardcoded in pages**, not from config — inconsistent with the config-driven architecture. |
| 12 | **Medium** | `robots` is hardcoded `index: true` in the root layout — can't be overridden per page. |
| 13 | **Low** | `not-found.tsx` has no `metadata` export (inherits root defaults, shows the Nexora homepage title on 404s). |
| 14 | **Low** | No `dateModified` on articles; related posts aren't sorted by date. |
| 15 | **Low** | No `manifest.webmanifest`, no `icons` beyond `favicon.ico` (no apple-touch-icon, no 192/512 PNG). |
| 16 | **Low** | Single `en` locale (fine), but `keywords` meta is largely ignored by Google anyway. |

---

# 10. Performance Analysis

## ✅ Good

- **Server Components dominate.** 12 of 15 sections are server components; client boundaries are narrow animation wrappers that receive server-rendered children.
- **Fonts:** `next/font` self-hosted, `display: swap`, latin subset only → no layout-shift from fonts, no Google round-trip.
- **Images:** `next/image` everywhere with explicit `width/height`, `sizes`, `priority` on above-fold; today **zero image bytes ship** (all placeholders).
- **No third-party scripts at all** (no GA, no chat widget, no tag manager).
- **Google Maps iframe** is `loading="lazy"`.
- **Reduced-motion** respected globally *and* per-component.
- `tsc` and `eslint` both pass clean.

## ⚠️ Issues

| # | Severity | Issue |
|---|---|---|
| 1 | **High** | **Content ships at `opacity: 0`.** framer-motion SSRs `initial` styles, so `FadeIn`/`SlideUp`/`StaggerContainer` content is invisible in the raw HTML. **With JS disabled or if hydration fails, below-fold sections are permanently invisible.** No `<noscript>` fallback. |
| 2 | **High** | **framer-motion 13** is the single heaviest dependency. It's imported by 16+ client files. On the homepage that's near-guaranteed download + hydration cost. |
| 3 | **High** | **`publicAssetExists()` uses synchronous `existsSync` at render time**, once per image per render. No memoisation or build manifest. Also **fails silently to all-placeholders** if `public/` isn't next to `process.cwd()` (standalone/serverless output). |
| 4 | **Medium** | **PageTransition `mode="wait"`** serialises navigation: exit (0.3s) must finish before the next page mounts → **every route change feels ~300ms slower**. |
| 5 | **Medium** | **Backdrop-filter compositing:** `Header` permanently applies `backdrop-blur-sm`/`md`, plus Hero/CTA blurred orbs and `blur-3xl` glows → continuous GPU compositing on scroll. |
| 6 | **Medium** | **Infinite marquee** (`marquee 40s linear infinite`) runs permanently; no `animation-play-state` on tab blur. |
| 7 | **Medium** | `sizes` mismatches: `BlogCard` `DEFAULT_SIZES` = `33vw` but `/blog` grid is **2 columns** (should be `50vw`); `TeamCard` says `90vw/45vw` vs actual `100vw/50vw`. |
| 8 | **Medium** | **3 font families** (Inter + Sora + JetBrains Mono). `font-mono` is barely used — could be a system mono. |
| 9 | **Medium** | `site.config.ts` (60 KB) is a single `const` — **the full 1,521-line content blob (including 3 full blog articles) is in the module graph of every page**. |
| 10 | **Low** | `next.config.ts` is empty — no `compress`, no custom headers, no `experimental.optimizePackageImports` for `lucide-react`. |
| 11 | **Low** | `ScrollToTop` + `useScrollPosition` listener fires constantly (re-renders bailed by `Object.is`). |
| 12 | **Low** | No `revalidate` — all content changes need a full rebuild. |
| 13 | **Low** | `tsconfig.tsbuildinfo` (144 KB) generated but gitignored ✅. |

**Overall perf posture: B.** Modern, light architecture; main risks are animation-driven JS/hydration, the sync-fs image check, and the fact that **the real image payload hasn't been incurred yet**.

---

# 11. Accessibility Analysis

## ✅ Strong (genuinely above average)

- Skip-to-content link in the root layout, `main#main-content`.
- Global `:focus-visible` outline (2px `var(--ring)`, offset 2px) with mouse-focus suppression.
- `prefers-reduced-motion` handled **twice**: a global CSS kill-switch *and* per-component `useReducedMotion()` (correctly, because framer writes inline styles the CSS rule can't reach).
- `<html lang="en">`, `suppressHydrationWarning` for next-themes.
- Form fields: real `<label htmlFor>`, `aria-invalid`, `aria-describedby`, `role="alert"` errors, `sr-only "(required)"`, `noValidate` with zod, honeypot `sr-only + tabIndex={-1} + aria-hidden`.
- Accordion: canonical APG pattern (`<h3><button aria-expanded aria-controls>` + `role="region" aria-labelledby`).
- Breadcrumbs: `<nav aria-label="Breadcrumb">`, `aria-current="page"`, decorative separators `aria-hidden`, Home has both icon and text.
- Filter pills: native `<button aria-pressed>` + `<p role="status">` result count.
- Carousel: `role="region"` + `aria-roledescription="carousel"`, `aria-label` buttons, `aria-current` dots, `role="img"` rating with `aria-hidden` stars, **pause on hover *and* focus**, duplicate slide half `aria-hidden` + `tabIndex={-1}`.
- Counter SSRs the final value → screen readers get the right number immediately.
- `loading.tsx` → `role="status"` + sr-only text; `error.tsx` → `role="alert"`.
- Decorative icons/text consistently `aria-hidden`.
- Marquee duplicate track is `aria-hidden` with `tabIndex={-1}` links.

## ❌ Issues

| # | Severity | Issue |
|---|---|---|
| 1 | **High** | **MobileMenu has no focus trap and no focus restoration.** It sets `aria-modal="true"` but Tab escapes into the header/page behind it, and on close focus drops to `<body>` instead of returning to the hamburger. |
| 2 | **High** | **Marquee auto-scroll pauses on hover only** — keyboard focus on a logo link does not pause it. WCAG 2.2.2 (Pause, Stop, Hide). |
| 3 | **High** | **No-JS / failed-JS users see `opacity: 0` content** (framer SSR `initial` styles) → effectively invisible content = WCAG failure in that scenario. |
| 4 | **Medium** | Desktop mega-dropdowns are **hover/`focus-within` only** — no click/Enter to open, no Escape to close, no arrow-key roving. |
| 5 | **Medium** | **Testimonials carousel:** no Left/Right arrow-key handling, no `aria-live` announcement of slide changes, no per-slide `role="group"`; **prev/next buttons are `hidden sm:inline-flex` → below 640px only dots control it.** |
| 6 | **Medium** | **Accordion derives element ids from `item.id` alone** → duplicate DOM ids across FAQ category groups. Heading level hardcoded `h3`. |
| 7 | **Medium** | **Color contrast to verify:** `muted-foreground #64748B` on `muted #F1F5F9` ≈4.4:1 — **borderline fail** for normal text. `text-foreground/75` nav links on translucent `bg-background/60` also needs checking. Primary `#4F46E5` on white = ~6.3:1 ✅. |
| 8 | **Medium** | **`MediaPlaceholder` is a plain `<div>`** with no `role="img"`/`aria-label` — screen readers read the alt text *and* the raw file path as ordinary prose. |
| 9 | **Medium** | **Button sizes `sm` (36px) and `md` (40px)** fall below the 44px AAA touch target (2.5.5); they do pass the 24px AA minimum (2.5.8). Header social links are `size-9` (36px). |
| 10 | **Medium** | **`Card interactive` lift is hover-only** — the card itself isn't focusable. |
| 11 | **Low** | FAQ category labels are `<p>`, not headings — intentional but means categories aren't navigable by heading. |
| 12 | **Low** | Projects empty-state text isn't in a live region. |
| 13 | **Low** | No `aria-controls` linking filter pills → grid. |
| 14 | **Low** | MobileMenu body scroll-lock doesn't compensate scrollbar width → ~15px content shift. |
| 15 | **Low** | `Button` spreads `{...props}` **after** `disabled`/`aria-busy`, so callers can override them. |
| 16 | **Low** | No `aria-live` on button loading → completion isn't announced. |

---

# 12. Business Content Analysis

## ⚠️ Critical framing

**Nothing in the project is Process IQ Tech.** The entire content layer describes **"Nexora"** — a fictional San Francisco software engineering agency. Below I separate what's *in the project* (all of it Nexora) from what your brief says *should* be there (none of it present).

---

## A. VERIFIED BUSINESS INFORMATION PRESENT IN THE PROJECT

> *(…but all of it belongs to **Nexora**, not Process IQ Tech. Must be replaced, not preserved.)*

| Field | Value in project | Location |
|---|---|---|
| Company name | Nexora / Nexora Technologies Inc. | `site.config.ts:26-28` |
| Tagline | "Digital products that move business forward." | `:29` |
| Description | Full-service technology company: custom software, cloud, AI | `:30-31` |
| Founded | 2014 | `:32` |
| HQ | 785 Mission Street, Suite 1200, San Francisco, CA 94103, USA | `:33` |
| Email | `hello@nexora.tech`, `support@nexora.tech` | `:77-78` |
| Phone | +1 (415) 555-0142 (WhatsApp same) | `:79-80` |
| Address | San Francisco, California, 94103, United States | `:81-85` |
| Working hours | Mon–Fri 09:00–18:00, Sat 10:00–14:00, Sun Closed | `:89-93` |
| Socials | LinkedIn / X / Facebook / Instagram / YouTube / GitHub / WhatsApp / Email → `nexora.*` handles | `:110-159` |
| Site URL | `https://www.nexora.tech` | `:182` |
| Legal name (authors meta) | Nexora Technologies Inc. | `:28` |
| **Services (5)** | Custom Software Development · Web & Mobile Applications · Cloud & DevOps · Data Analytics & AI · IT Consulting & Support | `:559-658` |
| **Stats (4)** | 11+ years · 250+ projects · 98% satisfaction · 40+ experts | `:686-719` |
| **Values (4)** | Ownership · Craftsmanship · Transparency · People first | `:471-496` |
| **Timeline (5)** | 2014 founded · 2017 1M users · 2020 remote-first · 2022 cloud practice · 2025 AI squads | `:497-533` |
| **Team (4)** | Amelia Hartley (CEO) · Daniel Okafor (CTO) · Sofia Marchetti (Design) · Arjun Mehta (Eng) | `:945-1050` |
| **Pricing (3)** | Essential $2,900/mo · Growth $5,900/mo · Enterprise Custom | `:1151-1217` |
| **FAQ (6)** | Process / timeline / team / scope / IP / support | `:1231-1274` |
| **Blog (3)** | GenAI trust · Legacy migration · Discovery | `:1290-1463` |
| Contact form fields | name, email, phone, subject, message, website (honeypot) | `route.ts` / `validations.ts` |

---

## B. MARKETING / DESIGN COPY (all fabricated, unverifiable)

**Clients (6 — all fictional, all `example.com`):**
Vertex Financial · Northwind Retail · Helios Energy · Carewell Health · Meridian Logistics · Atlas Learning — `:727-776`

**Case studies (6 — with invented metrics):**
OrbitPay (−94% settlement, +$18M/mo) · CareFlow (−38% no-shows, 4.8/5) · ShelfWise (−27% overstock) · RouteFlow (−16% fuel, +12% on-time) · LearnLoop (+31% completion, −44% tickets) · Helios Solar (−87% detection, 99.98% uptime) — `:791-930`

**Testimonials (4 — invented people & quotes):**
Marcus Reed (Vertex) · Dr. Priya Nair (Carewell) · Elena Vasquez (Northwind) · Tom Baker (Meridian) — all `rating: 5` — `:1063-1136`

**Certifications / partnerships (unsupported claims):**
- Footer badges: **"ISO 27001 certified" · "AWS Advanced Partner" · "GDPR compliant"** — `:1512-1516`
- Hero proof card: **"ISO 27001 certified — Security-first delivery"** — `:386-389`
- Hero trust note: **"Rated 4.9/5 by 120+ clients across 14 countries"** — `:401`
- Story: **"78% of our revenue comes from repeat clients"** — `:417`
- Pricing: **"30-day money-back guarantee"**, **"No hidden fees"** — `:1150`

**Other invented claims:** "14 countries", "40+ in-house experts", "250+ projects", "4,000+ businesses", "120,000 patients", "60,000 monthly learners", "900 vehicles", "22,000 installations".

---

## C. YOUR BRIEF'S PROCESS IQ TECH SERVICES — VERIFICATION RESULT

Searched the entire `src/` tree for each. **None are present.**

| Claimed Process IQ service area | In project? |
|---|---|
| Business Process Management | ❌ |
| Management Support | ❌ |
| Operations Support | ❌ |
| Advisory | ❌ |
| Customer Support | ❌ |
| Inbound Sales | ❌ |
| Outbound Sales | ❌ |
| Data Processing | ❌ |
| Data Mining | ❌ |
| Account Reconciliation | ❌ |
| Debt Collections | ❌ |
| Lead Generation | ❌ |
| Appointment Setting | ❌ |
| Talent Acquisition | ❌ |
| Training & Development | ❌ |
| Payroll Processing | ❌ |
| Vendor Management | ❌ |
| HR support | ❌ |
| Process improvement | ❌ |
| Employee engagement | ❌ |
| Technology-enabled operations | ❌ |
| 24/7 operations | ❌ *(only appears as "24/7 on-call" in Nexora's Enterprise pricing plan — unrelated)* |
| 15+ years management experience | ❌ *(only "11+ years in business" and a fictional CTO with "15 years building distributed systems")* |
| **"Process IQ Tech" (any spelling)** | ❌ **0 matches** |

## D. EXPLICITLY ABSENT (do not invent)

No real clients, testimonials, awards, certifications, partnerships, revenue, employee count, offices, locations, case studies or performance statistics exist anywhere in the project. **Every such item currently displayed is fabricated demo content.**

---

# 13. Code Quality Analysis

| # | Category | Finding | Severity |
|---|---|---|---|
| 1 | **Duplication** | `renderTitle()` — split-on-highlight helper **implemented 3×**: `SectionHeading.tsx:36`, `PageHeader.tsx:86`, `CTA.tsx:115` — with three different highlight class strategies | High |
| 2 | **Duplication** | Project card markup duplicated: `FeaturedProjects.tsx:52-134` vs `ProjectFilter.tsx:135-223` — **already diverged** (one renders `badge.icon`, the other doesn't) | High |
| 3 | **Duplication** | Service card duplicated: `ServicesPreview.tsx:56-121` vs `services/page.tsx:46-110`, including identical `[startingPrice, timeline].join(" · ")` logic | High |
| 4 | **Duplication** | Blog featured card hand-rolled in `blog/page.tsx:62-121` instead of reusing `BlogCard` (incl. its own copy of `"Read article"`) | Medium |
| 5 | **Dead code** | `src/components/animations/ParallaxWrapper.tsx` — **never imported** | Medium |
| 6 | **Dead code** | 12+ unused exports: `absoluteUrl`, `slugify`, `truncate`, `isActivePath`, `getIcon`, `getPalette`, `EASE_IN_OUT`, `fadeVariants`, `slideUpVariants`, `slideFromLeft/RightVariants`, `scaleInVariants`, `DEFAULT_VIEWPORT`; unused `Card*` subcomponents; unused `Badge ghost` variant | Medium |
| 7 | **Dead config** | `inquiryTypes`, `budgetRanges` (no select component); `client.industry`; `PageHeader` `background="muted"/"default"`; `Accordion` `defaultOpenId`/`allowMultiple`; `BlogCard` `sizes` prop; `logo.system` | Medium |
| 8 | **Hardcoded content** | ~30 English strings outside `siteConfig`: breadcrumb labels, page titles, `"Read article"`, `"Technologies"`, `"Investment"`, `"Typical timeline"`, `"Client"`, `"Launched"`, `"Industry"`, `"All projects"`, `"Previous/Next project"`, `"Featured"`, `"Tags"`, `"No projects in this category yet."`, `"{n} of {m} projects shown"`, `"Filter projects by category"`, `"Breadcrumb"`, `"Client testimonials"`, `"Rated n out of 5"`, plus **all** of `error.tsx`, `loading.tsx`, `not-found.tsx` | High (undermines the config-driven premise) |
| 9 | **Monolith** | `site.config.ts` = **1,521 lines / 60 KB** single object | Medium |
| 10 | **Monolith** | `types/config.ts` = 779 lines, all in one file | Low |
| 11 | **Inconsistency** | Feature flags: 9 sections self-gate; `Timeline`, `TeamCard`, `PageHeader`, `BlogCard`, `ProjectFilter` don't; only `showBlog` gates routes | Medium |
| 12 | **Inconsistency** | `Timeline.tsx` imports `siteConfig` **from a client component** and bypasses the documented "sections never touch framer-motion directly" rule | Medium |
| 13 | **Naming** | `Header.displayName = "Header"` etc. on plain function declarations — **no-op**. Appears in ~10 files | Low |
| 14 | **Encoding** | Mojibake `—` corrupted in JSDoc in `FAQ.tsx`, `Pricing.tsx` (and several comments) | Low |
| 15 | **Docs** | `README.md` is **stock `create-next-app`** — claims the project uses the **Geist font** (it uses Inter/Sora/JetBrains Mono) and tells you to edit `app/page.tsx`. `CLAUDE.md` is 11 bytes. | Medium |
| 16 | **TypeScript** | **Excellent.** `strict: true`, exhaustive `Record` maps, discriminated unions, `Omit<…>` for feature toggles, `LayoutProps<"/">` used correctly. **`tsc --noEmit` exits 0.** One softness: `icons: Record<string, LucideIcon \| undefined>` instead of `Record<IconName, …>` → config typos render `null` instead of erroring | Low |
| 17 | **Lint/format** | **ESLint exits 0, Prettier configured with Tailwind class sorting.** Clean. | ✅ |
| 18 | **Tests** | **Zero tests, zero CI** | High |
| 19 | **Config** | `next.config.ts` completely empty | Medium |
| 20 | **Magic numbers** | Rate limit (5/10min), scroll thresholds (24/480), durations (0.3/0.65/1.8s/6s), `w-[32rem]` — scattered as literals | Low |
| 21 | **Architecture smell** | `publicAssetExists()` couples rendering to `node:fs` and to `process.cwd()` — fragile under `output: standalone` | Medium |

**Overall: B+ for a starter template, C+ for production readiness.** Discipline is high (types, lint, a11y, config-driven design); the weaknesses are duplication, dead code, hardcoded strings leaking past the config layer, and the missing test/CI safety net.

---

# 14. Problems & Opportunities

## 🔴 CRITICAL

1. **Wrong company entirely.** 100% of content is "Nexora", a fictional software agency. Zero Process IQ Tech content exists.
2. **All imagery missing** — 26 image refs, 6 client logos, 1 OG image. Every visual slot renders a placeholder that **publicly displays the file path**.
3. **No email delivery** — contact form "succeeds" but reaches no inbox; with `RESEND_API_KEY` set it actually *errors*.
4. **Fabricated certifications** — "ISO 27001 certified", "AWS Advanced Partner", "GDPR compliant" badges. Publishing these without verification is a **legal/compliance liability**.
5. **Fabricated social proof** — 4 testimonials, 6 clients, 6 case studies with invented ROI metrics, "4.9/5 from 120+ clients". Do not ship.
6. **Footer links to 4 non-existent routes** (`/privacy`, `/terms`, `/cookies`, `/sitemap.xml`).
7. **No canonical URLs, no sitemap, no robots.txt, zero structured data, wrong `siteUrl`.**
8. **No-JS users see `opacity: 0` content** across the site (framer-motion SSR `initial` styles).

## 🟠 HIGH

9. MobileMenu: no focus trap, no focus restoration, background not inert despite `aria-modal`.
10. Newsletter form fakes success — no endpoint exists.
11. Marquee pause is hover-only (WCAG 2.2.2).
12. `Pricing` note renders in a `flex` **row** beside the heading → squeezes at 375px.
13. Mega-dropdowns are hover/focus-within only — no click, Escape, or arrow-key support.
14. Duplicated card implementations already diverging (project, service, blog).
15. ~30 hardcoded strings bypassing the config layer — the architecture's core promise.
16. No tests, no CI.
17. `publicAssetExists()` sync-fs-at-render + `process.cwd()` coupling.
18. Color contrast of `muted-foreground` on `muted` is borderline failing (≈4.4:1).

## 🟡 MEDIUM

19. `PageTransition mode="wait"` adds ~300ms to every navigation.
20. No `2xl` layouts — site is 1280px-wide on 1920px+ screens.
21. Pricing grid has no `sm:grid-cols-2` (640–767px = one tall column).
22. Footer 2-col grid at 320–639px squeezes long URLs.
23. Feature flags inconsistent (9 gate, 5 don't; only 1 gates routes).
24. `BlogCard`/`TeamCard` `sizes` don't match their actual grids.
25. Accordion id collisions across FAQ groups; hardcoded `h3`.
26. Carousel: no arrow keys, no `aria-live`, prev/next hidden <640px.
27. `site.config.ts` 1,521-line monolith incl. 3 full blog articles in every page's module graph.
28. Empty `next.config.ts` — no security/cache headers, no `optimizePackageImports`.
29. Backdrop-blur + blurred orbs = continuous GPU compositing.
30. `/blog` OG object drops the share image.
31. Stock README (`create-next-app`, wrong font, wrong file path); 11-byte `CLAUDE.md`.
32. Mojibake in JSDoc comments.

## 🔵 LOW

33. `displayName` no-ops on plain functions (~10 files).
34. 12+ dead exports, 1 dead component (`ParallaxWrapper`).
35. Button `sm`/`md` are 36/40px (below 44px AAA).
36. `MediaPlaceholder` has no `role="img"`.
37. Unused config API surface (`industry`, `inquiryTypes`, `budgetRanges`, `logo.system`, `PageHeader background` variants).
38. No `manifest.webmanifest` / apple-touch-icon.
39. `not-found.tsx` has no own metadata.
40. Magic numbers scattered.

---

# 15. Recommended Redesign Strategy

> **Guiding principle: this is a *re-content and re-skin* job on a genuinely well-built skeleton — not a rebuild.** Roughly 70% of the value is already here.

## Phase 0 — Decide (before any code)

1. **Confirm the actual Process IQ Tech brand pack**: logo (light/dark variants), color palette, fonts, photography, real service taxonomy, real contact details, real legal entity name.
2. **Decide the route map:**
   - Keep `/`, `/about`, `/services`, `/contact`? → **yes, almost certainly.**
   - `/projects` — keep as case studies (needs real ones) or **remove** and repoint nav/footer.
   - `/blog` — keep with real content, or **flip `features.showBlog: false`** (the gate already works end-to-end).
   - `/team`, `/pricing` — Process IQ's model (BPM/BPO advisory) likely doesn't need SaaS-style pricing tiers → **consider `features.pricing: false`.**
3. **Source or shoot real imagery.** Nothing else in the redesign will matter visually until `public/images/` is populated.

## Phase 1 — Content truth (highest ROI, lowest risk)

4. Rewrite `site.config.ts` **in place** — company, contact, socials, SEO, nav, hero, about, services, stats, clients, projects, team, testimonials, pricing, FAQ, blog, CTA, footer. This single edit rebrands ~95% of the site.
5. **Delete every unverifiable claim**: certifications, partner badges, client logos, testimonials, case-study metrics, trust notes, review scores. Replace with *nothing* until real ones exist (an empty `items: []` renders cleanly — the components all guard for it).
6. Update `types/config.ts` if the service taxonomy needs fields the current `Service` type doesn't have.
7. Update `.env.example` (recipient email, sender name, real `NEXT_PUBLIC_SITE_URL`).

## Phase 2 — Asset & brand layer

8. Add real logos → `public/logos/logo-light.svg` + `logo-dark.svg` (keep the dual-file pattern), replace `favicon.ico`.
9. Populate `public/images/` with hero, about, services, CTA, and an **og-cover.png (1200×630)** — all paths already referenced by config.
10. Add real client logos to `public/logos/` **only if real**; otherwise set `clients.items = []`.
11. Adjust `theme.colors.light/dark` to Process IQ's palette. The token system means **this is a 26-line edit**.
12. Re-evaluate the font trio (Sora headings are the most "template-y" element; a B2B/BPM brand may want a more neutral display face).

## Phase 3 — SEO correctness (mechanical, must-do)

13. Add `src/app/sitemap.ts` (the footer already links to it).
14. Add `src/app/robots.ts`.
15. Add `alternates.canonical` to root metadata + per-page.
16. Add JSON-LD: `Organization` (root), `BreadcrumbList` (PageHeader — data is already there), `Service` (service detail), `FAQPage` (FAQ — data is already there), `BlogPosting` (articles), `WebSite`.
17. Fix `/blog` OG object to include `images`.
18. Create `/privacy`, `/terms`, `/cookies` **or** remove them from `navigation.legal`.

## Phase 4 — Functional gaps

19. Implement `sendEmail()` with a real provider (Resend example is already written in `route.ts`).
20. Either wire `NewsletterForm` to an endpoint or **disable it** (`footer.newsletter = null`).
21. Remove the `NEXT_PUBLIC_GA_MEASUREMENT_ID` dead config or actually implement analytics.

## Phase 5 — UI/UX polish (the "premium" part)

22. Fix `Pricing` heading/note flex-row bug.
23. MobileMenu: focus trap + focus restore + make background inert (or portal the overlay outside the `backdrop-blur` header).
24. Marquee: pause on `:focus-within` as well as hover.
25. Desktop dropdowns: click/Escape support.
26. Carousel: arrow keys + `aria-live` + show prev/next below `sm`.
27. Add `sm:grid-cols-2` to Pricing; make footer 1-col below `sm`.
28. Add `2xl:` layouts or lift container max-width for ultrawide.
29. Deduplicate `renderTitle` into one shared helper; extract `ProjectCard` / `ServiceCard` / featured-blog card.
30. Consider replacing `PageTransition mode="wait"` with `mode="popLayout"` or removing it — it costs 300ms on every navigation.
31. Add a `<noscript>` fallback (or stop SSR-ing `opacity: 0`).

## Phase 6 — Engineering hygiene

32. Remove `ParallaxWrapper` + dead exports.
33. Move hardcoded strings into config (or accept them as UI chrome and document that).
34. Split `site.config.ts` into `src/config/` modules re-exported from an index — the file is already sectioned with comment banners.
35. Replace stock README; add a real one.
36. Add a smoke test suite + CI (even just `tsc && eslint && next build`).
37. Fill `next.config.ts` (security headers, `optimizePackageImports: ["lucide-react"]`).

## Sequencing rationale

- **Phases 1–3 are independent of any visual redesign** and remove the compliance/SEO blockers first.
- **Phase 4 must precede launch** (otherwise the contact form silently discards leads).
- **Phase 5 is where "premium B2B" is actually achieved** — the current design is competent but generic; the differentiation comes from real photography, tighter type, restrained motion, and correct content.
- **Do not rewrite the component library.** It is typed, tested by lint, accessible by default, and config-driven. Replacing it would discard the project's best asset.

---

# 16. Files That Would Likely Need Changes

## Tier 1 — Content & brand (will definitely change)

| File | Why |
|---|---|
| `src/config/site.config.ts` | **The single biggest change.** All 1,521 lines of Nexora content → Process IQ Tech. |
| `src/types/config.ts` | Service taxonomy / new content fields if the BPM model needs them |
| `public/logos/logo-light.svg`, `logo-dark.svg` | New brand marks (keep the light/dark pair) |
| `src/app/favicon.ico` | New brand icon |
| `.env.example` | Real site URL, recipient/sender emails |
| `README.md` | Replace stock `create-next-app` text |
| `public/images/**` *(new)* | Hero, about, services, CTA, team, og-cover.png |
| `public/logos/client-*.svg` *(new/omit)* | Only if real clients are approved |

## Tier 2 — SEO correctness (new + edited)

| File | Why |
|---|---|
| `src/app/sitemap.ts` **(new)** | Footer already links to it; currently 404 |
| `src/app/robots.ts` **(new)** | Missing entirely |
| `src/app/layout.tsx` | Add `alternates.canonical`, JSON-LD (`Organization`/`WebSite`), fix `ogImage` |
| `src/app/(marketing)/page.tsx` | Home JSON-LD |
| `src/app/(marketing)/about/page.tsx` | Canonical, title from config, `AboutPage`/`Organization` JSON-LD, OG image |
| `src/app/(marketing)/services/page.tsx` | Canonical, OG, `ItemList` JSON-LD; **service card duplication refactor** |
| `src/app/(marketing)/services/[slug]/page.tsx` | Canonical, `Service`/`Offer` JSON-LD, feature-gating |
| `src/app/(marketing)/projects/page.tsx` | Canonical, OG (or remove route) |
| `src/app/(marketing)/projects/[slug]/page.tsx` | Canonical, `Article` JSON-LD (or remove) |
| `src/app/(marketing)/blog/page.tsx` | **Add `images` to OG object**, canonical, `Blog` JSON-LD |
| `src/app/(marketing)/blog/[slug]/page.tsx` | Canonical, `BlogPosting` JSON-LD |
| `src/app/(marketing)/contact/page.tsx` | Canonical, `ContactPage` JSON-LD, map replacement |
| `src/app/not-found.tsx` | Own `metadata` (currently inherits Nexora's) |

## Tier 3 — Functionality

| File | Why |
|---|---|
| `src/app/api/contact/route.ts` | Implement `sendEmail()` with a real provider |
| `src/components/layout/NewsletterForm.tsx` | Wire to an endpoint or remove |
| `src/components/layout/Footer.tsx` | Legal links → real routes; badges → real claims |
| `src/components/layout/MobileMenu.tsx` | Focus trap, focus restore, inert background, portal/containing-block fix |
| `src/components/layout/Header.tsx` | Dropdown keyboard support; social/CTA visibility tuning |
| `src/proxy.ts` | Only if blog gating behaviour changes |

## Tier 4 — UI/UX fixes

| File | Why |
|---|---|
| `src/components/sections/Pricing.tsx` | **Heading/note flex-row bug**; add `sm:grid-cols-2` |
| `src/components/sections/ClientsMarquee.tsx` | Pause on `:focus-within`; region label |
| `src/components/sections/TestimonialsCarousel.tsx` | Arrow keys, `aria-live`, controls below `sm` |
| `src/components/sections/ProjectFilter.tsx` | Extract shared `ProjectCard` |
| `src/components/sections/FeaturedProjects.tsx` | Extract shared `ProjectCard` (re-sync with filter version) |
| `src/components/sections/ServicesPreview.tsx` | Extract shared `ServiceCard` |
| `src/components/sections/PageHeader.tsx` | JSON-LD breadcrumb data; shared `renderTitle` |
| `src/components/ui/SectionHeading.tsx` | Shared `renderTitle` consolidation |
| `src/components/sections/CTA.tsx` | Shared `renderTitle` consolidation |
| `src/components/ui/Accordion.tsx` | Unique-id generation, configurable heading level |
| `src/components/ui/MediaPlaceholder.tsx` | `role="img"`, stop printing file paths |
| `src/components/ui/Button.tsx` | Prop spread order; optional 44px sizes |
| `src/components/layout/PageTransition.tsx` | Revisit `mode="wait"` latency |
| `src/app/layout.tsx` | `<noscript>` fallback for opacity-0 content |

## Tier 5 — Cleanup / hygiene

| File | Why |
|---|---|
| `src/components/animations/ParallaxWrapper.tsx` | **Delete — dead code** |
| `src/lib/utils.ts` | Remove `absoluteUrl`, `slugify`, `truncate`, `isActivePath` |
| `src/lib/icons.ts` | Remove `getIcon`; tighten to `Record<IconName, …>` |
| `src/lib/theme.ts` | Remove `getPalette` (and unused internals) |
| `src/lib/animations.ts` | Remove unused variants + `EASE_IN_OUT` + `DEFAULT_VIEWPORT` |
| `src/components/ui/Card.tsx` | Remove unused `Card*` subcomponents |
| `src/components/ui/Badge.tsx` | Remove unused `ghost` variant |
| `src/components/sections/Timeline.tsx` | Read via props instead of client-side config; add feature gate |
| `src/app/globals.css` | Verify `muted-foreground` on `muted` contrast |
| `next.config.ts` | Security/cache headers, `optimizePackageImports` |
| `src/app/error.tsx`, `loading.tsx`, `not-found.tsx` | Move hardcoded strings to config |
| `AGENTS.md` / `CLAUDE.md` | Housekeeping |

## Explicitly NOT needing changes

`src/lib/validations.ts`, `src/hooks/useScrollPosition.ts`, `src/components/providers/ThemeProvider.tsx`, `src/components/sections/Hero.tsx` *(structure is good — only config changes)*, `src/components/sections/ContactForm.tsx` *(best file in the repo)*, `src/components/ui/Section.tsx`, `Container.tsx`, `Input.tsx`, `Textarea.tsx`, `SocialIcon.tsx`, `ConfigIcon.tsx`, `src/components/animations/Counter.tsx`, `FadeIn.tsx`, `SlideUp.tsx`, `StaggerContainer.tsx`, all of `tailwind.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.json`.

---

# Appendix — Audit verification

| Check | Result |
|---|---|
| `git status` | **Clean** at audit time — nothing modified |
| `tsc --noEmit --incremental false` | **Exit 0** |
| `eslint .` | **Exit 0** |
| Files created/deleted/renamed during audit | **None** (this `report.md` was created afterwards on request) |
| Packages installed/removed | **None** |
