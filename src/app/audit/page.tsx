import type { Metadata } from "next";
import { AuditLanding } from "@/components/sections/audit/audit-landing";
import { JsonLd } from "@/components/shared/json-ld";
import { audit } from "@/content/audit";
import { auditRu } from "@/content/audit-ru";
import { auditPageJsonLd } from "@/lib/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: audit.title,
  description: audit.description,
  authors: [{ name: site.person.fullNameEn, url: site.url }],
  creator: site.person.fullNameEn,
  keywords: [
    "vibe code audit",
    "AI app security audit",
    "Cursor security audit",
    "Lovable security audit",
  ],
  alternates: {
    canonical: audit.path,
    languages: {
      en: audit.path,
      ru: auditRu.path,
      "x-default": auditRu.path,
    },
  },
  openGraph: {
    url: audit.path,
    title: audit.title,
    description: audit.description,
    locale: "en_US",
    alternateLocale: [site.locale],
    siteName: site.name,
  },
};

export default function AuditPage() {
  return (
    <>
      <AuditLanding content={audit} telegramEvent="audit_en_cta_click" />
      <JsonLd data={auditPageJsonLd(audit)} />
    </>
  );
}
