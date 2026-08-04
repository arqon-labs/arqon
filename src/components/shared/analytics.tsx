const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
const websiteId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export function Analytics() {
  if (!src || !websiteId) return null;

  return <script defer src={src} data-website-id={websiteId} />;
}
