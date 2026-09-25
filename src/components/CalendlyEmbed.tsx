"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

/** Official Calendly booking page for Virtual Nexgen Solutions (30 min meeting). */
export const CALENDLY_BOOKING_URL =
  "https://calendly.com/virtualnexgen-info/30min";

interface CalendlySchedulingPayload {
  event?: { uri?: string; name?: string; start_time?: string; end_time?: string };
  invitee?: { uri?: string; email?: string; name?: string };
}

function isCalendlyEvent(e: MessageEvent): boolean {
  const eventName = (
    e.data as { event?: string } | null
  )?.event;
  return typeof eventName === "string" && eventName.startsWith("calendly.");
}

/**
 * Official Calendly inline embed (script + data-url div), fully responsive
 * across desktop, tablet and mobile. Fires `onBookingConfirmed` with the
 * scheduling payload when a visitor completes a booking inside the widget.
 */
export default function CalendlyEmbed({
  url = CALENDLY_BOOKING_URL,
  height = 700,
  onBookingConfirmed,
}: {
  /** Main Calendly event booking URL (never an /invitees/... link). */
  url?: string;
  /** Widget height in px on desktop; scales down responsively. */
  height?: number;
  onBookingConfirmed?: (payload: CalendlySchedulingPayload) => void;
}) {
  const [ready, setReady] = useState(false);
  const confirmedRef = useRef(false);

  // Load the official Calendly embed script; it auto-initializes any
  // `.calendly-inline-widget[data-url]` present in the DOM.
  useEffect(() => {
    const src = "https://assets.calendly.com/assets/external/widget.js";
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );
    if (existing) {
      // Script already loaded (or loading) — widget init is handled by it.
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, []);

  const handleCalendlyMessage = useCallback(
    (e: MessageEvent) => {
      if (!isCalendlyEvent(e)) return;
      if (
        (e.data as { event?: string }).event === "calendly.event_scheduled" &&
        !confirmedRef.current
      ) {
        confirmedRef.current = true;
        onBookingConfirmed?.(
          (e.data as { payload?: CalendlySchedulingPayload }).payload ?? {},
        );
      }
    },
    [onBookingConfirmed],
  );

  // Calendly posts booking events from its iframe via postMessage.
  useEffect(() => {
    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [handleCalendlyMessage]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_50px_rgba(15,42,61,0.10)]"
      style={{ minHeight: height }}
    >
      {!ready && (
        <div className="absolute inset-0 grid place-items-center bg-white">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
            <p className="text-xs font-medium text-ink/50">
              Loading our live calendar...
            </p>
          </div>
        </div>
      )}
      {/* Calendly injects its responsive iframe into this container. */}
      <div
        className="calendly-inline-widget w-full"
        style={{ minWidth: "280px", height }}
        data-url={url}
      />
    </div>
  );
}
