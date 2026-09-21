import { cookies } from "next/headers";
import { ADMIN_COOKIE, ADMIN_TOKEN, isValidCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;

  const username = String(body?.username ?? "");
  const password = String(body?.password ?? "");

  if (!isValidCredentials(username, password)) {
    return Response.json(
      { error: "Invalid username or password" },
      { status: 401 },
    );
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, ADMIN_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true });
}