type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;
const MAX_BUCKETS = 5000;

const buckets = new Map<string, Bucket>();

function prune(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Counter lives in process memory. Correct while the app runs as a single
 * instance (our case: one container behind Caddy). Scaling to multiple
 * replicas will require external storage.
 */
export function rateLimit(key: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) prune(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterSec: 0 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true, retryAfterSec: 0 };
}
