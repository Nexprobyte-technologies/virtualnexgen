type Attempt = {
  count: number;
  firstAt: number;
  blockedUntil: number;
};

const attempts = new Map<string, Attempt>();

const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

/**
 * Throttles repeated admin login failures for a given client.
 *
 * The counters live in the process memory, so this protects a single instance
 * from a brute force run. On a multi-instance deployment put a shared store
 * (Redis, database table) behind the same interface.
 */
export function getClientKey(request: Request, username: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";
  return `${ip}:${username.toLowerCase()}`;
}

export function isLoginBlocked(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;

  if (entry.blockedUntil > Date.now()) return true;

  // The block expired - start counting again from the next failure.
  if (Date.now() - entry.firstAt > WINDOW_MS) {
    attempts.delete(key);
  }
  return false;
}

export function recordLoginFailure(key: string): void {
  const now = Date.now();
  pruneLoginAttempts(now);
  const entry = attempts.get(key);

  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: now, blockedUntil: 0 });
    return;
  }

  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + BLOCK_MS;
  }
}

export function clearLoginFailures(key: string): void {
  attempts.delete(key);
}

/** Drops expired entries so the map cannot grow without bound. */
function pruneLoginAttempts(now: number): void {
  for (const [key, entry] of attempts) {
    if (entry.blockedUntil < now && now - entry.firstAt > WINDOW_MS) {
      attempts.delete(key);
    }
  }
}
