import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { AuditTeaser } from "@/components/sections/audit-teaser";
import { Cases } from "@/components/sections/cases";
import { Formats } from "@/components/sections/formats";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { ScrollDepth } from "@/components/shared/scroll-depth";
import { JsonLd } from "@/components/shared/json-ld";
import { homeJsonLd } from "@/lib/json-ld";
import { ru } from "@/content/ru";

export const metadata: Metadata = {
  title: { absolute: ru.seo.title },
  description: ru.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: ru.seo.title,
    description: ru.seo.description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <AuditTeaser />
      <Cases />
      <Formats />
      <Faq />
      <Contact />

      <ScrollDepth />
      <JsonLd data={homeJsonLd()} />
    </>
  );
}
