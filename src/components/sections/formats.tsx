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

      <div className="relative mt-14">
        <div
          className="pointer-events-none absolute top-[15px] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
          aria-hidden
        />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {formats.steps.map((step, index) => (
            <li key={step.title}>
              <p className="relative z-10 flex size-8 items-center justify-center rounded-full border border-accent/30 bg-bg font-mono text-meta text-accent tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-h3 font-medium">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-16 font-mono text-meta uppercase text-fg-subtle">
        {formats.durationsLabel}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {formats.items.map((format) => (
          <Reveal key={format.id}>
            <article className="card flex h-full flex-col p-6">
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
