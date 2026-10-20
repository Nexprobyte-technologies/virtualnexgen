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
    <div className="flex flex-col items-center gap-5 sm:gap-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => openChat()}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition hover:shadow-[0_10px_36px_rgba(249,115,22,0.5)] sm:px-6"
        >
          <Bot className="h-4 w-4 shrink-0" />
          Ask AI about us
          <Sparkles className="h-4 w-4 shrink-0" />
        </button>
      </div>
      <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
        {quickQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => openChat(q)}
            className="shrink-0 whitespace-nowrap rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink/70 transition hover:border-brand hover:text-brand-dark"
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
