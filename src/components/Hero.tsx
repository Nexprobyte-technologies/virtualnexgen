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
      style={{ background: "#ffffff", backgroundImage: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(151,199,199,1) 50%, rgba(255,255,255,1) 100%)" }}
    >
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-deep/8 blur-[120px]" />

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-2 items-center">
          {/* Left: Text Content */}
          <div className="max-w-[720px] mx-auto lg:mx-0 text-left order-1">
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 bg-white border border-soft px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full shadow-sm mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm font-semibold text-ink">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand rounded-full animate-pulse flex-shrink-0" />
                <span>Virtual Assistants for Your Business</span>
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-3 sm:mb-4 lg:mb-6 leading-[1.1]"
            >
              Scale Your Business
              <br />
              Without Hiring More Staff
            </h1>

            <div ref={typewriterRef}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-ink mb-3 sm:mb-4 lg:mb-6 leading-[1.1]">
                Powered By Trained VAs in <br />
                <span className="inline-block min-w-[10ch] sm:min-w-[12ch] text-brand font-semibold relative">
                  <TypewriterText words={typewriterWords} className="text-brand" onWordChange={handleWordChange} />
                </span>
              </p>
            </div>

            <p
              ref={descRef}
              className="text-sm sm:text-base md:text-lg lg:text-lg font-normal text-ink/80 leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xl"
            >
              Our operations specialists handle quotes, renewals, COIs, and admin work
              &mdash; so your agents can focus on selling and serving clients.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
              <a
                href="https://calendly.com/virtualnexgen-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-ink/90 px-5 sm:px-6 py-2.5 sm:py-3 shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md w-full sm:w-auto justify-center"
              >
                <span className="text-sm sm:text-base font-bold text-ink whitespace-nowrap">Book a Demo</span>
                <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-ink text-white flex-shrink-0 transition-all duration-300 group-hover:bg-brand group-hover:shadow-[0_4px_16px_rgba(245,166,35,0.35)]">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              <a
                href="#services"
                className="group inline-flex items-center justify-center sm:justify-start gap-2 text-ink/75 hover:text-brand font-semibold text-sm sm:text-base transition-colors py-2"
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
              className={`w-full sm:w-[380px] lg:w-[420px] rounded-xl lg:rounded-2xl border transition-colors duration-500 flex flex-col gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 lg:p-6 ${
                slide.glass
                  ? "bg-white/60 backdrop-blur-md border-white/40"
                  : "bg-white shadow-2xl border-white"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <slide.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 text-brand stroke-[1.5]" />
                <div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-lg font-bold text-ink tracking-tight">
                    {slide.title}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-base font-medium text-ink/60">
                    {slide.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-full h-1 sm:h-1.5 lg:h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #A4BDBC 0%, #8AACAC 50%, #A4BDBC 100%)",
                    backgroundSize: "200% 100%",
                    width: `${slide.percent}%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium text-white px-2 sm:px-3 lg:px-4 py-1 lg:py-1.5 bg-ink rounded-full">
                  {slide.tag}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-sm font-medium text-white px-3 sm:px-4 lg:px-6 py-1 lg:py-1.5 bg-ink rounded-full">
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
                      ? "w-6 sm:w-8 bg-brand"
                      : "w-2 sm:w-3 bg-brand/30 hover:bg-brand/60"
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
