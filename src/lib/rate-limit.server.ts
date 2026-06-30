import { getRequest } from "@tanstack/react-start/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}, 60_000);

export function rateLimit(opts: { max: number; windowMs: number }) {
  const request = getRequest();
  const ip = request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request?.headers.get("x-real-ip")
    || "unknown";

  const now = Date.now();
  const key = `${ip}:${request?.url ?? ""}`;
  const existing = store.get(key);

  if (existing && existing.resetAt > now) {
    if (existing.count >= opts.max) {
      throw new Error(`Too many requests. Try again later.`);
    }
    existing.count++;
  } else {
    store.set(key, { count: 1, resetAt: now + opts.windowMs });
  }
}
