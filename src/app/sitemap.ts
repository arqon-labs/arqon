import type { MetadataRoute } from "next";
import { audit } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";
import { servicePath } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const auditLanguages = {
    en: `${site.url}${audit.path}`,
    ru: `${site.url}${auditRu.path}`,
  };

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}${ru.services.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}${audit.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: auditLanguages },
    },
    ...ru.services.items.map((item) => {
      const isAudit = item.id === "ai-audit";

      return {
        url: `${site.url}${servicePath(item.slug)}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        ...(isAudit ? { alternates: { languages: auditLanguages } } : {}),
      };
    }),
  ];
}
