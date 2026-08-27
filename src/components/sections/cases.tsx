import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { ru } from "@/content/ru";
import { cn } from "@/lib/cn";

const { cases } = ru;

export function Cases() {
  return (
    <Section id="cases">
      <SectionHeader
        eyebrow={cases.eyebrow}
        title={cases.title}
        lead={cases.lead}
      />

      <div className="mt-16 space-y-24 lg:space-y-32">
        {cases.items.map((item, index) => {
          const featured = index === 0;

          return (
            <Reveal key={item.id}>
              <article className={cn(index > 0 && "border-t border-line pt-16 lg:pt-20")}>
                <header>
                  <p className="font-mono text-meta uppercase text-accent">
                    <span className="text-fg-subtle tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden> · </span>
                    {item.label}
                  </p>
                  <h3
                    className={cn(
                      "mt-5 font-medium",
                      featured ? "max-w-4xl text-display" : "max-w-3xl text-h2",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-3xl text-lead text-fg-muted">{item.context}</p>
                </header>

                {item.metrics && item.metrics.length > 0 ? (
                  <dl className="mt-8 grid grid-cols-2 gap-6 sm:max-w-xl">
                    {item.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dd className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-tight text-accent tabular-nums">
                          {metric.value}
                        </dd>
                        <dt className="mt-1 font-mono text-meta uppercase text-fg-subtle">
                          {metric.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-5">
                    <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
                      {item.challenge}
                    </p>

                    <blockquote className="mt-8 border-l-2 border-accent pl-5">
                      <p className="font-mono text-meta uppercase text-accent">
                        {cases.resultLabel}
                      </p>
                      <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg">
                        {item.result}
                      </p>
                    </blockquote>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="font-mono text-meta uppercase text-fg-subtle">
                      {cases.decisionsLabel}
                    </p>

                    <ol className="mt-5 space-y-6">
                      {item.decisions.map((decision, step) => (
                        <li key={decision.title} className="flex gap-4">
                          <span
                            className="mt-0.5 font-mono text-meta text-accent/80 tabular-nums"
                            aria-hidden
                          >
                            {String(step + 1).padStart(2, "0")}
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
          );
        })}
      </div>
    </Section>
  );
}
