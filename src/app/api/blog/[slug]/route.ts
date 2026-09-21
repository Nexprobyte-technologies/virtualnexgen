import { deleteBlogPost, getBlogPost, updateBlogPost } from "@/lib/blog";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  const post = await getBlogPost(slug);
  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }
  return Response.json({ post });
}

export async function PUT(
  request: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;

  try {
    const body = (await request.json().catch(() => null)) as {
      title?: string;
      excerpt?: string;
      content?: string;
      image?: string;
      link?: string;
      author?: string;
      date?: string;
      tags?: string[];
    } | null;
    const title = String(body?.title ?? "").trim();
    if (!title) {
      return Response.json({ error: "Post title is required" }, { status: 400 });
    }
    const tags = Array.isArray(body?.tags)
      ? body.tags.map((t) => String(t ?? "").trim()).filter(Boolean)
      : [];
    const post = await updateBlogPost(slug, {
      title,
      excerpt: String(body?.excerpt ?? "").trim(),
      content: String(body?.content ?? "").trim(),
      image: String(body?.image ?? "").trim(),
      link: String(body?.link ?? "").trim(),
      author: String(body?.author ?? "").trim() || "Virtual Nexgen Team",
      date: String(body?.date ?? "").trim(),
      tags,
    });
    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }
    return Response.json({ ok: true, post });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update blog post";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;
  const deleted = await deleteBlogPost(slug);
  if (!deleted) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }
  return Response.json({ ok: true });
}