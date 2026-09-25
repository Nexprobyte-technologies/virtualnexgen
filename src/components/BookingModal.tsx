"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import { format, startOfToday } from "date-fns";
import { X, CheckCircle, CalendarDays, Clock } from "lucide-react";

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

type Step = "calendar" | "details" | "success";

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleDateSelect(date: Date | undefined) {
    if (!date) return;
    setSelectedDate(date);
    setStep("details");
  }

  function isDisabled(date: Date): boolean {
    const today = startOfToday();
    const day = date.getDay();
    return date.getTime() < today.getTime() || day === 0 || day === 6;
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
        }),
      });

      if (res.ok) {
        setStep("success");
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setStep("calendar");
    setSelectedDate(undefined);
    setSelectedTime("");
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
    onClose();
  }

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-start justify-center overflow-y-auto px-4 pt-28 pb-10"
      style={{ zIndex: 99999 }}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative mt-4 w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-white shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 grid h-8 w-8 place-items-center rounded-full bg-cream-2 text-ink/60 transition hover:bg-cream hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex w-full flex-col md:flex-row">
          <div className="flex-1 border-r border-line p-6 sm:p-8">
            {step === "success" ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <CheckCircle className="mb-4 h-14 w-14 text-green-500" />
                <h3 className="text-xl font-bold text-ink">
                  Booking Confirmed!
                </h3>
                <p className="mt-2 text-sm text-ink/50">
                  We&apos;ll contact you shortly to confirm your appointment.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-ink"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-brand" />
                  <h3 className="text-base font-bold text-ink">
                    Select a Date
                  </h3>
                </div>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={isDisabled}
                  showOutsideDays
                  fixedWeeks
                  className="rdp rounded-2xl border border-line p-3"
                />
                <p className="mt-3 text-xs text-ink/40">
                  Weekends are not available
                </p>
              </>
            )}
          </div>

          <div className="flex-1 p-6 sm:p-8">
            {step === "calendar" && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-brand/10">
                  <CalendarDays className="h-7 w-7 text-brand" />
                </div>
                <h3 className="text-lg font-bold text-ink">
                  Pick a date to get started
                </h3>
                <p className="mt-2 text-sm text-ink/50">
                  Select a date from the calendar, then fill in your details.
                </p>
              </div>
            )}

            {step === "details" && selectedDate && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="mb-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-ink">
                    Your Details
                  </h3>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-ink/60">
                    Time Slot
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleTimeSelect(slot)}
                        className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                          selectedTime === slot
                            ? "border-brand bg-brand/10 text-brand"
                            : "border-line text-ink/50 hover:border-brand/30 hover:text-ink"
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                      className="w-full rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                      placeholder="John Smith"
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
                      className="w-full rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-ink/60">
                      Phone
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                      placeholder="+1 234 567 890"
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
                      className="w-full rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-ink/60">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full resize-none rounded-xl border border-line bg-cream-2/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand/30"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !selectedTime}
                  className="mt-1 w-full rounded-full bg-gradient-to-r from-brand-deep to-brand py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.3)] transition hover:shadow-[0_8px_32px_rgba(249,115,22,0.45)] disabled:opacity-50"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
