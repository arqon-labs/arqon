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
    "I audit Cursor, Lovable, Bolt and Replit apps. Leaked keys, payment holes, cloud-bill traps. Fixed price, plain-English report in 48 hours.",
  serviceName: "Vibe Code Security Audit",
  ogAlt: "Vibe Code Security Audit — $500, 48-hour report. ARQON.",
  breadcrumbLabel: "Navigation",
  breadcrumbs: [
    { label: "ARQON", href: "/" },
    { label: "Audit" },
  ],
  hero: {
    eyebrow: "Security audit for AI-built apps",
    h1: "It works. Is it safe?",
    lead:
      "You shipped with Cursor, Lovable or Bolt. AI writes the happy path and skips keys, payments and rate limits. I find what breaks first.",
    primaryCta: "Get the $500 audit",
    secondaryCta: "How it works",
    trust: "Fixed price · 48 hours · no calls · read-only",
  },
  findings: {
    eyebrow: "What I usually find",
    title: "The same holes, almost every time",
    items: [
      {
        title: "Leaked API keys",
        body: "OpenAI or Supabase service-role keys in client JavaScript. DevTools, then your bill.",
      },
      {
        title: "Unsigned payment webhooks",
        body: "Anyone can POST “payment succeeded” and the app believes it.",
      },
      {
        title: "Missing row-level security",
        body: "One API call dumps the user table.",
      },
      {
        title: "Cloud bill traps",
        body: "Cheap at 10 users. Thousands a month at 10,000.",
      },
      {
        title: "No rate limiting",
        body: "Login and signup open to brute force and spam.",
      },
      {
        title: "Happy-path code",
        body: "The first failed API call is a 500 for your user.",
      },
    ],
  },
  deliverables: {
    eyebrow: "What you get",
    title: "A report you can act on",
    items: [
      "A 10–15 page PDF in plain English",
      "Every finding: what breaks, what it costs, how to fix it",
      "P0 / P1 / P2 — fix P0 this week",
      "A short video of the critical issues",
    ],
  },
  how: {
    id: "how",
    eyebrow: "Process",
    title: "How it works",
    steps: [
      {
        title: "Send the repo",
        body: "Read-only GitHub invite or a zip. I don’t change your code.",
      },
      {
        title: "48 hours",
        body: "Every finding is verified by hand. If it’s in the report, it’s real.",
      },
      {
        title: "Fix or hand off",
        body: "Give the report to your developer — or I close the critical issues in 3–5 days.",
      },
    ],
  },
  pricing: {
    eyebrow: "Price",
    title: "One price.",
    amount: "$500",
    cadence: "fixed",
    items: [
      "Full repo",
      "Plain-English PDF",
      "Prioritized findings",
      "Video walkthrough",
      "48 hours",
    ],
    note: "Not sure? Message me — I’ll send 5 findings free.",
    cta: "Start the audit",
  },
  fix: {
    eyebrow: "Then I fix it",
    title: "Found holes? I close them.",
    body: "Critical issues in 3–5 days, $2,000–$5,000 from the report. No hourly billing. Same person who found them.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions",
    items: [
      {
        question: "Do you need production access?",
        answer: "No. The repository is enough.",
      },
      {
        question: "Will you change my code?",
        answer: "No. Fixes are a separate job, with your approval.",
      },
      {
        question: "What stacks?",
        answer:
          "Next.js, React, Node, Go, Supabase, Firebase, Stripe, Vercel. TypeScript and JavaScript.",
      },
      {
        question: "Who are you?",
        answer: "Anton Goncharik. I build and repair web services. Cases are on the main site.",
        link: { href: "/", label: "Cases on the main site" },
      },
      {
        question: "Why not run a scanner?",
        answer: "Scanners dump 200 findings. 180 are noise. I tell you which 5 will hurt.",
      },
    ],
  },
  cta: {
    title: "One leaked key away from a bad week.",
    button: "Get the audit",
  },
};
