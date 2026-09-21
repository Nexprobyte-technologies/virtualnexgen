import { saveUpload } from "@/lib/service-form";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("image");
    if (!file || typeof file === "string" || file.size === 0) {
      return Response.json({ error: "No image uploaded" }, { status: 400 });
    }
    const url = await saveUpload(file);
    if (!url) {
      return Response.json({ error: "Upload failed" }, { status: 400 });
    }
    return Response.json({ ok: true, url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload image";
    return Response.json({ error: message }, { status: 400 });
  }
}