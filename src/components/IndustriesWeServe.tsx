"use client";

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
  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12 text-center">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            Industries We Serve
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">
            Empowering Businesses Across Various Sectors
            <br className="hidden md:block" />
            with AI and Virtual Assistance Solutions
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 sm:mt-12 md:mt-16 rounded-2xl bg-gradient-to-br from-[#3B5998] to-[#2D4373] p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={industry.name}
                    className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:bg-white/20 hover:border-white/40 cursor-default"
                  >
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/10 flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base font-semibold text-white leading-tight">
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
