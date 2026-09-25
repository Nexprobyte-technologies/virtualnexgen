"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { FaSearch, FaLayerGroup, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    num: "01",
    label: "Strategy",
    phase: "Discovery & Workflow Assessment",
    icon: FaSearch,
    title: "Strategy",
    desc: "We assess your workflow, service gaps, and operational bottlenecks to build a tailored support plan that aligns with your agency goals.",
    features: ["Workflow & bottleneck audit", "Service gap analysis", "SLA benchmark definition"],
  },
  {
    num: "02",
    label: "Workflow Mapping",
    phase: "Process Design & SOP Creation",
    icon: FaLayerGroup,
    title: "Workflow Mapping",
    desc: "We design clear SOPs and map every task flow so your virtual assistant can execute consistently from day one.",
    features: ["Custom SOP development", "Task flow documentation", "Tool integration setup"],
  },
  {
    num: "03",
    label: "Execution",
    phase: "Deployment & Task Management",
    icon: FaRocket,
    title: "Execution",
    desc: "Your trained VA begins handling real tasks under structured workflows, with daily tracking and seamless handoffs.",
    features: ["Dedicated VA assignment", "Daily task management", "Real-time status updates"],
  },
  {
    num: "04",
    label: "Quality Control",
    phase: "Review & Accuracy Assurance",
    icon: FaShieldAlt,
    title: "Quality Control",
    desc: "Every output is reviewed through a multi-layer QA process to ensure accuracy, compliance, and consistency.",
    features: ["Multi-step QA reviews", "Accuracy tracking", "Compliance checks"],
  },
  {
    num: "05",
    label: "Scale & Optimize",
    phase: "Growth & Continuous Improvement",
    icon: FaChartLine,
    title: "Scale & Optimize",
    desc: "As your agency grows, we scale support seamlessly and continuously refine processes for maximum efficiency.",
    features: ["Flexible team scaling", "Process optimization", "Performance reporting"],
  },
];

export default function HowWeSupport() {
  const [current, setCurrent] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(titleRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0);
      tl.fromTo(tabsRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.2);
      tl.fromTo(cardRef.current, { autoAlpha: 0, y: 40, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.2)" }, 0.35);
    },
    { scope: rootRef },
  );

  useEffect(() => {
    if (!cardRef.current) return;
    const tl = gsap.timeline();
    tl.to(cardRef.current, { y: -16, autoAlpha: 0, scale: 0.985, duration: 0.3, ease: "power2.in" });
    tl.fromTo(
      cardRef.current,
      { y: 16, autoAlpha: 0, scale: 0.985 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out", clearProps: "all" },
    );
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: `${((current + 1) / steps.length) * 100}%`, duration: 0.5, ease: "power2.out" },
      );
    }
  }, [current]);

  const step = steps[current];

  return (
    <section ref={rootRef} className="relative bg-surface py-10 sm:py-16 md:py-28 lg:py-36 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-brand/5 blur-[140px] rounded-full" />

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div className="w-full flex flex-col">

          {/* Title row */}
          <div ref={titleRef} className="flex items-start sm:items-end justify-between gap-3 sm:gap-4 pb-1 sm:pb-2">
            <div className="text-left max-w-2xl">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">
                How Our Virtual Assistants Support
              </h2>
              <p className="text-sm sm:text-sm md:text-base lg:text-base font-normal text-ink/70 mt-0.5 sm:mt-1">
                Designed to save time, reduce workload, and scale with your agency.
              </p>
            </div>
            <div className="flex-shrink-0 self-center sm:self-end">
              <a href="#services">
                <button className="group text-ink cursor-pointer font-bold px-3.5 sm:px-5 py-1.5 sm:py-2 border border-ink/20 rounded-full inline-flex items-center gap-1.5 sm:gap-2 shadow-xs text-xs sm:text-sm hover:shadow-md transition-all whitespace-nowrap">
                  <span className="text-ink font-bold">Discover More</span>
                  <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-ink text-white flex-shrink-0 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </span>
                </button>
              </a>
            </div>
          </div>

          {/* Tabs row */}
          <div ref={tabsRef} className="hidden sm:flex items-center justify-center gap-1.5 sm:gap-2 pb-1">
            {steps.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setCurrent(i)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  i === current
                    ? "bg-[#0B2A4A] text-white border-[#0B2A4A] shadow-md scale-[1.02]"
                    : "bg-white text-ink/70 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ${
                  i === current ? "bg-[#F97316] text-black" : "bg-slate-200 text-ink/50"
                }`}>
                  <s.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
                <span className="whitespace-nowrap">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile tabs */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 pb-3 overflow-x-auto">
            {steps.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setCurrent(i)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold transition-all flex-shrink-0 ${
                  i === current
                    ? "bg-[#0B2A4A] text-white"
                    : "bg-white/80 text-ink/60 border border-slate-200"
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                  i === current ? "bg-[#F97316] text-black" : "bg-slate-200 text-ink/50"
                }`}>
                  <s.icon className="w-2 h-2" />
                </span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div ref={cardRef} className="w-full">
            <div className="bg-gradient-to-br from-white via-[#FFF7ED] to-[#ECFDE5] border border-[#F97316]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(11,42,74,0.06)] relative overflow-hidden">
              <div className="absolute -right-4 -bottom-6 sm:-right-6 sm:-bottom-8 text-6xl sm:text-8xl lg:text-9xl font-black pointer-events-none select-none text-[#F97316]/[0.08]">
                {step.num}
              </div>

              <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-8 items-center">
                <div className="text-left">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-[30px] mb-2 sm:mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#F97316]/15 text-[#0B2A4A]">
                      Phase {step.num}
                    </span>
                    <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-ink/60">
                      {step.phase}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#0B2A4A] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-ink leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-sm md:text-base lg:text-base font-normal text-ink/80 leading-relaxed mb-3 sm:mb-4 max-w-2xl">
                    {step.desc}
                  </p>

                  <div className="pt-2 sm:pt-3 border-t border-slate-200 flex flex-wrap gap-1.5 sm:gap-2.5">
                    {step.features.map((f) => (
                      <div key={f} className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-medium text-ink/75 bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-slate-200">
                        <CheckCircle className="w-3 h-3 text-[#F97316] flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center justify-center p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xs min-w-[130px] text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base mb-1 bg-[#0B2A4A] text-[#F97316]">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-ink tracking-wide">
                    Step {step.num} of 05
                  </span>
                  <span className="text-[10px] text-ink/50 font-medium">Verified SOP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 sm:mt-6 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full bg-gradient-to-r from-[#0B2A4A] via-[#F97316] to-[#ECFDE5]"
              style={{ width: `${((current + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-[#F97316]" : "w-3 bg-[#F97316]/30 hover:bg-[#F97316]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
