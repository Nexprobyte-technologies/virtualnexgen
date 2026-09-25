"use client";

import { useEffect, useState } from "react";

export default function FormattedDate({ dateString }: { dateString: string }) {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date(dateString);
    const formatted = d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(formatted);
  }, [dateString]);

  if (!date) return null;
  return <span>{date}</span>;
}
