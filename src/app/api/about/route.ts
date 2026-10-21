import { NextResponse } from "next/server";
import { getAbout, updateAbout } from "@/lib/about";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const about = getAbout();
  return NextResponse.json(about);
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updated = updateAbout(body);
  return NextResponse.json(updated);
}
