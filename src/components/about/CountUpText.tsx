"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates every number found inside `value` from 0 to its target value
 * once the element scrolls into view.
 */
export default function CountUpText({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let startTime = 0;
    const duration = 1200;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setProgress(0);

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const nextProgress = Math.min((time - startTime) / duration, 1);
        setProgress(1 - (1 - nextProgress) ** 3);
        if (nextProgress < 1) frame = window.requestAnimationFrame(animate);
      };

      frame = window.requestAnimationFrame(animate);
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const animatedValue = value.replace(/\d[\d,]*(?:\.\d+)?/g, (number) => {
    const target = Number(number.replace(/,/g, ""));
    const decimals = number.includes(".") ? number.split(".")[1].length : 0;
    return (target * progress).toFixed(decimals);
  });

  return <span ref={ref} aria-label={value}>{animatedValue}</span>;
}