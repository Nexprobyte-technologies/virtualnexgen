"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { Globe } from "lucide-react";

const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });
const destinationCountries = [
  { name: "United States", slug: "united-states" },
  { name: "Canada", slug: "canada" },
  { name: "United Kingdom", slug: "united-kingdom" },
  { name: "Australia", slug: "australia" },
];

export default function InternationalClients() {
  const globeSlotRef = useRef<HTMLDivElement>(null);
  const [loadGlobe, setLoadGlobe] = useState(false);

  useEffect(() => {
    const slot = globeSlotRef.current;
    if (!slot || loadGlobe) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadGlobe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    observer.observe(slot);
    return () => observer.disconnect();
  }, [loadGlobe]);

  return (
    <section className="relative overflow-hidden bg-[#fffaf3] py-10 sm:py-14 lg:py-18">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-xl text-center lg:text-left">
            <span className="inline-block rounded-full bg-[#12B4CF]/10 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#12B4CF] ring-1 ring-[#12B4CF]/30">
              Global Reach
            </span>
            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-[#02024E]">
              Your Business. Our Support.{" "}
              <span className="text-[#12B4CF]">
                Anywhere.
              </span>
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-[#02024E]/60">
              We work with businesses across international markets, providing dependable virtual assistant support that fits your workflows, business hours, and operational needs.
            </p>
            <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:justify-start">
              {destinationCountries.map((country) => (
                <a
                  key={country.slug}
                  href={`/contacts?country=${country.slug}#contact-form`}
                  className="flex items-center gap-1.5 rounded-full bg-[#12B4CF]/10 px-3 py-1.5 ring-1 ring-[#12B4CF]/30 transition hover:bg-[#12B4CF]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12B4CF] sm:gap-2 sm:px-4 sm:py-2"
                >
                  <Globe className="h-3 w-3 text-[#12B4CF] sm:h-4 sm:w-4" />
                  <span className="text-xs font-medium text-[#02024E] sm:text-sm">{country.name}</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative w-full max-w-xs sm:max-w-lg lg:max-w-xl">
            <div ref={globeSlotRef} className="mx-auto aspect-square w-full max-w-[420px]">
              {loadGlobe ? <Globe3D /> : <div aria-hidden="true" className="h-full w-full" />}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
