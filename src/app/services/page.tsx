import Link from "next/link";
import { ChevronRight, Home, ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/services";
import Reveal from "@/components/Reveal";
import FAQ9 from "@/components/FAQ9";

export const dynamic = "force-dynamic";

export default async function ServicesListPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-[#fffaf3]">
      {/* Breadcrumb */}
      <div className="relative overflow-hidden py-6 bg-[#fffaf3]">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink/50">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition hover:text-ink"
            >
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
            <span className="text-ink/80">Services</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[#02024E] sm:text-4xl lg:text-5xl">
            Our{" "}
            <span className="text-[#12B4CF]">Services</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#02024E]/60 sm:text-lg">
            Expert virtual assistant and AI automation solutions tailored to
            your industry — delivered with precision and care.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        {services.length === 0 ? (
          <div className="grid place-items-center rounded-[2rem] border border-[#01012F]/10 bg-[#fffaf3] p-16">
            <p className="text-lg font-semibold text-[#02024E]/50">
              No services available yet — check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#01012F]/10 bg-white backdrop-blur-sm transition-all duration-500 hover:border-[#12B4CF]/50 hover:bg-[#02024E]/5 hover:shadow-[0_16px_40px_rgba(6,182,212,0.15)]"
                >
                  {service.image ? (
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="relative grid aspect-[16/10] w-full shrink-0 place-items-center overflow-hidden bg-[#fffaf3]">
                      <span className="text-5xl font-extrabold text-[#02024E]/25">
                        {service.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#12B4CF]/60">
                      {service.eyebrow || service.name}
                    </span>
                    <h2 className="mt-2 text-xl font-extrabold leading-snug text-[#02024E] transition group-hover:text-[#12B4CF]">
                      {service.name}
                    </h2>
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[#02024E]/60">
                      {service.short}
                    </p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#12B4CF] transition group-hover:gap-2.5">
                      Learn More <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
      <FAQ9 />
    </main>
  );
}
