import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), "data", "contacts.json");

export interface ContactPage {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

const DEFAULT: ContactPage = {
  address: "",
  phone: "",
  email: "",
  hours: "",
};

function ensureFile() {
  if (!existsSync(FILE)) {
    writeFileSync(FILE, JSON.stringify(DEFAULT, null, 2), "utf-8");
  }
}

export function getContacts(): ContactPage {
  ensureFile();
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return DEFAULT;
  }
}

export function updateContacts(data: Partial<ContactPage>): ContactPage {
  const current = getContacts();
  const updated = { ...current, ...data };
  writeFileSync(FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}
