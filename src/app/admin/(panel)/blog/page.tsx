"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Eye,
  FileText,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Pencil,
  Pilcrow,
  Plus,
  Quote,
  Search,
  Strikethrough,
  Trash2,
  Underline,
  Upload,
  X,
} from "lucide-react";
import { marked } from "marked";
import type { BlogPost } from "@/lib/types";

interface PostDraft {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  link: string;
  author: string;
  date: string;
  tags: string;
  file: File | null;
  preview: string;
}

const emptyDraft: PostDraft = {
  title: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  link: "",
  author: "Virtual Nexgen Team",
  date: new Date().toISOString().slice(0, 10),
  tags: "",
  file: null,
  preview: "",
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState("");
  const [draft, setDraft] = useState<PostDraft>(emptyDraft);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      setLoadError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setDraft((prev) => ({
      ...prev,
      file: f,
      imageUrl: "",
      preview: URL.createObjectURL(f),
    }));
  }

  function richTextToEditorHtml(text: string): string {
    try {
      return marked.parse(text) as string;
    } catch {
      return text;
    }
  }

  function syncEditorFromDraft() {
    const el = contentRef.current;
    if (!el) return;
    const normalized = draft.content ?? "";
    const markdownish =
      /(^|\n)(#{1,6}\s|[-*]\s|\d+\.\s|>\s)/.test(normalized) ||
      /\*\*[^*]+\*\*|`[^`]+`|__[^_]+__/.test(normalized);
    if (markdownish) {
      el.innerHTML = richTextToEditorHtml(normalized);
    } else if (!el.innerHTML) {
      el.innerHTML = normalized;
    }
  }

  useEffect(() => {
    syncEditorFromDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function execEdit(
    e: React.MouseEvent<HTMLButtonElement>,
    command: string,
    value?: string,
  ) {
    e.preventDefault();
    contentRef.current?.focus();
    document.execCommand(command, false, value);
    const html = contentRef.current?.innerHTML ?? "";
    if (html !== draft.content) {
      setDraft((prev) => ({ ...prev, content: html }));
    }
  }

  function addRichLink(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const url = window.prompt("Enter the link URL (https://...)");
    if (url === null) return;
    const clean = url.trim() || "https://";
    contentRef.current?.focus();
    document.execCommand("createLink", false, clean);
    const html = contentRef.current?.innerHTML ?? "";
    if (html !== draft.content) {
      setDraft((prev) => ({ ...prev, content: html }));
    }
  }

  function resetForm() {
    setDraft(emptyDraft);
    setEditingSlug(null);
    setFormError("");
    setSuccess("");
    if (contentRef.current) contentRef.current.innerHTML = "";
    if (fileRef.current) fileRef.current.value = "";
  }

  const filteredPosts = filter.trim()
    ? posts.filter((p) =>
        `${p.title} ${p.slug} ${p.author}`
          .toLowerCase()
          .includes(filter.trim().toLowerCase()),
      )
    : posts;

  async function uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.append("image", file);
    const res = await fetch("/api/blog/upload", { method: "POST", body: form });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.url) {
      throw new Error(data?.error ?? "Image upload failed");
    }
    return data.url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSuccess("");
    if (!draft.title.trim()) {
      setFormError("Post title is required");
      return;
    }
    setSubmitting(true);
    try {
      let imageUrl = draft.imageUrl;
      if (draft.file) imageUrl = await uploadImage(draft.file);

      const tags = draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const body = {
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content,
        image: imageUrl,
        link: draft.link,
        author: draft.author || "Virtual Nexgen Team",
        date: draft.date,
        tags,
      };
      const res = await fetch(
        editingSlug ? `/api/blog/${editingSlug}` : "/api/blog",
        {
          method: editingSlug ? "PUT" : "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setFormError(data?.error ?? "Failed to save post");
        return;
      }
      resetForm();
      setSuccess(
        editingSlug ? "Blog post updated successfully!" : "Blog post added successfully!",
      );
      await load();
      window.setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Network error, please try again");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(post: BlogPost) {
    setEditingSlug(post.slug);
    setDraft({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.image,
      link: post.link,
      author: post.author,
      date: post.date,
      tags: (post.tags ?? []).join(", "),
      file: null,
      preview: post.image,
    });
    const el = contentRef.current;
    if (el) {
      el.innerHTML = richTextToEditorHtml(post.content);
    }
    setFormError("");
    setSuccess("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
    if (res.ok) {
      if (editingSlug === slug) resetForm();
      await load();
    } else {
      setFormError("Failed to delete post");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/15 text-brand-dark">
              <FileText className="h-5 w-5" />
            </span>
            Blog Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add, edit and delete blog posts. Each post supports an image, excerpt,
            full content and an optional external link &mdash; everything renders on
            the public /blog page.
          </p>
        </div>
        {!showForm && !editingSlug && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_4px_12px_rgba(164,189,188,0.3)] transition hover:shadow-[0_4px_20px_rgba(164,189,188,0.45)]"
          >
            <Plus className="h-4 w-4" /> Add Blog Post
          </button>
        )}
      </div>

      {(showForm || editingSlug) && (
      <div
        ref={formRef}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">
            {editingSlug ? "Edit Blog Post" : "Add Blog Post"}
          </h3>
          {!editingSlug && (
            <button
              onClick={() => { setShowForm(false); resetForm(); }}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Title *
            </span>
            <input
              value={draft.title}
              onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
              required
              placeholder="e.g. AI Automation for Small Businesses"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Excerpt / Short Summary
            </span>
            <textarea
              value={draft.excerpt}
              onChange={(e) => setDraft((prev) => ({ ...prev, excerpt: e.target.value }))}
              rows={2}
              placeholder="Short summary shown on the blog card."
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <div>
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Full Content
            </span>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
                <button
                  type="button"
                  title="Heading 2"
                  onClick={(e) => execEdit(e, "formatBlock", "h2")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Heading2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Heading 3"
                  onClick={(e) => execEdit(e, "formatBlock", "h3")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Heading3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Paragraph"
                  onClick={(e) => execEdit(e, "formatBlock", "p")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Pilcrow className="h-4 w-4" />
                </button>
                <span className="mx-1 h-4 w-px bg-slate-300" />
                <button
                  type="button"
                  title="Bold"
                  onClick={(e) => execEdit(e, "bold")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Italic"
                  onClick={(e) => execEdit(e, "italic")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Underline"
                  onClick={(e) => execEdit(e, "underline")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Underline className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Strikethrough"
                  onClick={(e) => execEdit(e, "strikeThrough")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Strikethrough className="h-4 w-4" />
                </button>
                <span className="mx-1 h-4 w-px bg-slate-300" />
                <button
                  type="button"
                  title="Bulleted list"
                  onClick={(e) => execEdit(e, "insertUnorderedList")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Numbered list"
                  onClick={(e) => execEdit(e, "insertOrderedList")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Quote"
                  onClick={(e) => execEdit(e, "formatBlock", "blockquote")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Quote className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Horizontal line"
                  onClick={(e) => execEdit(e, "insertHorizontalRule")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="mx-1 h-4 w-px bg-slate-300" />
                <button
                  type="button"
                  title="Add link"
                  onClick={(e) => addRichLink(e)}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"
                >
                  <Link2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Clear formatting"
                  onClick={(e) => execEdit(e, "removeFormat")}
                  className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-ink/10 hover:text-ink"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div
                contentEditable
                ref={contentRef}
                suppressContentEditableWarning
                onInput={() => {
                  const el = contentRef.current;
                  if (!el) return;
                  setDraft((prev) => ({
                    ...prev,
                    content: el.innerHTML,
                  }));
                }}
                onBlur={() =>
                  setDraft((prev) => ({
                    ...prev,
                    content: contentRef.current?.innerHTML ?? prev.content,
                  }))
                }
                data-placeholder="Start writing your article here... Use the toolbar above to bold, italicize, add lists, headings, quotes or links. Press Enter for a new paragraph and Shift+Enter for a line break."
                className="prose-focus min-h-[340px] w-full resize-y px-4 py-3 text-sm leading-relaxed text-slate-800 outline-none [&:empty:before]:content-[attr(data-placeholder)] [&:empty:before]:pointer-events-none [&:empty:before]:text-slate-400"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Rich text is saved as HTML and rendered on the public page. Formatting
              like bold, italic, headings, lists, links and spacing is applied live.
            </p>
          </div>

          <div>
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Post Image
            </span>
            <div className="flex flex-col gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand hover:text-brand-dark"
              >
                <Upload className="h-4 w-4" /> Upload Image
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Link2 className="h-3.5 w-3.5 shrink-0" />
                <input
                  value={draft.imageUrl}
                  onChange={(e) => {
                    setDraft((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                      preview: "",
                      file: null,
                    }));
                  }}
                  placeholder="or paste image URL"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </div>
              {draft.preview && (
                <img
                  src={draft.preview}
                  alt="Preview"
                  className="mt-1 h-28 w-full rounded-lg object-cover"
                />
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">
                External Link (optional)
              </span>
              <input
                value={draft.link}
                onChange={(e) => setDraft((prev) => ({ ...prev, link: e.target.value }))}
                placeholder="https://..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">
                Author
              </span>
              <input
                value={draft.author}
                onChange={(e) => setDraft((prev) => ({ ...prev, author: e.target.value }))}
                placeholder="e.g. Virtual Nexgen Team"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Tags (comma separated)
            </span>
            <input
              value={draft.tags}
              onChange={(e) => setDraft((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="e.g. AI Automation, Business"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>

          <div className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">
                Publish Date
              </span>
              <input
                type="date"
                value={draft.date}
                onChange={(e) => setDraft((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
              />
            </label>

            {formError && (
              <p className="rounded-lg border border-cream-2 bg-cream-2 px-3 py-2 text-sm font-medium text-ink/70">
                {formError}
              </p>
            )}
            {success && (
              <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-6 py-2.5 text-sm font-semibold text-ink shadow-[0_10px_24px_rgba(164,189,188,0.3)] transition hover:shadow-[0_10px_36px_rgba(164,189,188,0.45)] disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : editingSlug ? (
                <>
                  <ImagePlus className="h-4 w-4" /> Save Changes
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Add Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FileText className="h-4 w-4 text-brand-dark" /> Posts
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {posts.length}
            </span>
          </h3>
        </div>
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>
        {loading ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            Loading posts...
          </p>
        ) : loadError ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">{loadError}</p>
        ) : filteredPosts.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            {posts.length === 0
              ? "No blog posts yet — add your first one."
              : "No posts match your search."}
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filteredPosts.map((post) => (
              <li key={post.id} className="flex items-start gap-3 p-4">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-14 w-14 shrink-0 rounded-lg border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-dark">
                    <FileText className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {post.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    /blog/{post.slug}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {post.author} · {post.date}
                    {post.link && " · has link"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(post)}
                    aria-label={`Edit ${post.title}`}
                    className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-brand/10 hover:text-brand-dark"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.slug)}
                    aria-label={`Delete ${post.title}`}
                    className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-ink/10 hover:text-ink"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}