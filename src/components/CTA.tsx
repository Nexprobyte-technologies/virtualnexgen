"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="faq" className="py-6 sm:py-10 md:py-16 lg:py-20 bg-[#FFF7ED] rounded-b-[30px] lg:rounded-b-[60px] mb-[-60px] relative z-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">

        <Reveal y={30}>
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-3 sm:mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg font-normal text-ink/70 max-w-xl mx-auto">
              Book a free consultation and see how our virtual assistants can help your business grow.
            </p>
          </div>
        </Reveal>

        <Reveal y={30} delay={0.15}>
          <div className="bg-gradient-to-r from-[#000000] via-[#0B2A4A] to-[#0B2A4A] rounded-2xl sm:rounded-3xl border border-[#F97316]/40 px-5 sm:px-8 md:px-10 py-6 sm:py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-[0_25px_60px_rgba(11,42,74,0.35)]">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center md:text-left">
              Start Saving With a Free Consultation
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 rounded-full border border-white/60 px-5 sm:px-6 py-2.5 sm:py-3 shadow-sm transition-all duration-300 hover:border-[#F97316] hover:bg-white/10 w-full sm:w-auto justify-center"
              >
                <span className="text-sm sm:text-base font-bold text-white whitespace-nowrap">Calculate Savings</span>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-black flex-shrink-0 transition-colors duration-300 group-hover:bg-[#F97316] group-hover:text-black">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
              <a
                href="https://calendly.com/virtualnexgen-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#F97316] border border-[#F97316] px-5 sm:px-6 py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:bg-[#F97316] hover:border-[#F97316] w-full sm:w-auto justify-center"
              >
                <span className="text-sm sm:text-base font-bold text-black whitespace-nowrap">Book Your Demo</span>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black text-[#F97316] flex-shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
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
