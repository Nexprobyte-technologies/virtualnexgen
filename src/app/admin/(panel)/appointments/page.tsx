"use client";

import { useEffect, useState } from "react";
import {
  CalendarClock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Trash2,
  XCircle,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
} from "lucide-react";
import type { Appointment } from "@/lib/types";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  async function fetchAppointments() {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this appointment?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  async function handleStatus(
    id: string,
    status: "confirmed" | "cancelled",
  ) {
    await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
  }

  const pending = appointments.filter((a) => a.status === "pending");
  const confirmed = appointments.filter((a) => a.status === "confirmed");
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  const totalPages = Math.max(
    Math.ceil(appointments.length / pageSize),
    1,
  );
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const paginatedAppointments = appointments.slice(
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

  const stats = [
    {
      label: "Total Bookings",
      value: appointments.length,
      icon: CalendarClock,
      tile: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending",
      value: pending.length,
      icon: Clock,
      tile: "bg-amber-50 text-amber-600",
    },
    {
      label: "Confirmed",
      value: confirmed.length,
      icon: CheckCircle,
      tile: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Cancelled",
      value: cancelled.length,
      icon: XCircle,
      tile: "bg-cream-2 text-ink/60",
    },
  ];

  function statusBadge(status: Appointment["status"]) {
    const styles = {
      pending:
        "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
      confirmed:
        "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      cancelled:
        "bg-cream-2 text-ink/60 ring-1 ring-line",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.25)] lg:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
            Appointments
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
            Manage Bookings
          </h2>
          <p className="mt-1.5 max-w-lg text-sm text-white/60">
            View and manage all client appointment requests.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {stat.label}
                </p>
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${stat.tile}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-bold text-slate-900">All Bookings</h3>
        </div>
        {loading ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">
            Loading...
          </p>
        ) : appointments.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">
            No appointments yet.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-2.5 font-semibold">Client</th>
                  <th className="hidden px-5 py-2.5 font-semibold md:table-cell">
                    Contact
                  </th>
                  <th className="px-5 py-2.5 font-semibold">Date & Time</th>
                  <th className="px-5 py-2.5 font-semibold">Status</th>
                  <th className="px-5 py-2.5 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedAppointments.map((apt) => (
                  <tr
                    key={apt.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-sm font-bold text-brand-dark">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">
                            {apt.name}
                          </p>
                          {apt.company && (
                            <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                              <Building2 className="h-3 w-3" />
                              {apt.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 md:table-cell">
                      <div className="space-y-1">
                        <p className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Mail className="h-3 w-3 text-slate-400" />
                          {apt.email}
                        </p>
                        {apt.phone && (
                          <p className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Phone className="h-3 w-3 text-slate-400" />
                            {apt.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-slate-700">
                        {apt.date}
                      </p>
                      <p className="text-xs text-slate-500">{apt.time}</p>
                    </td>
                    <td className="px-5 py-3">{statusBadge(apt.status)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        {apt.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatus(apt.id, "confirmed")
                              }
                              className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600 transition hover:bg-emerald-100"
                              title="Confirm"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatus(apt.id, "cancelled")
                              }
                              className="rounded-lg bg-cream-2 p-1.5 text-ink/50 transition hover:bg-line"
                              title="Cancel"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="rounded-lg bg-slate-50 p-1.5 text-slate-400 transition hover:bg-ink/10 hover:text-ink"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
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
                  {Math.min(page * pageSize, appointments.length)}
                </span>{" "}
                of <span className="font-semibold text-slate-700">{appointments.length}</span>
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
                          ? "bg-gradient-to-r from-brand-deep to-brand text-ink shadow"
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

      {appointments.some((a) => a.message) && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <MessageSquare className="h-4 w-4 text-slate-400" />
              Client Messages
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {appointments
              .filter((a) => a.message)
              .map((apt) => (
                <div key={apt.id} className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-slate-700">
                      {apt.name}
                    </p>
                    <span className="text-xs text-slate-400">·</span>
                    <p className="text-xs text-slate-400">
                      {apt.date} {apt.time}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{apt.message}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
