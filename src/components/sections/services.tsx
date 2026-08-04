import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { ru } from "@/content/ru";

const { services } = ru;

export function Services() {
  return (
    <Section id="services">
      <SectionHeader
        eyebrow={services.eyebrow}
        title={services.title}
        lead={services.lead}
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.items.map((service) => (
          <Reveal key={service.id}>
            <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong">
              <h3 className="text-h3 font-medium">{service.title}</h3>

              <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                {service.description}
              </p>

              <p className="mt-5 flex items-start gap-2 text-[0.9375rem] text-fg">
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                {service.outcome}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-sm border border-line bg-surface-2 px-2 py-1 font-mono text-[0.75rem] text-fg-subtle"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
