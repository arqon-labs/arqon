"use client";

import { Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { HeaderNav } from "@/components/layout/header-nav";
import { BrandMark } from "@/components/layout/brand-mark";
import { HeaderChrome } from "@/components/layout/header-chrome";
import { enChrome, localeFromPath, ruChrome } from "@/lib/locale";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const copy = localeFromPath(pathname) === "en" ? enChrome : ruChrome();

  return (
    <HeaderChrome>
      <Container>
        <div className="flex flex-wrap items-center gap-x-3 md:h-16 md:flex-nowrap md:gap-8">
          <BrandMark className="shrink-0" homeLabel={copy.homeAria} />

          <TrackedButtonLink
            event="telegram_click"
            href={site.contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            variant="glass"
            size="md"
            className="ml-auto shrink-0 px-3 md:order-3 md:ml-0 md:px-4"
            aria-label={copy.telegramAria}
          >
            <Send className="size-4" aria-hidden />
            <span className="hidden md:inline">Telegram</span>
          </TrackedButtonLink>

          <div className="nav-scroll -mx-5 w-[calc(100%+2.5rem)] basis-full border-t border-line/50 px-5 py-2 md:order-2 md:mx-0 md:w-auto md:flex-1 md:basis-auto md:overflow-visible md:border-t-0 md:px-0 md:py-0">
            <HeaderNav className="md:mx-auto" />
          </div>
        </div>
      </Container>
    </HeaderChrome>
  );
}
