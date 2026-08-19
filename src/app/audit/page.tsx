import type { Metadata } from "next";
import { AuditLanding } from "@/components/sections/audit/audit-landing";
import { JsonLd } from "@/components/shared/json-ld";
import { audit } from "@/content/audit";
import { auditPageJsonLd } from "@/lib/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: audit.title,
  description: audit.description,
  alternates: { canonical: audit.path },
  openGraph: {
    url: audit.path,
    title: audit.title,
    description: audit.description,
    locale: "en_US",
    siteName: site.name,
  },
};

export default function AuditPage() {
  return (
    <>
      <AuditLanding />
      <JsonLd data={auditPageJsonLd()} />
    </>
  );
}
