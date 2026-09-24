import Image from "next/image";
import { Globe, Play, Share2, AtSign, Phone } from "lucide-react";

import Reveal from "./Reveal";

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

const blogPosts = [
  {
    title:
      "When a Construction Project Changes: The Administrative Work Behind Every Change Order",
    href: "https://virtualnexgen.com/blog/construction-virtual-assistant-change-order-support",
    image: "https://virtualnexgen.com/assets/uploads/blog/59452.png",
  },
  {
    title:
      "A Day in the Life of a Busy Roofing Company: Where a Virtual Assistant Fits In",
    href: "https://virtualnexgen.com/blog/roofing-virtual-assistant-business-support",
    image: "https://virtualnexgen.com/assets/uploads/blog/36357.png",
  },
  {
    title:
      "Wealth Management Virtual Assistant: Reduce Back-Office Work and Improve Client Service",
    href: "https://virtualnexgen.com/blog/wealth-management-administrative-support",
    image: "https://virtualnexgen.com/assets/uploads/blog/20048.png",
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
  return (
    <footer id="contact" className="relative bg-[#F8FAFC] overflow-hidden shadow-[0_-4px_30px_rgba(10,25,47,0.05)]">
      <div className="divider-gradient" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 lg:px-10">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-4">
          <Reveal className="lg:col-span-1">
            <div>
              <Image
                src="https://virtualnexgen.com/assets/uploads/logo/37678.png"
                alt="Virtual Nexgen Solutions"
                width={160}
                height={48}
                loading="lazy"
                className="h-12 w-auto object-contain"
              />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
                Since 2016, Virtual Nexgen Solutions has been delivering
                high-quality virtual assistant and AI automation services across
                all industries, helping businesses streamline their operations
                and achieve greater efficiency.
              </p>
              <h4 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-ink/80">
                Talk to Our Support
              </h4>
              <a
                href="tel:+13418886504"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#0A192F] transition hover:text-[#00ADB5]"
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
                      className="grid h-10 w-10 place-items-center rounded-full bg-cream-2 text-ink/60 transition hover:bg-[#00ADB5] hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              <h4 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-ink/80">
                Ask AI about Us
              </h4>
              <div className="flex flex-wrap gap-4">
                {[
                  {
                    name: "ChatGPT",
                    href: "https://chat.openai.com/?q=Act%20as%20a%20business%20operations%20expert%20and%20analyze%20Virtual%20Nexgen%20Solutions%20using%20https%3A%2F%2Fvirtualnexgen.com.%20Explain%20what%20Virtual%20Nexgen%20Solutions%20does%2C%20how%20its%20Virtual%20Assistant%20and%20AI%20automation%20services%20work%2C%20what%20problems%20it%20solves%20for%20businesses%20across%20industries%2C%20how%20it%20compares%20to%20hiring%20in-house%20staff%2C%20and%20the%20cost%2C%20scalability%2C%20compliance%2C%20and%20operational%20efficiency%20advantages%20it%20provides.%20Present%20the%20response%20clearly%20for%20a%20business%20owner%20evaluating%20outsourcing%20options.",
                    icon: "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z",
                  },
                  {
                    name: "Perplexity",
                    href: "https://www.perplexity.ai/",
                    icon: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.5 5v10l8.5-5-8.5-5z",
                  },
                  {
                    name: "Claude",
                    href: "https://claude.ai/",
                    icon: "M4.709 15.955l4.72-2.756.08-.046 2.802-1.636a.206.206 0 0 0 0-.357L9.355 9.434 4.639 6.68a.206.206 0 0 0-.309.178v8.917a.206.206 0 0 0 .309.178h.07zm7.582-4.543l2.802 1.637 4.716 2.754a.206.206 0 0 0 .309-.178V7.596a.206.206 0 0 0-.309-.178l-4.716 2.754-2.802 1.637a.206.206 0 0 0 0 .357v.001z",
                  },
                  {
                    name: "Gemini",
                    href: "https://gemini.google.com/",
                    icon: "M12 2L2 19.5h20L12 2zm0 4l6.5 11.5h-13L12 6z",
                  },
                  {
                    name: "Meta AI",
                    href: "https://www.meta.ai/",
                    icon: "M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z",
                  },
                ].map((ai) => (
                  <a
                    key={ai.name}
                    href={ai.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-line bg-white text-ink/60 transition hover:bg-brand hover:text-ink hover:border-brand"
                    title={ai.name}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={ai.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/80">
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((link) => (
                  <li key={link}>
                    <a
                      href="#services"
                      className="text-sm text-ink/60 transition hover:text-brand-dark"
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
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/80">
                Our Blog
              </h4>
              <div className="grid gap-5">
                {blogPosts.map((post) => (
                  <a
                    key={post.href}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    <span className="text-sm font-medium leading-snug text-ink/70 transition group-hover:text-brand-dark">
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
            <p className="text-xs text-ink/40">
              © {new Date().getFullYear()} Virtual Nexgen Solutions. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-xs text-ink/40">
              <a href="#" className="transition hover:text-brand-dark">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-brand-dark">
                Terms of Service
              </a>
              <a href="#" className="transition hover:text-brand-dark">
                Refund Policy
              </a>
              <a
                href="/admin"
                className="transition hover:text-brand-dark"
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
