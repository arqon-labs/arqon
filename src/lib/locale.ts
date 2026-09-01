import { ru } from "@/content/ru";
import { site } from "./site";

export type Locale = "ru" | "en";

export const enChrome = {
  skip: "Skip to content",
  navAria: "Site",
  telegramAria: "Message on Telegram",
  homeAria: `${site.name} — home`,
  nav: [
    { label: "Studio", href: "/" },
    { label: "Audit", href: "/audit" },
  ],
  footer: {
    description: "Websites, dashboards, and bots. Independent developer.",
    person: site.person.fullNameEn,
    terms: "Small jobs — 50/50. Projects in stages. Receipt after payment.",
    servicesLabel: "Studio",
    linksLabel: "Links",
    location: "Minsk and remote",
  },
} as const;

export function localeFromPath(pathname: string): Locale {
  return pathname === "/audit" || pathname.startsWith("/audit/") ? "en" : "ru";
}

export function ruChrome() {
  return {
    skip: "Перейти к содержанию",
    navAria: "Разделы сайта",
    telegramAria: "Написать в Telegram",
    homeAria: `${site.name} — на главную`,
    nav: ru.nav,
    footer: {
      description: ru.footer.description,
      person: site.person.fullName,
      terms: ru.footer.terms,
      servicesLabel: ru.footer.servicesLabel,
      linksLabel: ru.footer.linksLabel,
      location: `${site.city} и удалённо`,
    },
  };
}
