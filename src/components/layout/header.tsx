import Link from "next/link";
import { Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { HeaderNav } from "@/components/layout/header-nav";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="shrink-0 text-base font-semibold tracking-[0.14em] text-fg"
            aria-label={`${site.name} — на главную`}
          >
            {site.name}
          </Link>

          <div className="min-w-0 flex-1 overflow-x-auto">
            <HeaderNav className="mx-auto" />
          </div>

          <TrackedButtonLink
            event="telegram_click"
            href={site.contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="shrink-0"
          >
            <Send className="size-4" aria-hidden />
            Telegram
          </TrackedButtonLink>
        </div>
      </Container>
    </header>
  );
}
