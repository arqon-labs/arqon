import { Resend } from "resend";
import type { ContactFields } from "./contact-rules";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildMessage(input: ContactFields, meta: { ip: string }): string {
  return [
    "<b>Новая заявка с arqon.by</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(input.name)}`,
    `<b>Связь:</b> ${escapeHtml(input.contact)}`,
    "",
    escapeHtml(input.message),
    "",
    `<i>IP: ${escapeHtml(meta.ip)}</i>`,
  ].join("\n");
}

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram credentials are not configured");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Telegram API responded with ${response.status}: ${await response.text()}`,
    );
  }
}

async function sendEmailCopy(input: ContactFields): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !from || !to) return;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Заявка с arqon.by — ${input.name}`,
    text: [
      `Имя: ${input.name}`,
      `Связь: ${input.contact}`,
      "",
      input.message,
    ].join("\n"),
  });

  if (error) throw new Error(error.message);
}

/**
 * Telegram — основной канал: если он не доставлен, заявка считается потерянной.
 * Копия на почту отправляется как резерв и не влияет на результат.
 */
export async function notifyNewLead(
  input: ContactFields,
  meta: { ip: string },
): Promise<void> {
  await sendTelegram(buildMessage(input, meta));

  try {
    await sendEmailCopy(input);
  } catch (error) {
    console.error("[contact] email copy failed", error);
  }
}
