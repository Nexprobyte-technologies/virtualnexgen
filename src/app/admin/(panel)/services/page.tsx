"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Upload,
  Link2,
  Loader2,
  Search,
  X,
  CheckCircle2,
  Pencil,
  Layers,
  Server,
  Sparkles,
  Zap,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Service, ServiceBenefit, ServiceStep, ServicePricing, ServiceTestimonial, ServiceFaq } from "@/lib/types";

const MAX_SECTIONS = 5;
const MAX_SERVICE_NAME = 60;

interface SectionDraft {
  id: string;
  heading: string;
  text: string;
  imageUrl: string;
  file: File | null;
  preview: string;
}

function makeSection(): SectionDraft {
  return {
    id: crypto.randomUUID(),
    heading: "",
    text: "",
    imageUrl: "",
    file: null,
    preview: "",
  };
}

function serviceToSections(service: Service): SectionDraft[] {
  const sections = service.sections?.length
    ? service.sections
    : service.content.slice(0, MAX_SECTIONS).map((text) => ({
        heading: "",
        text,
        image: "" as const,
      }));
  return sections.map((section) => ({
    id: crypto.randomUUID(),
    heading: section.heading,
    text: section.text,
    imageUrl: section.image,
    file: null,
    preview: section.image,
  }));
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState("");

  // form fields
  const [name, setName] = useState("");
  const [eyebrow, setEyebrow] = useState("");
  const [short, setShort] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaButton, setCtaButton] = useState("");
  const [ctaPhone, setCtaPhone] = useState("");
  const [ctaPoints, setCtaPoints] = useState<string[]>(["", "", "", "", ""]);
  const [benefits, setBenefits] = useState<ServiceBenefit[]>([
    { icon: "Zap", title: "", desc: "" },
  ]);
  const [steps, setSteps] = useState<ServiceStep[]>([
    { num: "01", title: "", desc: "" },
  ]);
  const [pricing, setPricing] = useState<ServicePricing[]>([
    { label: "", price: "", desc: "" },
  ]);
  const [testimonials, setTestimonials] = useState<ServiceTestimonial[]>([
    { quote: "", name: "", role: "" },
  ]);
  const [faqs, setFaqs] = useState<ServiceFaq[]>([{ q: "", a: "" }]);
  const [sections, setSections] = useState<SectionDraft[]>(() => [
    makeSection(),
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const fileRef = useRef<HTMLInputElement>(null);
  const sectionFileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data.services ?? []);
    } catch {
      setLoadError("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setServices(data.services ?? []);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Failed to load services");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const open = showForm || Boolean(editingSlug);
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showForm, editingSlug]);

  function handleMainFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setImageUrl("");
    setPreview(URL.createObjectURL(f));
  }

  function updateSection(index: number, patch: Partial<SectionDraft>) {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    );
  }

  function handleSectionFile(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const f = e.target.files?.[0];
    if (!f) return;
    updateSection(index, {
      file: f,
      imageUrl: "",
      preview: URL.createObjectURL(f),
    });
  }

  function removeSection(index: number) {
    setSections((prev) => prev.filter((_, i) => i !== index));
  }

  function clearSections() {
    setSections([makeSection()]);
    sectionFileRefs.current.forEach((ref) => {
      if (ref) ref.value = "";
    });
  }

  function resetForm() {
    setName("");
    setEyebrow("");
    setShort("");
    setImageUrl("");
    setFile(null);
    setPreview("");
    setCtaTitle("");
    setCtaText("");
    setCtaButton("");
    setCtaPhone("");
    setCtaPoints(["", "", "", "", ""]);
    setBenefits([{ icon: "Zap", title: "", desc: "" }]);
    setSteps([{ num: "01", title: "", desc: "" }]);
    setPricing([{ label: "", price: "", desc: "" }]);
    setTestimonials([{ quote: "", name: "", role: "" }]);
    setFaqs([{ q: "", a: "" }]);
    if (fileRef.current) fileRef.current.value = "";
    clearSections();
    setFormError("");
    setSuccess("");
    setEditingSlug(null);
  }

  const filteredServices = filter.trim()
    ? services.filter((s) =>
        `${s.name} ${s.slug}`
          .toLowerCase()
          .includes(filter.trim().toLowerCase()),
      )
    : services;

  const totalPages = Math.max(
    Math.ceil(filteredServices.length / pageSize),
    1,
  );
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const paginatedServices = filteredServices.slice(
    (page - 1) * pageSize,
    page * pageSize,
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSuccess("");
    if (!name.trim()) {
      setFormError("Service heading is required");
      return;
    }
    const wasEditing = editingSlug;
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("eyebrow", eyebrow);
      form.append("short", short);
      form.append("imageUrl", imageUrl);
      if (file) form.append("image", file);

      form.append("ctaTitle", ctaTitle);
      form.append("ctaText", ctaText);
      form.append("ctaButton", ctaButton);
      form.append("ctaPhone", ctaPhone);
      ctaPoints.forEach((point, i) => form.append(`ctaPoint_${i}`, point));

      const filteredBenefits = benefits.filter((b) => b.title.trim());
      if (filteredBenefits.length > 0) {
        form.append("benefits", JSON.stringify(filteredBenefits));
      }
      const filteredSteps = steps.filter((s) => s.title.trim());
      if (filteredSteps.length > 0) {
        form.append("steps", JSON.stringify(filteredSteps));
      }
      const filteredPricing = pricing.filter((p) => p.label.trim());
      if (filteredPricing.length > 0) {
        form.append("pricing", JSON.stringify(filteredPricing));
      }
      const filteredTestimonials = testimonials.filter((t) => t.quote.trim());
      if (filteredTestimonials.length > 0) {
        form.append("testimonials", JSON.stringify(filteredTestimonials));
      }
      const filteredFaqs = faqs.filter((f) => f.q.trim());
      if (filteredFaqs.length > 0) {
        form.append("faqs", JSON.stringify(filteredFaqs));
      }

      sections.forEach((section, i) => {
        form.append(`sectionHeading_${i}`, section.heading);
        form.append(`sectionText_${i}`, section.text);
        form.append(`sectionImageUrl_${i}`, section.imageUrl);
        if (section.file) form.append(`sectionImage_${i}`, section.file);
      });

      const res = await fetch(
        wasEditing ? `/api/services/${wasEditing}` : "/api/services",
        { method: wasEditing ? "PUT" : "POST", body: form },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setFormError(data?.error ?? "Failed to save service");
        return;
      }
      resetForm();
      setSuccess(
        wasEditing
          ? "Service updated successfully!"
          : "Service added successfully!",
      );
      await load();
      window.setTimeout(() => setSuccess(""), 4000);
    } catch {
      setFormError("Network error, please try again");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(service: Service) {
    setEditingSlug(service.slug);
    setName(service.name);
    setEyebrow(service.eyebrow ?? "");
    setShort(service.short ?? "");
    setImageUrl(service.image ?? "");
    setPreview(service.image ?? "");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
    setCtaTitle(service.ctaTitle ?? "");
    setCtaText(service.ctaText ?? "");
    setCtaButton(service.ctaButton ?? "");
    setCtaPhone(service.ctaPhone ?? "");
    setCtaPoints(
      service.ctaPoints?.length
        ? Array.from({ length: 5 }, (_, i) => service.ctaPoints?.[i] ?? "")
        : ["", "", "", "", ""],
    );
    setBenefits(
      service.benefits?.length
        ? service.benefits
        : [{ icon: "Zap", title: "", desc: "" }],
    );
    setSteps(
      service.steps?.length
        ? service.steps
        : [{ num: "01", title: "", desc: "" }],
    );
    setPricing(
      service.pricing?.length
        ? service.pricing
        : [{ label: "", price: "", desc: "" }],
    );
    setTestimonials(
      service.testimonials?.length
        ? service.testimonials
        : [{ quote: "", name: "", role: "" }],
    );
    setFaqs(
      service.faqs?.length ? service.faqs : [{ q: "", a: "" }],
    );
    setSections(
      serviceToSections(service).length > 0
        ? serviceToSections(service)
        : [makeSection()],
    );
    sectionFileRefs.current.forEach((ref) => {
      if (ref) ref.value = "";
    });
    setFormError("");
    setSuccess("");
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/services/${slug}`, { method: "DELETE" });
    if (res.ok) {
      if (editingSlug === slug) resetForm();
      await load();
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/15 text-brand-dark">
              <Plus className="h-5 w-5" />
            </span>
            Service Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add, edit and delete services. Each service supports rich content, benefits, steps, pricing, testimonials and FAQs.
          </p>
        </div>
        {!showForm && !editingSlug && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)] transition hover:shadow-[0_4px_20px_rgba(249,115,22,0.45)]"
          >
            <Plus className="h-4 w-4" /> Add Service
          </button>
        )}
      </div>

      {(showForm || editingSlug) && (
      <>
        <div
          className="fixed inset-0 z-40 animate-[fade-in_0.2s_ease] bg-ink/40 backdrop-blur-[2px]"
          onClick={() => { setShowForm(false); resetForm(); }}
        />
        <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl animate-[drawer-in_0.25s_ease-out] flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingSlug ? "Edit Service" : "Add New Service"}
              </h3>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {editingSlug
                  ? `Updating /services/${editingSlug}`
                  : "Create a new service that appears instantly in the dropdown."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setShowForm(false); resetForm(); }}
              aria-label="Close form"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-ink/10 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto px-5 py-4"
          >
            <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Heading Name *
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={MAX_SERVICE_NAME}
              placeholder="e.g. Bookkeeping Services"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Eyebrow Label
            </span>
            <input
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              placeholder="e.g. BOOKKEEPING SERVICES"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Short Text
            </span>
            <textarea
              value={short}
              onChange={(e) => setShort(e.target.value)}
              rows={3}
              placeholder="One or two sentence summary shown at the top of the page."
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>

          <div>
            <span className="mb-1 block text-xs font-semibold text-slate-600">
              Main Image
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
                onChange={handleMainFile}
                className="hidden"
              />
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Link2 className="h-3.5 w-3.5 shrink-0" />
                <input
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setPreview("");
                    setFile(null);
                  }}
                  placeholder="or paste image URL"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </div>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-1 h-24 w-full rounded-lg object-cover"
                />
              )}
            </div>
          </div>

          <div className="pt-1">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Layers className="h-4 w-4 text-brand-dark" />
              Page Sections (Content + Image)
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {sections.length} / {MAX_SECTIONS}
              </span>
            </p>

            <div className="space-y-2.5">
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2.5"
                >
                  <p className="mb-2 flex items-center justify-between text-xs font-bold text-slate-900">
                    Section {i + 1}
                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(i)}
                        className="grid h-6 w-6 place-items-center rounded-md bg-white text-slate-400 shadow-sm transition hover:text-red-500"
                        aria-label={`Remove section ${i + 1}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </p>
                  <input
                    value={section.heading ?? ""}
                    onChange={(e) =>
                      updateSection(i, { heading: e.target.value })
                    }
                    placeholder="Section heading"
                    className="mb-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                  />
                  <textarea
                    value={section.text ?? ""}
                    onChange={(e) =>
                      updateSection(i, { text: e.target.value })
                    }
                    rows={2}
                    placeholder="Section content text"
                    className="mb-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => sectionFileRefs.current[i]?.click()}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:text-brand-dark"
                    >
                      <Upload className="h-3.5 w-3.5" /> Image
                    </button>
                    <input
                      ref={(el) => {
                        sectionFileRefs.current[i] = el;
                      }}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSectionFile(i, e)}
                      className="hidden"
                    />
                    <input
                      value={section.imageUrl ?? ""}
                      onChange={(e) =>
                        updateSection(i, {
                          imageUrl: e.target.value,
                          file: null,
                          preview: "",
                        })
                      }
                      placeholder="or image URL"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-brand"
                    />
                  </div>
                  {section.preview && (
                    <img
                      src={section.preview}
                      alt={`Section ${i + 1} preview`}
                      className="mt-2 h-16 w-full rounded-lg object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            {sections.length < MAX_SECTIONS && (
              <button
                type="button"
                onClick={() => setSections((prev) => [...prev, makeSection()])}
                className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand hover:text-brand-dark"
              >
                <Plus className="h-3.5 w-3.5" /> Add Section
              </button>
            )}
          </div>

          <div className="pt-1">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Sparkles className="h-4 w-4 text-brand-dark" />
              Get Started (CTA) Section
            </p>
            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">
                  Heading
                </span>
                <input
                  value={ctaTitle}
                  onChange={(e) => setCtaTitle(e.target.value)}
                  placeholder="e.g. Ready to get started with Insurance VS?"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">
                  Description
                </span>
                <textarea
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  rows={2}
                  placeholder="Short paragraph shown under the heading."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">
                    Button Label
                  </span>
                  <input
                    value={ctaButton}
                    onChange={(e) => setCtaButton(e.target.value)}
                    placeholder="e.g. Book a Free Consultation"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">
                    Phone Number
                  </span>
                  <input
                    value={ctaPhone}
                    onChange={(e) => setCtaPhone(e.target.value)}
                    placeholder="e.g. +1 341 888 6504"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                  />
                </label>
              </div>
              <div>
                <span className="mb-1 block text-xs font-semibold text-slate-600">
                  Checklist Points (max 5)
                </span>
                {ctaPoints.map((point, i) => (
                  <div key={i} className="mb-2 flex items-center gap-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white text-[11px] font-bold text-brand-dark shadow-sm">
                      {i + 1}
                    </span>
                    <input
                      value={point}
                      onChange={(e) =>
                        setCtaPoints((prev) =>
                          prev.map((p, idx) =>
                            idx === i ? e.target.value : p,
                          ),
                        )
                      }
                      placeholder={`Checklist point ${i + 1}`}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="pt-1">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Zap className="h-4 w-4 text-brand-dark" />
              Benefits Section
            </p>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-white p-2 shadow-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand/10 text-xs font-bold text-brand-dark">
                    {i + 1}
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <input
                      value={b.title}
                      onChange={(e) => setBenefits((prev) => prev.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))}
                      placeholder="Benefit title"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-brand"
                    />
                    <input
                      value={b.desc}
                      onChange={(e) => setBenefits((prev) => prev.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))}
                      placeholder="Benefit description"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-brand"
                    />
                  </div>
                  {benefits.length > 1 && (
                    <button type="button" onClick={() => setBenefits((prev) => prev.filter((_, idx) => idx !== i))} className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400 hover:text-red-500">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setBenefits((prev) => [...prev, { icon: "Zap", title: "", desc: "" }])} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-brand hover:text-brand-dark">
                <Plus className="h-3.5 w-3.5" /> Add Benefit
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="pt-1">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-brand-dark" />
              How It Works (Steps)
            </p>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-white p-2 shadow-sm">
                  <input
                    value={s.num}
                    onChange={(e) => setSteps((prev) => prev.map((x, idx) => idx === i ? { ...x, num: e.target.value } : x))}
                    placeholder="01"
                    className="h-8 w-12 shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2 text-center text-xs font-bold text-slate-800 outline-none focus:border-brand"
                  />
                  <div className="flex-1 space-y-1.5">
                    <input
                      value={s.title}
                      onChange={(e) => setSteps((prev) => prev.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))}
                      placeholder="Step title"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-brand"
                    />
                    <input
                      value={s.desc}
                      onChange={(e) => setSteps((prev) => prev.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))}
                      placeholder="Step description"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-brand"
                    />
                  </div>
                  {steps.length > 1 && (
                    <button type="button" onClick={() => setSteps((prev) => prev.filter((_, idx) => idx !== i))} className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400 hover:text-red-500">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setSteps((prev) => [...prev, { num: String(prev.length + 1).padStart(2, "0"), title: "", desc: "" }])} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-brand hover:text-brand-dark">
                <Plus className="h-3.5 w-3.5" /> Add Step
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="pt-1">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Server className="h-4 w-4 text-brand-dark" />
              Pricing Comparison
            </p>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {pricing.map((p, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-white p-2 shadow-sm">
                  <div className="flex-1 space-y-1.5">
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        value={p.label}
                        onChange={(e) => setPricing((prev) => prev.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))}
                        placeholder="Label (e.g. In-House Staff)"
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-brand"
                      />
                      <input
                        value={p.price}
                        onChange={(e) => setPricing((prev) => prev.map((x, idx) => idx === i ? { ...x, price: e.target.value } : x))}
                        placeholder="Price (e.g. $55,000+)"
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-brand"
                      />
                    </div>
                    <input
                      value={p.desc}
                      onChange={(e) => setPricing((prev) => prev.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))}
                      placeholder="Description"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-brand"
                    />
                  </div>
                  <label className="flex items-center gap-1 text-[11px] text-slate-500">
                    <input
                      type="checkbox"
                      checked={p.highlighted || false}
                      onChange={(e) => setPricing((prev) => prev.map((x, idx) => idx === i ? { ...x, highlighted: e.target.checked } : x))}
                      className="rounded"
                    />
                    Highlight
                  </label>
                  {pricing.length > 1 && (
                    <button type="button" onClick={() => setPricing((prev) => prev.filter((_, idx) => idx !== i))} className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-400 hover:text-red-500">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setPricing((prev) => [...prev, { label: "", price: "", desc: "" }])} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-brand hover:text-brand-dark">
                <Plus className="h-3.5 w-3.5" /> Add Pricing Tier
              </button>
            </div>
          </div>

          {/* Testimonials */}
          <div className="pt-1">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Users className="h-4 w-4 text-brand-dark" />
              Testimonials
            </p>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {testimonials.map((t, i) => (
                <div key={i} className="rounded-lg bg-white p-2 shadow-sm space-y-1.5">
                  <textarea
                    value={t.quote}
                    onChange={(e) => setTestimonials((prev) => prev.map((x, idx) => idx === i ? { ...x, quote: e.target.value } : x))}
                    rows={2}
                    placeholder="Client quote"
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-brand"
                  />
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      value={t.name}
                      onChange={(e) => setTestimonials((prev) => prev.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))}
                      placeholder="Name"
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-brand"
                    />
                    <input
                      value={t.role}
                      onChange={(e) => setTestimonials((prev) => prev.map((x, idx) => idx === i ? { ...x, role: e.target.value } : x))}
                      placeholder="Role"
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-brand"
                    />
                  </div>
                  {testimonials.length > 1 && (
                    <button type="button" onClick={() => setTestimonials((prev) => prev.filter((_, idx) => idx !== i))} className="text-[11px] text-red-500 hover:underline">Remove</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setTestimonials((prev) => [...prev, { quote: "", name: "", role: "" }])} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-brand hover:text-brand-dark">
                <Plus className="h-3.5 w-3.5" /> Add Testimonial
              </button>
            </div>
          </div>

          {/* FAQs */}
          <div className="pt-1">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Sparkles className="h-4 w-4 text-brand-dark" />
              FAQs
            </p>
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
              {faqs.map((f, i) => (
                <div key={i} className="rounded-lg bg-white p-2 shadow-sm space-y-1.5">
                  <input
                    value={f.q}
                    onChange={(e) => setFaqs((prev) => prev.map((x, idx) => idx === i ? { ...x, q: e.target.value } : x))}
                    placeholder="Question"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-brand"
                  />
                  <textarea
                    value={f.a}
                    onChange={(e) => setFaqs((prev) => prev.map((x, idx) => idx === i ? { ...x, a: e.target.value } : x))}
                    rows={2}
                    placeholder="Answer"
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-brand"
                  />
                  {faqs.length > 1 && (
                    <button type="button" onClick={() => setFaqs((prev) => prev.filter((_, idx) => idx !== i))} className="text-[11px] text-red-500 hover:underline">Remove</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setFaqs((prev) => [...prev, { q: "", a: "" }])} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-brand hover:text-brand-dark">
                <Plus className="h-3.5 w-3.5" /> Add FAQ
              </button>
            </div>
          </div>

          {formError && (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {formError}
            </p>
          )}
          {success && (
            <p className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> {success}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(255,122,0,0.3)] transition hover:shadow-[0_10px_36px_rgba(255,122,0,0.45)] disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />{" "}
                {editingSlug ? "Saving..." : "Adding..."}
              </>
            ) : (
              <>
                {editingSlug ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {editingSlug ? "Save Changes" : "Add Service"}
              </>
            )}
          </button>
        </div>
        </form>
        </div>
      </>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-dark">
              <Server className="h-4 w-4" />
            </span>
            Recent Services
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {services.length}
            </span>
          </h2>
          {editingSlug && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
              Editing...
            </span>
          )}
        </div>

        <div className="border-b border-slate-100 px-4 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
              placeholder="Search services..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              Loading services...
            </p>
          ) : loadError ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              {loadError}
            </p>
          ) : filteredServices.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              {services.length === 0
                ? "No services yet — add your first one."
                : "No services match your search."}
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {paginatedServices.map((service) => (
                <li key={service.id} className="flex items-start gap-3 p-4">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-10 w-10 shrink-0 rounded-lg border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/15 text-sm font-bold text-brand-dark">
                      {service.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {service.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      /services/{service.slug}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {service.sections?.length || 0} sections ·{" "}
                      {new Date(service.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(service)}
                      aria-label={`Edit ${service.name}`}
                      className={`grid h-7 w-7 place-items-center rounded-md transition ${
                        editingSlug === service.slug
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500 hover:bg-brand/10 hover:text-brand-dark"
                      }`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.slug)}
                      aria-label={`Delete ${service.name}`}
                      className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!loading && !loadError && filteredServices.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filteredServices.length)}
              </span>{" "}
              of <span className="font-semibold text-slate-700">{filteredServices.length}</span>
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
      </div>
    </div>
  );
}