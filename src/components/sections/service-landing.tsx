import Link from "next/link";
import { ArrowDown, ArrowUpRight, Send } from "lucide-react";
import type { Service } from "@/content/types";
import { auditRu } from "@/content/audit-ru";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";
import { servicePath } from "@/lib/services";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TrackedButtonLink, TrackedLink } from "@/components/shared/tracked-link";
import { Contact } from "@/components/sections/contact";

export function ServicesIndexPage() {
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
              label="Навигация по разделам"
              items={[
                { label: ru.services.breadcrumbHome, href: "/" },
                { label: ru.services.eyebrow },
              ]}
            />
            <h1 className="mt-8 max-w-4xl text-h2 font-medium">{ru.services.indexH1}</h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">
              {ru.services.indexLead}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line pb-24 sm:pb-32">
        <Container>
          <ul className="grid gap-4 md:grid-cols-2">
            {ru.services.items.map((service) => (
              <li key={service.slug}>
                <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong">
                  <h2 className="text-h3 font-medium">
                    <Link
                      href={servicePath(service.slug)}
                      className="transition-colors duration-150 hover:text-accent"
                    >
                      {service.pageH1}
                    </Link>
                  </h2>
                  <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {service.description}
                  </p>
                  <p className="mt-5 flex items-start gap-2 text-[0.9375rem] text-fg">
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                    {service.outcome}
                  </p>
                  <p className="mt-5 border-t border-line pt-5">
                    <Link
                      href={servicePath(service.slug)}
                      className="font-mono text-meta uppercase text-fg-subtle transition-colors duration-150 hover:text-fg"
                    >
                      {ru.services.moreLabel}
                    </Link>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Contact />
    </>
  );
}

export function ServiceLandingPage({ service }: { service: Service }) {
  const others = ru.services.items.filter((item) => item.slug !== service.slug);

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
              label="Навигация по разделам"
              items={[
                { label: ru.services.breadcrumbHome, href: "/" },
                { label: ru.services.eyebrow, href: ru.services.path },
                { label: service.navLabel },
              ]}
            />
            <p className="mt-8 font-mono text-meta uppercase text-fg-subtle">
              {site.city} · {site.person.displayName}
            </p>
            <h1 className="mt-5 max-w-4xl text-h2 font-medium">{service.pageH1}</h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{service.description}</p>
            <p className="mt-5 flex max-w-2xl items-start gap-2 text-[1.0625rem] text-fg">
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
              {service.outcome}
            </p>

            <ul className="mt-8 flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm border border-line bg-surface px-2 py-1 font-mono text-[0.75rem] text-fg-subtle"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedButtonLink
                event="telegram_click"
                href={site.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Send className="size-4" aria-hidden />
                {ru.hero.primaryCta}
              </TrackedButtonLink>
              <ButtonLink href="#contact" variant="secondary" size="lg" className="w-full sm:w-auto">
                {ru.contact.title}
                <ArrowDown className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {service.slug === "dorabotka" ? (
        <section className="border-t border-line py-10 sm:py-12">
          <Container>
            <TrackedLink
              event="audit_dorabotka_link_click"
              href={auditRu.path}
              className="group flex items-start justify-between gap-4 rounded-lg border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong sm:items-center"
            >
              <span className="text-[1.0625rem] font-medium text-fg transition-colors duration-150 group-hover:text-accent">
                Приложение написано нейросетью? Для этого есть отдельный аудит →
              </span>
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent sm:mt-0" aria-hidden />
            </TrackedLink>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-line py-16 sm:py-20">
        <Container>
          <p className="font-mono text-meta uppercase text-fg-subtle">
            {ru.footer.servicesLabel}
          </p>
          <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={servicePath(item.slug)}
                  className="text-[0.9375rem] text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  {item.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Contact />
    </>
  );
}
