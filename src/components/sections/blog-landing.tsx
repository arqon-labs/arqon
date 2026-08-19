import Link from "next/link";
import type { BlogBlock, BlogPost } from "@/content/blog";
import { blog } from "@/content/blog";
import { blogPath } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-meta text-fg-subtle">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors duration-150 hover:text-fg">
                {item.label}
              </Link>
            ) : (
              <span className="text-fg-muted">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

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
      <section className="relative isolate overflow-hidden">
        <div
          className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          aria-hidden
        />
        <Container>
          <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
            <Breadcrumbs
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
                  className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong"
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

export function BlogArticlePage({ post }: { post: BlogPost }) {
  return (
    <article lang={post.lang}>
      <section className="relative isolate overflow-hidden">
        <div
          className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          aria-hidden
        />
        <Container>
          <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
            <Breadcrumbs
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
      </Section>
    </article>
  );
}
