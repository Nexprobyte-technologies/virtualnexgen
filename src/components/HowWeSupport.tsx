"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { FaSearch, FaLayerGroup, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    num: "01",
    label: "Understand",
    phase: "PHASE 01 · Business Discovery & Needs Assessment",
    icon: FaSearch,
    title: "Identify Where Support Creates Value",
    desc: "We learn how your business operates, identify time-consuming responsibilities, and determine where a dedicated Virtual Assistant can make the greatest contribution.",
    features: ["Business Needs Assessment", "Administrative Workload Review", "Support Requirements Planning"],
  },
  {
    num: "02",
    label: "Build Workflow",
    phase: "PHASE 02 · Process Design & Documentation",
    icon: FaLayerGroup,
    title: "Turn Daily Tasks Into Clear Processes",
    desc: "We organize your recurring responsibilities into structured workflows, document essential procedures, and establish clear guidelines for task ownership and communication.",
    features: ["Standard Operating Procedures", "Task & Responsibility Planning", "Workflow Documentation"],
  },
  {
    num: "03",
    label: "Put in Motion",
    phase: "PHASE 03 · Onboarding & Implementation",
    icon: FaRocket,
    title: "Bring Your Dedicated VA Into the Team",
    desc: "We prepare your Virtual Assistant to work with your systems, understand your processes, and take on assigned responsibilities through a structured onboarding process.",
    features: ["Dedicated VA Onboarding", "Software & Systems Familiarization", "Task Handover & Implementation"],
  },
  {
    num: "04",
    label: "Maintain Standards",
    phase: "PHASE 04 · Quality Assurance & Monitoring",
    icon: FaShieldAlt,
    title: "Keep Work Accurate and On Track",
    desc: "We review task completion, reinforce established procedures, and monitor performance to help ensure work remains consistent with your business expectations.",
    features: ["Work Accuracy Reviews", "Process Compliance Checks", "Performance Tracking"],
  },
  {
    num: "05",
    label: "Grow with Confidence",
    phase: "PHASE 05 · Continuous Improvement & Expansion",
    icon: FaChartLine,
    title: "Adapt Your Support as You Grow",
    desc: "As your workload and priorities change, we help refine existing processes and adjust your Virtual Assistant support to meet evolving business needs.",
    features: ["Workflow Improvements", "Changing Workload Management", "Flexible Support Expansion"],
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
    <section ref={rootRef} className="relative bg-[#132F4A] py-10 sm:py-16 md:py-28 lg:py-36 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#06B6D4]/10 blur-[140px] rounded-full" />

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div className="w-full flex flex-col">

          {/* Title row */}
          <div ref={titleRef} className="flex flex-col items-start justify-between gap-3 pb-1 sm:flex-row sm:items-end sm:gap-4 sm:pb-2">
            <div className="text-left max-w-2xl">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                How We Turn Your Workload Into a Workflow
              </h2>
              <p className="text-sm sm:text-sm md:text-base lg:text-base font-normal text-white/70 mt-0.5 sm:mt-1">
                From understanding your business to managing everyday tasks, we build a support process around the way your team operates.
              </p>
            </div>
            <div className="flex-shrink-0 self-start sm:self-end">
              <a href="#services">
                <button className="group text-white cursor-pointer font-bold px-3.5 sm:px-5 py-1.5 sm:py-2 border border-white/20 rounded-full inline-flex items-center gap-1.5 sm:gap-2 shadow-xs text-xs sm:text-sm hover:shadow-md transition-all whitespace-nowrap">
                  <span className="text-white font-bold">Discover More</span>
                  <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-white/20 text-[#132F4A] flex-shrink-0 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </span>
                </button>
              </a>
            </div>
          </div>

          {/* Tabs row */}
          <div ref={tabsRef} className="hidden sm:flex items-center justify-center gap-3 md:gap-4 lg:gap-5 pb-1">
            {steps.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setCurrent(i)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  i === current
                    ? "bg-transparent text-white border-[#06B6D4] shadow-md scale-[1.02]"
                    : "bg-white text-ink/70 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                  i === current ? "bg-transparent text-[#06B6D4]" : "bg-transparent text-black"
                }`}>
                  <s.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
                <span className="whitespace-nowrap">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile tabs */}
          <div className="flex sm:hidden items-center justify-center gap-2.5 pb-3 overflow-x-auto">
            {steps.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setCurrent(i)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold transition-all flex-shrink-0 ${
                  i === current
                    ? "bg-transparent text-white border-[#06B6D4]"
                    : "bg-white/80 text-black/60 border border-slate-200"
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 ${
                  i === current ? "bg-transparent text-[#06B6D4]" : "bg-transparent text-black"
                }`}>
                  <s.icon className="w-2 h-2" />
                </span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div ref={cardRef} className="w-full">
            <div className="bg-gradient-to-br from-[#132F4A] via-[#132F4A] to-[#132F4A] border border-[#06B6D4]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(19,47,74,0.06)] relative overflow-hidden">
              <div className="absolute -right-4 -bottom-6 sm:-right-6 sm:-bottom-8 text-6xl sm:text-8xl lg:text-9xl font-black pointer-events-none select-none text-[#06B6D4]/[0.08]">
                {step.num}
              </div>

              <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-8 items-center">
                <div className="text-left">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-[30px] mb-2 sm:mb-2.5">
                    <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-white/60">
                      {step.phase}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#132F4A] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#06B6D4]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-sm md:text-base lg:text-base font-normal text-white/80 leading-relaxed mb-3 sm:mb-4 max-w-2xl">
                    {step.desc}
                  </p>

                  <div className="pt-2 sm:pt-3 border-t border-slate-200 flex flex-wrap gap-1.5 sm:gap-2.5">
                    {step.features.map((f) => (
                      <div key={f} className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-medium text-white/75 bg-[#132F4A]/90 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-white/20">
                        <CheckCircle className="w-3 h-3 text-[#06B6D4] flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

<div className="w-full hidden md:flex flex-col items-center justify-center p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-black/30 shadow-xs min-w-[130px] text-center mt-5">
  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base mb-1 bg-[#132F4A] text-[#06B6D4]">
    <step.icon className="w-5 h-5" />
  </div>
  <span className="text-xs font-bold text-black tracking-wide">
    Step {step.num} of 05
  </span>
  <span className="text-[10px] text-black/50 font-medium">Verified SOP</span>
</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 sm:mt-6 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full bg-gradient-to-r from-[#132F4A] via-[#06B6D4] to-[#132F4A]"
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
                  i === current ? "w-8 bg-[#06B6D4]" : "w-3 bg-[#06B6D4]/30 hover:bg-[#06B6D4]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
