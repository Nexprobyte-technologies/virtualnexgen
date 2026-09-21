import { promises as fs } from "fs";
import path from "path";
import { UPLOAD_DIR } from "./services";
import type { ServiceSection, ServiceBenefit, ServiceStep, ServicePricing, ServiceTestimonial, ServiceFaq } from "./types";

export const MAX_SECTIONS = 5;

const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];

export async function saveUpload(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    throw new Error("Unsupported image type");
  }
  const name = `${Date.now()}-${Math.floor(Math.random() * 1e6)}${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, name), buffer);
  return `/uploads/${name}`;
}

export interface ParsedServiceInput {
  name: string;
  eyebrow: string;
  short: string;
  content: string[];
  imageUrl: string;
  sections: ServiceSection[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaPhone: string;
  ctaPoints: string[];
  benefits: ServiceBenefit[];
  steps: ServiceStep[];
  pricing: ServicePricing[];
  testimonials: ServiceTestimonial[];
  faqs: ServiceFaq[];
}

export const CTA_POINT_FIELDS = [
  "ctaPoint_0",
  "ctaPoint_1",
  "ctaPoint_2",
  "ctaPoint_3",
  "ctaPoint_4",
];

export async function parseServiceRequest(
  request: Request,
): Promise<ParsedServiceInput> {
  const contentType = request.headers.get("content-type") ?? "";
  let name = "";
  let eyebrow = "";
  let short = "";
  let content = "";
  let imageUrl = "";
  let sections: ServiceSection[] = [];
  let ctaTitle = "";
  let ctaText = "";
  let ctaButton = "";
  let ctaPhone = "";
  let ctaPoints: string[] = [];
  let benefits: ServiceBenefit[] = [];
  let steps: ServiceStep[] = [];
  let pricingArr: ServicePricing[] = [];
  let testimonialsArr: ServiceTestimonial[] = [];
  let faqsArr: ServiceFaq[] = [];

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    name = String(form.get("name") ?? "").trim();
    eyebrow = String(form.get("eyebrow") ?? "").trim();
    short = String(form.get("short") ?? "").trim();
    content = String(form.get("content") ?? "").trim();
    imageUrl = String(form.get("imageUrl") ?? "").trim();
    ctaTitle = String(form.get("ctaTitle") ?? "").trim();
    ctaText = String(form.get("ctaText") ?? "").trim();
    ctaButton = String(form.get("ctaButton") ?? "").trim();
    ctaPhone = String(form.get("ctaPhone") ?? "").trim();
    ctaPoints = CTA_POINT_FIELDS.map((field) =>
      String(form.get(field) ?? "").trim(),
    ).filter(Boolean);

    try {
      const b = form.get("benefits");
      if (b && typeof b === "string") benefits = JSON.parse(b);
    } catch {}
    try {
      const s = form.get("steps");
      if (s && typeof s === "string") steps = JSON.parse(s);
    } catch {}
    try {
      const p = form.get("pricing");
      if (p && typeof p === "string") pricingArr = JSON.parse(p);
    } catch {}
    try {
      const t = form.get("testimonials");
      if (t && typeof t === "string") testimonialsArr = JSON.parse(t);
    } catch {}
    try {
      const f = form.get("faqs");
      if (f && typeof f === "string") faqsArr = JSON.parse(f);
    } catch {}

    const file = form.get("image");
    if (file && typeof file !== "string" && file.size > 0) {
      imageUrl = (await saveUpload(file)) ?? imageUrl;
    }

    for (let i = 0; i < MAX_SECTIONS; i++) {
      const heading = String(form.get(`sectionHeading_${i}`) ?? "").trim();
      const text = String(form.get(`sectionText_${i}`) ?? "").trim();
      let sectionImage = String(form.get(`sectionImageUrl_${i}`) ?? "").trim();
      const sectionFile = form.get(`sectionImage_${i}`);
      if (
        sectionFile &&
        typeof sectionFile !== "string" &&
        sectionFile.size > 0
      ) {
        sectionImage = (await saveUpload(sectionFile)) ?? sectionImage;
      }
      if (heading || text || sectionImage) {
        sections.push({ heading, text, image: sectionImage });
      }
    }
  } else {
    const body = (await request.json().catch(() => null)) as {
      name?: string;
      eyebrow?: string;
      short?: string;
      content?: string;
      image?: string;
      sections?: { heading?: string; text?: string; image?: string }[];
      ctaTitle?: string;
      ctaText?: string;
      ctaButton?: string;
      ctaPhone?: string;
      ctaPoints?: string[];
    } | null;
    name = String(body?.name ?? "").trim();
    eyebrow = String(body?.eyebrow ?? "").trim();
    short = String(body?.short ?? "").trim();
    content = String(body?.content ?? "").trim();
    imageUrl = String(body?.image ?? "").trim();
    ctaTitle = String(body?.ctaTitle ?? "").trim();
    ctaText = String(body?.ctaText ?? "").trim();
    ctaButton = String(body?.ctaButton ?? "").trim();
    ctaPhone = String(body?.ctaPhone ?? "").trim();
    ctaPoints = (body?.ctaPoints ?? [])
      .map((p) => String(p ?? "").trim())
      .filter(Boolean);
    if (Array.isArray(body?.sections)) {
      sections = body.sections
        .filter((s) => s?.heading || s?.text || s?.image)
        .map((s) => ({
          heading: String(s?.heading ?? "").trim(),
          text: String(s?.text ?? "").trim(),
          image: String(s?.image ?? "").trim(),
        }));
    }
  }

  return {
    name,
    eyebrow,
    short,
    content: content
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    imageUrl,
    sections,
    ctaTitle,
    ctaText,
    ctaButton,
    ctaPhone,
    ctaPoints,
    benefits,
    steps,
    pricing: pricingArr,
    testimonials: testimonialsArr,
    faqs: faqsArr,
  };
}