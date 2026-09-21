import { NextResponse } from "next/server";
import { getAbout, updateAbout } from "@/lib/about";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  const about = getAbout();
  return NextResponse.json(about);
}

export async function PUT(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/vxs_admin=([^;]+)/);
  if (!isAuthed(match?.[1])) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updated = updateAbout(body);
  return NextResponse.json(updated);
}
