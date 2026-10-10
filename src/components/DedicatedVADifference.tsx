"use client";

import {
  Brain,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock,
  GraduationCap,
  MessageSquare,
  Sliders,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ContainerScroll from "./ContainerScroll";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const features = [
  {
    icon: UserCheck,
    label: "Dedicated, One-on-One Support",
    description:
      "Work with a VA focused on your business, rather than sharing assistance across multiple clients.",
  },
  {
    icon: Clock,
    label: "Consistent Long-Term Partnership",
    description:
      "Build a lasting working relationship with the same assistant who understands your day to day operations.",
  },
  {
    icon: Brain,
    label: "A VA Who Knows Your Business",
    description:
      "Reduce repeated explanations as your assistant becomes familiar with your systems, processes, and priorities.",
  },
  {
    icon: Sliders,
    label: "Support Built Around Your Workflow",
    description:
      "Get assistance tailored to your specific tasks, procedures, and business requirements.",
  },
  {
    icon: MessageSquare,
    label: "Clear, Reliable Communication",
    description:
      "Stay informed through regular updates, direct communication, and clear task coordination.",
  },
  {
    icon: Clock,
    label: "Availability That Fits Your Business",
    description:
      "Arrange dedicated support around your agreed working hours and operational needs.",
  },
  {
    icon: GraduationCap,
    label: "Structured Onboarding & Training",
    description:
      "Help your VA get familiar with your tools, responsibilities, and standard operating procedures.",
  },
  {
    icon: TrendingUp,
    label: "Flexible, Scalable Support",
    description:
      "Expand your virtual assistant support as your workload and business needs increase.",
  },
  {
    icon: TrendingUp,
    label: "Consistent Quality Standards",
    description:
      "Use defined workflows, quality checks, and performance monitoring to support reliable execution.",
  },
  {
    icon: CircleCheck,
    label: "Clear Accountability",
    description:
      "Maintain defined responsibilities, ongoing oversight, and a clear point of contact for your support.",
  },
];

export default function DedicatedVADifference() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = carouselRef.current;
      if (!section || !track) return;

      const media = gsap.matchMedia();
      media.add(
        "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
        () => {
          const getDistance = () => Math.max(track.scrollWidth - track.clientWidth, 0);
          let lastIndex = -1;

          const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              id: "dedicated-benefits-horizontal",
              trigger: section,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const maxFirstIndex = Math.max(features.length - 3, 0);
                const nextIndex = Math.round(self.progress * maxFirstIndex);
                if (nextIndex !== lastIndex) {
                  lastIndex = nextIndex;
                  setCurrentCard(nextIndex);
                }
              },
            },
          });

          const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
          return () => {
            cancelAnimationFrame(refreshId);
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  const scrollCards = useCallback((direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.querySelector<HTMLElement>("[data-feature-card]");
    const gap = 16;
    const step = (firstCard?.offsetWidth ?? carousel.clientWidth) + gap;
    const nextScroll = carousel.scrollLeft + direction * step;
    if (nextScroll > carousel.scrollWidth - carousel.clientWidth + 2) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    } else if (nextScroll < 0) {
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
    } else {
      carousel.scrollTo({ left: nextScroll, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      isPaused ||
      window.matchMedia("(min-width: 1024px) and (min-height: 720px)").matches
    ) return;

    let timer: number | undefined;
    let isInView = false;
    const startTimer = () => {
      if (timer === undefined && isInView && !document.hidden) {
        timer = window.setInterval(() => scrollCards(1), 3000);
      }
    };
    const stopTimer = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };
    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      if (isInView) startTimer();
      else stopTimer();
    });
    const handleVisibilityChange = () => {
      if (document.hidden) stopTimer();
      else startTimer();
    };

    observer.observe(section);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopTimer();
    };
  }, [isPaused, scrollCards]);

  return (
    <section ref={sectionRef} className="bg-[#fffaf3] relative overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-0 sm:pb-2 md:pb-4">
      <ContainerScroll
        titleComponent={
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="mb-3 inline-flex items-center justify-center gap-2 sm:gap-3">
              <span className="h-[2px] w-5 rounded-full bg-white sm:w-8" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#02024E] sm:text-xs lg:text-sm">
                The Dedicated VA Advantage
              </span>
              <span className="h-[2px] w-5 rounded-full bg-white sm:w-8" />
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-[#02024E] sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              Why Choose a Dedicated VA?
            </h2>
            <p className="mx-auto max-w-[700px] text-xs font-normal leading-relaxed text-[#02024E] sm:text-sm md:text-base lg:text-lg">
              Get consistent, personalized support that becomes an extension of your team—not just another outsourced service.
            </p>
          </div>
        }
      >
        <div className="h-full w-full overflow-hidden rounded-[20px] border border-ink/10 bg-white p-3 shadow-xl sm:p-5">
          <div className="mb-3 flex items-center justify-end gap-2 sm:mb-4">
            <span className="mr-2 text-xs font-semibold tabular-nums text-[#02024E]/65" aria-live="polite">
              {String(currentCard + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Show previous benefits"
              className="hidden h-10 w-10 place-items-center rounded-full border border-[#01012F]/15 text-[#02024E] transition-colors hover:border-[#12B4CF] hover:bg-[#12B4CF]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12B4CF] sm:grid lg:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Show more benefits"
              className="hidden h-10 w-10 place-items-center rounded-full border border-[#01012F]/15 text-[#02024E] transition-colors hover:border-[#12B4CF] hover:bg-[#12B4CF]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12B4CF] sm:grid lg:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div
            ref={carouselRef}
            className="flex h-[calc(100%-3.5rem)] snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible"
            aria-label="Dedicated VA benefits"
            onScroll={(event) => {
              const carousel = event.currentTarget;
              const card = carousel.querySelector<HTMLElement>("[data-feature-card]");
              const step = (card?.offsetWidth ?? carousel.clientWidth) + 16;
              setCurrentCard(Math.min(features.length - 1, Math.round(carousel.scrollLeft / step)));
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {features.map(({ icon: Icon, label, description }, index) => (
              <article
                key={label}
                data-feature-card
                className="flex h-full basis-full shrink-0 snap-start items-start gap-3 rounded-2xl border border-[#01012F]/10 bg-gradient-to-br from-white to-[#12B4CF]/[0.04] p-4 shadow-sm transition-[border-color,box-shadow] hover:border-[#12B4CF]/40 hover:shadow-md sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
              >
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#12B4CF]/10 text-[#02024E]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00697B]">
                    Benefit {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-base font-bold leading-snug text-[#02024E] sm:text-lg">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#02024E]/70">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
