export const site = {
  name: "ARQON",
  tagline: "Сайты и сервисы для бизнеса",
  domain: "arqon.by",
  url: "https://arqon.by",
  locale: "ru_BY",
  lang: "ru",
  city: "Минск",
  region: "Беларусь",
  countryCode: "BY",
  person: {
    firstName: "Антон",
    lastName: "Гончарик",
    displayName: "Антон Гончарик",
    fullName: "Антон Гончарик",
    fullNameEn: "Anton Goncharik",
    role: "Разработчик сайтов и сервисов",
    since: 2017,
  },
  geo: {
    latitude: 53.9023,
    longitude: 27.5619,
    regionCode: "BY-HM",
  },
  contacts: {
    telegram: "https://t.me/arqon_dev",
    telegramHandle: "@arqon_dev",
    email: "ant.goncharik@gmail.com",
    github: "https://github.com/antonGoncharik",
    linkedin: "https://www.linkedin.com/in/anton-golang",
  },
} as const;

/**
 * Values that must be replaced with real data before publication.
 * Each item is a key from `site` or content, not an abstract reminder.
 */
export const pendingRealData = [
  "site.contacts.telegram / telegramHandle — real username",
  "content.cases — publishable numbers; a third case if it exists",
  "content.formats.note — minimum project budget, if you choose to show it",
] as const;
