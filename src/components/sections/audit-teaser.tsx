import { TrackedButtonLink, TrackedLink } from "@/components/shared/tracked-link";
import { audit } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";
import { ru } from "@/content/ru";
import { Section, SectionHeader } from "@/components/ui/section";

const { auditTeaser } = ru;

export function AuditTeaser() {
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionHeader
          eyebrow={auditTeaser.eyebrow}
          title={auditTeaser.title}
          lead={auditTeaser.lead}
        />
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <TrackedButtonLink
            event="audit_teaser_ru_click"
            href={auditRu.path}
            className="w-full sm:w-auto"
          >
            {auditTeaser.cta}
          </TrackedButtonLink>
          <TrackedLink
            event="audit_teaser_en_click"
            href={audit.path}
            className="text-[0.9375rem] text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:text-fg"
          >
            {auditTeaser.langAlt}
          </TrackedLink>
        </div>
      </div>
    </Section>
  );
}
