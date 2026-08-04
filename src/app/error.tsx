"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[page] render failed", error);
  }, [error]);

  return (
    <Container>
      <div className="flex min-h-[70dvh] flex-col justify-center py-24">
        <p className="font-mono text-meta uppercase text-fg-subtle">Ошибка</p>
        <h1 className="mt-5 max-w-xl text-h2 font-medium">
          {ru.errors.crashTitle}
        </h1>
        <p className="mt-5 max-w-md text-lead text-fg-muted">
          {ru.errors.crashText}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} size="lg">
            {ru.errors.crashCta}
          </Button>
          <a
            href={site.contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-md border border-line-strong bg-surface px-6 text-base font-medium transition-colors duration-150 hover:border-fg-subtle"
          >
            Telegram
          </a>
        </div>
      </div>
    </Container>
  );
}
