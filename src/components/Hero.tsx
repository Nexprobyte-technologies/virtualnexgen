"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Building2, Scale, Calculator, Home, FileText, Truck, ShoppingCart, Shield, Wrench, HardHat, Landmark, Stethoscope, House } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import TypewriterText from "./TypewriterText";

const aiTools = [
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
];

const supportTask = (title: string, subtitle: string, percentage: number) => ({ title, subtitle, percentage });

function AnimatedSupportLevel({ title, subtitle, percentage }: { title: string; subtitle: string; percentage: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(percentage);
      return;
    }

    let frame = 0;
    let startTime = 0;
    const duration = 1200;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(percentage * eased));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [percentage]);

  return (
    <div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="min-w-0 text-[11px] leading-snug text-white/65 sm:text-xs">{subtitle}</p>
        <span className="shrink-0 text-sm font-bold tabular-nums text-[#06B6D4]" aria-label={`${title} support level ${value}%`}>
          {value}%
        </span>
      </div>
      <div
        className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label={`${title} support level`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div
          className="h-full rounded-full bg-[#06B6D4] transition-[width] duration-75"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// const industryCards = [
//   { icon: Shield, title: "Insurance Agencies", tasks: [supportTask("Policy Servicing & Updates", "480 Records Updated", 92), supportTask("Renewals Follow-ups", "310 Follow-ups Completed", 88), supportTask("COIs", "Dedicated VA support", 76)], description: "We handle policy servicing, renewals, quotes, and COIs — so your agents can focus on clients." },
//   { icon: Wrench, title: "HVAC Companies", tasks: [supportTask("Service calls", "Dedicated VA support", 92), supportTask("Scheduling & dispatch", "Dedicated VA support", 84), supportTask("Follow-ups", "Dedicated VA support", 76)], description: "We manage service calls, scheduling, dispatch, and follow-ups — so your team can focus on keeping customers comfortable." },
//   { icon: Home, title: "Real Estate Agencies", tasks: [supportTask("Listings", "Dedicated VA support", 92), supportTask("Lead follow-ups", "Dedicated VA support", 84), supportTask("Transaction coordination", "Dedicated VA support", 76)], description: "We handle listings, lead follow-ups, and transaction coordination — so you can focus on closing deals." },
//   { icon: Landmark, title: "Wealth Management Firms (RIAs)", tasks: [supportTask("Client onboarding", "Dedicated VA support", 92), supportTask("Paperwork & scheduling", "Dedicated VA support", 84), supportTask("CRM updates", "Dedicated VA support", 76)], description: "We manage client onboarding, paperwork, scheduling, and CRM updates — so advisors can focus on building relationships." },
//   { icon: HardHat, title: "Construction Companies", tasks: [supportTask("Project documentation", "Dedicated VA support", 92), supportTask("Invoicing", "Dedicated VA support", 84), supportTask("Coordination", "Dedicated VA support", 76)], description: "We handle project documentation, invoicing, and coordination — so your team can focus on getting the job done." },
//   { icon: Wrench, title: "Plumbing Companies", tasks: [supportTask("Incoming calls", "Dedicated VA support", 92), supportTask("Appointments & dispatch", "Dedicated VA support", 84), supportTask("Customer follow-ups", "Dedicated VA support", 76)], description: "We manage incoming calls, appointments, dispatch, and customer follow-ups — so your technicians can focus on the job." },
//   { icon: Building2, title: "Restoration Companies", tasks: [supportTask("Emergency calls", "Dedicated VA support", 92), supportTask("Job documentation", "Dedicated VA support", 84), supportTask("Claims communication", "Dedicated VA support", 76)], description: "We coordinate emergency calls, job documentation, and claims communication — so your team can focus on restoring properties." },
//   { icon: Truck, title: "Freight and Trucking Companies", tasks: [supportTask("Dispatch support", "Dedicated VA support", 92), supportTask("Load tracking", "Dedicated VA support", 84), supportTask("Invoicing & PODs", "Dedicated VA support", 76)], description: "We handle dispatch support, load tracking, invoicing, and PODs — so your team can keep freight moving." },
//   { icon: House, title: "Property Management Companies", tasks: [supportTask("Tenant inquiries", "Dedicated VA support", 92), supportTask("Maintenance requests", "Dedicated VA support", 84), supportTask("Lease administration", "Dedicated VA support", 76)], description: "We manage tenant inquiries, maintenance requests, and lease administration — so you can focus on your properties." },
//   { icon: HardHat, title: "Roofing Companies", tasks: [supportTask("Lead follow-ups", "Dedicated VA support", 92), supportTask("Inspection scheduling", "Dedicated VA support", 84), supportTask("Estimates", "Dedicated VA support", 76)], description: "We handle lead follow-ups, inspection scheduling, and estimates — so your team can focus on winning more projects." },
//   { icon: Calculator, title: "CPA and Accounting Firms", tasks: [supportTask("Bookkeeping support", "Dedicated VA support", 92), supportTask("Document collection", "Dedicated VA support", 84), supportTask("Client follow-ups", "Dedicated VA support", 76)], description: "We manage bookkeeping support, document collection, and client follow-ups — so you can focus on your clients’ finances." },
//   { icon: Scale, title: "Law Firms", tasks: [supportTask("Client intake", "Dedicated VA support", 92), supportTask("Appointment scheduling", "Dedicated VA support", 84), supportTask("Case file organization", "Dedicated VA support", 76)], description: "We handle client intake, appointment scheduling, and case file organization — so your team can focus on legal work." },
//   { icon: FileText, title: "Mortgage Companies", tasks: [supportTask("Loan documents", "Dedicated VA support", 92), supportTask("Application follow-ups", "Dedicated VA support", 84), supportTask("Client communication", "Dedicated VA support", 76)], description: "We coordinate loan documents, application follow-ups, and client communication — so your team can keep loans moving." },
//   { icon: Stethoscope, title: "Medical Practices", tasks: [supportTask("Appointment scheduling", "Dedicated VA support", 92), supportTask("Patient inquiries", "Dedicated VA support", 84), supportTask("Administrative tasks", "Dedicated VA support", 76)], description: "We manage appointment scheduling, patient inquiries, and administrative tasks — so your staff can focus on patient care." },
//   { icon: ShoppingCart, title: "E-commerce Businesses", tasks: [supportTask("Order management", "Dedicated VA support", 92), supportTask("Customer inquiries", "Dedicated VA support", 84), supportTask("Product updates", "Dedicated VA support", 76)], description: "We handle order management, customer inquiries, and product updates — so you can focus on growing your online store." },
// ];
const industryCards = [
  {
    icon: Shield,
    title: "Insurance Agencies",
    tasks: [
      supportTask("Policy Servicing & Updates", "482 Records Updated", 92),
      supportTask("Renewal Follow-ups", "310 Follow-ups Completed", 88),
      supportTask("COI Requests Processing", "265 COIs Processed", 94),
    ],
    description:
      "We handle policy servicing, renewals, quotes, and COIs — so your agents can focus on clients.",
  },

  {
    icon: Wrench,
    title: "HVAC Companies",
    tasks: [
      supportTask("Service Appointments", "612 Appointments Scheduled", 90),
      supportTask("Dispatch Coordination", "528 Jobs Coordinated", 87),
      supportTask("Customer Call Management", "710 Calls Handled", 93),
    ],
    description:
      "We manage service calls, scheduling, dispatch, and follow-ups — so your team can focus on keeping customers comfortable.",
  },

  {
    icon: Home,
    title: "Real Estate Agencies",
    tasks: [
      supportTask("Lead Follow-ups", "680 Leads Followed Up", 91),
      supportTask("Property Listings", "210 Listings Updated", 88),
      supportTask("Transaction Coordination", "186 Transactions Supported", 90),
    ],
    description:
      "We handle listings, lead follow-ups, and transaction coordination — so you can focus on closing deals.",
  },

  {
    icon: Landmark,
    title: "Wealth Management Firms (RIAs)",
    tasks: [
      supportTask("Client Onboarding", "240 Clients Supported", 92),
      supportTask("CRM Record Updates", "520 Records Updated", 89),
      supportTask("Meeting Coordination", "310 Meetings Scheduled", 94),
    ],
    description:
      "We manage client onboarding, paperwork, scheduling, and CRM updates — so advisors can focus on building relationships.",
  },

  {
    icon: HardHat,
    title: "Construction Companies",
    tasks: [
      supportTask("Project Documentation", "420 Records Managed", 90),
      supportTask("Invoice Processing", "680 Invoices Processed", 88),
      supportTask("Subcontractor Coordination", "340 Follow-ups Completed", 91),
    ],
    description:
      "We handle project documentation, invoicing, and coordination — so your team can focus on getting the job done.",
  },

  {
    icon: Wrench,
    title: "Plumbing Companies",
    tasks: [
      supportTask("Service Appointments", "490 Appointments Scheduled", 92),
      supportTask("Customer Call Management", "610 Calls Handled", 90),
      supportTask("Estimate Follow-ups", "380 Estimates Followed Up", 87),
    ],
    description:
      "We manage incoming calls, appointments, dispatch, and customer follow-ups — so your technicians can focus on the job.",
  },

  {
    icon: Building2,
    title: "Restoration Companies",
    tasks: [
      supportTask("Emergency Call Handling", "320 Calls Coordinated", 93),
      supportTask("Job File Management", "460 Job Files Updated", 89),
      supportTask("Insurance Claim Follow-ups", "390 Claims Followed Up", 91),
    ],
    description:
      "We coordinate emergency calls, job documentation, and claims communication — so your team can focus on restoring properties.",
  },

  {
    icon: Truck,
    title: "Freight and Trucking Companies",
    tasks: [
      supportTask("Load Coordination", "1,250 Loads Managed", 92),
      supportTask("Shipment Tracking", "1,180 Tracking Updates", 90),
      supportTask("Invoicing & POD Management", "920 Invoices Processed", 88),
    ],
    description:
      "We handle dispatch support, load tracking, invoicing, and PODs — so your team can keep freight moving.",
  },

  {
    icon: House,
    title: "Property Management Companies",
    tasks: [
      supportTask("Tenant Communication", "640 Tenant Requests", 91),
      supportTask("Maintenance Coordination", "520 Service Requests", 88),
      supportTask("Lease Administration", "310 Lease Records Updated", 90),
    ],
    description:
      "We manage tenant inquiries, maintenance requests, and lease administration — so you can focus on your properties.",
  },

  {
    icon: HardHat,
    title: "Roofing Companies",
    tasks: [
      supportTask("Lead Follow-ups", "580 Leads Managed", 89),
      supportTask("Inspection Scheduling", "260 Inspections Scheduled", 92),
      supportTask("Estimate Coordination", "420 Estimates Followed Up", 87),
    ],
    description:
      "We handle lead follow-ups, inspection scheduling, and estimates — so your team can focus on winning more projects.",
  },

  {
    icon: Calculator,
    title: "CPA and Accounting Firms",
    tasks: [
      supportTask("Bookkeeping & Entry", "3,200 Transactions Processed", 92),
      supportTask("Document Collection", "680 Client Documents", 89),
      supportTask("Accounts Receivable", "520 Follow-ups Completed", 91),
    ],
    description:
      "We manage bookkeeping support, document collection, and client follow-ups — so you can focus on your clients’ finances.",
  },

  {
    icon: Scale,
    title: "Law Firms",
    tasks: [
      supportTask("Client Intake Management", "320 Client Inquiries", 90),
      supportTask("Appointment Scheduling", "280 Consultations Scheduled", 88),
      supportTask("Case File Organization", "410 Files Organized", 93),
    ],
    description:
      "We handle client intake, appointment scheduling, and case file organization — so your team can focus on legal work.",
  },

  {
    icon: FileText,
    title: "Mortgage Companies",
    tasks: [
      supportTask("Loan File Processing", "460 Loan Files Managed", 90),
      supportTask("Document Verification", "780 Documents Tracked", 87),
      supportTask("Borrower Follow-ups", "620 Follow-ups Completed", 91),
    ],
    description:
      "We coordinate loan documents, application follow-ups, and client communication — so your team can keep loans moving.",
  },

  {
    icon: Stethoscope,
    title: "Medical Practices",
    tasks: [
      supportTask("Appointment Management", "1,020 Appointments Scheduled", 93),
      supportTask("Medical Records", "820 Records Updated", 90),
      supportTask("Insurance & Billing", "640 Claims Processed", 88),
    ],
    description:
      "We manage appointment scheduling, patient inquiries, and administrative tasks — so your staff can focus on patient care.",
  },

  {
    icon: ShoppingCart,
    title: "E-commerce Businesses",
    tasks: [
      supportTask("Order Processing", "1,850 Orders Managed", 92),
      supportTask("Customer Support", "1,620 Inquiries Handled", 89),
      supportTask("Product Listing Updates", "520 Listings Updated", 91),
    ],
    description:
      "We handle order management, customer inquiries, and product updates — so you can focus on growing your online store.",
  },
];


const typewriterWords = industryCards.map(({ title }) => title);

export default function Hero() {
  const [industryIndex, setIndustryIndex] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const askAiRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const industryPanelRef = useRef<HTMLDivElement>(null);
  const currentIndustry = industryCards[industryIndex];

  // Entrance animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
      tl.fromTo(headingRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15);
      tl.fromTo(typewriterRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3);
      tl.fromTo(descRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.45);
      tl.fromTo(ctaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.55);
      tl.fromTo(askAiRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.6);
      tl.fromTo(industryPanelRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.5);
    },
    { scope: rootRef },
  );

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative overflow-hidden py-10 sm:py-14 md:py-18 xl:py-28"
      style={{ background: "#132F4A" }}
    >
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[#06B6D4]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#06B6D4]/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid gap-6 items-center xl:grid-cols-[1.2fr_0.8fr] xl:gap-2 2xl:grid-cols-[1.3fr_0.7fr]">
          {/* Left: Text Content */}
          <div className="max-w-[720px] mx-auto xl:mx-0 text-left order-1">
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-[#06B6D4]/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full shadow-sm mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm font-semibold text-white">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#06B6D4] rounded-full animate-pulse flex-shrink-0" />
                <span>Virtual Assistants for Your Business</span>
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-[1.1]"
            >
              You Lead the Business.
              <br />
              We Handle the Busywork.
            </h1>

            <div ref={typewriterRef}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white mb-3 sm:mb-4 lg:mb-6 leading-[1.1]">
                Powered By Trained VAs in <br />
                <span className="inline-block min-w-[10ch] sm:min-w-[12ch] text-[#06B6D4] font-semibold relative">
                  <TypewriterText words={typewriterWords} className="text-[#06B6D4]" onWordChange={setIndustryIndex} />
                </span>
              </p>
            </div>

            <p
              ref={descRef}
              className="text-sm sm:text-base md:text-lg lg:text-lg font-normal text-white/80 leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xl"
            >
              {currentIndustry.description}
            </p>

            <div ref={askAiRef} className="mt-4 sm:mt-5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {aiTools.map((ai) => (
                  <a
                    key={ai.name}
                    href={ai.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ai.name}
                    title={ai.name}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-line bg-white/10 text-white/60 transition-all duration-300 hover:bg-[#06B6D4] hover:text-white hover:border-[#06B6D4] hover:shadow-[0_4px_16px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d={ai.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
              <a
                href="https://calendly.com/virtualnexgen-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-white/90 px-5 sm:px-6 py-2.5 sm:py-3 shadow-sm transition-all duration-300 hover:border-[#06B6D4] hover:shadow-[0_4px_16px_rgba(6,182,212,0.35)] w-full sm:w-auto justify-center"
              >
                <span className="text-sm sm:text-base font-bold text-white whitespace-nowrap">Book a Demo</span>
                <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/20 text-white flex-shrink-0 transition-all duration-300 group-hover:bg-[#06B6D4] group-hover:shadow-[0_4px_16px_rgba(6,182,212,0.35)]">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              <a
                href="#services"
                className="group inline-flex items-center justify-center sm:justify-start gap-2 text-white/75 hover:text-[#06B6D4] font-semibold text-sm sm:text-base transition-colors py-2"
              >
                <span>See Your Savings Estimate</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* Right: Auto-cycling industry support cards */}
          <div
            ref={industryPanelRef}
            className="mt-4 sm:mt-6 lg:mt-8 order-2"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#06B6D4]">Industry-focused support</span>
              <span className="text-xs font-medium text-white/50">{String(industryIndex + 1).padStart(2, "0")} / 15</span>
            </div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <currentIndustry.icon className="h-5 w-5 text-[#06B6D4]" />
              <h2 className="text-base font-bold sm:text-lg">{currentIndustry.title}</h2>
            </div>
            <div className="grid overflow-hidden rounded-2xl border border-white/20 bg-white/[0.06]">
              {currentIndustry.tasks.map((task, taskIndex) => {
                return (
                  <article
                    key={`${currentIndustry.title}-${task.title}-${industryIndex}`}
                    className="hero-industry-card relative overflow-hidden border-t border-white/15 p-3 first:border-t-0 sm:p-4"
                    style={{ animationDelay: `${taskIndex * 140}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#06B6D4]" />
                          <h3 className="text-xs font-semibold leading-snug text-white sm:text-sm">{task.title}</h3>
                        </div>
                      </div>
                    </div>
                    <AnimatedSupportLevel title={task.title} subtitle={task.subtitle} percentage={task.percentage} />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
