"use client";

import { useCallback } from "react";
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
  const goToOverview = useCallback(() => {
    document
      .getElementById("complete-overview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <FolderFloat
      items={items}
      label={label}
      sublabel={sublabel}
      trigger="click"
      defaultOpen
      autoCycle
      autoCycleOpenMs={20000}
      autoCycleCloseMs={1200}
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
  );
}
