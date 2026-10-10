"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="faq" className="relative z-10 overflow-hidden rounded-b-[30px] bg-[#01012F] py-10 sm:rounded-b-[44px] sm:py-12 md:py-16 lg:rounded-b-[60px] lg:py-18">
      <style>{`
        @keyframes cta-title-shimmer {
          to { background-position: 200% center; }
        }
        @keyframes cta-card-pulse {
          0%, 100% { box-shadow: 0 25px 60px rgba(18,180,207,0.16); }
          50% { box-shadow: 0 28px 72px rgba(18,180,207,0.3), 0 0 24px rgba(18,180,207,0.14); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .cta-title-accent {
            background: linear-gradient(100deg, #54D9E8 10%, #fffaf3 48%, #54D9E8 86%);
            background-size: 200% auto;
            background-clip: text;
            color: transparent;
            animation: cta-title-shimmer 5s linear infinite;
          }
          .cta-consultation-card { animation: cta-card-pulse 4s ease-in-out infinite; }
        }
      `}</style>
      <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#12B4CF]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">

        <Reveal y={30}>
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <span className="mb-3 inline-flex items-center rounded-full border border-[#12B4CF]/35 bg-[#12B4CF]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#70E9F5] sm:text-xs">
              Let&apos;s grow together
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#fffaf3] mb-3 sm:mb-4">
              Ready to Get <span className="cta-title-accent">Started?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg font-normal text-[#fffaf3]/80 max-w-xl mx-auto">
              Book a free consultation and see how our virtual assistants can help your business grow.
            </p>
          </div>
        </Reveal>

        <Reveal y={30} delay={0.15}>
          <div className="cta-consultation-card bg-gradient-to-br from-white via-[#fffaf3] to-[#ddfaff] rounded-2xl sm:rounded-3xl border border-white/70 px-5 sm:px-8 md:px-10 py-6 sm:py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-[0_25px_60px_rgba(18,180,207,0.18)]">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#02024E] text-center md:text-left">
              Start Saving With a Free Consultation
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="https://calendly.com/virtualnexgen-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-white border border-[#02024E] px-5 sm:px-6 py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(255,255,255,0.4)] transition-all duration-300 hover:bg-white hover:border-[#02024E] w-full sm:w-auto justify-center"
              >
                <span className="text-sm sm:text-base font-bold text-[#02024E] whitespace-nowrap">Book Your Demo</span>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#fffaf3] text-[#02024E] flex-shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#02024E]">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
