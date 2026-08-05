export function scrollOffsetPx(): number {
  const styles = getComputedStyle(document.documentElement);
  const padding = parseFloat(styles.scrollPaddingTop);
  if (Number.isFinite(padding) && padding > 0) return padding;

  const height = parseFloat(styles.getPropertyValue("--header-height"));
  const gap = parseFloat(styles.getPropertyValue("--scroll-gap"));
  const rootSize = parseFloat(styles.fontSize) || 16;

  return (height + gap) * rootSize;
}

export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollToHash(
  hash: string,
  behavior: ScrollBehavior = scrollBehavior(),
): void {
  const id = hash.replace(/^#/, "");

  if (!id) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const offset = scrollOffsetPx();
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior });
}
