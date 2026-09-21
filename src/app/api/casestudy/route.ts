import { NextResponse } from "next/server";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/casestudy";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getAllCaseStudies());
}

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/vxs_admin=([^;]+)/);
  if (!isAuthed(match?.[1])) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { createCaseStudy } = await import("@/lib/casestudy");
  const created = createCaseStudy(body);
  return NextResponse.json(created, { status: 201 });
}
