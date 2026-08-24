import Link from "next/link";

const locales = ["en", "ru"] as const;
const labels = { en: "Language", ru: "Язык" } as const;

export function LanguageSwitch({
  current,
  hrefs,
}: {
  current: "en" | "ru";
  hrefs: { en: string; ru: string };
}) {
  return (
    <nav aria-label={labels[current]}>
      <ul className="flex items-center gap-2 font-mono text-meta uppercase text-fg-subtle">
        {locales.map((lang, index) => (
          <li key={lang} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>·</span> : null}
            {lang === current ? (
              <span aria-current="page" className="text-fg-muted">
                {lang}
              </span>
            ) : (
              <Link
                href={hrefs[lang]}
                hrefLang={lang}
                className="transition-colors duration-150 hover:text-fg"
              >
                {lang}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
