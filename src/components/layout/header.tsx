import { Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TrackedButtonLink } from "@/components/shared/tracked-link";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <a
            href="#top"
            className="text-base font-semibold tracking-[0.14em] text-fg"
            aria-label={`${site.name} — на главную`}
          >
            {site.name}
          </a>

          <nav aria-label="Разделы страницы" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {ru.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.9375rem] text-fg-muted transition-colors duration-150 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <TrackedButtonLink
            event="telegram_click"
            href={site.contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <Send className="size-4" aria-hidden />
            Telegram
          </TrackedButtonLink>
        </div>
      </Container>
    </header>
  );
}
