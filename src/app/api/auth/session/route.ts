import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAuthed } from "@/lib/auth";

export async function GET() {
  const store = await cookies();
  return Response.json({ authed: isAuthed(store.get(ADMIN_COOKIE)?.value) });
}