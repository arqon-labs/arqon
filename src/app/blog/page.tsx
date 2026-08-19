import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/sections/blog-landing";
import { JsonLd } from "@/components/shared/json-ld";
import { blog } from "@/content/blog";
import { blogIndexJsonLd } from "@/lib/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: blog.indexTitle,
  description: blog.indexDescription,
  alternates: { canonical: blog.path },
  openGraph: {
    url: blog.path,
    title: `${blog.indexTitle} | ${site.name}`,
    description: blog.indexDescription,
    locale: "en_US",
    siteName: site.name,
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogIndexPage />
      <JsonLd data={blogIndexJsonLd()} />
    </>
  );
}
