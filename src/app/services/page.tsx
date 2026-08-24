import type { Metadata } from "next";
import { ServicesIndexPage } from "@/components/sections/service-landing";
import { JsonLd } from "@/components/shared/json-ld";
import { ru } from "@/content/ru";
import { servicesIndexJsonLd } from "@/lib/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: ru.services.indexTitle,
  description: ru.services.indexDescription,
  alternates: { canonical: ru.services.path },
  openGraph: {
    url: ru.services.path,
    title: `${ru.services.indexTitle} | ${site.name}`,
    description: ru.services.indexDescription,
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesIndexPage />
      <JsonLd data={servicesIndexJsonLd()} />
    </>
  );
}
