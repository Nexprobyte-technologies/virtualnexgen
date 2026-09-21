"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

const caseStudies = [
  {
    tag: "Real Estate Virtual Assistants",
    tags: "Lead Management | Appointment Scheduling | Property Listings",
    title:
      "How Real Estate Virtual Assistants Streamlined Operations and Boosted Sales",
    text: "A real estate agency's pipeline was clogged with unqualified leads and missed appointments...",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/97341.jpg",
    href: "https://virtualnexgen.com/case-study/How-Real-Estate-Virtual-Assistants-Streamlined-Operations-and-Boosted-Sales",
  },
  {
    tag: "AI Automation",
    tags: "Lead Engagement | Appointment Scheduling | Inventory Management",
    title:
      "How AI Automation Transformed Operations for a Home Improvement Business",
    text: "A growing home improvement business struggled to follow up on leads quickly...",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/40212.jpg",
    href: "/case-study/ai-automation-home-improvement",
  },
  {
    tag: "Legal Back-Office Support",
    tags: "Case Management | Legal Research | Document Drafting",
    title:
      "How Legal Virtual Assistants Enhanced Efficiency & Profitability for Law Firms",
    text: "A mid-sized law firm was drowning in administrative work...",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/40212.jpg",
    href: "https://virtualnexgen.com/case-study/How-Legal-Virtual-Assistants-Enhanced-Efficiency-and-Profitability-for-Law-Firms",
  },
];

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);
  const caseRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to("[data-badge]", {
        y: -18,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: aboutRef },
  );

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-case-card]",
        { autoAlpha: 0, y: 70, rotateY: 6 },
        {
          autoAlpha: 1,
          y: 0,
          rotateY: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-case-grid]", start: "top 82%" },
        },
      );
    },
    { scope: caseRef },
  );

  return (
    <>
      <section id="about" ref={aboutRef} className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-28">
        <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-brand-deep/10 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal x={-60} y={0} duration={1}>
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-brand-deep/20 via-transparent to-brand/20 blur-2xl" />
              <Parallax speed={0.03}>
                <div className="w-full overflow-hidden rounded-[2rem] border border-line shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
                  <Image
                    src="https://virtualnexgen.com/assets/uploads/aboutus/11960.jpg"
                    alt="About Virtual Nexgen Solutions"
                    width={960}
                    height={810}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="lazy"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </Parallax>
              <div
                data-badge
                className="absolute -bottom-6 -right-4 rounded-2xl border border-line bg-white/95 px-6 py-4 shadow-xl backdrop-blur"
              >
                <p className="text-2xl font-extrabold text-gradient">2016</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                  Founded Since
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">About Us</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Discover the Story Behind{" "}
                <span className="text-gradient">Virtual Nexgen Solutions</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-ink/60 sm:text-lg">
                Founded in 2016, we excel in providing dedicated virtual
                assistant and AI Automation tailored for your industry. We help
                businesses streamline their operations, reduce overhead costs,
                and scale without the burden of full-time hiring.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-3">
                {["Virtual Assistants", "AI Automation", "All Industries"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium text-ink/70"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="https://virtualnexgen.com/contacts"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_14px_38px_rgba(164,189,188,0.35)] transition hover:shadow-[0_14px_54px_rgba(164,189,188,0.5)]"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="case-studies" ref={caseRef} className="relative bg-cream py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">Case Studies</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 sm:mt-6 max-w-3xl text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-ink">
              How Our Virtual Assistants and AI Automation{" "}
              <span className="text-gradient">Transformed Businesses</span>
            </h2>
          </Reveal>

          <div
            data-case-grid
            className="mt-8 sm:mt-12 lg:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 [perspective:1200px]"
          >
            {caseStudies.map((cs) => (
              <a
                key={cs.title}
                href={cs.href}
                target="_blank"
                rel="noopener noreferrer"
                data-animate
                data-case-card
                className="card group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(164,189,188,0.16)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 100vw"
                    loading="lazy"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark shadow-sm backdrop-blur">
                    {cs.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-ink/40">
                    {cs.tags}
                  </p>
                  <h3 className="mt-2.5 text-lg font-bold leading-snug text-ink transition group-hover:text-brand-dark">
                    {cs.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/60">
                    {cs.text}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                    See the Impact
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-[0_4px_12px_rgba(245,166,35,0.4)]">
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
