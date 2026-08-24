import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogBlock, BlogPost } from "@/content/blog";
import { blog } from "@/content/blog";
import { audit } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";
import { blogPath } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TrackedButtonLink } from "@/components/shared/tracked-link";

function formatDate(date: string, lang: BlogPost["lang"]) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "ru-BY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function BlogIndexPage() {
  return (
    <>
      <section lang="en" className="relative isolate overflow-hidden">
        <Atmosphere glowClassName="h-[420px]" />
        <Container>
          <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
            <Breadcrumbs
              label={blog.breadcrumbLabel}
              items={[
                { label: blog.breadcrumbHome, href: "/" },
                { label: blog.eyebrow },
              ]}
            />
            <h1 className="mt-8 max-w-4xl text-h2 font-medium">{blog.indexH1}</h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{blog.indexLead}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line pb-24 sm:pb-32">
        <Container>
          <ul className="grid gap-4">
            {blog.items.map((post) => (
              <li key={post.slug}>
                <article
                  lang={post.lang}
                  className="card card-hover flex h-full flex-col p-6"
                >
                  <p className="font-mono text-meta uppercase text-fg-subtle">
                    {formatDate(post.date, post.lang)}
                    <span aria-hidden> · </span>
                    {post.lang.toUpperCase()}
                  </p>
                  <h2 className="mt-3 text-h3 font-medium">
                    <Link
                      href={blogPath(post.slug)}
                      className="transition-colors duration-150 hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {post.description}
                  </p>
                  <p className="mt-5 border-t border-line pt-5">
                    <Link
                      href={blogPath(post.slug)}
                      className="font-mono text-meta uppercase text-fg-subtle transition-colors duration-150 hover:text-fg"
                    >
                      {blog.moreLabel}
                    </Link>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="max-w-2xl space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={index} className="pt-4 text-h3 font-medium">
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="list-disc space-y-2.5 pl-5 text-[0.9375rem] leading-relaxed text-fg-muted"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-[0.9375rem] leading-relaxed text-fg-muted">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function BlogAuditCta({ lang }: { lang: BlogPost["lang"] }) {
  const copy = blog.cta[lang];
  const href = lang === "en" ? audit.path : auditRu.path;

  return (
    <div className="card mt-14 max-w-2xl p-6 sm:p-8">
      <h2 className="text-h3 font-medium">{copy.title}</h2>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{copy.body}</p>
      <TrackedButtonLink
        event="blog_audit_cta_click"
        href={href}
        className="mt-6 w-full sm:w-auto"
      >
        <ArrowUpRight className="size-4" aria-hidden />
        {copy.button}
      </TrackedButtonLink>
    </div>
  );
}

function MorePosts({ current }: { current: BlogPost }) {
  const others = blog.items.filter((item) => item.slug !== current.slug);

  if (others.length === 0) return null;

  return (
    <div className="mt-16 max-w-2xl border-t border-line pt-10">
      <p className="font-mono text-meta uppercase text-fg-subtle">
        {current.lang === "ru" ? "Ещё заметки" : "More notes"}
      </p>
      <ul className="mt-5 space-y-4">
        {others.map((post) => (
          <li key={post.slug}>
            <Link
              href={blogPath(post.slug)}
              className="text-[1.0625rem] font-medium transition-colors duration-150 hover:text-accent"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-[0.9375rem] text-fg-muted">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogArticlePage({ post }: { post: BlogPost }) {
  return (
    <article lang={post.lang}>
      <section className="relative isolate overflow-hidden">
        <Atmosphere glowClassName="h-[420px]" />
        <Container>
          <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
            <Breadcrumbs
              label={blog.breadcrumbLabel}
              items={[
                { label: blog.breadcrumbHome, href: "/" },
                { label: blog.eyebrow, href: blog.path },
                { label: post.title },
              ]}
            />
            <p className="mt-8 font-mono text-meta uppercase text-fg-subtle">
              {formatDate(post.date, post.lang)}
              <span aria-hidden> · </span>
              {post.lang.toUpperCase()}
            </p>
            <h1 className="mt-5 max-w-4xl text-h2 font-medium">{post.title}</h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{post.description}</p>
          </div>
        </Container>
      </section>

      <Section bordered>
        <BlogBlocks blocks={post.body} />
        <BlogAuditCta lang={post.lang} />
        <MorePosts current={post} />
      </Section>
    </article>
  );
}
