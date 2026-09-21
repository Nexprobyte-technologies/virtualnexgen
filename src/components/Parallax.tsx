"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  axis?: "y" | "x";
};

export default function Parallax({
  children,
  className,
  speed = 0.3,
  axis = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const distance = 100 * speed;
      const from =
        axis === "y" ? { yPercent: -distance / 2 } : { xPercent: -distance / 2 };
      const to =
        axis === "y" ? { yPercent: distance / 2 } : { xPercent: distance / 2 };

      gsap.fromTo(el, from, {
        ...to,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  speed?: number;
  overlay?: ReactNode;
};

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  speed = 0.08,
  overlay,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const img = imgRef.current;
      const wrap = wrapRef.current;
      if (!img || !wrap) return;

      gsap.fromTo(
        img,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading="lazy"
        className={`scale-125 object-cover ${imgClassName ?? ""}`}
      />
      {overlay}
    </div>
  );
}
