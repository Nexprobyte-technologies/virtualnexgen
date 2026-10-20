"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUpText from "@/components/about/CountUpText";

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

type TimelineChapter = {
  year: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  panelLabel: string;
  stats: string;
  statLabel: string;
  noteLabel: string;
  deliverables: string[];
  highlight: string;
};

// Timeline chapters data
const TIMELINE_CHAPTERS: TimelineChapter[] = [
  {
    year: "2016",
    tag: "THE INCEPTION",
    title: "The Inception",
    subtitle: "",
    description:
      "Virtual Nexgen Solutions began with a clear mission: help businesses simplify daily operations through dependable Virtual Assistant support. From administrative tasks to essential business workflows, we built our foundation on dedicated service, practical processes, and a commitment to helping clients focus on growth.",
    panelLabel: "OUR FOUNDATION",
    stats: "Since 2016",
    statLabel: "Reliable Virtual Assistant Support Built Around Your Business",
    noteLabel: "Our Story",
    deliverables: [
      "Dedicated Virtual Assistant Support",
      "Structured Training & SOPs",
      "Confidentiality-Focused Workflows",
      "Client-Centered Service Delivery",
    ],
    highlight: "Founded in Coimbatore, India, Virtual Nexgen Solutions set out to help businesses manage everyday workloads with dedicated Virtual Assistants, structured processes, and personalized operational support.",
  },
  {
    year: "2019",
    tag: "DEEP SPECIALIZATION",
    title: "Industry-Specific Expertise Across Business Sectors",
    subtitle: "Expanding beyond general administration to deliver specialized Virtual Assistant support for diverse industries and operational needs.",
    description:
      "As businesses required more than general administrative help, we developed a more specialized approach to Virtual Assistant services. From healthcare, insurance, legal, and financial services to construction, HVAC, plumbing, roofing, restoration, real estate, logistics, e-commerce, and manufacturing, our focus is on aligning trained talent with industry workflows, business tools, and operational priorities.",
    panelLabel: "OUR EXPANDING EXPERTISE",
    stats: "Support Across Industries",
    statLabel: "Dedicated Virtual Assistants Adapted to Your Business Needs",
    noteLabel: "Our Approach",
    deliverables: [
      "Industry-Specific Virtual Assistant Services",
      "Specialized Software & Workflow Training",
      "Operational Support Across Multiple Sectors",
      "Customized Processes & SOP Development",
    ],
    highlight: "Every industry has unique workflows, tools, and customer expectations. We align Virtual Assistant responsibilities with your business processes to help manage daily operations, improve efficiency, and give your team more time to focus on growth.",
  },
  {
    year: "2022",
    tag: "SECURITY VAULT",
    title: "Security-First Operations & Data Protection",
    subtitle: "Strengthening confidentiality, access management, and secure workflows to help protect sensitive business information.",
    description:
      "As our client operations expanded, protecting business information became an increasingly important priority. We strengthened our focus on secure access practices, confidentiality procedures, controlled system permissions, and structured workflows designed to help safeguard client data throughout daily operations.",
    panelLabel: "OUR SECURITY COMMITMENT",
    stats: "Security by Design",
    statLabel: "Protecting Client Information Through Responsible Practices",
    noteLabel: "Our Approach",
    deliverables: [
      "Controlled System Access & Permissions",
      "Confidentiality-Focused Workflows",
      "Secure Credential Management",
      "Standardized Data Handling Procedures",
    ],
    highlight: "We prioritize confidentiality and responsible information handling through defined procedures, appropriate access controls, and security-conscious work practices. Our goal is to help clients delegate essential business tasks with greater confidence and peace of mind.",
  },
  {
    year: "PRESENT",
    tag: "AGENTIC AI ERA",
    title: "The Next Generation of Business Support: Humans + AI",
    subtitle: "Combining dedicated Virtual Assistants with intelligent AI solutions to streamline workflows and help businesses scale smarter.",
    description:
      "Today, Virtual Nexgen Solutions combines dedicated human expertise with AI-powered tools to help businesses manage repetitive tasks, streamline communication, organize information, and improve operational efficiency. Our hybrid approach brings together human judgment, industry-specific knowledge, and intelligent automation to support evolving business needs.",
    panelLabel: "OUR NEXT CHAPTER",
    stats: "Human Expertise. Intelligent AI.",
    statLabel: "Smarter Workflows. More Time for Business Growth.",
    noteLabel: "Our Vision",
    deliverables: [
      "AI-Assisted Workflow Automation",
      "Human-Led Business & Administrative Support",
      "Intelligent CRM & Data Management Workflows",
      "Scalable Virtual Assistant + AI Solutions",
    ],
    highlight: "We are building a more efficient way for businesses to operate by combining reliable Virtual Assistant services with practical AI capabilities. From everyday administration to workflow automation, our goal is to help teams reduce manual work, improve consistency, and focus on higher-value priorities.",
  },
];

const CHAPTER_COUNT = TIMELINE_CHAPTERS.length;

/** Viewport heights of scrolling that belong to a single chapter. */
const SCROLL_PER_CHAPTER = 0.8;
/** Viewport heights the last chapter stays on screen before the next section arrives. */
const HOLD_DISTANCE = 0.8;
/** Total scroll distance (in viewport heights) the pinned stage travels. */
const TRAVEL_VIEWPORTS = CHAPTER_COUNT * SCROLL_PER_CHAPTER + HOLD_DISTANCE;

function scrollToY(target: number) {
  const lenis = (
    window as unknown as {
      __lenis?: { scrollTo: (target: number, options?: Record<string, unknown>) => void };
    }
  ).__lenis;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2 });
    return;
  }
  window.scrollTo({ top: target, behavior: "smooth" });
}

/** True on large screens, where the pinned scroll story is used. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

/* The original chapter panel, unchanged. */
function ChapterPanel({
  chapter,
  index,
  total,
}: {
  chapter: TimelineChapter;
  index: number;
  total: number;
}) {
  return (
    <div className="rounded-3xl border border-[#01012F]/10 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#12B4CF]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#12B4CF]">
            Chapter {index + 1} of {total} • {chapter.year}
          </div>

          <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-ink">
            {chapter.title}
          </h3>

          {chapter.subtitle && (
            <p className="mt-2 text-base font-semibold text-[#12B4CF]">
              {chapter.subtitle}
            </p>
          )}

          <p className="mt-4 text-base leading-relaxed text-ink/80">
            {chapter.description}
          </p>

          <div className="mt-6 border-t border-[#01012F]/10 pt-5">
            <div className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-3">
              Key Milestones
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {chapter.deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-ink/90">
                  <CheckCircle2 className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-[#01012F]/10 bg-white p-6 shadow-[0_10px_30px_rgba(19,47,74,0.06)]">
            <div className="text-xs font-bold uppercase tracking-widest text-ink/50">
              {chapter.panelLabel}
            </div>
            <div className="mt-3 text-4xl sm:text-5xl font-black text-ink">
              <CountUpText key={index} value={chapter.stats} />
            </div>
            <div className="text-sm font-semibold text-[#12B4CF] mt-1">
              {chapter.statLabel}
            </div>

            <div className="mt-6 rounded-xl bg-[#01012F] p-4 text-xs font-medium leading-relaxed text-white/70">
              <span className="font-bold text-white block mb-1">
                {chapter.noteLabel}
              </span>
              {chapter.highlight}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutTimelineJourney() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isDesktop = useIsDesktop();

  /* --------------------------------------------------------------------- */
  /* Desktop: the section is held in place while scrolling walks through    */
  /* the chapters one by one (2016 -> 2019 -> 2022 -> Present). The next    */
  /* section only arrives once the whole journey has been shown.             */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    if (!isDesktop) return;

    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    let raf = 0;
    let travel = 0;
    let storyTravel = 0;

    const measure = () => {
      const stageH = window.innerHeight;
      travel = stageH * TRAVEL_VIEWPORTS;
      storyTravel = stageH * CHAPTER_COUNT * SCROLL_PER_CHAPTER;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH + travel}px`;
    };

    const apply = () => {
      raf = 0;
      const progress = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      const storyProgress = clamp((progress * travel) / storyTravel, 0, 1);
      const nextIndex = Math.min(
        Math.floor(storyProgress * CHAPTER_COUNT),
        CHAPTER_COUNT - 1,
      );
      setActiveTimeline((prev) => (prev === nextIndex ? prev : nextIndex));
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    const onResize = () => {
      measure();
      apply();
    };

    measure();
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isDesktop]);

  /* Keep the original design intact on short screens: the block is scaled  */
  /* down instead of being clipped, so the wheel always keeps moving.       */
  useEffect(() => {
    if (!isDesktop) return;

    const fit = () => {
      const wrapper = fitRef.current;
      const stage = stageRef.current;
      if (!wrapper || !stage) return;

      wrapper.style.transform = "";
      const available = stage.clientHeight - 104;
      const natural = wrapper.offsetHeight;
      if (available > 0 && natural > available) {
        wrapper.style.transform = `scale(${Math.max(0.7, available / natural)})`;
      }
    };

    const schedule = () => {
      window.requestAnimationFrame(fit);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    if (stageRef.current) observer.observe(stageRef.current);
    if (fitRef.current) observer.observe(fitRef.current);
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [isDesktop, activeTimeline]);

  /* --------------------------------------------------------------------- */
  /* Mobile: the same chapter panels, one after another.                     */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    if (isDesktop) return;

    const nodes = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const index = Number(visible[0].target.getAttribute("data-chapter-index"));
        if (!Number.isNaN(index)) {
          setActiveTimeline((prev) => (prev === index ? prev : index));
        }
      },
      // Only the chapter crossing the middle band of the viewport counts.
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [isDesktop]);

  const scrollToChapter = useCallback(
    (index: number) => {
      if (isDesktop) {
        const track = trackRef.current;
        if (!track) return;

        const stageH = window.innerHeight;
        const storyTravel = stageH * CHAPTER_COUNT * SCROLL_PER_CHAPTER;
        const top = track.getBoundingClientRect().top + window.scrollY;

        setActiveTimeline(index);
        // Land in the middle of the requested chapter band.
        scrollToY(top + (index + 0.5) * (storyTravel / CHAPTER_COUNT));
        return;
      }

      const node = cardRefs.current[index];
      if (!node) return;
      setActiveTimeline(index);
      scrollToY(node.getBoundingClientRect().top + window.scrollY - 90);
    },
    [isDesktop],
  );

  const chapter = TIMELINE_CHAPTERS[activeTimeline];

  const tabs = (
    <div className="grid grid-cols-2 gap-3 border-b border-[#01012F]/15 pb-4 md:flex md:overflow-x-auto">
      {TIMELINE_CHAPTERS.map((item, idx) => {
        const isActive = activeTimeline === idx;
        return (
          <button
            key={item.year}
            onClick={() => scrollToChapter(idx)}
            aria-current={isActive}
            className={`group relative flex h-[100px] w-full flex-col items-start overflow-hidden p-4 rounded-2xl text-left transition-all duration-300 md:w-[500px] md:flex-shrink-0 ${
              isActive
                ? "bg-[#01012F] text-white border border-[#01012F] shadow-lg"
                : "bg-white text-ink border border-[#01012F]/10 hover:bg-[#fffaf3]"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span
                className={`text-2xl font-black ${
                  isActive ? "text-[#12B4CF]" : "text-ink"
                }`}
              >
                {item.year}
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isActive ? "bg-white/10" : "bg-[#01012F]/20"
                }`}
              />
            </div>
            <span
              className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                isActive ? "text-white/80" : "text-[#01012F]/60"
              }`}
            >
              {item.tag}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section id="timeline" className="relative py-14 md:py-18 bg-[#fffaf3]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal y={20}>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#12B4CF]/10">
              <Calendar className="h-3.5 w-3.5 text-[#12B4CF]" />
              OUR DECADE-LONG JOURNEY
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
              From a Dedicated Team to Your <span className="text-[#12B4CF]">Global Business Partner</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink/70 leading-relaxed">
              Explore how we’ve grown since 2016, expanding our expertise and building dedicated Virtual
              Assistant support around the needs of businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="w-fit rounded-xl border border-[#01012F]/10 bg-white px-4 py-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Dedicated professionals</h3>
              </div>
              <div className="w-fit rounded-xl border border-[#01012F]/10 bg-white px-4 py-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Structured processes</h3>
              </div>
              <div className="w-fit rounded-xl border border-[#01012F]/10 bg-white px-4 py-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Reliable support</h3>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop: the original design, held in place while the scroll     */}
        {/* walks through the chapters.                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="hidden lg:block">
          <div
            ref={trackRef}
            data-timeline-track
            className="relative w-full"
            style={{ height: `${(TRAVEL_VIEWPORTS + 1) * 100}vh` }}
          >
            <div
              ref={stageRef}
              data-timeline-stage
              className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden"
            >
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 pt-20 pb-6 sm:pt-24">
                <div
                  ref={fitRef}
                  data-timeline-fit
                  style={{ transformOrigin: "top center" }}
                >
                  <div className="mt-12">{tabs}</div>

                  {/* Active Chapter Details Display */}
                  <div className="mt-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTimeline}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChapterPanel
                          chapter={chapter}
                          index={activeTimeline}
                          total={CHAPTER_COUNT}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile: the same panels, one after another.                       */}
        {/* ---------------------------------------------------------------- */}
        <div className="lg:hidden">
          <div className="mt-12">{tabs}</div>

          <div className="mt-8 space-y-8">
            {TIMELINE_CHAPTERS.map((item, idx) => (
              <motion.div
                key={item.year}
                ref={(node: HTMLDivElement | null) => {
                  cardRefs.current[idx] = node;
                }}
                data-chapter-index={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4 }}
              >
                <ChapterPanel chapter={item} index={idx} total={CHAPTER_COUNT} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}