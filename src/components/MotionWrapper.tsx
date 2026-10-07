"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function MotionWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>("section", containerRef.current);

      sections.forEach((section, i) => {
        gsap.fromTo(
          section,
          {
            autoAlpha: 0,
            y: 60,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Smooth parallax for images
      // gsap.utils.toArray<HTMLElement>("img", containerRef.current).forEach((img) => {
      gsap.utils
  .toArray<HTMLElement>("img:not(.industry-carousel-window img):not(.services-track img)", containerRef.current)
  .forEach((img) => {
        gsap.fromTo(
          img,
          { y: 20 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="motion-wrapper">
      {children}
    </div>
  );
}
