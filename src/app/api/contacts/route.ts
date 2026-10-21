import { NextResponse } from "next/server";
import { getContacts, updateContacts } from "@/lib/contacts";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getContacts());
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updated = updateContacts(body);
  return NextResponse.json(updated);
}
