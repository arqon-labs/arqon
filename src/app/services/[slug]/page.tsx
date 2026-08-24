import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuditLanding } from "@/components/sections/audit/audit-landing";
import { Contact } from "@/components/sections/contact";
import { ServiceLandingPage } from "@/components/sections/service-landing";
import { JsonLd } from "@/components/shared/json-ld";
import { audit } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";
import { ru } from "@/content/ru";
import { auditPageJsonLd, servicePageJsonLd } from "@/lib/json-ld";
import { serviceBySlug, servicePath } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ru.services.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) return {};

  if (service.id === "ai-audit") {
    return {
      title: auditRu.title,
      description: auditRu.description,
      alternates: {
        canonical: auditRu.path,
        languages: {
          ru: auditRu.path,
          en: audit.path,
          "x-default": auditRu.path,
        },
      },
      openGraph: {
        url: auditRu.path,
        title: `${auditRu.title} | ${site.name}`,
        description: auditRu.description,
        locale: site.locale,
        alternateLocale: ["en_US"],
        siteName: site.name,
      },
    };
  }

  const path = servicePath(service.slug);

  return {
    title: service.pageTitle,
    description: service.pageDescription,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${service.pageTitle} | ${site.name}`,
      description: service.pageDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  if (!service) notFound();

  if (service.id === "ai-audit") {
    return (
      <>
        <AuditLanding content={auditRu} telegramEvent="audit_ru_cta_click" />
        <Contact />
        <JsonLd data={auditPageJsonLd(auditRu)} />
      </>
    );
  }

  return (
    <>
      <ServiceLandingPage service={service} />
      <JsonLd data={servicePageJsonLd(service)} />
    </>
  );
}
