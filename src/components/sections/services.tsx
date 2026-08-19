import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { ru } from "@/content/ru";
import { servicePath } from "@/lib/services";

const { services } = ru;

export function Services() {
  return (
    <Section id="services">
      <SectionHeader
        eyebrow={services.eyebrow}
        title={services.title}
        lead={services.lead}
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {services.items.map((service, index) => (
          <Reveal
            key={service.id}
            className={
              services.items.length % 3 === 0 || index < 3
                ? "lg:col-span-2"
                : "lg:col-span-3"
            }
          >
            <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors duration-150 hover:border-line-strong">
              <p className="font-mono text-meta text-fg-subtle tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-h3 font-medium">
                <Link
                  href={servicePath(service.slug)}
                  className="transition-colors duration-150 hover:text-accent"
                >
                  {service.title}
                </Link>
              </h3>

              <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                {service.description}
              </p>

              <p className="mt-5 flex items-start gap-2 text-[0.9375rem] text-fg">
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                {service.outcome}
              </p>

              <p className="mt-5 border-t border-line pt-5">
                <Link
                  href={servicePath(service.slug)}
                  className="font-mono text-meta text-fg-subtle uppercase transition-colors duration-150 hover:text-fg"
                >
                  {services.moreLabel}
                </Link>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
