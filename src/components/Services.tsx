"use client";

import { useRef } from "react";
import { Search, ClipboardList, Workflow, TrendingUp } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Analyze",
    text: "We assess your business needs and identify areas where AI automation and virtual assistance can drive efficiency and growth.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Strategize",
    text: "We create a customized plan tailored to streamline your operations, optimize workflows, and maximize productivity.",
  },
  {
    number: "03",
    icon: Workflow,
    title: "Implement",
    text: "We integrate AI solutions and virtual assistants into your processes, ensuring seamless execution and automation.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Optimize",
    text: "We continuously monitor and refine our solutions to enhance performance, improve efficiency, and support long-term business growth.",
  },
];

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-process-card]",
        { autoAlpha: 0, y: 80, rotate: 3 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-process-grid]", start: "top 82%" },
        },
      );

      gsap.fromTo(
        "[data-process-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: "[data-process-grid]", start: "top 78%" },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section id="process" ref={rootRef} className="relative bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Our Working Process"
          title="How Our Services Will Help You"
          highlight="Grow Your Business"
        />

        <div className="relative mt-8 sm:mt-12 lg:mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-28 hidden h-px lg:block">
            <div
              data-process-line
              className="h-full w-full origin-left bg-gradient-to-r from-[#0B2A4A]/60 via-[#F97316]/60 to-transparent"
            />
          </div>

          <div
            data-process-grid
            className="relative grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  data-animate
                  data-process-card
                  className="card group relative p-5 sm:p-6 lg:p-8"
                >
                  <span className="absolute right-4 sm:right-6 top-4 sm:top-5 text-3xl sm:text-4xl font-extrabold text-[#F97316]/25 transition group-hover:text-[#F97316]">
                    {step.number}
                  </span>
                  <div className="icon-tile mb-4 sm:mb-6 h-11 w-11 sm:h-14 sm:w-14 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-ink/60">
                    {step.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-14 text-center">
          <a
            href="https://calendly.com/virtualnexgen-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white transition"
          >
            Connect With Us
          </a>
        </div>
      </div>
    </section>
  );
}
