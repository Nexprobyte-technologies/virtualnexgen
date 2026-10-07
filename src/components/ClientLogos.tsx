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
  const items = logos?.filter((logo) => logo.src || logo.name) ?? [];
  const isInsuranceSoftware = `${heading ?? "Our VAs Are Experts in All Major"} ${highlight ?? "Insurance Software"}`
    .toLowerCase()
    .includes("insurance software");
  const extraInsuranceTools = [
    "QQCatalyst",
    "NowCerts",
    "Jenesis",
    "AgencyZoom",
    "EZ Agent",
    "Agency Matrix",
    "Sagitta",
    "BenefitPoint",
    "Nexsure",
  ].map((name) => ({ name, src: "" }));
  const sourceLogos = items.length > 0 ? items : defaultLogos;
  const resolved = isInsuranceSoftware
    ? [
        ...sourceLogos,
        ...extraInsuranceTools.filter(
          (extra) => !sourceLogos.some((logo) => logo.name.toLowerCase() === extra.name.toLowerCase()),
        ),
      ].slice(0, 16)
    : sourceLogos;
  const showHighlight = highlight !== undefined && highlight.trim() !== "";
  const centerLines = (centerText?.trim() || "AMS\nExperts").split("\n");
  const insuranceLogoPositions = [
    ...[100, 188, 276, 364, 452, 540].map((y) => ({ x: 80, y })),
    ...[100, 188, 276, 364, 452, 540].map((y) => ({ x: 920, y })),
    { x: 420, y: 78 },
    { x: 580, y: 78 },
    { x: 420, y: 562 },
    { x: 580, y: 562 },
  ];

  return (
    <section className="relative overflow-hidden bg-[#01012F] py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#01012F] px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#12B4CF] border border-[#12B4CF]/30">
              {eyebrow?.trim() || "Trusted Partners"}
            </span>
            <h2 className="mt-3 sm:mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {(heading ?? "Our VAs Are Experts in All Major").trim() ||
                "Our VAs Are Experts in All Major"}{" "}
              {showHighlight ? (
                <span className="text-[#12B4CF]">{highlight!.trim()}</span>
              ) : (
                <span className="text-[#12B4CF]">Insurance Software</span>
              )}
            </h2>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        {isInsuranceSoftware ? (
          <div className="mx-auto mt-8 w-full max-w-6xl px-2 sm:mt-10 sm:px-6">
            <div className="relative mx-auto aspect-[1000/640] w-full">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 1000 640"
                preserveAspectRatio="none"
              >
                {resolved.map((logo, i) => {
                  const target = insuranceLogoPositions[i];
                  let path = "";
                  let node = { x: 0, y: 0 };
                  if (i < 6) {
                    node = { x: 240, y: target.y };
                    path = `M 405 320 H ${node.x} V ${target.y} H ${target.x}`;
                  } else if (i < 12) {
                    node = { x: 760, y: target.y };
                    path = `M 595 320 H ${node.x} V ${target.y} H ${target.x}`;
                  } else if (i < 14) {
                    node = { x: target.x, y: 150 };
                    path = `M 500 280 V ${node.y} H ${target.x} V ${target.y}`;
                  } else {
                    node = { x: target.x, y: 490 };
                    path = `M 500 360 V ${node.y} H ${target.x} V ${target.y}`;
                  }
                  return (
                    <g key={`connection-${logo.name}-${i}`}>
                      <path d={path} fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="1.5" />
                      <circle cx={node.x} cy={node.y} r="4" fill="#12B4CF" fillOpacity="0.65" />
                      <g className="insurance-logo-arrow" opacity="0">
                        <path d="M -7 -5 L 5 0 L -7 5 Z" fill="#12B4CF" />
                        <animateMotion
                          path={path}
                          dur="16s"
                          begin={`${i}s`}
                          repeatCount="indefinite"
                          keyPoints="0;1;1"
                          keyTimes="0;0.05;1"
                          calcMode="linear"
                          rotate="auto"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0;0"
                          keyTimes="0;0.002;0.045;0.05;1"
                          dur="16s"
                          begin={`${i}s`}
                          repeatCount="indefinite"
                        />
                      </g>
                    </g>
                  );
                })}
              </svg>

              {resolved.map((logo, i) => {
                const position = insuranceLogoPositions[i];
                return (
                  <div
                    key={`${logo.name}-${i}`}
                    className="insurance-logo-card absolute flex h-11 w-[clamp(4rem,12vw,8rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-line/60 bg-white px-2 text-center shadow-[0_10px_28px_rgba(0,0,0,0.12)] sm:h-14 sm:px-3"
                    style={{ left: `${position.x / 10}%`, top: `${(position.y / 640) * 100}%`, animationDelay: `${i * 70}ms` }}
                  >
                    {logo.src ? (
                      <Image src={logo.src} alt={logo.name} width={160} height={64} loading="lazy" className="max-h-7 max-w-full object-contain opacity-85 sm:max-h-10" />
                    ) : (
                      <span className="line-clamp-2 text-[9px] font-bold leading-tight text-[#02024E] sm:text-xs">{logo.name}</span>
                    )}
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 z-1 flex h-[clamp(4.675rem,13.6vw,9.35rem)] w-[clamp(4.675rem,13.6vw,9.35rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/50 bg-white/20 p-3 text-center text-[9px] font-extrabold uppercase tracking-wider text-white shadow-[0_18px_56px_rgba(6,182,212,0.45)] backdrop-blur-2xl ring-1 ring-white/25 sm:text-xs">
                {centerLines.map((line, i) => <span key={i} className="block">{line}</span>)}
              </div>
            </div>
          </div>
        ) : (
          <div className="client-logo-orbit relative left-1/2 mt-12 flex h-[32rem] w-[32rem] -translate-x-1/2 scale-[0.6] items-center justify-center [--orbit-inner:115px] [--orbit-outer:205px] sm:left-0 sm:mx-auto sm:h-[40rem] sm:w-[40rem] sm:translate-x-0 sm:scale-100 sm:[--orbit-inner:165px] sm:[--orbit-outer:250px]">
            <div className="absolute inset-0 rounded-full border border-line/70" />
            <div className="absolute inset-5 rounded-full border border-dashed border-line/50 sm:inset-6" />
            <div className="absolute left-1/2 top-1/2 h-[calc(2*var(--orbit-inner))] w-[calc(2*var(--orbit-inner))] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/30" />
            <div className="absolute left-1/2 top-1/2 h-[calc(2*var(--orbit-outer))] w-[calc(2*var(--orbit-outer))] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/40" />
            <div
              className="absolute inset-0 [--logos-spin:0deg] animate-[logos-spin_26s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
              style={{ transform: "rotate(var(--logos-spin))" }}
            >
              {resolved.map((logo, i) => {
                const ringIndex = i % 8;
                const orbit = i < 8 ? "outer" : "inner";
                const angle = (ringIndex * 360) / 8;
                return (
                  <div
                    key={`${logo.name}-${i}`}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{ transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit-${orbit})))` }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 will-change-transform"
                      style={{
                        transform: `translate(-50%, -50%) rotate(calc(-1 * (var(--logos-spin) + ${angle}deg)))`,
                      }}
                    >
                      <div className="flex h-11 w-20 items-center justify-center overflow-hidden rounded-xl border border-line bg-white px-1.5 text-center shadow-[0_10px_28px_rgba(0,0,0,0.08)] sm:h-14 sm:w-28 sm:rounded-2xl sm:px-2">
                        {logo.src ? (
                          <Image src={logo.src} alt={logo.name} width={140} height={50} loading="lazy" className="h-6 max-w-full object-contain opacity-70 sm:h-8" />
                        ) : (
                          <span className="line-clamp-2 text-[10px] font-bold leading-tight text-[#02024E] sm:text-xs">{logo.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#01012F] via-[#12B4CF] to-[#12B4CF] text-center text-[10px] font-extrabold uppercase tracking-wider text-white shadow-[0_12px_36px_rgba(6,182,212,0.4)] ring-8 ring-[#12B4CF]/10 sm:h-24 sm:w-24 sm:text-xs">
              {centerLines.map((line, i) => <span key={i} className="block">{line}</span>)}
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}
