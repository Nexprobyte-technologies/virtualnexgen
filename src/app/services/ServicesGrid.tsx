"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/Reveal";

type ServiceCard = {
  slug: string;
  href: string;
  name: string;
  eyebrow: string;
  short: string;
  image: string;
};

export default function ServicesGrid({ services }: { services: ServiceCard[] }) {
  const [visibleCount, setVisibleCount] = useState(9);
  const visibleServices = services.slice(0, visibleCount);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visibleServices.map((service, i) => (
          <Reveal key={service.slug} delay={(i % 9) * 0.08}>
            <Link
              href={service.href}
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
                <div className="relative grid aspect-[16/10] w-full shrink-0 place-items-center overflow-hidden bg-gradient-to-br from-[#02024E] to-[#12B4CF]">
                  <span className="text-5xl font-extrabold text-white/80">
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
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[#12B4CF] transition group-hover:gap-2.5">
                  Learn More <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {visibleCount < services.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + 9)}
            className="inline-flex items-center gap-2 rounded-full border border-[#12B4CF] px-7 py-3 text-sm font-bold text-[#02024E] transition hover:bg-[#12B4CF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12B4CF]"
          >
            View More <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
