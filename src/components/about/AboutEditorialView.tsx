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
      "Virtual Nexgen Solutions was founded with a singular conviction: growing companies shouldn't gamble their operations on unvetted, transient freelancers. We built an in-house delivery infrastructure where professionals are direct, full-time employees trained in rigorous corporate SOPs.",
    stats: "50+ Pioneer Clients",
    statLabel: "Zero Client Attrition in Year 1",
    deliverables: [
      "100% In-House Staff Model",
      "Legally Binding Client NDAs",
      "Executive Administrative Mastery",
    ],
    highlight: "Founded in 2016 with 10 dedicated professionals in Chennai.",
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
    name: "Legal Back-Office",
    icon: Scale,
    tagline: "Precision Case Management & Litigation Support",
    overview:
      "Our legal virtual assistants seamlessly integrate into your firm's existing practice management systems, managing intensive back-office procedures with absolute confidentiality.",
    bullets: [
      "Legal research & case brief drafting",
      "Court document preparation & e-filing support",
      "Client intake & discovery document indexing",
      "Billing entry & retainer tracking (Clio, MyCase, Filevine)",
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
    name: "Real Estate & Property",
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
    name: "Executive & Finance",
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
    name: "AI & Workflow Ops",
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
    <div className="bg-[#132F4A] text-white selection:bg-[#06B6D4] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#0B2A4A]/10">
        {/* Soft background ambient glow */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[#06B6D4]/10 blur-[140px] opacity-80" />
        <div className="pointer-events-none absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-[#06B6D4]/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Top Editorial Eyebrow */}
          <Reveal y={20}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0B2A4A]/15 pb-6">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#06B6D4] uppercase border border-[#06B6D4]/30 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#06B6D4] animate-pulse" />
                VIRTUAL NEXGEN CHRONICLE • ESTABLISHED 2016
              </div>

              <div className="hidden sm:flex items-center gap-6 text-xs font-semibold tracking-wider text-[#0B2A4A]/70 uppercase">
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
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.08]">
                  Built on Trust <span className="text-[#06B6D4]">Driven</span> by Your{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-white">Growth.</span>
                    <span className="absolute bottom-2 left-0 h-3.5 w-full bg-[#06B6D4]/20 -z-0 rounded-sm" />
                  </span>
                </h1>
              </Reveal>

              <Reveal y={25} delay={0.2}>
                <div className="mt-6 max-w-3xl">
                  <p className="text-xl font-semibold text-white sm:text-2xl">
                    Your Business Deserves More Than Just Support.
                  </p>
                  <p className="mt-3 text-lg font-normal leading-relaxed text-[#fff]/80 sm:text-xl">
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
                    className="group inline-flex items-center gap-3 rounded-full bg-[#06B6D4] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_4px_24px_rgba(6,182,212,0.35)] transition-all duration-300 hover:bg-[#132F4A] hover:text-white"
                  >
                    <span>Schedule Consultation</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#132F4A] text-white transition-transform duration-300 group-hover:bg-[#06B6D4] group-hover:text-white group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>

                  <a
                    href="#timeline"
                    className="inline-flex items-center gap-2.5 rounded-full border border-[#132F4A]/30 bg-white/10 px-6 py-3.5 text-sm sm:text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#132F4A] hover:text-white hover:border-[#132F4A]"
                  >
                    <span>Explore Our Journey</span>
                    <ArrowRight className="h-4 w-4 text-[#06B6D4]" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Quick Stats Column */}
            <div className="lg:col-span-4">
              <Reveal y={25} delay={0.35}>
                <div className="rounded-2xl border border-white/20 bg-[#132F4A]/80 p-6 backdrop-blur-md shadow-[0_12px_32px_rgba(19,47,74,0.06)]">
                    <div className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
                      Impact at a Glance
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="border-r border-white/10 pr-3">
                        <div className="text-3xl font-extrabold text-white">2016</div>
                        <div className="text-xs text-white/70 mt-1 font-medium">The Year our journey began</div>
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-white">15+</div>
                        <div className="text-xs text-white/70 mt-1 font-medium">Industries supported</div>
                      </div>
                      <div className="border-r border-white/10 pr-3 pt-3 border-t">
                        <div className="text-3xl font-extrabold text-[#06B6D4]">350+</div>
                        <div className="text-xs text-white/70 mt-1 font-medium">Businesses supported*</div>
                      </div>
                      <div className="pt-3 border-t border-white/10">
                        <div className="text-3xl font-extrabold text-white">24/7</div>
                        <div className="text-xs text-white/70 mt-1 font-medium">Support availability*</div>
                      </div>
                    </div>
                  </div>
<div className="mt-5 rounded-xl bg-[#132F4A] px-3.5 py-2.5 text-xs text-white font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#06B6D4] flex-shrink-0" />
              <span>100% In-House Staff • No Unvetted Freelancers</span>
            </div>
          </Reveal>
            </div>
          </div>

          {/* Hero Feature Visual with Editorial Caption */}
          <Reveal y={30} delay={0.4}>
            <div className="mt-14 relative overflow-hidden rounded-3xl border border-white/20 bg-[#132F4A] p-3 shadow-[0_20px_60px_rgba(19,47,74,0.12)]">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-[#0B2A4A]">
                <Image
                  src={data.heroImage || "/uploads/about-who-we-are.png"}
                  alt="Virtual Nexgen Operations"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A] via-[#0B2A4A]/40 to-transparent" />

                {/* Floating Quote Badge on Image */}
                <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-auto md:max-w-xl">
                  <div className="rounded-2xl border border-white/20 bg-[#0B2A4A]/90 p-5 backdrop-blur-md text-white shadow-xl">
                    <p className="text-sm md:text-base font-medium leading-relaxed italic text-white/95">
                      &ldquo;Great work begins with great people. We bring together skilled professionals,
                      structured processes, and a shared commitment to helping businesses grow.&rdquo;
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-white/50 font-semibold uppercase tracking-wider">
                      <span>VIRTUAL NEXGEN SOLUTIONS TEAM</span>
                      <span className="text-[#06B6D4]">COIMBATORE, INDIA</span>
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
      <section id="timeline" className="relative py-20 md:py-32 overflow-hidden bg-[#132F4A]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="max-w-3xl">
<span className="inline-flex items-center gap-2 rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#06B6D4] uppercase border border-[#06B6D4]/10">
                  <Calendar className="h-3.5 w-3.5 text-[#06B6D4]" />
                  OUR DECADE-LONG JOURNEY
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                From a Dedicated Team to Your <span className="text-[#06B6D4]">Global Business Partner</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
                Explore how we’ve grown since 2016, expanding our expertise and building dedicated Virtual
                Assistant support around the needs of businesses.
              </p>
            </div>
          </Reveal>

          {/* Interactive Timeline Tabs */}
          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-[#0B2A4A]/15 pb-4">
              {TIMELINE_CHAPTERS.map((chapter, idx) => {
                const isActive = activeTimeline === idx;
                return (
                  <button
                    key={chapter.year}
                    onClick={() => setActiveTimeline(idx)}
className={`group relative flex flex-col items-start p-4 rounded-2xl text-left transition-all duration-300 ${
                      isActive
                        ? "bg-[#132F4A] text-white shadow-lg"
                        : "bg-[#132F4A] text-white hover:bg-[#132F4A]/80"
                  }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-2xl font-black ${
                          isActive ? "text-[#06B6D4]" : "text-white"
                        }`}
                      >
                        {chapter.year}
                      </span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isActive ? "bg-white/10" : "bg-[#132F4A]/20"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                        isActive ? "text-white/80" : "text-[#0B2A4A]/60"
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
                  className="rounded-3xl border border-white/20 bg-[#132F4A] p-6 sm:p-10 lg:p-12 shadow-sm"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-7">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#06B6D4]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
                        Chapter {activeTimeline + 1} of 4 • {TIMELINE_CHAPTERS[activeTimeline].year}
                      </div>

                      <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
                        {TIMELINE_CHAPTERS[activeTimeline].title}
                      </h3>

                      <p className="mt-2 text-base font-semibold text-[#06B6D4]">
                        {TIMELINE_CHAPTERS[activeTimeline].subtitle}
                      </p>

                      <p className="mt-4 text-base leading-relaxed text-white/80">
                        {TIMELINE_CHAPTERS[activeTimeline].description}
                      </p>

                      <div className="mt-6 border-t border-white/20 pt-5">
                        <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                          Key Milestone Breakthroughs
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {TIMELINE_CHAPTERS[activeTimeline].deliverables.map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
                              <CheckCircle2 className="h-4 w-4 text-[#06B6D4] flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="rounded-2xl border border-white/20 bg-[#132F4A] p-6 shadow-[0_10px_30px_rgba(19,47,74,0.06)]">
                        <div className="text-xs font-bold uppercase tracking-widest text-white/50">
                          Historical Impact
                        </div>
                        <div className="mt-3 text-4xl sm:text-5xl font-black text-white">
                          {TIMELINE_CHAPTERS[activeTimeline].stats}
                        </div>
                        <div className="text-sm font-semibold text-[#06B6D4] mt-1">
                          {TIMELINE_CHAPTERS[activeTimeline].statLabel}
                        </div>

                        <div className="mt-6 rounded-xl bg-[#132F4A] p-4 text-xs font-medium leading-relaxed text-white/70">
                          <span className="font-bold text-white block mb-1">Archived Note:</span>
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
      <section className="relative py-20 md:py-28 bg-[#0B2A4A] text-white overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#06B6D4]/20 blur-[130px]" />
        <div className="pointer-events-none absolute -top-32 left-0 h-96 w-96 rounded-full bg-[#06B6D4]/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#132F4A]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#06B6D4] uppercase border border-[#132F4A]/20">
                <Sparkles className="h-3.5 w-3.5 text-[#06B6D4]" />
                THE NEXGEN MANIFESTO
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white">
                What We Stand For Every Day
              </h2>
            </div>
          </Reveal>

          {/* Mission & Vision Dual Bento Cards */}
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <Reveal y={25} delay={0.1}>
              <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-[#132F4A] p-8 sm:p-10 backdrop-blur-md transition-all duration-300 hover:border-[#06B6D4]/50">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06B6D4] text-white font-bold">
                      <Target className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]/50">
                      PURPOSE & MISSION
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-white">Our Mission</h3>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/80 font-normal">
                    {missionText}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm text-white/90">
                      <Check className="h-4 w-4 text-[#06B6D4] flex-shrink-0" />
                      <span>Eliminate redundant administrative busywork</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/90">
                      <Check className="h-4 w-4 text-[#06B6D4] flex-shrink-0" />
                      <span>Empower enterprise growth through custom AI pipelines</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/90">
                      <Check className="h-4 w-4 text-[#06B6D4] flex-shrink-0" />
                      <span>Provide high-trust, continuous operational leverage</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Vision Card */}
            <Reveal y={25} delay={0.2}>
              <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-[#132F4A] p-8 sm:p-10 backdrop-blur-md transition-all duration-300 hover:border-[#06B6D4]/50">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#132F4A] text-white font-bold">
                      <Globe2 className="h-6 w-6 text-[#0B2A4A]" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
                      FUTURE HORIZON
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-white">Our Vision</h3>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/80 font-normal">
                    {visionText}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
<div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-sm text-white/90">
                        <Check className="h-4 w-4 text-[#06B6D4] flex-shrink-0" />
                        <span>Global leader in AI-augmented talent delivery</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/90">
                        <Check className="h-4 w-4 text-[#06B6D4] flex-shrink-0" />
                        <span>Setting the benchmark for remote operational security</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/90">
                        <Check className="h-4 w-4 text-[#06B6D4] flex-shrink-0" />
                        <span>Human-centric ethics meeting cutting-edge automation</span>
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
      <section className="relative py-20 md:py-28 bg-[#132F4A]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#06B6D4] uppercase border border-[#06B6D4]/30">
                  <Briefcase className="h-3.5 w-3.5 text-[#06B6D4]" />
                  SPECIALIZED SQUADS
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Trained for Your Specific <span className="text-[#06B6D4]">Industry Vertical</span>
                </h2>
<p className="mt-4 text-base sm:text-lg text-white/70">
                  We don't supply generic data entry clerks. Our assistants are organized into dedicated
                  verticals certified in your industry's exact toolsets and regulations.
                </p>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#06B6D4] hover:text-white transition-colors"
              >
                <span>View All 9+ Practice Areas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Department Navigation Tabs */}
          <div className="mt-12 flex flex-wrap gap-2.5 border-b border-[#0B2A4A]/15 pb-4">
            {DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              const isActive = activeDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#0B2A4A] text-white shadow-md"
                      : "bg-white text-[#0B2A4A] hover:bg-[#132F4A]/80 border border-[#0B2A4A]/10"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#06B6D4]" : "text-white"}`} />
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
                className="rounded-3xl border border-white/20 bg-[#132F4A] p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(19,47,74,0.06)]"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">
                      PRACTICE EXCELLENCE
                    </span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                      {dept.tagline}
                    </h3>
                    <p className="mt-4 text-base text-white/80 leading-relaxed">
                      {dept.overview}
                    </p>

                    <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
{dept.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm font-medium text-white/90">
                          <CheckCircle2 className="h-4 w-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="rounded-2xl border border-[#0B2A4A]/10 bg-[#132F4A]/70 p-6 sm:p-8 text-center">
                      <div className="text-xs font-bold uppercase tracking-widest text-[#0B2A4A]/60">
                        Operational Velocity
                      </div>
<div className="mt-3 text-4xl sm:text-5xl font-black text-white">
                        {dept.metric}
                      </div>
                      <div className="mt-2 text-sm font-bold text-[#06B6D4]">
                          {dept.metricLabel}
                      </div>

                      <div className="mt-6">
                        <Link
                          href="/book-consultation"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#132F4A] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-[#06B6D4] hover:text-white"
                        >
                          <span>Request Staffing Profile</span>
                          <ArrowRight className="h-3.5 w-3.5" />
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
      <section className="relative py-20 md:py-28 bg-[#132F4A] border-y border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="text-center max-w-3xl mx-auto">
<span className="inline-flex items-center gap-2 rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#06B6D4] uppercase border border-[#06B6D4]/10">
                  <BadgeCheck className="h-3.5 w-3.5 text-[#06B6D4]" />
                  THE NEXGEN STANDARD
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Why Industry Leaders Choose <span className="text-[#06B6D4]">Virtual Nexgen</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/70">
                Engineered to eliminate the traditional risks of outsourcing while magnifying speed and savings.
              </p>
            </div>
          </Reveal>

          {/* 6 Feature Grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuresList.map((feat, i) => {
              const Icon = getFeatureIcon(feat.icon);
              return (
                <Reveal key={feat.id || i} y={25} delay={i * 0.08}>
                  <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-white/30 bg-[#132F4A] p-7 transition-all duration-300 hover:border-white/60 hover:bg-transparent hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#06B6D4] text-white transition-colors duration-300 group-hover:bg-white/20 group-hover:text-[#06B6D4]">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="text-xs font-black text-[#0B2A4A]/30">0{i + 1}</span>
                      </div>

                      <h3 className="mt-6 text-xl font-bold text-white">
                        {feat.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/75 font-normal">
                        {feat.text}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#0B2A4A]/10 flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider">
                      <span>Enterprise Guaranteed</span>
                      <Check className="h-4 w-4 text-[#06B6D4]" />
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
      <section className="relative py-20 md:py-28 bg-[#132F4A]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#06B6D4] uppercase border border-[#06B6D4]/10">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#06B6D4]" />
                THE PARADIGM SHIFT
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Standard Outsourcing vs. <span className="text-[#06B6D4]">Virtual Nexgen</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/70">
                See why forward-thinking companies leave chaotic freelance platforms behind.
              </p>
            </div>
          </Reveal>

          {/* Comparison Table / Matrix */}
          <div className="mt-14 overflow-hidden rounded-3xl border-2 border-[#0B2A4A] bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-[#0B2A4A] bg-[#0B2A4A] text-white p-5 sm:p-6 text-sm font-bold uppercase tracking-wider">
              <div className="hidden md:block md:col-span-4">Evaluation Criteria</div>
              <div className="hidden md:block md:col-span-4 text-red-300">Typical Freelancer / Basic Agency</div>
              <div className="hidden md:block md:col-span-4 text-[#06B6D4]">Virtual Nexgen Dedicated Model</div>
            </div>

            <div className="divide-y divide-[#0B2A4A]/15">
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-3 sm:gap-4 items-center hover:bg-[#0B2A4A]/5 transition-colors"
                >
                  <div className="md:col-span-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B2A4A]/60 md:hidden block mb-1">
                      Criteria
                    </span>
                    <span className="font-bold text-base text-black">{row.feature}</span>
                  </div>

                  <div className="md:col-span-4 flex items-start gap-2.5 text-sm text-black/70">
                    <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>

                  <div className="md:col-span-4 flex items-start gap-2.5 text-sm font-semibold text-[#0B2A4A] rounded-xl bg-[#0B2A4A]/5 p-3 border border-[#0B2A4A]/25">
                    <CheckCircle2 className="h-4 w-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
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
      <section className="relative py-20 md:py-28 bg-[#0B2A4A] text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Reveal y={20}>
<span className="inline-flex items-center gap-2 rounded-full bg-[#132F4A]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#06B6D4] uppercase border border-[#132F4A]/20">
                  <Lock className="h-3.5 w-3.5 text-[#06B6D4]" />
                  BANK-LEVEL SECURITY PROTOCOLS
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white">
                  Zero-Tolerance Security & <span className="text-[#06B6D4]">Confidentiality</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
                  Your business data, customer records, and trade secrets remain protected under our
                  fortified physical and digital security architecture.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                <Reveal y={20} delay={0.1}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06B6D4] text-white font-bold flex-shrink-0">
                      <Users className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white">100% In-House Direct Employees</h4>
                      <p className="text-sm text-white/70 mt-1">
                        Every assistant is bound by legal NDAs, background checked, and held strictly accountable.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal y={20} delay={0.15}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#132F4A] text-white font-bold flex-shrink-0">
                      <Lock className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white">Encrypted VPNs & Isolated VLANs</h4>
                      <p className="text-sm text-white/70 mt-1">
                        Client sessions occur over encrypted VPN tunnels on secure, segregated network channels.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal y={20} delay={0.2}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06B6D4] text-white font-bold flex-shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white">Biometric Verification & 24/7 Guards</h4>
                      <p className="text-sm text-white/70 mt-1">
                        Physical access to workstations requires biometric fingerprint clearance with on-site security.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal y={25} delay={0.25}>
                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-4 shadow-2xl backdrop-blur-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src="/uploads/about-security.png"
                      alt="Virtual Nexgen Security Vault"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="rounded-xl border border-white/20 bg-[#0B2A4A]/90 p-4 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50">
                          <ShieldCheck className="h-4 w-4 text-[#06B6D4]" />
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
      <section className="relative py-20 md:py-28 bg-[#132F4A]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal y={20}>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#06B6D4] uppercase border border-[#06B6D4]/10">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#06B6D4]" />
                THE ONBOARDING BLUEPRINT
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Up and Running in <span className="text-[#06B6D4]">48 Hours</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/70">
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
                <div className="relative h-full flex flex-col justify-between rounded-2xl border border-white/20 bg-[#132F4A] p-7 shadow-sm transition-all duration-300 hover:border-[#06B6D4]/40 hover:shadow-md">
                  <div>
                    <span className="text-3xl font-black text-[#06B6D4]">{step.step}</span>
                    <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-3 text-sm text-white/75 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/20 text-xs font-bold text-white/50 uppercase tracking-wider">
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
