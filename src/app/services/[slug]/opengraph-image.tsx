import { auditRu } from "@/content/audit-ru";
import { ru } from "@/content/ru";
import { ogImage, ogImageSize, ogImageType } from "@/lib/og";
import { serviceBySlug } from "@/lib/services";

export const size = ogImageSize;
export const contentType = ogImageType;
export const dynamicParams = false;

export function generateStaticParams() {
  return ru.services.items.map((item) => ({ slug: item.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "ai-audit") {
    return ogImage({
      title: auditRu.hero.h1,
      footer: auditRu.hero.trust,
    });
  }

  const service = serviceBySlug(slug);

  return ogImage({
    title: service?.pageH1 ?? ru.hero.title,
    footer: service?.outcome ?? ru.footer.description,
  });
}
