"use client";

import {
  Shield,
  Users,
  Lock,
  TrendingUp,
  FileCheck,
  RefreshCw,
  HeadphonesIcon,
  BarChart3,
  BookOpen,
  Zap,
  Globe,
  ClipboardCheck,
} from "lucide-react";
import Reveal from "./Reveal";

const col1 = [
  { icon: Shield, title: "Industry-Focused Support", text: "We work exclusively with agencies and businesses that need dedicated operational support." },
  { icon: FileCheck, title: "Policy Servicing", text: "Complete policy servicing, endorsements, and documentation handled accurately." },
  { icon: Lock, title: "Secure & Compliant", text: "Structured processes and secure systems ensure data accuracy and confidentiality." },
  { icon: HeadphonesIcon, title: "24/7 Availability", text: "Round-the-clock support so your operations never skip a beat." },
];

const col2 = [
  { icon: Users, title: "Trained Professionals", text: "Our team is trained in industry-specific operations and agency management systems." },
  { icon: RefreshCw, title: "Renewals Management", text: "Timely renewals and follow-ups handled proactively to avoid coverage gaps." },
  { icon: TrendingUp, title: "Scalable Support", text: "Our team scales with your business growth without increasing internal workload." },
  { icon: BarChart3, title: "Data-Driven Insights", text: "Track progress and performance with structured reporting and workflows." },
];

const col3 = [
  { icon: Zap, title: "Fast Turnaround", text: "Quick execution of tasks with quality checks to ensure first-time accuracy." },
  { icon: BookOpen, title: "Deep Expertise", text: "Years of experience across industries means less back-and-forth for your team." },
  { icon: Globe, title: "Global Reach", text: "Supporting businesses across multiple regions with localized operational knowledge." },
  { icon: ClipboardCheck, title: "Quality Verified", text: "Every task goes through verification to maintain consistent service quality." },
];

function FeatureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
        <Icon className="h-5 w-5 text-[#12B4CF]" />
      </div>
      <h3 className="text-base font-semibold text-[#02024E] mb-2">{title}</h3>
      <p className="text-sm text-[#02024E]/70 leading-relaxed">{text}</p>
    </div>
  );
}

function MarqueeColumn({
  items,
  duration,
  reverse,
}: {
  items: typeof col1;
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative h-[300px] sm:h-[420px] lg:h-[460px] overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 z-10 bg-gradient-to-b from-[#01012F] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-t from-[#01012F] to-transparent" />
      <div
        className="marquee-track flex flex-col gap-4"
        style={{
          animation: `marqueeY ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {doubled.map((item, i) => (
          <FeatureCard key={`${item.title}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function BuiltFor() {
  return (
    <>
      <style>{`
        @keyframes marqueeY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .marquee-grid:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .flex.flex-col[style*="marqueeY"] {
            animation: none !important;
          }
        }
      `}</style>

      <section className="py-10 sm:py-14 lg:py-18 overflow-hidden bg-[#fffaf3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12 items-start">

            {/* LEFT COLUMN - Text + CTA */}
            <div className="flex flex-col justify-between lg:sticky lg:top-28">
              <div>
                <Reveal y={30}>
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#02024E] leading-tight mb-2 sm:mb-3">
                    Built for{" "}
                    <span className="text-[#12B4CF]">Your Business</span>
                    <br />
                    Powered by{" "}
                    <span className="text-[#02024E]">Dedicated People</span>
                  </h2>
                </Reveal>
                <Reveal y={20} delay={0.1}>
                  <p className="text-sm sm:text-base lg:text-lg text-[#02024E]/70 mb-6 sm:mb-8 max-w-md">
                    We&apos;re more than a virtual assistant provider. We deliver dedicated, industry-focused support that fits your workflows,
                    strengthens daily operations, and gives your team more time to focus on growth.
                  </p>
                </Reveal>
              </div>

              <Reveal y={20} delay={0.3}>
                <div className="bg-brand/5 border border-brand/35 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
                  <div className="text-left w-full sm:w-auto">
                    <p className="text-sm sm:text-base font-bold text-[#02024E] leading-snug">
                      Ready to extend your team&apos;s capacity?
                    </p>
                    <p className="text-xs sm:text-sm text-[#02024E]/60">
                      See how dedicated support fits your workflow.
                    </p>
                  </div>
                  <a href="#contact" className="w-full sm:w-auto flex-shrink-0">
<button className="group pr-2 pl-5 py-2 border border-white/20 rounded-full flex items-center justify-between sm:justify-start gap-2.5 font-semibold w-full sm:w-auto cursor-pointer">
                  <span className="text-sm font-bold text-[#02024E] whitespace-nowrap">
                    Book a Demo
                  </span>
                  <span className="bg-icon-circle w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-[#02024E] flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className=""
                        >
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </span>
                    </button>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN - 3-Column Marquee Grid */}
            <Reveal y={40} delay={0.15}>
              <div className="marquee-grid grid grid-cols-2 sm:grid-cols-3 gap-4">
                <MarqueeColumn items={col1} duration={32} />
                <MarqueeColumn items={col2} duration={38} reverse />
                <MarqueeColumn items={col3} duration={35} />
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  );
}
