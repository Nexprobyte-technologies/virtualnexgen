import { NextResponse } from "next/server";
import { getCaseStudyBySlug, updateCaseStudy, deleteCaseStudy } from "@/lib/casestudy";
import { isAuthed } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(study);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/vxs_admin=([^;]+)/);
  if (!isAuthed(match?.[1])) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await req.json();
  const updated = updateCaseStudy(slug, body);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/vxs_admin=([^;]+)/);
  if (!isAuthed(match?.[1])) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const deleted = deleteCaseStudy(slug);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
