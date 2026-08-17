import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/sections/service-landing";
import { JsonLd } from "@/components/shared/json-ld";
import { ru } from "@/content/ru";
import { servicePageJsonLd } from "@/lib/json-ld";
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

  return (
    <>
      <ServiceLandingPage service={service} />
      <JsonLd data={servicePageJsonLd(service)} />
    </>
  );
}
