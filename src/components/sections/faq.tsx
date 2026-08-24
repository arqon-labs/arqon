import { Section, SectionHeader } from "@/components/ui/section";
import { FaqList } from "@/components/shared/faq-list";
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
          <FaqList items={faq.items} />
        </div>
      </div>
    </Section>
  );
}
