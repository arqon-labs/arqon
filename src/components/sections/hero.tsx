import { ArrowDown, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";

const { hero } = ru;

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
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
            {hero.title}
          </h1>

          <p className="rise mt-7 max-w-2xl text-lead text-fg-muted [animation-delay:160ms]">
            {hero.lead}
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:240ms]">
            <TrackedButtonLink
              event="telegram_click"
              href={site.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Send className="size-4" aria-hidden />
              {hero.primaryCta}
            </TrackedButtonLink>

            <ButtonLink href="/#cases" variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta}
              <ArrowDown className="size-4" aria-hidden />
            </ButtonLink>
          </div>

          <dl className="rise mt-20 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 [animation-delay:320ms]">
            {hero.facts.map((fact) => (
              <div key={fact.label} className="bg-bg p-6">
                <dt className="font-mono text-meta uppercase text-fg-subtle">
                  {fact.label}
                </dt>
                <dd className="mt-2.5 text-[1.0625rem] text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
