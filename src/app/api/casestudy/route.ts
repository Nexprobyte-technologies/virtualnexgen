import { NextResponse } from "next/server";
import { getAllCaseStudies } from "@/lib/casestudy";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getAllCaseStudies());
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { createCaseStudy } = await import("@/lib/casestudy");
  const created = createCaseStudy(body);
  return NextResponse.json(created, { status: 201 });
}
