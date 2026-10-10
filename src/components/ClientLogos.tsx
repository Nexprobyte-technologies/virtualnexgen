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

const stableSvgNumber = (value: number) => Number(value.toFixed(3));

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
  const centerLines = (centerText?.trim() || (isInsuranceSoftware ? "AMS\nExperts" : "VA\nExperts")).split("\n");
  const circuitLogoPositions = resolved.map((_, i) => {
    const ringIndex = Math.floor(i / 2);
    const isOuterRing = i % 2 === 0;
    const angle = -Math.PI / 2 + (ringIndex * Math.PI * 2) / Math.ceil(resolved.length / 2) + (isOuterRing ? 0 : Math.PI / Math.ceil(resolved.length / 2));
    const rx = isOuterRing ? 400 : 255;
    const ry = isOuterRing ? 300 : 190;
    return {
      x: stableSvgNumber(500 + Math.cos(angle) * rx),
      y: stableSvgNumber(410 + Math.sin(angle) * ry),
      angle,
      rx,
      ry,
    };
  });

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
        <div className="mx-auto mt-8 w-full max-w-4xl px-2 sm:mt-10 sm:px-6">
            <div className="relative mx-auto aspect-[1000/820] w-full">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 1000 820"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="service-circuit-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#12B4CF" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#12B4CF" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="service-circuit-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="softGlow" />
                    <feMerge>
                      <feMergeNode in="softGlow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <ellipse cx="500" cy="410" rx="400" ry="300" fill="none" stroke="#12B4CF" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 12" />
                <ellipse cx="500" cy="410" rx="255" ry="190" fill="none" stroke="#38BDF8" strokeOpacity="0.17" strokeWidth="1.5" strokeDasharray="2 8" />
                {resolved.map((logo, i) => {
                  const target = circuitLogoPositions[i];
                  const startRx = Math.max(120, target.rx * 0.34);
                  const startRy = Math.max(120, target.ry * 0.34);
                  const pathStart = {
                    x: stableSvgNumber(500 + Math.cos(target.angle) * startRx),
                    y: stableSvgNumber(410 + Math.sin(target.angle) * startRy),
                  };
                  const pathEnd = {
                    x: stableSvgNumber(500 + Math.cos(target.angle) * (target.rx - 75)),
                    y: stableSvgNumber(410 + Math.sin(target.angle) * (target.ry - 45)),
                  };
                  const path = `M ${pathStart.x} ${pathStart.y} L ${pathEnd.x} ${pathEnd.y}`;
                  return (
                    <g key={`connection-${logo.name}-${i}`}>
                      <path d={path} fill="none" stroke="#12B4CF" strokeOpacity="0.18" strokeWidth="8" />
                      <path d={path} fill="none" stroke="url(#service-circuit-line)" strokeWidth="2" filter="url(#service-circuit-glow)" />
                      <circle cx={pathStart.x} cy={pathStart.y} r="5" fill="#01012F" stroke="#38BDF8" strokeWidth="2" />
                      <circle cx={pathEnd.x} cy={pathEnd.y} r="5" fill="#12B4CF" />
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
                const position = circuitLogoPositions[i];
                return (
                  <div
                    key={`${logo.name}-${i}`}
                    className="insurance-logo-card absolute flex h-12 w-[clamp(4rem,9vw,8rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-2xl border border-[#12B4CF]/25 bg-white px-2 text-center shadow-[0_8px_24px_rgba(3,17,50,0.32)] transition-[border-color,box-shadow] duration-300 hover:border-[#38BDF8]/80 hover:shadow-[0_0_24px_rgba(18,180,207,0.3)] sm:h-16 sm:px-3"
                    style={{ left: `${position.x / 10}%`, top: `${(position.y / 820) * 100}%`, animationDelay: `${i * 70}ms` }}
                  >
                    {logo.src ? (
                      <Image src={logo.src} alt={logo.name} width={160} height={64} loading="lazy" className="max-h-8 max-w-full object-contain opacity-95 sm:max-h-10" />
                    ) : (
                      <span className="line-clamp-2 text-[9px] font-bold leading-tight text-[#02024E] sm:text-xs">{logo.name}</span>
                    )}
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 z-10 flex h-[clamp(4.675rem,13.6vw,9.35rem)] w-[clamp(4.675rem,13.6vw,9.35rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-[#7DEBFF]/80 bg-gradient-to-br from-[#12B4CF]/40 via-[#081A46]/95 to-[#01012F] p-2 text-center text-[9px] font-extrabold uppercase tracking-wider text-white shadow-[0_0_0_8px_rgba(18,180,207,0.08),0_0_44px_rgba(18,180,207,0.5)] sm:gap-1.5 sm:p-3 sm:text-xs">
                {centerLines.map((line, i) => <span key={i} className="block">{line}</span>)}
              </div>
            </div>
        </div>
      </Reveal>
    </section>
  );
}
