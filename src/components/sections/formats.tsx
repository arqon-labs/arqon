import { Section, SectionHeader } from "@/components/ui/section";
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
          className="pointer-events-none absolute top-[15px] right-[8%] left-[8%] hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block"
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
