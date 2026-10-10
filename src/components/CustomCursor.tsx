"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot || !window.matchMedia("(pointer: fine)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      cursor.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onPointerLeave = () => {
      cursor.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const setHoverState = (hovering: boolean) => {
      cursor.classList.toggle("cursor-hover", hovering);
      dot.classList.toggle("cursor-dot-hover", hovering);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("a, button, [data-cursor-hover]")) {
        setHoverState(true);
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target;
      const related = event.relatedTarget;
      if (
        target instanceof Element &&
        target.closest("a, button, [data-cursor-hover]") &&
        (!(related instanceof Element) || !related.closest("a, button, [data-cursor-hover]"))
      ) {
        setHoverState(false);
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
