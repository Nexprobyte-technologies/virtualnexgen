"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { CaseStudy } from "@/lib/types";
import RichTextEditor from "@/components/RichTextEditor";

export default function AdminCaseStudyPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    industry: "",
    date: "",
    results: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [showForm, setShowForm] = useState(false);

  function loadStudies() {
    fetch("/api/casestudy")
      .then((r) => r.json())
      .then((data) => setStudies(Array.isArray(data) ? data : []))
      .catch(() => {});
  }

  useEffect(() => {
    loadStudies();
  }, []);

  function startCreate() {
    setEditing(null);
    setForm({ title: "", excerpt: "", content: "", image: "", industry: "", date: "", results: "" });
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
      setEditing(null);
      setForm({ title: "", excerpt: "", content: "", image: "", industry: "", date: "", results: "" });
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
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_4px_12px_rgba(164,189,188,0.3)] transition hover:shadow-[0_4px_20px_rgba(164,189,188,0.45)]"
          >
            <Plus className="h-4 w-4" /> Add Case Study
          </button>
        )}
      </div>

      {(showForm || editing) && (
      <>
      <div className="rounded-xl bg-white p-6 shadow space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {editing ? "Edit Case Study" : "Create Case Study"}
          </h2>
          {!editing && (
            <button
              onClick={() => { setShowForm(false); setForm({ title: "", excerpt: "", content: "", image: "", industry: "", date: "", results: "" }); }}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          )}
        </div>
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
          <label className="mb-1 block text-sm font-medium text-gray-700">Full Content</label>
          <RichTextEditor
            value={form.content ?? ""}
            onChange={(val) => setForm({ ...form, content: val })}
            rows={10}
          />
        </div>
        <textarea
          placeholder="Results"
          value={form.results ?? ""}
          onChange={(e) => setForm({ ...form, results: e.target.value })}
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : editing ? "Update" : "Create"}
          </button>
          {editing && (
            <button
              onClick={startCreate}
              className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
        {msg && <p className="text-sm text-gray-600">{msg}</p>}
      </div>

      <div className="space-y-3">
        {studies.map((study) => (
          <div
            key={study.slug}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow"
          >
            <div>
              <p className="font-semibold text-gray-900">{study.title}</p>
              <p className="text-sm text-gray-500">{study.industry} • {study.date}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(study)}
                className="rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(study.slug)}
                className="rounded-lg bg-cream-2 px-3 py-1.5 text-sm font-medium text-ink/70 hover:bg-line"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {studies.length === 0 && (
          <p className="text-center text-gray-500 py-8">No case studies yet.</p>
        )}
      </div>
      </>
      )}
    </div>
  );
}
