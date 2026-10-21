import { addBlogPost, getBlogPosts, isBlogPostPublished } from "@/lib/blog";
import { requireAdmin } from "@/lib/auth";
import { toBlogPostSummary } from "@/lib/blog-seo";

export async function GET(request: Request) {
  // The list never needs the article body, so skip merging the full content.
  const posts = await getBlogPosts({ includeContent: false });
  const params = new URL(request.url).searchParams;
  const publishedOnly = params.get("published") === "1";

  const filtered = publishedOnly ? posts.filter(isBlogPostPublished) : posts;
  let result = filtered.map(toBlogPostSummary);
  const total = result.length;

  const limit = Number.parseInt(params.get("limit") ?? "", 10);
  const offset = Number.parseInt(params.get("offset") ?? "", 10);

  if (params.get("sort") === "date") {
    result = [...result].sort((a, b) => {
      const aDate = Date.parse(a.date);
      const bDate = Date.parse(b.date);
      const diff =
        (Number.isNaN(bDate) ? 0 : bDate) - (Number.isNaN(aDate) ? 0 : aDate);
      if (diff !== 0) return diff;
      const aCreated = Date.parse(a.createdAt);
      const bCreated = Date.parse(b.createdAt);
      return (
        (Number.isNaN(bCreated) ? 0 : bCreated) -
        (Number.isNaN(aCreated) ? 0 : aCreated)
      );
    });
  }

  if (Number.isFinite(offset) && offset > 0) {
    result = result.slice(offset);
  }
  if (Number.isFinite(limit) && limit > 0) {
    result = result.slice(0, limit);
  }

  return Response.json({ posts: result, total });
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