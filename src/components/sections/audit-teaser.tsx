import { TrackedButtonLink, TrackedLink } from "@/components/shared/tracked-link";
import { audit } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";
import { Section } from "@/components/ui/section";

export function AuditTeaser() {
  return (
    <Section>
      <div className="flex flex-col gap-8 border-y border-line py-10 sm:py-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="text-h2 font-medium">Собрали на Cursor или Lovable?</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
            Проверю ключи и оплату за 2 дня. Отчёт простым языком, $500.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <TrackedButtonLink
            event="audit_teaser_ru_click"
            href={auditRu.path}
            className="w-full sm:w-auto"
          >
            Проверить приложение
          </TrackedButtonLink>
          <TrackedLink
            event="audit_teaser_en_click"
            href={audit.path}
            className="text-[0.9375rem] text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:text-fg"
          >
            English
          </TrackedLink>
        </div>
      </div>
    </Section>
  );
}
