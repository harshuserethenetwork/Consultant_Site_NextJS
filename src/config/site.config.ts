/**
 * -----------------------------------------------------------------------------
 * SITE CONFIGURATION — the only file you need to edit to change the website
 * -----------------------------------------------------------------------------
 * HOW TO USE THIS FILE
 * 1. Everything the website shows (text, links, colors, contact details,
 *    services, projects, team, prices, FAQs, SEO…) lives here.
 * 2. Each block below starts with an ALL-CAPS comment that explains what it does.
 * 3. Keep the punctuation correct:
 *      - Text goes between double quotes:  "Hello"
 *      - Every line inside a block ends with a comma:  value: "Hello",
 *      - Never delete a quote, bracket or comma — the site will not start.
 * 4. Hide a section of the site: scroll to the "features" block at the bottom
 *    and change `true` to `false`.
 * 5. Colors are HEX values (#RRGGBB). Pick any color at https://coolors.co
 * -----------------------------------------------------------------------------
 */

import type { SiteConfig } from "@/types/config";

export const siteConfig: SiteConfig = {
  /* ==========================================================================
     COMPANY — who you are (shown in the header, footer, meta tags)
     ========================================================================== */
  company: {
    name: "Nexora",
    shortName: "Nexora",
    legalName: "Nexora Technologies Inc.",
    tagline: "Digital products that move business forward.",
    description:
      "Nexora is a full-service technology company that designs, builds and scales custom software, cloud platforms and AI solutions for ambitious organisations around the world.",
    foundedYear: 2014,
    headquarters: "785 Mission Street, Suite 1200, San Francisco, CA 94103, USA",
    logo: {
      light: "/logos/logo-light.svg", // logo for light mode (dark text)
      dark: "/logos/logo-dark.svg", // logo for dark mode (light text)
      system: "/logos/logo-dark.svg", // fallback while the theme is "system"
      alt: "Nexora logo",
    },
    favicon: "/favicon.ico",
  },

  /* ==========================================================================
     CONTACT — how people reach you (contact section, footer, buttons)
     ========================================================================== */
  contact: {
    heading: {
      eyebrow: "Get in touch",
      title: "Tell us what you want to build",
      highlight: "build",
      subtitle:
        "Share a few details and a senior consultant replies within one business day — no sales scripts, no obligation.",
    },
    socialsLabel: "Follow us",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Jane Doe",
      emailLabel: "Email",
      emailPlaceholder: "jane@company.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+1 (415) 555-0142",
      phoneNote: "Optional",
      subjectLabel: "Subject",
      subjectPlaceholder: "What can we help with?",
      messageLabel: "Message",
      messagePlaceholder:
        "Goals, timeline, budget — anything that helps us prepare for the call.",
      submitLabel: "Send message",
      submittingLabel: "Sending",
      successTitle: "Message sent",
      successMessage:
        "Thanks for reaching out — a senior consultant will reply within one business day.",
      resetLabel: "Send another message",
      errorMessage:
        "We couldn't send your message. Please email us directly or try again in a moment.",
    },
    email: "hello@nexora.tech",
    supportEmail: "support@nexora.tech",
    phone: "+1 (415) 555-0142",
    whatsapp: "+14155550142", // international format, no spaces or brackets
    address: "785 Mission Street, Suite 1200",
    postalCode: "94103",
    city: "San Francisco",
    region: "California",
    country: "United States",
    // Google Maps → Share → Embed a map → copy the full src URL.
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0199054733!2d-122.4013986!3d37.7857482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858062a1e5f1ab%3A0x6a3b0e8e4d3f9a7!2sMission%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000",
    workingHours: [
      { days: "Monday – Friday", hours: "09:00 – 18:00" },
      { days: "Saturday", hours: "10:00 – 14:00" },
      { days: "Sunday", hours: "Closed", closed: true },
    ],
    // Options shown as dropdown choices in the contact form.
    inquiryTypes: ["New project", "Ongoing support", "Partnership", "Careers", "Other"],
    budgetRanges: [
      "Under $5,000",
      "$5,000 – $15,000",
      "$15,000 – $50,000",
      "$50,000 – $150,000",
      "$150,000+",
    ],
  },

  /* ==========================================================================
     SOCIAL LINKS — footer & header icons
     platform must be one of: linkedin, twitter, facebook, instagram, youtube,
     github, dribbble, behance, medium, pinterest, tiktok, threads, whatsapp, email
     ========================================================================== */
  socials: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/nexora-tech",
      label: "Nexora on LinkedIn",
      showInFooter: true,
    },
    {
      platform: "twitter",
      url: "https://x.com/nexoratech",
      label: "Nexora on X",
      showInFooter: true,
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/nexoratech",
      label: "Nexora on Facebook",
      showInFooter: true,
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/nexoratech",
      label: "Nexora on Instagram",
      showInFooter: true,
    },
    {
      platform: "youtube",
      url: "https://www.youtube.com/@nexoratech",
      label: "Nexora on YouTube",
      showInFooter: true,
    },
    {
      platform: "github",
      url: "https://github.com/nexora-tech",
      label: "Nexora on GitHub",
      showInFooter: true,
    },
    {
      platform: "whatsapp",
      url: "https://wa.me/14155550142",
      label: "Chat with Nexora on WhatsApp",
      showInHeader: true,
    },
    {
      platform: "email",
      url: "mailto:hello@nexora.tech",
      label: "Email Nexora",
      showInHeader: true,
    },
  ],

  /* ==========================================================================
     SEO — what Google and social networks show
     ========================================================================== */
  seo: {
    title: "Nexora — Digital Product Engineering & IT Services",
    // "%s" is replaced by the page/section name: "Services | Nexora"
    titleTemplate: "%s | Nexora",
    description:
      "Nexora builds custom software, web and mobile apps, cloud platforms and AI solutions for growing businesses. 250+ projects delivered since 2014.",
    keywords: [
      "software development company",
      "custom software development",
      "web development agency",
      "mobile app development",
      "cloud consulting",
      "AI development",
      "IT services",
      "digital transformation",
      "San Francisco software agency",
    ],
    ogImage: "/images/seo/og-cover.png", // recommended size: 1200 × 630 px
    siteUrl: "https://www.nexora.tech", // no trailing slash
    twitter: {
      site: "@nexoratech",
      creator: "@nexoratech",
      card: "summary_large_image",
    },
    locale: "en_US",
    type: "website",
  },

  /* ==========================================================================
     THEME — colors, fonts, corner radius
     The same values are written into CSS variables in src/app/globals.css
     (a later step does this automatically — keep them in sync if you edit).
     ========================================================================== */
  theme: {
    defaultTheme: "system", // "light", "dark" or "system"
    radius: "lg", // none | sm | md | lg | xl | 2xl | 3xl
    fonts: {
      heading: "Sora", // must match a font loaded in src/app/layout.tsx
      body: "Inter",
      mono: "JetBrains Mono",
    },
    colors: {
      /* Colors used in LIGHT mode ------------------------------------------ */
      light: {
        background: "#FFFFFF",
        surface: "#F8FAFC",
        foreground: "#0B1220",
        muted: "#F1F5F9",
        mutedForeground: "#64748B",
        border: "#E2E8F0",
        primary: "#4F46E5", // main buttons & links
        primaryForeground: "#FFFFFF",
        secondary: "#0F172A", // dark secondary buttons
        secondaryForeground: "#FFFFFF",
        accent: "#06B6D4", // highlights, gradients, badges
        accentForeground: "#062F3B",
        ring: "#4F46E5", // keyboard focus outline
      },
      /* Colors used in DARK mode ------------------------------------------- */
      dark: {
        background: "#0B1220",
        surface: "#111A2C",
        foreground: "#E2E8F0",
        muted: "#1B2437",
        mutedForeground: "#94A3B8",
        border: "#1F2B41",
        primary: "#6366F1",
        primaryForeground: "#FFFFFF",
        secondary: "#1E293B",
        secondaryForeground: "#F1F5F9",
        accent: "#22D3EE",
        accentForeground: "#062F3B",
        ring: "#6366F1",
      },
    },
  },

  /* ==========================================================================
     NAVIGATION — header menu and footer link columns
     href: "/services" for a page, "/#about" for a section on the home page
     ========================================================================== */
  navigation: {
    header: [
      { label: "Home", href: "/#home" },
      {
        label: "Company",
        href: "/about",
        children: [
          {
            label: "About us",
            href: "/about",
            description: "Our story, mission and values",
          },
          {
            label: "Our team",
            href: "/about#team",
            description: "Meet the people behind Nexora",
          },
          {
            label: "Careers",
            href: "/contact",
            description: "Join a remote-first engineering team",
            badge: "Hiring",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Talk to us about your project",
          },
        ],
      },
      {
        label: "Services",
        href: "/services",
        children: [
          {
            label: "Custom Software",
            href: "/services/custom-software-development",
            description: "Web platforms built around your process",
          },
          {
            label: "Mobile Apps",
            href: "/services/web-and-mobile-apps",
            description: "iOS and Android applications",
          },
          {
            label: "Cloud & DevOps",
            href: "/services/cloud-and-devops",
            description: "Migration, CI/CD and observability",
          },
          {
            label: "Data & AI",
            href: "/services/data-and-ai",
            description: "Analytics, ML and generative AI",
          },
          {
            label: "IT Consulting",
            href: "/services/it-consulting-and-support",
            description: "Fractional CTO and architecture reviews",
          },
        ],
      },
      { label: "Work", href: "/projects" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    footer: [
      {
        title: "Company",
        links: [
          { label: "About us", href: "/about" },
          { label: "Our team", href: "/about#team" },
          { label: "Careers", href: "/contact" },
          { label: "Insights", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Services",
        links: [
          {
            label: "Custom Software",
            href: "/services/custom-software-development",
          },
          { label: "Mobile Apps", href: "/services/web-and-mobile-apps" },
          { label: "Cloud & DevOps", href: "/services/cloud-and-devops" },
          { label: "Data & AI", href: "/services/data-and-ai" },
          {
            label: "IT Consulting",
            href: "/services/it-consulting-and-support",
          },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Case studies", href: "/projects" },
          { label: "Pricing", href: "/#pricing" },
          { label: "FAQ", href: "/#faq" },
          { label: "Insights", href: "/blog" },
          { label: "Support", href: "/contact" },
        ],
      },
      {
        title: "Get in touch",
        links: [
          { label: "hello@nexora.tech", href: "mailto:hello@nexora.tech" },
          { label: "+1 (415) 555-0142", href: "tel:+14155550142" },
          { label: "WhatsApp", href: "https://wa.me/14155550142", external: true },
          { label: "Book a meeting", href: "/contact" },
        ],
      },
    ],
    legal: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },

  /* ==========================================================================
     HERO — the first screen of the home page
     ========================================================================== */
  hero: {
    eyebrow: "Trusted digital partner since 2014",
    title: "We build digital products that move your business forward",
    highlight: "move your business forward",
    subtitle:
      "From strategy to launch, Nexora designs and engineers scalable software, cloud platforms and AI experiences that help companies work faster, serve better and grow with confidence.",
    primaryCta: { label: "Start your project", href: "/contact" },
    secondaryCta: { label: "Explore our work", href: "/#projects" },
    image: {
      src: "/images/hero/hero-dashboard.png",
      alt: "Nexora analytics dashboard showing business growth charts",
      width: 1200,
      height: 900,
    },
    badge: { label: "New: AI delivery squads", icon: "Sparkles" },
    highlights: [
      {
        icon: "BadgeCheck",
        label: "ISO 27001 certified",
        description: "Security-first delivery",
      },
      {
        icon: "Clock",
        label: "24h response time",
        description: "Real people, real answers",
      },
      {
        icon: "Users",
        label: "40+ in-house experts",
        description: "No outsourcing surprises",
      },
    ],
    trustNote: "Rated 4.9/5 by 120+ clients across 14 countries",
  },

  /* ==========================================================================
     ABOUT — story, mission, vision, values, timeline
     ========================================================================== */
  about: {
    heading: {
      eyebrow: "Who we are",
      title: "A technology partner invested in your long-term success",
      highlight: "long-term success",
      subtitle:
        "We combine product thinking, senior engineering and honest communication to turn complex ideas into dependable software.",
    },
    story: [
      "Nexora started in 2014 in a small San Francisco studio with three engineers and one belief: great software comes from teams that care about the business behind the code. Eleven years later we are 40+ specialists delivering products for clients in 14 countries.",
      "We work as one team with yours — sharing roadmaps, demos and metrics every week. That transparency is why 78% of our revenue comes from clients who have already worked with us before.",
      "Whether you are launching a new platform, modernising a legacy system or adding AI to an existing workflow, we bring the same senior team, the same clear process and the same accountability.",
    ],
    image: {
      src: "/images/about/team-collaboration.png",
      alt: "Nexora team collaborating around a whiteboard during a product workshop",
      width: 960,
      height: 720,
    },
    secondaryImage: {
      src: "/images/about/office.png",
      alt: "Inside the Nexora office in San Francisco",
      width: 640,
      height: 480,
    },
    missionVision: {
      mission: {
        title: "Our mission",
        icon: "Compass",
        description:
          "To empower organisations with technology that is simple to use, easy to scale and genuinely useful to the people who rely on it every day.",
      },
      vision: {
        title: "Our vision",
        icon: "Telescope",
        description:
          "A world where every company — no matter its size — has access to the same quality of engineering as the largest technology firms.",
      },
    },
    subsections: {
      story: {
        eyebrow: "Our story",
        title: "Eleven years of building for clients who stay",
        subtitle:
          "From a three-person studio to a senior team delivering across three continents.",
      },
      missionVision: {
        eyebrow: "Purpose",
        title: "Two ideas that keep our work honest",
        subtitle:
          "Useful technology for the people who rely on it, and engineering quality within reach of every company.",
      },
      values: {
        eyebrow: "Our values",
        title: "The principles we hire and grow by",
        subtitle:
          "Values only matter when they change how you work — these four shape every engagement.",
      },
      timeline: {
        eyebrow: "Milestones",
        title: "How Nexora grew, one chapter at a time",
        subtitle: "Eleven years, five milestones and one consistent way of working.",
      },
    },
    values: [
      {
        title: "Ownership",
        description:
          "We treat your product like our own: we measure outcomes, not hours, and we speak up when we see a better path.",
        icon: "Target",
      },
      {
        title: "Craftsmanship",
        description:
          "Clean architecture, tested code and thoughtful design are non-negotiable — they are what keep your product fast as it grows.",
        icon: "Sparkles",
      },
      {
        title: "Transparency",
        description:
          "Weekly demos, open budgets and honest estimates. You always know where the work stands.",
        icon: "ShieldCheck",
      },
      {
        title: "People first",
        description:
          "Technology is only half the job. We invest in the humans who use, maintain and benefit from what we build.",
        icon: "HeartHandshake",
      },
    ],
    timeline: [
      {
        year: "2014",
        title: "Nexora is founded",
        description:
          "Three engineers start the studio in San Francisco with a single fintech client.",
        icon: "Rocket",
      },
      {
        year: "2017",
        title: "First product reaches 1M users",
        description:
          "Our logistics platform crosses one million monthly active users across North America.",
        icon: "TrendingUp",
      },
      {
        year: "2020",
        title: "Remote-first, global delivery",
        description:
          "We go fully distributed and open delivery hubs in Lisbon and Bengaluru.",
        icon: "Globe",
      },
      {
        year: "2022",
        title: "Cloud & Data practice",
        description:
          "A dedicated cloud and data team launches to serve migration and analytics projects.",
        icon: "Cloud",
      },
      {
        year: "2025",
        title: "AI delivery squads",
        description:
          "We ship our first generative AI products and grow to 40+ in-house specialists.",
        icon: "Cpu",
      },
    ],
    signature: {
      name: "Amelia Hartley",
      role: "Founder & CEO, Nexora",
      image: {
        src: "/images/team/amelia-hartley.png",
        alt: "Amelia Hartley, Founder and CEO of Nexora",
        width: 320,
        height: 320,
      },
    },
    // The dedicated /about route this button points at.
    cta: { label: "Learn more about us", href: "/about" },
  },

  /* ==========================================================================
     SERVICES — the 5 things you sell
     ========================================================================== */
  services: {
    heading: {
      eyebrow: "What we do",
      title: "Services engineered for measurable outcomes",
      highlight: "measurable outcomes",
      subtitle:
        "End-to-end teams that take you from an idea to a production product — and keep improving it after launch.",
    },
    items: [
      {
        id: "custom-software",
        slug: "custom-software-development",
        icon: "Code",
        title: "Custom Software Development",
        shortDescription:
          "Bespoke web platforms and internal tools built around the way your business actually works.",
        description:
          "We design, build and maintain business-critical software: customer portals, marketplaces, ERP extensions and operational dashboards. Every engagement starts with a discovery workshop so scope, risks and budget are clear before a single line of code is written.",
        features: [
          "Discovery workshop & product roadmap",
          "UX/UI design and interactive prototypes",
          "Full-stack engineering with automated tests",
          "Legacy modernisation and re-platforming",
        ],
        href: "/services/custom-software-development",
        startingPrice: "From $12,000",
        timeline: "8 – 16 weeks",
        featured: true,
        badge: { label: "Most requested", icon: "Star" },
      },
      {
        id: "mobile-apps",
        slug: "web-and-mobile-apps",
        icon: "Smartphone",
        title: "Web & Mobile Applications",
        shortDescription:
          "Fast, accessible web apps and native-quality iOS & Android products your users love.",
        description:
          "From progressive web apps to React Native and Flutter mobile clients, we ship responsive, WCAG-compliant products with offline support, push notifications and app-store delivery handled for you.",
        features: [
          "React, Next.js and TypeScript front-ends",
          "React Native & Flutter mobile apps",
          "Design systems and component libraries",
          "App Store and Play Store release management",
        ],
        href: "/services/web-and-mobile-apps",
        startingPrice: "From $9,000",
        timeline: "6 – 12 weeks",
      },
      {
        id: "cloud-devops",
        slug: "cloud-and-devops",
        icon: "Cloud",
        title: "Cloud & DevOps",
        shortDescription:
          "Migrations, infrastructure-as-code and CI/CD pipelines that cut cost and downtime.",
        description:
          "We move workloads to AWS, Azure or Google Cloud, codify your infrastructure with Terraform and set up pipelines, monitoring and alerting so releases become boring — in the best possible way.",
        features: [
          "AWS / Azure / GCP architecture & migration",
          "Terraform infrastructure as code",
          "CI/CD, automated testing and releases",
          "Observability, cost optimisation and SRE support",
        ],
        href: "/services/cloud-and-devops",
        startingPrice: "From $7,500",
        timeline: "4 – 10 weeks",
      },
      {
        id: "data-ai",
        slug: "data-and-ai",
        icon: "BrainCircuit",
        title: "Data, Analytics & AI",
        shortDescription:
          "Turn scattered data into dashboards, forecasts and AI features that earn their keep.",
        description:
          "We build reliable data pipelines, modern BI dashboards and production-grade AI — from retrieval-augmented assistants to demand forecasting — with evaluation and guardrails from day one.",
        features: [
          "Data warehousing and ETL/ELT pipelines",
          "BI dashboards and self-serve reporting",
          "Generative AI assistants and RAG search",
          "ML model training, evaluation and monitoring",
        ],
        href: "/services/data-and-ai",
        startingPrice: "From $10,000",
        timeline: "6 – 14 weeks",
        badge: { label: "Fast growing", icon: "Sparkles" },
      },
      {
        id: "it-consulting",
        slug: "it-consulting-and-support",
        icon: "Headphones",
        title: "IT Consulting & Support",
        shortDescription:
          "Fractional CTO guidance, architecture reviews and 24/7 support for critical systems.",
        description:
          "Bring in senior expertise without a full-time hire. We audit architecture, improve security posture, plan roadmaps and keep your systems healthy with proactive monitoring and on-call support.",
        features: [
          "Fractional CTO and technical due diligence",
          "Security audits and compliance readiness",
          "Performance and architecture reviews",
          "Managed support with SLA-backed response",
        ],
        href: "/services/it-consulting-and-support",
        startingPrice: "From $2,500/mo",
        timeline: "Ongoing",
      },
    ],
    cta: { label: "See all capabilities", href: "/services" },
    linkLabel: "Learn more",
    detail: {
      features: {
        eyebrow: "What's included",
        title: "Everything in this engagement",
        subtitle: "Scope, deliverables and working practices covered from day one.",
      },
      related: {
        eyebrow: "Next steps",
        title: "Services that pair well with this one",
        subtitle:
          "Most clients combine two or more of these into a single delivery team.",
      },
      cta: { label: "Discuss this service", href: "/contact" },
    },
  },

  /* ==========================================================================
     STATS — animated counters, usually under the services
     ========================================================================== */
  stats: {
    heading: {
      eyebrow: "By the numbers",
      title: "Results our clients can measure",
      subtitle: "A decade of consistent delivery, retention and growth.",
    },
    items: [
      {
        id: "years",
        value: "11",
        suffix: "+",
        label: "Years in business",
        description: "Delivering software since 2014",
        icon: "Calendar",
      },
      {
        id: "projects",
        value: "250",
        suffix: "+",
        label: "Projects delivered",
        description: "Across 14 countries",
        icon: "Briefcase",
      },
      {
        id: "satisfaction",
        value: "98",
        suffix: "%",
        label: "Client satisfaction",
        description: "Measured after every release",
        icon: "HeartHandshake",
      },
      {
        id: "experts",
        value: "40",
        suffix: "+",
        label: "In-house experts",
        description: "Engineers, designers and analysts",
        icon: "Users",
      },
    ],
  },

  /* ==========================================================================
     CLIENTS — logo strip / marquee
     ========================================================================== */
  clients: {
    title: "Trusted by teams at fast-growing companies and global brands",
    items: [
      {
        id: "vertex",
        name: "Vertex Financial",
        logo: { src: "/logos/client-vertex.svg", alt: "Vertex Financial logo" },
        url: "https://example.com",
        industry: "Finance",
      },
      {
        id: "northwind",
        name: "Northwind Retail",
        logo: {
          src: "/logos/client-northwind.svg",
          alt: "Northwind Retail logo",
        },
        url: "https://example.com",
        industry: "Retail",
      },
      {
        id: "helios",
        name: "Helios Energy",
        logo: { src: "/logos/client-helios.svg", alt: "Helios Energy logo" },
        url: "https://example.com",
        industry: "Energy",
      },
      {
        id: "carewell",
        name: "Carewell Health",
        logo: { src: "/logos/client-carewell.svg", alt: "Carewell Health logo" },
        url: "https://example.com",
        industry: "Healthcare",
      },
      {
        id: "meridian",
        name: "Meridian Logistics",
        logo: {
          src: "/logos/client-meridian.svg",
          alt: "Meridian Logistics logo",
        },
        url: "https://example.com",
        industry: "Logistics",
      },
      {
        id: "atlas",
        name: "Atlas Learning",
        logo: { src: "/logos/client-atlas.svg", alt: "Atlas Learning logo" },
        url: "https://example.com",
        industry: "Education",
      },
    ],
  },

  /* ==========================================================================
     PROJECTS — portfolio / case studies (6 items)
     ========================================================================== */
  projects: {
    heading: {
      eyebrow: "Selected work",
      title: "Products we shipped, results our clients kept",
      highlight: "results",
      subtitle:
        "A snapshot of recent engagements across fintech, health, retail and logistics.",
    },
    categories: ["All", "Fintech", "Healthcare", "Retail", "Logistics", "SaaS"],
    items: [
      {
        id: "orbit-pay",
        slug: "orbit-pay",
        title: "OrbitPay Payments Platform",
        client: "Vertex Financial",
        category: "Fintech",
        summary:
          "A multi-currency payment gateway that cut settlement time from 3 days to 4 hours.",
        description:
          "We replaced a monolithic payment core with an event-driven platform on AWS, added real-time fraud scoring and delivered a merchant dashboard used by 4,000+ businesses across 9 markets.",
        image: {
          src: "/images/projects/orbit-pay.png",
          alt: "OrbitPay merchant dashboard showing payment volume and settlement status",
          width: 1200,
          height: 800,
        },
        tags: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Terraform"],
        year: "2025",
        url: "https://example.com",
        results: [
          { label: "Settlement time", value: "-94%" },
          { label: "Monthly volume", value: "+$18M" },
        ],
        featured: true,
        badge: { label: "Case study", icon: "Award" },
      },
      {
        id: "careflow",
        slug: "careflow",
        title: "CareFlow Patient App",
        client: "Carewell Health",
        category: "Healthcare",
        summary:
          "HIPAA-compliant scheduling and telehealth app used by 120,000 patients.",
        description:
          "A React Native application with appointment booking, secure video visits and prescription reminders, integrated with three major EHR systems and audited for HIPAA compliance.",
        image: {
          src: "/images/projects/careflow.png",
          alt: "CareFlow mobile app appointment booking screen",
          width: 1200,
          height: 800,
        },
        tags: ["React Native", "TypeScript", "FHIR", "Azure"],
        year: "2025",
        results: [
          { label: "No-show rate", value: "-38%" },
          { label: "App rating", value: "4.8/5" },
        ],
        featured: true,
      },
      {
        id: "shelfwise",
        slug: "shelfwise",
        title: "ShelfWise Retail Intelligence",
        client: "Northwind Retail",
        category: "Retail",
        summary: "AI demand forecasting that reduced overstock across 260 stores.",
        description:
          "We built a data pipeline feeding a gradient-boosted forecasting model, plus a planner dashboard that recommends weekly replenishment for every store and SKU.",
        image: {
          src: "/images/projects/shelfwise.png",
          alt: "ShelfWise forecasting dashboard with demand charts by store",
          width: 1200,
          height: 800,
        },
        tags: ["Python", "dbt", "Snowflake", "React", "MLflow"],
        year: "2024",
        results: [
          { label: "Overstock", value: "-27%" },
          { label: "Stockouts", value: "-19%" },
        ],
      },
      {
        id: "routeflow",
        slug: "routeflow",
        title: "RouteFlow Logistics Suite",
        client: "Meridian Logistics",
        category: "Logistics",
        summary: "Real-time fleet tracking and route optimisation for 900 vehicles.",
        description:
          "A Go and Kafka telemetry platform with a live map, driver mobile app and an optimisation engine that recalculates 15,000 routes every morning.",
        image: {
          src: "/images/projects/routeflow.png",
          alt: "RouteFlow live fleet map with vehicle markers and route lines",
          width: 1200,
          height: 800,
        },
        tags: ["Go", "Kafka", "Mapbox", "Kubernetes"],
        year: "2024",
        results: [
          { label: "Fuel cost", value: "-16%" },
          { label: "On-time delivery", value: "+12%" },
        ],
      },
      {
        id: "learnloop",
        slug: "learnloop",
        title: "LearnLoop Course Platform",
        client: "Atlas Learning",
        category: "SaaS",
        summary: "A white-label learning platform serving 60,000 monthly learners.",
        description:
          "Multi-tenant SaaS with video delivery, assessments, certificates and a new AI tutor that answers questions using only the course material.",
        image: {
          src: "/images/projects/learnloop.png",
          alt: "LearnLoop course player with AI tutor sidebar",
          width: 1200,
          height: 800,
        },
        tags: ["Next.js", "tRPC", "PostgreSQL", "AWS"],
        year: "2024",
        results: [
          { label: "Course completion", value: "+31%" },
          { label: "Support tickets", value: "-44%" },
        ],
      },
      {
        id: "solargrid",
        slug: "solargrid",
        title: "Helios Solar Monitoring",
        client: "Helios Energy",
        category: "SaaS",
        summary: "IoT monitoring for 22,000 solar installations with anomaly alerts.",
        description:
          "An ingest pipeline processing 40M daily readings, a time-series database and an operations console that flags underperforming panels within minutes.",
        image: {
          src: "/images/projects/solargrid.png",
          alt: "Helios solar monitoring console with array performance heatmap",
          width: 1200,
          height: 800,
        },
        tags: ["TypeScript", "TimescaleDB", "Grafana", "GCP"],
        year: "2023",
        results: [
          { label: "Detection time", value: "-87%" },
          { label: "Uptime", value: "99.98%" },
        ],
      },
    ],
    cta: { label: "Discuss your project", href: "/contact" },
  },

  /* ==========================================================================
     TEAM — the people (4 members)
     ========================================================================== */
  team: {
    heading: {
      eyebrow: "The team",
      title: "Senior people who stay on your project",
      highlight: "stay on your project",
      subtitle:
        "No bait-and-switch: the experts you meet in the first call are the ones who deliver.",
    },
    members: [
      {
        id: "amelia-hartley",
        name: "Amelia Hartley",
        role: "Founder & CEO",
        bio: "Former VP of Engineering at a Series C fintech. Amelia has shipped products used by 10M+ people and leads strategy and client partnerships at Nexora.",
        image: {
          src: "/images/team/amelia-hartley.png",
          alt: "Portrait of Amelia Hartley, Founder and CEO of Nexora",
          width: 640,
          height: 640,
        },
        socials: [
          {
            platform: "linkedin",
            url: "https://www.linkedin.com/in/ameliahartley",
            label: "Amelia Hartley on LinkedIn",
          },
          {
            platform: "twitter",
            url: "https://x.com/ameliahartley",
            label: "Amelia Hartley on X",
          },
        ],
        skills: ["Product strategy", "Leadership", "Fintech"],
        email: "amelia@nexora.tech",
      },
      {
        id: "daniel-okafor",
        name: "Daniel Okafor",
        role: "Chief Technology Officer",
        bio: "15 years building distributed systems. Daniel owns our architecture standards, cloud practice and the technical quality of every delivery.",
        image: {
          src: "/images/team/daniel-okafor.png",
          alt: "Portrait of Daniel Okafor, Chief Technology Officer at Nexora",
          width: 640,
          height: 640,
        },
        socials: [
          {
            platform: "linkedin",
            url: "https://www.linkedin.com/in/danielokafor",
            label: "Daniel Okafor on LinkedIn",
          },
          {
            platform: "github",
            url: "https://github.com/dokafor",
            label: "Daniel Okafor on GitHub",
          },
        ],
        skills: ["Cloud architecture", "Kubernetes", "Go"],
        email: "daniel@nexora.tech",
      },
      {
        id: "sofia-marchetti",
        name: "Sofia Marchetti",
        role: "Head of Design",
        bio: "Product designer turned design lead. Sofia runs our research and design-system practice, making complex workflows feel simple and accessible.",
        image: {
          src: "/images/team/sofia-marchetti.png",
          alt: "Portrait of Sofia Marchetti, Head of Design at Nexora",
          width: 640,
          height: 640,
        },
        socials: [
          {
            platform: "linkedin",
            url: "https://www.linkedin.com/in/sofiamarchetti",
            label: "Sofia Marchetti on LinkedIn",
          },
          {
            platform: "dribbble",
            url: "https://dribbble.com/sofiamarchetti",
            label: "Sofia Marchetti on Dribbble",
          },
        ],
        skills: ["UX research", "Design systems", "Accessibility"],
        email: "sofia@nexora.tech",
      },
      {
        id: "arjun-mehta",
        name: "Arjun Mehta",
        role: "Head of Engineering",
        bio: "Arjun leads our engineering guild: code quality, hiring and the delivery pipelines that keep releases safe, fast and repeatable.",
        image: {
          src: "/images/team/arjun-mehta.png",
          alt: "Portrait of Arjun Mehta, Head of Engineering at Nexora",
          width: 640,
          height: 640,
        },
        socials: [
          {
            platform: "linkedin",
            url: "https://www.linkedin.com/in/arjunmehta",
            label: "Arjun Mehta on LinkedIn",
          },
          {
            platform: "github",
            url: "https://github.com/arjunmehta",
            label: "Arjun Mehta on GitHub",
          },
        ],
        skills: ["TypeScript", "DevOps", "Team building"],
        email: "arjun@nexora.tech",
      },
    ],
    cta: { label: "Join the team", href: "/contact" },
  },

  /* ==========================================================================
     TESTIMONIALS — client quotes (4 items, rating from 1 to 5)
     ========================================================================== */
  testimonials: {
    heading: {
      eyebrow: "Testimonials",
      title: "What clients say about working with us",
      subtitle: "Independently verified reviews from long-term partners.",
    },
    items: [
      {
        id: "t-vertex",
        quote:
          "Nexora rebuilt our payments core in seven months without a single hour of downtime. They pushed back when our scope was wrong, which is exactly what we needed from a partner.",
        author: {
          name: "Marcus Reed",
          role: "VP Engineering",
          company: "Vertex Financial",
          image: {
            src: "/images/testimonials/marcus-reed.png",
            alt: "Marcus Reed, VP Engineering at Vertex Financial",
            width: 160,
            height: 160,
          },
        },
        rating: 5,
        project: "OrbitPay Payments Platform",
      },
      {
        id: "t-carewell",
        quote:
          "Our patients actually enjoy using the app. The team handled HIPAA requirements calmly and explained every trade-off in language our board could understand.",
        author: {
          name: "Dr. Priya Nair",
          role: "Chief Digital Officer",
          company: "Carewell Health",
          image: {
            src: "/images/testimonials/priya-nair.png",
            alt: "Dr. Priya Nair, Chief Digital Officer at Carewell Health",
            width: 160,
            height: 160,
          },
        },
        rating: 5,
        project: "CareFlow Patient App",
      },
      {
        id: "t-northwind",
        quote:
          "Forecast accuracy improved in the first month. What impressed us more was the handover — documentation, training and dashboards our team could own themselves.",
        author: {
          name: "Elena Vasquez",
          role: "Director of Supply Chain",
          company: "Northwind Retail",
          image: {
            src: "/images/testimonials/elena-vasquez.png",
            alt: "Elena Vasquez, Director of Supply Chain at Northwind Retail",
            width: 160,
            height: 160,
          },
        },
        rating: 5,
        project: "ShelfWise Retail Intelligence",
      },
      {
        id: "t-meridian",
        quote:
          "We have worked with four agencies over ten years. Nexora is the first one still with us after the initial project — two years and three releases later.",
        author: {
          name: "Tom Baker",
          role: "COO",
          company: "Meridian Logistics",
          image: {
            src: "/images/testimonials/tom-baker.png",
            alt: "Tom Baker, COO at Meridian Logistics",
            width: 160,
            height: 160,
          },
        },
        rating: 5,
        project: "RouteFlow Logistics Suite",
      },
    ],
  },

  /* ==========================================================================
     PRICING — 3 plans (set `highlighted: true` on the plan to emphasise)
     ========================================================================== */
  pricing: {
    heading: {
      eyebrow: "Engagement models",
      title: "Transparent pricing, no surprises",
      highlight: "no surprises",
      subtitle:
        "Fixed monthly retainers with a clear scope. Scale up, pause or cancel with 30 days notice.",
    },
    note: "All prices in USD. No hidden fees. 30-day money-back guarantee.",
    plans: [
      {
        id: "essential",
        name: "Essential",
        description: "For startups and small teams validating a first product.",
        price: {
          amount: "2,900",
          currency: "$",
          period: "/ month",
          note: "billed monthly",
        },
        features: [
          "1 senior full-stack engineer",
          "Up to 60 hours per month",
          "Weekly demo call",
          "Project board & async updates",
          "48-hour response time",
          "Source code delivered weekly",
        ],
        exclusions: ["Dedicated designer", "24/7 support"],
        cta: { label: "Get started", href: "/contact" },
      },
      {
        id: "growth",
        name: "Growth",
        description: "For companies shipping a roadmap with real deadlines.",
        price: {
          amount: "5,900",
          currency: "$",
          period: "/ month",
          note: "billed monthly",
        },
        features: [
          "Dedicated squad: 2 engineers + designer",
          "Up to 160 hours per month",
          "Product discovery & sprint planning",
          "UI/UX design included",
          "24-hour response time",
          "CI/CD, testing and QA included",
          "Slack channel with the whole team",
        ],
        cta: { label: "Get started", href: "/contact" },
        highlighted: true,
        badge: { label: "Most popular", icon: "Star" },
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For organisations needing scale, security and SLAs.",
        price: {
          amount: "Custom",
          currency: "",
          period: "",
          note: "scoped after a discovery workshop",
        },
        features: [
          "Cross-functional delivery team",
          "Unlimited scope within the roadmap",
          "Named delivery manager & architect",
          "Security, compliance and audit support",
          "1-hour response, 24/7 on-call",
          "SLA-backed uptime & reporting",
          "Quarterly executive business review",
        ],
        cta: { label: "Talk to sales", href: "/contact" },
      },
    ],
    footnote: "Need a fixed-price project instead? We quote those too.",
    cta: { label: "Request a custom quote", href: "/contact" },
  },

  /* ==========================================================================
     FAQ — 6 questions (use `category` to group them)
     ========================================================================== */
  faq: {
    heading: {
      eyebrow: "FAQ",
      title: "Questions we hear before every engagement",
      subtitle: "Can't find your answer? Our team replies within one business day.",
    },
    items: [
      {
        id: "faq-process",
        category: "Working together",
        question: "How does a typical project start?",
        answer:
          "Every engagement begins with a free 45-minute call, followed by a paid discovery workshop if there is a fit. At the end of discovery you receive a roadmap, a fixed estimate and a delivery plan — and you own all of that output whether you continue with us or not.",
      },
      {
        id: "faq-timeline",
        category: "Working together",
        question: "How long does it take to launch?",
        answer:
          "Most first releases go live in 6 to 16 weeks depending on scope. You will see working software in the first two weeks — we demo at the end of every sprint, so progress is visible long before launch day.",
      },
      {
        id: "faq-team",
        category: "Working together",
        question: "Who will actually work on my project?",
        answer:
          "A named, in-house team: engineers, a designer and a delivery manager. You meet them during the proposal, they stay for the duration of the engagement, and we never hand your project to anonymous subcontractors.",
      },
      {
        id: "faq-pricing",
        category: "Pricing",
        question: "What if our scope changes mid-project?",
        answer:
          "Scope changes are normal. We re-estimate together, show the impact on budget and timeline before any work starts, and you decide whether to proceed, swap something out or defer it to the next sprint.",
      },
      {
        id: "faq-ownership",
        category: "Pricing",
        question: "Who owns the code and intellectual property?",
        answer:
          "You do — completely. Source code, design files, documentation and infrastructure accounts are transferred to your organisation. We only ask to reference your brand in our portfolio, and only with your written permission.",
      },
      {
        id: "faq-support",
        category: "After launch",
        question: "Do you support the product after launch?",
        answer:
          "Yes. Every project includes 30 days of warranty fixes, and most clients move onto a support retainer covering monitoring, security patches, minor features and an SLA-backed response time.",
      },
    ],
    contactNote: {
      label: "Still have a question?",
      cta: { label: "Ask our team", href: "/contact" },
    },
  },

  /* ==========================================================================
     BLOG — 3 latest articles (publishedAt uses YYYY-MM-DD)
     ========================================================================== */
  blog: {
    heading: {
      eyebrow: "Insights",
      title: "Ideas, playbooks and lessons from the field",
      subtitle: "Practical writing from the people who build our clients' products.",
    },
    posts: [
      {
        id: "post-genai",
        slug: "shipping-genai-features-that-users-trust",
        title: "Shipping generative AI features that users actually trust",
        excerpt:
          "Evaluation sets, guardrails and the four questions to answer before you put a model in front of customers.",
        image: {
          src: "/images/blog/genai-trust.png",
          alt: "Diagram showing an AI evaluation and guardrail pipeline",
          width: 1200,
          height: 675,
        },
        category: "AI & Data",
        tags: ["Generative AI", "Quality", "Product"],
        publishedAt: "2026-02-14",
        readingTime: "7 min read",
        author: {
          name: "Daniel Okafor",
          role: "Chief Technology Officer",
          avatar: {
            src: "/images/team/daniel-okafor.png",
            alt: "Daniel Okafor",
            width: 96,
            height: 96,
          },
        },
        content: [
          {
            heading: "Start with an evaluation set, not an opinion",
            paragraphs: [
              "Before anyone argues about which model to use, write down what 'good' looks like. Pull 50–100 real examples from your domain — support tickets, product descriptions, the messy input you actually receive — and agree on what a correct answer looks like for each one.",
              "That set becomes your regression suite. Every prompt change, every model upgrade and every guardrail you add gets scored against it before it reaches a user. Teams that skip this step end up tuning on vibes, and vibes do not survive a demo with the CEO.",
            ],
          },
          {
            heading: "Guardrails are product features, not afterthoughts",
            paragraphs: [
              "Input filters, output checks, refusal copy and the escape hatch to a human are all part of the experience — design them with the same care as the onboarding flow. Decide what the assistant must never claim, what it says when it is unsure, and where the conversation hands off to your team.",
              "Log every refusal and every escalation. Those traces are the cheapest research you will ever run: they show exactly where the model's confidence and your users' expectations stop overlapping.",
            ],
          },
          {
            heading: "Four questions to answer before launch",
            paragraphs: [
              "Who reviews a bad output, and how fast? What does the system cost at ten times the expected traffic, and who approved that ceiling? How do you switch the feature off without a deploy? And when the model is wrong in a way that matters, what does the user see?",
              "Write the answers down. If any of them takes more than a minute to produce, you have found your launch blocker.",
            ],
          },
          {
            heading: "Ship behind a flag and watch the traces",
            paragraphs: [
              "Roll out to 1% of traffic, review a sample of conversations daily, and expand only when the evaluation scores hold. The flag is your rollback plan, the eval set is your quality bar, and the traces are your roadmap — in that order, every time.",
              "Trust is not a model benchmark. It is what users experience on the tenth run, when the answer is still useful and the system still knows its limits.",
            ],
          },
        ],
        featured: true,
      },
      {
        id: "post-legacy",
        slug: "legacy-migration-without-a-big-bang",
        title: "Legacy migration without a big bang: the strangler pattern in practice",
        excerpt:
          "How we moved a 12-year-old monolith to services while the business kept shipping features every week.",
        image: {
          src: "/images/blog/legacy-migration.png",
          alt: "Illustration of a monolith being gradually replaced by services",
          width: 1200,
          height: 675,
        },
        category: "Engineering",
        tags: ["Architecture", "Cloud", "Migration"],
        publishedAt: "2026-01-28",
        readingTime: "9 min read",
        author: {
          name: "Arjun Mehta",
          role: "Head of Engineering",
          avatar: {
            src: "/images/team/arjun-mehta.png",
            alt: "Arjun Mehta",
            width: 96,
            height: 96,
          },
        },
        content: [
          {
            heading: "The strangler pattern, in one paragraph",
            paragraphs: [
              "Instead of rebuilding the monolith, you put a facade in front of it — a proxy that routes traffic — and stand new services beside the old code. Each time you rebuild a capability behind the facade, the strangler vine grows a little and the monolith shrinks a little.",
              "Nothing big-bang happens: the site stays up, the team keeps shipping, and every increment ships value you can demo.",
            ],
          },
          {
            heading: "Pick seams that pay for themselves",
            paragraphs: [
              "Start where the pain and the payoff overlap: the module that changes weekly, the integration that keeps breaking, the report nobody trusts. We migrated billing and scheduling first — not because they were easiest, but because every release stopped waiting on them.",
              "Leave the stable, boring code alone. 'Legacy' is not an age; it is the code that resists the change you need to make.",
            ],
          },
          {
            heading: "Keep both worlds in sync for a while",
            paragraphs: [
              "During the overlap you will run dual writes or change-data-capture, plus a parity job that compares old and new outputs until you trust them. Budget for that glue — it is temporary by design, but it is real work that belongs in the estimate.",
              "Flip traffic in slices: internal users first, then 5%, then everyone. When the parity checks stay green for a sprint, the old path gets deleted.",
            ],
          },
          {
            heading: "Retirement is the deliverable",
            paragraphs: [
              "A migration is not done when the new service is live; it is done when the old code, the sync jobs and the feature flags are gone. Keep a decommission checklist next to the launch plan and review it every sprint.",
              "The metric that matters is not 'services created' — it is 'lines of legacy deleted per quarter'.",
            ],
          },
        ],
      },
      {
        id: "post-discovery",
        slug: "why-discovery-saves-you-money",
        title: "Why a two-week discovery saves months of rework",
        excerpt:
          "The artefacts a good discovery produces, what they cost, and how they prevent the three most common budget overruns.",
        image: {
          src: "/images/blog/discovery-workshop.png",
          alt: "Team running a product discovery workshop with sticky notes",
          width: 1200,
          height: 675,
        },
        category: "Product",
        tags: ["Discovery", "Process", "Budget"],
        publishedAt: "2026-01-09",
        readingTime: "5 min read",
        author: {
          name: "Amelia Hartley",
          role: "Founder & CEO",
          avatar: {
            src: "/images/team/amelia-hartley.png",
            alt: "Amelia Hartley",
            width: 96,
            height: 96,
          },
        },
        content: [
          {
            heading: "What two weeks actually buys",
            paragraphs: [
              "A focused discovery gives you three things: a shared map of the problem, a list of the risks that could sink the project, and enough of the interface or architecture sketched to put credible numbers against the work.",
              "Two weeks sounds expensive until you compare it with six weeks of a team building the wrong thing at full speed.",
            ],
          },
          {
            heading: "The three overruns it prevents",
            paragraphs: [
              "Scope churn, when stakeholders realise mid-build that they meant something else; integration surprises, when the 'simple' API turns out to need a data migration of its own; and the wrong-problem overrun, where the software is delivered exactly as specified and nobody uses it.",
              "Discovery does not remove change — change is normal. It moves the expensive changes to the point where they are still cheap to make.",
            ],
          },
          {
            heading: "You keep the artefacts either way",
            paragraphs: [
              "At the end you hold a scope brief, a technical sketch, a delivery plan with milestones, and estimate ranges tied to assumptions. They are yours whether or not you continue with us — you can take them to another team or start building on Monday.",
              "If a vendor will not hand over the thinking, you are not buying a discovery; you are buying a sales meeting.",
            ],
          },
          {
            heading: "When you can skip it",
            paragraphs: [
              "Small, well-understood work with a clear owner does not need a discovery — a one-page brief and a fixed estimate are enough. The test is uncertainty: if two experienced people would guess numbers more than a day apart, spend the two weeks.",
              "Discovery is not a toll booth. It is insurance with a deliverable, and the premium is far smaller than the claim.",
            ],
          },
        ],
      },
    ],
    related: {
      eyebrow: "More insights",
      title: "Keep reading",
    },
    cta: { label: "Read all articles", href: "/blog" },
  },

  /* ==========================================================================
     CTA — the big banner before the footer
     ========================================================================== */
  cta: {
    eyebrow: "Let's talk",
    title: "Ready to build something",
    highlight: "worth shipping?",
    description:
      "Tell us what you are working on. You will get a senior engineer on the first call, honest advice, and a clear next step — no sales script.",
    primaryCta: { label: "Book a free consultation", href: "/contact" },
    secondaryCta: { label: "hello@nexora.tech", href: "mailto:hello@nexora.tech" },
    bullets: [
      "Reply within 24 hours",
      "Free 45-minute consultation",
      "NDA signed on request",
    ],
    image: {
      src: "/images/cta/consultation.png",
      alt: "Nexora consultant in a video call with a client",
      width: 960,
      height: 720,
    },
  },

  /* ==========================================================================
     FOOTER — description, copyright template and newsletter
     ========================================================================== */
  footer: {
    description:
      "Nexora designs and engineers software, cloud and AI products for organisations that care about quality. Based in San Francisco, delivering worldwide.",
    // Placeholders: {year} becomes the current year, {name} becomes company.name
    copyright: "© {year} {name}. All rights reserved.",
    newsletter: {
      title: "Get the monthly playbook",
      description:
        "One email a month: engineering lessons, product patterns and what we are learning from client work.",
      placeholder: "you@company.com",
      buttonText: "Subscribe",
      disclaimer: "No spam. Unsubscribe any time. We respect your privacy.",
      successMessage: "You are on the list — check your inbox to confirm.",
    },
    badges: [
      { label: "ISO 27001 certified", icon: "ShieldCheck" },
      { label: "AWS Advanced Partner", icon: "Cloud" },
      { label: "GDPR compliant", icon: "BadgeCheck" },
    ],
  },

  /* ==========================================================================
     FEATURES — turn sections on or off
     true  = the section is rendered
     false = the section is completely hidden
     ========================================================================== */
  features: {
    header: true,
    hero: true,
    clients: true,
    about: true,
    services: true,
    stats: true,
    projects: true,
    team: true,
    testimonials: true,
    pricing: true,
    faq: true,
    showBlog: true,
    cta: true,
    contact: true,
    footer: true,
  },
};

export default siteConfig;
