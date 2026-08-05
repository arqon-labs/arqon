export type ContactFields = {
  name: string;
  contact: string;
  message: string;
};

export type ContactPayload = ContactFields & {
  company: string;
  startedAt: number;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactResult =
  | { status: "ok" }
  | { status: "error"; message: string }
  | { status: "invalid"; fieldErrors: FieldErrors };

export const limits = {
  name: { min: 2, max: 80 },
  contact: { min: 3, max: 120 },
  message: { min: 20, max: 4000 },
  company: { max: 200 },
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const telegramPattern = /^@?[a-zA-Z][a-zA-Z0-9_]{3,31}$/;
const phonePattern = /^\+?(?:\([0-9]{1,4}\)|[0-9])[0-9\s()-]{5,19}$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeContactMethod(value: string): string {
  const telegramLink = value.match(
    /^(?:https?:\/\/)?(?:t\.me|telegram\.me)\/([a-zA-Z][a-zA-Z0-9_]{3,31})$/i,
  );
  if (telegramLink) return `@${telegramLink[1]}`;

  const tgResolve = value.match(/^tg:\/\/resolve\?domain=([a-zA-Z][a-zA-Z0-9_]{3,31})$/i);
  if (tgResolve) return `@${tgResolve[1]}`;

  return value;
}

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

/**
 * Validation without external dependencies: rules are simple and fully
 * enumerable, and a schema library would weigh more than the rest of the
 * client code. The same function runs on client and server, so rules stay
 * in sync.
 */
export function validateContact(
  input: unknown,
): { ok: true; data: ContactPayload } | { ok: false; errors: FieldErrors } {
  const source: Record<string, unknown> =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const name = asString(source.name);
  const contact = normalizeContactMethod(asString(source.contact));
  const message = asString(source.message);
  const company = asString(source.company).slice(0, limits.company.max);
  const startedAt = asNumber(source.startedAt);

  const errors: FieldErrors = {};

  if (name.length < limits.name.min) {
    errors.name = `Укажите имя — минимум ${limits.name.min} символа`;
  } else if (name.length > limits.name.max) {
    errors.name = "Слишком длинное имя";
  }

  if (contact.length < limits.contact.min) {
    errors.contact = "Укажите способ связи";
  } else if (contact.length > limits.contact.max) {
    errors.contact = "Слишком длинное значение";
  } else if (
    !emailPattern.test(contact) &&
    !telegramPattern.test(contact) &&
    !phonePattern.test(contact)
  ) {
    errors.contact = "Укажите email, Telegram-username или телефон";
  }

  if (message.length < limits.message.min) {
    errors.message = `Опишите задачу подробнее — минимум ${limits.message.min} символов`;
  } else if (message.length > limits.message.max) {
    errors.message = "Слишком длинное описание, лучше в Telegram";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, data: { name, contact, message, company, startedAt } };
}
