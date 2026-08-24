import { ru } from "@/content/ru";
import { ogImage, ogImageSize, ogImageType } from "@/lib/og";

export const alt = ru.services.indexTitle;
export const size = ogImageSize;
export const contentType = ogImageType;

export default function OpengraphImage() {
  return ogImage({
    title: ru.services.indexH1,
    footer: ru.services.indexLead,
  });
}
