import { addBlogPost, getBlogPosts } from "@/lib/blog";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const posts = await getBlogPosts();
  const list = posts.map(({ content, ...rest }) => rest);
  return Response.json({ posts: list });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => null)) as {
      title?: string;
      excerpt?: string;
      content?: string;
      image?: string;
      previewImage?: string;
      link?: string;
      author?: string;
      date?: string;
      status?: string;
      metaTitle?: string;
      metaDescription?: string;
      tags?: string[];
    } | null;
    const title = String(body?.title ?? "").trim();
    if (!title) {
      return Response.json({ error: "Post title is required" }, { status: 400 });
    }
    const tags = Array.isArray(body?.tags)
      ? body.tags.map((t) => String(t ?? "").trim()).filter(Boolean)
      : [];
    const post = await addBlogPost({
      title,
      excerpt: String(body?.excerpt ?? "").trim(),
      content: String(body?.content ?? "").trim(),
      image: String(body?.image ?? "").trim(),
      previewImage: String(body?.previewImage ?? "").trim(),
      link: String(body?.link ?? "").trim(),
      author: String(body?.author ?? "").trim() || "Virtual Nexgen Team",
      date: String(body?.date ?? "").trim(),
      status: body?.status === "draft" ? "draft" : "published",
      metaTitle: String(body?.metaTitle ?? "").trim(),
      metaDescription: String(body?.metaDescription ?? "").trim(),
      tags,
    });
    return Response.json({ ok: true, post }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add blog post";
    return Response.json({ error: message }, { status: 400 });
  }
}