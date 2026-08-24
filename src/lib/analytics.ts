export type AnalyticsEvent =
  | "telegram_click"
  | "email_click"
  | "form_submit"
  | "form_error"
  | "cases_reached"
  | "scroll_50"
  | "scroll_90"
  | "audit_teaser_ru_click"
  | "audit_teaser_en_click"
  | "audit_repair_link_click"
  | "audit_ru_cta_click"
  | "audit_en_cta_click"
  | "blog_audit_cta_click";

declare global {
  interface Window {
    umami?: { track: (event: string) => void };
  }
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.umami?.track(event);
}
