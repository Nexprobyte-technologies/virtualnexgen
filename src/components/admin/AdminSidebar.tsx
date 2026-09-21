"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Server,
  PanelLeft,
  FileText,
  CalendarClock,
  Info,
  Briefcase,
  Phone,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/services", label: "Services", icon: Server },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/about", label: "About Page", icon: Info },
    { href: "/admin/casestudy", label: "Case Studies", icon: Briefcase },
    { href: "/admin/contacts", label: "Contact Page", icon: Phone },
    { href: "/admin/appointments", label: "Appointments", icon: CalendarClock },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="sticky top-0 flex h-screen w-[15%] min-w-44 shrink-0 flex-col bg-slate-900 text-white max-lg:hidden">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-4">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-deep to-brand text-ink">
          <PanelLeft className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold leading-tight">Virtual Nexgen</p>
          <p className="text-[10px] text-white/50">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <div>
          <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
            Main
          </p>
          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-gradient-to-r from-brand-deep to-brand text-ink shadow-[0_8px_20px_rgba(164,189,188,0.25)]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  {active && (
                    <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink/40" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}