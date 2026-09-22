import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), "data", "casestudy.json");

export interface CaseStudy {
  slug: string;
  title: string;
  tag?: string;
  tags?: string;
  excerpt: string;
  content: string;
  image: string;
  industry?: string;
  date?: string;
  results?: string;
  clientOverview?: string;
  challenge?: string;
  solution?: string;
  createdAt: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SEED: CaseStudy[] = [
  {
    slug: "insurance-claims-processing",
    title: "Insurance Claims Processing Automation",
    excerpt:
      "How we reduced claims processing time by 60% for a mid-sized insurance company using AI-powered virtual assistants.",
    content:
      "Our client, a mid-sized insurance company, was struggling with backlogs in claims processing. By implementing our AI-powered virtual assistant solution, we automated data extraction, document verification, and initial claim assessment. The result was a 60% reduction in processing time and a 40% improvement in customer satisfaction scores.",
    image: "",
    industry: "Insurance",
    date: "2024-11-15",
    results: "60% faster processing, 40% better customer satisfaction.",
    createdAt: "2024-11-15T10:00:00Z",
  },
  {
    slug: "real-estate-listing-management",
    title: "Real Estate Listing Management",
    excerpt:
      "Streamlined property listing management for a real estate firm, saving 25 hours per week in manual data entry.",
    content:
      "A leading real estate firm was spending countless hours manually updating property listings across multiple platforms. Our virtual assistant solution automated listing synchronization, schedule management, and client communication, freeing up agents to focus on closing deals.",
    image: "",
    industry: "Real Estate",
    date: "2024-10-20",
    results: "25 hours saved per week, 3x faster listing updates.",
    createdAt: "2024-10-20T10:00:00Z",
  },
  {
    slug: "legal-document-review",
    title: "Legal Document Review Automation",
    excerpt:
      "Automated legal document review and categorization, reducing review time by 70% for a law firm.",
    content:
      "A busy law firm needed to review hundreds of legal documents daily. Our AI solution automated document classification, key clause extraction, and risk flagging, dramatically reducing the time attorneys spent on routine reviews.",
    image: "",
    industry: "Legal",
    date: "2024-09-10",
    results: "70% reduction in document review time.",
    createdAt: "2024-09-10T10:00:00Z",
  },
  {
    slug: "healthcare-patient-scheduling",
    title: "Healthcare Patient Scheduling",
    excerpt:
      "Revolutionized patient scheduling for a healthcare provider, reducing no-shows by 45%.",
    content:
      "A healthcare provider was facing high no-show rates and scheduling conflicts. Our AI-powered scheduling assistant automated appointment reminders, handled rescheduling requests, and optimized provider availability, leading to a 45% reduction in no-shows.",
    image: "",
    industry: "Healthcare",
    date: "2024-08-05",
    results: "45% fewer no-shows, improved patient experience.",
    createdAt: "2024-08-05T10:00:00Z",
  },
];

function ensureFile() {
  if (!existsSync(FILE)) {
    writeFileSync(FILE, JSON.stringify(SEED, null, 2), "utf-8");
  }
}

export function getAllCaseStudies(): CaseStudy[] {
  ensureFile();
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return SEED;
  }
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((s) => s.slug === slug);
}

export function createCaseStudy(
  data: Omit<CaseStudy, "slug" | "createdAt">
): CaseStudy {
  const studies = getAllCaseStudies();
  const slug = slugify(data.title);
  const newStudy: CaseStudy = {
    ...data,
    slug,
    createdAt: new Date().toISOString(),
  };
  studies.push(newStudy);
  writeFileSync(FILE, JSON.stringify(studies, null, 2), "utf-8");
  return newStudy;
}

export function updateCaseStudy(
  slug: string,
  data: Partial<CaseStudy>
): CaseStudy | undefined {
  const studies = getAllCaseStudies();
  const idx = studies.findIndex((s) => s.slug === slug);
  if (idx === -1) return undefined;
  studies[idx] = { ...studies[idx], ...data, slug };
  writeFileSync(FILE, JSON.stringify(studies, null, 2), "utf-8");
  return studies[idx];
}

export function deleteCaseStudy(slug: string): boolean {
  const studies = getAllCaseStudies();
  const filtered = studies.filter((s) => s.slug !== slug);
  if (filtered.length === studies.length) return false;
  writeFileSync(FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
