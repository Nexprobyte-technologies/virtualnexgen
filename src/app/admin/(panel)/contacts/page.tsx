"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Clock,
  Inbox,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import type { ContactInfo } from "@/lib/contacts";
import type { Appointment } from "@/lib/types";

export default function AdminContactsPage() {
  const [form, setForm] = useState<ContactInfo>({
    phoneUS: "",
    phoneIndia: "",
    addressUS: "",
    addressIndia: "",
    email: "",
  });
  const [submissions, setSubmissions] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [contactsRes, appointmentsRes] = await Promise.all([
          fetch("/api/contacts"),
          fetch("/api/appointments"),
        ]);
        const contactsData = await contactsRes.json();
        if (contactsData) {
          setForm({
            phoneUS: contactsData.phoneUS || "",
            phoneIndia: contactsData.phoneIndia || "",
            addressUS: contactsData.addressUS || "",
            addressIndia: contactsData.addressIndia || "",
            email: contactsData.email || "",
          });
        }
        const appointmentsData = await appointmentsRes.json();
        const all: Appointment[] = appointmentsData.appointments || [];
        // Contact form submissions are stored with date "contact-request".
        const requests = all
          .filter((a) => a.date === "contact-request")
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
        setSubmissions(requests);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setMsg("Saved successfully!");
      else setMsg("Error saving.");
    } catch {
      setMsg("Error saving.");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  }

  function formatDate(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      {/* ================= Form Submissions ================= */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.25)] lg:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
            Contact Page
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
            Form Submissions
          </h2>
          <p className="mt-1.5 max-w-lg text-sm text-white/60">
            Messages received from the Contact Us form on the website.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Inbox className="h-4 w-4 text-slate-400" />
            Received Messages
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand-dark">
              {submissions.length}
            </span>
          </h3>
        </div>
        {loading ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">
            Loading...
          </p>
        ) : submissions.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">
            No form submissions yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-2.5 font-semibold">Client</th>
                  <th className="hidden px-5 py-2.5 font-semibold md:table-cell">
                    Contact
                  </th>
                  <th className="px-5 py-2.5 font-semibold">Message</th>
                  <th className="hidden px-5 py-2.5 font-semibold lg:table-cell">
                    Received
                  </th>
                  <th className="px-5 py-2.5 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((s) => (
                  <tr key={s.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-dark">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">
                            {s.name}
                          </p>
                          {s.company && (
                            <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                              <Building2 className="h-3 w-3" />
                              {s.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 md:table-cell">
                      <div className="space-y-1">
                        <a
                          href={`mailto:${s.email}`}
                          className="flex items-center gap-1.5 text-xs text-slate-600 transition hover:text-brand-dark"
                        >
                          <Mail className="h-3 w-3 text-slate-400" />
                          {s.email}
                        </a>
                        {s.phone && (
                          <a
                            href={`tel:${s.phone}`}
                            className="flex items-center gap-1.5 text-xs text-slate-600 transition hover:text-brand-dark"
                          >
                            <Phone className="h-3 w-3 text-slate-400" />
                            {s.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="max-w-xs px-5 py-3">
                      {s.message ? (
                        <p
                          className="line-clamp-2 text-xs leading-relaxed text-slate-600"
                          title={s.message}
                        >
                          <MessageSquare className="mr-1 inline h-3 w-3 text-slate-400" />
                          {s.message}
                        </p>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="hidden px-5 py-3 lg:table-cell">
                      <p className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {formatDate(s.createdAt)}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="rounded-lg bg-slate-50 p-1.5 text-slate-400 transition hover:bg-ink/10 hover:text-ink"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= Contact Page Content ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
              <Plus className="h-5 w-5" />
            </span>
            Contact Page Content
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Manage contact information displayed on the public Contact Us page.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-xl bg-[#132F4A] p-6 shadow border border-white/10">
<div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-white/70">
                Phone (US)
              </label>
              <input
                value={form.phoneUS ?? ""}
                onChange={(e) => setForm({ ...form, phoneUS: e.target.value })}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#06B6D4] focus:bg-white/10 focus:ring-2 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white/70">
                Phone (India)
              </label>
              <input
                value={form.phoneIndia ?? ""}
                onChange={(e) => setForm({ ...form, phoneIndia: e.target.value })}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#06B6D4] focus:bg-white/10 focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-white/70">
              Email
            </label>
            <input
              value={form.email ?? ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#06B6D4] focus:bg-white/10 focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-white/70">
              Address (US)
            </label>
            <input
              value={form.addressUS ?? ""}
              onChange={(e) => setForm({ ...form, addressUS: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#06B6D4] focus:bg-white/10 focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-white/70">
              Address (India)
            </label>
            <input
              value={form.addressIndia ?? ""}
              onChange={(e) => setForm({ ...form, addressIndia: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#06B6D4] focus:bg-white/10 focus:ring-2 focus:ring-white/20"
            />
          </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-[#06B6D4] px-6 py-2 text-sm font-medium text-white hover:bg-[#06B6D4]/90 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
      {msg && <p className="mt-4 text-sm text-white/70">{msg}</p>}
    </div>
  );
}
