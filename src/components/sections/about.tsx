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
          <figure>
            <div className="relative overflow-hidden rounded-lg border border-line bg-surface">
              <Image
                src={portrait}
                alt={about.portraitAlt}
                placeholder="blur"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="aspect-4/5 w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 font-mono text-meta text-fg-subtle">
              {about.portraitCaption}
            </figcaption>
          </figure>

          <div className="mt-8">
            <p className="font-mono text-meta uppercase text-fg-subtle">{about.domainsLabel}</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {about.domains.map((domain) => (
                <li key={domain} className="py-3 text-[0.9375rem] text-fg-muted">
                  {domain}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
