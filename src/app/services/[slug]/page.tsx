import sanitizeHtml from "sanitize-html";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  ChevronRight,
  Home,
  CheckCircle2,
  PhoneCall,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Zap,
  Award,
} from "lucide-react";
import { getService, getServices } from "@/lib/services";
import Reveal from "@/components/Reveal";

const RICH_HTML_STYLES = [
  "h2", "h3", "h4", "p", "strong", "em", "a", "ul", "ol", "li", "blockquote",
  "hr", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "br", "span",
  "img", "u", "s", "div", "b", "i"
];

function RenderRichHtml({ html }: { html: string }) {
  const safe = sanitizeHtml(html, {
    allowedTags: RICH_HTML_STYLES,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "style", "width", "height"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      div: ["class", "style"],
      span: ["class", "style"],
      p: ["class", "style"],
      h2: ["class", "style"],
      h3: ["class", "style"],
      h4: ["class", "style"],
      ul: ["class", "style"],
      ol: ["class", "style"],
      li: ["class", "style"],
      strong: ["class", "style"],
      em: ["class", "style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          href: attribs.href,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      img: (tagName, attribs) => ({
        tagName,
        attribs: {
          src: attribs.src,
          alt: attribs.alt || "",
          title: attribs.title,
          style: attribs.style,
          width: attribs.width,
          height: attribs.height,
        },
      }),
    },
  });

  return (
    <div
      className="rich-content [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-ink sm:[&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:text-ink [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-ink [&_p]:my-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-ink/70 sm:[&_p]:text-lg [&_strong]:font-bold [&_strong]:text-ink [&_em]:italic [&_u]:underline [&_a]:font-semibold [&_a]:text-brand-dark [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 [&_ul]:my-5 [&_ul]:space-y-2.5 [&_ul]:pl-5 [&_ul]:text-base [&_ul]:leading-relaxed [&_ul]:text-ink/70 sm:[&_ul]:text-lg [&_ol]:my-5 [&_ol]:space-y-2.5 [&_ol]:pl-5 [&_ol]:text-base [&_ol]:leading-relaxed [&_ol]:text-ink/70 sm:[&_ol]:text-lg [&_li]:marker:text-brand-dark [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-5 [&_blockquote]:text-lg [&_blockquote]:font-medium [&_blockquote]:italic [&_blockquote]:text-ink/80 [&_hr]:my-8 [&_hr]:border-line [&_code]:rounded [&_code]:bg-brand/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-semibold [&_code]:text-brand-deep [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm [&_table]:text-ink/70 [&_th]:border [&_th]:border-line [&_th]:bg-cream [&_th]:px-3 [&_th]:py-2 [&_th]:font-bold [&_th]:text-ink [&_td]:border [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-2xl [&_img]:mt-4 [&_img]:mb-6 [&_b]:font-bold [&_i]:italic [&_div]:my-2 [&_span]:inline"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

export const dynamic = "force-dynamic";

const trustBadges = [
  { icon: Award, label: "Industry Expertise" },
  { icon: Users, label: "Dedicated VAs" },
  { icon: Clock, label: "Fast Onboarding" },
  { icon: Shield, label: "Secure & Compliant" },
  { icon: TrendingUp, label: "Up to 60% Cost Savings" },
  { icon: Zap, label: "Workflow Ready" },
];

const defaultSteps = [
  {
    num: "01",
    title: "Operations Review",
    desc: "We assess your workflows, tools setup, and operational gaps.",
  },
  {
    num: "02",
    title: "VA Matching",
    desc: "Matched with a trained VA aligned to your workflows and systems.",
  },
  {
    num: "03",
    title: "Systems Integration",
    desc: "Access, SOPs, and workflows configured for seamless handoff.",
  },
  {
    num: "04",
    title: "Scale Operations",
    desc: "Your VA handles daily tasks so your team focuses on growth.",
  },
];

const defaultFaqs = [
  {
    q: "How is this different from generic outsourcing?",
    a: "We focus on your industry exclusively. Our VAs are trained in your specific workflows, tools, and compliance requirements, meaning they integrate on day one without general admin training.",
  },
  {
    q: "Is the VA dedicated solely to my business?",
    a: "Yes. Every resource is 100% dedicated to your business, ensuring consistency and a deep understanding of your specific workflows.",
  },
  {
    q: "What tools and systems do they support?",
    a: "Our team is proficient in all major industry-specific platforms and tools. We align with your existing tech stack during onboarding.",
  },
  {
    q: "How quickly can we start?",
    a: "We can typically move from consultation to onboarding within 5-10 business days, depending on your specific requirements.",
  },
];

const defaultTestimonials = [
  {
    quote:
      "They've taken a lot of routine work off our team's plate, which gives us more time to focus on clients and growth.",
    name: "Dan F.",
    role: "Director of Sales",
  },
  {
    quote:
      "We started with a few basic tasks and, over time, became comfortable giving the team more. It's worked out really well.",
    name: "Michael S.",
    role: "Agency Owner",
  },
  {
    quote:
      "They took the time to learn how we work, which means a lot less back-and-forth for our team.",
    name: "Charis P.",
    role: "President",
  },
  {
    quote:
      "They've become a real support for our account managers. They handle a lot of the work our team doesn't need to spend time on.",
    name: "Eric K.",
    role: "President",
  },
];

const defaultBenefits = [
  { icon: "Zap", title: "Ready from Day One", desc: "Trained on your industry workflows, tools, and communication standards." },
  { icon: "Shield", title: "Expert Specialists", desc: "Proficient in your specific platforms and management systems." },
  { icon: "TrendingUp", title: "Built to Scale", desc: "Add operational capacity without increasing internal overhead." },
  { icon: "Users", title: "Dedicated Resources", desc: "Consistent team that learns your business inside out." },
  { icon: "Clock", title: "Fast Turnaround", desc: "Quick response times that keep your operations moving." },
  { icon: "Award", title: "Quality Focused", desc: "Accuracy-driven support with clear process execution." },
];

const defaultPricing = [
  { label: "Local In-House Staff", price: "$55,000+", desc: "Salary + Taxes + Benefits + Training", highlighted: false },
  { label: "Our Specialist", price: "$19,500", desc: "Flat Monthly Rate • Enterprise Infrastructure", highlighted: true },
  { label: "Annual Savings", price: "$35,000+", desc: "Reclaimed capital for growth", highlighted: false },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  const ctaPoints = service.ctaPoints?.length
    ? service.ctaPoints
    : [
        "Dedicated team or pay-as-you-go",
        "Onboarding within days",
        "No long-term lock-in",
        "Data & compliance aware",
      ];

  const benefits = service.benefits?.length ? service.benefits : defaultBenefits;
  const steps = service.steps?.length ? service.steps : defaultSteps;
  const pricing = service.pricing?.length ? service.pricing : defaultPricing;
  const testimonials = service.testimonials?.length ? service.testimonials : defaultTestimonials;
  const faqs = service.faqs?.length ? service.faqs : defaultFaqs;

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="relative overflow-hidden py-5" style={{ background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(151,199,199,1) 50%, rgba(255,255,255,1) 100%)" }}>
        <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-deep/8 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink/50">
            <Link href="/" className="flex items-center gap-1.5 transition hover:text-ink">
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
            <Link href="/services" className="transition hover:text-ink">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
            <span className="text-ink/80">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <div>
              <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                {service.eyebrow || service.name}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
                {service.short}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://calendly.com/virtualnexgen-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_16px_44px_rgba(164,189,188,0.35)] transition hover:shadow-[0_16px_60px_rgba(164,189,188,0.5)]"
                >
                  Book Your Demo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#get-started"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink/80 transition hover:border-brand hover:text-brand-dark"
                >
                  Learn More
                </a>
              </div>
            </div>
          </Reveal>

          {/* Stats Cards */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Tasks Completed", value: "1,200+", icon: CheckCircle2 },
                { label: "Active Clients", value: "50+", icon: Users },
                { label: "Avg Turnaround", value: "24h", icon: Clock },
                { label: "Client Retention", value: "95%", icon: TrendingUp },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                >
                  <stat.icon className="h-5 w-5 text-brand" />
                  <p className="mt-3 text-2xl font-extrabold text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-ink/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges Marquee */}
      <section className="border-y border-line bg-cream/30 py-6 overflow-hidden">
        <div className="flex gap-8 animate-[marquee-x_25s_linear_infinite] whitespace-nowrap">
          {[...trustBadges, ...trustBadges].map((b, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10">
                <b.icon className="h-4 w-4 text-brand-dark" />
              </div>
              <span className="text-sm font-semibold text-ink/70">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="inline-block rounded-full bg-cream-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                The Problem
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                Most Businesses Aren&apos;t Struggling to Grow —
                <span className="text-brand-dark"> They&apos;re Buried in Operations</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink/65">
                Repetitive tasks quietly consume the time your team should spend
                growing the business.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Workflow backlogs impacting delivery",
                  "High local staffing overhead",
                  "Burnout from repetitive admin work",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    <span className="text-sm text-ink/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Workflow Bottlenecks",
                  desc: "Tasks pile up when processes start too late.",
                },
                {
                  title: "Slow Turnaround",
                  desc: "Delayed responses create client friction.",
                },
                {
                  title: "Data Gaps",
                  desc: "Incomplete updates lead to reporting issues.",
                },
                {
                  title: "Rising Overhead",
                  desc: "Local staffing costs keep increasing.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-line bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                >
                  <h4 className="text-sm font-bold text-ink">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-ink/55">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream/30 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                Why Choose Us
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Built for{" "}
                <span className="text-brand-dark">Your Industry</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-ink/60">
                Trained virtual assistants integrated into your daily workflows,
                servicing, and operations.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, i) => {
              const iconMap: Record<string, typeof Zap> = { Zap, Shield, TrendingUp, Users, Clock, Award };
              const Icon = iconMap[item.icon] || Zap;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group rounded-2xl border border-line bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(164,189,188,0.1)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 transition-colors group-hover:bg-brand/20">
                      <Icon className="h-5 w-5 text-brand-dark" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink/60">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Content from services_full.json */}
      {service.fullContent?.contentHtml && (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                Complete Overview
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Everything About{" "}
                <span className="text-brand-dark">{service.name}</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 max-w-4xl mx-auto">
            <RenderRichHtml html={service.fullContent.contentHtml} />
          </div>

          {/* Additional Images from full content */}
          {service.fullContent?.images && service.fullContent.images.length > 1 && (
            <div className="mt-16 max-w-4xl mx-auto">
              <Reveal>
                <div className="grid gap-6 sm:grid-cols-2">
                  {service.fullContent.images.slice(1).map((img: string, idx: number) => (
                    <div key={idx} className="overflow-hidden rounded-2xl border border-line shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                      <img
                        src={img}
                        alt={`${service.name} - Image ${idx + 2}`}
                        loading="lazy"
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          )}
        </section>
      )}

      {/* How It Works */}
      <section className="bg-cream/30 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                How It Works
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Get Started in{" "}
                <span className="text-brand-dark">{steps.length} Simple Steps</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-lg font-extrabold text-brand-dark">
                    {step.num}
                  </div>
                  <h4 className="mt-4 text-base font-extrabold text-ink">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
              Pricing
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Stop Overpaying for{" "}
              <span className="text-brand-dark">Admin Work</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`relative rounded-2xl border p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] ${
                item.highlighted
                  ? "border-2 border-brand bg-gradient-to-br from-brand/5 to-white shadow-[0_8px_40px_rgba(164,189,188,0.12)]"
                  : "border-line bg-white"
              }`}>
                {item.highlighted && (
                  <span className="absolute -top-3 right-6 rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink">
                    Recommended
                  </span>
                )}
                <h4 className={`text-sm font-bold uppercase tracking-wider ${
                  item.highlighted ? "text-brand-dark" : "text-ink/50"
                }`}>
                  {item.label}
                </h4>
                <p className={`mt-4 text-4xl font-extrabold ${
                  item.label.includes("Savings") ? "text-green-600" : "text-ink"
                }`}>
                  {item.price}
                </p>
                <p className="mt-2 text-sm text-ink/50">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-line bg-cream/30 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
                Testimonials
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                What Our Clients Say
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 flex gap-6 animate-[marquee-x_30s_linear_infinite]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="w-[380px] shrink-0 rounded-2xl border border-line bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              >
                <p className="text-sm leading-relaxed text-ink/70 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand-dark">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-ink/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark">
              FAQ
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <h4 className="text-base font-bold text-ink">{faq.q}</h4>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {faq.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-[#001a33] via-brand-dark to-[#000000] p-8 sm:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {service.ctaTitle ||
                  `Ready to get started with ${service.name}?`}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                {service.ctaText ||
                  "Talk to our team and get a tailored plan for your business — no obligation, just a clear roadmap for how we can help."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://calendly.com/virtualnexgen-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-deep px-7 py-3.5 text-sm font-bold text-ink transition hover:brightness-110"
                >
                  {service.ctaButton || "Book a Free Consultation"}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${(service.ctaPhone || "+1 341 888 6504").replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <PhoneCall className="h-4 w-4" />
                  {service.ctaPhone || "+1 341 888 6504"}
                </a>
              </div>

              <div className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                {ctaPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="border-t border-line bg-cream/30 py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                Related Services
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.1}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(164,189,188,0.1)]"
                  >
                    {s.image && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-extrabold text-ink transition group-hover:text-brand-dark">
                        {s.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink/60">
                        {s.short}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition group-hover:gap-2.5">
                        Learn More <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
