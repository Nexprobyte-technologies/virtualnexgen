import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), "data", "contacts.json");

export interface ContactInfo {
  phoneUS: string;
  phoneIndia: string;
  addressUS: string;
  addressIndia: string;
  email: string;
}

const DEFAULT: ContactInfo = {
  phoneUS: "",
  phoneIndia: "",
  addressUS: "",
  addressIndia: "",
  email: "",
};

export function getContacts(): ContactInfo {
  ensureFile();
  try {
    const parsed = JSON.parse(readFileSync(FILE, "utf-8"));
    // Normalize legacy shapes (address/phone/email/hours) into the new shape
    return {
      phoneUS: parsed.phoneUS || parsed.phone || "",
      phoneIndia: parsed.phoneIndia || "",
      addressUS: parsed.addressUS || parsed.address || "",
      addressIndia: parsed.addressIndia || "",
      email: parsed.email || "",
    };
  } catch {
    return DEFAULT;
    }
}

export function updateContacts(data: Partial<ContactInfo>): ContactInfo {
  const current = getContacts();
  const updated = { ...current, ...data };
  writeFileSync(FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

function ensureFile() {
  if (!existsSync(FILE)) {
    writeFileSync(FILE, JSON.stringify(DEFAULT, null, 2), "utf-8");
  }
}
