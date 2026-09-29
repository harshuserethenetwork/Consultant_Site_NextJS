/**
 * -----------------------------------------------------------------------------
 * Site configuration types
 * -----------------------------------------------------------------------------
 * Every piece of company content shown on the website is described here and
 * filled in by `src/config/site.config.ts`.
 *
 * If you add a new kind of content to the config, declare its shape here first.
 * Components import these types so they can never read a wrong/missing field.
 *
 * Content rule for this site: only publish statements the company has actually
 * supplied (services, engagement terms, platform names, management experience).
 * No metrics, clients, testimonials, certifications or team members are part of
 * this model, so they cannot be rendered by accident.
 * -----------------------------------------------------------------------------
 */

/* ------------------------------- primitives --------------------------------- */

/** Theme that the site can render in. "system" follows the OS preference. */
export type ThemeMode = "light" | "dark" | "system";

/** Corner radius preset applied to cards, buttons and inputs. */
export type ThemeRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/** A hex color such as "#11263F". Keeps typos like "blue-ish" out of the theme. */
export type HexColor = `#${string}`;

/** Name of a lucide-react icon component, e.g. "ShieldCheck". */
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

/** A route or in-page anchor, e.g. "/contact" or "/#engagement". */
export type Href = string;

/** Every section of the site that can be switched on/off from the config. */
export type SectionId =
  | "header"
  | "hero"
  | "capabilities"
  | "process"
  | "technology"
  | "experience"
  | "engagement"
  | "faq"
  | "cta"
  | "footer";

/* ------------------------------ shared objects ------------------------------ */

/** A button / text link used anywhere on the site. */
export interface CtaButton {
  /** Text shown on the button. */
  label: string;
  /** Where it goes: a route ("/engagement") or an anchor ("/#process"). */
  href: Href;
  /** Opens the link in a new tab (use for external links). */
  external?: boolean;
}

/** An image with an accessible description (required for WCAG AA). */
export interface ImageAsset {
  /** Path inside /public, e.g. "/images/hero/operations.png". */
  src: PublicPath;
  /** Describes the image for screen readers and search engines. */
  alt: string;
  /** Optional intrinsic size hints (helps avoid layout shift). */
  width?: number;
  height?: number;
}

/** Standard heading block shared by every section. */
export interface SectionHeading {
  /** Small text above the title, e.g. "What we do". */
  eyebrow?: string;
  /** Main section title. */
  title: string;
  /** Emphasised word(s) inside the title, highlighted with the accent color. */
  highlight?: string;
  /** One or two supporting sentences. */
  subtitle?: string;
}

/** A small label shown as a pill, e.g. "Optional". */
export interface Badge {
  label: string;
  /** Optional icon shown before the label. */
  icon?: IconName;
}

/** One row of a definition list (label above value, hairline separated). */
export interface TermRow {
  /** Small label, e.g. "Rate". */
  label: string;
  /** The value itself, e.g. "$1,800". */
  value: string;
  /** Optional clarifying line under the value. */
  note?: string;
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
  /** Brand name shown everywhere, e.g. "Process IQ Tech". */
  name: string;
  /** Short version used for tight spaces (logo, footer). */
  shortName: string;
  /** Full registered name, used in the footer/legal text. */
  legalName: string;
  /** One-line promise under the logo. */
  tagline: string;
  /** 1–2 sentence description of the company (SEO + about section). */
  description: string;
  /** Logo files for both themes. */
  logo: CompanyLogo;
  /** Favicon file, usually "/favicon.ico". */
  favicon: PublicPath;
}

/* --------------------------------- contact ---------------------------------- */

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
  companyLabel: string;
  companyPlaceholder: string;
  /** Label of the "which functions do you need" select. */
  needsLabel: string;
  /** Options of the "which functions do you need" select. */
  needsOptions: string[];
  /** Label of the "estimated team size" select. */
  teamSizeLabel: string;
  /** Options of the "estimated team size" select (ordered small to large). */
  teamSizeOptions: string[];
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
  /** Title above the social-links card on /contact (only when links exist). */
  socialsLabel?: string;
  /** Main contact address — only set it if it is a real, monitored inbox. */
  email?: string;
  /** Support address (optional, only if monitored). */
  supportEmail?: string;
  /** Displayed phone number, only if a real number is published. */
  phone?: string;
  /** Street address, only if a real address is published. */
  address?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  country?: string;
  /** Google Maps embed URL — omit entirely when no verified address exists. */
  mapEmbedUrl?: string;
  /** Opening hours, one entry per group of days (omit when unpublished). */
  workingHours?: WorkingHour[];
  /** Guidance block: what to include when describing an operation. */
  guidance?: {
    title: string;
    items: string[];
  };
}

/** Opening hours for one group of days. */
export interface WorkingHour {
  /** Days covered, e.g. "Monday – Friday". */
  days: string;
  /** Hours covered, e.g. "09:00 – 18:00". */
  hours: string;
  /** Set true when the office is closed on those days. */
  closed?: boolean;
}

/* ---------------------------------- social ---------------------------------- */

export interface SocialLink {
  /** Determines which icon is rendered. */
  platform: SocialPlatform;
  /** Full URL of the profile. Not needed for "email". */
  url: string;
  /** Accessible name shown to screen readers. */
  label: string;
  /** Show this link in the main site footer. */
  showInFooter?: boolean;
  /** Show this link in the header. */
  showInHeader?: boolean;
}

/* ----------------------------------- seo ------------------------------------ */

export interface TwitterCardConfig {
  /** Twitter/X handle of the site, e.g. "@processiqtech". */
  site: string;
  /** Handle of the content creator, usually the same as `site`. */
  creator: string;
  /** Card format: big image for the homepage, small for simple pages. */
  card: "summary" | "summary_large_image";
}

export interface SeoConfig {
  /** Default browser/title bar text. */
  title: string;
  /** Pattern for page titles, "%s" is replaced by the page name. */
  titleTemplate: string;
  /** Default meta description (140–160 characters works best). */
  description: string;
  /** Search keywords. */
  keywords: string[];
  /** Social share image (1200×630 px), path inside /public (optional). */
  ogImage?: PublicPath;
  /** Canonical domain without a trailing slash. */
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
  /** Restrained highlight used for badges and small emphasis. */
  accent: HexColor;
  /** Text color used on top of `accent`. */
  accentForeground: HexColor;
  /** Focus ring shown around interactive elements (keyboard accessibility). */
  ring: HexColor;
}

/** Fonts used by the site. Names must be loaded with next/font in the layout. */
export interface ThemeFonts {
  /** Display/headings font, e.g. "Archivo". */
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
  /** Short line shown under the label in dropdown menus. */
  description?: string;
  /** Small pill after the label. */
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

/** A short qualifier shown under the hero buttons (e.g. engagement facts). */
export interface HeroQualifier {
  label: string;
  description?: string;
}

export interface HeroConfig {
  eyebrow?: string;
  /** Main headline. Keep it under ~10 words for the best impact. */
  title: string;
  /** Words inside `title` that get the accent color. */
  highlight?: string;
  /** Supporting paragraph. */
  subtitle: string;
  primaryCta: CtaButton;
  secondaryCta?: CtaButton;
  /** Verified qualifiers displayed under the buttons, hairline separated. */
  qualifiers?: HeroQualifier[];
  /** Small label introducing the hero diagram. */
  diagramLabel?: string;
}

/* ------------------------------- service taxonomy --------------------------- */

/** Stable key of one service category (must match `Service.category`). */
export type ServiceCategoryId =
  "process-advisory" | "customer-sales" | "back-office" | "talent-hr";

export interface ServiceCategory {
  id: ServiceCategoryId;
  /** Two-digit display number, e.g. "01". */
  index: string;
  name: string;
  /** Anchor used on /services, e.g. "process-advisory". */
  anchor: string;
  /** One line describing the category. */
  summary: string;
  /** The buyer problem this category answers. */
  problem: string;
}

export interface Service {
  /** Stable key, used as a React key and for deep links. */
  id: string;
  /** URL fragment / slug, e.g. "business-process-management". */
  slug: string;
  /** Category this service belongs to. */
  category: ServiceCategoryId;
  title: string;
  /** One line used on cards and in lists. */
  shortDescription: string;
  /** Longer paragraph used on the detail view. */
  description: string;
  /** Concrete functions in scope (used as the "what we handle" checklist). */
  features: string[];
  /** Where the "learn more" link points. */
  href: Href;
}

export interface ServicesConfig {
  heading: SectionHeading;
  /** Intro paragraph above the grouped index. */
  intro?: string;
  categories: ServiceCategory[];
  items: Service[];
  /** Label of the per-service link, e.g. "View scope". */
  linkLabel?: string;
  /** Content of the dedicated /services/[slug] detail page. */
  detail: {
    /** Heading above the "what we handle" feature list. */
    features: SectionHeading;
    /** Heading above the related-services block. */
    related: SectionHeading;
    /** Button in the detail page sidebar. */
    cta: CtaButton;
    /** Heading above the engagement sidebar block. */
    engagementLabel: string;
  };
}

/* ---------------------------------- process --------------------------------- */

export interface ProcessStep {
  /** Two-digit display number, e.g. "01". */
  index: string;
  title: string;
  description: string;
}

export interface ProcessConfig {
  heading: SectionHeading;
  /** Opening paragraph above the step diagram. */
  intro?: string;
  /** Engagement lifecycle, in order. */
  steps: ProcessStep[];
  /** Line under the diagram (e.g. who owns each step). */
  note?: string;
  cta?: CtaButton;
}

/* --------------------------------- coverage --------------------------------- */

/** One row of the weekly coverage diagram. */
export interface CoverageBand {
  id: string;
  label: string;
  /** Short value shown next to the label, e.g. "9 hrs / day". */
  value: string;
  /** Short days of the week this band covers, e.g. ["Mon", …, "Fri"]. */
  days: string[];
  /** Renders the band in the accent treatment (used for the 24/7 option). */
  highlighted?: boolean;
}

export interface CoverageConfig {
  heading: SectionHeading;
  /** Columns of the diagram (always the seven weekdays). */
  columns: string[];
  bands: CoverageBand[];
  /** Explanatory line under the diagram. */
  footnote?: string;
}

/* ------------------------------- technology --------------------------------- */

export interface TechnologyGroup {
  id: string;
  /** Group label, e.g. "Customer engagement". */
  label: string;
  /** Platform names (text only — never vendor logos). */
  platforms: string[];
}

export interface TechnologyConfig {
  heading: SectionHeading;
  /** Framing paragraph. */
  intro: string;
  groups: TechnologyGroup[];
  /** Trademark / non-affiliation footnote, required wherever names appear. */
  footnote: string;
}

/* -------------------------------- engagement -------------------------------- */

export interface EngagementStep {
  index: string;
  title: string;
  description: string;
}

export interface EngagementConfig {
  heading: SectionHeading;
  /** Opening paragraph of the engagement page. */
  intro: string;
  /** Compact cells used by the homepage band. */
  summary: TermRow[];
  /** Full commercial terms (definition list). */
  terms: TermRow[];
  /** What the monthly rate covers. */
  included: {
    heading: SectionHeading;
    items: string[];
    note?: string;
  };
  /** How payments are scheduled. */
  payment: {
    heading: SectionHeading;
    steps: EngagementStep[];
    note?: string;
  };
  /** What the final price depends on. */
  variables: {
    heading: SectionHeading;
    items: string[];
    note?: string;
  };
  /** Mandatory caveat: the published rate is a structure, not a quote. */
  caveat: string;
  cta: CtaButton;
}

/* -------------------------------- experience -------------------------------- */

export interface Principle {
  id: string;
  title: string;
  description: string;
}

export interface ExperienceConfig {
  heading: SectionHeading;
  /** The management-experience statement (use the approved wording only). */
  statement: string;
  /** Supporting paragraphs. */
  paragraphs: string[];
  /** Operating principles. */
  principles: {
    heading: SectionHeading;
    items: Principle[];
  };
  cta?: CtaButton;
}

/* ----------------------------------- about ---------------------------------- */

export interface AboutConfig {
  heading: SectionHeading;
  /** What the company does, in a few paragraphs. */
  story: {
    heading: SectionHeading;
    paragraphs: string[];
  };
  /** Management experience + operating principles. */
  experience: ExperienceConfig;
  /** How engagements are set up and run. */
  approach: {
    heading: SectionHeading;
    items: { title: string; description: string }[];
  };
  cta?: CtaButton;
}

/* ------------------------------------ faq ----------------------------------- */

export interface Faq {
  id: string;
  question: string;
  answer: string;
  /** Groups FAQs into sections (optional). */
  category?: string;
}

export interface FaqConfig {
  heading: SectionHeading;
  items: Faq[];
  /** Contact prompt shown when no answer fits. */
  contactNote?: {
    label: string;
    cta: CtaButton;
  };
}

/* ------------------------------------ cta ----------------------------------- */

export interface CtaSectionConfig {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  primaryCta: CtaButton;
  secondaryCta?: CtaButton;
  /** Bullet points such as verified engagement facts. */
  bullets?: string[];
}

/* ---------------------------------- footer ---------------------------------- */

export interface FooterConfig {
  /** Short company description in the footer column. */
  description: string;
  /** Replaces "{year}" and "{name}" in the copyright line. */
  copyright: string;
}

/* --------------------------------- features --------------------------------- */

/**
 * Master switches: set any key to `false` to remove that section from the site.
 */
export type FeatureToggles = Record<SectionId, boolean>;

/* ---------------------------------- config ---------------------------------- */

export interface SiteConfig {
  company: CompanyConfig;
  contact: ContactConfig;
  socials: SocialLink[];
  seo: SeoConfig;
  theme: ThemeConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  services: ServicesConfig;
  process: ProcessConfig;
  coverage: CoverageConfig;
  technology: TechnologyConfig;
  engagement: EngagementConfig;
  about: AboutConfig;
  faq: FaqConfig;
  cta: CtaSectionConfig;
  footer: FooterConfig;
  /** Per-section visibility switches. */
  features: FeatureToggles;
}
