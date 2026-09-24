"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { ContactInfo } from "@/lib/contacts";

export default function AdminContactsPage() {
  const [form, setForm] = useState<ContactInfo>({
    phoneUS: "",
    phoneIndia: "",
    addressUS: "",
    addressIndia: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setForm({
            phoneUS: data.phoneUS || "",
            phoneIndia: data.phoneIndia || "",
            addressUS: data.addressUS || "",
            addressIndia: data.addressIndia || "",
            email: data.email || "",
          });
        }
      })
      .catch(() => {});
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/15 text-brand-dark">
              <Plus className="h-5 w-5" />
            </span>
            Contact Page Content
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage contact information displayed on the public Contact Us page.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-xl bg-white p-6 shadow">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone (US)</label>
            <input
              value={form.phoneUS ?? ""}
              onChange={(e) => setForm({ ...form, phoneUS: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone (India)</label>
            <input
              value={form.phoneIndia ?? ""}
              onChange={(e) => setForm({ ...form, phoneIndia: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            value={form.email ?? ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Address (US)</label>
          <input
            value={form.addressUS ?? ""}
            onChange={(e) => setForm({ ...form, addressUS: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Address (India)</label>
          <input
            value={form.addressIndia ?? ""}
            onChange={(e) => setForm({ ...form, addressIndia: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
      {msg && <p className="text-sm text-gray-600">{msg}</p>}
    </div>
  );
}
