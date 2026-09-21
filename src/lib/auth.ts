import { cookies } from "next/headers";

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin@123";
export const ADMIN_COOKIE = "vxs_admin";
export const ADMIN_TOKEN = Buffer.from("admin:admin@123").toString("base64");

export function isValidCredentials(
  username: string,
  password: string,
): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function isAuthed(token: string | null | undefined): boolean {
  return token === ADMIN_TOKEN;
}

export async function requireAdmin(): Promise<void> {
  const store = await cookies();
  if (!isAuthed(store.get(ADMIN_COOKIE)?.value)) {
    const error = new Error("Unauthorized");
    (error as Error & { status?: number }).status = 401;
    throw error;
  }
}