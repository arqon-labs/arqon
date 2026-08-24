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

          <div className="mt-10 space-y-4">
            <div className="rounded-lg border border-accent/25 bg-accent/5 p-6">
              <div className="flex items-center gap-3">
                <Send className="size-4 text-accent" aria-hidden />
                <h3 className="text-[1.0625rem] font-medium">{contact.telegramTitle}</h3>
              </div>
              <p className="mt-3 text-[0.9375rem] text-fg-muted">{contact.telegramText}</p>
              <TrackedButtonLink
                event="telegram_click"
                href={site.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5"
              >
                {contact.telegramCta}
              </TrackedButtonLink>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-fg-subtle" aria-hidden />
                <h3 className="text-[1.0625rem] font-medium">{contact.emailTitle}</h3>
              </div>
              <TrackedLink
                event="email_click"
                href={`mailto:${site.contacts.email}`}
                className="mt-3 inline-block text-[0.9375rem] text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:text-fg"
              >
                {site.contacts.email}
              </TrackedLink>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
