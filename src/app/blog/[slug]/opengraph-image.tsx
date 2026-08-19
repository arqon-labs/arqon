import { blog } from "@/content/blog";
import { postBySlug } from "@/lib/blog";
import { ogImage, ogImageSize, ogImageType } from "@/lib/og";

export const size = ogImageSize;
export const contentType = ogImageType;
export const dynamicParams = false;

export function generateStaticParams() {
  return blog.items.map((item) => ({ slug: item.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);

  return ogImage({
    title: post?.title ?? blog.indexH1,
    footer: post?.description ?? blog.indexLead,
  });
}
