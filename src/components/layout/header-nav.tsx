import Link from "next/link";
import { ru } from "@/content/ru";
import { cn } from "@/lib/cn";

const linkClass =
  "text-[0.9375rem] text-fg-muted transition-colors duration-150 hover:text-fg";

export function HeaderNav({
  className,
  listClassName,
}: {
  className?: string;
  listClassName?: string;
}) {
  return (
    <nav aria-label="Разделы страницы" className={className}>
      <ul className={cn("flex items-center gap-7", listClassName)}>
        {ru.nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClass}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
