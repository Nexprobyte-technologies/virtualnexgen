import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), "data", "about.json");

export interface AboutSection {
  id: string;
  title: string;
  content: string;
  image: string;
}

export interface AboutFeature {
  id: string;
  icon: string;
  title: string;
  text: string;
  image: string;
}

export interface AboutPage {
  heroTitle: string;
  heroDescription: string;
  sections: AboutSection[];
  features: AboutFeature[];
}

const DEFAULT: AboutPage = {
  heroTitle: "About Virtual Nexgen Solutions",
  heroDescription:
    "We deliver world-class virtual assistant and AI automation solutions that help businesses scale efficiently.",
  sections: [],
  features: [],
};

function ensureFile() {
  if (!existsSync(FILE)) {
    writeFileSync(FILE, JSON.stringify(DEFAULT, null, 2), "utf-8");
  }
}

export function getAbout(): AboutPage {
  ensureFile();
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return DEFAULT;
  }
}

export function updateAbout(data: Partial<AboutPage>): AboutPage {
  const current = getAbout();
  const updated = { ...current, ...data };
  writeFileSync(FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}
