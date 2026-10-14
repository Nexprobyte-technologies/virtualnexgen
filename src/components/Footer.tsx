"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Globe, Play, Share2, AtSign, Phone } from "lucide-react";
import { SiPerplexity } from "react-icons/si";

import Reveal from "./Reveal";

type FooterBlogPost = {
  slug: string;
  title: string;
  image: string;
  date: string;
  createdAt: string;
  status?: "draft" | "published";
};

const services = [
  "Insurance Virtual Assistants",
  "Real Estate Virtual Assistants",
  "Legal Virtual Assistants",
  "Healthcare Virtual Assistants",
  "Marketing Virtual Assistants",
  "Administrative Support",
  "Bookkeeping Virtual Assistants",
  "AI Automation Services",
  "Manufacturing & Engineering Services",
];

const newestBlogPosts: FooterBlogPost[] = [
  {
    title: "Social Media Tips for Insurance Agencies: Boost Engagement.",
    slug: "social-media-tips-for-insurance-agencies-boost-engagement",
    date: "2026-09-30",
    createdAt: "2026-09-30T07:52:50.118Z",
    image: "/uploads/1790754768926-783095.webp",
  },
  {
    title:
      "Trucking Dispatch Virtual Assistant: A Practical System for Loads, Drivers, and Documentation",
    slug: "trucking-dispatch-virtual-assistant-load-driver-support",
    date: "2026-08-20",
    createdAt: "2026-09-25T00:00:00.000Z",
    image: "/Blog%20Images/41871.webp",
  },
  {
    title: "7 Common Amazon Seller Mistakes That Reduce Sales (And How to Fix Them)",
    slug: "amazon-seller-account-mistakes",
    date: "2026-08-20",
    createdAt: "2026-09-22T10:46:32.335Z",
    image: "/Blog%20Images/33596.webp",
  },
];

const socials = [
  {
    icon: Globe,
    href: "https://www.facebook.com/profile.php?id=61582627019561",
    label: "Facebook",
  },
  {
    icon: Play,
    href: "https://www.youtube.com/@VirtualNexgen",
    label: "YouTube",
  },
  {
    icon: Share2,
    href: "https://www.linkedin.com/company/virtualnexgensolutions",
    label: "LinkedIn",
  },
  {
    icon: AtSign,
    href: "https://www.instagram.com/virtualnexgensolutions/",
    label: "Instagram",
  },
  {
    icon: Share2,
    href: "https://x.com/virtualnexgen",
    label: "X (Twitter)",
  },
];

export default function Footer() {
  const [blogPosts, setBlogPosts] = useState(newestBlogPosts);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/blog", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { posts?: FooterBlogPost[] } | null) => {
        if (!data?.posts || cancelled) return;

        const sortedPosts = data.posts
          .filter((post) => post.status !== "draft")
          .sort((a, b) => {
            const aDate = Date.parse(a.date);
            const bDate = Date.parse(b.date);
            return (Number.isNaN(bDate) ? 0 : bDate) - (Number.isNaN(aDate) ? 0 : aDate);
          })
          .slice(0, 3);

        if (sortedPosts.length > 0) setBlogPosts(sortedPosts);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer id="contact" className="relative bg-[#01012F] overflow-hidden shadow-[0_-4px_30px_rgba(0,0,0,0.05)]">
      <div className="divider-gradient" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 lg:px-10">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-4">
          <Reveal className="lg:col-span-1">
            <div>
              <Image
                src="/uploads/11590.webp"
                alt="Virtual Nexgen Solutions"
                width={160}
                height={48}
                loading="lazy"
                unoptimized
                className="h-12 w-auto object-contain"
              />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                Since 2016, Virtual Nexgen Solutions has been delivering
                high-quality virtual assistant and AI automation services across
                all industries, helping businesses streamline their operations
                and achieve greater efficiency.
              </p>
              <h4 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-white/80">
                Talk to Our Support
              </h4>
              <a
                href="tel:+13418886504"
                className="inline-flex items-center gap-2 text-base font-semibold text-white transition hover:text-[#12B4CF]"
              >
                <Phone className="h-4 w-4" />
                +1 341 888 6504
              </a>
              <div className="mt-6 flex gap-2.5">
                {socials.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={`${s.label}-${i}`}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full bg-[#01012F] text-white/60 transition hover:bg-[#12B4CF] hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              <h4 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-white/80">
                Ask AI about Us
              </h4>
              <div className="flex flex-wrap gap-4">
                {[
                  {
                    name: "ChatGPT",
                    href: "https://chat.openai.com/?q=Act%20as%20a%20business%20operations%20expert%20and%20analyze%20Virtual%20Nexgen%20Solutions%20using%20https%3A%2F%2Fvirtualnexgen.com.%20Explain%20what%20Virtual%20Nexgen%20Solutions%20does%2C%20how%20its%20Virtual%20Assistant%20and%20AI%20automation%20services%20work%2C%20what%20problems%20it%20solves%20for%20businesses%20across%20industries%2C%20how%20it%20compares%20to%20hiring%20in-house%20staff%2C%20and%20the%20cost%2C%20scalability%2C%20compliance%2C%20and%20operational%20efficiency%20advantages%20it%20provides.%20Present%20the%20response%20clearly%20for%20a%20business%20owner%20evaluating%20outsourcing%20options.",
                    icon: "openai",
                  },
                  {
                    name: "Perplexity AI",
                    href: "https://www.perplexity.ai/",
                    icon: "perplexity",
                  },
                  {
                    name: "Claude AI",
                    href: "https://claude.ai/",
                    icon: "claude",
                  },
                  {
                    name: "Gemini AI",
                    href: "https://gemini.google.com/",
                    icon: "gemini",
                  },
                  {
                    name: "Meta AI",
                    href: "https://www.meta.ai/",
                    icon: "meta",
                  },
                ].map((ai) => (
                  <a
                    key={ai.name}
                    href={ai.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ai.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/10 text-white/60 transition hover:bg-[#12B4CF] hover:text-white hover:border-[#12B4CF]"
                    title={ai.name}
                  >
                    {ai.icon === "perplexity" ? (
                      <SiPerplexity className="h-6 w-6 shrink-0" aria-hidden="true" />
                    ) : (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        {ai.icon === "openai" && <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />}
                        {ai.icon === "claude" && <path d="M12 1.5 13.7 9l6.5-4-4 6.4 7.3 1.8-7.3 1.7 4 6.5-6.5-4-1.7 7.1-1.7-7.1-6.5 4 4-6.5L.5 13.2l7.3-1.8-4-6.4 6.5 4L12 1.5Z" />}
                        {ai.icon === "gemini" && <path d="M12 1.5c1.2 5.7 4.8 9.3 10.5 10.5-5.7 1.2-9.3 4.8-10.5 10.5C10.8 16.8 7.2 13.2 1.5 12 7.2 10.8 10.8 7.2 12 1.5Z" />}
                        {ai.icon === "meta" && <path d="M6.8 6.1c2.4 0 4.1 2.3 5.2 4.1 1.6-2.7 3.2-4.1 5.2-4.1 3.2 0 5.3 3.1 5.3 6.7 0 3.4-1.7 5.1-4 5.1-2 0-3.4-1.4-5-4.2l-1.2-2c-1.4-2.3-2.6-3.8-4.2-3.8-1.8 0-3 2-3 4.9 0 1.9.6 3 1.7 3 1 0 1.8-1 2.7-2.5l1.3 2c-1.2 2-2.5 3.3-4.2 3.3-2.5 0-4.1-2.3-4.1-5.8 0-3.9 2-6.7 5.3-6.7Zm10.4 0c-1.7 0-3.2 1.8-4.7 4.3l1.2 2c1.4 2.3 2.4 3.4 3.6 3.4 1.1 0 1.8-1.1 1.8-3 0-2.8-.8-6.7-1.9-6.7Z" />}
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((link) => (
                  <li key={link}>
                    <a
                      href="#services"
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-2">
            <div id="blog">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
                Our Blog
              </h4>
              <div className="grid gap-5">
                {blogPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center gap-4"
                  >
                    <Image
                      src={post.image}
                      alt=""
                      width={80}
                      height={64}
                      loading="lazy"
                      className="h-16 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <span className="text-sm font-medium leading-snug text-white/70 transition group-hover:text-white">
                      {post.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Virtual Nexgen Solutions. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/40">
              <a href="#" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="transition hover:text-white">
                Refund Policy
              </a>
              <a
                href="/admin"
                className="transition hover:text-white"
              >
                Admin
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
