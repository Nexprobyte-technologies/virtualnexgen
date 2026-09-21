import Link from "next/link";
import { getServices } from "@/lib/services";
import {
  ArrowRight,
  CalendarClock,
  Image,
  Layers,
  Server,
  FileText,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default async function AdminDashboard() {
  const services = await getServices();

  const totalSections = services.reduce(
    (n, s) => n + (s.sections?.length ?? 0),
    0,
  );
  const mediaCount =
    services.filter((s) => s.image).length +
    services.reduce(
      (n, s) => n + (s.sections?.filter((x) => x.image).length ?? 0),
      0,
    );
  const avgSections =
    services.length > 0 ? (totalSections / services.length).toFixed(1) : "0";
  const latest = services[0];

  const stats = [
    {
      label: "Total Services",
      value: services.length,
      trend: "Live in dropdown",
      icon: Server,
      tile: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Content Sections",
      value: totalSections,
      trend: `${avgSections} avg / service`,
      icon: Layers,
      tile: "bg-blue-50 text-blue-600",
    },
    {
      label: "Media Assets",
      value: mediaCount,
      trend: "Images in use",
      icon: Image,
      tile: "bg-orange-50 text-orange-600",
    },
    {
      label: "Latest Update",
      value: latest
        ? new Date(latest.createdAt).toLocaleDateString()
        : "—",
      trend: latest ? longestLabel(latest) : "No services yet",
      icon: CalendarClock,
      tile: "bg-violet-50 text-violet-600",
    },
  ];

  const quickActions = [
    {
      title: "Add Service",
      desc: "Create a new service that appears instantly in the dropdown.",
      href: "/admin/services",
      icon: FileText,
      accent: "from-brand-deep to-brand text-ink",
    },
    {
      title: "Manage Services",
      desc: "Edit and delete existing service content and media.",
      href: "/admin/services",
      icon: Layers,
      accent: "from-blue-500 to-slate-700 text-white",
    },
    {
      title: "View Site",
      desc: "Preview the public website with the latest updates.",
      href: "/",
      icon: Globe,
      accent: "from-emerald-500 to-teal-600 text-white",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.25)] lg:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-40 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent-light">
              Admin Dashboard
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight">
              Welcome, Admin{" "}
              <span className="inline-block animate-pulse">👋</span>
            </h2>
            <p className="mt-1.5 max-w-lg text-sm text-white/60">
              Manage your services, content sections and media from one clean,
              central place.
            </p>
          </div>
          <Link
            href="/admin/services"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_12px_30px_rgba(164,189,188,0.4)] transition hover:shadow-[0_12px_44px_rgba(164,189,188,0.55)]"
          >
            Add Service
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
              <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-3 w-3" />
                {stat.trend}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              target={action.href === "/" ? "_blank" : undefined}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-md"
            >
              <div
                className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${action.accent}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-slate-900">
                {action.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {action.desc}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-bold text-slate-900">Recent Services</h3>
          <Link
            href="/admin/services"
            className="text-xs font-semibold text-brand-dark transition hover:text-brand-deep"
          >
            View All →
          </Link>
        </div>
        {services.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500">
            No services yet — add your first one.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-2.5 font-semibold">Service</th>
                  <th className="hidden px-5 py-2.5 font-semibold sm:table-cell">
                    Slug
                  </th>
                  <th className="px-5 py-2.5 font-semibold">Sections</th>
                  <th className="hidden px-5 py-2.5 font-semibold md:table-cell">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.slice(0, 5).map((service) => (
                  <tr key={service.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.name}
                            className="h-9 w-9 shrink-0 rounded-lg border border-slate-200 object-cover"
                          />
                        ) : (
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-sm font-bold text-brand-dark">
                            {service.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="truncate font-semibold text-slate-800">
                          {service.name}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 text-xs text-slate-500 sm:table-cell">
                      /services/{service.slug}
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {service.sections?.length || 0}
                      </span>
                    </td>
                    <td className="hidden px-5 py-3 text-xs text-slate-500 md:table-cell">
                      {new Date(service.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function longestLabel(service: {
  name: string;
}): string {
  return service.name.length > 18
    ? "Latest addition"
    : service.name.length > 10
      ? "Recently updated"
      : "Newest service";
}