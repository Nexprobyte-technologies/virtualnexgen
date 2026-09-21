import { promises as fs } from "fs";
import path from "path";
import { AUDIO_UPLOAD_DIR } from "@/lib/chatbot";
import { requireAdmin } from "@/lib/auth";

const ALLOWED_AUDIO_EXT = [".webm", ".mp3", ".wav", ".ogg", ".m4a", ".aac"];

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("audio");

    if (!file || typeof file === "string" || file.size === 0) {
      return Response.json({ error: "No audio uploaded" }, { status: 400 });
    }

    let ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_AUDIO_EXT.includes(ext)) {
      if (file.type === "audio/webm") ext = ".webm";
      else if (file.type === "audio/mp3") ext = ".mp3";
      else if (file.type === "audio/wav" || file.type === "audio/x-wav")
        ext = ".wav";
      else if (file.type === "audio/ogg") ext = ".ogg";
      else if (file.type === "audio/mp4") ext = ".m4a";
      else if (file.type === "audio/aac") ext = ".aac";
      else return Response.json({ error: "Unsupported audio type" }, { status: 400 });
    }

    await fs.mkdir(AUDIO_UPLOAD_DIR, { recursive: true });
    const name = `${Date.now()}-${Math.floor(Math.random() * 1e6)}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(AUDIO_UPLOAD_DIR, name), buffer);

    return Response.json({
      ok: true,
      url: `/uploads/chatbot/${name}`,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload audio";
    return Response.json({ error: message }, { status: 400 });
  }
}