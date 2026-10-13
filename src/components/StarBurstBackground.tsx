"use client";

import { useEffect, useRef } from "react";

type Star = {
  angle: number;
  distance: number;
  speed: number;
  length: number;
  size: number;
  phase: number;
};

const STAR_COUNT = 105;
const STAR_COLOR = "18, 180, 207";

export default function StarBurstBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const targetCanvas: HTMLCanvasElement = canvas;

    const context = targetCanvas.getContext("2d");
    if (context === null) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, index) => ({
      angle: (index / STAR_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.035,
      distance: Math.random() * 0.9,
      speed: 0.22 + Math.random() * 0.34,
      length: 12 + Math.random() * 64,
      size: 0.6 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;

    function resize() {
      const bounds = targetCanvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      targetCanvas.width = Math.round(width * ratio);
      targetCanvas.height = Math.round(height * ratio);
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedMotion) draw(0);
    }

    function draw(time: number) {
      if (!context || !width || !height) return;

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxDistance = Math.hypot(width, height) * 0.56;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      for (const star of stars) {
        if (!reducedMotion) star.distance += star.speed * delta;
        if (star.distance > 1) star.distance -= 1;

        const distance = star.distance * maxDistance;
        const tail = star.length * (0.25 + star.distance * 0.85);
        const x = centerX + Math.cos(star.angle) * distance;
        const y = centerY + Math.sin(star.angle) * distance;
        const tailX = centerX + Math.cos(star.angle) * Math.max(0, distance - tail);
        const tailY = centerY + Math.sin(star.angle) * Math.max(0, distance - tail);
        const fade = Math.min(1, star.distance * 4) * Math.min(1, (1 - star.distance) * 5);
        const twinkle = 0.72 + Math.sin(time * 0.0015 + star.phase) * 0.2;
        const alpha = Math.max(0, fade * twinkle * 0.62);

        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(x, y);
        context.strokeStyle = `rgba(${STAR_COLOR}, ${alpha * 0.55})`;
        context.lineWidth = star.size;
        context.stroke();

        context.beginPath();
        context.arc(x, y, star.size * 0.8, 0, Math.PI * 2);
        context.fillStyle = `rgba(220, 252, 255, ${alpha})`;
        context.fill();
      }

      context.globalCompositeOperation = "source-over";
      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      } else if (!reducedMotion && !frame) {
        frame = window.requestAnimationFrame(draw);
      }
    }

    const observer = new ResizeObserver(resize);
    observer.observe(targetCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();
    if (!reducedMotion && !document.hidden) {
      frame = window.requestAnimationFrame(draw);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
