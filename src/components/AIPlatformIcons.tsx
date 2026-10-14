import { SiPerplexity } from "react-icons/si";

const aiPrompt = `Analyze https://virtualnexgen.com and explain how Virtual Nexgen Solutions can help my business grow through dedicated Virtual Assistants and AI automation. Highlight the tasks I can delegate, potential cost savings, productivity improvements, industry-specific solutions, and opportunities to scale compared with hiring in-house staff. Provide practical recommendations tailored to my business and explain how Virtual Nexgen Solutions can improve operational efficiency and support sustainable growth.

To personalize your recommendations, please ask me:
1. What industry does my business operate in?
2. What tasks or daily operations do I need help with?
3. What is my biggest business challenge right now?
4. Am I looking for part-time or full-time support?`;
const encodedAiPrompt = encodeURIComponent(aiPrompt);

const aiTools = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${encodedAiPrompt}`, icon: "openai" },
  { name: "Perplexity AI", href: `https://www.perplexity.ai/search?q=${encodedAiPrompt}`, icon: "perplexity" },
  { name: "Claude AI", href: `https://claude.ai/new?q=${encodedAiPrompt}`, icon: "claude" },
  { name: "Gemini AI", href: `https://gemini.google.com/app?q=${encodedAiPrompt}`, icon: "gemini" },
  { name: "Meta AI", href: `https://www.meta.ai/?q=${encodedAiPrompt}`, icon: "meta" },
];

export default function AIPlatformIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
      {aiTools.map((ai) => (
        <a
          key={ai.name}
          href={ai.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ai.name}
          title={ai.name}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/10 text-[#02024E]/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#12B4CF] hover:bg-[#12B4CF] hover:text-[#02024E] hover:shadow-[0_4px_16px_rgba(6,182,212,0.4)] sm:h-10 sm:w-10"
        >
          {ai.icon === "perplexity" ? (
            <SiPerplexity className="h-6 w-6 shrink-0" aria-hidden="true" />
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {ai.icon === "openai" && <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />}
              {ai.icon === "claude" && <path d="M12 1.5 13.7 9l6.5-4-4 6.4 7.3 1.8-7.3 1.7 4 6.5-6.5-4-1.7 7.1-1.7-7.1-6.5 4 4-6.5L.5 13.2l7.3-1.8-4-6.4 6.5 4L12 1.5Z" />}
              {ai.icon === "gemini" && <path d="M12 1.5c1.2 5.7 4.8 9.3 10.5 10.5-5.7 1.2-9.3 4.8-10.5 10.5C10.8 16.8 7.2 13.2 1.5 12 7.2 10.8 10.8 7.2 12 1.5Z" />}
              {ai.icon === "meta" && <path d="M6.8 6.1c2.4 0 4.1 2.3 5.2 4.1 1.6-2.7 3.2-4.1 5.2-4.1 3.2 0 5.3 3.1 5.3 6.7 0 3.4-1.7 5.1-4 5.1-2 0-3.4-1.4-5-4.2l-1.2-2c-1.4-2.3-2.6-3.8-4.2-3.8-1.8 0-3 2-3 4.9 0 1.9.6 3 1.7 3 1 0 1.8-1 2.7-2.5l1.3 2c-1.2 2-2.5 3.3-4.2 3.3-2.5 0-4.1-2.3-4.1-5.8 0-3.9 2-6.7 5.3-6.7Zm10.4 0c-1.7 0-3.2 1.8-4.7 4.3l1.2 2c1.4 2.3 2.4 3.4 3.6 3.4 1.1 0 1.8-1.1 1.8-3 0-2.8-.8-6.7-1.9-6.7Z" />}
            </svg>
          )}
        </a>
      ))}
    </div>
  );
}
