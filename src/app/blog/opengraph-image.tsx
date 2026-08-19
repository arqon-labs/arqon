import { blog } from "@/content/blog";
import { ogImage, ogImageSize, ogImageType } from "@/lib/og";

export const alt = blog.indexTitle;
export const size = ogImageSize;
export const contentType = ogImageType;

export default function OpengraphImage() {
  return ogImage({
    title: blog.indexH1,
    footer: blog.indexLead,
  });
}
