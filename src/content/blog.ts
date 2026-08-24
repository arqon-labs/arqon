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
  alternate?: { slug: string; lang: "en" | "ru" };
  body: BlogBlock[];
};

export const blog = {
  path: "/blog",
  indexTitle: "Блог: заметки про приложения, собранные ИИ",
  indexDescription:
    "Чеклисты запуска и утечки ключей в приложениях на Cursor, Lovable, Bolt и Replit. Тексты на русском и английском.",
  indexH1: "Заметки про приложения, собранные ИИ",
  indexLead:
    "Что проверить до пользователей и инвестора. Есть тексты на русском и английском.",
  ui: {
    ru: {
      home: "Главная",
      blog: "Блог",
      crumbs: "Навигация по разделам",
      more: "Читать",
      moreNotes: "Ещё заметки",
    },
    en: {
      home: "ARQON",
      blog: "Blog",
      crumbs: "Breadcrumb",
      more: "Read",
      moreNotes: "More notes",
    },
  },
  cta: {
    en: {
      title: "Want me to run this on your repo?",
      body: "Fixed-price audit, $500, plain-English report in 48 hours.",
      button: "Get the $500 audit",
    },
    ru: {
      title: "Нужно проверить ваш репозиторий?",
      body: "Фикс $500, отчёт простым языком за 2 дня.",
      button: "Заказать аудит",
    },
  },
  items: [
    {
      slug: "vibe-code-audit-checklist",
      title: "Vibe Code Security Checklist: 10 things to check before your launch",
      description:
        "RLS, webhook signatures, env keys, rate limits and error handling — the ten checks that catch most holes in Cursor, Lovable, Bolt and Replit apps.",
      date: "2026-08-19",
      lang: "en" as const,
      alternate: { slug: "ai-app-launch-checklist", lang: "ru" as const },
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
    {
      slug: "leaked-keys-in-vibe-coded-apps",
      title: "The leaked key I find in almost every vibe-coded app",
      description:
        "Service-role and OpenAI keys in the client bundle are the most common hole. How they get there, what an attacker does in 30 seconds, and how to check yours.",
      date: "2026-08-19",
      lang: "en" as const,
      body: [
        {
          type: "heading" as const,
          text: "It ships because the app “works”",
        },
        {
          type: "paragraph" as const,
          text: "Cursor, Lovable, Bolt and Replit will happily put a Supabase service-role key or an OpenAI secret into a file the browser downloads. The chat said the query works. The preview loaded. Nobody opened DevTools.",
        },
        {
          type: "paragraph" as const,
          text: "A service-role key bypasses row-level security. An OpenAI key spends your budget. Both are in the JavaScript bundle the moment you deploy.",
        },
        {
          type: "heading" as const,
          text: "Thirty seconds for an attacker",
        },
        {
          type: "list" as const,
          items: [
            "Open the site. Open DevTools → Network or Sources. Search for “service_role”, “sk-”, “supabase”.",
            "Copy the key. From a laptop, list every row in every table, or start a loop of paid API calls.",
            "You notice when the bill arrives, or when a user writes that their data is in someone else's account.",
          ],
        },
        {
          type: "heading" as const,
          text: "How to check before launch",
        },
        {
          type: "list" as const,
          items: [
            "Search the repo for NEXT_PUBLIC_, VITE_, and any key that is not prefixed as a server-only secret.",
            "Build the client bundle and grep the output. If the key is in the compiled JS, it is public.",
            "Keep the service-role key on the server only. The browser gets an anon key plus RLS policies that actually restrict rows.",
            "If a key ever landed in git or in a preview URL, rotate it. Deleting the line is not enough.",
          ],
        },
        {
          type: "paragraph" as const,
          text: "This is finding #1 on almost every audit I run. The rest of the report is usually payments, RLS and rate limits — but the leaked key is the one that ruins the week first.",
        },
      ],
    },
    {
      slug: "ai-app-launch-checklist",
      title: "Чеклист: 10 проверок перед запуском приложения, собранного ИИ",
      description:
        "RLS, подписи вебхуков, ключи в .env, лимиты запросов и ошибки — десять пунктов, которые закрывают большинство дыр в Cursor, Lovable, Bolt и Replit.",
      date: "2026-08-19",
      lang: "ru" as const,
      alternate: { slug: "vibe-code-audit-checklist", lang: "en" as const },
      body: [
        {
          type: "heading" as const,
          text: "Сначала запустить, потом проверить эти десять",
        },
        {
          type: "paragraph" as const,
          text: "Приложение с ИИ обычно работает по счастливому пути. Дыры — в ключах, оплате, доступе к данным и в первом сбое внешнего API. Пройдите список по репозиторию до того, как это сделают пользователи или инвестор.",
        },
        {
          type: "heading" as const,
          text: "Доступ, ключи и оплата",
        },
        {
          type: "list" as const,
          items: [
            "Защита строк (RLS): у каждой таблицы с пользовательскими данными есть политики; залогиненный человек не читает и не пишет чужие строки.",
            "Подпись вебхуков: Stripe и любая другая оплата проверяют подпись, прежде чем заказ станет «оплачен».",
            "Ключи окружения: OpenAI, секрет Stripe, service-role Supabase и похожие ключи не попадают в клиентский JavaScript и не коммитятся в .env.",
            "Права на запись: каждая мутация проверяет, кому можно — не только факт «кто-то залогинен».",
            "Идемпотентная оплата: двойной клик или повторный вебхук не списывают дважды и не помечают неуспешный платёж как успешный.",
          ],
        },
        {
          type: "heading" as const,
          text: "Злоупотребление, счёт и сбои",
        },
        {
          type: "list" as const,
          items: [
            "Лимит запросов: вход, регистрация, сброс пароля и эндпоинты ИИ не стоят открытыми для перебора и спама.",
            "Ошибки: повторы, таймауты и понятный отказ пользователю — первый сбой API не должен стать 500.",
            "Цена запросов: без N+1 и циклов O(n²) на списках; то, что дёшево на 10 пользователях, не должно стать счетом $4 000 на 10 000.",
            "Ротация секретов: утёкший или закоммиченный ключ отзывают, а не просто удаляют из репозитория.",
            "Проверка «как чужой»: если незнакомец скачал клиентский бандл, он всё ещё не может выгрузить таблицу пользователей и сжечь бюджет API.",
          ],
        },
      ],
    },
  ] satisfies BlogPost[],
};
