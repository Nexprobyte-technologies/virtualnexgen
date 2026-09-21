"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const refresh = () => ScrollTrigger.refresh();

  window.addEventListener("load", refresh);
  window.addEventListener("pageshow", refresh);

  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh);
  }

  window.addEventListener("load", () => {
    document.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });
  });
}

export { gsap, ScrollTrigger, useGSAP };
