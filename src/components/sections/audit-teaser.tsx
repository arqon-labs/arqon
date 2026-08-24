import { TrackedButtonLink, TrackedLink } from "@/components/shared/tracked-link";
import { Spotlight } from "@/components/shared/spotlight";
import { buttonClass } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { audit } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";

export function AuditTeaser() {
  return (
    <Section>
      <Spotlight className="glow-edge rounded-lg border border-accent/20 bg-accent/[0.04]">
      <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="text-h3 font-medium">Собрали приложение с помощью ИИ?</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
            Проверю ключи, оплату и доступ к данным за 2 дня — отчёт простым языком, фикс $500.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <TrackedButtonLink
            event="audit_teaser_ru_click"
            href={auditRu.path}
            className="w-full sm:w-auto"
          >
            Аудит на русском
          </TrackedButtonLink>
          <TrackedLink
            event="audit_teaser_en_click"
            href={audit.path}
            className={buttonClass("secondary", "md", "w-full sm:w-auto")}
          >
            English audit page
          </TrackedLink>
        </div>
      </div>
      </Spotlight>
    </Section>
  );
}
