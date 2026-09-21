import { addChatbotEntry, getChatbotEntries } from "@/lib/chatbot";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const entries = await getChatbotEntries();
  return Response.json({ entries });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    const entry = await addChatbotEntry({ question, answer, audio });
    return Response.json({ ok: true, entry }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add chatbot entry";
    return Response.json({ error: message }, { status: 400 });
  }
}