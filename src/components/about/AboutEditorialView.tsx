"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ShieldCheck,
  Target,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Users,
  Award,
  Lock,
  Zap,
  Globe2,
  Briefcase,
  FileCheck2,
  Stethoscope,
  Building,
  Scale,
  DollarSign,
  Headphones,
  SlidersHorizontal,
  UserCheck,
  BadgeCheck,
  ChevronRight,
  Eye,
  Check,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import FAQ9 from "@/components/FAQ9";
import type { AboutSection, AboutFeature } from "@/lib/types";

// Icon resolver for dynamic features & sections
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  UserCheck,
  SlidersHorizontal,
  Clock,
  DollarSign,
  Headphones,
  BadgeCheck,
  Target,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Building,
  Scale,
  Briefcase,
};

function getFeatureIcon(iconName: string) {
  const Icon = ICON_MAP[iconName] || CheckCircle2;
  return Icon;
}

// Timeline chapters data
const TIMELINE_CHAPTERS = [
  {
    year: "2016",
    tag: "THE INCEPTION",
    title: "Breaking the Freelancer Volatility Cycle",
    subtitle: "A radical promise: full-time, vetted dedicated talent with strict NDAs.",
    description:
      "Virtual Nexgen Solutions has focused on helping businesses manage their day-to-day operations with dedicated Virtual Assistants. Our approach combines industry-specific training, clearly defined workflows, and a commitment to protecting client information.",
    stats: "Since 2016",
    statLabel: "A decade of dedicated business support",
    deliverables: [
      "Dedicated Virtual Assistant Support",
      "Structured Training & SOPs",
      "Confidentiality-Focused Workflows",
      "Industry-Specific Expertise",
    ],
    highlight:
      "Established in Coimbatore, India, with a commitment to dependable Virtual Assistant services and long-term client partnerships.",
  },
  {
    year: "2019",
    tag: "DEEP SPECIALIZATION",
    title: "Vertical-Specific Operational Hubs",
    subtitle: "Expanding from administrative help into regulated legal, healthcare, and insurance pipelines.",
    description:
      "As client operational complexity grew, we engineered dedicated domain divisions. We trained specialized squads in industry software like AMS360, Clio, QuickBooks, and AppFolio, allowing clients to plug trained talent directly into revenue-generating workflows.",
    stats: "150+ Specialists",
    statLabel: "Across 4 Regulated Verticals",
    deliverables: [
      "Legal Case Briefing & Drafting",
      "Insurance Policy Audits & Loss Runs",
      "Real Estate Transaction Coordination",
    ],
    highlight: "Achieved 99.2% on-time delivery across all specialized service lines.",
  },
  {
    year: "2022",
    tag: "SECURITY VAULT",
    title: "Institutional-Grade Data Infrastructure",
    subtitle: "Deploying hardware VPN tunnels, on-site physical security, and biometric access controls.",
    description:
      "Enterprise security became our hallmark. We transitioned our facilities into high-compliance centers with 24/7 on-site guards, segregated client networks, hardware-enforced VPNs, and fingerprint authentication for every workstation.",
    stats: "100%",
    statLabel: "Clean Security Audit Record",
    deliverables: [
      "Biometric Workstation Authentication",
      "Isolated Client Virtual LANs",
      "HIPAA & Financial Confidentiality Alignment",
    ],
    highlight: "Zero security breaches or data incidents recorded across our history.",
  },
  {
    year: "PRESENT",
    tag: "AGENTIC AI ERA",
    title: "The Hybrid Powerhouse: Humans + AI",
    subtitle: "Augmenting every dedicated specialist with intelligent automation pipelines.",
    description:
      "Today, Virtual Nexgen sits at the forefront of the modern workforce revolution. We don't just supply exceptional human specialists — we equip them with custom AI automations, automated CRM synchronizers, and document intelligence tools that multiply client throughput by 3x.",
    stats: "320+ Global Clients",
    statLabel: "Average 40% Workload Reduction",
    deliverables: [
      "AI-Assisted Workflow Engineering",
      "24/7 Round-the-Clock Timezone Coverage",
      "Real-Time SLA & KPI Dashboards",
    ],
    highlight: "Over 320 businesses in the US, UK, Canada & Australia actively powered.",
  },
];

// Department tabs data
const DEPARTMENTS = [
  {
    id: "legal",
    name: "Legal & Professional Services",
    icon: Scale,
    tagline: "Reliable Legal Administrative Support",
    overview:
      "Our assistants help law firms stay organized by managing client intake, maintaining case records, coordinating appointments, and supporting routine administrative workflows.",
    bullets: [
      "Client intake & follow-ups",
      "Case file organization",
      "Calendar & appointment management",
      "Document preparation & tracking",
    ],
    metric: "18+ hrs",
    metricLabel: "Reclaimed weekly per attorney",
  },
  {
    id: "insurance",
    name: "Insurance & Claims",
    icon: ShieldCheck,
    tagline: "End-to-End Agency Policy & Claims Processing",
    overview:
      "Trained on industry standard agency management systems (AMS360, Applied Epic, EZLynx), our insurance assistants handle policy issuance, quote comparisons, and loss runs.",
    bullets: [
      "Certificate of Insurance (COI) issuance within 15 mins",
      "Policy checking, endorsements & cancellations",
      "Carrier portal quote submissions & loss runs",
      "Claims intake, follow-ups & renewal notifications",
    ],
    metric: "99.7%",
    metricLabel: "COI accuracy & compliance rate",
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: Building,
    tagline: "Contract-to-Close & MLS Pipeline Coordination",
    overview:
      "From qualifying incoming buyer leads to coordinating complex escrow documents, our real estate specialists ensure no deal falls through the cracks.",
    bullets: [
      "MLS listing creation, description writing & syndication",
      "Contract-to-close document management & calendar deadlines",
      "Instant buyer/seller lead follow-up & CRM hygiene",
      "Tenant screening, maintenance coordination & lease renewals",
    ],
    metric: "3.2x",
    metricLabel: "Faster lead response time",
  },
  {
    id: "administrative",
    name: "Finance & Accounting",
    icon: Briefcase,
    tagline: "C-Suite Leverage & Daily Bookkeeping",
    overview:
      "High-level executive assistants who take total ownership of your calendar, inbox, meeting preparation, travel itineraries, and QuickBooks reconciliations.",
    bullets: [
      "Inbox zero triage & high-priority calendar management",
      "QuickBooks & Xero reconciliation, invoicing & receipts",
      "Vendor communication & procurement management",
      "Board deck preparation, research reports & presentations",
    ],
    metric: "25+ hrs",
    metricLabel: "Saved per executive monthly",
  },
  {
    id: "ai-automation",
    name: "Operations & AI Support",
    icon: Zap,
    tagline: "Autonomous Agentic Pipelines & CRM Syncing",
    overview:
      "We design, build, and maintain custom AI automation bots that connect your forms, CRM, email marketing, and communication channels without human delay.",
    bullets: [
      "Zapier, Make & custom API workflow integrations",
      "Intelligent customer response chatbots with vector knowledge",
      "Automatic document extraction & classification",
      "Multi-channel automated outreach & lead qualification",
    ],
    metric: "60%",
    metricLabel: "Reduction in routine repetitive tasks",
  },
];

// Comparison data
const COMPARISON_ROWS = [
  {
    feature: "Employment Relationship",
    traditional: "Unvetted freelance contractors with high churn risks",
    nexgen: "100% Full-time employees bound by comprehensive NDAs",
  },
  {
    feature: "Data Security & Compliance",
    traditional: "Personal unmonitored laptops, shared home Wi-Fi",
    nexgen: "Hardware VPNs, biometric access, isolated VLANs, 24/7 guarded facilities",
  },
  {
    feature: "Technology & AI Tooling",
    traditional: "Purely manual labor with slow task turnaround",
    nexgen: "AI-augmented workflows that deliver 3x throughput speed",
  },
  {
    feature: "Continuity & Backup Coverage",
    traditional: "If the freelancer vanishes, your operation stalls",
    nexgen: "Dedicated account manager + fully cross-trained backup assistants",
  },
  {
    feature: "Pricing Model",
    traditional: "Unpredictable hourly billing with surprise agency markups",
    nexgen: "Transparent, flat monthly rate with zero hidden costs",
  },
];

interface AboutEditorialViewProps {
  initialData?: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    heroImage?: string;
    sections?: AboutSection[];
    features?: AboutFeature[];
    missionTitle?: string;
    missionText?: string;
    visionTitle?: string;
    visionText?: string;
    securityTitle?: string;
    securityPoints?: string[];
  };
}

export default function AboutEditorialView({ initialData }: AboutEditorialViewProps) {
  const [activeTimeline, setActiveTimeline] = useState<number>(0);
  const [activeDept, setActiveDept] = useState<string>("legal");
  const [data, setData] = useState(initialData || {});

  // Refetch latest data from /api/about if needed
  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) {
          setData((prev) => ({ ...prev, ...json }));
        }
      })
      .catch(() => {});
  }, []);

  const heroTitle =
    data.heroTitle && data.heroTitle !== "About Us"
      ? data.heroTitle
      : "The Architecture of Modern Work";
  const heroSubtitle =
    data.heroSubtitle ||
    data.heroDescription ||
    "Empowering Global Businesses with Dedicated Human Talent & Intelligent AI Automation Since 2016";

  const missionText =
    data.missionText ||
    "To empower businesses with AI automation and virtual assistance, enabling them to operate smarter, eliminate operational drag, and scale with sustainable profitability.";

  const visionText =
    data.visionText ||
    "To establish the global gold standard for AI-integrated remote operations, blending ethical human ingenuity with automated precision.";

  const featuresList =
    data.features && data.features.length > 0
      ? data.features
      : [
          {
            id: "f-1",
            icon: "UserCheck",
            title: "Skilled Full-Time Specialists",
            text: "Rigorous 4-stage vetting ensures only the top 1% of administrative, legal, and operational talent work on your accounts.",
            image: "",
          },
          {
            id: "f-2",
            icon: "SlidersHorizontal",
            title: "Tailored Workflow Integration",
            text: "We mirror your internal SOPs, toolsets, and communication rituals within 48 business hours with zero downtime.",
            image: "",
          },
          {
            id: "f-3",
            icon: "Clock",
            title: "Reclaim 20+ Hours Weekly",
            text: "Executives shift their focus to strategy and revenue while routine operations execute flawlessly in the background.",
            image: "",
          },
          {
            id: "f-4",
            icon: "DollarSign",
            title: "Up to 70% Cost Efficiency",
            text: "Eliminate payroll taxes, recruitment retainers, office overhead, and equipment expenses with a single predictable fee.",
            image: "",
          },
          {
            id: "f-5",
            icon: "Headphones",
            title: "24/7 Global Timezone Coverage",
            text: "Active shift rotations ensure work progresses seamlessly while you sleep, across US, UK, and Australian hours.",
            image: "",
          },
          {
            id: "f-6",
            icon: "BadgeCheck",
            title: "Audited Reliability & SLAs",
            text: "Every project is monitored with documented KPIs, daily execution logs, and an assigned dedicated operations manager.",
            image: "",
          },
        ];

  return (
    <div className="bg-[#fffaf3] text-ink selection:bg-[#12B4CF] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-14 md:pt-12 md:pb-18 border-b border-[#01012F]/10">
        {/* Soft background ambient glow */}

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Top Editorial Eyebrow */}
          <Reveal y={20}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#01012F]/15 pb-6">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#12B4CF]/30 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#12B4CF] animate-pulse" />
                VIRTUAL NEXGEN CHRONICLE • ESTABLISHED 2016
              </div>

              <div className="hidden sm:flex items-center gap-6 text-xs font-semibold tracking-wider text-[#01012F]/70 uppercase">
                <span>VOL. X • 2026 EDITION</span>
                <span>•</span>
                <span>320+ CLIENTS WORLDWIDE</span>
                <span>•</span>
                <span>GLOBAL OPERATIONS</span>
              </div>
            </div>
          </Reveal>

          {/* Main Editorial Headline & Lead */}
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal y={25} delay={0.1}>
                <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.08]">
                  Built on Trust <span className="text-[#12B4CF]">Driven</span> by Your{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-ink">Growth.</span>
                    <span className="absolute bottom-2 left-0 h-3.5 w-full bg-[#12B4CF]/20 -z-0 rounded-sm" />
                  </span>
                </h1>
              </Reveal>

              <Reveal y={25} delay={0.2}>
                <div className="mt-6 max-w-3xl">
                  <p className="text-xl font-semibold text-ink sm:text-2xl">
                    Your Business Deserves More Than Just Support.
                  </p>
                  <p className="mt-3 text-lg font-normal leading-relaxed text-ink/80 sm:text-xl">
                    {heroSubtitle}
                  </p>
                </div>
              </Reveal>

              {/* Quick Actions */}
              <Reveal y={25} delay={0.3}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://calendly.com/virtualnexgen-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#12B4CF] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_4px_24px_rgba(6,182,212,0.35)] transition-all duration-300 hover:bg-[#01012F] hover:text-white"
                  >
                    <span>Schedule Consultation</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#01012F] text-white transition-transform duration-300 group-hover:bg-[#12B4CF] group-hover:text-white group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>

                  <a
                    href="#timeline"
                    className="inline-flex items-center gap-2.5 rounded-full border border-[#01012F]/30 bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-ink backdrop-blur-sm transition-all duration-300 hover:bg-[#01012F] hover:text-white hover:border-[#01012F]"
                  >
                    <span>Explore Our Journey</span>
                    <ArrowRight className="h-4 w-4 text-[#12B4CF]" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Quick Stats Column */}
            <div className="lg:col-span-4">
              <Reveal y={25} delay={0.35}>
                <div className="rounded-2xl border border-[#01012F]/10 bg-white p-6 backdrop-blur-md shadow-[0_12px_32px_rgba(19,47,74,0.06)]">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#12B4CF]">
                      Impact at a Glance
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="border-r border-[#01012F]/10 pr-3">
                        <div className="text-3xl font-extrabold text-ink">2016</div>
                        <div className="text-xs text-ink/70 mt-1 font-medium">The Year our journey began</div>
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-ink">15+</div>
                        <div className="text-xs text-ink/70 mt-1 font-medium">Industries supported</div>
                      </div>
                      <div className="border-r border-[#01012F]/10 pr-3 pt-3 border-t">
                        <div className="text-3xl font-extrabold text-[#12B4CF]">350+</div>
                        <div className="text-xs text-ink/70 mt-1 font-medium">Businesses supported*</div>
                      </div>
                      <div className="pt-3 border-t border-[#01012F]/10">
                        <div className="text-3xl font-extrabold text-ink">24/7</div>
                        <div className="text-xs text-ink/70 mt-1 font-medium">Support availability*</div>
                      </div>
                    </div>
                  </div>
<div className="mt-5 rounded-xl bg-[#01012F] px-3.5 py-2.5 text-xs text-white font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
              <span>100% In-House Staff • No Unvetted Freelancers</span>
            </div>
          </Reveal>
            </div>
          </div>

          {/* Hero Feature Visual with Editorial Caption */}
          <Reveal y={30} delay={0.4}>
            <div className="mt-14 relative overflow-hidden rounded-3xl border border-[#01012F]/10 bg-white p-3 shadow-[0_20px_60px_rgba(19,47,74,0.12)]">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-[#01012F]">
                <Image
                  src={data.heroImage || "/uploads/about-who-we-are.png"}
                  alt="Virtual Nexgen Operations"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01012F] via-[#01012F]/40 to-transparent" />

                {/* Floating Quote Badge on Image */}
                <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-auto md:max-w-xl">
                  <div className="rounded-2xl border border-white/20 bg-[#01012F]/90 p-5 backdrop-blur-md text-white shadow-xl">
                    <p className="text-sm md:text-base font-medium leading-relaxed italic text-white/95">
                      &ldquo;Great work begins with great people. We bring together skilled professionals,
                      structured processes, and a shared commitment to helping businesses grow.&rdquo;
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-white/50 font-semibold uppercase tracking-wider">
                      <span>VIRTUAL NEXGEN SOLUTIONS TEAM</span>
                      <span className="text-[#12B4CF]">COIMBATORE, INDIA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE INTERACTIVE TIMELINE JOURNEY (2016 -> PRESENT) */}
      {/* ========================================================================= */}
      <section id="timeline" className="relative py-14 md:py-18 overflow-hidden bg-[#fffaf3]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="max-w-3xl">
<span className="inline-flex items-center gap-2 rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#12B4CF]/10">
                  <Calendar className="h-3.5 w-3.5 text-[#12B4CF]" />
                  OUR DECADE-LONG JOURNEY
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
                From a Dedicated Team to Your <span className="text-[#12B4CF]">Global Business Partner</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink/70 leading-relaxed">
                Explore how we’ve grown since 2016, expanding our expertise and building dedicated Virtual
                Assistant support around the needs of businesses.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="w-fit rounded-xl border border-[#01012F]/10 bg-white px-4 py-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Dedicated professionals</h3>
                </div>
                <div className="w-fit rounded-xl border border-[#01012F]/10 bg-white px-4 py-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Structured processes</h3>
                </div>
                <div className="w-fit rounded-xl border border-[#01012F]/10 bg-white px-4 py-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Reliable support</h3>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Interactive Timeline Tabs */}
          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-[#01012F]/15 pb-4">
              {TIMELINE_CHAPTERS.map((chapter, idx) => {
                const isActive = activeTimeline === idx;
                return (
                  <button
                    key={chapter.year}
                    onClick={() => setActiveTimeline(idx)}
className={`group relative flex flex-col items-start p-4 rounded-2xl text-left transition-all duration-300 ${
                      isActive
                        ? "bg-[#01012F] text-white shadow-lg"
                        : "bg-white text-ink border border-[#01012F]/10 hover:bg-[#fffaf3]"
                  }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-2xl font-black ${
                          isActive ? "text-[#12B4CF]" : "text-ink"
                        }`}
                      >
                        {chapter.year}
                      </span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isActive ? "bg-white/10" : "bg-[#01012F]/20"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                        isActive ? "text-white/80" : "text-[#01012F]/60"
                      }`}
                    >
                      {chapter.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Chapter Details Display */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTimeline}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-[#01012F]/10 bg-white p-6 sm:p-10 lg:p-12 shadow-sm"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-7">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#12B4CF]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#12B4CF]">
                        Chapter {activeTimeline + 1} of 4 • {TIMELINE_CHAPTERS[activeTimeline].year}
                      </div>

                      {activeTimeline !== 0 && (
                        <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-ink">
                          {TIMELINE_CHAPTERS[activeTimeline].title}
                        </h3>
                      )}

                      {activeTimeline !== 0 && (
                        <p className="mt-2 text-base font-semibold text-[#12B4CF]">
                          {TIMELINE_CHAPTERS[activeTimeline].subtitle}
                        </p>
                      )}

                      <p className="mt-4 text-base leading-relaxed text-ink/80">
                        {TIMELINE_CHAPTERS[activeTimeline].description}
                      </p>

                      <div className="mt-6 border-t border-[#01012F]/10 pt-5">
                        <div className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-3">
                          Key Milestones
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {TIMELINE_CHAPTERS[activeTimeline].deliverables.map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-ink/90">
                              <CheckCircle2 className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="rounded-2xl border border-[#01012F]/10 bg-white p-6 shadow-[0_10px_30px_rgba(19,47,74,0.06)]">
                        <div className="text-xs font-bold uppercase tracking-widest text-ink/50">
                          {activeTimeline === 0 ? "OUR FOUNDATION" : "Historical Impact"}
                        </div>
                        <div className="mt-3 text-4xl sm:text-5xl font-black text-ink">
                          {TIMELINE_CHAPTERS[activeTimeline].stats}
                        </div>
                        <div className="text-sm font-semibold text-[#12B4CF] mt-1">
                          {TIMELINE_CHAPTERS[activeTimeline].statLabel}
                        </div>

                        <div className="mt-6 rounded-xl bg-[#01012F] p-4 text-xs font-medium leading-relaxed text-white/70">
                          <span className="font-bold text-white block mb-1">
                            {activeTimeline === 0 ? "Our Story" : "Archived Note:"}
                          </span>
                          {TIMELINE_CHAPTERS[activeTimeline].highlight}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MANIFESTO: MISSION, VISION & GUIDING PRINCIPLES */}
      {/* ========================================================================= */}
      <section className="relative py-14 md:py-18 overflow-hidden">
        {/* Subtle decorative glow */}

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#01012F]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#01012F]/20">
                <Sparkles className="h-3.5 w-3.5 text-[#12B4CF]" />
                THE VIRTUAL NEXGEN DIFFERENCE
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-ink">
                More Than Support. A Partner in Your Growth.
              </h2>
            </div>
          </Reveal>

          {/* Mission & Vision Dual Bento Cards */}
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <Reveal y={25} delay={0.1}>
              <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-[#01012F]/10 bg-white p-8 sm:p-10 backdrop-blur-md transition-all duration-300 hover:border-[#12B4CF]/50">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#12B4CF] text-white font-bold">
                      <Target className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#12B4CF]/50">
                      PURPOSE & COMMITMENT
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-ink">Our Mission</h3>
                  <h4 className="mt-3 text-lg font-semibold text-[#12B4CF]">Making Business Growth Easier</h4>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/80 font-normal">
                    We help businesses work smarter by combining dedicated Virtual Assistants, industry-specific expertise, and practical AI solutions. Our mission is to simplify daily operations, reduce administrative pressure, and give business owners more time to focus on growth.
                  </p>
                </div>

                <div className="mt-8 border-t border-[#01012F]/10 pt-6">
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#12B4CF]">Our Commitment</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm text-ink/90">
                      <Check className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
                      <span>Simplify complex day-to-day operations</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-ink/90">
                      <Check className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
                      <span>Deliver dependable, industry-focused support</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-ink/90">
                      <Check className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
                      <span>Help businesses create capacity for growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Vision Card */}
            <Reveal y={25} delay={0.2}>
              <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-[#01012F]/10 bg-white p-8 sm:p-10 backdrop-blur-md transition-all duration-300 hover:border-[#12B4CF]/50">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#01012F] text-white font-bold">
                      <Globe2 className="h-6 w-6 text-[#12B4CF]" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#12B4CF]">
                      THE FUTURE WE’RE BUILDING
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-ink">Our Vision</h3>
                  <h4 className="mt-3 text-lg font-semibold text-[#12B4CF]">Redefining How Businesses Get Work Done</h4>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/80 font-normal">
                    We envision a future where every growing business has access to the right people, processes, and technology to operate efficiently. By bringing together human expertise and intelligent automation, we aim to make high-quality operational support more accessible and scalable.
                  </p>
                </div>

                <div className="mt-8 border-t border-[#01012F]/10 pt-6">
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#12B4CF]">Our Ambition</h4>
<div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-sm text-ink/90">
                        <Check className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
                        <span>Make specialized business support accessible</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-ink/90">
                        <Check className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
                        <span>Combine human expertise with useful AI solutions</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-ink/90">
                        <Check className="h-4 w-4 text-[#12B4CF] flex-shrink-0" />
                        <span>Build lasting partnerships that grow with our clients</span>
                      </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE DEPARTMENT SPOTLIGHTS */}
      {/* ========================================================================= */}
      <section className="relative py-14 md:py-18 bg-[#fffaf3]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#12B4CF]/30">
                  <Briefcase className="h-3.5 w-3.5 text-[#12B4CF]" />
                  INDUSTRY-SPECIALIZED TEAMS
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
                  Trained for Your Industry. <span className="text-[#12B4CF]">Ready for Your Workflow.</span>
                </h2>
<p className="mt-4 text-base sm:text-lg text-ink/70">
                  Our Virtual Assistants support industry-specific operations, business software, and administrative workflows — helping your team spend less time managing tasks and more time serving clients.
                </p>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#12B4CF] hover:text-[#00697B] transition-colors"
              >
                <span>View All 9+ Practice Areas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Department Navigation Tabs */}
          <div className="mt-12 flex flex-wrap gap-2.5 border-b border-[#01012F]/15 pb-4">
            {DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              const isActive = activeDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#01012F] text-white shadow-md"
                      : "bg-white text-[#01012F] border border-[#01012F]/10 hover:bg-[#01012F] hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#12B4CF]" : "text-ink"}`} />
                  <span>{dept.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Department Spotlight Content */}
          <div className="mt-8">
            {DEPARTMENTS.filter((d) => d.id === activeDept).map((dept) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-[#01012F]/10 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(19,47,74,0.06)]"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#12B4CF]">
                      {dept.id === "legal" ? "LEGAL SUPPORT EXPERTISE" : "PRACTICE EXCELLENCE"}
                    </span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink">
                      {dept.tagline}
                    </h3>
                    <p className="mt-4 text-base text-ink/80 leading-relaxed">
                      {dept.overview}
                    </p>

                    <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
{dept.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm font-medium text-ink/90">
                          <CheckCircle2 className="h-4 w-4 text-[#12B4CF] flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="rounded-2xl border border-[#01012F]/10 bg-white p-6 sm:p-8 text-center">
                      <div className="text-xs font-bold uppercase tracking-widest text-ink/60">
                        {dept.id === "legal" ? "Dedicated Support" : "Operational Velocity"}
                      </div>
                      {dept.id === "legal" ? (
                        <div className="mt-3 text-sm font-bold text-ink">
                          Aligned with your firm&apos;s processes
                        </div>
                      ) : (
                        <>
                          <div className="mt-3 text-4xl sm:text-5xl font-black text-ink">
                            {dept.metric}
                          </div>
                          <div className="mt-2 text-sm font-bold text-[#12B4CF]">
                            {dept.metricLabel}
                          </div>
                        </>
                      )}

                      <div className="mt-6">
                        <Link
                          href="/book-consultation"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01012F] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-[#12B4CF] hover:text-white"
                        >
                          <span>Request Staffing Profile</span>
                          {dept.id === "legal" ? (
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowRight className="h-3.5 w-3.5" />
                          )}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 6 CORE ADVANTAGES (FEATURES FROM CMS) */}
      {/* ========================================================================= */}
      <section className="relative py-14 md:py-18 border-y border-[#01012F]/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="text-center max-w-3xl mx-auto">
<span className="inline-flex items-center gap-2 rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#12B4CF]/10">
                  <BadgeCheck className="h-3.5 w-3.5 text-[#12B4CF]" />
                  THE VIRTUAL NEXGEN ADVANTAGE
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
                More Than a Virtual Assistant. <span className="text-[#12B4CF]">A Smarter Way to Work.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink/70">
                The people, processes, and industry knowledge to help your business operate with greater confidence.
              </p>
            </div>
          </Reveal>

          {/* 6 Feature Grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuresList.map((feat, i) => {
              const Icon = getFeatureIcon(feat.icon);
              return (
                <Reveal key={feat.id || i} y={25} delay={i * 0.08}>
                  <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-[#01012F]/10 bg-white p-7 transition-all duration-300 hover:border-[#12B4CF]/50 hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#12B4CF] text-white transition-colors duration-300 group-hover:bg-[#01012F] group-hover:text-[#12B4CF]">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="text-xs font-black text-[#01012F]/30">0{i + 1}</span>
                      </div>

                      <h3 className="mt-6 text-xl font-bold text-ink">
                        {feat.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/75 font-normal">
                        {feat.text}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#01012F]/10 flex items-center justify-between text-xs font-bold text-ink uppercase tracking-wider">
                      <span>{({
                        "dedicated-professionals": "PEOPLE YOU CAN RELY ON",
                        "industry-expertise": "BUILT AROUND YOUR INDUSTRY",
                        "structured-workflows": "PROCESS-DRIVEN DELIVERY",
                        "flexible-support": "SUPPORT THAT SCALES",
                        "business-fit-coverage": "FLEXIBLE AVAILABILITY",
                        "quality-accountability": "ACCOUNTABLE SUPPORT",
                      } as Record<string, string>)[feat.id] || "DEDICATED SUPPORT"}</span>
                      <Check className="h-4 w-4 text-[#12B4CF]" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SIDE-BY-SIDE COMPARISON: THE PARADIGM SHIFT */}
      {/* ========================================================================= */}
      <section className="relative py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#12B4CF]/10">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#12B4CF]" />
                THE PARADIGM SHIFT
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
                Standard Outsourcing vs. <span className="text-[#12B4CF]">Virtual Nexgen</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink/70">
                See why forward-thinking companies leave chaotic freelance platforms behind.
              </p>
            </div>
          </Reveal>

          {/* Comparison Table / Matrix */}
          <div className="mt-14 overflow-hidden rounded-3xl border-2 border-[#01012F] bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#01012F] bg-[#01012F] text-white p-5 sm:p-6 text-sm font-bold uppercase tracking-wider">
              <div className="hidden md:block md:col-span-4">Evaluation Criteria</div>
              <div className="hidden md:block md:col-span-4 text-red-300">Typical Freelancer / Basic Agency</div>
              <div className="hidden md:block md:col-span-4 text-[#12B4CF]">Virtual Nexgen Dedicated Model</div>
            </div>

            <div className="divide-y divide-[#01012F]/15">
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 sm:gap-4 items-center hover:bg-[#01012F]/5 transition-colors"
                >
                  <div className="md:col-span-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#01012F]/60 md:hidden block mb-1">
                      Criteria
                    </span>
                    <span className="font-bold text-base text-black">{row.feature}</span>
                  </div>

                  <div className="md:col-span-4 flex items-start gap-2.5 text-sm text-black/70">
                    <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>

                  <div className="md:col-span-4 flex items-start gap-2.5 text-sm font-semibold text-[#01012F] rounded-xl bg-[#01012F]/5 p-3 border border-[#01012F]/25">
                    <CheckCircle2 className="h-4 w-4 text-[#12B4CF] flex-shrink-0 mt-0.5" />
                    <span>{row.nexgen}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ENTERPRISE DATA SECURITY & PRIVACY SHOWCASE */}
      {/* ========================================================================= */}
      <section className="relative py-14 md:py-18 bg-[#fffaf3] overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Reveal y={20}>
<span className="inline-flex items-center gap-2 rounded-full bg-[#01012F]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#01012F]/20">
                  <Lock className="h-3.5 w-3.5 text-[#12B4CF]" />
                  BANK-LEVEL SECURITY PROTOCOLS
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-ink">
                  Zero-Tolerance Security & <span className="text-[#12B4CF]">Confidentiality</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-ink/80 leading-relaxed">
                  Your business data, customer records, and trade secrets remain protected under our
                  fortified physical and digital security architecture.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                <Reveal y={20} delay={0.1}>
                  <div className="flex items-start gap-4 rounded-2xl border border-[#01012F]/10 bg-white p-4 backdrop-blur-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12B4CF] text-white font-bold flex-shrink-0">
                      <Users className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-ink">100% In-House Direct Employees</h4>
                      <p className="text-sm text-ink/70 mt-1">
                        Every assistant is bound by legal NDAs, background checked, and held strictly accountable.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal y={20} delay={0.15}>
                  <div className="flex items-start gap-4 rounded-2xl border border-[#01012F]/10 bg-white p-4 backdrop-blur-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#01012F] text-white font-bold flex-shrink-0">
                      <Lock className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-ink">Encrypted VPNs & Isolated VLANs</h4>
                      <p className="text-sm text-ink/70 mt-1">
                        Client sessions occur over encrypted VPN tunnels on secure, segregated network channels.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal y={20} delay={0.2}>
                  <div className="flex items-start gap-4 rounded-2xl border border-[#01012F]/10 bg-white p-4 backdrop-blur-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12B4CF] text-white font-bold flex-shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-ink">Biometric Verification & 24/7 Guards</h4>
                      <p className="text-sm text-ink/70 mt-1">
                        Physical access to workstations requires biometric fingerprint clearance with on-site security.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal y={25} delay={0.25}>
                <div className="relative overflow-hidden rounded-3xl border border-[#01012F]/10 bg-white p-4 shadow-2xl backdrop-blur-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src="/uploads/about-security.png"
                      alt="Virtual Nexgen Security Vault"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#01012F] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="rounded-xl border border-white/20 bg-[#01012F]/90 p-4 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50">
                          <ShieldCheck className="h-4 w-4 text-[#12B4CF]" />
                          Enterprise Compliance Badge
                        </div>
                        <div className="text-sm font-semibold text-white mt-1">
                          Strict regulatory compliance across HIPAA, legal confidentiality, and financial data protocols.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. 4-STEP PARTNERSHIP PROCESS FRAMEWORK */}
      {/* ========================================================================= */}
      <section className="relative py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#12B4CF]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#12B4CF] uppercase border border-[#12B4CF]/10">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#12B4CF]" />
                THE ONBOARDING BLUEPRINT
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
                Up and Running in <span className="text-[#12B4CF]">48 Hours</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink/70">
                A frictionless 4-step framework engineered for zero disruption to your daily operations.
              </p>
            </div>
          </Reveal>

          {/* 4 Process Cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery & Scope Audit",
                desc: "We analyze your existing bottlenecks, tool stack, and repetitive workflows to determine the perfect staffing model.",
              },
              {
                step: "02",
                title: "Talent Vetting & Match",
                desc: "We handpick an industry-certified specialist from our full-time bench who already speaks your domain's language.",
              },
              {
                step: "03",
                title: "SOP & AI Integration",
                desc: "We map your operational SOPs and configure custom AI automations to supercharge the assistant's output from day one.",
              },
              {
                step: "04",
                title: "Continuous SLA Governance",
                desc: "Your dedicated operations manager conducts weekly check-ins, audited KPI reviews, and workflow optimizations.",
              },
            ].map((step, idx) => (
              <Reveal key={step.step} y={25} delay={idx * 0.1}>
                <div className="relative h-full flex flex-col justify-between rounded-2xl border border-[#01012F]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#12B4CF]/40 hover:shadow-md">
                  <div>
                    <span className="text-3xl font-black text-[#12B4CF]">{step.step}</span>
                    <h3 className="mt-4 text-xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-3 text-sm text-ink/75 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#01012F]/10 text-xs font-bold text-ink/50 uppercase tracking-wider">
                    Phase {idx + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. GLOBAL CTA BANNER */}
      {/* ========================================================================= */}
      <CTA />

      {/* ========================================================================= */}
      {/* 10. FAQ SECTION */}
      {/* ========================================================================= */}
      <FAQ9 />
    </div>
  );
}
