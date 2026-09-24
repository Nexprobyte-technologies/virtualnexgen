"use client";

import {
  Brain,
  Check,
  CircleCheck,
  Clock,
  GraduationCap,
  MessageSquare,
  Sliders,
  TrendingUp,
  UserCheck,
  X,
} from "lucide-react";
import ContainerScroll from "./ContainerScroll";

const features = [
  {
    icon: UserCheck,
    label: "Dedicated Assistant",
    typical: "Shared or rotating assistants",
    ours: "One dedicated VA focused on your business",
  },
  {
    icon: Clock,
    label: "Long-Term Consistency",
    typical: "Assistants may change frequently",
    ours: "The same VA supports you long term",
  },
  {
    icon: Brain,
    label: "Business Knowledge",
    typical: "Processes often need to be re-explained",
    ours: "Your VA learns your business, systems, and priorities",
  },
  {
    icon: Sliders,
    label: "Personalized Support",
    typical: "Generic, task-based assistance",
    ours: "Support tailored to your exact workflow",
  },
  {
    icon: MessageSquare,
    label: "Communication",
    typical: "Limited or inconsistent updates",
    ours: "Clear, direct, and reliable communication",
  },
  {
    icon: Clock,
    label: "Availability",
    typical: "Depends on platform or freelancer schedules",
    ours: "Dependable support aligned with your requirements",
  },
  {
    icon: GraduationCap,
    label: "Training & Onboarding",
    typical: "Minimal onboarding assistance",
    ours: "Structured onboarding and process training",
  },
  {
    icon: TrendingUp,
    label: "Scalability",
    typical: "Difficult to expand support quickly",
    ours: "Scale your support as your workload grows",
  },
  {
    icon: TrendingUp,
    label: "Quality Control",
    typical: "Quality varies between assistants",
    ours: "Managed quality and performance standards",
  },
  {
    icon: CircleCheck,
    label: "Accountability",
    typical: "Limited supervision or oversight",
    ours: "Dedicated management and clear accountability",
  },
];

export default function DedicatedVADifference() {
  return (
    <section className="bg-gradient-to-b from-white via-[#F8FAFC] to-white relative overflow-hidden py-10 sm:py-16 md:py-20">
      <ContainerScroll
        titleComponent={
          <div className="text-center max-w-3xl mx-auto px-4">
            <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-3">
              <span className="w-5 sm:w-8 h-[2px] bg-[#00ADB5] rounded-full" />
              <span className="text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-widest text-[#00ADB5]">
                THE DEDICATED VA DIFFERENCE
              </span>
              <span className="w-5 sm:w-8 h-[2px] bg-[#00ADB5] rounded-full" />
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-3 sm:mb-4 leading-tight tracking-tight">
              Why Choose a Dedicated VA?
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal text-ink/75 leading-relaxed max-w-[700px] mx-auto">
              See why businesses choose us for reliable, personalized support
              &mdash; without the inconsistency of shared assistants or freelance platforms.
            </p>
          </div>
        }
      >
        <div className="h-full w-full overflow-y-auto rounded-[20px] bg-white shadow-xl border border-ink/10">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-[1.05fr_1fr_1.15fr] items-stretch text-white text-sm lg:text-base font-bold select-none border-b border-ink/20 sticky top-0 z-20">
            <div className="bg-[#000000] px-6 lg:px-8 py-5 flex items-center">
              <span>Feature</span>
            </div>
            <div className="bg-[#0A192F] px-6 lg:px-8 py-5 flex items-center justify-center text-center border-l border-white/10">
              <span>Typical VA Companies</span>
            </div>
            <div className="bg-gradient-to-r from-[#0A192F] via-[#0D2340] to-[#00ADB5] px-6 lg:px-8 py-4 flex flex-col items-center justify-center text-center border-l border-white/15 relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00ADB5] to-[#00D2D3]" />
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#00ADB5] to-[#00D2D3] text-black text-[10px] lg:text-[11px] font-extrabold uppercase px-3 py-0.5 rounded-full tracking-wider shadow-sm mb-1">
                PREFERRED CHOICE
              </span>
              <span className="text-white text-sm lg:text-base">Our Dedicated VAs</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-soft">
            {features.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr_1.15fr] items-stretch transition-colors duration-150 group bg-white hover:bg-[#00ADB5]/[0.04]"
              >
                {/* Feature */}
                <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3.5 md:py-4">
                  <div className="w-8 h-8 rounded-xl bg-ink/5 text-ink flex items-center justify-center shrink-0 border border-ink/10 transition-transform group-hover:scale-105">
                    <f.icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-ink text-xs sm:text-sm">{f.label}</span>
                </div>

                {/* Typical VA */}
                <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3.5 md:py-4 md:border-l md:border-ink/10 bg-[#FAF9F8]">
                  <span className="w-5 h-5 rounded-full bg-ink/40 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <X className="w-3 h-3" />
                  </span>
                  <span className="text-ink/70 text-xs sm:text-sm">{f.typical}</span>
                </div>

                {/* Our VA */}
                <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3.5 md:py-4 md:border-l md:border-ink/10 bg-[#F0F9FB] group-hover:bg-[#E0F4F7] transition-colors">
                  <span className="w-5 h-5 rounded-full bg-[#00ADB5] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="text-ink font-medium text-xs sm:text-sm">{f.ours}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Header (shown on mobile) */}
          <div className="md:hidden grid grid-cols-3 items-stretch text-white text-xs font-bold select-none border-b border-ink/20 sticky top-0 z-20">
            <div className="bg-[#000000] px-3 py-3 flex items-center">
              <span>Feature</span>
            </div>
            <div className="bg-[#0A192F] px-3 py-3 flex items-center justify-center text-center border-l border-white/10">
              <span>Typical</span>
            </div>
            <div className="bg-gradient-to-r from-[#0A192F] to-[#00ADB5] px-3 py-3 flex items-center justify-center text-center border-l border-white/15 relative">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#00ADB5] to-[#00D2D3]" />
              <span className="text-white">Ours</span>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
