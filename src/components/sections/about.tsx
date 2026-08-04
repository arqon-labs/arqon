import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { ru } from "@/content/ru";
import portrait from "@/assets/portrait.jpg";

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
          <div className="relative overflow-hidden rounded-lg border border-line bg-surface">
            <Image
              src={portrait}
              alt={about.portraitAlt}
              placeholder="blur"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="aspect-4/5 w-full object-cover object-[50%_22%] grayscale contrast-[1.05] brightness-[0.82]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent"
              aria-hidden
            />
            <p className="absolute bottom-4 left-5 font-mono text-meta text-fg-muted">
              {about.portraitCaption}
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-line bg-surface p-6">
            <p className="font-mono text-meta uppercase text-fg-subtle">
              {about.domainsLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              {about.domains.map((domain) => (
                <li key={domain} className="flex gap-3 text-[0.9375rem] text-fg-muted">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
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
