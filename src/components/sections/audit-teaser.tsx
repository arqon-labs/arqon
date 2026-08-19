import Link from "next/link";
import { Section } from "@/components/ui/section";
import { buttonClass } from "@/components/ui/button";
import { servicePath } from "@/lib/services";
import { audit } from "@/content/audit";

export function AuditTeaser() {
  return (
    <Section>
      <div className="flex flex-col gap-8 rounded-lg border border-line bg-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="text-h3 font-medium">Собрали приложение с помощью ИИ?</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
            Проверю ключи, оплату и доступ к данным за 2 дня — отчёт простым языком.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href={servicePath("audit-ai")}
            className={buttonClass("primary", "md", "w-full sm:w-auto")}
          >
            Аудит на русском
          </Link>
          <Link
            href={audit.path}
            className={buttonClass("secondary", "md", "w-full sm:w-auto")}
          >
            English audit page
          </Link>
        </div>
      </div>
    </Section>
  );
}
