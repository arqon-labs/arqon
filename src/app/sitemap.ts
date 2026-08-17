import type { MetadataRoute } from "next";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";
import { servicePath } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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
    ...ru.services.items.map((item) => ({
      url: `${site.url}${servicePath(item.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
