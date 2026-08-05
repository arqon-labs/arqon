export const site = {
  name: "ARQON",
  tagline: "Product Engineering",
  domain: "arqon.by",
  url: "https://arqon.by",
  locale: "ru_BY",
  lang: "ru",
  city: "Минск",
  region: "Беларусь",
  countryCode: "BY",
  person: {
    firstName: "Антон",
    fullName: "Антон Иванов",
    role: "Разработчик сайтов и сервисов",
    since: 2017,
  },
  contacts: {
    telegram: "https://t.me/arqon_dev",
    telegramHandle: "@arqon_dev",
    email: "hello@arqon.by",
    github: "https://github.com/arqon-labs",
    linkedin: "https://www.linkedin.com/in/arqon",
  },
} as const;

/**
 * Values that must be replaced with real data before publication.
 * Each item is a key from `site` or content, not an abstract reminder.
 */
export const pendingRealData = [
  "site.person.fullName — surname",
  "site.contacts.telegram / telegramHandle — real username",
  "site.contacts.email — working address on the domain",
  "site.contacts.github / linkedin — real profiles",
  "content.cases[0].result — payment contour numbers",
  "content.formats.note — minimum project budget",
  "public/portrait.png — permanent portrait instead of placeholder",
] as const;
