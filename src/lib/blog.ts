import { blog, type BlogPost } from "@/content/blog";

export function blogPath(slug: string) {
  return `${blog.path}/${slug}`;
}

export function postBySlug(slug: string): BlogPost | undefined {
  return blog.items.find((item) => item.slug === slug);
}

export function postLanguageHrefs(post: BlogPost): { en: string; ru: string } | null {
  if (!post.alternate) return null;

  const hrefs: Partial<Record<BlogPost["lang"], string>> = {
    [post.lang]: blogPath(post.slug),
    [post.alternate.lang]: blogPath(post.alternate.slug),
  };

  if (!hrefs.en || !hrefs.ru) return null;

  return { en: hrefs.en, ru: hrefs.ru };
}
