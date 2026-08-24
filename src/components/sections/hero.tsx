import { Fragment } from "react";
import { ArrowDown, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Atmosphere } from "@/components/ui/atmosphere";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";

const { hero } = ru;
const trustItems = hero.trust.split(" · ");
const titleWords = hero.title.split(" ");
const accentFrom = titleWords.indexOf("—");

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Atmosphere />
      <p
        className="hero-mark pointer-events-none absolute top-[8%] -right-2 select-none font-medium leading-none tracking-[-0.07em] text-fg/[0.04] text-[clamp(5.5rem,22vw,16rem)] sm:top-[4%]"
        aria-hidden
      >
        {site.name}
      </p>

      <Container>
        <div className="pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
          <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/55 px-3.5 py-1.5 font-mono text-meta uppercase text-fg-muted shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md">
            <span className="relative flex size-1.5" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative size-1.5 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </p>

          <h1 className="mt-8 max-w-4xl text-display font-medium">
            {titleWords.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 ? (titleWords[index - 1] === "—" ? <br /> : " ") : null}
                <span className="hero-word-clip">
                  <span
                    className={
                      accentFrom >= 0 && index > accentFrom
                        ? "hero-word text-accent-gradient"
                        : "hero-word"
                    }
                    style={{ animationDelay: `${70 + index * 48}ms` }}
                  >
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
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

          <ul className="rise mt-8 flex flex-wrap gap-2 [animation-delay:440ms]">
            {trustItems.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-meta text-fg-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <dl className="rise mt-16 grid gap-3 sm:grid-cols-3 [animation-delay:500ms]">
            {hero.facts.map((fact) => (
              <div key={fact.label} className="card flex flex-col-reverse px-5 py-5 sm:px-6">
                <dt className="mt-2 font-mono text-meta uppercase text-fg-subtle">{fact.label}</dt>
                <dd className="text-[1.1875rem] font-medium tracking-tight text-fg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
