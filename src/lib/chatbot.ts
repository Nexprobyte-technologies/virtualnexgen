import { promises as fs } from "fs";
import path from "path";
import type { ChatbotEntry } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "chatbot.json");

const now = () => new Date().toISOString();

const seed: ChatbotEntry[] = [
  {
    id: "seed-default",
    question: "",
    answer:
      "Hi! I'm NexBot. Ask me about our virtual assistant services, AI automation, pricing, or how to get started — I'm happy to help.",
    audio: "",
    createdAt: "2026-01-02T09:00:00.000Z",
  },
  {
    id: "seed-services",
    question: "What services do you offer?",
    answer:
      "We provide virtual assistant and AI automation services across Administrative Support, Insurance Support, Real Estate, Legal, Healthcare, Marketing, Bookkeeping and AI Automation.",
    audio: "",
    createdAt: "2026-01-02T09:00:01.000Z",
  },
  {
    id: "seed-pricing",
    question: "What is the pricing?",
    answer:
      "We offer a dedicated team or pay-as-you-go options with onboarding within days and no long-term lock-in.",
    audio: "",
    createdAt: "2026-01-02T09:00:02.000Z",
  },
  {
    id: "seed-ai",
    question: "Do you provide AI automation?",
    answer:
      "Yes! We design and deploy AI automations for lead qualification, chatbots, document processing and workflow automation.",
    audio: "",
    createdAt: "2026-01-02T09:00:03.000Z",
  },
  {
    id: "seed-appointment",
    question: "How do I book an appointment?",
    answer:
      "You can book a free consultation at calendly.com/virtualnexgen-info/30min — pick a slot that works for you.",
    audio: "",
    createdAt: "2026-01-02T09:00:04.000Z",
  },
  {
    id: "seed-contact",
    question: "How can I contact support?",
    answer:
      "Call us at +1 341 888 6504 or book a call via Calendly and our team will reach out to you.",
    audio: "",
    createdAt: "2026-01-02T09:00:05.000Z",
  },
  {
    id: "seed-addservice",
    question: "How do I add a new service in the admin panel?",
    answer:
      "To add a new service: 1) Log in to the admin panel at /admin. 2) Open Services from the left side menu. 3) Click 'Add New Service'. 4) Enter the Heading Name (required). 5) Optionally fill Eyebrow Label, Short Text and the Main Image (upload or paste a URL). 6) Add Page Sections — each section has a heading, content text and an optional image. 7) Adjust the Get Started (CTA) section: heading, description, button label, phone number and checklist points. 8) Click 'Add Service' to save. The new service instantly appears in the services dropdown.",
    audio: "",
    createdAt: "2026-01-02T09:00:06.000Z",
  },
  {
    id: "seed-adminpanel",
    question: "What is the admin panel and how does it work?",
    answer:
      "The admin panel is the dashboard where you manage the website content without touching code. From the left side menu you can: open the Dashboard to see stats, manage Services (add/edit/delete services, sections, images and the Get Started text), and manage the Chatbot (add questions and answers for the site chatbot, including voice-recorded answers). The right side NexBot popup is available across admin pages for help. Login happens at /admin with your admin credentials.",
    audio: "",
    createdAt: "2026-01-02T09:00:07.000Z",
  },
];

async function ensureFile(): Promise<ChatbotEntry[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const list = JSON.parse(raw) as ChatbotEntry[];
    if (Array.isArray(list) && list.length > 0) return list;
    throw new Error("empty");
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2), "utf-8");
    return seed;
  }
}

export async function getChatbotEntries(): Promise<ChatbotEntry[]> {
  return ensureFile();
}

export type ChatbotInput = {
  question: string;
  answer: string;
  audio: string;
};

export async function addChatbotEntry(input: ChatbotInput): Promise<ChatbotEntry> {
  const all = await ensureFile();
  const entry: ChatbotEntry = {
    id: crypto.randomUUID(),
    question: input.question,
    answer: input.answer,
    audio: input.audio,
    createdAt: now(),
  };
  all.push(entry);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return entry;
}

export async function updateChatbotEntry(
  id: string,
  input: ChatbotInput,
): Promise<ChatbotEntry | null> {
  const all = await ensureFile();
  const index = all.findIndex((e) => e.id === id);
  if (index === -1) return null;
  const next: ChatbotEntry = {
    ...all[index],
    question: input.question,
    answer: input.answer,
    audio: input.audio,
  };
  all[index] = next;
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return next;
}

export async function deleteChatbotEntry(id: string): Promise<boolean> {
  const all = await ensureFile();
  const next = all.filter((e) => e.id !== id);
  if (next.length === all.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
  return true;
}

export function defaultAnswer(entries: ChatbotEntry[]): string {
  const fallback = entries.find((e) => !e.question.trim());
  if (fallback?.answer) return fallback.answer;
  return "Sorry, I didn't catch that. Try asking about our services, pricing, or booking an appointment.";
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchAnswer(
  question: string,
  entries: ChatbotEntry[],
): ChatbotEntry | null {
  const q = normalizeText(question);
  if (!q) return null;
  const keywords = [
    "administrative",
    "insurance",
    "real estate",
    "legal",
    "healthcare",
    "marketing",
    "bookkeeping",
    "ai",
    "automation",
    "service",
    "add",
    "new",
    "admin",
    "panel",
    "upload",
    "price",
    "cost",
    "appointment",
    "book",
    "contact",
    "support",
    "calendly",
    "phone",
    "hire",
    "team",
    "onboard",
  ];
  let best: { entry: ChatbotEntry; score: number } | null = null;
  for (const entry of entries) {
    const questionText = entry.question;
    const keywordsInEntry = keywords.filter((k) =>
      normalizeText(questionText).includes(k),
    );
    let hit = 0;
    for (const word of keywordsInEntry) {
      if (q.includes(word)) hit += word.length;
    }
    if (hit > 0 && (!best || hit > best.score)) {
      best = { entry, score: hit };
    }
  }
  return best?.entry ?? null;
}

export const AUDIO_UPLOAD_DIR = path.join(
  process.cwd(),
  "public",
  "uploads",
  "chatbot",
);