import Link from "next/link";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const answer =
          item.link && item.answer.endsWith(item.link.label)
            ? item.answer.slice(0, -item.link.label.length).trim()
            : item.answer;

        return (
          <li key={item.question}>
            <details className="group border-l-2 border-transparent pl-4 transition-[border-color] duration-200 open:border-accent">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium transition-colors duration-150 hover:text-accent">
                {item.question}
                <Plus
                  className="mt-1 size-4 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-fg-muted">
                {item.link ? (
                  <>
                    {answer}{" "}
                    <Link
                      href={item.link.href}
                      className="text-fg transition-colors duration-150 hover:text-accent"
                    >
                      {item.link.label}
                    </Link>
                  </>
                ) : (
                  item.answer
                )}
              </p>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
