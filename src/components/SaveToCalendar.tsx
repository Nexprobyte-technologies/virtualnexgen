"use client";

import { useState } from "react";
import {
  CalendarPlus,
  CalendarDays,
  Download,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import {
  buildGoogleCalendarUrl,
  buildOutlookCalendarUrl,
  downloadIcsInvite,
  type CalendarEventInfo,
} from "@/lib/calendar-links";

/**
 * "Save the date" action strip shown after a successful booking.
 * Offers Google Calendar, Outlook (web), a universal .ics download
 * (Outlook desktop / Apple Calendar) and a copy-link fallback.
 */
export default function SaveToCalendar({
  event,
  className = "",
}: {
  event: CalendarEventInfo;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(
        `${event.title}\n${new Date(event.startTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "short",
        })} (IST)`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard unavailable — silent
    }
  }

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ink/50">
        <CalendarPlus className="h-3.5 w-3.5" />
        Add to your calendar
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={buildGoogleCalendarUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink/80 shadow-sm transition hover:border-brand hover:text-brand-dark"
        >
          <GoogleIcon />
          Google Calendar
        </a>
        <a
          href={buildOutlookCalendarUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink/80 shadow-sm transition hover:border-brand hover:text-brand-dark"
        >
          <OutlookIcon />
          Outlook
        </a>
        <button
          type="button"
          onClick={() => downloadIcsInvite(event)}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink/80 shadow-sm transition hover:border-brand hover:text-brand-dark"
        >
          <Download className="h-3.5 w-3.5 text-[#0f6cbd]" />
          .ics file
          <span className="font-medium text-ink/40">
            (Apple / desktop)
          </span>
        </button>
        <button
          type="button"
          onClick={copyDetails}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink/80 shadow-sm transition hover:border-brand hover:text-brand-dark"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-ink/40" /> Copy details
            </>
          )}
        </button>
      </div>
      <p className="flex items-center gap-1.5 text-[11px] text-ink/40">
        <CalendarDays className="h-3 w-3" />
        The calendar invitation is also emailed to you automatically after
        scheduling.
      </p>
      {event.attendeeEmail && (
        <p className="flex items-center gap-1.5 text-[11px] text-ink/40">
          <Mail className="h-3 w-3" />
          Invited: {event.attendeeEmail}
        </p>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.68-.06-1.36-.19-2.02H12v3.83h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.97-4.3 2.97-7.33Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.63-2.43l-3.23-2.5c-.9.6-2.05.95-3.4.95-2.6 0-4.82-1.76-5.6-4.12H3.05v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.05a10 10 0 0 0 0 9l3.35-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 6c1.47 0 2.79.5 3.82 1.5l2.86-2.86A10 10 0 0 0 3.05 7.5L6.4 10.1C7.18 7.76 9.4 6 12 6Z"
      />
    </svg>
  );
}

function OutlookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        fill="#0F6CBD"
        d="M12 3H4.5A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21H12V3Z"
      />
      <path
        fill="#28A8EA"
        d="M21 6.5v11a1.5 1.5 0 0 1-1.5 1.5H12v-3l4.5-5.5L21 6.5Z"
      />
      <path
        fill="#0364B8"
        d="m12 12 4.5 4L21 12l-4.5-3.5L12 12Z"
      />
      <path
        fill="#14447D"
        d="M12 3v18H7.2L12 3Z"
        opacity=".5"
      />
      <text
        x="7.5"
        y="15.5"
        textAnchor="middle"
        fontSize="7"
        fontWeight="700"
        fill="#fff"
        fontFamily="Arial, sans-serif"
      >
        O
      </text>
    </svg>
  );
}
