"use client";

import { useEffect, useState } from "react";

export default function MouseCursor() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMouse({ x: e.clientX, y: e.clientY, visible: true });
    }
    function handleMouseLeave() {
      setMouse((prev) => ({ ...prev, visible: false }));
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!mouse.visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[99998]"
      style={{ left: mouse.x, top: mouse.y }}
    >
      <span className="absolute -inset-6 animate-ping rounded-full bg-brand/15" />
      <span className="absolute -inset-3 rounded-full bg-brand/8" />
      <span className="relative flex h-4 w-4 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand/30" />
        <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-brand bg-brand/50 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
      </span>
    </div>
  );
}
