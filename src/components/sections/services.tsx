import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { Spotlight } from "@/components/shared/spotlight";
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
                ? "h-full lg:col-span-2"
                : "h-full lg:col-span-3"
            }
          >
            <Spotlight className="card card-hover h-full">
            <Link
              href={servicePath(service.slug)}
              className="group flex h-full flex-col p-6"
            >
              <p className="font-mono text-meta text-fg-subtle tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-h3 font-medium transition-colors duration-150 group-hover:text-accent">
                {service.title}
              </h3>

              <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                {service.description}
              </p>

              <p className="mt-5 flex items-start gap-2 text-[0.9375rem] text-fg">
                <ArrowUpRight
                  className="mt-1 size-4 shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
                {service.outcome}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-sm border border-line bg-bg/60 px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider text-fg-subtle"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
