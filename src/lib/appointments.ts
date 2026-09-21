import { promises as fs } from "fs";
import path from "path";
import type { Appointment } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "appointments.json");

const seed: Appointment[] = [];

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2));
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Appointment[];
}

export async function addAppointment(
  data: Omit<Appointment, "id" | "status" | "createdAt">,
): Promise<Appointment> {
  await ensureFile();
  const list = await getAppointments();
  const appointment: Appointment = {
    ...data,
    id: `apt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  list.push(appointment);
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2));
  return appointment;
}

export async function deleteAppointment(
  id: string,
): Promise<boolean> {
  await ensureFile();
  const list = await getAppointments();
  const filtered = list.filter((a) => a.id !== id);
  if (filtered.length === list.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

export async function updateAppointmentStatus(
  id: string,
  status: Appointment["status"],
): Promise<Appointment | null> {
  await ensureFile();
  const list = await getAppointments();
  const idx = list.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  list[idx].status = status;
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2));
  return list[idx];
}
