import { deleteChatbotEntry, updateChatbotEntry } from "@/lib/chatbot";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;

  try {
    const body = (await request.json().catch(() => null)) as {
      question?: string;
      answer?: string;
      audio?: string;
    } | null;
    const question = String(body?.question ?? "").trim();
    const answer = String(body?.answer ?? "").trim();
    const audio = String(body?.audio ?? "").trim();

    if (!question && !answer) {
      return Response.json(
        { error: "Question or answer is required" },
        { status: 400 },
      );
    }

    const entry = await updateChatbotEntry(id, { question, answer, audio });
    if (!entry) {
      return Response.json({ error: "Entry not found" }, { status: 404 });
    }
    return Response.json({ ok: true, entry });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update chatbot entry";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const deleted = await deleteChatbotEntry(id);
  if (!deleted) {
    return Response.json({ error: "Entry not found" }, { status: 404 });
  }
  return Response.json({ ok: true });
}