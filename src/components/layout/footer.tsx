import Link from "next/link";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/shared/tracked-link";
import { BrandMark } from "@/components/layout/brand-mark";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";
import { servicePath } from "@/lib/services";

const linkClass =
  "text-[0.9375rem] text-fg-muted transition-colors duration-150 hover:text-fg";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden section-rule pt-14 pb-20">
      <Container className="relative z-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <BrandMark />
            <p className="mt-3 text-[0.9375rem] text-fg-muted">
              {ru.footer.description}
            </p>
            <p className="mt-3 text-[0.9375rem] text-fg-muted">
              {site.person.fullName}
            </p>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-fg-subtle">
              {ru.footer.terms}
            </p>
          </div>

          <div>
            <p className="font-mono text-meta uppercase text-fg-subtle">
              {ru.footer.servicesLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              {ru.services.items.map((item) => (
                <li key={item.slug}>
                  <Link href={servicePath(item.slug)} className={linkClass}>
                    {item.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-meta uppercase text-fg-subtle">
              {ru.footer.linksLabel}
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <TrackedLink
                  event="telegram_click"
                  href={site.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Telegram {site.contacts.telegramHandle}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  event="email_click"
                  href={`mailto:${site.contacts.email}`}
                  className={linkClass}
                >
                  {site.contacts.email}
                </TrackedLink>
              </li>
              <li>
                <a
                  href={site.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-meta text-fg-subtle sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}
            {ru.footer.rights ? `. ${ru.footer.rights}` : ""}
          </p>
          <p>
            {site.city} и удалённо
          </p>
        </div>
      </Container>
    </footer>
  );
}
