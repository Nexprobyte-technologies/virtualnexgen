"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { Check, Shield, ClipboardCheck, TrendingUp, Users } from "lucide-react";
import Reveal from "./Reveal";

const complianceItems = [
  "Continuous Compliance Training",
  "Privacy-First Workflows",
  "NDA-Backed Confidentiality",
  "Controlled & Secure Access",
];

const qualityChecks = [
  "Consistent Task Execution — Work completed according to established procedures.",
  "Workflow Monitoring — Tasks tracked to maintain quality and accountability",
  "Performance Tracking — Progress and outcomes monitored against expectations.",
  "Scalable Support — Flexible assistance as your business grows.",
];

const stats = [
  { value: "40%", label: "Lower operational workload" },
  { value: "60%", label: "Less Time on Admin Tasks" },
  { value: "3x", label: "Potential Operational Capacity" },
];

function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/20 bg-[#fffaf3] transition-all duration-500 ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Spotlight effect following cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />
      
      {/* Border glow effect following cursor */}
      <div
        className="pointer-events-none absolute -inset-[1px] z-0 rounded-2xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:ring-4 group-hover:ring-white/60"
      />
      
      {/* Inner border ring - expands on hover */}
      <div className="pointer-events-none absolute -inset-[2px] z-0 rounded-2xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:ring-4 group-hover:ring-white/70" />
      
      {/* Subtle tilt effect on hover */}
      <div className="relative z-10 transition-transform duration-300 group-hover:rotate-x-[2deg] group-hover:rotate-y-[-2deg] group-hover:scale-[1.02] group-hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)]" style={{ transformOrigin: "var(--mouse-x) var(--mouse-y)" }}>
        {children}
      </div>
    </div>
  );
}

function IndustryImageCarousel() {
  const images = Array.from(
    { length: 20 },
    (_, index) =>
      `/Ind_images/WhatsApp%20Image%202026-10-03%20at%2010.42.47%20AM_${index + 1}.jpg`,
  );

  const renderTrack = (trackImages: string[], reverse = false) => (
    <div className="industry-carousel-window relative overflow-hidden">
      <div
        className={`industry-carousel-track flex w-max ${reverse ? "industry-carousel-track-reverse" : ""}`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-3 pr-3"
          >
            {trackImages.map((src, index) => (
              <div
                key={src}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/5 shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24"
              >
                <Image
                  src={src}
                  alt={`Industry expertise example ${index + 1}`}
                  fill
                  sizes="(max-width: 639px) 64px, (max-width: 767px) 80px, 96px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="my-6 space-y-3 overflow-hidden">
      {renderTrack(images.slice(0, 10))}
      {renderTrack(images.slice(10), true)}
    </div>
  );
}

function ComplianceMarquee() {
  const doubled = [...complianceItems, ...complianceItems];

  return (
    <div className="relative mt-4 h-[200px] sm:h-[240px] overflow-hidden">
      <div
        className="space-y-3"
        style={{ animation: "scrollY 18s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="rounded-full border border-line bg-white px-4 py-2"
          >
            <span className="text-sm text-[#02024E]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <>
      <style>{`
        @keyframes scrollY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="scrollY"] {
            animation: none !important;
          }
        }
      `}</style>

      <section className="py-12 sm:py-16 lg:py-28 bg-[#01012F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

          {/* Header */}
          <Reveal y={30}>
            <div className="mb-8 sm:mb-12 lg:mb-16 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#fffaf3] mb-3 sm:mb-4">
                Why Choose Virtual Nexgen Solutions?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#fffaf3]/80 leading-relaxed">
                Built specifically for businesses that need reliable operations,
                secure workflows, and scalable support.
              </p>
            </div>
          </Reveal>

          {/* Row 1: 7 + 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 mb-4 lg:mb-6">

            {/* Card 1: Insurance-Focused Expertise */}
            <Reveal y={40} className="lg:col-span-7">
              <BentoCard className="h-full">
                <div className="p-5 sm:p-6 md:p-8">
<div className="flex items-center gap-3 mb-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
                    <Users className="h-5 w-5 text-[#02024E]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#02024E]">
                    Industry-Focused Expertise
                  </h3>
                </div>
              <p className="text-sm sm:text-base text-[#02024E]/70 mb-4">
                    Our assistants are trained in industry-specific workflows, policy servicing,
                    renewals, endorsements, and management systems &mdash; so tasks are handled
                    accurately and efficiently.
                  </p>

                  <IndustryImageCarousel />

                  <p className="text-sm sm:text-base text-[#02024E]/70 mt-4">
                    Faster onboarding. Fewer errors. Seamless collaboration with your internal team.
                  </p>
                </div>
              </BentoCard>
            </Reveal>

            {/* Card 2: Security & Compliance */}
            <Reveal y={40} delay={0.1} className="lg:col-span-5">
              <BentoCard className="h-full">
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
                      <Shield className="h-5 w-5 text-[#02024E]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#02024E]">
                      Security & Compliance
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#02024E]/70 mb-2">
                    Protecting your business information is our priority.
                    We follow structured security practices and privacy-focused workflows to help safeguard sensitive client data throughout daily operations.
                  </p>

                  <ComplianceMarquee />
                </div>
              </BentoCard>
            </Reveal>
          </div>

          {/* Row 2: 5 + 7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">

            {/* Card 3: Structured Quality Control */}
            <Reveal y={40} className="lg:col-span-5">
              <BentoCard className="h-full">
                <div className="p-5 sm:p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
                      <ClipboardCheck className="h-5 w-5 text-[#02024E]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#02024E]">
                      Quality You Can Count On
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#02024E]/70 mb-5">
                    Our structured workflows, performance monitoring, and quality checks help ensure tasks are completed accurately and consistently.
                  </p>

                  <ul className="space-y-3">
                    {qualityChecks.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                          <Check className="h-3.5 w-3.5 text-[#02024E]" strokeWidth={3} />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-[#02024E]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BentoCard>
            </Reveal>

            {/* Card 4: Real Operational Results */}
            <Reveal y={40} delay={0.1} className="lg:col-span-7">
              <BentoCard className="h-full">
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
                      <TrendingUp className="h-5 w-5 text-[#02024E]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#02024E]">
                      More Capacity. Less Administrative Work.
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#02024E]/70 mb-8">
                    Our dedicated Virtual Assistants integrate into your existing operations, helping your team manage recurring tasks, maintain documentation, and keep workflows moving.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center sm:items-start text-center sm:text-left bg-white/10 border border-white/20 rounded-2xl p-4 shadow-sm"
                      >
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#02024E] mb-2">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-[#02024E]/70 leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  );
}
