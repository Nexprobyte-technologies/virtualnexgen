"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const stats = [
  { end: 10, suffix: "+", label: "Years of Experience" },
  { end: 9, suffix: "+", label: "Service Offerings" },
  { end: 24, suffix: "/7", label: "Support Availability" },
  { end: 320, suffix: "+", label: "Businesses Supported" },
];

export default function CounterStats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils
        .toArray<HTMLElement>("[data-counter]", rootRef.current)
        .forEach((el) => {
          const end = Number(el.dataset.counter ?? 0);
          const suffix = el.dataset.suffix ?? "";
          const counter = { value: 0 };

          gsap.to(counter, {
            value: end,
            duration: 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                el.textContent = `${Math.floor(progress * end)}${suffix}`;
              },
            },
          });
        });

      gsap.fromTo(
        "[data-stat-item]",
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section className="relative bg-white py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          ref={rootRef}
          className="relative grid grid-cols-2 gap-3 sm:gap-4 overflow-hidden rounded-xl sm:rounded-[2rem] bg-[#000000] px-4 sm:px-6 py-4 sm:py-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} data-animate data-stat-item className="text-center">
              <p
                data-counter={stat.end}
                data-suffix={stat.suffix}
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white"
              >
                0{stat.suffix}
              </p>
              <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs lg:text-sm font-medium text-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
