export function scrollOffsetPx(): number {
  const header = document.querySelector("header");
  if (header) {
    return header.getBoundingClientRect().height + scrollGapPx();
  }

  const styles = getComputedStyle(document.documentElement);
  const padding = parseFloat(styles.scrollPaddingTop);
  if (Number.isFinite(padding) && padding > 0) return padding;

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const height = parseFloat(
    styles.getPropertyValue(isMobile ? "--header-height-mobile" : "--header-height"),
  );
  const rootSize = parseFloat(styles.fontSize) || 16;

  return height * rootSize + scrollGapPx();
}

function scrollGapPx(): number {
  const styles = getComputedStyle(document.documentElement);
  const gap = parseFloat(styles.getPropertyValue("--scroll-gap"));
  const rootSize = parseFloat(styles.fontSize) || 16;
  return gap * rootSize;
}

export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
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
