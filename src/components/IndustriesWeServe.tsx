"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "./Reveal";
import {
  Shield,
  TrendingUp,
  Scale,
  Calculator,
  Home,
  FileText,
  Users,
  Briefcase,
  Monitor,
  Heart,
  ShoppingCart,
  GraduationCap,
  Pill,
  UserCheck,
  Truck,
  Store,
} from "lucide-react";

const industries = [
  { name: "Insurance", icon: Shield },
  { name: "Sales & Marketing", icon: TrendingUp },
  { name: "Legal Process Outsourcing", icon: Scale },
  { name: "Accounting & Finance", icon: Calculator },
  { name: "Real Estate", icon: Home },
  { name: "Mortgage Processing", icon: FileText },
  { name: "Professional Services", icon: Briefcase },
  { name: "Engineering & Construction", icon: Users },
  { name: "Information Technology", icon: Monitor },
  { name: "Non-Profit & Charities", icon: Heart },
  { name: "Retail & Commerce", icon: ShoppingCart },
  { name: "Education", icon: GraduationCap },
  { name: "Pharmaceutical & Healthcare", icon: Pill },
  { name: "Recruitment & HR", icon: UserCheck },
  { name: "Logistics & Transport", icon: Truck },
  { name: "Wholesale Trade", icon: Store },
];

export default function IndustriesWeServe() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-industry-card]",
        { autoAlpha: 0, y: 60, scale: 0.9 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-industry-grid]", start: "top 85%" },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-[#F2FCFE]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12 text-center">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-[#02024E]/80">
            Industries We Serve
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#02024E] leading-tight">
            Empowering Businesses Across Various Sectors
            <br className="hidden md:block" />
            with AI and Virtual Assistance Solutions
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 sm:mt-12 md:mt-16 rounded-3xl bg-gradient-to-br from-[#F2FCFE] via-[#F2FCFE] to-[#F2FCFE] border border-[#12B4CF]/30 p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_rgba(19,47,74,0.3)]">
            <div data-industry-grid className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={industry.name}
                    data-animate
                    data-industry-card
                    className="group relative flex items-center gap-3 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:bg-[#12B4CF]/15 hover:border-[#12B4CF]/50 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(6,182,212,0.2)] cursor-default before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-white/10 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity duration-300"
                  >
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#12B4CF]/15 flex-shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#12B4CF]">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#12B4CF] group-hover:text-[#02024E] transition-colors duration-300" strokeWidth={1.75} />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base font-semibold text-[#02024E] leading-tight">
                      {industry.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
