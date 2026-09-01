import { Section, SectionHeader } from "@/components/ui/section";
import { ServiceList } from "@/components/shared/service-list";
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
      <div className="mt-16">
        <ServiceList items={services.items} />
      </div>
    </Section>
  );
}
