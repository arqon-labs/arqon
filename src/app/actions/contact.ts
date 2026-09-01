"use server";

import { headers } from "next/headers";
import { validateContact, type ContactResult } from "@/lib/contact-rules";
import { rateLimit } from "@/lib/rate-limit";
import { notifyNewLead } from "@/lib/notify";

const MIN_FILL_MS = 2500;

async function clientIp(): Promise<string> {
  const list = await headers();

  return (
    list.get("cf-connecting-ip") ??
    list.get("x-real-ip") ??
    list.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function submitContact(payload: unknown): Promise<ContactResult> {
  const parsed = validateContact(payload);

  if (!parsed.ok) return { status: "invalid", fieldErrors: parsed.errors };

  const input = parsed.data;

  // Honeypot and too-fast submission: return success to bots so we do not
  // reveal which check filtered them.
  if (input.company.length > 0) return { status: "ok" };
  if (input.startedAt > 0 && Date.now() - input.startedAt < MIN_FILL_MS) {
    return { status: "ok" };
  }

  const ip = await clientIp();
  const limit = rateLimit(`contact:${ip}`);

  if (!limit.ok) {
    return {
      status: "error",
      message: `Слишком много заявок. Через ${Math.ceil(
        limit.retryAfterSec / 60,
      )} мин или сразу в Telegram.`,
    };
  }

  try {
    await notifyNewLead(input, { ip });
    return { status: "ok" };
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message: "Попробуйте ещё раз или напишите в Telegram.",
    };
  }
}
