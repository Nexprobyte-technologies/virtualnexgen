"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  ExternalLink,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import type { Service } from "@/lib/types";

const TITLES: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": { title: "Dashboard", subtitle: "Overview of your services" },
  "/admin/services": { title: "Services", subtitle: "Manage your service content" },
};

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [queryOpen, setQueryOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef<HTMLDivElement>(null);

  const meta = TITLES[pathname] ?? { title: "Admin Panel", subtitle: "" };

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data.services ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
      if (queryRef.current && !queryRef.current.contains(e.target as Node)) setQueryOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/admin/services`);
    setQueryOpen(false);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const filtered = query.trim()
    ? services.filter((s) =>
        s.name.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : services.slice(0, 5);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 lg:px-5">
        <div className="min-w-0 lg:hidden">
          <p className="truncate text-sm font-bold text-ink">VNX Admin</p>
        </div>

        <div className="hidden min-w-0 lg:block">
          <h1 className="truncate text-base font-bold text-slate-900">
            {meta.title}
          </h1>
          <p className="truncate text-xs text-slate-500">{meta.subtitle}</p>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="relative hidden w-64 md:block" ref={queryRef}>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <form onSubmit={submitSearch}>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setQueryOpen(true);
                }}
                onFocus={() => setQueryOpen(true)}
                placeholder="Search services…"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
              />
            </form>
            {queryOpen && (
              <div className="absolute right-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                {filtered.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-slate-500">
                    No services found
                  </p>
                ) : (
                  filtered.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setQueryOpen(false);
                        router.push(`/admin/services`);
                      }}
                      className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <span className="truncate">{s.name}</span>
                      <span className="text-xs text-slate-400">{s.sections?.length || 0}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen((v) => !v);
                setUserOpen(false);
              }}
              className="relative grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-brand hover:text-brand-dark"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-0.5 text-[10px] font-bold text-ink">
                {services.length}
              </span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full z-30 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-bold text-slate-900">Notifications</p>
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-xs font-semibold text-brand-dark">
                    {services.length} services live
                  </span>
                </div>
                <div className="max-h-72 overflow-auto">
                  {services.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-slate-500">
                      No services yet
                    </p>
                  ) : (
                    services.slice(0, 5).map((s) => (
                      <div
                        key={s.id}
                        className="flex items-start gap-3 px-4 py-3 transition hover:bg-slate-50"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">
                            {s.name}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {new Date(s.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <Link
                  href="/admin/services"
                  onClick={() => setNotifOpen(false)}
                  className="block border-t border-slate-100 px-4 py-2.5 text-center text-sm font-semibold text-brand-dark transition hover:bg-slate-50"
                >
                  View All
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={userRef}>
            <button
              onClick={() => {
                setUserOpen((v) => !v);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 transition hover:border-brand"
            >
              <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-brand-deep to-brand text-xs font-bold text-white">
                VN
              </span>
              <span className="hidden text-sm font-semibold text-slate-700 sm:block">
                Admin
              </span>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
            </button>
            {userOpen && (
              <div className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-bold text-slate-900">VNX Admin</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <div className="p-1.5">
                  <Link
                    href="/admin/services"
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    <Settings className="h-4 w-4 text-slate-400" /> Settings
                  </Link>
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    <ExternalLink className="h-4 w-4 text-slate-400" /> View Site
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink/70 transition hover:bg-cream-2"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}