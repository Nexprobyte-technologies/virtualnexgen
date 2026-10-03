"use client";

import Image from "next/image";
import Reveal from "./Reveal";

import type { ServiceLogo } from "@/lib/types";
import { clientLogos as defaultLogos } from "@/lib/service-defaults";

interface ClientLogosProps {
  logos?: ServiceLogo[];
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  centerText?: string;
}

export default function ClientLogos({
  logos,
  eyebrow,
  heading,
  highlight,
  centerText,
}: ClientLogosProps) {
  const items = logos?.filter((logo) => logo.src) ?? [];
  const resolved = items.length > 0 ? items : defaultLogos;
  const showHighlight = highlight !== undefined && highlight.trim() !== "";
  const centerLines = (centerText?.trim() || "AMS\nExperts").split("\n");

  return (
    <section className="relative overflow-hidden bg-[#132F4A] py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#132F4A] px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4] border border-[#06B6D4]/30">
              {eyebrow?.trim() || "Trusted Partners"}
            </span>
            <h2 className="mt-3 sm:mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {(heading ?? "Our VAs Are Experts in All Major").trim() ||
                "Our VAs Are Experts in All Major"}{" "}
              {showHighlight ? (
                <span className="text-[#06B6D4]">{highlight!.trim()}</span>
              ) : (
                <span className="text-[#06B6D4]">Insurance Software</span>
              )}
            </h2>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="client-logo-orbit relative mx-auto mt-12 flex h-[23rem] w-[23rem] items-center justify-center [--orbit:115px] sm:h-[28rem] sm:w-[28rem] sm:[--orbit:190px]">
          <div className="absolute inset-0 rounded-full border border-line/70" />
          <div className="absolute inset-5 rounded-full border border-dashed border-line/50 sm:inset-6" />
          <div className="absolute left-1/2 top-1/2 h-[calc(2*var(--orbit))] w-[calc(2*var(--orbit))] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/30" />
          <div className="absolute inset-24 rounded-full border border-line/40 sm:inset-28" />

          <div
            className="absolute inset-0 [--logos-spin:0deg] animate-[logos-spin_26s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
            style={{ transform: "rotate(var(--logos-spin))" }}
          >
            {[...resolved, ...resolved].map((logo, i) => {
              const angle = (i * 360) / (resolved.length * 2);
              return (
                <div
                  key={`${logo.name}-${i}`}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{
                    transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit)))`,
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 will-change-transform"
                    style={{
                      transform:
                        "translate(-50%, -50%) rotate(calc(-1 * (var(--logos-spin) + " +
                        angle +
                        "deg)))",
                    }}
                  >
                    <div className="flex h-12 w-24 items-center justify-center rounded-xl border border-line bg-white px-2 shadow-[0_10px_28px_rgba(0,0,0,0.08)] sm:h-16 sm:w-36 sm:rounded-2xl sm:px-3">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={140}
                        height={50}
                        loading="lazy"
                        className="h-6 w-auto object-contain opacity-70 sm:h-9"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#132F4A] via-[#06B6D4] to-[#06B6D4] text-center text-[10px] font-extrabold uppercase tracking-wider text-white shadow-[0_12px_36px_rgba(6,182,212,0.4)] ring-8 ring-[#06B6D4]/10 sm:h-24 sm:w-24 sm:text-xs">
            {centerLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
