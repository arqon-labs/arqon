import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ru } from "@/content/ru";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[70dvh] flex-col justify-center py-24">
        <p className="font-mono text-meta uppercase text-fg-subtle">404</p>
        <h1 className="mt-5 max-w-xl text-h2 font-medium">
          {ru.errors.notFoundTitle}
        </h1>
        <p className="mt-5 max-w-md text-lead text-fg-muted">
          {ru.errors.notFoundText}
        </p>
        <ButtonLink href="/" className="mt-9 self-start" size="lg">
          {ru.errors.notFoundCta}
        </ButtonLink>
      </div>
    </Container>
  );
}
