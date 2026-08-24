# ARQON

Single-page funnel site for ARQON — a product engineering practice (payments, integrations, analytics, products).

Russian locale, dark theme, static generation, self-hosted in Docker behind Caddy.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.3 (App Router, Turbopack) |
| UI | React 19.2, Tailwind CSS 4.3 |
| Animation | CSS scroll-driven animations, no libraries |
| Forms | react-hook-form 7.84 + custom validation |
| Fonts | Geist Sans / Geist Mono |
| Icons | lucide-react |
| Lead delivery | Telegram Bot API, copy via Resend |
| Hosting | Docker + Caddy on your own VPS |

All versions are pinned exactly, without ranges: upgrading is a deliberate action, not a side effect of `npm install`.

## Local setup

```bash
npm ci
cp .env.example .env    # fill in TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
npm run dev
```

Checks before commit:

```bash
npm run typecheck
npm run lint
npm run build
```

`standalone` output is enabled only by `DOCKER_BUILD=1` — set by the Dockerfile. Locally this matters: always-on `output: standalone` breaks `next start` and leaves `.next` artifacts incompatible with `next dev`. To test the image locally, use `npm run build:standalone`.

If `next dev` suddenly complains that it cannot find `app` or `pages`, the cause is almost always incompatible `.next` contents — delete the directory: `rm -rf .next && npm run dev`.

## Structure

```
src/
  app/                 routes, metadata, robots, sitemap, OG image
    actions/contact.ts  server action: lead intake and delivery
  assets/              portrait (processed by next/image at build)
  components/
    layout/            header, footer
    sections/          seven page sections
    shared/            Reveal, analytics, scroll tracking
    ui/                Container, Section, Button
  content/
    ru.ts              all page copy
    types.ts           dictionary type
  lib/                 site, form schema, rate limiter, delivery, JSON-LD
```

No copy in JSX: all content lives in `src/content/ru.ts` and is typed via `Content`.
Adding an English locale is a second dictionary file plus `next-intl`; components do not need to change.

## Replace before launch

The list is duplicated in code: `pendingRealData` in `src/lib/site.ts`.

- `site.person.fullName` — surname
- `site.contacts.telegram` / `telegramHandle` — real username
- `site.contacts.email` — working address on the domain
- `site.contacts.github` / `linkedin` — real profiles
- `content.cases[0].result` — payment contour numbers
- `content.formats.note` — minimum project budget, if you choose to show it

`Caddyfile` and `.env.example` contain `arqon.by` and `admin@arqon.by` — no need to change them if the domain stays the same.

## Contact form

One server action, no separate backend:

1. Validation via `validateContact` from `src/lib/contact-rules.ts` — the same on client and server, so rules never diverge. The server call is the only one you can trust: it accepts `unknown` and does not trust the form’s data shape. No schema library: rules are simple and enumerable, and `zod` would weigh more than most of the rest of the client code.
2. Honeypot field `company` and minimum fill time check (2.5 s). Bots get a “success” response so we do not reveal which check filtered them.
3. Rate limit: 3 submissions per IP per 10 minutes. The counter lives in process memory — correct for a single instance. Scaling to replicas will need external storage.
4. Telegram delivery is required: failure means an error for the user. Email copy is sent when possible and does not affect the result.

IP is taken from `CF-Connecting-IP`, then `X-Real-IP`, then `X-Forwarded-For` — works behind Cloudflare and directly behind Caddy.

## Deployment

### First time on the server

```bash
# on VPS
mkdir -p /srv/arqon && cd /srv/arqon
# copy docker-compose.yml, Caddyfile, and a filled .env
docker login ghcr.io -u <github-user>
docker compose up -d
```

Caddy will obtain and renew the Let's Encrypt certificate. DNS for `arqon.by` and `www.arqon.by` must point to the server IP **before** the first start.

If Cloudflare sits in front: obtain the certificate with proxying disabled (grey cloud), then enable proxying and TLS mode “Full (strict)”. Otherwise the ACME check may not reach the origin.

### Ongoing

Push to `main` → CI (`typecheck`, `lint`, `build`) → image build in GHCR → container update over SSH.

Repository secrets: `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, `SSH_KNOWN_HOSTS`.
Repository variables (optional): `NEXT_PUBLIC_ANALYTICS_SRC`, `NEXT_PUBLIC_ANALYTICS_ID`.

Rollback by commit tag:

```bash
IMAGE=ghcr.io/<owner>/arqon:<sha> docker compose up -d --no-deps web
```

## Security

Headers are set in `next.config.ts` so they survive hosting moves: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`.

Deliberate CSP compromise: `script-src` includes `'unsafe-inline'`. Nonces require middleware, and middleware turns the page into dynamic rendering and removes static generation. The site has no user input in markup and no third-party scripts, so the cost of nonces outweighs the benefit. Everything else is strict: `default-src 'self'`, `object-src 'none'`, `base-uri 'none'`, `form-action 'self'`.

The analytics domain is added to `script-src` and `connect-src` automatically from `NEXT_PUBLIC_ANALYTICS_SRC`.

## SEO

- Metadata API: title, description, canonical, OpenGraph, Twitter card, keywords
- JSON-LD: `Person`, `ProfessionalService`, `FAQPage`, linked via `@id`
- `robots.txt` and `sitemap.xml` generated by routes; AI crawlers allowed explicitly
- OG image and favicon generated via `next/og`, no binary assets in the repo

After launch: add the site to Google Search Console and Yandex Webmaster, set region in both. Local queries in Belarus are the main realistic organic growth vector.

## Accessibility

Text contrast at AA: `fg` and `fg-muted` pass on `bg`; `fg-subtle` is used only for labels from 13px up. Keyboard navigation, visible `focus-visible`, semantic landmarks, `aria-invalid` and linked error messages in the form, full animation disable under `prefers-reduced-motion`.

FAQ uses native `details`/`summary` — working keyboard semantics without JavaScript.

## Performance

Measured on production build, all gzip:

| Resource | Size |
|---|---|
| Home HTML | 27 KB |
| JS total | 208 KB |
| of which app code | 18 KB |
| of which React + Next.js | 190 KB |

190 KB is the full App Router with React 19, and it does not shrink without changing frameworks. What matters is that all content is served as ready HTML: JS loads asynchronously and does not affect LCP.

Animations cost zero bytes of JavaScript. The first screen uses CSS keyframes; blocks below use `animation-timeline: view()` under `@supports`. Where scroll-driven animations are unsupported, content is visible immediately, so the page does not depend on script execution.

Three client components: the form, link wrappers with click tracking, and scroll depth counter. All routes are prerendered statically, including OG image and favicon.
