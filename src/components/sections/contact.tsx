import { Mail, Send } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContactForm } from "@/components/contact-form";
import { TrackedButtonLink, TrackedLink } from "@/components/shared/tracked-link";
import { ru } from "@/content/ru";
import { site } from "@/lib/site";

const { contact } = ru;

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow={contact.eyebrow}
            title={contact.title}
            lead={contact.lead}
          />

          <TrackedButtonLink
            event="telegram_click"
            href={site.contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10"
          >
            <Send className="size-4" aria-hidden />
            {contact.telegramCta}
          </TrackedButtonLink>
          <p className="mt-3 text-[0.9375rem] text-fg-muted">{contact.telegramText}</p>

          <p className="mt-6 flex items-center gap-3 text-[0.9375rem] text-fg-muted">
            <Mail className="size-4 shrink-0 text-fg-subtle" aria-hidden />
            <span className="sr-only">{contact.emailTitle}: </span>
            <TrackedLink
              event="email_click"
              href={`mailto:${site.contacts.email}`}
              className="underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:text-fg"
            >
              {site.contacts.email}
            </TrackedLink>
          </p>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
