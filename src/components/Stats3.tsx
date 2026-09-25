"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface StatItem {
  id: string;
  title: string;
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function Stats3({ stats }: { stats: StatItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !isLoaded) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-stat3-card]");
      const marquee = marqueeRef.current;
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              end: "bottom 40%",
              scrub: 0.6,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
      });

      if (marquee) {
        const marqueeContent = marquee.querySelector<HTMLElement>("[data-marquee-content]");
        if (marqueeContent) {
          const contentWidth = marqueeContent.scrollWidth;
          const viewportWidth = marquee.clientWidth;
          
          if (contentWidth > viewportWidth) {
            gsap.to(marqueeContent, {
              x: -contentWidth + viewportWidth,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        }
      }

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [isLoaded] },
  );

  return (
    <section
      id="stats3"
      ref={rootRef}
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-block rounded-full bg-cream-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
            Key Highlights
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Our Journey in Numbers
          </h2>
        </div>

        <div className="relative">
          <div
            ref={marqueeRef}
            className="relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white before:via-transparent before:to-white"
          >
            <div
              data-marquee-content
              className="flex gap-6 lg:gap-10 animate-marquee"
              style={{ animationDuration: "30s" }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  data-stat3-card
                  className="flex-shrink-0 w-[280px] lg:w-[320px]"
                >
                  <div className="group relative rounded-[1.5rem] bg-gradient-to-br from-white to-cream p-6 sm:p-8 shadow-[0_12px_40px_rgba(249,115,22,0.12)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.2)] hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-[1.5rem] p-[1px] pointer-events-none">
                      <div className="relative h-full w-full rounded-[1.5rem] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] bg-gradient-to-r from-brand/30 via-brand-deep/30 to-brand-accent/30" />
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-dark/80">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none text-ink">
                          {stat.value}
                        </p>
                        <p className="mt-3 text-base sm:text-lg font-medium text-ink/70">
                          {stat.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {stats.map((stat) => (
                <div
                  key={`${stat.id}-clone`}
                  className="flex-shrink-0 w-[280px] lg:w-[320px]"
                >
                  <div className="group relative rounded-[1.5rem] bg-gradient-to-br from-white to-cream p-6 sm:p-8 shadow-[0_12px_40px_rgba(249,115,22,0.12)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.2)] hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-[1.5rem] p-[1px] pointer-events-none">
                      <div className="relative h-full w-full rounded-[1.5rem] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] bg-gradient-to-r from-brand/30 via-brand-deep/30 to-brand-accent/30" />
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-dark/80">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none text-ink">
                          {stat.value}
                        </p>
                        <p className="mt-3 text-base sm:text-lg font-medium text-ink/70">
                          {stat.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}