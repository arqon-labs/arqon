import { Section, SectionHeader } from "@/components/ui/section";
import { ProcessSteps } from "@/components/shared/process-steps";
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

      <ProcessSteps steps={formats.steps} />

      <p className="mt-16 flex items-center gap-2.5 font-mono text-meta uppercase text-fg-subtle">
        <span className="h-px w-5 bg-gradient-to-r from-accent to-transparent" aria-hidden />
        {formats.durationsLabel}
      </p>

      <div className="mt-4 divide-y divide-line border-y border-line">
        {formats.items.map((format) => (
          <article
            key={format.id}
            className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <p className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none font-medium tracking-tight text-accent tabular-nums md:col-span-4">
              {format.duration}
            </p>
            <div className="md:col-span-8">
              <h3 className="text-h3 font-medium">{format.title}</h3>
              <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
                {format.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-subtle">
        {formats.note}
      </p>
    </Section>
  );
}
