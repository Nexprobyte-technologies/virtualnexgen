"use client";

import { useRef, useEffect } from "react";
import {
  UserCheck,
  SlidersHorizontal,
  Clock,
  DollarSign,
  Headphones,
  BadgeCheck,
  Building2,
  Award,
  Sparkles,
  Target,
  ShieldCheck,
  Circle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  UserCheck,
  SlidersHorizontal,
  Clock,
  DollarSign,
  Headphones,
  BadgeCheck,
  Building2,
  Award,
  Sparkles,
  Target,
  ShieldCheck,
};

function getIcon(name: string) {
  return ICON_MAP[name] || Circle;
}

interface ProseContentProps {
  html: string;
  className?: string;
}

export default function ProseContent({ html, className }: ProseContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const iconElements = ref.current.querySelectorAll("i[data-lucide]");
    iconElements.forEach((el) => {
      const iconName = el.getAttribute("data-lucide") || "";
      const IconComp = getIcon(iconName);
      const className = el.getAttribute("class") || "";

      const span = document.createElement("span");
      span.className = `inline-flex items-center justify-center ${className}`;
      span.innerHTML = "";

      const wrapper = document.createElement("span");
      wrapper.setAttribute("data-icon-rendered", "true");

      el.replaceWith(wrapper);

      import("react-dom/client").then(({ createRoot }) => {
        const root = createRoot(wrapper);
        root.render(<IconComp className={className} />);
      });
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className={className || "prose prose-lg max-w-none text-ink/70"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
