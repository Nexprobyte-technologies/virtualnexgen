import { NextResponse } from "next/server";
import { getContacts, updateContacts } from "@/lib/contacts";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getContacts());
}

export async function PUT(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/vxs_admin=([^;]+)/);
  if (!isAuthed(match?.[1])) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updated = updateContacts(body);
  return NextResponse.json(updated);
}
