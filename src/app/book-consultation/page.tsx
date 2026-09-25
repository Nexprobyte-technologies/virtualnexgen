"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  format,
  addDays,
  startOfToday,
  addMinutes,
} from "date-fns";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Video,
  CalendarPlus,
} from "lucide-react";

// Matches Calendly availability (calendly.com/virtualnexgen-info/30min):
// Mon–Fri 6:30 PM – 11:30 PM IST, Sat 12:00 AM – 2:00 AM IST, Sun closed.
const weekdaySlots = [
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

const saturdaySlots = [
  "12:00 AM",
  "12:30 AM",
  "01:00 AM",
  "01:30 AM",
  "02:00 AM",
];

type Step = "pick" | "details" | "success";

const emptyForm = { name: "", email: "", phone: "", company: "", message: "" };

const MEETING_DURATION_MIN = 30;
// Slot times are Indian Standard Time (UTC+5:30).
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** 12h display slot (e.g. "06:30 PM") -> 24h "HH:mm". */
function slotTo24h(slot: string): string {
  const [clock, period] = slot.split(" ");
  let [h, m] = clock.split(":").map(Number);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m}`;
}

/** Exact time range for the chosen slot, e.g. "6:30pm - 7:00pm". */
function slotRange(slot: string): string {
  const [h, m] = slotTo24h(slot).split(":").map(Number);
  const start = new Date(2000, 0, 1, h, m);
  const end = addMinutes(start, MEETING_DURATION_MIN);
  return `${format(start, "h:mm")}${format(start, "a").toLowerCase()} - ${format(end, "h:mm")}${format(end, "a").toLowerCase()}`;
}

/** Google Calendar "add event" URL for the booked slot (IST). */
function googleCalendarUrl(dateISO: string, slot: string): string {
  const { start, end } = slotRangeUTC(dateISO, slot);
  const fmt = (dt: Date) =>
    `${dt.getUTCFullYear()}${String(dt.getUTCMonth() + 1).padStart(2, "0")}${String(dt.getUTCDate()).padStart(2, "0")}T${String(dt.getUTCHours()).padStart(2, "0")}${String(dt.getUTCMinutes()).padStart(2, "0")}00Z`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "30 Minute Meeting — Virtual Nexgen Solutions",
    dates: `${fmt(start)}/${fmt(end)}`,
    details:
      "Free consultation with Virtual Nexgen Solutions.\nWeb conferencing details to follow.",
    location: "Google Meet",
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** UTC start/end Dates for a booked slot, converting IST wall time to UTC. */
function slotRangeUTC(dateISO: string, slot: string) {
  const [y, mo, d] = dateISO.split("-").map(Number);
  const [h, mi] = slotTo24h(slot).split(":").map(Number);
  const start = new Date(Date.UTC(y, mo - 1, d, h, mi) - IST_OFFSET_MS);
  const end = new Date(start.getTime() + MEETING_DURATION_MIN * 60_000);
  return { start, end };
}

/** Downloadable .ics calendar invitation for the booked slot (IST). */
function icsInvite(dateISO: string, slot: string, invitee: string, email: string): string {
  const { start, end } = slotRangeUTC(dateISO, slot);
  const fmt = (dt: Date) =>
    `${dt.getUTCFullYear()}${String(dt.getUTCMonth() + 1).padStart(2, "0")}${String(dt.getUTCDate()).padStart(2, "0")}T${String(dt.getUTCHours()).padStart(2, "0")}${String(dt.getUTCMinutes()).padStart(2, "0")}00Z`;
  const stamp = fmt(new Date());
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Virtual Nexgen Solutions//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-vn@virtualnexgen.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    "SUMMARY:30 Minute Meeting — Virtual Nexgen Solutions",
    "DESCRIPTION:Free consultation with Virtual Nexgen Solutions.\\nWeb conferencing details to follow.",
    "LOCATION:Google Meet",
    `ATTENDEE;CN=${invitee};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${email}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadIcs(
  dateISO: string,
  slot: string,
  invitee: string,
  email: string,
) {
  const blob = new Blob([icsInvite(dateISO, slot, invitee, email)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "30-minute-meeting-virtual-nexgen.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function BookConsultationPage() {
  const days = useMemo(
    () => Array.from({ length: 30 }, (_, i) => addDays(startOfToday(), i)),
    [],
  );
  const [step, setStep] = useState<Step>("pick");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState(emptyForm);

  // Only Sundays are unavailable, same as the Calendly event.
  function isSunday(day: Date) {
    return day.getDay() === 0;
  }

  function slotsFor(day: Date | null): string[] {
    if (!day) return [];
    return day.getDay() === 6 ? saturdaySlots : weekdaySlots;
  }

  function pickDay(day: Date) {
    setSelectedDay(day);
    setSelectedTime("");
    setStep("pick");
  }

  function pickTime(time: string) {
    if (!selectedDay) return;
    setSelectedTime(time);
    setStep("details");
  }

  function reset() {
    setStep("pick");
    setSelectedDay(null);
    setSelectedTime("");
    setSubmitError("");
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDay || !selectedTime) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: format(selectedDay, "yyyy-MM-dd"),
          time: selectedTime,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ||
            "Failed to book appointment. Please try again.",
        );
      }
      setStep("success");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://virtualnexgen.com/assets/uploads/logo/11590.png"
              alt="Virtual Nexgen Solutions"
              width={160}
              height={42}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink/70 transition hover:border-brand hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
        </header>

        <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="grid md:grid-cols-[340px_1fr]">
            {/* Left panel — event info (Calendly style) */}
            <aside className="relative flex flex-col justify-between gap-6 bg-gradient-to-b from-[#ECFDE5] to-cream-1 px-6 py-7 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand-deep">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-dark">
                    Virtual Nexgen Solutions
                  </p>
                  <h1 className="mt-0.5 text-lg font-extrabold leading-tight text-ink">
                    Book a Free Consultation
                  </h1>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-ink/70">
                Discover how our dedicated virtual assistants and AI automation
                can streamline your business. Chat one-on-one with our team and
                get a tailored plan for your needs.
              </p>

              <div className="space-y-2.5 text-sm text-ink/70">
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-dark" /> 30 min
                </p>
                <p className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-brand-dark" /> Google Meet
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-dark" /> info@virtualnexgen.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-dark" /> +1 341 888 6504
                </p>
              </div>
            </aside>

            {/* Right panel — scheduling steps */}
            <div className="p-6 sm:p-8">
              {step === "pick" && (
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg font-extrabold text-ink">
                      Select a Date & Time
                    </h2>
                    <p className="mt-0.5 text-xs text-ink/50">
                      Choose your preferred slot below. Sundays are unavailable.
                    </p>
                  </div>

                  <div className="mb-5 flex gap-2.5 overflow-x-auto pb-2">
                    {days.map((day) => {
                      const weekend = isSunday(day);
                      const active =
                        selectedDay && format(selectedDay, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
                      return (
                        <button
                          key={day.toISOString()}
                          type="button"
                          disabled={weekend}
                          onClick={() => pickDay(day)}
                          className={`flex w-[74px] shrink-0 flex-col items-center rounded-2xl border px-3 py-3 transition ${
                            active
                              ? "border-brand bg-brand text-ink shadow-[0_8px_24px_rgba(249,115,22,0.4)]"
                              : weekend
                                ? "cursor-not-allowed border-line bg-slate-50 text-slate-300"
                                : "border-line bg-white text-ink hover:border-brand/40 hover:bg-brand/5"
                          }`}
                        >
                          <span className="text-[11px] font-semibold uppercase">
                            {format(day, "EEE")}
                          </span>
                          <span className="my-0.5 text-xl font-extrabold">
                            {format(day, "d")}
                          </span>
                          <span className="text-[11px]">
                            {format(day, "MMM")}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedDay ? (
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Available times · {format(selectedDay, "EEEE, MMMM d")}
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {slotsFor(selectedDay).map((slot) => {
                          const activeSel = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => pickTime(slot)}
                              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                                activeSel
                                  ? "border-brand bg-brand/10 text-brand-dark"
                                  : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-ink"
                              }`}
                            >
                              <Clock className="h-3.5 w-3.5" />
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="grid place-items-center rounded-2xl border-2 border-dashed border-line px-6 py-12 text-center">
                      <div className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-brand/10">
                        <Clock className="h-6 w-6 text-brand-dark" />
                      </div>
                      <p className="text-sm font-bold text-ink/70">
                        Pick a date to see available times
                      </p>
                      <p className="mt-1 text-xs text-ink/40">
                        Select a day from the strip above to get started.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === "details" && selectedDay && (
                <div>
                  <button
                    type="button"
                    onClick={() => setStep("pick")}
                    className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-ink"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Choose a different time
                  </button>

                  <div className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-brand/20 bg-brand/5 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-dark" />
                    <p className="text-sm font-bold text-ink">
                      {format(selectedDay, "EEEE, MMMM d, yyyy")}
                    </p>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <p className="flex items-center gap-1 text-sm font-semibold text-brand-dark">
                      <Clock className="h-3.5 w-3.5" />{" "}
                      {slotRange(selectedTime)}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-ink/60">
                          Full Name *
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Enter full name"
                          className="w-full rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-ink/60">
                          Email *
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="Enter email id"
                          className="w-full rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-ink/60">
                          Phone
                        </label>
                        <input
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          placeholder="+1 234 567 890"
                          className="w-full rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-ink/60">
                          Company
                        </label>
                        <input
                          value={form.company}
                          onChange={(e) =>
                            setForm({ ...form, company: e.target.value })
                          }
                          placeholder="Your Company"
                          className="w-full rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-ink/60">
                        Anything you&apos;d like us to know?
                      </label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full resize-none rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                        placeholder="Tell us a little about your business..."
                      />
                    </div>

                    <button
                      type="submit"
<<<<<<< Updated upstream
                      className="mt-1 w-full rounded-full bg-gradient-to-r from-brand-deep to-brand py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.3)] transition hover:shadow-[0_8px_32px_rgba(249,115,22,0.45)]"
=======
                      disabled={submitting}
                      className="mt-1 w-full rounded-full bg-gradient-to-r from-brand-deep to-brand py-3 text-sm font-bold text-ink shadow-[0_8px_24px_rgba(164,189,188,0.3)] transition hover:shadow-[0_8px_32px_rgba(164,189,188,0.45)] disabled:opacity-50"
>>>>>>> Stashed changes
                    >
                      {submitting ? "Booking..." : "Confirm Booking"}
                    </button>
                    {submitError && (
                      <p className="text-center text-xs font-medium text-red-500">
                        {submitError}
                      </p>
                    )}
                  </form>
                </div>
              )}

              {step === "success" && selectedDay && (
                <div className="flex h-full flex-col">
                  <div className="flex flex-col items-center py-6 text-center">
                    <CheckCircle2 className="mb-3 h-14 w-14 text-emerald-500" />
                    <h2 className="text-2xl font-extrabold text-ink">
                      You are scheduled!
                    </h2>
                    <p className="mt-1.5 text-sm text-ink/60">
                      A calendar invitation has been created for{" "}
                      <span className="font-semibold text-ink">{form.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        downloadIcs(
                          format(selectedDay, "yyyy-MM-dd"),
                          selectedTime,
                          form.name || "Guest",
                          form.email,
                        )
                      }
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand bg-brand/10 px-5 py-2.5 text-sm font-bold text-brand-dark transition hover:bg-brand/20"
                    >
                      <CalendarPlus className="h-4 w-4" />
                      Open Invitation
                    </button>
                  </div>

                  <div className="mt-2 rounded-2xl border border-line bg-cream-2/40 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark">
                      Virtual Nexgen Solutions
                    </p>
                    <h3 className="mt-0.5 text-base font-bold text-ink">
                      30 Minute Meeting
                    </h3>
                    <div className="mt-2.5 space-y-1 text-sm text-ink/70">
                      <p className="font-semibold text-ink">
                        {slotRange(selectedTime)},{" "}
                        {format(selectedDay, "EEEE, MMMM d, yyyy")}
                      </p>
                      <p>India Standard Time</p>
                      <p>Web conferencing details to follow.</p>
                    </div>
                    <a
                      href={googleCalendarUrl(
                        format(selectedDay, "yyyy-MM-dd"),
                        selectedTime,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark underline-offset-2 transition hover:underline"
                    >
                      <CalendarPlus className="h-3.5 w-3.5" />
                      Add to Google Calendar
                    </a>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-center gap-3 pt-6">
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-full border border-line bg-white px-6 py-2.5 text-sm font-semibold text-ink/70 transition hover:border-brand hover:text-brand"
                    >
                      Schedule Another
                    </button>
                    <Link
                      href="/"
                      className="rounded-full bg-gradient-to-r from-brand-deep to-brand px-6 py-2.5 text-sm font-semibold text-white shadow transition"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-ink/40">
          Virtual Nexgen Solutions · Book a free consultation to explore our
          virtual assistant and AI automation services.
        </p>
      </div>
    </main>
  );
}