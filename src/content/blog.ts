export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  lang: "en" | "ru";
  body: BlogBlock[];
};

export const blog = {
  path: "/blog",
  eyebrow: "Blog",
  indexTitle: "Security notes for AI-built apps",
  indexDescription:
    "Checklists and notes on shipping apps built with Cursor, Lovable, Bolt and Replit — without leaking keys or burning the cloud bill.",
  indexH1: "Notes on AI-built apps",
  indexLead:
    "Practical checks before you launch. Full articles land here; this is the first one.",
  moreLabel: "Read",
  breadcrumbHome: "Home",
  items: [
    {
      slug: "vibe-code-audit-checklist",
      title: "Vibe Code Security Checklist: 10 things to check before your launch",
      description:
        "RLS, webhook signatures, env keys, rate limits and error handling — the ten checks that catch most holes in Cursor, Lovable, Bolt and Replit apps.",
      date: "2026-08-19",
      lang: "en" as const,
      body: [
        {
          type: "heading" as const,
          text: "Ship fast, then check these ten",
        },
        {
          type: "paragraph" as const,
          text: "AI-built apps usually work on the happy path. The holes show up in keys, payments, data access and the first failed request. Run this list against the repo before users or an investor do.",
        },
        {
          type: "heading" as const,
          text: "Access, keys and payments",
        },
        {
          type: "list" as const,
          items: [
            "Row-level security (RLS): every table that holds user data has policies; a logged-in user cannot read or write another user's rows.",
            "Webhook signatures: Stripe (and any other payment) webhooks verify the signature before you mark an order paid.",
            "Env keys: OpenAI, Stripe secret, Supabase service-role and similar keys never appear in client-side JavaScript or committed .env files.",
            "Authz on writes: every mutation checks who is allowed to do it — not only that someone is logged in.",
            "Idempotent payments: a double click or a replayed webhook cannot charge twice or mark a failed payment as succeeded.",
          ],
        },
        {
          type: "heading" as const,
          text: "Abuse, cost and failure",
        },
        {
          type: "list" as const,
          items: [
            "Rate limiting: login, signup, password reset and AI endpoints reject brute force and spam instead of staying wide open.",
            "Error handling: retries, timeouts and a user-visible failure path — the first failed API call must not become a 500.",
            "Query cost: no N+1 or O(n²) loops on list pages; what is cheap at 10 users should not be a $4,000 cloud bill at 10,000.",
            "Secrets rotation: leaked or committed keys are revoked, not just deleted from the repo.",
            "Read-only sanity check: if a stranger cloned the public client bundle, they still cannot dump your users table or spend your API budget.",
          ],
        },
      ],
    },
  ] satisfies BlogPost[],
};
