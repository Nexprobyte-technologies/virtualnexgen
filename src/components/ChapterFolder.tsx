"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FolderFloat, { type FolderFloatItem } from "@/components/FolderFloat";

interface ChapterFolderProps {
  items: FolderFloatItem[];
  label: string;
  sublabel?: string;
}

export default function ChapterFolder({
  items,
  label,
  sublabel,
}: ChapterFolderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasEnteredView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  const goToOverview = useCallback(() => {
    document
      .getElementById("complete-overview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-700 ease-out ${
        hasEnteredView
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-8 scale-[0.82] opacity-0"
      }`}
    >
      <FolderFloat
        key={hasEnteredView ? "entered-view" : "waiting-for-view"}
        items={items}
        label={label}
        sublabel={sublabel}
        trigger="click"
        defaultOpen={hasEnteredView}
        drift={1}
        width={280}
        height={180}
        spread={280}
        lift={34}
        radius={22}
        tilt={7}
        openDuration={560}
        stagger={40}
        bounce={0.3}
        onSelect={goToOverview}
        closeOnSelect
      />
    </div>
  );
}
