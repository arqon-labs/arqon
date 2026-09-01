export const site = {
  name: "ARQON",
  tagline: "Сайты и сервисы",
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
    telegram: "https://t.me/antonGoncharik",
    telegramHandle: "@antonGoncharik",
    email: "ant.goncharik@gmail.com",
    github: "https://github.com/antonGoncharik",
    linkedin: "https://www.linkedin.com/in/anton-golang",
  },
} as const;

/**
 * Launch leftovers. Empty means identity, contacts and cases are filled.
 * Keep the export so a future placeholder cannot hide in copy unnoticed.
 */
export const pendingRealData = [] as const;
