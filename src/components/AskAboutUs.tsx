"use client";

import { Bot, Sparkles } from "lucide-react";
import AIPlatformIcons from "@/components/AIPlatformIcons";

const quickQuestions = [
  "What services do you offer?",
  "What is the pricing?",
  "How do I book an appointment?",
];

export default function AskAboutUs() {
  const openChat = (question?: string) => {
    window.dispatchEvent(new CustomEvent("nexbot:open", { detail: { question } }));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => openChat()}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:shadow-[0_10px_36px_rgba(249,115,22,0.5)]"
        >
          <Bot className="h-4 w-4" />
          Ask AI about us
          <Sparkles className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {quickQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => openChat(q)}
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink/70 transition hover:border-brand hover:text-brand-dark"
          >
            {q}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        <AIPlatformIcons />
      </div>
    </div>
  );
}
