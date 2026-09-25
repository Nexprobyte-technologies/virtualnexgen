"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Eye,
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
  ChevronDown,
} from "lucide-react";
import type { AboutSection, AboutFeature } from "@/lib/types";

interface SectionDraft extends AboutSection {
  contentHtml: string;
  preview: string;
  file: File | null;
}

interface FeatureDraft extends AboutFeature {
  preview: string;
  file: File | null;
}

const emptySection = (): SectionDraft => ({
  id: crypto.randomUUID(),
  title: "",
  content: "",
  contentHtml: "",
  image: "",
  icon: "",
  preview: "",
  file: null,
});

function execEdit(e: React.MouseEvent<HTMLButtonElement>, command: string, value?: string) {
  e.preventDefault();
  document.execCommand(command, false, value);
}

const HEADING_OPTIONS = [
  { label: "Paragraph", value: "<p>" },
  { label: "H1", value: "<h1>" },
  { label: "H2", value: "<h2>" },
  { label: "H3", value: "<h3>" },
  { label: "H4", value: "<h4>" },
  { label: "H5", value: "<h5>" },
  { label: "H6", value: "<h6>" },
];

const FONT_COLORS = [
  { label: "Default", value: "#1e293b" },
  { label: "Red", value: "#dc2626" },
  { label: "Blue", value: "#2563eb" },
  { label: "Green", value: "#16a34a" },
  { label: "Purple", value: "#9333ea" },
  { label: "Orange", value: "#ea580c" },
  { label: "Teal", value: "#0d9488" },
  { label: "Pink", value: "#db2777" },
  { label: "Gray", value: "#6b7280" },
];

export default function AdminAboutPage() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [sections, setSections] = useState<SectionDraft[]>([]);
  const [features, setFeatures] = useState<FeatureDraft[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [headingDropdownOpen, setHeadingDropdownOpen] = useState<string | null>(null);
  const [colorDropdownOpen, setColorDropdownOpen] = useState<string | null>(null);
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
          setFeatures(
            (data.features || []).map((f: AboutFeature) => ({
              ...f,
              preview: f.image || "",
              file: null,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headingDropdownOpen) setHeadingDropdownOpen(null);
      if (colorDropdownOpen) setColorDropdownOpen(null);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [headingDropdownOpen, colorDropdownOpen]);

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

  function addFeature() {
    setFeatures((prev) => [
      ...prev,
      { id: crypto.randomUUID(), icon: "", title: "", text: "", image: "", preview: "", file: null },
    ]);
  }

  function updateFeature(id: string, key: keyof FeatureDraft, value: string) {
    setFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  }

  function removeFeature(id: string) {
    setFeatures((prev) => prev.filter((f) => f.id !== id));
  }

  function handleFeatureImageUpload(id: string, file: File) {
    const url = URL.createObjectURL(file);
    setFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, file, preview: url, image: "" } : f)));
  }

  function removeFeatureImage(id: string) {
    setFeatures((prev) => prev.map((f) => (f.id === id ? { ...f, file: null, preview: "", image: "" } : f)));
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
      const processedSections = await Promise.all(
        sections.map(async (s) => {
          let imageUrl = s.image;
          if (s.file) {
            imageUrl = await uploadImage(s.file);
          }
          return { id: s.id, title: s.title, icon: s.icon, content: s.contentHtml, image: imageUrl };
        })
      );

      const processedFeatures = await Promise.all(
        features.map(async (f) => {
          let imageUrl = f.image;
          if (f.file) {
            imageUrl = await uploadImage(f.file);
          }
          return { id: f.id, icon: f.icon, title: f.title, text: f.text, image: imageUrl };
        })
      );

      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroTitle, heroDescription, sections: processedSections, features: processedFeatures }),
      });
      if (res.ok) {
        setMsg("Saved successfully!");
        setSections((prev) =>
          prev.map((s) => ({ ...s, file: null, preview: s.image || s.preview }))
        );
        setFeatures((prev) =>
          prev.map((f) => ({ ...f, file: null, preview: f.image || f.preview }))
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

  function handleHeadingSelect(id: string, tag: string) {
    setActiveSectionId(id);
    setTimeout(() => {
      const el = editorRefs.current[id];
      if (el) el.focus();
      document.execCommand("formatBlock", false, tag);
      syncEditor(id);
      setHeadingDropdownOpen(null);
    }, 50);
  }

  function handleColorSelect(id: string, color: string) {
    setActiveSectionId(id);
    setTimeout(() => {
      const el = editorRefs.current[id];
      if (el) el.focus();
      document.execCommand("foreColor", false, color);
      syncEditor(id);
      setColorDropdownOpen(null);
    }, 50);
  }

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
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] transition hover:shadow-[0_4px_20px_rgba(249,115,22,0.45)]"
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

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Section Title"
                value={section.title ?? ""}
                onChange={(e) => updateSection(section.id, "title", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                placeholder="Icon name (e.g. Building2, Award, Sparkles)"
                value={section.icon || ""}
                onChange={(e) => updateSection(section.id, "icon", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

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

              <div className="mx-1 h-5 w-px bg-gray-300" />

              {/* Heading Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setHeadingDropdownOpen(headingDropdownOpen === section.id ? null : section.id);
                    setColorDropdownOpen(null);
                  }}
                  className="flex h-7 items-center gap-1 rounded-md px-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                  title="Heading"
                >
                  H <ChevronDown className="h-3 w-3" />
                </button>
                {headingDropdownOpen === section.id && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    {HEADING_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleHeadingSelect(section.id, opt.value);
                        }}
                        className="block w-full px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-cream-2"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Font Color Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setColorDropdownOpen(colorDropdownOpen === section.id ? null : section.id);
                    setHeadingDropdownOpen(null);
                  }}
                  className="flex h-7 items-center gap-1 rounded-md px-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                  title="Font Color"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white text-[10px] font-black">
                    A
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                {colorDropdownOpen === section.id && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    {FONT_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleColorSelect(section.id, c.value);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-cream-2"
                      >
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-gray-200"
                          style={{ backgroundColor: c.value }}
                        />
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mx-1 h-5 w-px bg-gray-300" />

              <button
                type="button"
                onMouseDown={(e) => execEdit(e, "insertHorizontalRule")}
                className="grid h-7 w-7 place-items-center rounded-md text-slate-600 transition hover:bg-cream-2 hover:text-ink"
                title="Horizontal Line"
              >
                <Minus className="h-4 w-4" />
              </button>
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
              Rich text is saved as HTML. Use toolbar for formatting.
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
                    value={section.image ?? ""}
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

      {/* Features Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Features (Why Choose Us)</h2>
          <button
            onClick={addFeature}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] transition hover:shadow-[0_4px_20px_rgba(249,115,22,0.45)]"
          >
            <Plus className="h-4 w-4" /> Add Feature
          </button>
        </div>

        {features.map((feature, i) => (
          <div key={feature.id} className="rounded-xl bg-white p-6 shadow space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">Feature {i + 1}</span>
              <button
                onClick={() => removeFeature(feature.id)}
                className="text-sm text-ink/50 hover:text-ink"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Feature Title"
                value={feature.title ?? ""}
                onChange={(e) => updateFeature(feature.id, "title", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                placeholder="Icon name (e.g. UserCheck, Clock)"
                value={feature.icon ?? ""}
                onChange={(e) => updateFeature(feature.id, "icon", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              placeholder="Feature description"
              value={feature.text ?? ""}
              onChange={(e) => updateFeature(feature.id, "text", e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />

            {/* Feature Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Feature Image</label>
              {(feature.preview || feature.image) ? (
                <div className="relative inline-block">
                  <img
                    src={feature.preview || feature.image}
                    alt="Preview"
                    className="h-24 w-24 rounded-lg border border-gray-200 object-cover"
                  />
                  <button
                    onClick={() => removeFeatureImage(feature.id)}
                    className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-cream-2 text-ink/60 shadow transition hover:bg-line"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : null}
              <div className="flex gap-2">
                <label
                  htmlFor={`feature-file-${feature.id}`}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 text-center transition hover:border-brand hover:bg-cream-1"
                >
                  <Upload className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-500">Upload File</span>
                </label>
                <input
                  id={`feature-file-${feature.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFeatureImageUpload(feature.id, file);
                  }}
                />
                <div className="flex flex-1 items-center">
                  <input
                    placeholder="Or paste image URL"
                    value={feature.image ?? ""}
                    onChange={(e) => {
                      updateFeature(feature.id, "image", e.target.value);
                      if (e.target.value) {
                        setFeatures((prev) => prev.map((f) => f.id === feature.id ? { ...f, preview: "", file: null } : f));
                      }
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {features.length === 0 && (
          <p className="text-center text-sm text-slate-500 py-8">
            No features yet. Click &quot;Add Feature&quot; to create one.
          </p>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)] transition hover:shadow-[0_10px_36px_rgba(249,115,22,0.45)] disabled:opacity-60"
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
