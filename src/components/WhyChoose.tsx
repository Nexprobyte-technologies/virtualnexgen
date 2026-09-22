"use client";

import { useRef, useCallback } from "react";
import { Check, Shield, ClipboardCheck, TrendingUp, Users } from "lucide-react";
import Reveal from "./Reveal";

const complianceItems = [
  "Ongoing Compliance Training",
  "Data Privacy First Approach",
  "NDA-Protected Assistants",
  "Secure Remote Access",
];

const qualityChecks = [
  "Reliable Execution",
  "Monitored Workflows",
  "Performance Tracked",
  "Enterprise Ready",
];

const stats = [
  { value: "40%", label: "Lower operational workload" },
  { value: "60%", label: "Less time spent on admin tasks" },
  { value: "3x", label: "Operational capacity without hiring" },
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
      className={`group relative overflow-hidden rounded-2xl border border-line bg-cream transition-all duration-500 hover:shadow-[0_8px_40px_rgba(245,166,35,0.1)] ${className}`}
      style={{ perspective: "800px" }}
    >
      {/* Animated border glow */}
      <div className="pointer-events-none absolute -inset-[1px] z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bento-border-glow" />

      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245,166,35,0.06), transparent 40%)",
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245,166,35,0.25), transparent 40%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function TeamMarquee() {
  const images = [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
  ];
  const doubled = [...images, ...images, ...images];

  return (
    <div className="relative my-6 overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-cream to-transparent" />
      <div
        className="flex gap-4 w-max"
        style={{ animation: "scrollX 20s linear infinite" }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28"
          >
            <img
              src={src}
              alt="Team member"
              loading="lazy"
              className="h-full w-full rounded-full border-2 border-brand/20 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceMarquee() {
  const doubled = [...complianceItems, ...complianceItems];

  return (
    <div className="relative mt-4 h-[200px] sm:h-[240px] overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 z-10 w-full h-12 bg-gradient-to-b from-cream to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full h-12 bg-gradient-to-t from-cream to-transparent" />
      <div
        className="space-y-3"
        style={{ animation: "scrollY 18s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="rounded-full border border-line bg-white px-4 py-2"
          >
            <span className="text-sm text-ink">{item}</span>
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
        @keyframes scrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="scrollX"], [style*="scrollY"] {
            animation: none !important;
          }
        }
      `}</style>

      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

          {/* Header */}
          <Reveal y={30}>
            <div className="mb-8 sm:mb-12 lg:mb-16 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-ink mb-3 sm:mb-4">
                Why Choose Virtual Nexgen Solutions?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-ink/70 leading-relaxed">
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
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                      <Users className="h-5 w-5 text-brand" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink">
                      Industry-Focused Expertise
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-ink/70 mb-4">
                    Our assistants are trained in industry-specific workflows, policy servicing,
                    renewals, endorsements, and management systems &mdash; so tasks are handled
                    accurately and efficiently.
                  </p>

                  <TeamMarquee />

                  <p className="text-sm sm:text-base text-ink/70 mt-4">
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
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                      <Shield className="h-5 w-5 text-brand" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink">
                      Security & Compliance
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-ink/70 mb-2">
                    Operations require strict data protection. Our structured workflows ensure
                    secure handling of client and business data at every stage.
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
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                      <ClipboardCheck className="h-5 w-5 text-brand" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink">
                      Structured Quality Control
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-ink/70 mb-5">
                    We rely on consistent, process-driven execution.
                  </p>

                  <ul className="space-y-3">
                    {qualityChecks.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand">
                          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-ink">
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
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                      <TrendingUp className="h-5 w-5 text-brand" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink">
                      Real Operational Results
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-ink/70 mb-8">
                    We work exclusively with businesses that need dedicated support, so our team
                    understands your systems and workflows. Supporting operations, documentation,
                    and back-office tasks every day.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center sm:items-start text-center sm:text-left bg-white border border-black/10 rounded-2xl p-4 shadow-sm"
                      >
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand mb-2">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-ink/70 leading-tight">
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
