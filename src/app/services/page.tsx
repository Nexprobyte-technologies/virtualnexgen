import Link from "next/link";
import { ChevronRight, Home, ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/services";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function ServicesListPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-deep via-brand-dark to-[#001a33]">
        <div className="pointer-events-none absolute inset-0 bg-aurora opacity-40" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-14 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition hover:text-white"
            >
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/40" />
            <span className="text-white/90">Services</span>
          </nav>
          <h1 className="mt-6 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our{" "}
            <span className="text-brand-accent">Services</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Expert virtual assistant and AI automation solutions tailored to
            your industry — delivered with precision and care.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        {services.length === 0 ? (
          <div className="grid place-items-center rounded-[2rem] border border-line bg-cream p-16">
            <p className="text-lg font-semibold text-ink/50">
              No services available yet — check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(164,189,188,0.12)]"
                >
                  {service.image ? (
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        className="h-full w-full object-cover mix-blend-multiply transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="relative grid aspect-[16/10] w-full shrink-0 place-items-center overflow-hidden bg-gradient-to-br from-brand-deep/15 to-brand/15">
                      <span className="text-5xl font-extrabold text-brand/20">
                        {service.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand/60">
                      {service.eyebrow || service.name}
                    </span>
                    <h2 className="mt-2 text-xl font-extrabold leading-snug text-ink transition group-hover:text-brand-dark">
                      {service.name}
                    </h2>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-ink/60">
                      {service.short}
                    </p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition group-hover:gap-2.5">
                      Learn More <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
