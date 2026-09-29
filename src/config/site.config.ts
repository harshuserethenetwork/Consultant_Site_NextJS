/**
 * -----------------------------------------------------------------------------
 * SITE CONFIGURATION — the only file you need to edit to change the website
 * -----------------------------------------------------------------------------
 * HOW TO USE THIS FILE
 * 1. Everything the website shows (text, links, colors, contact details,
 *    services, engagement terms, FAQs, SEO…) lives here.
 * 2. Each block below starts with an ALL-CAPS comment that explains what it does.
 * 3. Keep the punctuation correct:
 *      - Text goes between double quotes:  "Hello"
 *      - Every line inside a block ends with a comma:  value: "Hello",
 *      - Never delete a quote, bracket or comma — the site will not start.
 * 4. Hide a section of the site: scroll to the "features" block at the bottom
 *    and change `true` to `false`.
 * 5. Colors are HEX values (#RRGGBB).
 *
 * PUBLISHING RULE
 * Only enter claims the company has actually supplied and approved: services,
 * engagement terms, coverage, platform names and management experience.
 * Do not add metrics, client names, testimonials, certifications or team
 * members here — there is no component on the site that would render them.
 * -----------------------------------------------------------------------------
 */

import type { SiteConfig } from "@/types/config";

export const siteConfig: SiteConfig = {
  /* ==========================================================================
     COMPANY — who you are (shown in the header, footer, meta tags)
     ========================================================================== */
  company: {
    name: "Process IQ Tech",
    shortName: "Process IQ",
    legalName: "Process IQ Tech",
    tagline: "Better processes. Reliable execution.",
    description:
      "Process IQ Tech provides business process management, management and operations support, advisory and process improvement, customer-facing and back-office operations delivered by dedicated, managed teams.",
    logo: {
      light: "/logos/logo-light.svg", // logo for light mode (dark text)
      dark: "/logos/logo-dark.svg", // logo for dark mode (light text)
      system: "/logos/logo-dark.svg", // fallback while the theme is "system"
      alt: "Process IQ Tech",
    },
    favicon: "/favicon.ico",
  },

  /* ==========================================================================
     CONTACT — how people reach you (contact page, footer, buttons)
     Only publish channels that are real and monitored. Leave the optional
     email / phone / address fields out entirely until they are confirmed.
     ========================================================================== */
  contact: {
    heading: {
      eyebrow: "Get in touch",
      title: "Discuss your operation",
      highlight: "operation",
      subtitle:
        "Tell us which processes you need run, how many people you are looking for and the hours involved. We will come back with a scoped engagement model rather than a generic quote.",
    },
    form: {
      nameLabel: "Name",
      namePlaceholder: "Jane Doe",
      emailLabel: "Work email",
      emailPlaceholder: "jane@company.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+1 (415) 555-0142",
      phoneNote: "Optional",
      companyLabel: "Company",
      companyPlaceholder: "Company name",
      needsLabel: "Which functions do you need?",
      needsOptions: [
        "Process management & advisory",
        "Customer & sales operations",
        "Back-office & data operations",
        "Talent & HR operations",
        "More than one of these",
        "Not sure yet",
      ],
      teamSizeLabel: "Estimated team size",
      teamSizeOptions: [
        "5–10 employees",
        "11–25 employees",
        "26–50 employees",
        "51+ employees",
      ],
      messageLabel: "What should we know?",
      messagePlaceholder:
        "The process, the systems it runs in, the hours you need covered, and when you would like to start.",
      submitLabel: "Send enquiry",
      submittingLabel: "Sending",
      successTitle: "Enquiry received",
      successMessage:
        "Thank you — your enquiry has been recorded. A member of the management team will respond using the details you provided.",
      resetLabel: "Send another enquiry",
      errorMessage: "We couldn't send your enquiry. Please try again in a moment.",
    },
    guidance: {
      title: "What helps us scope quickly",
      items: [
        "The process or function you need covered",
        "The systems it currently runs in",
        "The hours and days you need people available",
        "An approximate team size, from 5 employees upward",
      ],
    },
  },

  /* ==========================================================================
     SOCIAL LINKS — footer & header icons
     Leave the array empty until real company profiles exist.
     ========================================================================== */
  socials: [],

  /* ==========================================================================
     SEO — what Google and social networks show
     ========================================================================== */
  seo: {
    title: "Process IQ Tech — Business Process Management & Operations Support",
    // "%s" is replaced by the page/section name: "Services | Process IQ Tech"
    titleTemplate: "%s | Process IQ Tech",
    description:
      "Process improvement, reliable execution and technology-enabled operations. Dedicated teams from 5 employees, priced per employee, with payroll, taxes and expenses included.",
    keywords: [
      "business process management",
      "operations support services",
      "process improvement consulting",
      "customer support outsourcing",
      "back office operations support",
      "inbound and outbound sales support",
      "data processing services",
      "payroll processing support",
      "talent acquisition support",
      "managed operations team",
    ],
    // Social share image — add /images/seo/og-cover.png (1200 × 630) later.
    siteUrl: "https://processiqtech.com", // confirm the production domain before launch
    twitter: {
      site: "",
      creator: "",
      card: "summary",
    },
    locale: "en_US",
    type: "website",
  },

  /* ==========================================================================
     THEME — colors, fonts, corner radius
     The same values are written into CSS variables in src/app/globals.css
     (generated by src/lib/theme.ts — keep them in sync if you edit).
     ========================================================================== */
  theme: {
    defaultTheme: "light", // this category is read in daylight; dark mode stays available
    radius: "md", // none | sm | md | lg | xl | 2xl | 3xl
    fonts: {
      heading: "Archivo", // must match a font loaded in src/app/layout.tsx
      body: "Inter",
      mono: "JetBrains Mono",
    },
    colors: {
      /* Colors used in LIGHT mode ------------------------------------------ */
      light: {
background: "#FAFBFC",
        surface: "#FAFBFC",
        foreground: "#1E293B",
        muted: "#64748B",
        mutedForeground: "#94A3B8",
        border: "#E2E8F0",
        primary: "#0F172B",
        primaryForeground: "#FFFFFF",
        secondary: "#334155",
        secondaryForeground: "#FFFFFF",
        accent: "#0F8A99",
        accentForeground: "#FFFFFF",
        ring: "#0F8A99",
      },
      /* Colors used in DARK mode ------------------------------------------- */
      dark: {
        background: "#0F172A",
        surface: "#0F172A",
        foreground: "#F1F5F9",
        muted: "#64748B",
        mutedForeground: "#98A2B3",
        border: "#1E29335",
        primary: "#64748B",
        primaryForeground: "#0F172A",
        secondary: "#98A2B3",
        secondaryForeground: "#0F172A",
        accent: "#0F8A99",
        accentForeground: "#0F172A",
        ring: "#0F8A99",
      },
    },
  },

  /* ==========================================================================
     NAVIGATION — header menu and footer link columns
     href: "/services" for a page, "/#process" for a section on the home page
     ========================================================================== */
  navigation: {
    header: [
      {
        label: "Services",
        href: "/services",
        children: [
          {
            label: "Process management & advisory",
            href: "/services#process-advisory",
            description: "BPM, advisory and operations support",
          },
          {
            label: "Customer & sales operations",
            href: "/services#customer-sales",
            description: "Support, inbound, outbound, lead generation",
          },
          {
            label: "Back-office & data operations",
            href: "/services#back-office",
            description: "Data, reconciliation, collections, payroll",
          },
          {
            label: "Talent & HR operations",
            href: "/services#talent-hr",
            description: "Hiring, training, HR support",
          },
        ],
      },
      { label: "How we work", href: "/how-we-work" },
      { label: "Engagement", href: "/engagement" },
      { label: "About", href: "/about" },
    ],
    footer: [
      {
        title: "Services",
        links: [
          { label: "All services", href: "/services" },
          {
            label: "Process management & advisory",
            href: "/services#process-advisory",
          },
          {
            label: "Customer & sales operations",
            href: "/services#customer-sales",
          },
          {
            label: "Back-office & data operations",
            href: "/services#back-office",
          },
          { label: "Talent & HR operations", href: "/services#talent-hr" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "How we work", href: "/how-we-work" },
          { label: "Engagement model", href: "/engagement" },
          { label: "About Process IQ Tech", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Operations",
        links: [
          { label: "Coverage & hours", href: "/how-we-work#coverage" },
          { label: "Quality & escalation", href: "/how-we-work#quality" },
          { label: "Technology we work in", href: "/how-we-work#technology" },
          { label: "Commercial terms", href: "/engagement#terms" },
        ],
      },
      {
        title: "Get in touch",
        links: [
          { label: "Discuss your operation", href: "/contact" },
          { label: "View engagement model", href: "/engagement" },
        ],
      },
    ],
    legal: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },

  /* ==========================================================================
     HERO — the first screen of the home page
     ========================================================================== */
  hero: {
    eyebrow: "Business process management & operations support",
    title: "Better processes. Reliable execution.",
    highlight: "Reliable execution.",
    subtitle:
      "Process IQ Tech maps, improves and runs your customer-facing and back-office operations. Dedicated teams, experienced management and technology-enabled workflows — flexible support from five employees upward.",
    primaryCta: { label: "Discuss your operation", href: "/contact" },
    secondaryCta: { label: "View engagement model", href: "/engagement" },
    diagramLabel: "Coverage model",
    qualifiers: [
      { label: "From 5 employees", description: "Dedicated, managed team" },
      { label: "9 hrs / day · 5 days / week", description: "Standard engagement" },
      { label: "24/7 capability", description: "Extended coverage when required" },
    ],
  },

  /* ==========================================================================
     SERVICES — 4 categories, 15 services
     ========================================================================== */
  services: {
    heading: {
      eyebrow: "What we do",
      title: "Fifteen functions, run as managed operations",
      highlight: "managed operations",
      subtitle:
        "Each service is a defined process with documented procedures, a named team and a manager accountable for the day-to-day.",
    },
    intro:
      "Pick the function you need covered. Every service below can be delivered as a dedicated team working in your systems, under the same engagement model.",
    categories: [
      {
        id: "process-advisory",
        index: "01",
        name: "Process management & advisory",
        anchor: "process-advisory",
        summary:
          "Define, document and improve the way work runs, then operate it with a managed team.",
        problem:
          "The work gets done, but inconsistently, undocumented and dependent on a few people who know the shortcuts.",
      },
      {
        id: "customer-sales",
        index: "02",
        name: "Customer & sales operations",
        anchor: "customer-sales",
        summary:
          "Customer contact, sales follow-up and pipeline activity handled to an agreed script and workflow.",
        problem:
          "Contact volume exceeds what your team can staff, cover and manage consistently across the day.",
      },
      {
        id: "back-office",
        index: "03",
        name: "Back-office & data operations",
        anchor: "back-office",
        summary:
          "Accuracy-sensitive recurring work — data, reconciliation, collections, payroll and vendors.",
        problem:
          "Recurring back-office work is consuming internal capacity and creating avoidable control risk.",
      },
      {
        id: "talent-hr",
        index: "04",
        name: "Talent & HR operations",
        anchor: "talent-hr",
        summary:
          "Hiring, training and day-to-day people operations run as a structured, tracked process.",
        problem:
          "People operations are either unstructured or absorbing management time that should go elsewhere.",
      },
    ],
    items: [
      {
        id: "business-process-management",
        slug: "business-process-management",
        category: "process-advisory",
        title: "Business Process Management",
        shortDescription:
          "Design, document and run your core business processes as managed operations within your organization.",
        description:
          "We map how your processes work today, define standard procedures and document each step so the work can be run consistently. A dedicated team executes the process in your existing systems, records each transaction and maintains the documentation as the process changes. Reviews are scheduled with you so the process stays aligned with operating requirements.",
        features: [
          "Process mapping and documentation",
          "Standard operating procedure design",
          "Managed process execution teams",
          "Ongoing documentation maintenance",
          "Scheduled process performance reporting",
        ],
        href: "/services/business-process-management",
      },
      {
        id: "advisory-process-improvement",
        slug: "advisory-process-improvement",
        category: "process-advisory",
        title: "Advisory & Process Improvement",
        shortDescription:
          "Review current operations, identify process gaps and recommend practical improvements to how work is done.",
        description:
          "Our advisors observe how your teams work, document the current state of each process and highlight bottlenecks, duplication and manual effort. We then propose revised process flows, clearer handoffs and updated procedures that your teams can adopt. Recommendations are prioritized by effort and impact, and we support implementation with documentation, training materials and follow-up review.",
        features: [
          "Current state process analysis",
          "Bottleneck and gap identification",
          "Redesigned process flow proposals",
          "Procedure updates and rollouts",
          "Implementation support and review",
        ],
        href: "/services/advisory-process-improvement",
      },
      {
        id: "management-operations-support",
        slug: "management-operations-support",
        category: "process-advisory",
        title: "Management & Operations Support",
        shortDescription:
          "Give managers dedicated operational support to plan, coordinate and track day-to-day business activity.",
        description:
          "This service provides a support function that handles the operational work around planning and coordination. Team members prepare reports, maintain trackers, schedule and document meetings, coordinate across departments and follow up on action items. They work inside your existing tools and reporting routines, so managers receive organized information and closed-loop tracking without added administrative load.",
        features: [
          "Management report preparation",
          "Meeting scheduling and minutes",
          "Action item follow up",
          "Cross department coordination",
          "Operational tracker maintenance",
        ],
        href: "/services/management-operations-support",
      },
      {
        id: "customer-support",
        slug: "customer-support",
        category: "customer-sales",
        title: "Customer Support",
        shortDescription:
          "Run customer support queues on your behalf, handling inquiries and issues through your established channels.",
        description:
          "Our support team handles inbound customer inquiries, triages issues, resolves standard requests and escalates cases that need your subject matter experts. Agents work in your existing systems, follow your scripts and knowledge base, and log every interaction for reference. Extended and 24-hour coverage can be arranged where the operation requires it.",
        features: [
          "Inbound customer inquiry handling",
          "Issue triage and routing",
          "Resolution of standard requests",
          "Escalation to expert teams",
          "Interaction logging and reporting",
        ],
        href: "/services/customer-support",
      },
      {
        id: "inbound-sales",
        slug: "inbound-sales",
        category: "customer-sales",
        title: "Inbound Sales",
        shortDescription:
          "Handle incoming sales inquiries, qualify interested prospects and route ready buyers to your sales team.",
        description:
          "Inbound sales staff answer product and pricing questions that come through your channels, capture buyer requirements and assess whether the opportunity fits what you offer. They maintain the inquiry pipeline in your systems, book demos or calls with your closers and pass along complete notes so conversations continue without repetition. Every interaction is recorded against the account.",
        features: [
          "Inbound sales inquiry handling",
          "Prospect qualification and screening",
          "Buyer requirement capture",
          "Demo and call scheduling",
          "Handoff notes to closers",
        ],
        href: "/services/inbound-sales",
      },
      {
        id: "outbound-sales",
        slug: "outbound-sales",
        category: "customer-sales",
        title: "Outbound Sales",
        shortDescription:
          "Make outbound calls and messages to prospects, present your offer and book qualified sales conversations.",
        description:
          "Outbound representatives work from the contact lists and campaign criteria you provide. They reach decision makers, introduce your offer, handle initial objections and capture interest against defined qualification rules. Responses are logged in your systems, interested prospects are booked into your calendar and complete call notes are passed to your sales team for follow up.",
        features: [
          "Outbound campaign calling support",
          "Decision maker outreach calls",
          "Handling of initial objections",
          "Interest and response logging",
          "Booking qualified sales conversations",
        ],
        href: "/services/outbound-sales",
      },
      {
        id: "lead-generation-appointment-setting",
        slug: "lead-generation-appointment-setting",
        category: "customer-sales",
        title: "Lead Generation & Appointment Setting",
        shortDescription:
          "Research target accounts, build contact lists and set appointments for your sales representatives.",
        description:
          "This team builds contact lists from the targeting criteria you define, verifies contact details and reaches out by phone and email to test interest. Prospects who match your qualification criteria are booked directly into your representatives' calendars with background notes attached. The full activity record stays in your systems so your marketing and sales teams can see every touch.",
        features: [
          "Target account list building",
          "Contact detail verification checks",
          "Phone and email outreach",
          "Qualification against defined criteria",
          "Appointment booking and confirmation",
        ],
        href: "/services/lead-generation-appointment-setting",
      },
      {
        id: "data-processing-data-mining",
        slug: "data-processing-data-mining",
        category: "back-office",
        title: "Data Processing & Data Mining",
        shortDescription:
          "Collect, clean, structure and analyze large data sets so your teams can work with reliable information.",
        description:
          "We take data from forms, documents, systems and source files, then standardize it into the structure your operations require. Work includes data entry, deduplication, validation against reference rules, classification and extraction of fields from unstructured records. Where analysis is needed, we identify patterns, group records and produce summary tables your teams can review and reuse.",
        features: [
          "Data entry and capture",
          "Data cleansing and deduplication",
          "Validation against reference rules",
          "Field extraction from documents",
          "Pattern analysis and grouping",
        ],
        href: "/services/data-processing-data-mining",
      },
      {
        id: "account-reconciliation",
        slug: "account-reconciliation",
        category: "back-office",
        title: "Account Reconciliation",
        shortDescription:
          "Match balances across bank statements, ledgers and internal records, and document items that need review.",
        description:
          "Reconciliation staff compare transactions in your ledgers against bank statements, payment records and supporting documentation to confirm they agree. Matching rules, tolerances and escalation paths are set with your finance team. Unmatched or disputed items are listed with a clear reason and supporting evidence, then routed to the right owner for resolution and follow up.",
        features: [
          "Transaction matching and comparison",
          "Ledger and statement reconciliation",
          "Exception item identification",
          "Discrepancy documentation and routing",
          "Reconciliation status reporting",
        ],
        href: "/services/account-reconciliation",
      },
      {
        id: "debt-collections",
        slug: "debt-collections",
        category: "back-office",
        title: "Debt Collections",
        shortDescription:
          "Work outstanding receivables through structured outreach, payment arrangements and accurate account records.",
        description:
          "Our collections team works the accounts you assign, following the contact strategy, tone and regulatory boundaries you set. Activity includes contacting debtors, confirming balances, negotiating payment plans within approved limits and confirming arrangements in writing. Every contact, promise and payment is recorded in your systems, and accounts are escalated or referred as your policy directs.",
        features: [
          "Assigned account outreach",
          "Balance confirmation with debtors",
          "Payment plan negotiation",
          "Contact and promise logging",
          "Escalation per account policy",
        ],
        href: "/services/debt-collections",
      },
      {
        id: "payroll-processing",
        slug: "payroll-processing",
        category: "back-office",
        title: "Payroll Processing",
        shortDescription:
          "Compile timesheet and pay data, calculate earnings and deductions, and prepare payroll for your review.",
        description:
          "Payroll staff collect timesheets, leave records and pay changes from your managers, validate them against your pay rules and calculate gross pay, deductions and net pay. Inputs, adjustments and approvals are tracked in your systems, and payroll registers are prepared for your finance team to review and release. Queries from employees are logged, answered and closed out.",
        features: [
          "Timesheet and leave collection",
          "Pay rule validation checks",
          "Earnings and deduction calculation",
          "Payroll register preparation",
          "Employee query logging",
        ],
        href: "/services/payroll-processing",
      },
      {
        id: "vendor-management",
        slug: "vendor-management",
        category: "back-office",
        title: "Vendor Management",
        shortDescription:
          "Coordinate vendor onboarding, purchase records, invoice checks and performance tracking across your supplier base.",
        description:
          "We maintain the vendor lifecycle in your systems, from onboarding documents and contact details through purchase orders, invoices and contract dates. Invoices are checked against orders and receipts before being passed to finance, discrepancies are raised with the supplier and responses are tracked. Vendor records, scorecards and renewal dates are kept current for your procurement team.",
        features: [
          "Vendor onboarding documentation",
          "Purchase order record keeping",
          "Invoice matching and checks",
          "Supplier discrepancy follow up",
          "Vendor scorecard maintenance",
        ],
        href: "/services/vendor-management",
      },
      {
        id: "talent-acquisition",
        slug: "talent-acquisition",
        category: "talent-hr",
        title: "Talent Acquisition",
        shortDescription:
          "Source, screen and coordinate candidates through your hiring process up to the point of offer.",
        description:
          "Our recruiters work from your role profiles and screening criteria. They source candidates, review applications, run first-round interviews and build shortlists with background notes for your hiring managers. Interview scheduling, feedback collection and candidate communication are coordinated by the team, and every stage is tracked in your systems so recruiters and managers see the same status.",
        features: [
          "Candidate sourcing and outreach",
          "Application screening and review",
          "First round interview coordination",
          "Shortlist building with notes",
          "Interview scheduling and feedback",
        ],
        href: "/services/talent-acquisition",
      },
      {
        id: "training-development",
        slug: "training-development",
        category: "talent-hr",
        title: "Training & Development",
        shortDescription:
          "Build training plans, prepare materials and run sessions that build the skills your teams need.",
        description:
          "We assess skill requirements with your managers, structure a training plan for each role and prepare the supporting material. Sessions are delivered by trained staff using your content and procedures, with exercises and knowledge checks included. Attendance, completion and assessment records are maintained in your systems, and materials are revised as your processes or products change.",
        features: [
          "Role based skill assessment",
          "Structured training plan design",
          "Session delivery and facilitation",
          "Knowledge checks and exercises",
          "Completion record maintenance",
        ],
        href: "/services/training-development",
      },
      {
        id: "hr-support-employee-engagement",
        slug: "hr-support-employee-engagement",
        category: "talent-hr",
        title: "HR Support & Employee Engagement",
        shortDescription:
          "Handle day-to-day HR administration and run engagement activity that supports your employee experience program.",
        description:
          "HR support staff manage employee records, onboarding paperwork, leave and benefit queries and policy questions, answering from your documented policies. They also run engagement activity such as surveys, pulse checks, recognition programs and internal communications, then compile responses into summaries for your HR leads. All interactions are logged in your systems and routed to your people managers where needed.",
        features: [
          "Employee record administration",
          "Onboarding paperwork handling",
          "Leave and benefit queries",
          "Engagement survey administration",
          "Recognition program coordination",
        ],
        href: "/services/hr-support-employee-engagement",
      },
    ],
    linkLabel: "View scope",
    detail: {
      features: {
        eyebrow: "What we handle",
        title: "Functions in scope for this service",
        subtitle:
          "The day-to-day work the team owns once the process is documented and handed over.",
      },
      related: {
        eyebrow: "Same category",
        title: "Services that pair with this one",
        subtitle:
          "Most engagements combine two or more functions from the same category into one managed team.",
      },
      cta: { label: "Discuss your operation", href: "/contact" },
      engagementLabel: "Engagement model",
    },
  },

  /* ==========================================================================
     PROCESS — how an engagement runs (home section + /how-we-work)
     ========================================================================== */
  process: {
    heading: {
      eyebrow: "How we work",
      title: "An engagement that is scoped, documented and managed",
      highlight: "scoped, documented and managed",
      subtitle:
        "The same sequence applies whether you need one function covered or an entire operation run on your behalf.",
    },
    intro:
      "No process is handed to a team before it is written down, and no team runs without a named manager accountable for it.",
    steps: [
      {
        index: "01",
        title: "Scope & discovery",
        description:
          "We review the process, volume, systems and coverage you need, then agree the scope, team shape and hours in writing.",
      },
      {
        index: "02",
        title: "Team formation & knowledge transfer",
        description:
          "The team is assigned and trained on your process, systems and quality bar, and works supervised until the standard is met.",
      },
      {
        index: "03",
        title: "Execution",
        description:
          "Work runs in your systems against documented procedures, with a named operations manager accountable for the day-to-day.",
      },
      {
        index: "04",
        title: "Quality & escalation",
        description:
          "Output is checked against agreed criteria and exceptions follow a defined escalation path, so issues surface early.",
      },
      {
        index: "05",
        title: "Review & improvement",
        description:
          "We review volumes, quality and process friction with you, then update procedures, training and staffing as requirements change.",
      },
    ],
    note: "Reporting and review cadence, escalation contacts and quality criteria are agreed with you during scoping — not assumed.",
    cta: { label: "See the full operating model", href: "/how-we-work" },
  },

  /* ==========================================================================
     COVERAGE — the weekly coverage diagram (home hero + /how-we-work)
     ========================================================================== */
  coverage: {
    heading: {
      eyebrow: "Coverage",
      title: "Hours that match the operation",
      highlight: "match the operation",
      subtitle:
        "Standard engagements run a fixed daily window. Where the operation needs continuous coverage, 24/7 capability can be scoped.",
    },
    columns: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    bands: [
      {
        id: "standard",
        label: "Standard engagement",
        value: "9 hrs / day",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
      {
        id: "extended",
        label: "Extended coverage",
        value: "24/7 capability",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        highlighted: true,
      },
    ],
    footnote:
      "Process IQ Tech can provide 24/7 customer-support and operations capability where the operation requires it. Coverage beyond the standard window is scoped and confirmed as part of the engagement.",
  },

  /* ==========================================================================
     TECHNOLOGY — platforms the teams work in (text names only, no logos)
     ========================================================================== */
  technology: {
    heading: {
      eyebrow: "Technology-enabled operations",
      title: "We work in the platforms your function already runs",
      highlight: "already runs",
      subtitle:
        "Or we help stand up the stack the process needs — the operational capability is the team and the process, not the tool.",
    },
    intro:
      "Teams are trained on the systems relevant to the process before they touch live work, and follow the procedures you already use.",
    groups: [
      {
        id: "engagement",
        label: "Customer engagement",
        platforms: ["Zendesk", "Twilio VOIP", "Five9 dialers"],
      },
      {
        id: "crm",
        label: "CRM & operations",
        platforms: ["Salesforce CRM", "Zoho"],
      },
    ],
    footnote:
      "Zendesk, Zoho, Salesforce, Twilio and Five9 are trademarks of their respective owners. Their mention describes operational platforms that Process IQ Tech teams work in and does not imply partnership, sponsorship or endorsement.",
  },

  /* ==========================================================================
     ENGAGEMENT — the commercial model (home band + /engagement)
     ========================================================================== */
  engagement: {
    heading: {
      eyebrow: "Engagement model",
      title: "One structure, published in full",
      highlight: "published in full",
      subtitle:
        "Dedicated employees, priced per employee per month, with the costs that usually sit outside a rate card included.",
    },
    intro:
      "Most outsourcing relationships hide their commercial structure until the third call. Ours is here in full, so you can decide whether it fits before you speak to anyone.",
    summary: [
      {
        label: "Rate",
        value: "$1,800",
        note: "per employee / month",
      },
      {
        label: "Minimum team",
        value: "5 employees",
        note: "start and scale from there",
      },
      {
        label: "Standard coverage",
        value: "9 hrs / day",
        note: "5 days per week",
      },
      {
        label: "Included in the rate",
        value: "All-in cost",
        note: "expenses, payroll, taxes and related costs",
      },
    ],
    terms: [
      {
        label: "Rate",
        value: "$1,800 per employee / month",
        note: "The standard structure for a dedicated employee on a standard engagement.",
      },
      {
        label: "Minimum team",
        value: "5 employees",
        note: "Engagements start with a team of five and can be scaled from there.",
      },
      {
        label: "Standard hours",
        value: "9 hours per day, 5 days per week",
        note: "The daily window and weekly schedule are confirmed during scoping.",
      },
      {
        label: "24/7 capability",
        value: "Available as scoped coverage",
        note: "Continuous customer-support and operations coverage can be arranged where required.",
      },
      {
        label: "Included in the rate",
        value: "Expenses, payroll, taxes and related costs",
        note: "The per-employee rate is all-in, so your finance team sees one figure.",
      },
      {
        label: "Payment schedule",
        value: "50% advance to start, then in advance every Friday",
        note: "Subsequent payments are made in advance on Fridays for the week ahead.",
      },
      {
        label: "Final pricing",
        value: "Confirmed in the proposal",
        note: "Final pricing varies depending on scope and required hours.",
      },
    ],
    included: {
      heading: {
        eyebrow: "What the rate covers",
        title: "One figure, no pass-through costs",
        subtitle:
          "The per-employee rate is designed to be the number your finance team approves and then stops thinking about.",
      },
      items: [
        "Employee payroll",
        "Taxes and statutory contributions",
        "Operating expenses for the assigned employee",
        "Day-to-day management of the team",
        "Process documentation and procedure maintenance",
        "Quality checks and escalation handling",
      ],
      note: "Anything outside the agreed scope — additional hours, extended coverage or added functions — is priced before it starts.",
    },
    payment: {
      heading: {
        eyebrow: "Payment schedule",
        title: "How payments run",
        subtitle: "Straightforward, predictable, and agreed before the team starts.",
      },
      steps: [
        {
          index: "01",
          title: "50% advance to start",
          description:
            "Half of the first period is paid in advance. Team formation and knowledge transfer begin once it is received.",
        },
        {
          index: "02",
          title: "Advance payment every Friday",
          description:
            "Subsequent payments are made in advance each Friday, keeping the schedule simple to reconcile.",
        },
        {
          index: "03",
          title: "Scale when you need to",
          description:
            "Team size can be increased as the operation grows; the change is confirmed with you before it takes effect.",
        },
      ],
      note: "Final terms are set out in the proposal and confirmed in the engagement agreement.",
    },
    variables: {
      heading: {
        eyebrow: "What changes the number",
        title: "Final pricing varies with scope and hours",
        subtitle:
          "The published rate is the structure. Three things move the final figure, and all three are agreed with you in advance.",
      },
      items: [
        "Functions in scope — a single process or several functions in one team",
        "Required hours — the daily window, days covered and any extended coverage",
        "Team composition — mix of roles, experience level and supervision required",
      ],
      note: "Nothing is added to the invoice that was not agreed in the proposal first.",
    },
    caveat:
      "Final pricing varies depending on scope and required hours. The terms above describe the standard structure and are confirmed in the proposal for your engagement.",
    cta: { label: "Discuss your operation", href: "/contact" },
  },

  /* ==========================================================================
     ABOUT — philosophy and management experience (/about)
     ========================================================================== */
  about: {
    heading: {
      eyebrow: "About Process IQ Tech",
      title: "An operations partner, not a staffing line item",
      highlight: "operations partner",
      subtitle:
        "We define and improve the process first, then run it with a dedicated team, experienced management and the technology your function already uses.",
    },
    story: {
      heading: {
        eyebrow: "What we do",
        title: "Process first, people second, technology throughout",
        highlight: "Process first",
        subtitle:
          "Headcount alone does not make an operation work. A process that is mapped, documented, measured and managed does.",
      },
      paragraphs: [
        "Process IQ Tech provides business process management, management and operations support, advisory and process improvement, customer-facing operations and back-office functions as managed services. Clients come to us with a function that needs to run reliably — customer support, sales activity, reconciliation, collections, payroll, hiring or HR administration — and a process that is either undocumented or stretched thin.",
        "We start by writing the process down: the steps, the systems, the handoffs, the exceptions and the quality bar. Only then do we form the team that runs it, train them against that documentation and put a named manager accountable for the day-to-day. The result is an operation you can inspect, not a group of people you have to supervise.",
        "Engagements are structured and priced openly: dedicated employees, a per-employee monthly rate, a five-employee minimum, and coverage that is agreed up front rather than assumed. The management team brings 15+ years of management experience to every engagement.",
      ],
    },
    experience: {
      heading: {
        eyebrow: "Management experience",
        title: "Led by people who have run operations before",
        highlight: "run operations",
        subtitle:
          "The difference between an outsourced function that settles and one that drifts is management — and management is where we start.",
      },
      statement: "15+ years of management experience",
      paragraphs: [
        "The management team behind Process IQ Tech brings more than fifteen years of management experience across operations, process and people leadership. That experience shapes how engagements are scoped, how teams are supervised and how issues are escalated.",
        "It is experience of managing work, not a company age or a track record claim: every engagement still has to earn its result in your operation, on your process, against the criteria we agree together.",
      ],
      principles: {
        heading: {
          eyebrow: "Operating principles",
          title: "How we decide what good looks like",
          subtitle:
            "Five principles that shape every engagement, from the first scoping call to the weekly review.",
        },
        items: [
          {
            id: "process-before-headcount",
            title: "Process before headcount",
            description:
              "We map, document and agree the process before the team runs it. Adding people to an undefined process only scales the ambiguity.",
          },
          {
            id: "reliable-execution",
            title: "Reliable execution",
            description:
              "Consistency beats heroics. Procedures, supervision and defined escalation paths keep output steady when volume or people change.",
          },
          {
            id: "measurable-discipline",
            title: "Measurable discipline",
            description:
              "Work is tracked against the criteria we agree with you — volume, accuracy, exceptions and cycle points — so performance is discussed with evidence.",
          },
          {
            id: "technology-enabled",
            title: "Technology-enabled operations",
            description:
              "The team works inside your systems and follows your procedures, so the operation stays visible to you and does not become a black box.",
          },
          {
            id: "flexible-support",
            title: "Flexible, managed support",
            description:
              "Teams start at five employees and scale with the operation, including extended and 24/7 coverage where the process requires it.",
          },
        ],
      },
      cta: { label: "Discuss your operation", href: "/contact" },
    },
    approach: {
      heading: {
        eyebrow: "How we engage",
        title: "Structure you can plan around",
        subtitle:
          "Four decisions we make with you before a single employee starts work.",
      },
      items: [
        {
          title: "Scope before start",
          description:
            "Functions, systems, hours, coverage and team shape are agreed in writing during scoping, so the engagement starts on defined terms.",
        },
        {
          title: "Managed, not just staffed",
          description:
            "Every team has a named operations manager who owns quality, escalation and reporting — you are not left supervising suppliers.",
        },
        {
          title: "Your systems, your standards",
          description:
            "Work runs in the platforms you already use, following your procedures, with documentation kept current as the process changes.",
        },
        {
          title: "Priced in the open",
          description:
            "One per-employee rate with payroll, taxes and expenses included, a five-employee minimum and a published payment schedule.",
        },
      ],
    },
    cta: { label: "See how we work", href: "/how-we-work" },
  },

  /* ==========================================================================
     FAQ — questions asked before every engagement
     ========================================================================== */
  faq: {
    heading: {
      eyebrow: "FAQ",
      title: "The questions we answer before an engagement starts",
      subtitle:
        "If yours is not here, put it in the enquiry form and we will answer it directly.",
    },
    items: [
      {
        id: "faq-minimum",
        category: "Engagement",
        question: "What is the minimum team size?",
        answer:
          "Engagements start with a minimum of 5 employees. From there the team can be scaled up as the operation grows, and the change is confirmed with you before it takes effect.",
      },
      {
        id: "faq-rate",
        category: "Engagement",
        question: "What does the per-employee rate include?",
        answer:
          "$1,800 per employee per month covers expenses, payroll, taxes and related costs, plus the day-to-day management of the team. It is structured as an all-in figure so there are no pass-through costs to reconcile afterwards.",
      },
      {
        id: "faq-final-price",
        category: "Engagement",
        question: "Is $1,800 the final price?",
        answer:
          "It is the standard structure, not a binding quote. Final pricing varies depending on scope and required hours — which functions are in scope, the daily window and days covered, and the team composition required. All of that is confirmed with you in the proposal before anything starts.",
      },
      {
        id: "faq-hours",
        category: "Coverage",
        question: "What hours does a standard engagement cover?",
        answer:
          "Standard engagements operate 9 hours per day, 5 days per week. The specific daily window and days are confirmed during scoping so they line up with the operation you need covered.",
      },
      {
        id: "faq-247",
        category: "Coverage",
        question: "Can you provide 24/7 coverage?",
        answer:
          "Yes — Process IQ Tech can provide 24/7 customer-support and operations capability where the operation requires it. Continuous coverage is scoped separately from the standard engagement because it changes shift structure and team size.",
      },
      {
        id: "faq-payment",
        category: "Engagement",
        question: "How do payments work?",
        answer:
          "50% is paid in advance to start. Subsequent payments are made in advance every Friday. The schedule is set out in the proposal and confirmed in the engagement agreement.",
      },
      {
        id: "faq-systems",
        category: "Operations",
        question: "Which systems can your teams work in?",
        answer:
          "Our teams work in platforms including Zendesk, Zoho, Salesforce CRM, Twilio VOIP and Five9 dialers, and regularly work inside a client's own stack. Naming these platforms describes operational capability only — it does not imply partnership, sponsorship or endorsement by those vendors.",
      },
      {
        id: "faq-start",
        category: "Operations",
        question: "How does an engagement start?",
        answer:
          "You describe the function, systems and hours you need covered. We scope it with you, confirm team shape and pricing in a proposal, then run team formation and knowledge transfer before the team starts supervised execution. The full sequence is set out under How we work.",
      },
    ],
    contactNote: {
      label: "Still deciding whether this fits your operation?",
      cta: { label: "Discuss your operation", href: "/contact" },
    },
  },

  /* ==========================================================================
     CTA — the full-width band before the footer
     ========================================================================== */
  cta: {
    eyebrow: "Start here",
    title: "Bring us the process that is not running the way it should",
    highlight: "not running",
    description:
      "Tell us what the function is, how many people you need and the hours involved. You will get a scoped engagement model with team shape, coverage and pricing — not a generic rate card.",
    primaryCta: { label: "Discuss your operation", href: "/contact" },
    secondaryCta: { label: "View engagement model", href: "/engagement" },
    bullets: [
      "Teams from 5 employees",
      "9 hrs / day, 5 days / week standard",
      "24/7 capability available",
    ],
  },

  /* ==========================================================================
     FOOTER — description, copyright
     ========================================================================== */
  footer: {
    description:
      "Process IQ Tech runs business processes and operations functions for organizations that need reliable execution — defined process, managed teams and coverage agreed up front.",
    // Placeholders: {year} becomes the current year, {name} becomes company.name
    copyright: "© {year} {name}. All rights reserved.",
  },

  /* ==========================================================================
     FEATURES — turn sections on or off
     true  = the section is rendered
     false = the section is completely hidden
     ========================================================================== */
  features: {
    header: true,
    hero: true,
    capabilities: true,
    process: true,
    technology: true,
    experience: true,
    engagement: true,
    faq: true,
    cta: true,
    footer: true,
  },
};

export default siteConfig;
