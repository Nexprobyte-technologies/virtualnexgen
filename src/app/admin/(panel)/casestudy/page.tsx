"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { CaseStudy } from "@/lib/types";
import RichTextEditor from "@/components/RichTextEditor";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  industry: "",
  date: "",
  results: "",
};

export default function AdminCaseStudyPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  function loadStudies() {
    fetch("/api/casestudy")
      .then((r) => r.json())
      .then((data) => setStudies(Array.isArray(data) ? data : []))
      .catch(() => {});
  }

  useEffect(() => {
    loadStudies();
  }, []);

  useEffect(() => {
    const open = showForm || Boolean(editing);
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showForm, editing]);

  function startCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function startEdit(study: CaseStudy) {
    setEditing(study);
    setForm({
      title: study.title,
      excerpt: study.excerpt,
      content: study.content,
      image: study.image,
      industry: study.industry ?? "",
      date: study.date ?? "",
      results: study.results ?? "",
    });
    setShowForm(false);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    setMsg("");
  }

  async function handleSave() {
    setSaving(true);
    setMsg("");
    try {
      if (editing) {
        const res = await fetch(`/api/casestudy/${editing.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) setMsg("Updated!");
      } else {
        const res = await fetch("/api/casestudy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) setMsg("Created!");
      }
      loadStudies();
      closeForm();
    } catch {
      setMsg("Error saving.");
    }
    setSaving(false);
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this case study?")) return;
    await fetch(`/api/casestudy/${slug}`, { method: "DELETE" });
    loadStudies();
  }

  const totalPages = Math.max(Math.ceil(studies.length / pageSize), 1);
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const paginatedStudies = studies.slice((page - 1) * pageSize, page * pageSize);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/15 text-brand-dark">
              <Plus className="h-5 w-5" />
            </span>
            Case Studies
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add, edit and delete case studies showcasing your work.
          </p>
        </div>
        {!showForm && !editing && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] transition hover:shadow-[0_4px_20px_rgba(249,115,22,0.45)]"
          >
            <Plus className="h-4 w-4" /> Add Case Study
          </button>
        )}
      </div>

      {(showForm || editing) && (
        <>
          <div
            className="fixed inset-0 z-40 animate-[fade-in_0.2s_ease] bg-ink/40 backdrop-blur-[2px]"
            onClick={closeForm}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl animate-[drawer-in_0.25s_ease-out] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-slate-900">
                  {editing ? "Edit Case Study" : "Create Case Study"}
                </h3>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {editing
                    ? "Update this case study and publish your changes."
                    : "Add a new case study to the public /casestudy page."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-ink/10 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="Title"
                  value={form.title ?? ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  placeholder="Industry"
                  value={form.industry ?? ""}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  placeholder="Image URL"
                  value={form.image ?? ""}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  placeholder="Date (YYYY-MM-DD)"
                  value={form.date ?? ""}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <textarea
                placeholder="Excerpt"
                value={form.excerpt ?? ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Code2 className="h-4 w-4 text-brand-dark" /> Full Content
                </label>
                <RichTextEditor
                  value={form.content ?? ""}
                  onChange={(val) => setForm({ ...form, content: val })}
                  rows={12}
                />
              </div>
              <textarea
                placeholder="Results"
                value={form.results ?? ""}
                onChange={(e) => setForm({ ...form, results: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              {msg && <p className="text-sm text-gray-600">{msg}</p>}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-6 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                {saving ? "Saving..." : editing ? "Update Case Study" : "Create Case Study"}
              </button>
            </div>
          </div>
        </>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FileText className="h-4 w-4 text-brand-dark" /> Case Studies
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {studies.length}
            </span>
          </h3>
        </div>

        {studies.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            No case studies yet — add your first one.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 font-semibold">Case Study</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">Industry</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">Date</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedStudies.map((study) => (
                    <tr key={study.slug} className="transition hover:bg-slate-50/70">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {study.image ? (
                            <img
                              src={study.image}
                              alt={study.title}
                              className="h-11 w-11 shrink-0 rounded-lg border border-slate-200 object-cover"
                            />
                          ) : (
                            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-dark">
                              <FileText className="h-5 w-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="max-w-[220px] truncate font-semibold text-slate-800">
                              {study.title}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-slate-400">
                              /casestudy/{study.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-slate-500 sm:table-cell">
                        {study.industry || "—"}
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-slate-500 sm:table-cell">
                        {study.date || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(study)}
                            aria-label={`Edit ${study.title}`}
                            className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-brand/10 hover:text-brand-dark"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(study.slug)}
                            aria-label={`Delete ${study.title}`}
                            className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-ink/10 hover:text-ink"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {(page - 1) * pageSize + 1}–
                    {Math.min(page * pageSize, studies.length)}
                  </span>{" "}
                  of <span className="font-semibold text-slate-700">{studies.length}</span>
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {pageList(page, totalPages).map((pg, i) =>
                    pg === "…" ? (
                      <span key={`e-${i}`} className="px-1 text-xs text-slate-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={pg}
                        type="button"
                        onClick={() => setCurrentPage(pg)}
                        aria-label={`Page ${pg}`}
                        aria-current={pg === page ? "page" : undefined}
                        className={`min-w-[2rem] rounded-lg px-2 text-sm font-semibold transition ${
                          pg === page
                            ? "bg-gradient-to-r from-brand-deep to-brand text-white shadow"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand-dark"
                        }`}
                      >
                        {pg}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    aria-label="Next page"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}