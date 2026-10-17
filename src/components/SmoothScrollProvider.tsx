"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Let touch browsers own scrolling and pull-to-refresh. Lenis is useful
    // for wheel/trackpad navigation, but hijacking touch scrolling can make
    // the live mobile viewport feel stuck after a refresh or app resume.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frameId = 0;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    const start = () => {
      if (!frameId) frameId = requestAnimationFrame(raf);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return <>{children}</>;
}
