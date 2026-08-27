export type AuditFaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export type AuditContent = {
  lang: "en" | "ru";
  path: string;
  title: string;
  description: string;
  serviceName: string;
  ogAlt: string;
  breadcrumbLabel: string;
  breadcrumbs: { label: string; href?: string }[];
  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string;
  };
  findings: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  deliverables: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  how: {
    id: string;
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    amount: string;
    cadence: string;
    items: string[];
    note: string;
    cta: string;
  };
  fix: {
    eyebrow: string;
    title: string;
    body: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: AuditFaqItem[];
  };
  cta: {
    title: string;
    button: string;
  };
};

export const audit: AuditContent = {
  lang: "en",
  path: "/audit",
  title: "Vibe Code Security Audit — $500, 48-hour report",
  description:
    "I audit apps built with Cursor, Lovable, Bolt and Replit. Leaked keys, broken auth, payment holes, cloud bill traps. Fixed price, plain-English PDF report in 48 hours.",
  serviceName: "Vibe Code Security Audit",
  ogAlt: "Vibe Code Security Audit — $500, 48-hour report. ARQON.",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbs: [
    { label: "ARQON", href: "/" },
    { label: "Audit" },
  ],
  hero: {
    eyebrow: "Security audit for AI-built apps",
    h1: "Your vibe-coded app works. But is it safe?",
    lead:
      "You shipped fast with Cursor, Lovable, Bolt or Replit. Users are coming. But AI writes the happy path — and skips keys, payment checks and rate limits. I find what will break first, before your users or an investor does.",
    primaryCta: "Get the $500 audit",
    secondaryCta: "How it works",
    trust: "Fixed price · 48-hour report · no calls required · read-only access",
  },
  findings: {
    eyebrow: "What I usually find",
    title: "The same holes, in almost every AI-built app",
    items: [
      {
        title: "Leaked API keys",
        body: "OpenAI / Supabase service-role keys shipped in client-side JavaScript. Anyone can open DevTools and spend your money.",
      },
      {
        title: "Unsigned payment webhooks",
        body: "Stripe webhooks without signature verification. Anyone can POST \"payment succeeded\" to your app.",
      },
      {
        title: "Missing row-level security",
        body: "Supabase tables without RLS. One API call dumps your entire user table.",
      },
      {
        title: "Cloud bill traps",
        body: "N+1 queries and O(n²) loops that cost nothing at 10 users and $4,000/month at 10,000.",
      },
      {
        title: "No rate limiting",
        body: "Login and signup endpoints wide open to brute force and spam bots.",
      },
      {
        title: "Happy-path code",
        body: "No retries, no timeouts, no error handling. The first failed API call becomes a 500 for your user.",
      },
    ],
  },
  deliverables: {
    eyebrow: "What you get",
    title: "A report you can act on, not a scanner dump",
    items: [
      "A 10–15 page PDF in plain English — no security jargon, written for founders",
      "Every finding: what breaks, how likely, what it costs you, how to fix it",
      "Prioritized P0 / P1 / P2 — fix P0 this week, plan the rest",
      "A Loom video walkthrough of the critical findings",
    ],
  },
  how: {
    id: "how",
    eyebrow: "Process",
    title: "How it works",
    steps: [
      {
        title: "Send the repo",
        body: "Read-only GitHub invite or a zip. I never touch your code — the audit is read-only.",
      },
      {
        title: "48 hours",
        body: "I scan and manually verify every finding. No automated noise — if it's in the report, it's real.",
      },
      {
        title: "Fix or hand off",
        body: "Take the report to your developer — or hire me to close the critical issues in 3–5 days.",
      },
    ],
  },
  pricing: {
    eyebrow: "Price",
    title: "One price. No surprises.",
    amount: "$500",
    cadence: "fixed",
    items: [
      "Full codebase audit",
      "Plain-English PDF report",
      "Prioritized findings",
      "Loom walkthrough",
      "48-hour turnaround",
    ],
    note: "Not sure yet? Message me — I'll run a free mini-scan and send you 5 findings.",
    cta: "Start the audit",
  },
  fix: {
    eyebrow: "Then I fix it",
    title: "Found holes? I close them.",
    body: "Most clients ask me to fix what the audit finds. Critical issues closed in 3–5 days, $2,000–$5,000 depending on scope — quoted from the report, no hourly billing. Same person who found the problems fixes them.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions",
    items: [
      {
        question: "Do you need access to my production?",
        answer: "No. The repository is enough. I never ask for production credentials.",
      },
      {
        question: "Will you change my code?",
        answer:
          "No. The audit is read-only. Fixes are a separate engagement, with your approval.",
      },
      {
        question: "What stacks do you cover?",
        answer:
          "The vibe-code stack: Next.js, React, Node, Go, Supabase, Firebase, Stripe, Vercel. TypeScript/JavaScript.",
      },
      {
        question: "Who are you?",
        answer:
          "Anton Goncharik — developer since 2017. I build and repair web services for a living. See my main site for cases.",
        link: { href: "/", label: "See my main site for cases." },
      },
      {
        question: "Why not just run a scanner myself?",
        answer:
          "Scanners produce 200 findings, 180 of them noise. I verify each one manually and tell you which 5 will actually hurt you.",
      },
    ],
  },
  cta: {
    title: "Your app is one leaked key away from a bad week.",
    button: "Get the audit",
  },
};
