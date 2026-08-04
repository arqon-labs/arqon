# ARQON

Одностраничный сайт-воронка для ARQON — практики product engineering (платежи, интеграции, аналитика, продукты).

Русская локаль, тёмная тема, статическая генерация, самостоятельный хостинг в Docker за Caddy.

## Стек

| Слой | Решение |
|---|---|
| Фреймворк | Next.js 16.3 (App Router, Turbopack) |
| UI | React 19.2, Tailwind CSS 4.3 |
| Анимация | CSS scroll-driven animations, без библиотек |
| Формы | react-hook-form 7.84 + собственная валидация |
| Шрифты | Geist Sans / Geist Mono |
| Иконки | lucide-react |
| Доставка заявок | Telegram Bot API, копия через Resend |
| Хостинг | Docker + Caddy на своём VPS |

Все версии зафиксированы точно, без диапазонов: обновление — осознанное действие, а не побочный эффект `npm install`.

## Локальный запуск

```bash
npm ci
cp .env.example .env    # заполнить TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
npm run dev
```

Проверки перед коммитом:

```bash
npm run typecheck
npm run lint
npm run build
```

Сборка в режиме `standalone` включается только переменной `DOCKER_BUILD=1` — её выставляет Dockerfile. Локально это важно: постоянно включённый `output: standalone` ломает `next start` и оставляет в `.next` артефакты, несовместимые с `next dev`. Проверить образ локально можно через `npm run build:standalone`.

Если `next dev` внезапно жалуется, что не находит `app` или `pages`, дело почти всегда в несовместимом содержимом `.next` — достаточно удалить каталог: `rm -rf .next && npm run dev`.

## Структура

```
src/
  app/                 маршруты, метаданные, robots, sitemap, OG-картинка
    actions/contact.ts  server action: приём и доставка заявки
  assets/              портрет (обрабатывается next/image на сборке)
  components/
    layout/            хедер, футер
    sections/          семь секций страницы
    shared/            Reveal, аналитика, отслеживание скролла
    ui/                Container, Section, Button
  content/
    ru.ts              все тексты страницы
    types.ts           тип словаря
  lib/                 site, схема формы, лимитер, доставка, JSON-LD
```

Ни одной строки текста в JSX: весь контент лежит в `src/content/ru.ts` и типизирован через `Content`.
Добавление английской локали — это второй файл словаря плюс `next-intl`; менять компоненты не придётся.

## Что нужно заменить до публикации

Список продублирован в коде: `pendingRealData` в `src/lib/site.ts`.

- `site.person.fullName` — фамилия
- `site.contacts.telegram` / `telegramHandle` — реальный username
- `site.contacts.email` — рабочий адрес на домене
- `site.contacts.github` / `linkedin` — реальные профили
- `content.cases[0].result` — числа по платёжному контуру
- `content.formats.note` — минимальный бюджет проекта, если решишь показывать
- `src/assets/portrait.jpg` — постоянный портрет вместо текущей заглушки

Дальше — `Caddyfile` и `.env.example` содержат `arqon.by` и `admin@arqon.by`, их менять не нужно, если домен остаётся тем же.

## Форма заявки

Один server action, без отдельного бэкенда:

1. Валидация функцией `validateContact` из `src/lib/contact-rules.ts` — одна и та же на клиенте и на сервере, поэтому правила не расходятся. Серверный вызов единственный, которому можно верить: он принимает `unknown` и не доверяет форме структуру данных. Библиотека схем не используется: правила простые и перечислимые, а `zod` весил бы больше всего остального клиентского кода.
2. Honeypot-поле `company` и проверка минимального времени заполнения (2.5 с). Боту возвращается «успех», чтобы не подсказывать, какая проверка его отсекла.
3. Ограничение: 3 заявки с одного IP за 10 минут. Счётчик живёт в памяти процесса — это корректно при одном инстансе. При масштабировании на реплики понадобится внешнее хранилище.
4. Доставка в Telegram обязательна: её отказ означает ошибку для пользователя. Копия на почту отправляется по возможности и на результат не влияет.

IP берётся из `CF-Connecting-IP`, затем `X-Real-IP`, затем `X-Forwarded-For` — то есть работает и за Cloudflare, и напрямую за Caddy.

## Развёртывание

### Первый раз на сервере

```bash
# на VPS
mkdir -p /srv/arqon && cd /srv/arqon
# скопировать docker-compose.yml, Caddyfile и заполненный .env
docker login ghcr.io -u <github-user>
docker compose up -d
```

Caddy сам получит и будет продлевать сертификат Let's Encrypt. DNS-записи `arqon.by` и `www.arqon.by` должны указывать на IP сервера **до** первого запуска.

Если перед сервером стоит Cloudflare: получить сертификат при выключенном проксировании (серое облако), затем включить проксирование и режим TLS «Full (strict)». Иначе ACME-проверка может не дойти до origin.

### Дальше

Пуш в `main` → CI (`typecheck`, `lint`, `build`) → сборка образа в GHCR → обновление контейнера по SSH.

Секреты репозитория: `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, `SSH_KNOWN_HOSTS`.
Переменные репозитория (необязательные): `NEXT_PUBLIC_ANALYTICS_SRC`, `NEXT_PUBLIC_ANALYTICS_ID`.

Откат — тегом коммита:

```bash
IMAGE=ghcr.io/<owner>/arqon:<sha> docker compose up -d --no-deps web
```

## Безопасность

Заголовки задаются в `next.config.ts`, чтобы переезд между хостингами их не терял: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`.

Осознанный компромисс в CSP: `script-src` включает `'unsafe-inline'`. Нонсы требуют middleware, а middleware переводит страницу в динамический рендеринг и лишает статической генерации. На сайте нет пользовательского ввода в разметку и нет сторонних скриптов, поэтому цена нонсов выше выгоды. Всё остальное строгое: `default-src 'self'`, `object-src 'none'`, `base-uri 'none'`, `form-action 'self'`.

Домен аналитики добавляется в `script-src` и `connect-src` автоматически из `NEXT_PUBLIC_ANALYTICS_SRC`.

## SEO

- Metadata API: title, description, canonical, OpenGraph, Twitter card, ключевые слова
- JSON-LD: `Person`, `ProfessionalService`, `FAQPage`, связанные через `@id`
- `robots.txt` и `sitemap.xml` генерируются маршрутами; ИИ-краулеры разрешены явно
- OG-картинка и favicon генерируются через `next/og`, без бинарных файлов в репозитории

После публикации: добавить сайт в Google Search Console и Яндекс.Вебмастер, в обоих указать регион. Локальные запросы по Беларуси — основная реалистичная точка роста органики.

## Доступность

Контраст текста по AA: `fg` и `fg-muted` проходят на фоне `bg`; `fg-subtle` используется только для подписей от 13px. Навигация с клавиатуры, видимый `focus-visible`, семантические лендмарки, `aria-invalid` и связанные сообщения об ошибках в форме, полное отключение анимаций при `prefers-reduced-motion`.

FAQ построен на нативных `details`/`summary` — рабочая клавиатурная семантика без JavaScript.

## Производительность

Измерено на production-сборке, всё в gzip:

| Ресурс | Размер |
|---|---|
| HTML главной | 27 КБ |
| JS всего | 208 КБ |
| из них код приложения | 18 КБ |
| из них React + Next.js | 190 КБ |

190 КБ — это пол App Router с React 19, и он не сжимается без смены фреймворка. Важно, что весь контент отдаётся готовым HTML: JS грузится асинхронно и на LCP не влияет.

Анимации не стоят ни одного байта JavaScript. Первый экран использует CSS-ключевые кадры, блоки ниже — `animation-timeline: view()` под `@supports`. Там, где scroll-driven анимации не поддерживаются, контент просто виден сразу, поэтому страница не зависит от выполнения скрипта.

Клиентских компонентов три: форма, обёртки ссылок с отслеживанием кликов и счётчик глубины скролла. Все маршруты пререндерены статически, включая OG-картинку и favicon.
