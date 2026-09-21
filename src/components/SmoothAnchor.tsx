"use client";

import { useEffect } from "react";

const OFFSET = 88;

export default function SmoothAnchor() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash) return;

      if (hash === "#") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const el = document.querySelector(hash);
      if (!el) return;

      event.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
