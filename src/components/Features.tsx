"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";

const services = [
  {
    title: "Insurance Virtual Assistants",
    category: "Insurance",
    description:
      "Policy management, claims processing, and seamless insurance support that ensures accuracy and efficiency.",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/61141.png",
    href: "https://virtualnexgen.com/service/Insurance-Virtual-Assistants",
  },
  {
    title: "Real Estate Virtual Assistants",
    category: "Real Estate",
    description:
      "Lead management, appointments, listings, and property operations handled by trained specialists.",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/11911.png",
    href: "https://virtualnexgen.com/service/Real-Estate-Virtual-Assistants",
  },
  {
    title: "Legal Virtual Assistants",
    category: "Legal",
    description:
      "Case management, legal research, document drafting, and back-office support tailored for law firms.",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/96748.png",
    href: "https://virtualnexgen.com/service/Legal-Virtual-Assistants",
  },
  {
    title: "Healthcare Virtual Assistants",
    category: "Healthcare",
    description:
      "Patient coordination, appointment scheduling, and medical admin support with confidentiality.",
    image: "https://virtualnexgen.com/assets/uploads/about/83526.png",
    href: "https://virtualnexgen.com/service/Healthcare-Virtual-Assistants",
  },
  {
    title: "Marketing Virtual Assistants",
    category: "Marketing",
    description:
      "Social media management, content creation, and campaign coordination for a stronger brand.",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/11170.png",
    href: "https://virtualnexgen.com/service/Marketing-Virtual-Assistants",
  },
  {
    title: "Administrative Support",
    category: "Admin",
    description:
      "Email management, scheduling, data entry, and reliable administrative support for daily operations.",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/39995.jpg",
    href: "https://virtualnexgen.com/service/Administrative-Support",
  },
  {
    title: "Bookkeeping Virtual Assistants",
    category: "Bookkeeping",
    description:
      "Accurate accounting, invoicing, expense tracking, and financial records that stay audit-ready.",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/93584.jpg",
    href: "https://virtualnexgen.com/service/Bookkeeping-Virtual-Assistants",
  },
  {
    title: "AI Automation Services",
    category: "AI Solutions",
    description:
      "Chatbots, intelligent workflows, and AI tools that reduce costs, save time, and drive innovation.",
    image: "https://virtualnexgen.com/assets/uploads/about/63494.jpg",
    href: "https://virtualnexgen.com/service/AI-Automation-Services",
  },
  {
    title: "Manufacturing & Engineering",
    category: "Manufacturing",
    description:
      "Specialized technical support with excellence for manufacturing and engineering operations.",
    image: "https://virtualnexgen.com/assets/uploads/aboutus/22211.jpg",
    href: "https://virtualnexgen.com/service/Manufacturing-Engineering-Services-with-Excellence",
  },
];

export default function Features() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const root = rootRef.current;
      if (!track || !root) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (min-height: 720px)", () => {
        const getDistance = () => Math.max(track.scrollWidth - root.clientWidth, 0);

        gsap.fromTo(
          "[data-service-card]",
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 65%" },
          },
        );

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => {
              if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
            },
          },
        });

        const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(refreshId);
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      media.add("(max-width: 1023px), (max-height: 719px)", () => {
        gsap.set("[data-service-card]", { autoAlpha: 1, y: 0 });
        gsap.set(track, { clearProps: "transform" });
        if (progressRef.current) gsap.set(progressRef.current, { scaleX: 1 });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="services"
      ref={rootRef}
      className="services-showcase-section relative h-auto min-h-screen overflow-x-clip overflow-y-visible bg-cream pb-24 sm:pb-32 xl:pb-0"
    >
      <div className="flex min-h-[100svh] flex-col justify-center pt-16 sm:pt-20 xl:pt-24 mt-[10px] xl:h-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Our Services"
            title="Our Comprehensive"
            highlight="Service Offerings"
            align="center"
            typewriterPrefix="Explore"
            typewriterWords={[
              "Insurance Virtual Assistants",
              "Real Estate Virtual Assistants",
              "Legal Virtual Assistants",
              "Healthcare Virtual Assistants",
              "Marketing Virtual Assistants",
              "AI Automation Services",
            ]}
            description="Scroll sideways through our dedicated virtual assistant and AI automation services."
          />
        </div>

        <div
          ref={trackRef}
          className="services-track mt-5 sm:mt-6 xl:mt-7 flex w-max max-w-full gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 xl:px-10 xl:max-w-none xl:overflow-visible"
        >
          {services.map((service) => (
            <a
              key={service.title}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              data-animate
              data-service-card
              className="w-[280px] shrink-0 overflow-hidden sm:w-[330px] xl:w-[370px] border border-line rounded-3xl bg-[#132F4A] transition-all duration-300 hover:border-[#06B6D4]/50 hover:shadow-[0_16px_40px_rgba(6,182,212,0.12)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 370px, (min-width: 640px) 330px, 280px"
                  loading="lazy"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#132F4A] shadow-sm">
                  {service.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-[#06B6D4]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="services-scroll-cue mx-auto mt-6 hidden w-full max-w-7xl px-6 xl:block xl:px-10">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Scroll
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
              <div
                ref={progressRef}
                className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#132F4A] via-[#06B6D4] to-[#132F4A]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
