import { promises as fs } from "fs";
import path from "path";
import type { Service, ServiceSection } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "services.json");

const seed: Array<Omit<Service, "sections">> = [
  {
    id: "seed-admin",
    slug: "administrative-support",
    name: "Administrative Support",
    eyebrow: "ADMINISTRATIVE SUPPORT SERVICES",
    image:
      "https://static.vecteezy.com/system/resources/previews/054/845/292/non_2x/agentic-ai-workflow-automation-artificial-intelligence-ai-driven-decision-making-concept-illustration-clipart-png.png",
    short:
      "From email management to scheduling and data entry, Virtual Nexgen Solutions delivers reliable administrative support, allowing you to focus on growing your business.",
    content: [
      "Our administrative support services cover everything your back-office needs to run smoothly — email and calendar management, data entry, document preparation, travel coordination and daily task handling.",
      "Each assistant is trained to follow your workflow, use your tools and communicate the way you prefer, so support feels invisible but impactful from day one.",
      "Whether you need a full-time assistant or help during peak seasons, we scale the team to match your workload and budget.",
      "Get a dedicated administrator today and reclaim hours of your week for high-value decisions.",
    ],
    createdAt: "2026-01-02T09:00:00.000Z",
  },
  {
    id: "seed-insurance",
    slug: "insurance-support",
    name: "Insurance Support",
    eyebrow: "INSURANCE SUPPORT SERVICES",
    image:
      "https://png.pngtree.com/png-clipart/20250515/original/pngtree-ai-matrix-head-png-sticker-illustration-png-image_20982168.png",
    short:
      "At Virtual Nexgen Solutions, we provide seamless insurance support services, from policy management to claims processing, ensuring accuracy and efficiency for your operations.",
    content: [
      "We handle the repetitive, detail-heavy work of your insurance back office — policy data entry into CRMs, claims follow-ups, documentation and customer status updates.",
      "Our assistants are trained on compliance awareness and data accuracy, reducing errors and keeping your records audit-ready.",
      "Scale your servicing capacity without hiring: our team plugs directly into your agencies, portals and management systems.",
      "Let your agents sell while we manage the paperwork, follow-ups and admin your book of business depends on.",
    ],
    createdAt: "2026-01-02T09:05:00.000Z",
  },
  {
    id: "seed-ai",
    slug: "ai-automation",
    name: "AI Automation",
    eyebrow: "AI AUTOMATION SERVICES",
    image:
      "https://file.aiquickdraw.com/imgcompressed/img/compressed_14fa0f4e9d0153477eed77c2d5a81be6.webp",
    short:
      "From chatbots to workflow automation, Virtual Nexgen Solutions empowers your business with intelligent AI tools to enhance efficiency, reduce costs, and drive innovation.",
    content: [
      "We design and deploy AI automations that remove manual work from your operations — lead qualification, chatbot conversations, document processing and report generation.",
      "Our team audits your workflow end-to-end, identifies the highest-impact bottlenecks and builds automations your staff will actually enjoy using.",
      "Every solution is monitored, measured and refined so the savings keep compounding month after month.",
      "Ready to automate? Let's map your workflow and show you exactly which tasks AI can take off your plate.",
    ],
    createdAt: "2026-01-02T09:10:00.000Z",
  },
  {
    id: "seed-marketing",
    slug: "marketing-virtual-assistants",
    name: "Marketing Virtual Assistants",
    eyebrow: "MARKETING VIRTUAL ASSISTANTS",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/067/480/693/small_2x/agentic-ai-robotic-process-automation-management-application-of-artificial-intelligence-clipart-png.png",
    short:
      "Our marketing virtual assistants handle social media management, content creation, and campaign coordination, helping you build a stronger brand and reach your audience effectively.",
    content: [
      "Our marketing assistants plan and publish your social content, schedule posts, respond to comments and keep a consistent brand voice across every channel.",
      "They support campaign coordination — from ad-platform checklists to launch reminders and performance recap reports for your review.",
      "Need content? We draft copy, repurpose video and build simple graphics so your marketing machine never runs dry.",
      "Give your campaigns a full-time pair of hands without the overhead of a full-time hire.",
    ],
    createdAt: "2026-01-02T09:15:00.000Z",
  },
];

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify(seed.map(normalizeSections), null, 2),
      "utf-8",
    );
  }
}

function normalizeSections(
  service: Omit<Service, "sections"> & { sections?: ServiceSection[] },
): Service {
  let sections: ServiceSection[];
  if (Array.isArray(service.sections) && service.sections.length > 0) {
    sections = service.sections;
  } else {
    sections = service.content
      .slice(0, 5)
      .map((text) => ({ heading: "", text, image: "" }));
    if (sections.length === 0 && service.image) {
      sections.push({ heading: "", text: service.short, image: service.image });
    }
  }
  return {
    ...service,
    sections,
    ctaTitle:
      service.ctaTitle || `Ready to get started with ${service.name}?`,
    ctaText:
      service.ctaText ||
      "Talk to our team and get a tailored plan for your business — no obligation, just a clear roadmap for how we can help.",
    ctaButton: service.ctaButton || "Book a Free Consultation",
    ctaPhone: service.ctaPhone || "+1 341 888 6504",
    ctaPoints: service.ctaPoints?.length
      ? service.ctaPoints
      : [
          "Dedicated team or pay-as-you-go",
          "Onboarding within days",
          "No long-term lock-in",
          "Data & compliance aware",
        ],
  };
}

export async function getServices(): Promise<Service[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const list = JSON.parse(raw) as Service[];
  return list.map(normalizeSections);
}

export async function getService(
  slug: string,
): Promise<Service | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface ServiceInput {
  name: string;
  eyebrow?: string;
  image?: string;
  short?: string;
  content?: string[];
  sections?: ServiceSection[];
  slug?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
  ctaPhone?: string;
  ctaPoints?: string[];
  benefits?: import("./types").ServiceBenefit[];
  steps?: import("./types").ServiceStep[];
  pricing?: import("./types").ServicePricing[];
  testimonials?: import("./types").ServiceTestimonial[];
  faqs?: import("./types").ServiceFaq[];
}

export async function addService(input: ServiceInput): Promise<Service> {
  const all = await getServices();
  const base = slugify(input.slug ?? input.name) || "service";
  let slug = base;
  let n = 2;
  while (all.some((s) => s.slug === slug)) {
    slug = `${base}-${n++}`;
  }
  const sections =
    input.sections && input.sections.length > 0
      ? input.sections
      : (input.content ?? []).slice(0, 5).map((text) => ({
          heading: "",
          text,
          image: "",
        }));
  const record: Service = {
    id: crypto.randomUUID(),
    slug,
    name: input.name,
    eyebrow: input.eyebrow ?? input.name.toUpperCase(),
    image: input.image ?? "",
    short: input.short ?? "",
    content: input.content ?? [],
    sections,
    createdAt: new Date().toISOString(),
    ctaTitle: input.ctaTitle,
    ctaText: input.ctaText,
    ctaButton: input.ctaButton,
    ctaPhone: input.ctaPhone,
    ctaPoints: input.ctaPoints,
    benefits: input.benefits,
    steps: input.steps,
    pricing: input.pricing,
    testimonials: input.testimonials,
    faqs: input.faqs,
  };
  all.unshift(record);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return record;
}

export async function deleteService(slug: string): Promise<boolean> {
  const all = await getServices();
  const next = all.filter((s) => s.slug !== slug);
  if (next.length === all.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
  return true;
}

export async function updateService(
  slug: string,
  input: ServiceInput,
): Promise<Service | null> {
  const all = await getServices();
  const index = all.findIndex((s) => s.slug === slug);
  if (index === -1) return null;
  const prev = all[index];
  const next: Service = {
    ...prev,
    name: input.name,
    eyebrow: input.eyebrow || input.name.toUpperCase(),
    image: input.image ?? prev.image,
    short: input.short ?? "",
    content:
      input.content && input.content.length > 0 ? input.content : prev.content,
    sections:
      input.sections && input.sections.length > 0
        ? input.sections
        : prev.sections,
    ctaTitle: input.ctaTitle ?? prev.ctaTitle,
    ctaText: input.ctaText ?? prev.ctaText,
    ctaButton: input.ctaButton ?? prev.ctaButton,
    ctaPhone: input.ctaPhone ?? prev.ctaPhone,
    ctaPoints: input.ctaPoints ?? prev.ctaPoints,
    benefits: input.benefits ?? prev.benefits,
    steps: input.steps ?? prev.steps,
    pricing: input.pricing ?? prev.pricing,
    testimonials: input.testimonials ?? prev.testimonials,
    faqs: input.faqs ?? prev.faqs,
  };
  all[index] = next;
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return next;
}

export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");