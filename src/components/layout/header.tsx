import { Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { HeaderNav } from "@/components/layout/header-nav";
import { BrandMark } from "@/components/layout/brand-mark";
import { HeaderChrome } from "@/components/layout/header-chrome";
import { site } from "@/lib/site";

export function Header() {
  return (
    <HeaderChrome>
      <Container>
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 md:flex md:h-16 md:gap-6">
          <BrandMark className="shrink-0" />

          <TrackedButtonLink
            event="telegram_click"
            href={site.contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="shrink-0 px-3 md:px-4"
            aria-label="Написать в Telegram"
          >
            <Send className="size-4" aria-hidden />
            <span className="hidden md:inline">Telegram</span>
          </TrackedButtonLink>

          <div
            className="nav-scroll col-span-2 -mx-5 overflow-x-auto border-t border-line/50 px-5 py-2 md:col-span-1 md:mx-0 md:min-w-0 md:flex-1 md:border-t-0 md:px-0 md:py-0 md:overflow-visible"
          >
            <HeaderNav className="md:mx-auto" />
          </div>
        </div>
      </Container>
    </HeaderChrome>
  );
}
