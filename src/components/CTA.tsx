"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const starCanvasRef = useRef<HTMLCanvasElement>(null);
  const [neonActive, setNeonActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNeonActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = starCanvasRef.current;
    const section = sectionRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !section || !context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let startTime = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars = Array.from({ length: 90 }, (_, index) => ({
      angle: (index / 90) * Math.PI * 2 + Math.random() * 0.025,
      size: 0.5 + Math.random() * 1.4,
      phase: Math.random(),
    }));

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (timestamp: number) => {
      if (startTime === 0) startTime = timestamp;
      context.clearRect(0, 0, width, height);
      const centerX = width * 0.5;
      const centerY = height * 0.48;
      const maxRadius = Math.hypot(width, height) * 0.7;
      const time = (timestamp - startTime) / 1000;

      const bloom = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * 0.72);
      bloom.addColorStop(0, "rgba(18,180,207,0.13)");
      bloom.addColorStop(0.4, "rgba(18,180,207,0.045)");
      bloom.addColorStop(1, "rgba(18,180,207,0)");
      context.fillStyle = bloom;
      context.fillRect(0, 0, width, height);

      // Fine radial rays make the particles read as an outward burst.
      context.save();
      context.translate(centerX, centerY);
      context.strokeStyle = "rgba(120,235,255,0.07)";
      context.lineWidth = 1;
      for (let ray = 0; ray < 28; ray += 1) {
        const angle = (ray / 28) * Math.PI * 2;
        context.beginPath();
        context.moveTo(Math.cos(angle) * 12, Math.sin(angle) * 9);
        context.lineTo(Math.cos(angle) * maxRadius, Math.sin(angle) * maxRadius * 0.72);
        context.stroke();
      }
      context.restore();

      stars.forEach((star) => {
        const progress = reducedMotion ? 0.72 : (time * 0.22 + star.phase) % 1;
        const fade = reducedMotion ? 0.6 : Math.sin(progress * Math.PI);
        const radius = maxRadius * (0.04 + progress * 0.96);
        const x = centerX + Math.cos(star.angle) * radius;
        const y = centerY + Math.sin(star.angle) * radius * 0.72;
        const tailRadius = Math.max(0, radius - maxRadius * 0.035);
        context.globalAlpha = fade * 0.82;
        context.fillStyle = "#a7f7ff";
        context.shadowColor = "#12b4cf";
        context.shadowBlur = star.size * 5;
        context.strokeStyle = "rgba(167,247,255,0.5)";
        context.lineWidth = star.size * 0.7;
        context.beginPath();
        context.moveTo(centerX + Math.cos(star.angle) * tailRadius, centerY + Math.sin(star.angle) * tailRadius * 0.72);
        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.arc(x, y, star.size, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(section);
    resize();
    draw(performance.now());
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="faq" className={`relative z-10 overflow-hidden bg-[#01012F] py-10 sm:py-12 md:py-16 lg:py-18 ${neonActive ? "cta-neon-active" : ""}`}>
      <style>{`
        @keyframes cta-title-shimmer {
          to { background-position: 200% center; }
        }
        @keyframes cta-card-pulse {
          0%, 100% { box-shadow: 0 25px 60px rgba(18,180,207,0.16); }
          50% { box-shadow: 0 28px 72px rgba(18,180,207,0.3), 0 0 24px rgba(18,180,207,0.14); }
        }
        @keyframes cta-neon-sweep {
          0% { transform: scaleX(0.02); opacity: 0.25; }
          70%, 100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes cta-neon-wash {
          0% { opacity: 0; transform: scaleY(0.2); }
          100% { opacity: 1; transform: scaleY(1); }
        }
        .cta-neon-tube {
          transform-origin: center;
          box-shadow: 0 0 5px #8cf7ff, 0 0 14px #12b4cf, 0 0 30px rgba(18,180,207,.72);
        }
        .cta-neon-wash {
          background: linear-gradient(180deg, rgba(18,180,207,.2), rgba(18,180,207,.08) 35%, transparent 100%);
          transform-origin: top;
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        @media (prefers-reduced-motion: no-preference) {
          .cta-title-accent {
            background: linear-gradient(100deg, #54D9E8 10%, #fffaf3 48%, #54D9E8 86%);
            background-size: 200% auto;
            background-clip: text;
            color: transparent;
            animation: cta-title-shimmer 5s linear infinite;
          }
          .cta-consultation-card { animation: cta-card-pulse 4s ease-in-out infinite; }
          .cta-neon-active .cta-neon-tube { animation: cta-neon-sweep 1.8s cubic-bezier(.16,1,.3,1) both; }
          .cta-neon-active .cta-neon-wash { animation: cta-neon-wash 1.4s ease-out .35s both; }
        }
      `}</style>
      <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#12B4CF]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />
      <canvas ref={starCanvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[65%] overflow-hidden">
        <div className="cta-neon-wash absolute inset-x-0 top-0 h-full opacity-0" />
        <div className="cta-neon-tube absolute left-[8%] right-[8%] top-0 h-[2px] rounded-full bg-[#bafaff] opacity-0" />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">

        <Reveal y={30}>
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <span className="mb-3 inline-flex items-center rounded-full border border-[#12B4CF]/35 bg-[#12B4CF]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#70E9F5] sm:text-xs">
              Let&apos;s grow together
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#fffaf3] mb-3 sm:mb-4">
              Ready to Get <span className="cta-title-accent">Started?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg font-normal text-[#fffaf3]/80 max-w-xl mx-auto">
              Book a free consultation and see how our virtual assistants can help your business grow.
            </p>
          </div>
        </Reveal>

        <Reveal y={30} delay={0.15}>
          <div className="cta-consultation-card bg-gradient-to-br from-white via-[#fffaf3] to-[#ddfaff] rounded-2xl sm:rounded-3xl border border-white/70 px-5 sm:px-8 md:px-10 py-6 sm:py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-[0_25px_60px_rgba(18,180,207,0.18)]">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#02024E] text-center md:text-left">
              Start Saving With a Free Consultation
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="https://calendly.com/virtualnexgen-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-white border border-[#02024E] px-5 sm:px-6 py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(255,255,255,0.4)] transition-all duration-300 hover:bg-white hover:border-[#02024E] w-full sm:w-auto justify-center"
              >
                <span className="text-sm sm:text-base font-bold text-[#02024E] whitespace-nowrap">Book Your Demo</span>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#fffaf3] text-[#02024E] flex-shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-[#02024E]">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
