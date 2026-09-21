"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Eye,
  ImageIcon,
  Italic,
  Link2,
  List,
  Loader2,
  Minus,
  Pilcrow,
  Plus,
  Strikethrough,
  Underline,
  Upload,
  X,
} from "lucide-react";
import type { AboutSection } from "@/lib/types";

interface SectionDraft extends AboutSection {
  contentHtml: string;
  preview: string;
  file: File | null;
}

const emptySection = (): SectionDraft => ({
  id: crypto.randomUUID(),
  title: "",
  content: "",
  contentHtml: "",
  image: "",
  preview: "",
  file: null,
});

function richTextToEditorHtml(html: string): string {
  if (!html) return "";
  return html;
}

function execEdit(e: React.MouseEvent<HTMLButtonElement>, command: string, value?: string) {
  e.preventDefault();
  document.execCommand(command, false, value);
}

export default function AdminAboutPage() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [sections, setSections] = useState<SectionDraft[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const editorRefs = useRef<Record<string, HTMLDivElement>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement>>({});

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setHeroTitle(data.heroTitle || "");
          setHeroDescription(data.heroDescription || "");
          setSections(
            (data.sections || []).map((s: AboutSection) => ({
              ...s,
              contentHtml: s.content || "",
              preview: s.image || "",
              file: null,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  function addSection() {
    const sec = emptySection();
    setSections((prev) => [...prev, sec]);
    setTimeout(() => {
      const el = editorRefs.current[sec.id];
      if (el) el.focus();
    }, 100);
  }

  function updateSection(id: string, key: keyof SectionDraft, value: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  }

  function removeSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id));
    delete editorRefs.current[id];
    delete fileRefs.current[id];
  }

  function syncEditor(id: string) {
    const el = editorRefs.current[id];
    if (!el) return;
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, contentHtml: el.innerHTML, content: el.innerText } : s))
    );
  }

  function handleImageUpload(id: string, file: File) {
    const url = URL.createObjectURL(file);
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, file, preview: url, image: "" } : s))
    );
  }

  function removeImage(id: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, file: null, preview: "", image: "" } : s))
    );
    if (fileRefs.current[id]) fileRefs.current[id].value = "";
  }

  async function uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/blog/upload", { method: "POST", body: form });
    const data = await res.json();
    return data.url || "";
  }

  async function handleSave() {
    setSaving(true);
    setMsg("");
    try {
      const processed = await Promise.all(
        sections.map(async (s) => {
          let imageUrl = s.image;
          if (s.file) {
            imageUrl = await uploadImage(s.file);
          }
          return { id: s.id, title: s.title, content: s.contentHtml, image: imageUrl };
        })
      );

      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroTitle, heroDescription, sections: processed }),
      });
      if (res.ok) {
        setMsg("Saved successfully!");
        setSections((prev) =>
          prev.map((s) => ({ ...s, file: null, preview: s.image || s.preview }))
        );
      } else {
        setMsg("Error saving.");
      }
    } catch {
      setMsg("Error saving.");
    }
    setSaving(false);
  }

  const insertLink = useCallback((id: string) => {
    const url = prompt("Enter URL:");
    if (url) {
      setActiveSectionId(id);
      setTimeout(() => {
        const el = editorRefs.current[id];
        if (el) el.focus();
        document.execCommand("createLink", false, url);
        syncEditor(id);
      }, 50);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/15 text-brand-dark">
              <Plus className="h-5 w-5" />
            </span>
            About Page Content
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage hero content and page sections for the About Us page.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-xl bg-white p-6 shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
          <input
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Description</label>
          <textarea
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Sections</h2>
          <button
            onClick={addSection}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-4 py-2 text-sm font-semibold text-ink shadow-[0_4px_12px_rgba(164,189,188,0.3)] transition hover:shadow-[0_4px_20px_rgba(164,189,188,0.45)]"
          >
            <Plus className="h-4 w-4" /> Add Section
          </button>
        </div>

        {sections.map((section, i) => (
          <div key={section.id} className="rounded-xl bg-white p-6 shadow space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">Section {i + 1}</span>
              <button
                onClick={() => removeSection(section.id)}
                className="text-sm text-ink/50 hover:text-ink"
              >
                Remove
              </button>
            </div>

            <input
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => updateSection(section.id, "title", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />

            {/* Rich Text Toolbar */}
            <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 border-gray-300 bg-slate-50 px-2 py-1.5">
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "bold")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "italic")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "underline")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "strikeThrough")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </button>
              <div className="mx-1 h-5 w-px bg-gray-300" />
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "insertUnorderedList")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "insertOrderedList")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Numbered List"
              >
                <Eye className="h-4 w-4" />
              </button>
              <div className="mx-1 h-5 w-px bg-gray-300" />
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "formatBlock", "<p>")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Paragraph"
              >
                <Pilcrow className="h-4 w-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "formatBlock", "<h3>")}
                className="grid h-7 w-7 place-items-center rounded-md px-1 text-[10px] font-bold text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Heading"
              >
                H3
              </button>
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "insertHorizontalRule")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Horizontal Line"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="mx-1 h-5 w-px bg-gray-300" />
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertLink(section.id);
                }}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Insert Link"
              >
                <Link2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "removeFormat")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Clear Formatting"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Rich Text Editor */}
            <div
              ref={(el) => {
                if (el) {
                  editorRefs.current[section.id] = el;
                  if (!el.innerHTML && section.contentHtml) {
                    el.innerHTML = section.contentHtml;
                  }
                }
              }}
              contentEditable
              suppressContentEditableWarning
              onInput={() => syncEditor(section.id)}
              onFocus={() => setActiveSectionId(section.id)}
              className="min-h-[120px] rounded-b-lg border border-gray-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 prose prose-sm max-w-none"
              data-placeholder="Write your section content here..."
            />

            <p className="text-[11px] text-slate-400">
              Rich text is saved as HTML. Use the toolbar for bold, italic, links, lists and headings.
            </p>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Section Image</label>
              {(section.preview || section.image) ? (
                <div className="relative inline-block">
                  <img
                    src={section.preview || section.image}
                    alt="Preview"
                    className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
                  />
                  <button
                    onClick={() => removeImage(section.id)}
                    className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-cream-2 text-ink/60 shadow transition hover:bg-line"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : null}
              <div className="flex gap-2">
                <div
                  onClick={() => fileRefs.current[section.id]?.click()}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 text-center transition hover:border-brand hover:bg-cream-1"
                >
                  <Upload className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-500">Upload File</span>
                </div>
                <div className="flex flex-1 items-center">
                  <input
                    placeholder="Or paste image URL"
                    value={section.image}
                    onChange={(e) => {
                      updateSection(section.id, "image", e.target.value);
                      if (e.target.value) {
                        setSections((prev) => prev.map((s) => s.id === section.id ? { ...s, preview: "", file: null } : s));
                      }
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <input
                ref={(el) => { if (el) fileRefs.current[section.id] = el; }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(section.id, file);
                }}
              />
            </div>
          </div>
        ))}

        {sections.length === 0 && (
          <p className="text-center text-sm text-slate-500 py-8">
            No sections yet. Click &quot;Add Section&quot; to create one.
          </p>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-6 py-2.5 text-sm font-semibold text-ink shadow-[0_10px_24px_rgba(164,189,188,0.3)] transition hover:shadow-[0_10px_36px_rgba(164,189,188,0.45)] disabled:opacity-60"
      >
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </button>
      {msg && (
        <p className={`text-sm ${msg.includes("Error") ? "text-red-600" : "text-emerald-600"}`}>
          {msg}
        </p>
      )}
    </div>
  );
}
