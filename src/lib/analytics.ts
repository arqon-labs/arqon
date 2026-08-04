export type AnalyticsEvent =
  | "telegram_click"
  | "email_click"
  | "form_submit"
  | "form_error"
  | "cases_reached"
  | "scroll_50"
  | "scroll_90";

declare global {
  interface Window {
    umami?: { track: (event: string) => void };
  }
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.umami?.track(event);
}
