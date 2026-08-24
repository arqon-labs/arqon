import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { ru } from "@/content/ru";
import portrait from "@/assets/portrait.png";

const { about } = ru;

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader eyebrow={about.eyebrow} title={about.title} />

          <div className="mt-8 space-y-5 text-lead text-fg-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg border border-line bg-surface">
              <span
                className="pointer-events-none absolute top-3 left-3 z-10 size-3 border-t border-l border-accent/50"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute top-3 right-3 z-10 size-3 border-t border-r border-accent/50"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute bottom-3 left-3 z-10 size-3 border-b border-l border-accent/50"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute right-3 bottom-3 z-10 size-3 border-r border-b border-accent/50"
                aria-hidden
              />
              <Image
                src={portrait}
                alt={about.portraitAlt}
                placeholder="blur"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="aspect-4/5 w-full object-cover object-top"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent"
                aria-hidden
              />
              <p className="absolute bottom-4 left-5 font-mono text-meta text-fg-muted">
                {about.portraitCaption}
              </p>
            </div>

            <div className="card relative z-10 mt-5 p-6 lg:-mt-16 lg:mr-0 lg:ml-8">
              <p className="font-mono text-meta uppercase text-fg-subtle">{about.domainsLabel}</p>
              <ul className="mt-4 space-y-2.5">
                {about.domains.map((domain) => (
                  <li key={domain} className="flex gap-3 text-[0.9375rem] text-fg-muted">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {domain}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
