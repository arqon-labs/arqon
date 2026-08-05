"use client";

import { useEffect } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] root render failed", error);
  }, [error]);

  return (
    <html lang={site.lang} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh antialiased">
        <Container>
          <div className="flex min-h-dvh flex-col justify-center py-24">
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
              <ButtonLink href="/" variant="secondary" size="lg">
                {ru.errors.homeCta}
              </ButtonLink>
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
      </body>
    </html>
  );
}
