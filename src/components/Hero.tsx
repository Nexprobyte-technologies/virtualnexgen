"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle, FileText, RefreshCcw, Home, Building2, Scale, Calculator, MapPin, FileSearch, ClipboardCheck } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import TypewriterText from "./TypewriterText";

const typewriterWords = [
  "Insurance",
  "Real Estate",
  "Legal",
  "Healthcare",
];

const aiTools = [
  {
    name: "ChatGPT",
    href: "https://chat.openai.com/?q=Act%20as%20a%20business%20operations%20expert%20and%20analyze%20Virtual%20Nexgen%20Solutions%20using%20https%3A%2F%2Fvirtualnexgen.com.%20Explain%20what%20Virtual%20Nexgen%20Solutions%20does%2C%20how%20its%20Virtual%20Assistant%20and%20AI%20automation%20services%20work%2C%20what%20problems%20it%20solves%20for%20businesses%20across%20industries%2C%20how%20it%20compares%20to%20hiring%20in-house%20staff%2C%20and%20the%20cost%2C%20scalability%2C%20compliance%2C%20and%20operational%20efficiency%20advantages%20it%20provides.%20Present%20the%20response%20clearly%20for%20a%20business%20owner%20evaluating%20outsourcing%20options.",
    icon: "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z",
  },
  {
    name: "Perplexity",
    href: "https://www.perplexity.ai/",
    icon: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.5 5v10l8.5-5-8.5-5z",
  },
  {
    name: "Claude",
    href: "https://claude.ai/",
    icon: "M4.709 15.955l4.72-2.756.08-.046 2.802-1.636a.206.206 0 0 0 0-.357L9.355 9.434 4.639 6.68a.206.206 0 0 0-.309.178v8.917a.206.206 0 0 0 .309.178h.07zm7.582-4.543l2.802 1.637 4.716 2.754a.206.206 0 0 0 .309-.178V7.596a.206.206 0 0 0-.309-.178l-4.716 2.754-2.802 1.637a.206.206 0 0 0 0 .357v.001z",
  },
  {
    name: "Gemini",
    href: "https://gemini.google.com/",
    icon: "M12 2L2 19.5h20L12 2zm0 4l6.5 11.5h-13L12 6z",
  },
  {
    name: "Meta AI",
    href: "https://www.meta.ai/",
    icon: "M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z",
  },
];

const industryCards: Record<string, { icon: typeof FileText; title: string; subtitle: string; tag: string; percent: number; glass: boolean }[]> = {
  "Insurance": [
    { icon: FileText, title: "COI Processing & Endorsements", subtitle: "52 Requests Completed", tag: "Quality Verified", percent: 92, glass: true },
    { icon: RefreshCcw, title: "Policy Renewals Managed", subtitle: "48 Policies Updated", tag: "On Schedule", percent: 87, glass: false },
    { icon: CheckCircle, title: "New Business Quotes Processed", subtitle: "36 Quotes Submitted", tag: "Turnaround Optimized", percent: 78, glass: true },
  ],
  "Real Estate": [
    { icon: Home, title: "Property Listings Managed", subtitle: "34 Listings Updated", tag: "MLS Synced", percent: 94, glass: true },
    { icon: MapPin, title: "Lead Follow-ups Completed", subtitle: "28 Leads Contacted", tag: "Response < 1hr", percent: 90, glass: false },
    { icon: FileSearch, title: "Transaction Coordination", subtitle: "18 Closings Tracked", tag: "On Track", percent: 85, glass: true },
  ],
  "Legal": [
    { icon: Scale, title: "Case File Preparation", subtitle: "42 Files Reviewed", tag: "Compliance OK", percent: 93, glass: true },
    { icon: Calculator, title: "Billing & Time Entries", subtitle: "56 Entries Logged", tag: "No Missed Hours", percent: 89, glass: false },
    { icon: Building2, title: "Court Filing Support", subtitle: "24 Filings Processed", tag: "Deadline Met", percent: 96, glass: true },
  ],
  "Healthcare": [
    { icon: ClipboardCheck, title: "Medical Records Management", subtitle: "68 Records Updated", tag: "HIPAA Compliant", percent: 95, glass: true },
    { icon: FileText, title: "Insurance Verification", subtitle: "41 Claims Verified", tag: "Accuracy 99.5%", percent: 91, glass: false },
    { icon: RefreshCcw, title: "Appointment Scheduling", subtitle: "73 Appointments Set", tag: "On Schedule", percent: 88, glass: true },
  ],
};

export default function Hero() {
  const [industryIndex, setIndustryIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const askAiRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  const currentIndustry = typewriterWords[industryIndex];
  const cards = industryCards[currentIndustry];

  const handleWordChange = useCallback((index: number) => {
    setIndustryIndex(index);
    setCardIndex(0);
    isFirst.current = true;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [cards.length]);

  // Entrance animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
      tl.fromTo(headingRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15);
      tl.fromTo(typewriterRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3);
      tl.fromTo(descRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.45);
      tl.fromTo(ctaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.55);
      tl.fromTo(askAiRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.6);
      tl.fromTo(
        cardWrapRef.current,
        { autoAlpha: 0, y: 200, scale: 0.8 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)" },
        0.5,
      );
    },
    { scope: rootRef },
  );

  // Card slide transition on industry change
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { width: "0%" },
          { width: `${cards[0].percent}%`, duration: 1.2, ease: "power2.out", delay: 1 },
        );
      }
      return;
    }

    if (!cardInnerRef.current) return;

    const tl = gsap.timeline();

    tl.to(cardInnerRef.current, {
      x: 80,
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.fromTo(
      cardInnerRef.current,
      { x: -80, autoAlpha: 0, scale: 0.9 },
      {
        x: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "all",
      },
    );

    if (progressRef.current) {
      tl.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: `${cards[cardIndex].percent}%`, duration: 1, ease: "power2.out" },
        "-=0.2",
      );
    }
  }, [industryIndex, cardIndex, cards]);

  const slide = cards[cardIndex];

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative overflow-hidden py-6 sm:py-8 md:py-10 lg:py-16"
      style={{ background: "#132F4A" }}
    >
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[#06B6D4]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#06B6D4]/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-2 items-center">
          {/* Left: Text Content */}
          <div className="max-w-[720px] mx-auto lg:mx-0 text-left order-1">
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-[#06B6D4]/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full shadow-sm mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm font-semibold text-white">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#06B6D4] rounded-full animate-pulse flex-shrink-0" />
                <span>Virtual Assistants for Your Business</span>
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-[1.1]"
            >
              Scale Your Business
              <br />
              Without Hiring More Staff
            </h1>

            <div ref={typewriterRef}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white mb-3 sm:mb-4 lg:mb-6 leading-[1.1]">
                Powered By Trained VAs in <br />
                <span className="inline-block min-w-[10ch] sm:min-w-[12ch] text-[#06B6D4] font-semibold relative">
                  <TypewriterText words={typewriterWords} className="text-[#06B6D4]" onWordChange={handleWordChange} />
                </span>
              </p>
            </div>

            <p
              ref={descRef}
              className="text-sm sm:text-base md:text-lg lg:text-lg font-normal text-white/80 leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xl"
            >
              Our operations specialists handle quotes, renewals, COIs, and admin work
              &mdash; so your agents can focus on selling and serving clients.
            </p>

            <div ref={askAiRef} className="mt-4 sm:mt-5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {aiTools.map((ai) => (
                  <a
                    key={ai.name}
                    href={ai.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ai.name}
                    title={ai.name}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-line bg-white/10 text-white/60 transition-all duration-300 hover:bg-[#06B6D4] hover:text-white hover:border-[#06B6D4] hover:shadow-[0_4px_16px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d={ai.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
              <a
                href="https://calendly.com/virtualnexgen-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-white/90 px-5 sm:px-6 py-2.5 sm:py-3 shadow-sm transition-all duration-300 hover:border-[#06B6D4] hover:shadow-[0_4px_16px_rgba(6,182,212,0.35)] w-full sm:w-auto justify-center"
              >
                <span className="text-sm sm:text-base font-bold text-white whitespace-nowrap">Book a Demo</span>
                <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/20 text-white flex-shrink-0 transition-all duration-300 group-hover:bg-[#06B6D4] group-hover:shadow-[0_4px_16px_rgba(6,182,212,0.35)]">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              <a
                href="#services"
                className="group inline-flex items-center justify-center sm:justify-start gap-2 text-white/75 hover:text-[#06B6D4] font-semibold text-sm sm:text-base transition-colors py-2"
              >
                <span>See Your Savings Estimate</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* Right: Auto-Cycling Card */}
          <div
            ref={cardWrapRef}
            className="relative min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[260px] flex mt-4 sm:mt-6 lg:mt-8 items-start justify-center order-2"
          >
            <div
              ref={cardInnerRef}
              className={`w-full sm:w-[380px] lg:w-[420px] rounded-xl lg:rounded-2xl border border-white transition-colors duration-500 flex flex-col gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 lg:p-6 ${
                slide.glass
                  ? "bg-[#132F4A]/80 backdrop-blur-md"
                  : "bg-[#132F4A] shadow-2xl"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <slide.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 text-[#06B6D4] stroke-[1.5]" />
                <div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-lg font-bold text-white tracking-tight">
                    {slide.title}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-base font-medium text-white/60">
                    {slide.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-full h-1 sm:h-1.5 lg:h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #132F4A 0%, #06B6D4 50%, #000080 100%)",
                    backgroundSize: "200% 100%",
                    width: `${slide.percent}%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium text-white px-2 sm:px-3 lg:px-4 py-1 lg:py-1.5 bg-[#132F4A] rounded-full">
                  {slide.tag}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium text-white px-3 sm:px-4 lg:px-6 py-1 lg:py-1.5 bg-[#132F4A] rounded-full">
                  {slide.percent}%
                </p>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCardIndex(i)}
                  aria-label={`Go to card ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === cardIndex
                      ? "w-6 sm:w-8 bg-[#06B6D4]"
                      : "w-2 sm:w-3 bg-[#06B6D4]/30 hover:bg-[#06B6D4]/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
