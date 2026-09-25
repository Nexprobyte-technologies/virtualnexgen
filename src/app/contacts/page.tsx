"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock,
  Headset,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ContactInfo } from "@/lib/contacts";

const contactChannels = [
  {
    icon: Briefcase,
    title: "Talk to Sales",
    text: "Discuss your agency's goals and discover how our Virtual Assistant solutions can improve efficiency and scalability.",
    email: "sales@virtualnexgen.com",
    note: "Free consultation • No obligation",
  },
  {
    icon: Headset,
    title: "Contact Support",
    text: "Have questions about onboarding, workflows, or existing services? Our support team is ready to assist you.",
    email: "info@virtualnexgen.com",
    note: "Response during business hours",
  },
  {
    icon: ArrowRight,
    title: "Work With Us",
    text: "Interested in joining our team or exploring partnership opportunities? We'd love to hear from you.",
    email: "careers@virtualnexgen.com",
    note: "Remote opportunities available",
  },
];

const testimonials = [
  {
    quote:
      "Virtual Nexgen Solutions transformed the way we operate. Their team is responsive and professional, making our workflow seamless.",
    name: "John Smith",
    role: "Client",
  },
  {
    quote:
      "The assistance we received was exceptional! They understood our needs and delivered beyond expectations every time.",
    name: "Michael Jones",
    role: "Client",
  },
  {
    quote:
      "I can't recommend Virtual Nexgen Solutions enough! Their support has been a game changer for our business.",
    name: "Sarah Brown",
    role: "Client",
  },
  {
    quote:
      "Outstanding service and professionalism. They truly care about their clients and their success.",
    name: "Emily Davis",
    role: "Client",
  },
];

const faqs = [
  {
    q: "How quickly will someone respond after I contact you?",
    a: "Our team typically responds within one business day. For urgent operational matters, existing clients receive priority support during business hours.",
  },
  {
    q: "Who should I contact for sales or new service inquiries?",
    a: "If you're exploring a Virtual Assistant or back-office outsourcing support, contact our sales team. We'll assess your needs and recommend the right solution.",
  },
  {
    q: "Where can existing clients get operational support?",
    a: "Current clients can reach our support team directly for workflow updates, service requests, compliance questions, or performance-related matters.",
  },
  {
    q: "Is the initial consultation free?",
    a: "Yes. We offer a complimentary consultation to understand your business operations, identify bottlenecks, and outline how our outsourcing services can help.",
  },
  {
    q: "What information should I prepare before contacting you?",
    a: "It helps to share your team size, current staffing structure, key pain points, and the type of support you're seeking. This allows us to provide tailored recommendations.",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export default function ContactPage() {
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [form, setForm] = useState(initialForm);
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((d) => setInfo(d))
      .catch(() => {});
  }, []);

  const locations = useMemo(() => {
    if (!info) return [];
    return [
      {
        country: "United States",
        tagline: "Client Strategy & Support",
        address: info.addressUS,
        map: "https://www.google.com/maps?q=2360+Hood+Avenue+San+Diego+CA+92123&output=embed",
      },
      {
        country: "India",
        tagline: "Operations & Virtual Assistant Teams",
        address: info.addressIndia,
        map: "https://www.google.com/maps?q=Srinivasa+Spaces+Coimbatore+Tamil+Nadu&output=embed",
      },
    ].filter((l) => l.address);
  }, [info]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: "contact-request", time: "contact-request" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm(initialForm);
      setAgree(false);
    } catch {
      setStatus("error");
    }
  }

  const inputBase =
    "w-full rounded-full border border-line bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25";

  return (
    <>
      <Navbar />
      <main className="bg-cream">
        {/* ================= Hero ================= */}
        <section
          className="relative overflow-hidden pb-10 pt-28 sm:pt-32"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(236,253,229,1) 50%, rgba(255,255,255,1) 100%)",
          }}
        >
          <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            {/* Breadcrumb */}
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink/50">
                <Link href="/" className="transition hover:text-brand-dark">
                  Home
                </Link>
                <span className="text-ink/30">›</span>
                <span className="font-medium text-ink/70">Contact</span>
              </nav>
            </Reveal>

            {/* Trust pill */}
            <Reveal delay={0.05}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs text-ink/60 shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-dark opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-dark" />
                </span>
                Trusted by <span className="font-semibold text-ink">100+ businesses</span> nationwide.
              </div>
            </Reveal>

            <div className="mt-6 max-w-3xl">
              <Reveal delay={0.1}>
                <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Contact Virtual <span className="text-gradient">Nexgen</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
                  Tell us about your business and the operational support you're looking for. Our
                  team will guide you through the next steps with clarity and structure.
                </p>
              </Reveal>
            </div>

            {/* Channel cards */}
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {contactChannels.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={0.08 * i}>
                    <div className="card h-full p-6 sm:p-7">
                      <div className="icon-tile h-12 w-12">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="mt-5 text-lg font-bold text-ink">{c.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink/60">{c.text}</p>
                      <a
                        href={`mailto:${c.email}`}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-soft hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                      >
                        <Mail className="h-4 w-4" />
                        {c.email}
                      </a>
                      <p className="mt-3 text-center text-xs text-ink/40">{c.note}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= Form ================= */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Get In Touch"
                  title="Tell Us About Your"
                  highlight="Requirements"
                  description="Answer a few quick questions and we'll route you to the right team."
                />

                <Reveal delay={0.15}>
                  <ul className="mt-8 space-y-4">
                    {[
                      { icon: ShieldCheck, text: "Response within one business day" },
                      { icon: Lock, text: "Your information is 100% secure — never shared" },
                      { icon: CheckCircle2, text: "No obligation, cancel anytime" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.text} className="flex items-center gap-3 text-sm text-ink/70">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-cream-2 text-brand-dark">
                            <Icon className="h-4 w-4" />
                          </span>
                          {item.text}
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>

                {info?.phoneUS && (
                  <Reveal delay={0.2}>
                    <a
                      href={`tel:${info.phoneUS.replace(/[^+\d]/g, "")}`}
                      className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 transition hover:border-brand hover:shadow-[0_8px_30px_rgba(249,115,22,0.25)]"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-2 text-brand-dark">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs text-ink/40">Prefer to talk?</span>
                        <span className="block text-sm font-bold text-ink">{info.phoneUS}</span>
                      </span>
                    </a>
                  </Reveal>
                )}
              </div>

              <Reveal delay={0.1}>
                <div className="rounded-[2rem] border border-line bg-cream-2/60 p-6 sm:p-8">
                  {status === "sent" ? (
                    <div className="flex flex-col items-center justify-center py-14 text-center">
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/20">
                        <CheckCircle2 className="h-8 w-8 text-brand-dark" />
                      </span>
                      <h3 className="mt-5 text-xl font-extrabold text-ink">Message Sent!</h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
                        Thanks{form.name ? ` ${form.name.split(" ")[0]}` : ""}! Our team will get
                        back to you within one business day.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-7 rounded-full border border-line bg-white px-6 py-2.5 text-sm font-semibold text-ink/70 transition hover:border-brand hover:text-brand-dark"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        required
                        type="text"
                        placeholder="First Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputBase}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Work Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputBase}
                      />
                      <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                          <input
                            type="tel"
                            aria-label="Country code"
                            defaultValue="+1"
                            className={`${inputBase} pl-10 font-semibold`}
                          />
                        </div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={inputBase}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={inputBase}
                      />
                      <textarea
                        rows={4}
                        placeholder="Tell us more (optional)"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputBase} resize-none rounded-3xl`}
                      />

                      <label className="flex cursor-pointer items-start gap-3 pt-1 text-xs leading-relaxed text-ink/60">
                        <input
                          type="checkbox"
                          required
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[#F97316]"
                        />
                        <span>
                          I agree to be contacted by Virtual Nexgen Solutions regarding my inquiry
                          and accept the{" "}
                          <Link href="/" className="font-medium text-brand-dark underline">
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>

                      {status === "error" && (
                        <p className="rounded-xl bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
                          Something went wrong. Please try again or email us directly.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="shine flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-ink-soft hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>

                      <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] text-ink/40">
                        <Lock className="h-3 w-3" />
                        Your information is 100% secure. We never share your data with third
                        parties.
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= Global Presence ================= */}
        {locations.length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <SectionHeading
                eyebrow="Our Global Presence"
                title="One Team, Two"
                highlight="Locations"
                description="Strategically positioned to support clients across time zones, without missing a beat."
              />

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {locations.map((loc, i) => (
                  <Reveal key={loc.country} delay={0.08 * i}>
                    <div className="overflow-hidden rounded-[2rem] bg-[#0B2A4A] text-white shadow-[0_24px_60px_rgba(11, 42, 74,0.25)]">
                      <div className="p-7 sm:p-8">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-bold">{loc.country}</h3>
                            <p className="mt-1 text-sm text-white/60">{loc.tagline}</p>
                          </div>
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10">
                            <MapPin className="h-5 w-5 text-brand" />
                          </span>
                        </div>
                        <div className="mt-6 flex items-start gap-4">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5">
                            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                          </span>
                          <p className="text-sm leading-relaxed text-white/85">{loc.address}</p>
                        </div>
                      </div>
                      <div className="h-56 w-full">
                        <iframe
                          title={`Map - ${loc.country}`}
                          src={loc.map}
                          className="h-full w-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Phone / email strip */}
              <Reveal delay={0.15}>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {info?.phoneUS && (
                    <a
                      href={`tel:${info.phoneUS.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-4 rounded-2xl border border-line bg-cream px-5 py-4 transition hover:border-brand hover:shadow-md"
                    >
                      <span className="icon-tile h-10 w-10">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs text-ink/40">United States</span>
                        <span className="block text-sm font-bold text-ink">{info.phoneUS}</span>
                      </span>
                    </a>
                  )}
                  {info?.phoneIndia && (
                    <a
                      href={`tel:${info.phoneIndia.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-4 rounded-2xl border border-line bg-cream px-5 py-4 transition hover:border-brand hover:shadow-md"
                    >
                      <span className="icon-tile h-10 w-10">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs text-ink/40">India</span>
                        <span className="block text-sm font-bold text-ink">{info.phoneIndia}</span>
                      </span>
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ================= Testimonials ================= */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Testimonials"
              title="What Our Clients Are"
              highlight="Saying"
              description="Discover how Virtual Nexgen Solutions is helping businesses optimize their operations and scale effectively."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={0.06 * i}>
                  <figure className="card h-full p-6 sm:p-7">
                    <blockquote className="text-sm leading-relaxed text-ink/70">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-2 text-ink/50">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-ink">{t.name}</span>
                        <span className="block text-xs text-ink/40">{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= Book a Meeting (Calendly) ================= */}
        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Book a Meeting"
              title="Schedule a Free"
              highlight="Consultation"
              description="Pick a slot on our live 30-minute calendar. After booking, the confirmation and calendar invitation land straight in your inbox."
            />
            <Reveal delay={0.06}>
              <div className="mt-10">
                <CalendlyEmbed />
              </div>
            </Reveal>
            <p className="mt-4 text-center text-xs text-ink/40">
              Powered by Calendly · 30 min · Google Meet details are shared after
              scheduling.
            </p>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Contact FAQs"
              title="Frequently Asked"
              highlight="Questions"
              description="Quick answers about contacting and working with our team."
            />
            <div className="mt-10 space-y-3">
              {faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={faq.q} delay={0.04 * i}>
                    <div className="overflow-hidden rounded-2xl border border-line bg-cream/60 transition hover:border-brand/40">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      >
                        <span className="text-sm font-semibold text-ink sm:text-base">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-ink/40 transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-ink/60 sm:px-6">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="pb-20 pt-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <Reveal>
              <div className="animated-gradient relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-12 sm:py-16">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="relative">
                  <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Start Saving With a Free Consultation
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                    See how much time and money a dedicated virtual assistant can save your
                    business.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      href="/book-consultation"
                      className="shine inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-ink transition hover:shadow-[0_12px_32px_rgba(255,255,255,0.25)]"
                    >
                      <Clock className="h-4 w-4" />
                      Book Your Demo
                    </Link>
                    <a
                      href="mailto:info@virtualnexgen.com"
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                    >
                      <Mail className="h-4 w-4" />
                      Email Our Team
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
