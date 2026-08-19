import type { MetadataRoute } from "next";
import { audit } from "@/content/audit";
import { blog } from "@/content/blog";
import { ru } from "@/content/ru";
import { blogPath } from "@/lib/blog";
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
    {
      url: `${site.url}${audit.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}${blog.path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...ru.services.items.map((item) => ({
      url: `${site.url}${servicePath(item.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blog.items.map((post) => ({
      url: `${site.url}${blogPath(post.slug)}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
