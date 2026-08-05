import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Cases } from "@/components/sections/cases";
import { Formats } from "@/components/sections/formats";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { ScrollDepth } from "@/components/shared/scroll-depth";
import { faqSchema, personSchema, serviceSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Cases />
      <Formats />
      <Faq />
      <Contact />

      <ScrollDepth />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema(), serviceSchema(), faqSchema()]),
        }}
      />
    </>
  );
}
