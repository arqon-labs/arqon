import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { Spotlight } from "@/components/shared/spotlight";
import { ru } from "@/content/ru";
import { servicePath } from "@/lib/services";
import { cn } from "@/lib/cn";

const { services } = ru;

function serviceSpan(index: number) {
  if (index === 0) return "h-full md:col-span-2 lg:col-span-3 lg:row-span-2";
  if (index === 1 || index === 2) return "h-full lg:col-span-3";
  return "h-full lg:col-span-2";
}

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
          <Reveal key={service.id} className={serviceSpan(index)}>
            <Spotlight className="card card-hover h-full">
            <Link
              href={servicePath(service.slug)}
              className={cn(
                "group flex h-full flex-col p-6",
                index === 0 && "lg:p-8",
              )}
            >
              <p className="font-mono text-meta text-fg-subtle tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3
                className={cn(
                  "mt-3 font-medium transition-colors duration-150 group-hover:text-accent",
                  index === 0 ? "text-h2" : "text-h3",
                )}
              >
                {service.title}
              </h3>

              <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-fg-muted">
                {service.description}
              </p>

              <div className="mt-auto pt-8">
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
              </div>
            </Link>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
