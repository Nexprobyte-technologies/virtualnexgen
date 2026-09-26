"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  ChevronLeft,
  ChevronRight,
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
import type { BlogPost } from "@/lib/types";

interface PostDraft {
  // Basic fields
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  previewImageUrl: string;
  link: string;
  author: string;
  date: string;
  tags: string;
  status: "draft" | "published";
  file: File | null;
  preview: string;
  previewImage: string;

  // SEO fields
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robots: string;
}

const emptyDraft: PostDraft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  previewImageUrl: "",
  link: "",
  author: "Virtual Nexgen Team",
  date: new Date().toISOString().slice(0, 10),
  tags: "",
  status: "draft",
  file: null,
  preview: "",
  previewImage: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "article",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  robots: "index, follow",
};

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch("/api/blog");
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error ?? "Failed to load blog posts");
  return Array.isArray(data?.posts) ? data.posts : [];
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [activeTab, setActiveTab] = useState<"content">("content");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const previewFileRef = useRef<HTMLInputElement>(null);
  const ogFileRef = useRef<HTMLInputElement>(null);
  const twitterFileRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pendingEditorSync = useRef(false);

  const load = useCallback(async () => {
    try {
      const nextPosts = await fetchBlogPosts();
      setPosts(nextPosts);
      setLoadError("");
    } catch {
      setLoadError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchBlogPosts()
      .then((nextPosts) => {
        if (active) setPosts(nextPosts);
      })
      .catch(() => {
        if (active) setLoadError("Failed to load blog posts");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const open = isDrawerOpen;
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isDrawerOpen]);

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

  function handlePreviewFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setDraft((prev) => ({
      ...prev,
      previewImageUrl: "",
      previewImage: URL.createObjectURL(f),
    }));
  }

  function handleOgFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setDraft((prev) => ({
      ...prev,
      ogImage: "",
      ogImagePreview: URL.createObjectURL(f),
    }));
  }

  function handleTwitterFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setDraft((prev) => ({
      ...prev,
      twitterImage: "",
      twitterImagePreview: URL.createObjectURL(f),
    }));
  }

  useEffect(() => {
    if (!pendingEditorSync.current) return;
    pendingEditorSync.current = false;
    const frame = window.requestAnimationFrame(() => {
      if (contentRef.current) contentRef.current.innerHTML = draft.content ?? "";
    });
    return () => window.cancelAnimationFrame(frame);
  }, [draft.content, editingSlug, isDrawerOpen]);

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

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function resetForm() {
    pendingEditorSync.current = false;
    setDraft(emptyDraft);
    setEditingSlug(null);
    setFormError("");
    setSuccess("");
    if (contentRef.current) contentRef.current.innerHTML = "";
    if (fileRef.current) fileRef.current.value = "";
    if (previewFileRef.current) previewFileRef.current.value = "";
    if (ogFileRef.current) ogFileRef.current.value = "";
    if (twitterFileRef.current) twitterFileRef.current.value = "";
    setActiveTab("content");
  }

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
    if (!draft.slug.trim()) {
      setFormError("Slug is required");
      return;
    }
    setSubmitting(true);
    try {
      let imageUrl = draft.imageUrl;
      let previewImageUrl = draft.previewImageUrl;
      if (draft.file) imageUrl = await uploadImage(draft.file);
      if (draft.preview && draft.preview.startsWith("blob:")) {
        // If preview is a blob URL from file upload, we need to handle it
        // For now, use the imageUrl as preview
        previewImageUrl = imageUrl;
      }

      const tags = draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const body = {
        title: draft.title,
        slug: draft.slug,
        excerpt: draft.excerpt,
        content: draft.content,
        image: imageUrl,
        previewImage: previewImageUrl,
        link: draft.link,
        author: draft.author || "Virtual Nexgen Team",
        date: draft.date,
        tags,
        status: draft.status,
        // SEO fields
        metaTitle: draft.metaTitle,
        metaDescription: draft.metaDescription,
        metaKeywords: draft.metaKeywords,
        canonicalUrl: draft.canonicalUrl,
        ogTitle: draft.ogTitle,
        ogDescription: draft.ogDescription,
        ogImage: draft.ogImage,
        ogType: draft.ogType,
        twitterCard: draft.twitterCard,
        twitterTitle: draft.twitterTitle,
        twitterDescription: draft.twitterDescription,
        twitterImage: draft.twitterImage,
        robots: draft.robots,
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
    pendingEditorSync.current = true;
    setEditingSlug(post.slug);
    setDraft({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.image,
      previewImageUrl: post.previewImage || "",
      link: post.link,
      author: post.author,
      date: post.date,
      tags: (post.tags ?? []).join(", "),
      status: post.status || "published",
      file: null,
      preview: post.image,
      previewImage: post.previewImage || "",
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
      metaKeywords: post.metaKeywords || "",
      canonicalUrl: post.canonicalUrl || "",
      ogTitle: post.ogTitle || "",
      ogDescription: post.ogDescription || "",
      ogImage: post.ogImage || "",
      ogType: post.ogType || "article",
      twitterCard: post.twitterCard || "summary_large_image",
      twitterTitle: post.twitterTitle || "",
      twitterDescription: post.twitterDescription || "",
      twitterImage: post.twitterImage || "",
      robots: post.robots || "index, follow",
    });
    setFormError("");
    setSuccess("");
    setActiveTab("content");
    setIsDrawerOpen(true);
  }

  function handleAddNew() {
    setEditingSlug(null);
    setDraft(emptyDraft);
    setFormError("");
    setSuccess("");
    setActiveTab("content");
    setIsDrawerOpen(true);
  }

  function closeEditor() {
    setEditingSlug(null);
    setIsDrawerOpen(false);
    resetForm();
  }

  const filteredPosts = filter.trim()
    ? posts.filter((p) =>
        `${p.title} ${p.slug} ${p.author}`
          .toLowerCase()
          .includes(filter.trim().toLowerCase()),
      )
    : posts;

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const page = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function pageList(current: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set<number>([1, total, current - 1, current, current + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    const out: (number | "…")[] = [];
    let prev = 0;
    for (const p of sorted) {
      if (p - prev > 1) out.push("…");
      out.push(p);
      prev = p;
    }
    return out;
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
            Add, edit and delete blog posts. Each post supports full SEO configuration
            including meta tags, Open Graph, Twitter Cards, and schema markup.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] transition hover:shadow-[0_4px_20px_rgba(249,115,22,0.45)]"
        >
          <Plus className="h-4 w-4" /> Add Blog Post
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FileText className="h-4 w-4 text-brand-dark" /> Posts
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">{posts.length}</span>
          </h3>
        </div>
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }} placeholder="Search posts..." className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20" />
          </div>
        </div>

        {loading ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">Loading posts...</p>
        ) : loadError ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">{loadError}</p>
        ) : filteredPosts.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">{posts.length === 0 ? "No blog posts yet — add your first one." : "No posts match your search."}</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 font-semibold">Post</th>
                    <th className="hidden px-4 py-3 font-semibold md:table-cell">Slug</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">Author</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">Date</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">Status</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedPosts.map((post) => (
                    <tr key={post.id} className="transition hover:bg-slate-50/70">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {post.image ? (
                            <img src={post.image} alt={post.title} className="h-11 w-11 shrink-0 rounded-lg border border-slate-200 object-cover" />
                          ) : (
                            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-dark"><FileText className="h-5 w-5" /></div>
                          )}
                          <div className="min-w-0">
                            <p className="max-w-[220px] truncate font-semibold text-slate-800">{post.title}</p>
                            <p className="mt-0.5 truncate text-xs text-slate-400">/blog/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">{post.slug}</td>
                      <td className="hidden px-4 py-3 text-xs text-slate-500 sm:table-cell">{post.author}</td>
                      <td className="hidden px-4 py-3 text-xs text-slate-500 sm:table-cell">{post.date}</td>
                      <td className="hidden px-4 py-3 text-xs text-slate-500 sm:table-cell">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${post.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                          {post.status === "published" ? <Eye className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                          {post.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button type="button" onClick={() => handleEdit(post)} aria-label={`Edit ${post.title}`} className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-brand/10 hover:text-brand-dark"><Pencil className="h-3.5 w-3.5" /></button>
                          <button type="button" onClick={() => handleDelete(post.slug)} aria-label={`Delete ${post.title}`} className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-ink/10 hover:text-ink"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
                <p className="text-xs text-slate-500">Showing <span className="font-semibold text-slate-700">{(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredPosts.length)}</span> of <span className="font-semibold text-slate-700">{filteredPosts.length}</span></p>
                <div className="flex items-center gap-1">
                  <button type="button" disabled={page === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} aria-label="Previous page" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
                  {pageList(page, totalPages).map((pg, i) => pg === "…" ? (<span key={`e-${i}`} className="px-1 text-xs text-slate-400">…</span>) : (<button key={pg} type="button" onClick={() => setCurrentPage(pg)} aria-label={`Page ${pg}`} aria-current={pg === page ? "page" : undefined} className={`min-w-[2rem] rounded-lg px-2 text-sm font-semibold transition ${pg === page ? "bg-gradient-to-r from-brand-deep to-brand text-white shadow" : "border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand-dark"}`}>{pg}</button>))}
                  <button type="button" disabled={page === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} aria-label="Next page" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Side Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 animate-[fade-in_0.2s_ease] bg-ink/40 backdrop-blur-[2px]"
            onClick={closeEditor}
            onWheel={(e) => e.stopPropagation()}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex max-w-[85vw] w-full h-full animate-[drawer-in_0.25s_ease-out] flex-col bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 shrink-0">
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingSlug ? "Edit Blog Post" : "Add Blog Post"}
                </h3>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {editingSlug
                    ? "Update this blog post and publish your changes."
                    : "Create a new blog post for the public /blog page."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                aria-label="Close form"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-ink/10 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 min-h-0 overflow-y-auto px-6 py-5 space-y-5" style={{ overflowY: 'auto' }}>
              {/* Tab Navigation */}
              <div className="flex gap-1 border-b border-slate-200">
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-brand-dark border-b-2 border-brand bg-brand/5"
                >
                  <FileText className="h-4 w-4" />
                  Content
                </button>
              </div>

              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="space-y-4">
                  {/* Blog Title & Slug */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-600">Blog Title *</span>
                      <input
                        value={draft.title}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDraft((prev) => {
                            const shouldUpdateMeta = !prev.metaTitle || prev.metaTitle === prev.title;
                            return {
                              ...prev,
                              title: value,
                              metaTitle: shouldUpdateMeta ? value : prev.metaTitle,
                            };
                          });
                        }}
                        required
                        placeholder="e.g. AI Automation for Small Businesses"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-600">Slug *</span>
                      <input
                        value={draft.slug}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDraft((prev) => {
                            const shouldUpdateMeta = !prev.metaDescription || prev.metaDescription === prev.slug;
                            return {
                              ...prev,
                              slug: value,
                              metaDescription: shouldUpdateMeta ? value : prev.metaDescription,
                            };
                          });
                        }}
                        required
                        placeholder="auto-generated from title"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                      />
                    </label>
                  </div>

                  {/* Meta Title & Meta Description */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-600">Meta Title *</span>
                      <input
                        value={draft.metaTitle}
                        onChange={(e) => setDraft((prev) => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="SEO title (50-60 chars recommended)"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                        maxLength={60}
                        required
                      />
                      <p className="mt-1 text-xs text-slate-400">{draft.metaTitle.length}/60 chars</p>
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold text-slate-600">Meta Description *</span>
                      <textarea
                        value={draft.metaDescription}
                        onChange={(e) => setDraft((prev) => ({ ...prev, metaDescription: e.target.value }))}
                        rows={2}
                        placeholder="SEO description (150-160 chars recommended)"
                        className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                        maxLength={160}
                        required
                      />
                      <p className="mt-1 text-xs text-slate-400">{draft.metaDescription.length}/160 chars</p>
                    </label>
                  </div>

                  {/* Excerpt */}
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-slate-600">Excerpt / Short Summary</span>
                    <textarea
                      value={draft.excerpt}
                      onChange={(e) => setDraft((prev) => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                      placeholder="Short summary shown on the blog card."
                      className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
                    />
                  </label>

                  {/* Full Content */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="mb-1 block text-xs font-semibold text-slate-600">Full Content</span>
                      <span className="text-xs text-slate-400">HTML saved as-is</span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
                        <button type="button" title="Heading 2" onClick={(e) => execEdit(e, "formatBlock", "h2")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Heading2 className="h-4 w-4" /></button>
                        <button type="button" title="Heading 3" onClick={(e) => execEdit(e, "formatBlock", "h3")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Heading3 className="h-4 w-4" /></button>
                        <button type="button" title="Paragraph" onClick={(e) => execEdit(e, "formatBlock", "p")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Pilcrow className="h-4 w-4" /></button>
                        <span className="mx-1 h-4 w-px bg-slate-300" />
                        <button type="button" title="Bold" onClick={(e) => execEdit(e, "bold")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Bold className="h-4 w-4" /></button>
                        <button type="button" title="Italic" onClick={(e) => execEdit(e, "italic")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Italic className="h-4 w-4" /></button>
                        <button type="button" title="Underline" onClick={(e) => execEdit(e, "underline")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Underline className="h-4 w-4" /></button>
                        <button type="button" title="Strikethrough" onClick={(e) => execEdit(e, "strikeThrough")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Strikethrough className="h-4 w-4" /></button>
                        <span className="mx-1 h-4 w-px bg-slate-300" />
                        <button type="button" title="Bulleted list" onClick={(e) => execEdit(e, "insertUnorderedList")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><List className="h-4 w-4" /></button>
                        <button type="button" title="Numbered list" onClick={(e) => execEdit(e, "insertOrderedList")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><ListOrdered className="h-4 w-4" /></button>
                        <button type="button" title="Quote" onClick={(e) => execEdit(e, "formatBlock", "blockquote")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Quote className="h-4 w-4" /></button>
                        <button type="button" title="Horizontal line" onClick={(e) => execEdit(e, "insertHorizontalRule")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Minus className="h-4 w-4" /></button>
                        <span className="mx-1 h-4 w-px bg-slate-300" />
                        <button type="button" title="Add link" onClick={(e) => addRichLink(e)} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-brand/15 hover:text-brand-dark"><Link2 className="h-4 w-4" /></button>
                        <button type="button" title="Clear formatting" onClick={(e) => execEdit(e, "removeFormat")} className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-ink/10 hover:text-ink"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div
                        contentEditable
                        ref={contentRef}
                        suppressContentEditableWarning
                        onInput={() => {
                          const el = contentRef.current;
                          if (!el) return;
                          setDraft((prev) => ({ ...prev, content: el.innerHTML }));
                        }}
                        onBlur={() => setDraft((prev) => ({ ...prev, content: contentRef.current?.innerHTML ?? prev.content }))}
                        data-placeholder="Start writing your article here... Use the toolbar above to format."
                        className="prose-focus min-h-[400px] w-full resize-y px-4 py-3 text-sm leading-relaxed text-slate-800 outline-none [&:empty:before]:content-[attr(data-placeholder)] [&:empty:before]:pointer-events-none [&:empty:before]:text-slate-400"
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-400">Rich text is saved as HTML and rendered on the public page.</p>
                  </div>

                  {/* Featured Image */}
                  <div>
                    <span className="mb-1 block text-xs font-semibold text-slate-600">Featured Image</span>
                    <div className="flex flex-col gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
                      <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand hover:text-brand-dark"><Upload className="h-4 w-4" /> Upload Image</button>
                      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Link2 className="h-3.5 w-3.5 shrink-0" />
                        <input value={draft.imageUrl} onChange={(e) => setDraft((prev) => ({ ...prev, imageUrl: e.target.value, preview: "", file: null }))} placeholder="or paste image URL" className="w-full bg-transparent outline-none placeholder:text-slate-400" />
                      </div>
                      {draft.preview && <img src={draft.preview} alt="Preview" className="mt-1 h-[100px] w-[100px] rounded-lg object-cover" />}
                    </div>
                  </div>

                  {/* Blog Preview Image (og:image) */}
                  <div>
                    <span className="mb-1 block text-xs font-semibold text-slate-600">Blog Preview Image (Open Graph)</span>
                    <div className="flex flex-col gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
                      <button type="button" onClick={() => previewFileRef.current?.click()} className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand hover:text-brand-dark"><Upload className="h-4 w-4" /> Upload Preview Image</button>
                      <input ref={previewFileRef} type="file" accept="image/*" onChange={handlePreviewFile} className="hidden" />
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Link2 className="h-3.5 w-3.5 shrink-0" />
                        <input value={draft.previewImageUrl} onChange={(e) => setDraft((prev) => ({ ...prev, previewImageUrl: e.target.value, previewImage: "" }))} placeholder="or paste image URL" className="w-full bg-transparent outline-none placeholder:text-slate-400" />
                      </div>
                      {draft.previewImage && <img src={draft.previewImage} alt="Preview" className="mt-1 h-[100px] w-[100px] rounded-lg object-cover" />}
                    </div>
                  </div>

                  {/* External Link */}
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-slate-600">External Link (optional)</span>
                    <input value={draft.link} onChange={(e) => setDraft((prev) => ({ ...prev, link: e.target.value }))} placeholder="https://..." className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20" />
                  </label>
                </div>
              )}

              {/* Error/Success Messages */}
              {formError && <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{formError}</p>}
              {success && <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{success}</p>}

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)] transition hover:shadow-[0_10px_36px_rgba(249,115,22,0.45)] disabled:opacity-60"
                >
                  {submitting ? <> <Loader2 className="h-4 w-4 animate-spin" /> Saving... </> : editingSlug ? <> <ImagePlus className="h-4 w-4" /> Save Changes </> : <> <Plus className="h-4 w-4" /> Add Post </> }
                </button>
                <button
                  type="button"
                  onClick={closeEditor}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand-dark"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}