import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { ru } from "@/content/ru";
import { cn } from "@/lib/cn";

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
              <p className="relative z-10 flex size-8 items-center justify-center rounded-full border border-accent/30 bg-bg font-mono text-meta text-accent tabular-nums shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--color-accent)_75%,transparent)]">
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

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {formats.items.map((format) => (
          <Reveal key={format.id} className="h-full">
            <article
              className={cn(
                "card flex h-full flex-col p-6",
                format.id === "product" && "glow-edge border-accent/20",
              )}
            >
              <p className="font-mono text-[1.375rem] font-medium tracking-tight text-accent tabular-nums">
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
