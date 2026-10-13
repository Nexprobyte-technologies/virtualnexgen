import { cookies } from "next/headers";
import { ADMIN_COOKIE, createAdminSessionToken, isValidCredentials } from "@/lib/auth";

function getLoginServiceError(error: unknown): string {
  if (!process.env.DATABASE_URL) {
    return "Preview database is not configured: set DATABASE_URL for this deployment.";
  }

  const prismaError = error as { code?: string; message?: string };
  switch (prismaError.code) {
    case "P1000":
      return "Preview database rejected its credentials. Update DATABASE_URL for this deployment.";
    case "P1001":
    case "P1002":
      return "Preview database is unreachable. Check its host and network access.";
    case "P2021":
      return "Preview database is missing tables. Apply Prisma migrations to this database.";
    case "P2022":
      return "Preview database schema is out of date. Apply Prisma migrations to this database.";
  }

  if (prismaError.message?.includes("ADMIN_SESSION_SECRET")) {
    return "Admin session signing is not configured. Set ADMIN_SESSION_SECRET for this deployment.";
  }

  console.error("Admin login failed unexpectedly:", error);
  return "Admin login encountered a server error. Check the deployment logs.";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;

  const username = String(body?.username ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  try {
    if (!(await isValidCredentials(username, password))) {
      return Response.json(
        { error: "Invalid username or password" },
        { status: 401 },
      );
    }

    const store = await cookies();
    store.set(ADMIN_COOKIE, createAdminSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: getLoginServiceError(error) },
      { status: 503 },
    );
  }
}
