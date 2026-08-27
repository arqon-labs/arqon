import { Fragment } from "react";
import Image from "next/image";
import { ArrowDown, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Atmosphere } from "@/components/ui/atmosphere";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";
import portrait from "@/assets/portrait.png";

const { hero } = ru;
const titleWords = hero.display.split(" ");

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Atmosphere />
      <p
        className="hero-mark pointer-events-none absolute top-[8%] -right-2 select-none font-serif font-normal italic leading-none tracking-[-0.06em] text-fg/[0.045] text-[clamp(5.5rem,22vw,16rem)] sm:top-[4%]"
        aria-hidden
      >
        {site.name}
      </p>

      <Container>
        <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
          <div className="rise flex items-center gap-3.5">
            <Image
              src={portrait}
              alt=""
              width={72}
              height={72}
              priority
              sizes="72px"
              className="size-14 rounded-full object-cover object-top ring-1 ring-accent/35 sm:size-[4.5rem]"
            />
            <div>
              <p className="text-[1.0625rem] font-medium tracking-tight">
                {site.person.fullName}
              </p>
              <p className="mt-1.5 flex items-center gap-2.5 font-mono text-meta uppercase text-fg-muted">
                <span
                  className="h-px w-5 bg-gradient-to-r from-accent to-transparent"
                  aria-hidden
                />
                {hero.eyebrow}
              </p>
            </div>
          </div>

          <h1 className="mt-8 max-w-4xl text-display font-medium">
            {titleWords.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 ? " " : null}
                <span className="hero-word-clip">
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${70 + index * 48}ms` }}
                  >
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
            <span className="mt-5 block overflow-hidden pb-[0.14em]">
              <span
                className="hero-word text-[clamp(1.35rem,2.6vw,1.85rem)] font-medium tracking-tight text-accent"
                style={{ animationDelay: `${70 + titleWords.length * 48}ms` }}
              >
                {hero.punch}
              </span>
            </span>
          </h1>

          <p className="rise mt-7 max-w-2xl text-lead text-fg-muted [animation-delay:320ms]">
            {hero.lead}
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:400ms]">
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

            <ButtonLink href="/#formats" variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta}
              <ArrowDown className="size-4" aria-hidden />
            </ButtonLink>
          </div>

          <p className="rise mt-8 max-w-2xl font-mono text-meta uppercase text-fg-subtle [animation-delay:440ms]">
            {hero.trust}
          </p>

          <dl className="rise mt-16 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 [animation-delay:500ms]">
            {hero.facts.map((fact) => (
              <div key={fact.label}>
                <dd className="text-[1.125rem] font-medium tracking-tight">{fact.value}</dd>
                <dt className="mt-2 font-mono text-meta uppercase text-fg-subtle">
                  {fact.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
