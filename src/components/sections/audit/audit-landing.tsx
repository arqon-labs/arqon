import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus, Send } from "lucide-react";
import { audit } from "@/content/audit";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { Reveal } from "@/components/shared/reveal";

function TelegramCta({
  children,
  size = "lg",
  className,
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <TrackedButtonLink
      event="telegram_click"
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

function AuditHero() {
  const { hero } = audit;

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        aria-hidden
      />
      <Container>
        <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
          <p className="rise inline-flex items-center rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-meta uppercase text-fg-muted">
            {hero.eyebrow}
          </p>
          <h1 className="rise mt-8 max-w-4xl text-display font-medium [animation-delay:80ms]">
            {hero.h1}
          </h1>
          <p className="rise mt-7 max-w-2xl text-lead text-fg-muted [animation-delay:160ms]">
            {hero.lead}
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:240ms]">
            <TelegramCta className="w-full sm:w-auto">{hero.primaryCta}</TelegramCta>
            <ButtonLink href={`#${audit.how.id}`} variant="secondary" size="lg" className="w-full sm:w-auto">
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

function AuditFindings() {
  const { findings } = audit;

  return (
    <Section>
      <SectionHeader title={findings.title} eyebrow="What I usually find" />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {findings.items.map((item, index) => (
          <li key={item.title}>
            <Reveal>
              <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6">
                <p className="font-mono text-meta text-fg-subtle tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-h3 font-medium">{item.title}</h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-fg-muted">
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

function AuditDeliverables() {
  const { deliverables } = audit;

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader title={deliverables.title} eyebrow="What you get" />
        </div>
        <ul className="lg:col-span-7 divide-y divide-line border-y border-line">
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

function AuditHow() {
  const { how } = audit;

  return (
    <Section id={how.id}>
      <SectionHeader title={how.title} eyebrow="Process" />
      <ol className="mt-14 grid gap-8 sm:grid-cols-3">
        {how.steps.map((step, index) => (
          <li key={step.title}>
            <p className="font-mono text-meta text-accent tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-h3 font-medium">{step.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function AuditPricing() {
  const { pricing } = audit;

  return (
    <Section>
      <SectionHeader title={pricing.title} eyebrow="Price" />
      <Reveal className="mt-14 max-w-lg">
        <article className="rounded-lg border border-line bg-surface p-6 sm:p-8">
          <p className="font-mono text-meta uppercase text-fg-subtle">{pricing.cadence}</p>
          <p className="mt-3 text-display font-medium tabular-nums">{pricing.amount}</p>
          <ul className="mt-8 space-y-3">
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
      <TelegramCta className="mt-6 w-full sm:w-auto">{pricing.cta}</TelegramCta>
    </Section>
  );
}

function AuditFix() {
  const { fix } = audit;

  return (
    <Section>
      <SectionHeader title={fix.title} eyebrow="Then I fix it" />
      <p className="mt-8 max-w-2xl text-lead text-fg-muted">{fix.body}</p>
    </Section>
  );
}

function AuditFaq() {
  const { faq } = audit;

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="FAQ" title={faq.title} />
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {faq.items.map((item) => {
              const link = "link" in item ? item.link : undefined;
              const answer =
                link && item.answer.endsWith(link.label)
                  ? item.answer.slice(0, -link.label.length).trim()
                  : item.answer;

              return (
                <li key={item.question}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium transition-colors duration-150 hover:text-accent">
                      {item.question}
                      <Plus
                        className="mt-1 size-4 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45"
                        aria-hidden
                      />
                    </summary>
                    <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-fg-muted">
                      {link ? (
                        <>
                          {answer}{" "}
                          <Link
                            href={link.href}
                            className="text-fg transition-colors duration-150 hover:text-accent"
                          >
                            {link.label}
                          </Link>
                        </>
                      ) : (
                        item.answer
                      )}
                    </p>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function AuditCta() {
  const { cta } = audit;

  return (
    <Section>
      <div className="rounded-lg border border-line bg-surface px-6 py-10 sm:px-10 sm:py-14">
        <h2 className="max-w-3xl text-h2 font-medium">{cta.title}</h2>
        <TelegramCta className="mt-8 w-full sm:w-auto">{cta.button}</TelegramCta>
      </div>
    </Section>
  );
}

export function AuditLanding() {
  return (
    <div lang="en">
      <AuditHero />
      <AuditFindings />
      <AuditDeliverables />
      <AuditHow />
      <AuditPricing />
      <AuditFix />
      <AuditFaq />
      <AuditCta />
    </div>
  );
}
