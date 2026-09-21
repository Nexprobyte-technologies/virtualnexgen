"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const items = [
  "Virtual Assistant",
  "AI Automation",
  "Administrative Support",
  "Real Estate",
  "Insurance",
  "Legal Support",
  "Healthcare",
  "Marketing",
  "Bookkeeping",
  "Business Growth",
];

export default function Marquee() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="border-y border-line bg-cream py-6"
    >
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div ref={trackRef} className="flex w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {items.map((label, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-6 px-8 text-sm font-semibold uppercase tracking-[0.2em] text-ink/60"
                >
                  {label}
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-deep to-brand" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
