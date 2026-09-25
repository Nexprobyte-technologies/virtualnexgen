/**
 * Calendar helpers for saving booked meetings to Google Calendar,
 * Outlook (web + desktop via .ics) and Apple Calendar (.ics).
 */

export interface CalendarEventInfo {
  /** ISO 8601 start time (e.g. from Calendly payload). */
  startTime: string;
  /** ISO 8601 end time. */
  endTime: string;
  title: string;
  description: string;
  location: string;
  attendeeEmail?: string;
  attendeeName?: string;
}

/** "20260925T130000Z"-style UTC timestamp used by Google Calendar links. */
function toGoogleStamp(iso: string): string {
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function toOutlookStamp(iso: string): string {
  return encodeURIComponent(iso);
}

/** Google Calendar "add event" deep link. */
export function buildGoogleCalendarUrl(ev: CalendarEventInfo): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${toGoogleStamp(ev.startTime)}/${toGoogleStamp(ev.endTime)}`,
    details: ev.description,
    location: ev.location,
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Outlook on the web "add event" deep link. */
export function buildOutlookCalendarUrl(ev: CalendarEventInfo): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: ev.title,
    startdt: toOutlookStamp(ev.startTime),
    enddt: toOutlookStamp(ev.endTime),
    location: ev.location,
    body: ev.description,
  });
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/** RFC 5545 .ics invitation — opens in Outlook desktop, Apple Calendar, etc. */
export function buildIcsInvite(ev: CalendarEventInfo): string {
  const fmt = (iso: string) => toGoogleStamp(iso);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Virtual Nexgen Solutions//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-vn@virtualnexgen.com`,
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(ev.startTime)}`,
    `DTEND:${fmt(ev.endTime)}`,
    `SUMMARY:${ev.title}`,
    ev.description.replace(/\n/g, "\\n"),
    `LOCATION:${ev.location}`,
    `ORGANIZER;CN=Virtual Nexgen Solutions:mailto:info@virtualnexgen.com`,
    ev.attendeeEmail &&
      `ATTENDEE;CN=${ev.attendeeName || ev.attendeeEmail};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${ev.attendeeEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n");
}

/** Triggers a browser download of the .ics invitation. */
export function downloadIcsInvite(ev: CalendarEventInfo, filename?: string) {
  const blob = new Blob([buildIcsInvite(ev)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename ?? "meeting-invitation.ics";
  a.click();
  URL.revokeObjectURL(url);
}
