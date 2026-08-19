import Link from "next/link";

export function Breadcrumbs({
  label,
  items,
}: {
  label: string;
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-meta text-fg-subtle">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors duration-150 hover:text-fg">
                {item.label}
              </Link>
            ) : (
              <span className="text-fg-muted">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
