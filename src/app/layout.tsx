import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@/components/shared/analytics";
import { HashScroll } from "@/components/shared/hash-scroll";
import { ru } from "@/content/ru";
import { fontClassName } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: ru.seo.title, template: `%s | ${site.name}` },
  description: ru.seo.description,
  applicationName: site.name,
  authors: [{ name: site.person.displayName, url: site.url }],
  creator: site.person.displayName,
  publisher: site.name,
  keywords: ru.seo.keywords,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
  other: {
    "geo.region": site.geo.regionCode,
    "geo.placename": site.city,
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.lang} className={fontClassName}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-[max(1rem,env(safe-area-inset-top))] focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к содержанию
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <HashScroll />
        <Analytics />
      </body>
    </html>
  );
}
