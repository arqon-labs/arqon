import { ru } from "@/content/ru";
import { site } from "./site";

const personId = `${site.url}/#person`;
const serviceId = `${site.url}/#service`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.person.fullName,
    givenName: site.person.firstName,
    jobTitle: site.person.role,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.countryCode,
    },
    sameAs: [site.contacts.github, site.contacts.linkedin],
    knowsAbout: [
      "Разработка сайтов",
      "Telegram боты",
      "Оплата на сайте",
      "Интеграции с 1С",
      "Личные кабинеты",
      "Next.js",
      "Go",
      "PostgreSQL",
    ],
    worksFor: { "@id": serviceId },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": serviceId,
    name: site.name,
    alternateName: `${site.name} ${site.tagline}`,
    url: site.url,
    description: ru.hero.lead,
    slogan: ru.hero.title,
    image: `${site.url}/opengraph-image`,
    email: site.contacts.email,
    founder: { "@id": personId },
    employee: { "@id": personId },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.countryCode,
    },
    areaServed: [
      { "@type": "Country", name: "Беларусь" },
      { "@type": "AdministrativeArea", name: "СНГ" },
    ],
    knowsLanguage: ["ru", "en"],
    sameAs: [site.contacts.github, site.contacts.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: ru.services.title,
      itemListElement: ru.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@id": serviceId },
        },
      })),
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ru.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
