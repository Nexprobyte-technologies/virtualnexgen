"use client";

import dynamic from "next/dynamic";
import Reveal from "./Reveal";
import { Globe } from "lucide-react";

const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

export default function InternationalClients() {
  return (
    <section className="relative overflow-hidden bg-[#132F4A] py-12 sm:py-16 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[600px] -translate-x-1/2 rounded-full bg-[#06B6D4]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:items-center lg:justify-between">
          <Reveal className="max-w-xl text-center lg:text-left">
            <span className="inline-block rounded-full bg-[#06B6D4]/10 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4] ring-1 ring-[#06B6D4]/30">
              Global Reach
            </span>
            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Your Business. Our Support.{" "}
              <span className="text-[#06B6D4]">
                Anywhere.
              </span>
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-white/60">
              We work with businesses across international markets, providing dependable virtual assistant support that fits your workflows, business hours, and operational needs.
            </p>
            <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:justify-start">
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#06B6D4]/10 px-3 sm:px-4 py-1.5 sm:py-2 ring-1 ring-[#06B6D4]/30">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-[#06B6D4]" />
                <span className="text-xs sm:text-sm font-medium text-white">United States</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#06B6D4]/10 px-3 sm:px-4 py-1.5 sm:py-2 ring-1 ring-[#06B6D4]/30">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-[#06B6D4]" />
                <span className="text-xs sm:text-sm font-medium text-white">Canada</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#06B6D4]/10 px-3 sm:px-4 py-1.5 sm:py-2 ring-1 ring-[#06B6D4]/30">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-[#06B6D4]" />
                <span className="text-xs sm:text-sm font-medium text-white">United Kingdom</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#06B6D4]/10 px-3 sm:px-4 py-1.5 sm:py-2 ring-1 ring-[#06B6D4]/30">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-[#06B6D4]" />
                <span className="text-xs sm:text-sm font-medium text-white">Australia</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative w-full max-w-xs sm:max-w-lg lg:max-w-xl">
            <Globe3D />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
