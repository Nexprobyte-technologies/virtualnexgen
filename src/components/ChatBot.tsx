"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { ChatbotEntry } from "@/lib/types";

type Speaker = "user" | "bot";

interface Message {
  id: string;
  from: Speaker;
  text: string;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

const siteSuggestions = [
  "What services do you offer?",
  "What is the pricing?",
  "How do I book an appointment?",
  "Do you provide AI automation?",
];

const adminSuggestions = [
  "Any new appointment?",
  "How do I add a new service in the admin panel?",
  "What is the admin panel and how does it work?",
  "How do I update the chatbot answers?",
];

const adminKeywords = [
  "admin",
  "panel",
  "dashboard",
  "service",
  "upload",
  "chatbot",
  "add",
  "new",
  "edit",
  "delete",
];

export default function ChatBot({ variant = "site" }: { variant?: "site" | "admin" }) {
  const isAdmin = variant === "admin";
  const suggestions = isAdmin ? adminSuggestions : siteSuggestions;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [muted, setMuted] = useState(false);
  const [listening, setListening] = useState(false);
  const [entries, setEntries] = useState<ChatbotEntry[]>([]);
  const [thinking, setThinking] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    fetch("/api/chatbot")
      .then((res) => res.json())
      .then((data) => {
        const all = (data.entries ?? []) as ChatbotEntry[];
        setEntries(isAdmin ? all.filter(isAdminEntry) : all);
      })
      .catch(() => setEntries([]));
  }, [open, isAdmin]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const getRecognition = useCallback((): SpeechRecognitionLike | null => {
    if (typeof window === "undefined") return null;
    const w = window as Window &
      typeof globalThis & {
        SpeechRecognition?: new () => SpeechRecognitionLike;
        webkitSpeechRecognition?: new () => SpeechRecognitionLike;
      };
    const ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!ctor) return null;
    const rec = new ctor();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    return rec;
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (muted || typeof window === "undefined" || !window.speechSynthesis) {
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google")) ??
        voices.find((v) => v.lang.startsWith("en"));
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    },
    [muted],
  );

  const pushBotAnswer = useCallback(
    async (question: string) => {
      const q = question.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

      const appointmentPatterns = [
        "new appointment",
        "any appointment",
        "recent appointment",
        "appointment received",
        "appointment list",
        "appointments",
        "booked appointment",
        "pending appointment",
        "upcoming appointment",
      ];

      const isAppointmentQuery = isAdmin && appointmentPatterns.some((p) => q.includes(p));

      if (isAppointmentQuery) {
        try {
          const res = await fetch("/api/appointments");
          const data = await res.json();
          const appointments = (data.appointments ?? []) as Array<{
            name: string;
            email: string;
            date: string;
            time: string;
            status: string;
            company?: string;
          }>;

          const pending = appointments.filter((a) => a.status === "pending");
          const confirmed = appointments.filter((a) => a.status === "confirmed");

          let answer = "";
          if (appointments.length === 0) {
            answer = "No appointments yet. When a client books through the website, it will show up here.";
          } else if (pending.length > 0) {
            const list = pending
              .map(
                (a) =>
                  `• ${a.name} (${a.company || "N/A"}) — ${a.date} at ${a.time} [${a.email}]`,
              )
              .join("\n");
            answer = `You have ${pending.length} pending appointment(s):\n${list}\n\nGo to Admin → Appointments to confirm or cancel.`;
          } else if (confirmed.length > 0) {
            const list = confirmed
              .map(
                (a) =>
                  `• ${a.name} — ${a.date} at ${a.time}`,
              )
              .join("\n");
            answer = `No pending appointments. You have ${confirmed.length} confirmed:\n${list}`;
          } else {
            answer = `You have ${appointments.length} total appointment(s) but none are pending or confirmed right now.`;
          }

          const botMsg: Message = {
            id: crypto.randomUUID(),
            from: "bot",
            text: answer,
          };
          setMessages((prev) => [...prev, botMsg]);
          speak(answer);
          return;
        } catch {
          const botMsg: Message = {
            id: crypto.randomUUID(),
            from: "bot",
            text: "I couldn't fetch appointment data right now. Please check the Admin → Appointments page directly.",
          };
          setMessages((prev) => [...prev, botMsg]);
          return;
        }
      }

      const entry = matchBot(question, entries);
      const answer = entry?.answer || defaultAnswerText(entries);
      const botMsg: Message = {
        id: crypto.randomUUID(),
        from: "bot",
        text: answer,
      };
      setMessages((prev) => [...prev, botMsg]);
      if (entry?.audio) {
        const audio = new Audio(entry.audio);
        audio.play().catch(() => {});
      } else {
        speak(answer);
      }
    },
    [entries, speak, isAdmin],
  );

  const send = useCallback(
    (raw?: string) => {
      const text = (raw ?? input).trim();
      if (!text) return;
      setInput("");
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), from: "user", text }]);
      setThinking(true);
      pushBotAnswer(text).finally(() => setThinking(false));
    },
    [input, pushBotAnswer],
  );

  const startListening = useCallback(() => {
    const rec = getRecognition();
    if (!rec) {
      alert("Voice input is not supported in this browser. Try Chrome or Edge.");
      return;
    }
    rec.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i]?.[0]?.transcript ?? "";
      }
      setInput(transcript);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => {
      setListening(false);
      setInput((value) => {
        if (value.trim()) send(value);
        return value;
      });
    };
    setListening(true);
    rec.start();
  }, [getRecognition, send]);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-deep to-brand text-ink shadow-[0_16px_44px_rgba(164,189,188,0.45)] transition hover:scale-105 hover:shadow-[0_16px_60px_rgba(164,189,188,0.6)]"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-deep to-brand px-4 py-3.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20">
              <Bot className="h-5 w-5 text-ink" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-ink">NexBot Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online — replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMuted((v) => !v)}
              aria-label={muted ? "Unmute voice" : "Mute voice"}
              className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-ink transition hover:bg-white/30"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-cream/50 p-4">
            {messages.length === 0 && !thinking && (
              <div className="flex flex-col gap-3">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3.5 text-sm leading-relaxed text-ink/80 shadow-sm">
                  {isAdmin ? (
                    <>
                      Hi, Admin! 👋 I&apos;m NexBot. Ask me about the{" "}
                      <span className="font-semibold text-brand-dark">
                        admin panel
                      </span>{" "}
                      — how to add a new service, upload content, or update the
                      chatbot. You can even speak to me.
                    </>
                  ) : (
                    <>
                      Hi! 👋 I&apos;m NexBot. Ask me anything about{" "}
                      <span className="font-semibold text-brand-dark">
                        Virtual Nexgen Solutions
                      </span>{" "}
                      — services, pricing, or booking. You can even speak to me.
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink/70 transition hover:border-brand hover:text-brand-dark"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.from === "user"
                      ? "rounded-tr-sm bg-gradient-to-r from-brand-deep to-brand text-ink"
                      : "rounded-tl-sm bg-white text-ink/85"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white px-4 py-3.5 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-brand"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line bg-white p-3">
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={startListening}
                aria-label="Speak your question"
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition ${
                  listening
                    ? "animate-pulse border-brand bg-brand/15 text-brand-dark"
                    : "border-line bg-white text-ink/70 hover:border-brand hover:text-brand-dark"
                }`}
              >
                {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder={listening ? "Listening..." : "Type your question..."}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-full border border-line bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand"
              />
              <button
                type="button"
                onClick={() => send()}
                aria-label="Send message"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-r from-brand-deep to-brand text-ink shadow-[0_10px_26px_rgba(164,189,188,0.4)] transition hover:shadow-[0_10px_40px_rgba(164,189,188,0.55)]"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-ink/40">
              Voice supported in Chrome &amp; Edge
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function matchBot(question: string, entries: ChatbotEntry[]) {
  const q = question.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!q) return null;
  const services = [
    "administrative",
    "insurance",
    "real estate",
    "legal",
    "healthcare",
    "marketing",
    "bookkeeping",
    "ai automation",
    "automation",
  ];
  const topics: Record<string, string> = {
    price: "pricing",
    cost: "pricing",
    appointment: "appointment",
    book: "appointment",
    calendly: "appointment",
    contact: "contact",
    support: "contact",
    phone: "contact",
    service: "services",
    offer: "services",
    admin: "admin panel",
    panel: "admin panel",
    "upload": "add a new service",
    "new service": "add a new service",
    "add service": "add a new service",
  };
  let bestMatch: { entry: ChatbotEntry; score: number } | null = null;

  for (const entry of entries) {
    if (!entry.question.trim()) continue;
    const entryQ = entry.question.toLowerCase();
    let score = 0;
    if (entryQ.includes(q)) score += 50;
    for (const word of services) {
      if (entryQ.includes(word) && q.includes(word)) score += word.length * 2;
    }
    Object.entries(topics).forEach(([key, topic]) => {
      if (q.includes(key) && entryQ.toLowerCase().includes(topic)) score += 12;
    });
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { entry, score };
    }
  }

  if (bestMatch) return bestMatch.entry;
  for (const [key, topic] of Object.entries(topics)) {
    if (q.includes(key)) {
      const fallback = entries.find((e) =>
        e.question.toLowerCase().includes(topic),
      );
      if (fallback) return fallback;
    }
  }
  const servicesHit = services.find((s) => q.includes(s));
  if (servicesHit) {
    const fallback = entries.find((e) =>
      e.question.toLowerCase().includes("services"),
    );
    if (fallback) return fallback;
  }
  return null;
}

function defaultAnswerText(entries: ChatbotEntry[]): string {
  const fallback = entries.find((e) => !e.question.trim());
  if (fallback?.answer) return fallback.answer;
  return "Sorry, I didn't catch that. Try asking about the admin panel, adding a new service, or editing the chatbot.";
}

function isAdminEntry(entry: ChatbotEntry): boolean {
  const haystack = `${entry.question} ${entry.answer}`.toLowerCase();
  return adminKeywords.some((k) => haystack.includes(k));
}