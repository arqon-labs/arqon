import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { ru } from "@/content/ru";

const { cases } = ru;

export function Cases() {
  return (
    <Section id="cases">
      <SectionHeader
        eyebrow={cases.eyebrow}
        title={cases.title}
        lead={cases.lead}
      />

      <div className="mt-16 space-y-16">
        {cases.items.map((item) => (
          <Reveal key={item.id}>
            <article className="rounded-lg border border-line bg-surface">
              <header className="border-b border-line p-6 sm:p-8">
                <p className="font-mono text-meta uppercase text-accent">
                  {item.label}
                </p>
                <h3 className="mt-4 max-w-3xl text-h2 font-medium">{item.title}</h3>
                <p className="mt-5 max-w-3xl text-lead text-fg-muted">
                  {item.context}
                </p>
              </header>

              <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
                    {item.challenge}
                  </p>

                  <div className="mt-8 rounded-md border border-line-strong bg-surface-2 p-5">
                    <p className="font-mono text-meta uppercase text-fg-subtle">
                      {cases.resultLabel}
                    </p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg">
                      {item.result}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <p className="font-mono text-meta uppercase text-fg-subtle">
                    {cases.decisionsLabel}
                  </p>

                  <ol className="mt-5 space-y-6">
                    {item.decisions.map((decision, index) => (
                      <li key={decision.title} className="flex gap-4">
                        <span
                          className="mt-0.5 font-mono text-meta text-fg-subtle tabular-nums"
                          aria-hidden
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="text-[1.0625rem] font-medium leading-snug">
                            {decision.title}
                          </h4>
                          <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
                            {decision.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
