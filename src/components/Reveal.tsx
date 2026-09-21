"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  className,
  y = 44,
  x = 0,
  scale = 1,
  rotate = 0,
  duration = 0.9,
  start = "top 86%",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { autoAlpha: 0, y, x, scale, rotate },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            toggleActions: once
              ? "play none none none"
              : "play reverse play reverse",
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} data-animate>
      {children}
    </div>
  );
}
