import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@/components/shared/analytics";
import { HashScroll } from "@/components/shared/hash-scroll";
import { site } from "@/lib/site";
import "./globals.css";

const title = "ARQON — разработка веб-продуктов: MVP, интеграции, платежи";
const description =
  "Senior fullstack инженер: MVP и SaaS-платформы, интеграции с платёжными провайдерами и 1С, аналитика, Telegram Mini Apps. Next.js, Go, TypeScript. Минск и удалённо.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.person.fullName, url: site.url }],
  creator: site.person.fullName,
  publisher: site.name,
  keywords: [
    "разработка MVP",
    "SaaS разработка",
    "Go разработчик",
    "Next.js разработка",
    "интеграция 1С",
    "платёжные интеграции",
    "Telegram Mini App разработка",
    "fullstack разработчик Минск",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.lang} className={`${GeistSans.variable} ${GeistMono.variable}`}>
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
