"use client";

import { Star } from "lucide-react";
import type { ServiceTestimonial } from "@/lib/types";

interface TestimonialsMarqueeProps {
  testimonials: ServiceTestimonial[];
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  text?: string;
}

export default function TestimonialsMarquee({
  testimonials,
  eyebrow,
  heading,
  highlight,
  text,
}: TestimonialsMarqueeProps) {
  if (testimonials.length === 0) return null;

  const showHighlight = highlight !== undefined && highlight.trim() !== "";

  // Duplicate 3x for seamless looping (need enough width to cover full animation cycle)
  const items = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            {eyebrow?.trim() || "Testimonials"}
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {(heading ?? "What Our Clients Say").trim() || "What Our Clients Say"}
            {showHighlight && (
              <span className="text-brand"> {highlight.trim()}</span>
            )}
          </h2>
          {text?.trim() && (
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
              {text}
            </p>
          )}
        </div>

        <div className="mt-14 flex gap-6 animate-[marquee-x_40s_linear_infinite]">
          {items.map((t, i) => (
            <div
              key={i}
              className="w-[380px] shrink-0 rounded-2xl border border-white/20 bg-white/5 p-7 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <p className="text-sm leading-relaxed text-white/75 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-white/15 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/55">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}