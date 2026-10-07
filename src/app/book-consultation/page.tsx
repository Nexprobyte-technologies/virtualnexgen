"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, Phone, Video } from "lucide-react";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import SaveToCalendar from "@/components/SaveToCalendar";

interface CalendlyPayload {
  event?: { start_time?: string; end_time?: string; name?: string };
  invitee?: { email?: string; name?: string };
}

/**
 * Book-a-consultation page powered by the official Calendly inline embed.
 * Visitors pick a date/time and enter their details inside the widget; after
 * booking, Calendly shows its own confirmation (invitee view) and emails the
 * calendar invitation automatically.
 */
export default function BookConsultationPage() {
  const [booking, setBooking] = useState<CalendlyPayload | null>(null);

  return (
    <main className="min-h-screen bg-[#fffaf3]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
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
            className="inline-flex items-center gap-1.5 rounded-full border border-[#01012F]/20 bg-white px-4 py-2 text-xs font-semibold text-[#02024E] transition hover:border-[#12B4CF] hover:text-[#02024E] hover:border-[#12B4CF]"
          >
            ← Back to Home
          </Link>
        </header>

        <div className="overflow-hidden rounded-3xl border border-[#01012F]/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
          <div className="grid md:grid-cols-[340px_1fr]">
            {/* Left panel — event info (Calendly style) */}
            <aside className="relative flex flex-col justify-between gap-6 bg-[#fffaf3] px-6 py-7 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#12B4CF]/15 text-[#02024E]">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#02024E]/80">
                    Virtual Nexgen Solutions
                  </p>
                  <h1 className="mt-0.5 text-lg font-extrabold leading-tight text-[#02024E]">
                    Book a Free Consultation
                  </h1>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#02024E]/70">
                Discover how our dedicated virtual assistants and AI automation
                can streamline your business. Chat one-on-one with our team and
                get a tailored plan for your needs.
              </p>

              <div className="space-y-2.5 text-sm text-[#02024E]/70">
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#12B4CF]" /> 30 min
                </p>
                <p className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-[#12B4CF]" /> Google Meet
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#12B4CF]" /> info@virtualnexgen.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#12B4CF]" /> +1 341 888 6504
                </p>
              </div>
            </aside>

            {/* Right panel — official Calendly scheduling widget */}
            <div className="p-4 sm:p-6 lg:p-8 bg-white">
              {booking ? (
                <div className="bg-white">
                  <div className="mb-5 flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50/60 px-5 py-6 text-center">
                    <CheckCircle2 className="mb-2 h-12 w-12 text-emerald-500" />
                    <h2 className="text-xl font-extrabold text-[#02024E]">
                      You are scheduled!
                    </h2>
                    <p className="mt-1 text-sm text-[#02024E]/60">
                      A calendar invitation has been sent to{" "}
                      <span className="font-semibold text-[#02024E]">
                        {booking.invitee?.email || "your email"}
                      </span>
                      . You can also save the meeting below.
                    </p>
                  </div>

                  {booking.event?.start_time && booking.event?.end_time && (
                    <div className="mb-5 rounded-2xl border border-[#01012F]/10 bg-white px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#02024E]/80">
                        Virtual Nexgen Solutions
                      </p>
                      <h3 className="mt-0.5 text-base font-bold text-[#02024E]">
                        {booking.event.name || "30 Minute Meeting"}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-[#02024E]">
                        {new Date(booking.event.start_time).toLocaleString(
                          "en-IN",
                          {
                            timeZone: "Asia/Kolkata",
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          },
                        )}{" "}
                        –{" "}
                        {new Date(booking.event.end_time).toLocaleTimeString(
                          "en-IN",
                          {
                            timeZone: "Asia/Kolkata",
                            hour: "numeric",
                            minute: "2-digit",
                          },
                        )}{" "}
                        (IST)
                      </p>
                      <p className="mt-1 text-sm text-[#02024E]/60">
                        Google Meet · Web conferencing details in your invite.
                      </p>
                    </div>
                  )}

                  {booking.event?.start_time && booking.event?.end_time ? (
                    <SaveToCalendar
                      event={{
                        startTime: booking.event.start_time,
                        endTime: booking.event.end_time,
                        title: `${booking.event.name || "30 Minute Meeting"} — Virtual Nexgen Solutions`,
                        description:
                          "Free consultation with Virtual Nexgen Solutions.\nWeb conferencing details are included in your calendar invitation.",
                        location: "Google Meet",
                        attendeeEmail: booking.invitee?.email,
                        attendeeName: booking.invitee?.name,
                      }}
                    />
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setBooking(null)}
                    className="mt-5 w-full rounded-full border border-[#01012F]/20 bg-white py-2.5 text-sm font-semibold text-[#02024E]/70 transition hover:border-[#12B4CF] hover:text-[#02024E]"
                  >
                    Schedule Another Meeting
                  </button>
                </div>
              ) : (
                <>
                  <CalendlyEmbed
                    height={740}
                    onBookingConfirmed={(payload) =>
                      setBooking(payload as CalendlyPayload)
                    }
                  />
                  <p className="mt-3 text-center text-[11px] text-[#02024E]/40">
                    Powered by Calendly · After scheduling, the confirmation and
                    calendar invitation are sent to your email.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-[#02024E]/40">
          Virtual Nexgen Solutions · Book a free consultation to explore our
          virtual assistant and AI automation services.
        </p>
      </div>
    </main>
  );
}
