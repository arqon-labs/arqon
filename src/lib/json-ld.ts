import type { AuditContent } from "@/content/audit";
import { blog, type BlogPost } from "@/content/blog";
import { ru } from "@/content/ru";
import type { FaqItem, Service } from "@/content/types";
import { blogPath } from "./blog";
import { site } from "./site";
import { servicePath } from "./services";

export const personId = `${site.url}/#person`;
export const organizationId = `${site.url}/#service`;
export const websiteId = `${site.url}/#website`;

const address = {
  "@type": "PostalAddress",
  addressLocality: site.city,
  addressRegion: site.city,
  addressCountry: site.countryCode,
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: site.geo.latitude,
  longitude: site.geo.longitude,
};

const areaServed = [
  { "@type": "City", name: site.city },
  { "@type": "Country", name: site.region },
  { "@type": "AdministrativeArea", name: "СНГ" },
];

const sameAs = [
  site.contacts.telegram,
  site.contacts.github,
  site.contacts.linkedin,
];

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.person.displayName,
    givenName: site.person.firstName,
    jobTitle: site.person.role,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    address,
    sameAs,
    knowsAbout: [
      "Разработка сайтов",
      "Личные кабинеты",
      "Telegram боты",
      "Оплата на сайте",
      "Интеграции с 1С",
      "Go",
      "Next.js",
      "PostgreSQL",
      "Аудит ИИ-кода",
      "Vibe code security audit",
    ],
    worksFor: { "@id": organizationId },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: site.name,
    alternateName: `${site.person.displayName} — ${site.tagline}`,
    url: site.url,
    description: ru.seo.description,
    slogan: ru.hero.title,
    image: `${site.url}/opengraph-image`,
    email: site.contacts.email,
    founder: { "@id": personId },
    employee: { "@id": personId },
    address,
    geo,
    areaServed,
    availableLanguage: ["ru", "en"],
    inLanguage: "ru-BY",
    sameAs,
    serviceType: ru.services.items.map((item) => item.navLabel),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: ru.services.title,
      itemListElement: ru.services.items.map((item, index) => ({
        "@type": "Offer",
        position: index + 1,
        url: `${site.url}${servicePath(item.slug)}`,
        itemOffered: {
          "@type": "Service",
          "@id": `${site.url}${servicePath(item.slug)}#service`,
          name: item.title,
          description: item.description,
          url: `${site.url}${servicePath(item.slug)}`,
          provider: { "@id": organizationId },
          areaServed,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    inLanguage: "ru-BY",
    description: ru.seo.description,
    publisher: { "@id": organizationId },
  };
}

export function webPageSchema(path: string, name: string, description: string) {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "ru-BY",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
  };
}

export function faqSchema(items: FaqItem[] = ru.faq.items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? site.url : `${site.url}${item.path}`,
    })),
  };
}

export function offeredServiceSchema(service: Service) {
  const url = `${site.url}${servicePath(service.slug)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.pageH1,
    description: service.pageDescription,
    url,
    provider: { "@id": organizationId },
    areaServed,
    serviceType: service.navLabel,
  };
}

export function homeJsonLd() {
  return [
    personSchema(),
    serviceSchema(),
    websiteSchema(),
    webPageSchema("/", ru.seo.title, ru.seo.description),
    faqSchema(),
  ];
}

export function servicesIndexJsonLd() {
  return [
    personSchema(),
    serviceSchema(),
    websiteSchema(),
    webPageSchema(ru.services.path, ru.services.indexTitle, ru.services.indexDescription),
    breadcrumbSchema([
      { name: ru.services.breadcrumbHome, path: "/" },
      { name: ru.services.eyebrow, path: ru.services.path },
    ]),
  ];
}

export function servicePageJsonLd(service: Service) {
  const path = servicePath(service.slug);

  return [
    personSchema(),
    serviceSchema(),
    websiteSchema(),
    webPageSchema(path, service.pageTitle, service.pageDescription),
    offeredServiceSchema(service),
    breadcrumbSchema([
      { name: ru.services.breadcrumbHome, path: "/" },
      { name: ru.services.eyebrow, path: ru.services.path },
      { name: service.navLabel, path },
    ]),
    ...(service.faq && service.faq.length > 0 ? [faqSchema(service.faq)] : []),
  ];
}

export function auditPageJsonLd(content: AuditContent) {
  const url = `${site.url}${content.path}`;
  const inLanguage = content.lang === "en" ? "en" : "ru-BY";
  const price = content.pricing.amount.replace(/[^0-9.]/g, "") || "500";

  return [
    personSchema(),
    websiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: content.serviceName,
      description: content.description,
      url,
      provider: { "@id": personId },
      serviceType: content.serviceName,
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      ...webPageSchema(content.path, content.title, content.description),
      inLanguage,
    },
    breadcrumbSchema(
      content.breadcrumbs.map((item) => ({
        name: item.label,
        path: item.href ?? content.path,
      })),
    ),
  ];
}

export function blogIndexJsonLd() {
  return [
    personSchema(),
    websiteSchema(),
    {
      ...webPageSchema(blog.path, blog.indexTitle, blog.indexDescription),
      inLanguage: "ru-BY",
    },
    breadcrumbSchema([
      { name: blog.ui.ru.home, path: "/" },
      { name: blog.ui.ru.blog, path: blog.path },
    ]),
  ];
}

export function blogArticleJsonLd(post: BlogPost) {
  const path = blogPath(post.slug);
  const url = `${site.url}${path}`;
  const inLanguage = post.lang === "en" ? "en" : "ru-BY";

  return [
    personSchema(),
    websiteSchema(),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage,
      url,
      author: { "@id": personId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": `${url}#webpage` },
    },
    {
      ...webPageSchema(path, post.title, post.description),
      inLanguage,
    },
    breadcrumbSchema([
      { name: blog.ui[post.lang].home, path: "/" },
      { name: blog.ui[post.lang].blog, path: blog.path },
      { name: post.title, path },
    ]),
  ];
}
