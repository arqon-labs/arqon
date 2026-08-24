import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogBlock, BlogPost } from "@/content/blog";
import { blog } from "@/content/blog";
import { audit } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";
import { blogPath, postLanguageHrefs } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LanguageSwitch } from "@/components/shared/language-switch";
import { TrackedButtonLink } from "@/components/shared/tracked-link";

function formatDate(date: string, lang: BlogPost["lang"]) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "ru-BY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function BlogIndexPage() {
  const ui = blog.ui.ru;

  return (
    <>
      <section lang="ru" className="relative isolate overflow-hidden">
        <Atmosphere glowClassName="h-[420px]" />
        <Container>
          <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
            <Breadcrumbs
              label={ui.crumbs}
              items={[
                { label: ui.home, href: "/" },
                { label: ui.blog },
              ]}
            />
            <h1 className="mt-8 max-w-4xl text-display font-medium">{blog.indexH1}</h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{blog.indexLead}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line pb-24 sm:pb-32">
        <Container>
          <ul className="divide-y divide-line border-b border-line">
            {blog.items.map((post, index) => (
              <li key={post.slug}>
                <article
                  lang={post.lang}
                  className={index === 0 ? "py-12 sm:py-16" : "py-8 sm:py-10"}
                >
                  <p className="font-mono text-meta uppercase text-fg-subtle">
                    {formatDate(post.date, post.lang)}
                    <span aria-hidden> · </span>
                    {post.lang.toUpperCase()}
                  </p>
                  <h2
                    className={cn(
                      "mt-4 font-medium",
                      index === 0 ? "max-w-3xl text-h2" : "text-[1.25rem] leading-snug",
                    )}
                  >
                    <Link
                      href={blogPath(post.slug)}
                      className="transition-colors duration-150 hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p
                    className={cn(
                      "mt-4 max-w-2xl text-fg-muted",
                      index === 0
                        ? "text-lead"
                        : "text-[0.9375rem] leading-relaxed",
                    )}
                  >
                    {post.description}
                  </p>
                  <p className="mt-5">
                    <Link
                      href={blogPath(post.slug)}
                      className="font-mono text-meta uppercase text-fg-subtle transition-colors duration-150 hover:text-fg"
                    >
                      {blog.ui[post.lang].more}
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
            <h2 key={index} className="pt-4 text-h3 font-medium font-sans tracking-tight">
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
    <div className="mt-14 max-w-2xl border-t border-line pt-10">
      <h2 className="text-h2 font-medium">{copy.title}</h2>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{copy.body}</p>
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
        {blog.ui[current.lang].moreNotes}
      </p>
      <ul className="mt-2 divide-y divide-line border-b border-line">
        {others.map((post) => (
          <li key={post.slug} className="py-5">
            <Link
              href={blogPath(post.slug)}
              className="text-[1.125rem] font-medium transition-colors duration-150 hover:text-accent"
            >
              {post.title}
            </Link>
            <p className="mt-1.5 text-[0.9375rem] text-fg-muted">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogArticlePage({ post }: { post: BlogPost }) {
  const ui = blog.ui[post.lang];
  const hrefs = postLanguageHrefs(post);

  return (
    <article lang={post.lang}>
      <section className="relative isolate overflow-hidden">
        <Atmosphere glowClassName="h-[420px]" />
        <Container>
          <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
              <Breadcrumbs
                label={ui.crumbs}
                items={[
                  { label: ui.home, href: "/" },
                  { label: ui.blog, href: blog.path },
                  { label: post.title },
                ]}
              />
              {hrefs ? <LanguageSwitch current={post.lang} hrefs={hrefs} /> : null}
            </div>
            <p className="mt-8 font-mono text-meta uppercase text-fg-subtle">
              {formatDate(post.date, post.lang)}
              <span aria-hidden> · </span>
              {post.lang.toUpperCase()}
            </p>
            <h1 className="mt-5 max-w-4xl text-display font-medium">{post.title}</h1>
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
