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
    role: "Senior Fullstack Engineer",
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
 * Значения, которые обязаны быть заменены на реальные до публикации.
 * Каждый пункт — ключ из `site` или из контента, а не абстрактное напоминание.
 */
export const pendingRealData = [
  "site.person.fullName — фамилия",
  "site.contacts.telegram / telegramHandle — реальный username",
  "site.contacts.email — рабочий адрес на домене",
  "site.contacts.github / linkedin — реальные профили",
  "content.cases[0].result — числа по платёжному контуру",
  "content.formats.note — минимальный бюджет проекта",
  "public/portrait.png — постоянный портрет вместо заглушки",
] as const;
