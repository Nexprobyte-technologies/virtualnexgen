"use client";

import { useRef } from "react";
import {
  Award,
  Users,
  Wallet,
  Clock,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";
import Parallax from "./Parallax";

const features = [
  {
    icon: Award,
    title: "Skilled Professionals",
    text: "Our virtual assistants are experts in administrative, creative, and technical tasks.",
  },
  {
    icon: Handshake,
    title: "Tailored Support",
    text: "Customized solutions to match your specific business needs.",
  },
  {
    icon: Clock,
    title: "Time-Saving Efficiency",
    text: "Focus on growing your business while we handle the day-to-day tasks.",
  },
  {
    icon: Wallet,
    title: "Cost-Effective Solutions",
    text: "Affordable, scalable plans to fit your budget.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Availability",
    text: "Round-the-clock support to keep your operations running seamlessly.",
  },
  {
    icon: Users,
    title: "Proven Reliability",
    text: "Trusted by businesses for delivering consistent, high-quality support.",
  },
];

export default function Stats() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const heading = root.querySelector("[data-focus-heading]");
      const grid = root.querySelector("[data-focus-grid]");
      const cards = root.querySelectorAll("[data-focus-card]");
      if (!heading || !grid || !cards.length) return;

      const mm = gsap.matchMedia();

      const revealWithoutPin = () => {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, yPercent: 45 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: grid,
              start: "top 88%",
              end: "bottom 45%",
              scrub: 0.6,
            },
          },
        );
      };

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (root.offsetHeight > window.innerHeight) {
            revealWithoutPin();
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => "+=" + Math.max(900, window.innerHeight * 1.5),
              pin: true,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          });

          tl.fromTo(
            cards,
            {
              autoAlpha: 0,
              yPercent: 75,
              scale: 0.88,
              rotate: (i: number) => (i % 2 === 0 ? -7 : 7),
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              scale: 1,
              rotate: 0,
              duration: 0.8,
              ease: "back.out(1.3)",
              stagger: { each: 0.09, from: "center" },
            },
            0,
          );
        },
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          revealWithoutPin();
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="why-us"
      ref={rootRef}
      className="relative overflow-hidden bg-[#fffaf3] py-16 lg:flex lg:flex-col lg:pt-16 lg:pb-10"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div data-focus-heading>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Years of Experience in Virtual Assistant &"
            highlight="AI Automation Services"
            typewriterPrefix="Trusted by"
            typewriterWords={[
              "Insurance Agencies",
              "Real Estate Firms",
              "Law Firms",
              "Healthcare Providers",
              "Marketing Teams",
              "Growing Businesses",
            ]}
            description="At VIRTUAL NEXGEN SOLUTIONS, we provide dedicated, professional virtual assistants to help your business run smoother and smarter. Here's why we stand out:"
          />
        </div>

        {/* <div
          data-focus-grid
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                data-animate
                data-focus-card
                className="card group relative overflow-hidden p-8"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="icon-tile mb-6 h-14 w-14 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-ink">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/60">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}
