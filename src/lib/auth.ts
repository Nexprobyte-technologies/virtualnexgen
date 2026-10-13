import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import prisma from "@/lib/db";

export const ADMIN_COOKIE = "vxs_admin";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ??
  process.env.DATABASE_URL ??
  (process.env.NODE_ENV !== "production" ? "virtualnexgen-local-admin-session" : undefined);
const INITIAL_ADMIN_USERNAME = "admin";
const INITIAL_ADMIN_PASSWORD = "admin@123";

function verifyAdminPassword(password: string, stored: string): boolean {
  const [algorithm, salt, expectedHex] = stored.split(":");
  if (algorithm !== "scrypt" || !salt || !expectedHex) return false;

  const expected = Buffer.from(expectedHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function isValidCredentials(username: string, password: string): Promise<boolean> {
  // Local development can run without PostgreSQL; production always uses the database.
  if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
    return username === INITIAL_ADMIN_USERNAME && password === INITIAL_ADMIN_PASSWORD;
  }

  let user = await prisma.adminUser.findUnique({ where: { username } });

  // Bootstrap the new account when the database is empty or still has only
  // the previous default admin account.
  if (
    !user &&
    username === INITIAL_ADMIN_USERNAME &&
    password === INITIAL_ADMIN_PASSWORD
  ) {
    const [adminCount, legacyAdmin] = await Promise.all([
      prisma.adminUser.count(),
      prisma.adminUser.findUnique({ where: { username: "admin" } }),
    ]);
    const canReplaceLegacyAdmin = adminCount === 1 && legacyAdmin !== null;

    if (adminCount === 0 || canReplaceLegacyAdmin) {
      const salt = randomBytes(16).toString("hex");
      const hash = scryptSync(password, salt, 64).toString("hex");
      try {
        user = await prisma.$transaction(async (transaction) => {
          if (legacyAdmin) {
            await transaction.adminUser.delete({ where: { id: legacyAdmin.id } });
          }
          return transaction.adminUser.create({
            data: { username, password: `scrypt:${salt}:${hash}` },
          });
        });
      } catch {
        // Another request may have created the account at the same time.
        user = await prisma.adminUser.findUnique({ where: { username } });
      }
    }
  }

  return Boolean(user && verifyAdminPassword(password, user.password));
}

export function createAdminSessionToken(): string {
  if (!SESSION_SECRET) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return createHmac("sha256", SESSION_SECRET).update("virtualnexgen-admin").digest("base64url");
}

export function isAuthed(token: string | null | undefined): boolean {
  if (!SESSION_SECRET || !token) return false;
  const expected = Buffer.from(createAdminSessionToken());
  const actual = Buffer.from(token);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function requireAdmin(): Promise<void> {
  const store = await cookies();
  if (!isAuthed(store.get(ADMIN_COOKIE)?.value)) {
    const error = new Error("Unauthorized");
    (error as Error & { status?: number }).status = 401;
    throw error;
  }
}
