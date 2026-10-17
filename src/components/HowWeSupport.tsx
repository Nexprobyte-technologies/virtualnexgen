"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { FaSearch, FaLayerGroup, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    num: "01",
    label: "Business Assessment",
    phase: "PHASE 01 · Business Discovery & Workflow Planning",
    icon: FaSearch,
    title: "Identify Where a Virtual Assistant Adds the Most Value",
    desc: "We analyze your daily operations, identify time-consuming tasks, and pinpoint where a dedicated Virtual Assistant can streamline workflows and help your business operate more efficiently.",
    features: ["Business Needs & Goal Assessment", "Administrative Workload Analysis", "Virtual Assistant Role Planning"],
  },
  {
    num: "02",
    label: "Workflow Documentation",
    phase: "PHASE 02 · Process Design & Workflow Documentation",
    icon: FaLayerGroup,
    title: "Turn Daily Tasks Into Streamlined Workflows",
    desc: "We transform recurring business tasks into clear, repeatable processes, document essential procedures, and define responsibilities to ensure consistent execution, smooth communication, and reliable Virtual Assistant support.",
    features: ["Standard Operating Procedures (SOPs)", "Task Ownership & Responsibility Planning", "Workflow Documentation & Guidelines"],
  },
  {
    num: "03",
    label: "VA Onboarding",
    phase: "PHASE 03 · VA Onboarding & Implementation",
    icon: FaRocket,
    title: "Integrate Your Dedicated VA Into Daily Operations",
    desc: "We prepare your Virtual Assistant to work with your business tools, follow established procedures, and manage assigned responsibilities through a structured onboarding process designed for a smooth transition.",
    features: ["Dedicated VA Onboarding & Training", "Software & Systems Familiarization", "Task Handover & Workflow Integration"],
  },
  {
    num: "04",
    label: "Quality Assurance",
    phase: "PHASE 04 · Quality Assurance & Performance Management",
    icon: FaShieldAlt,
    title: "Maintain Quality, Accuracy, and Accountability",
    desc: "We review completed tasks, monitor performance, and reinforce established procedures to help ensure your Virtual Assistant delivers accurate, consistent work aligned with your business standards.",
    features: ["Task Accuracy & Quality Reviews", "SOP Compliance & Process Checks", "Performance Monitoring & Feedback"],
  },
  {
    num: "05",
    label: "Continuous Improvement",
    phase: "PHASE 05 · Continuous Improvement & Business Growth",
    icon: FaChartLine,
    title: "Scale Your Support as Your Business Evolves",
    desc: "As your business grows, we help optimize workflows, adapt Virtual Assistant responsibilities, and expand operational support to match your changing priorities and long-term goals.",
    features: ["Continuous Workflow Optimization", "Evolving Workload & Task Management", "Flexible Support & Team Expansion"],
  },
];

export default function HowWeSupport() {
  const [current, setCurrent] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    const handleWheel = (event: WheelEvent) => {
      const direction = Math.sign(event.deltaY);
      const hasNextStep = direction > 0 && current < steps.length - 1;
      const hasPreviousStep = direction < 0 && current > 0;
      if (!hasNextStep && !hasPreviousStep) return;

      // Only debounce step changes; do NOT block native page scrolling.
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 650) return;
      lastWheelTimeRef.current = now;
      setCurrent((stepIndex) => Math.max(0, Math.min(steps.length - 1, stepIndex + direction)));
    };

    section.addEventListener("wheel", handleWheel, { passive: true });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [current]);

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
    <section ref={rootRef} className="relative bg-[#fffaf3] py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div className="w-full flex flex-col">

          {/* Title row */}
          <div ref={titleRef} className="flex flex-col items-start justify-between gap-3 pb-1 sm:flex-row sm:items-end sm:gap-4 sm:pb-2">
            <div className="text-left max-w-2xl">
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#02024E] leading-tight">
                How We Turn Your Workload Into a Workflow
              </h2>
              <p className="text-sm sm:text-sm md:text-base lg:text-base font-normal text-[#02024E]/70 mt-0.5 sm:mt-1">
                From understanding your business to managing everyday tasks, we build a support process around the way your team operates.
              </p>
            </div>
            <div className="flex-shrink-0 self-start sm:self-end">
              <a href="#services" className="group text-[#02024E] cursor-pointer font-bold px-3.5 sm:px-5 py-1.5 sm:py-2 border border-white/20 rounded-full inline-flex items-center gap-1.5 sm:gap-2 shadow-xs text-xs sm:text-sm hover:shadow-md transition-all whitespace-nowrap">
                  <span className="text-[#02024E] font-bold">Discover More</span>
                  <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full bg-white/20 text-[#02024E] flex-shrink-0 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </span>
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
                    ? "bg-transparent text-[#02024E] border-[#12B4CF] shadow-md scale-[1.02]"
                    : "bg-white text-[#02024E]/70 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                  i === current ? "bg-transparent text-[#12B4CF]" : "bg-transparent text-[#02024E]"
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
                    ? "bg-transparent text-[#02024E] border-[#12B4CF]"
                    : "bg-white/80 text-[#02024E]/60 border border-slate-200"
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 ${
                  i === current ? "bg-transparent text-[#12B4CF]" : "bg-transparent text-[#02024E]"
                }`}>
                  <s.icon className="w-2 h-2" />
                </span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div
            ref={cardRef}
            className="w-full"
          >
            <div className="bg-gradient-to-br from-[#fffaf3] via-[#fffaf3] to-[#fffaf3] border border-[#12B4CF]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(19,47,74,0.06)] relative overflow-hidden">
              <div className="absolute -right-4 -bottom-6 sm:-right-6 sm:-bottom-8 text-6xl sm:text-8xl lg:text-9xl font-black pointer-events-none select-none text-[#12B4CF]/[0.08]">
                {step.num}
              </div>

              <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-8 items-center">
                <div className="text-left">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-[30px] mb-2 sm:mb-2.5">
                    <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#02024E]/60">
                      {step.phase}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#fffaf3] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#12B4CF]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-[#02024E] leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-sm md:text-base lg:text-base font-normal text-[#02024E]/80 leading-relaxed mb-3 sm:mb-4 max-w-2xl">
                    {step.desc}
                  </p>

                  <div className="pt-2 sm:pt-3 border-t border-slate-200 flex flex-wrap gap-1.5 sm:gap-2.5">
                    {step.features.map((f) => (
                      <div key={f} className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-medium text-[#02024E]/75 bg-[#fffaf3]/90 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-white/20">
                        <CheckCircle className="w-3 h-3 text-[#12B4CF] flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

<div className="w-full hidden md:flex flex-col items-center justify-center p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-black/30 shadow-xs min-w-[130px] text-center mt-5">
  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base mb-1 bg-[#fffaf3] text-[#12B4CF]">
    <step.icon className="w-5 h-5" />
  </div>
  <span className="text-xs font-bold text-[#02024E] tracking-wide">
    Step {step.num} of 05
  </span>
  <span className="text-[10px] text-[#02024E]/50 font-medium">{step.label}</span>
</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 sm:mt-6 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full bg-gradient-to-r from-[#fffaf3] via-[#12B4CF] to-[#fffaf3]"
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
                  i === current ? "w-8 bg-[#12B4CF]" : "w-3 bg-[#12B4CF]/30 hover:bg-[#12B4CF]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
