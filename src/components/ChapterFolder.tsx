"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FolderFloat, { type FolderFloatItem } from "@/components/FolderFloat";

interface ChapterFolderProps {
  items: FolderFloatItem[];
  label: string;
}

export default function ChapterFolder({
  items,
  label,
}: ChapterFolderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 280,
    height: 180,
    spread: 280,
    lift: 34,
    rowHeight: 52,
    enablePhysics: true,
  });

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth || window.innerWidth;

    if (cw < 360) {
      const fw = Math.min(240, Math.max(200, cw - 32));
      setDimensions({
        width: fw,
        height: Math.round(fw * 0.62),
        spread: Math.max(90, Math.floor((cw - 48) / 2)),
        lift: 20,
        rowHeight: 34,
        enablePhysics: false,
      });
    } else if (cw < 640) {
      const fw = Math.min(260, Math.max(220, cw - 40));
      setDimensions({
        width: fw,
        height: Math.round(fw * 0.62),
        spread: Math.max(110, Math.floor((cw - 56) / 2)),
        lift: 24,
        rowHeight: 36,
        enablePhysics: false,
      });
    } else if (cw < 1024) {
      setDimensions({
        width: 270,
        height: 175,
        spread: Math.min(270, Math.floor((cw - 48) / 2)),
        lift: 32,
        rowHeight: 48,
        enablePhysics: true,
      });
    } else {
      setDimensions({
        width: 280,
        height: 180,
        spread: 280,
        lift: 34,
        rowHeight: 52,
        enablePhysics: true,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const handleResize = () => updateDimensions();
    window.addEventListener("resize", handleResize);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      ro = new ResizeObserver(() => updateDimensions());
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      ro?.disconnect();
    };
  }, [updateDimensions]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const goToOverview = useCallback(() => {
    const target =
      document.getElementById("complete-overview") ||
      document.getElementById("get-started") ||
      document.querySelector("section#how-it-works");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center transition-all duration-700 ease-out ${
        isInView
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-8 scale-[0.82] opacity-0"
      }`}
    >
      <FolderFloat
        items={items}
        label={label}
        trigger="click"
        autoOpenOnView={isInView}
        drift={dimensions.enablePhysics ? 1 : 0.6}
        physics={dimensions.enablePhysics}
        width={dimensions.width}
        height={dimensions.height}
        spread={dimensions.spread}
        lift={dimensions.lift}
        rowHeight={dimensions.rowHeight}
        radius={20}
        tilt={6}
        openDuration={560}
        stagger={35}
        bounce={0.25}
        onSelect={goToOverview}
        closeOnSelect
      />
    </div>
  );
}
