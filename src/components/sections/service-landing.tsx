import Link from "next/link";
import { ArrowDown, ArrowUpRight, Send } from "lucide-react";
import type { Service } from "@/content/types";
import { auditRu } from "@/content/audit-ru";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";
import { servicePath } from "@/lib/services";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Atmosphere } from "@/components/ui/atmosphere";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { ProcessSteps } from "@/components/shared/process-steps";
import { TrackedButtonLink, TrackedLink } from "@/components/shared/tracked-link";
import { Contact } from "@/components/sections/contact";

export function ServicesIndexPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere glowClassName="h-[420px]" />
        <Container>
          <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
            <Breadcrumbs
              label="Навигация по разделам"
              items={[
                { label: ru.services.breadcrumbHome, href: "/" },
                { label: ru.services.eyebrow },
              ]}
            />
            <h1 className="mt-8 max-w-4xl text-display font-medium">{ru.services.indexH1}</h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">
              {ru.services.indexLead}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line pb-24 sm:pb-32">
        <Container>
          <ul className="divide-y divide-line border-b border-line">
            {ru.services.items.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={servicePath(service.slug)}
                  className="group grid gap-4 py-10 sm:py-12 lg:grid-cols-12 lg:items-baseline lg:gap-8"
                >
                  <span className="font-mono text-meta text-fg-subtle tabular-nums lg:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="lg:col-span-7">
                    <h2 className="text-h2 font-medium transition-colors duration-150 group-hover:text-accent">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
                      {service.description}
                    </p>
                  </div>
                  <p className="flex items-start gap-2 text-[0.9375rem] text-fg lg:col-span-4 lg:justify-end">
                    <ArrowUpRight
                      className="mt-0.5 size-4 shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                    <span>{service.outcome}</span>
                  </p>
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

export function ServiceLandingPage({ service }: { service: Service }) {
  const others = ru.services.items.filter((item) => item.slug !== service.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere glowClassName="h-[420px]" />
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
            <p className="mt-8 flex items-center gap-2.5 font-mono text-meta uppercase text-fg-subtle">
              <span
                className="h-px w-5 bg-gradient-to-r from-accent to-transparent"
                aria-hidden
              />
              {site.city} · {site.person.fullName}
            </p>
            <h1 className="mt-5 max-w-4xl text-display font-medium">{service.pageH1}</h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{service.description}</p>
            <blockquote className="mt-8 max-w-2xl border-l-2 border-accent pl-5">
              <p className="text-[1.0625rem] leading-relaxed text-fg">{service.outcome}</p>
            </blockquote>

            <p className="mt-8 font-mono text-meta uppercase text-fg-subtle">
              {service.tags.join(" · ")}
            </p>

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

      {service.id === "existing" ? (
        <section className="border-t border-line py-10 sm:py-12">
          <Container>
            <TrackedLink
              event="audit_repair_link_click"
              href={auditRu.path}
              className="group flex items-start justify-between gap-4 py-2 sm:items-center"
            >
              <span className="text-[1.0625rem] font-medium text-fg transition-colors duration-150 group-hover:text-accent">
                {ru.services.aiCue} →
              </span>
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent sm:mt-0" aria-hidden />
            </TrackedLink>
          </Container>
        </section>
      ) : null}

      {service.formatId ? (
        <ServiceProcess formatId={service.formatId} />
      ) : null}

      {service.faq && service.faq.length > 0 ? (
        <Section>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow={ru.faq.eyebrow} title={ru.faq.title} />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={service.faq} />
            </div>
          </div>
        </Section>
      ) : null}

      <section className="border-t border-line py-16 sm:py-20">
        <Container>
          <p className="font-mono text-meta uppercase text-fg-subtle">
            {ru.footer.servicesLabel}
          </p>
          <ul className="mt-4 divide-y divide-line border-b border-line">
            {others.map((item, index) => (
              <li key={item.slug}>
                <Link
                  href={servicePath(item.slug)}
                  className="group flex items-baseline gap-4 py-5 text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  <span className="font-mono text-meta text-fg-subtle tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-serif text-[1.25rem] font-medium tracking-tight text-fg">
                    {item.navLabel}
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                    aria-hidden
                  />
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

function ServiceProcess({ formatId }: { formatId: NonNullable<Service["formatId"]> }) {
  const format = ru.formats.items.find((item) => item.id === formatId);

  return (
    <Section>
      <SectionHeader
        eyebrow={ru.formats.eyebrow}
        title={ru.formats.title}
        lead={ru.formats.lead}
      />
      <ProcessSteps steps={ru.formats.steps} />
      {format ? (
        <>
          <p className="mt-16 flex items-center gap-2.5 font-mono text-meta uppercase text-fg-subtle">
            <span className="h-px w-5 bg-gradient-to-r from-accent to-transparent" aria-hidden />
            {ru.formats.durationsLabel}
          </p>
          <article className="mt-4 grid gap-3 border-y border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8">
            <p className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none font-medium tracking-tight text-accent tabular-nums md:col-span-4">
              {format.duration}
            </p>
            <div className="md:col-span-8">
              <h3 className="text-h3 font-medium">{format.title}</h3>
              <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
                {format.description}
              </p>
            </div>
          </article>
          <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-subtle">
            {ru.formats.note}
          </p>
        </>
      ) : null}
    </Section>
  );
}
