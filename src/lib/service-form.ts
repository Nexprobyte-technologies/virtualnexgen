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
  imageUrl?: string;
  sections: ServiceSection[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaPhone: string;
  ctaPoints: string[];
  benefits?: ServiceBenefit[];
  steps?: ServiceStep[];
  pricing?: ServicePricing[];
  testimonials?: ServiceTestimonial[];
  faqs?: ServiceFaq[];
  carouselImages?: string[];
  folderPopItems: string[];
  sectionCopy: Record<string, unknown>;
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
  let imageUrl: string | undefined;
  let sections: ServiceSection[] = [];
  let ctaTitle = "";
  let ctaText = "";
  let ctaButton = "";
  let ctaPhone = "";
  let ctaPoints: string[] = [];
  let benefits: ServiceBenefit[] | undefined;
  let steps: ServiceStep[] | undefined;
  let pricingArr: ServicePricing[] | undefined;
  let testimonialsArr: ServiceTestimonial[] | undefined;
  let faqsArr: ServiceFaq[] | undefined;
  let carouselImages: string[] | undefined;
  let folderPopItemsArr: string[] = [];
  const sectionCopy: Record<string, unknown> = {};

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    name = String(form.get("name") ?? "").trim();
    eyebrow = String(form.get("eyebrow") ?? "").trim();
    short = String(form.get("short") ?? "").trim();
    content = String(form.get("content") ?? "").trim();
    const submittedImage = form.get("imageUrl");
    if (typeof submittedImage === "string" && submittedImage.trim()) {
      imageUrl = submittedImage.trim();
    }
    ctaTitle = String(form.get("ctaTitle") ?? "").trim();
    ctaText = String(form.get("ctaText") ?? "").trim();
    ctaButton = String(form.get("ctaButton") ?? "").trim();
    ctaPhone = String(form.get("ctaPhone") ?? "").trim();
    ctaPoints = CTA_POINT_FIELDS.map((field) =>
      String(form.get(field) ?? "").trim(),
    ).filter(Boolean);

    for (const key of [
      "benefits",
      "steps",
      "pricing",
      "testimonials",
      "faqs",
    ] as const) {
      const raw = form.get(key);
      if (typeof raw !== "string" || !raw.trim()) continue;
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) continue;
        if (key === "benefits") benefits = parsed;
        else if (key === "steps") steps = parsed;
        else if (key === "pricing") pricingArr = parsed;
        else if (key === "testimonials") testimonialsArr = parsed;
        else faqsArr = parsed;
      } catch {}
    }
    try {
      const ci = form.get("carouselImages");
      if (ci && typeof ci === "string") {
        const parsed = JSON.parse(ci);
        if (Array.isArray(parsed)) {
          carouselImages = parsed
            .map((v) => String(v ?? "").trim())
            .filter(Boolean);
        }
      }
    } catch {}
    try {
      const fpi = form.get("folderPopItems");
      if (fpi && typeof fpi === "string") folderPopItemsArr = JSON.parse(fpi);
    } catch {}
    try {
      const sc = form.get("sectionCopy");
      if (sc && typeof sc === "string") Object.assign(sectionCopy, JSON.parse(sc));
    } catch {}

    const logoFiles = form.getAll("logoImage");
    if (logoFiles.length > 0) {
      const existing =
        sectionCopy.logosSection &&
        typeof sectionCopy.logosSection === "object" &&
        !Array.isArray(sectionCopy.logosSection)
          ? (sectionCopy.logosSection as Record<string, unknown>)
          : {};
      const current = Array.isArray(existing.logos)
        ? (existing.logos as Array<Record<string, unknown>>).map((logo) => ({
            ...logo,
          }))
        : [];
      for (let i = 0; i < logoFiles.length; i++) {
        const entry = logoFiles[i];
        if (!entry || typeof entry === "string" || entry.size === 0) continue;
        const uploaded = await saveUpload(entry);
        if (!uploaded) continue;
        if (!current[i]) current[i] = {};
        current[i].src = uploaded;
      }
      sectionCopy.logosSection = { ...existing, logos: current };
    }

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
    const extras = body as unknown as Record<string, unknown> | null;
    if (extras) {
      for (const key of [
        "problem",
        "benefitsSection",
        "folderSection",
        "logosSection",
        "stepsSection",
        "pricingSection",
        "testimonialsSection",
        "faqSection",
        "heroButtons",
        "trustBadges",
        "ctaUrl",
        "relatedTitle",
        "folderPopItems",
        "benefits",
        "steps",
        "pricing",
        "testimonials",
        "faqs",
      ]) {
        if (extras[key] !== undefined) sectionCopy[key] = extras[key];
      }
      if (extras.folderPopItems !== undefined) {
        folderPopItemsArr = (extras.folderPopItems as unknown[])
          .map((v) => String(v ?? "").trim())
          .filter(Boolean);
      }
      for (const key of ["benefits", "steps", "pricing", "testimonials", "faqs"]) {
        const value = extras[key];
        if (!Array.isArray(value) || value.length === 0) continue;
        if (key === "benefits") benefits = value as ServiceBenefit[];
        else if (key === "steps") steps = value as ServiceStep[];
        else if (key === "pricing") pricingArr = value as ServicePricing[];
        else if (key === "testimonials") testimonialsArr = value as ServiceTestimonial[];
        else faqsArr = value as ServiceFaq[];
      }
      if (Array.isArray(extras.carouselImages)) {
        carouselImages = (extras.carouselImages as unknown[])
          .map((v) => String(v ?? "").trim())
          .filter(Boolean);
      }
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
    carouselImages,
    folderPopItems: folderPopItemsArr,
    sectionCopy,
  };
}