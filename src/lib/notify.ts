import type { ContactFields } from "./contact-rules";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildMessage(input: ContactFields, meta: { ip: string }): string {
  return [
    "<b>New lead from arqon.by</b>",
    "",
    `<b>Name:</b> ${escapeHtml(input.name)}`,
    `<b>Contact:</b> ${escapeHtml(input.contact)}`,
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

/** Telegram is the only channel: if delivery fails, the lead is considered lost. */
export async function notifyNewLead(
  input: ContactFields,
  meta: { ip: string },
): Promise<void> {
  await sendTelegram(buildMessage(input, meta));
}
