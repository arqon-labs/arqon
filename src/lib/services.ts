import { ru } from "@/content/ru";
import type { Service } from "@/content/types";

export function servicePath(slug: string) {
  return `${ru.services.path}/${slug}`;
}

export function serviceBySlug(slug: string): Service | undefined {
  return ru.services.items.find((item) => item.slug === slug);
}
