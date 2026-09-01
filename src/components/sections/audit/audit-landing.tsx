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
import { ProcessSteps } from "@/components/shared/process-steps";

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
        <div className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
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
      <ul className="mt-14 divide-y divide-line border-y border-line">
        {findings.items.map((item, index) => (
          <li
            key={item.title}
            className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <p className="font-mono text-meta text-fg-subtle tabular-nums md:col-span-1">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="text-h3 font-medium md:col-span-4">{item.title}</h3>
            <p className="text-[0.9375rem] leading-relaxed text-fg-muted md:col-span-7">
              {item.body}
            </p>
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
      <ProcessSteps
        steps={how.steps.map((step) => ({ title: step.title, detail: step.body }))}
      />
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
      <article className="mt-14 grid gap-3 border-y border-line py-8 md:grid-cols-12 md:items-start md:gap-8">
        <div className="md:col-span-4">
          <p className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none font-medium tracking-tight text-accent tabular-nums">
            {pricing.amount}
          </p>
          <p className="mt-3 font-mono text-meta uppercase text-fg-subtle">
            {pricing.cadence}
          </p>
        </div>
        <ul className="space-y-3 md:col-span-8">
          {pricing.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-fg">
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </article>
      <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-subtle">
        {pricing.note}
      </p>
      <TelegramCta event={telegramEvent} className="mt-8 w-full sm:w-auto">
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
