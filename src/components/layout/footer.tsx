import Link from "next/link";
import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/shared/tracked-link";
import { BrandMark } from "@/components/layout/brand-mark";
import { blog } from "@/content/blog";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";
import { servicePath } from "@/lib/services";

const linkClass =
  "text-[0.9375rem] text-fg-muted transition-colors duration-150 hover:text-fg";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <BrandMark />
            <p className="mt-3 text-[0.9375rem] text-fg-muted">
              {ru.footer.description}
            </p>
            <p className="mt-3 text-[0.9375rem] text-fg-muted">
              {site.person.displayName} · {site.city}, {site.region}
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
              <li>
                <Link href={blog.path} className={linkClass}>
                  Блог
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-meta text-fg-subtle sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. {ru.footer.rights}
          </p>
          <p>
            {site.city}, {site.region}
          </p>
        </div>

        <p
          className="mt-10 select-none overflow-hidden font-medium leading-none tracking-[-0.07em] text-fg/[0.04] text-[clamp(4.5rem,16vw,11rem)]"
          aria-hidden
        >
          {site.name}
        </p>
      </Container>
    </footer>
  );
}
