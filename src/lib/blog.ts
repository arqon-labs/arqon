import { blog, type BlogPost } from "@/content/blog";

export function blogPath(slug: string) {
  return `${blog.path}/${slug}`;
}

export function postBySlug(slug: string): BlogPost | undefined {
  return blog.items.find((item) => item.slug === slug);
}
