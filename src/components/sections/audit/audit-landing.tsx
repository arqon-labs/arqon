import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Send } from "lucide-react";
import { audit, type AuditContent } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";
import type { AnalyticsEvent } from "@/lib/analytics";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Atmosphere } from "@/components/ui/atmosphere";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LanguageSwitch } from "@/components/shared/language-switch";
import { FaqList } from "@/components/shared/faq-list";
import { Reveal } from "@/components/shared/reveal";

function TelegramCta({
  event,
  children,
  size = "lg",
  className,
}: {
  event: AnalyticsEvent;
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <TrackedButtonLink
      event={event}
      href={site.contacts.telegram}
      target="_blank"
      rel="noopener noreferrer"
      size={size}
      className={className}
    >
      <Send className="size-4" aria-hidden />
      {children}
    </TrackedButtonLink>
  );
}

function AuditHero({
  content,
  telegramEvent,
}: {
  content: AuditContent;
  telegramEvent: AnalyticsEvent;
}) {
  const { hero, how } = content;

  return (
    <section className="relative isolate overflow-hidden">
      <Atmosphere />
      <Container>
        <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <Breadcrumbs label={content.breadcrumbLabel} items={content.breadcrumbs} />
            <LanguageSwitch
              current={content.lang}
              hrefs={{ en: audit.path, ru: auditRu.path }}
            />
          </div>
          <p className="rise mt-8 flex items-center gap-2.5 font-mono text-meta uppercase text-fg-muted">
            <span
              className="h-px w-5 bg-gradient-to-r from-accent to-transparent"
              aria-hidden
            />
            {hero.eyebrow}
          </p>
          <h1 className="rise mt-8 max-w-4xl text-display font-medium [animation-delay:80ms]">
            {hero.h1}
          </h1>
          <p className="rise mt-7 max-w-2xl text-lead text-fg-muted [animation-delay:160ms]">
            {hero.lead}
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:240ms]">
            <TelegramCta event={telegramEvent} className="w-full sm:w-auto">
              {hero.primaryCta}
            </TelegramCta>
            <ButtonLink href={`#${how.id}`} variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta}
              <ArrowDown className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <p className="rise mt-6 max-w-2xl font-mono text-meta text-fg-subtle [animation-delay:280ms]">
            {hero.trust}
          </p>
        </div>
      </Container>
    </section>
  );
}

function AuditFindings({ content }: { content: AuditContent }) {
  const { findings } = content;

  return (
    <Section>
      <SectionHeader title={findings.title} eyebrow={findings.eyebrow} />
      <ul className="mt-14 grid list-none gap-4 sm:grid-cols-2 sm:auto-rows-fr lg:grid-cols-3">
        {findings.items.map((item, index) => (
          <li key={item.title} className="min-h-0">
            <Reveal className="h-full">
              <article className="card flex h-full flex-col p-6">
                <p className="font-mono text-meta text-fg-subtle tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 min-h-[2.6em] text-h3 font-medium">{item.title}</h3>
                <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {item.body}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function AuditDeliverables({ content }: { content: AuditContent }) {
  const { deliverables } = content;

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader title={deliverables.title} eyebrow={deliverables.eyebrow} />
        </div>
        <ul className="list-none divide-y divide-line border-y border-line lg:col-span-7">
          {deliverables.items.map((item) => (
            <li key={item} className="flex items-start gap-3 py-5">
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
              <p className="text-[0.9375rem] leading-relaxed text-fg">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function AuditHow({ content }: { content: AuditContent }) {
  const { how } = content;

  return (
    <Section id={how.id}>
      <SectionHeader title={how.title} eyebrow={how.eyebrow} />
      <ol className="mt-14 grid list-none gap-4 sm:grid-cols-3 sm:auto-rows-fr">
        {how.steps.map((step, index) => (
          <li key={step.title} className="min-h-0">
            <article className="card flex h-full flex-col p-6">
              <p className="font-mono text-meta text-accent tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 min-h-[2.6em] text-h3 font-medium">{step.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function AuditPricing({
  content,
  telegramEvent,
}: {
  content: AuditContent;
  telegramEvent: AnalyticsEvent;
}) {
  const { pricing } = content;

  return (
    <Section>
      <SectionHeader title={pricing.title} eyebrow={pricing.eyebrow} />
      <Reveal className="mt-14 max-w-lg">
        <article className="card border-accent/20 p-6 sm:p-8">
          <p className="font-mono text-meta uppercase text-fg-subtle">{pricing.cadence}</p>
          <p className="mt-3 text-display font-medium tabular-nums">{pricing.amount}</p>
          <ul className="mt-8 list-none space-y-3">
            {pricing.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-fg">
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
      <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-fg-subtle">
        {pricing.note}
      </p>
      <TelegramCta event={telegramEvent} className="mt-6 w-full sm:w-auto">
        {pricing.cta}
      </TelegramCta>
    </Section>
  );
}

function AuditFix({ content }: { content: AuditContent }) {
  const { fix } = content;

  return (
    <Section>
      <SectionHeader title={fix.title} eyebrow={fix.eyebrow} />
      <p className="mt-8 max-w-2xl text-lead text-fg-muted">{fix.body}</p>
    </Section>
  );
}

function AuditFaq({ content }: { content: AuditContent }) {
  const { faq } = content;

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow={faq.eyebrow} title={faq.title} />
        </div>
        <div className="lg:col-span-8">
          <FaqList items={faq.items} />
        </div>
      </div>
    </Section>
  );
}

function AuditCta({
  content,
  telegramEvent,
}: {
  content: AuditContent;
  telegramEvent: AnalyticsEvent;
}) {
  const { cta } = content;

  return (
    <Section>
      <div className="border-y border-line py-12 sm:py-16">
        <h2 className="max-w-3xl text-h2 font-medium">{cta.title}</h2>
        <TelegramCta event={telegramEvent} className="mt-8 w-full sm:w-auto">
          {cta.button}
        </TelegramCta>
      </div>
    </Section>
  );
}

export function AuditLanding({
  content,
  telegramEvent,
}: {
  content: AuditContent;
  telegramEvent: AnalyticsEvent;
}) {
  return (
    <div lang={content.lang}>
      <AuditHero content={content} telegramEvent={telegramEvent} />
      <AuditFindings content={content} />
      <AuditDeliverables content={content} />
      <AuditHow content={content} />
      <AuditPricing content={content} telegramEvent={telegramEvent} />
      <AuditFix content={content} />
      <AuditFaq content={content} />
      <AuditCta content={content} telegramEvent={telegramEvent} />
    </div>
  );
}
