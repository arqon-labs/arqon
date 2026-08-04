import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { ru } from "@/content/ru";

const { formats } = ru;

export function Formats() {
  return (
    <Section id="formats">
      <SectionHeader
        eyebrow={formats.eyebrow}
        title={formats.title}
        lead={formats.lead}
      />

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {formats.items.map((format) => (
          <Reveal key={format.id}>
            <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6">
              <p className="font-mono text-[0.9375rem] text-accent tabular-nums">
                {format.duration}
              </p>
              <h3 className="mt-4 text-h3 font-medium">{format.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                {format.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-subtle">
        {formats.note}
      </p>
    </Section>
  );
}
