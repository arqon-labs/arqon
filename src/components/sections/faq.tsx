import { Plus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ru } from "@/content/ru";

const { faq } = ru;

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow={faq.eyebrow} title={faq.title} />
        </div>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {faq.items.map((item) => (
              <li key={item.question}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium transition-colors duration-150 hover:text-accent">
                    {item.question}
                    <Plus
                      className="mt-1 size-4 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {item.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
