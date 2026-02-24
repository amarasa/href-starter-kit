/**
 * Simple in-memory rate limiter.
 *
 * Tracks submissions per identifier (typically an IP address) and enforces
 * a maximum number of requests within a sliding time window. Stale entries
 * are cleaned up automatically to prevent unbounded memory growth.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

/** Remove entries older than the window so memory stays bounded. */
function cleanup(windowMs: number) {
  const now = Date.now();
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => cleanup(60 * 60 * 1000), 5 * 60 * 1000);
}

interface RateLimitOptions {
  /** Maximum number of requests allowed within the window. Default: 3 */
  maxRequests?: number;
  /** Time window in milliseconds. Default: 1 hour (3_600_000) */
  windowMs?: number;
}

/**
 * Check whether a given identifier has exceeded the rate limit.
 *
 * @returns `true` if the request should be **blocked**, `false` if it is allowed.
 */
export function isRateLimited(
  identifier: string,
  options: RateLimitOptions = {},
): boolean {
  const { maxRequests = 3, windowMs = 60 * 60 * 1000 } = options;
  const now = Date.now();

  let entry = store.get(identifier);

  if (!entry) {
    entry = { timestamps: [] };
    store.set(identifier, entry);
  }

  // Remove timestamps outside the current window
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (entry.timestamps.length >= maxRequests) {
    return true;
  }

  entry.timestamps.push(now);
  return false;
}
