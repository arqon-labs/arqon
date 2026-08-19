import { audit } from "@/content/audit";
import { ogImage, ogImageSize, ogImageType } from "@/lib/og";

export const alt = audit.ogAlt;
export const size = ogImageSize;
export const contentType = ogImageType;

export default function OpengraphImage() {
  return ogImage({
    title: audit.hero.h1,
    footer: audit.hero.trust,
  });
}
