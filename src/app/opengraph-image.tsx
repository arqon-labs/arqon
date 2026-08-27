import { ru } from "@/content/ru";
import { ogImage, ogImageSize, ogImageType } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = ru.seo.ogAlt;
export const size = ogImageSize;
export const contentType = ogImageType;

export default function OpengraphImage() {
  return ogImage({
    title: ru.hero.title,
    footer: `${site.person.fullName} · ${site.city}`,
  });
}
