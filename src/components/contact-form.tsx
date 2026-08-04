"use client";

import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { ArrowRight, Check, Send, TriangleAlert } from "lucide-react";
import { validateContact } from "@/lib/contact-rules";
import { submitContact } from "@/app/actions/contact";
import { track } from "@/lib/analytics";
import { Button, buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { ru } from "@/content/ru";

type FormValues = {
  name: string;
  contact: string;
  message: string;
  company: string;
  startedAt: number;
};

const resolver: Resolver<FormValues> = async (values) => {
  const result = validateContact(values);

  if (result.ok) return { values, errors: {} };

  const errors: Record<string, { type: string; message: string }> = {};

  for (const [field, message] of Object.entries(result.errors)) {
    if (message) errors[field] = { type: "validation", message };
  }

  return { values: {}, errors: errors as never };
};

const fieldClass =
  "w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-[0.9375rem] text-fg placeholder:text-fg-subtle transition-colors duration-150 hover:border-line-strong focus:border-accent focus:outline-none aria-[invalid=true]:border-danger";

const copy = ru.contact.form;

export function ContactForm() {
  const [failure, setFailure] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: "",
      contact: "",
      message: "",
      company: "",
      startedAt: 0,
    },
  });

  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setFailure(null);
    const result = await submitContact(values);

    if (result.status === "ok") {
      track("form_submit");
      setSent(true);
      return;
    }

    if (result.status === "invalid") {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        if (message) {
          setError(field as keyof FormValues, { type: "server", message });
        }
      }
      return;
    }

    track("form_error");
    setFailure(result.message);
  });

  if (sent) {
    return (
      <div className="rounded-lg border border-line bg-surface p-8">
        <div className="flex size-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
          <Check className="size-5 text-accent" aria-hidden />
        </div>
        <h3 className="mt-5 text-h3 font-medium">{copy.successTitle}</h3>
        <p className="mt-3 max-w-md text-fg-muted">{copy.successText}</p>
        <a
          href={site.contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("telegram_click")}
          className={buttonClass("secondary", "md", "mt-6")}
        >
          {copy.successCta}
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-lg border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="block text-[0.9375rem] font-medium">
            {copy.nameLabel}
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldClass, "mt-2")}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" role="alert" className="mt-2 text-meta text-danger">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-method"
            className="block text-[0.9375rem] font-medium"
          >
            {copy.contactLabel}
          </label>
          <input
            id="contact-method"
            type="text"
            autoComplete="email"
            placeholder={copy.contactPlaceholder}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "contact-error" : "contact-hint"}
            className={cn(fieldClass, "mt-2")}
            {...register("contact")}
          />
          {errors.contact ? (
            <p id="contact-error" role="alert" className="mt-2 text-meta text-danger">
              {errors.contact.message}
            </p>
          ) : (
            <p id="contact-hint" className="mt-2 text-meta text-fg-subtle">
              {copy.contactHint}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="lead-message" className="block text-[0.9375rem] font-medium">
          {copy.messageLabel}
        </label>
        <textarea
          id="lead-message"
          rows={5}
          placeholder={copy.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(fieldClass, "mt-2 resize-y")}
          {...register("message")}
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="mt-2 text-meta text-danger">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="sr-only" aria-hidden>
        <label htmlFor="lead-company">Company</label>
        <input
          id="lead-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />

      {failure ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-md border border-danger/40 bg-danger/10 p-4 text-[0.9375rem]"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
          <span>
            <strong className="font-medium">{copy.errorTitle}. </strong>
            {failure}
          </span>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? copy.submitting : copy.submit}
          <Send className="size-4" aria-hidden />
        </Button>
        <p className="text-meta leading-relaxed text-fg-subtle">{copy.privacy}</p>
      </div>
    </form>
  );
}
