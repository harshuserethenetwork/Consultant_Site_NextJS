/**
 * -----------------------------------------------------------------------------
 * Site configuration types
 * -----------------------------------------------------------------------------
 * Every piece of company content shown on the website is described here and
 * filled in by `src/config/site.config.ts`.
 *
 * If you add a new kind of content to the config, declare its shape here first.
 * Components import these types so they can never read a wrong/missing field.
 * -----------------------------------------------------------------------------
 */

/* ------------------------------- primitives --------------------------------- */

/** Theme that the site can render in. "system" follows the OS preference. */
export type ThemeMode = "light" | "dark" | "system";

/** Corner radius preset applied to cards, buttons and inputs. */
export type ThemeRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/** A hex color such as "#4F46E5". Keeps typos like "blue-ish" out of the theme. */
export type HexColor = `#${string}`;

/** Name of a lucide-react icon component, e.g. "Rocket" or "ShieldCheck". */
export type IconName = string;

/** Every social network the footer/header can render an icon for. */
export type SocialPlatform =
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram"
  | "youtube"
  | "github"
  | "dribbble"
  | "behance"
  | "medium"
  | "pinterest"
  | "tiktok"
  | "threads"
  | "whatsapp"
  | "email";

/** A file stored in /public (always starts with "/"). */
export type PublicPath = string;

/** A route or in-page anchor, e.g. "/contact" or "/#services". */
export type Href = string;

/** Every section of the site that can be switched on/off from the config. */
export type SectionId =
  | "header"
  | "hero"
  | "clients"
  | "about"
  | "services"
  | "stats"
  | "projects"
  | "team"
  | "testimonials"
  | "pricing"
  | "faq"
  | "blog"
  | "cta"
  | "contact"
  | "footer";

/* ------------------------------ shared objects ------------------------------ */

/** A button / text link used anywhere on the site. */
export interface CtaButton {
  /** Text shown on the button. */
  label: string;
  /** Where it goes: a route ("/services") or an anchor ("/#pricing"). */
  href: Href;
  /** Opens the link in a new tab (use for external links). */
  external?: boolean;
}

/** An image with an accessible description (required for WCAG AA). */
export interface ImageAsset {
  /** Path inside /public, e.g. "/images/projects/apollo.png". */
  src: PublicPath;
  /** Describes the image for screen readers and search engines. */
  alt: string;
  /** Optional intrinsic size hints (helps avoid layout shift). */
  width?: number;
  height?: number;
}

/** Standard heading block shared by every section. */
export interface SectionHeading {
  /** Small text above the title, e.g. "Who we are". */
  eyebrow?: string;
  /** Main section title. */
  title: string;
  /** Emphasised word(s) inside the title, highlighted with the accent color. */
  highlight?: string;
  /** One or two supporting sentences. */
  subtitle?: string;
}

/** A small label shown as a pill, e.g. "New", "Most popular". */
export interface Badge {
  label: string;
  /** Optional icon shown before the label. */
  icon?: IconName;
}

/* --------------------------------- company ---------------------------------- */

export interface CompanyLogo {
  /** Logo used on light backgrounds. */
  light: PublicPath;
  /** Logo used on dark backgrounds. */
  dark: PublicPath;
  /** Logo used when the theme follows the system setting (optional fallback). */
  system?: PublicPath;
  /** Accessible text alternative for the logo. */
  alt: string;
}

export interface CompanyConfig {
  /** Brand name shown everywhere, e.g. "Nexora". */
  name: string;
  /** Short version used for tight spaces (logo, footer), e.g. "Nexora". */
  shortName: string;
  /** Full registered name, used in the footer/legal text. */
  legalName: string;
  /** One-line promise under the logo. */
  tagline: string;
  /** 1–2 sentence description of the company (SEO + about section). */
  description: string;
  /** Year the company started. */
  foundedYear: number;
  /** Headquarters / registered address line. */
  headquarters: string;
  /** Logo files for both themes. */
  logo: CompanyLogo;
  /** Favicon file inside /public, usually "/favicon.ico". */
  favicon: PublicPath;
}

/* --------------------------------- contact ---------------------------------- */

/** Opening hours for one group of days. */
export interface WorkingHour {
  /** Days covered, e.g. "Monday – Friday". */
  days: string;
  /** Hours covered, e.g. "09:00 – 18:00". */
  hours: string;
  /** Set true when the office is closed on those days. */
  closed?: boolean;
}

/** Labels, placeholders and messages rendered by the /contact form. */
export interface ContactFormConfig {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  /** Small note next to the phone label, e.g. "Optional". */
  phoneNote?: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  /** Submit button label while idle. */
  submitLabel: string;
  /** Submit button label while the request is in flight. */
  submittingLabel: string;
  /** Title shown in the animated success panel. */
  successTitle: string;
  /** Supporting line shown in the animated success panel. */
  successMessage: string;
  /** Button that dismisses the success panel and shows the form again. */
  resetLabel: string;
  /** Fallback message when the request fails (network/server error). */
  errorMessage: string;
}

export interface ContactConfig {
  /** Page header content for the /contact page. */
  heading: SectionHeading;
  /** Copy used by the contact form. */
  form: ContactFormConfig;
  /** Title above the social-links card on /contact. */
  socialsLabel: string;
  /** Main contact address. */
  email: string;
  /** Dedicated support address (optional). */
  supportEmail?: string;
  /** Displayed phone number, e.g. "+1 (415) 555-0142". */
  phone: string;
  /** Phone number in international format, used by the WhatsApp link. */
  whatsapp: string;
  /** Street address, e.g. "785 Mission Street, Suite 1200". */
  address: string;
  /** Postal/ZIP code. */
  postalCode?: string;
  /** City. */
  city: string;
  /** State / region. */
  region?: string;
  /** Country. */
  country: string;
  /** Google Maps embed URL (the one that starts with https://www.google.com/maps/embed). */
  mapEmbedUrl: string;
  /** Opening hours, one entry per group of days. */
  workingHours: WorkingHour[];
  /** Options offered in the contact form "How can we help?" field. */
  inquiryTypes: string[];
  /** Options offered in the contact form "Budget" field. */
  budgetRanges: string[];
}

/* ---------------------------------- social ---------------------------------- */

export interface SocialLink {
  /** Determines which icon is rendered. */
  platform: SocialPlatform;
  /** Full URL of the profile. Not needed for "email". */
  url: string;
  /** Accessible name shown to screen readers, e.g. "Nexora on LinkedIn". */
  label: string;
  /** Show this link in the main site footer. */
  showInFooter?: boolean;
  /** Show this link in the header/topbar. */
  showInHeader?: boolean;
}

/* ----------------------------------- seo ------------------------------------ */

export interface TwitterCardConfig {
  /** Twitter/X handle of the site, e.g. "@nexoratech". */
  site: string;
  /** Handle of the content creator, usually the same as `site`. */
  creator: string;
  /** Card format: big image for the homepage, small for simple pages. */
  card: "summary" | "summary_large_image";
}

export interface SeoConfig {
  /** Default browser/title bar text, e.g. "Nexora — Digital Product Engineering". */
  title: string;
  /** Pattern for page titles, "%s" is replaced by the page name. */
  titleTemplate: string;
  /** Default meta description (140–160 characters works best). */
  description: string;
  /** Search keywords. */
  keywords: string[];
  /** Social share image (1200×630 px), path inside /public. */
  ogImage: PublicPath;
  /** Canonical domain without a trailing slash, e.g. "https://www.nexora.tech". */
  siteUrl: string;
  /** Twitter/X card settings. */
  twitter: TwitterCardConfig;
  /** Open Graph locale, e.g. "en_US". */
  locale?: string;
  /** Open Graph type, usually "website". */
  type?: "website" | "article" | "profile";
}

/* ---------------------------------- theme ----------------------------------- */

/** The color palette used by ONE theme (light or dark). */
export interface ThemePalette {
  /** Page background. */
  background: HexColor;
  /** Cards, panels and elevated surfaces. */
  surface: HexColor;
  /** Default text color on `background`. */
  foreground: HexColor;
  /** Subtle blocks (code, chips, inactive areas). */
  muted: HexColor;
  /** Text on top of `muted` and secondary body text. */
  mutedForeground: HexColor;
  /** Hairlines, dividers and input borders. */
  border: HexColor;
  /** Main brand color: buttons, links, active states. */
  primary: HexColor;
  /** Text color used on top of `primary`. */
  primaryForeground: HexColor;
  /** Secondary brand color: secondary buttons, dark header, etc. */
  secondary: HexColor;
  /** Text color used on top of `secondary`. */
  secondaryForeground: HexColor;
  /** Highlight color: gradients, badges, hover accents. */
  accent: HexColor;
  /** Text color used on top of `accent`. */
  accentForeground: HexColor;
  /** Focus ring shown around interactive elements (keyboard accessibility). */
  ring: HexColor;
}

/** Fonts used by the site. Names must be loaded with next/font in the layout. */
export interface ThemeFonts {
  /** Display/headings font, e.g. "Sora". */
  heading: string;
  /** Body/UI font, e.g. "Inter". */
  body: string;
  /** Monospaced font, e.g. "JetBrains Mono". */
  mono: string;
}

export interface ThemeConfig {
  /** Which theme is used before the visitor picks one. */
  defaultTheme: ThemeMode;
  /** Corner radius preset for the whole UI. */
  radius: ThemeRadius;
  /** Font families (must match the fonts loaded in src/app/layout.tsx). */
  fonts: ThemeFonts;
  /** Palettes for both color schemes. */
  colors: {
    light: ThemePalette;
    dark: ThemePalette;
  };
}

/* -------------------------------- navigation -------------------------------- */

/** A single navigation link. */
export interface NavLink {
  label: string;
  href: Href;
  /** Short line shown under the label in mega/dropdown menus. */
  description?: string;
  /** Small pill after the label, e.g. "New". */
  badge?: string;
  /** Opens in a new tab (external links only). */
  external?: boolean;
}

/** A navigation entry that may contain children (dropdown / mega menu). */
export interface NavItem extends NavLink {
  /** Children shown in a dropdown. Leave empty for a plain link. */
  children?: NavLink[];
}

/** A titled column of links used in the footer. */
export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface NavigationConfig {
  /** Links shown in the site header. */
  header: NavItem[];
  /** Link columns shown above the footer bottom bar. */
  footer: FooterLinkGroup[];
  /** Links shown in the legal row at the very bottom. */
  legal: NavLink[];
}

/* ----------------------------------- hero ----------------------------------- */

/** A short proof point shown under the hero buttons. */
export interface HeroHighlight {
  icon: IconName;
  label: string;
  description?: string;
}

export interface HeroConfig {
  eyebrow?: string;
  /** Main headline. Keep it under ~12 words for the best impact. */
  title: string;
  /** Words inside `title` that get the accent color. */
  highlight?: string;
  /** Supporting paragraph. */
  subtitle: string;
  primaryCta: CtaButton;
  secondaryCta?: CtaButton;
  /** Main illustration/photograph on the right side. */
  image?: ImageAsset;
  /** Small trust points displayed below the call-to-action buttons. */
  highlights?: HeroHighlight[];
  /** Social proof line, e.g. "Rated 4.9/5 by 120+ clients". */
  trustNote?: string;
  badge?: Badge;
}

/* ---------------------------------- about ----------------------------------- */

export interface ValueItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface TimelineItem {
  /** Year or period, e.g. "2014" or "2023 – 2024". */
  year: string;
  title: string;
  description: string;
  icon?: IconName;
}

/** A titled pillar card with an icon (mission / vision on the /about page). */
export interface PillarCard {
  title: string;
  icon: IconName;
  description: string;
}

export interface AboutConfig {
  heading: SectionHeading;
  /** Company story, one string per paragraph. */
  story: string[];
  /** Main image next to the story. */
  image: ImageAsset;
  /** Secondary image layered on top (optional "collage" effect). */
  secondaryImage?: ImageAsset;
  /** Mission & vision cards shown on the dedicated /about page. */
  missionVision: {
    mission: PillarCard;
    vision: PillarCard;
  };
  /** Headings for the sub-sections of the dedicated /about page. */
  subsections: {
    story: SectionHeading;
    missionVision: SectionHeading;
    values: SectionHeading;
    timeline: SectionHeading;
  };
  /** Company values (typically 4). */
  values: ValueItem[];
  /** Milestones, oldest first. */
  timeline: TimelineItem[];
  /** Signature/name shown under the story (optional). */
  signature?: {
    name: string;
    role: string;
    image?: ImageAsset;
  };
  /** "Learn more" button under the story/values preview (optional). */
  cta?: CtaButton;
}

/* --------------------------------- services --------------------------------- */

export interface Service {
  /** Stable key, used as a React key and for deep links. */
  id: string;
  /** URL fragment / slug, e.g. "custom-software-development". */
  slug: string;
  icon: IconName;
  title: string;
  /** One line used on cards and in lists. */
  shortDescription: string;
  /** Longer paragraph used on the detail view. */
  description: string;
  /** Bullet points describing what the service includes. */
  features: string[];
  /** Where the "learn more" link points. */
  href: Href;
  /** Optional starting price, e.g. "From $4,500". */
  startingPrice?: string;
  /** Typical delivery time, e.g. "4 – 8 weeks". */
  timeline?: string;
  /** Show a highlighted style / "popular" badge. */
  featured?: boolean;
  badge?: Badge;
}

export interface ServicesConfig {
  heading: SectionHeading;
  items: Service[];
  cta?: CtaButton;
  /** Label of the per-card link, e.g. "Learn more". */
  linkLabel?: string;
  /** Content of the dedicated /services/[slug] detail page. */
  detail: {
    /** Heading above the "what's included" feature list. */
    features: SectionHeading;
    /** Heading above the related-services block. */
    related: SectionHeading;
    /** Button in the detail page sidebar. */
    cta: CtaButton;
  };
}

/* --------------------------------- projects --------------------------------- */

export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Client or brand name. */
  client: string;
  /** Industry/category used by the filter, e.g. "Fintech". */
  category: string;
  /** Short line shown on the card. */
  summary: string;
  /** Full description for the detail view. */
  description: string;
  image: ImageAsset;
  /** Technologies / tags shown as chips. */
  tags: string[];
  /** Launch year. */
  year: string;
  /** Live URL, if the project is public. */
  url?: string;
  /** Measurable outcomes, e.g. "+140% conversions". */
  results?: ProjectResult[];
  featured?: boolean;
  badge?: Badge;
}

export interface ProjectsConfig {
  heading: SectionHeading;
  items: Project[];
  /** Category filter buttons, first entry is usually "All". */
  categories: string[];
  cta?: CtaButton;
}

/* ----------------------------------- team ----------------------------------- */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** Short biography, 1–2 sentences. */
  bio: string;
  image: ImageAsset;
  /** Personal links (LinkedIn, X, email…). */
  socials: SocialLink[];
  /** Skills shown as chips on the card. */
  skills?: string[];
  /** Email address (optional, shown as an icon link). */
  email?: string;
}

export interface TeamConfig {
  heading: SectionHeading;
  members: TeamMember[];
  cta?: CtaButton;
}

/* ------------------------------- testimonials ------------------------------- */

export interface TestimonialAuthor {
  name: string;
  role: string;
  company: string;
  image?: ImageAsset;
}

export interface Testimonial {
  id: string;
  /** Client quote. */
  quote: string;
  author: TestimonialAuthor;
  /** Score from 1 to 5 (renders the star row). */
  rating: number;
  /** Optional project name the quote refers to. */
  project?: string;
}

export interface TestimonialsConfig {
  heading: SectionHeading;
  items: Testimonial[];
}

/* ----------------------------------- stats ---------------------------------- */

export interface Stat {
  id: string;
  /** Numeric part, e.g. "250". */
  value: string;
  /** Suffix appended to the number, e.g. "+", "%", "K". */
  suffix?: string;
  /** Short label under the number, e.g. "Projects delivered". */
  label: string;
  /** Optional supporting line. */
  description?: string;
  icon?: IconName;
}

export interface StatsConfig {
  heading?: SectionHeading;
  items: Stat[];
}

/* ---------------------------------- clients --------------------------------- */

export interface Client {
  id: string;
  name: string;
  logo: ImageAsset;
  /** Alternate logo for dark backgrounds (optional). */
  logoDark?: ImageAsset;
  /** Client website. */
  url?: string;
  industry?: string;
}

export interface ClientsConfig {
  heading?: SectionHeading;
  /** Marquee/text above the logo strip. */
  title?: string;
  items: Client[];
}

/* ---------------------------------- pricing --------------------------------- */

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  /** Price shown to the visitor, e.g. amount "2,400", currency "USD", period "/ month". */
  price: {
    amount: string;
    currency: string;
    period: string;
    /** Note under the price, e.g. "billed annually". */
    note?: string;
  };
  /** What is included. Prefix items with "+ " or leave plain. */
  features: string[];
  /** Things that are NOT included (optional). */
  exclusions?: string[];
  cta: CtaButton;
  /** Draw attention to this plan. */
  highlighted?: boolean;
  badge?: Badge;
}

export interface PricingConfig {
  heading: SectionHeading;
  /** Text under the heading, e.g. "No hidden fees. Cancel anytime." */
  note?: string;
  plans: PricingPlan[];
  /** Line under the plans, e.g. "Need something custom? Let's talk." */
  footnote?: string;
  cta?: CtaButton;
}

/* ------------------------------------ faq ----------------------------------- */

export interface Faq {
  id: string;
  question: string;
  answer: string;
  /** Groups FAQs into tabs/sections (optional). */
  category?: string;
}

export interface FaqConfig {
  heading: SectionHeading;
  items: Faq[];
  /** Contact prompt shown when no answer fits, e.g. "Still have questions?". */
  contactNote?: {
    label: string;
    cta: CtaButton;
  };
}

/* ----------------------------------- blog ----------------------------------- */

export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: ImageAsset;
}

/** One section of a post body: an optional subheading plus its paragraphs. */
export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: ImageAsset;
  category: string;
  tags: string[];
  /** ISO date, e.g. "2026-02-14". */
  publishedAt: string;
  /** Reading time, e.g. "6 min read". */
  readingTime: string;
  author: BlogAuthor;
  /** Article body, rendered as headings + paragraphs on /blog/[slug]. */
  content: BlogSection[];
  featured?: boolean;
}

export interface BlogConfig {
  heading: SectionHeading;
  posts: BlogPost[];
  /** Heading above the related-posts block on post pages. */
  related: SectionHeading;
  cta?: CtaButton;
}

/* ------------------------------------ cta ----------------------------------- */

export interface CtaSectionConfig {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  primaryCta: CtaButton;
  secondaryCta?: CtaButton;
  /** Bullet points such as "Free consultation" or "Reply within 24h". */
  bullets?: string[];
  /** Background image or illustration. */
  image?: ImageAsset;
}

/* ---------------------------------- footer ---------------------------------- */

export interface NewsletterConfig {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  /** Short legal line under the form. */
  disclaimer?: string;
  successMessage: string;
}

export interface FooterConfig {
  /** Short company description in the footer column. */
  description: string;
  /** Replaces "{year}" and "{name}" in the copyright line. */
  copyright: string;
  newsletter?: NewsletterConfig;
  /** Payment/certification badges shown in the footer (optional). */
  badges?: Badge[];
}

/* --------------------------------- features --------------------------------- */

/**
 * Master switches: set any key to `false` to remove that section from the site.
 * `showBlog: false` turns /blog and /blog/[slug] into 404s.
 */
export type FeatureToggles = Omit<Record<SectionId, boolean>, "blog"> & {
  /** Serves the blog routes when true (otherwise they render the 404 page). */
  showBlog: boolean;
};

/* ---------------------------------- config ---------------------------------- */

export interface SiteConfig {
  company: CompanyConfig;
  contact: ContactConfig;
  socials: SocialLink[];
  seo: SeoConfig;
  theme: ThemeConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  about: AboutConfig;
  services: ServicesConfig;
  projects: ProjectsConfig;
  team: TeamConfig;
  testimonials: TestimonialsConfig;
  stats: StatsConfig;
  clients: ClientsConfig;
  pricing: PricingConfig;
  faq: FaqConfig;
  blog: BlogConfig;
  cta: CtaSectionConfig;
  footer: FooterConfig;
  /** Per-section visibility switches. */
  features: FeatureToggles;
}
