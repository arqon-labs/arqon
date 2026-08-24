import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/sections/blog-landing";
import { JsonLd } from "@/components/shared/json-ld";
import { blog } from "@/content/blog";
import { blogArticleJsonLd } from "@/lib/json-ld";
import { blogPath, postBySlug, postLanguageHrefs } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blog.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);

  if (!post) return {};

  const path = blogPath(post.slug);
  const locale = post.lang === "en" ? "en_US" : site.locale;
  const hrefs = postLanguageHrefs(post);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: path,
      ...(hrefs ? { languages: { ...hrefs, "x-default": hrefs.ru } } : {}),
    },
    openGraph: {
      type: "article",
      url: path,
      title: `${post.title} | ${site.name}`,
      description: post.description,
      locale,
      ...(hrefs
        ? { alternateLocale: post.lang === "en" ? [site.locale] : ["en_US"] }
        : {}),
      siteName: site.name,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <BlogArticlePage post={post} />
      <JsonLd data={blogArticleJsonLd(post)} />
    </>
  );
}
