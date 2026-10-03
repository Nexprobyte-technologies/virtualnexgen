"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "John Smith",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/71492.jpg",
    text: "Virtual Nexgen Solutions transformed the way we operate. Their team is responsive and professional, making our workflow seamless.",
  },
  {
    name: "Michael Jones",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/47175.jpg",
    text: "The assistance we received was exceptional! They understood our needs and delivered beyond expectations every time.",
  },
  {
    name: "Sarah Brown",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/80635.jpg",
    text: "I can't recommend Virtual Nexgen Solutions enough! Their support has been a game changer for our business.",
  },
  {
    name: "Emily Davis",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/70384.jpg",
    text: "Outstanding service and professionalism. They truly care about their clients and their success.",
  },
  {
    name: "David Wilson",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/71492.jpg",
    text: "Their attention to detail and commitment to quality is unmatched. We have seen a significant improvement in our operations since partnering with them.",
  },
  {
    name: "Jessica Martinez",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/80635.jpg",
    text: "The team at Virtual Nexgen goes above and beyond. They are not just service providers; they are true partners in our growth.",
  },
  {
    name: "Robert Taylor",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/47175.jpg",
    text: "Efficient, reliable, and incredibly skilled. Virtual Nexgen has become an integral part of our daily operations.",
  },
  {
    name: "Amanda Chen",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/70384.jpg",
    text: "The level of expertise and dedication they bring to every task is remarkable. Our productivity has soared since we started working together.",
  },
  {
    name: "Chris Anderson",
    role: "Client",
    image: "https://virtualnexgen.com/assets/uploads/about/71492.jpg",
    text: "From day one, the team has been incredibly supportive and proactive. They anticipate our needs and deliver solutions before we even ask.",
  },
];

function splitColumns(items: typeof testimonials) {
  const cols: (typeof testimonials)[] = [[], [], []];
  items.forEach((item, i) => cols[i % 3].push(item));
  return cols;
}

function GlassCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <div className="break-inside-avoid mb-4">
      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:border-[#06B6D4]/40 hover:bg-white/15 hover:shadow-[0_8px_40px_rgba(6,182,212,0.08)]">
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="h-3.5 w-3.5 fill-[#06B6D4] text-[#06B6D4]" />
          ))}
        </div>
        <blockquote className="text-sm leading-relaxed text-white/70">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>
        <div className="mt-5 flex items-center gap-3">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={36}
            height={36}
            loading="lazy"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-[#06B6D4]/30"
          />
          <div>
            <p className="text-sm font-semibold text-white">{testimonial.name}</p>
            <p className="text-xs text-white/40">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeColumn({
  items,
  duration,
  reverse,
}: {
  items: typeof testimonials;
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative h-[280px] overflow-hidden sm:h-[360px] md:h-[420px] lg:h-[460px]">
      <div
        className="flex flex-col"
        style={{
          animation: `marqueeY ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {doubled.map((t, i) => (
          <GlassCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const cols = splitColumns(testimonials);

  return (
    <>
      <style>{`
        @keyframes marqueeY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .flex.flex-col[style*="marqueeY"] {
            animation: none !important;
          }
        }
      `}</style>

      <section
        id="testimonials"
        className="relative overflow-hidden py-8 sm:py-12 lg:py-16 bg-[#132F4A]"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal y={20}>
              <span className="inline-block rounded-full bg-[#06B6D4]/10 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4] ring-1 ring-[#06B6D4]/30">
                Client Testimonials
              </span>
            </Reveal>
            <Reveal y={30} delay={0.12}>
<h2 className="mt-5 sm:mt-7 text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Hear How Our Solutions{" "}
              <span className="text-[#06B6D4]">
                Made a Difference
              </span>
            </h2>
            </Reveal>
            <Reveal y={20} delay={0.24}>
              <p className="mx-auto mt-3 sm:mt-5 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/60">
                Real feedback from businesses that trust Virtual Nexgen Solutions.
              </p>
            </Reveal>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6">
            {cols.map((col, i) => (
              <MarqueeColumn
                key={i}
                items={col}
                duration={28 + i * 6}
                reverse={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
