"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Building2, Scale, Calculator, Home, FileText, Truck, ShoppingCart, Shield, Wrench, HardHat, Landmark, Stethoscope, House } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import TypewriterText from "./TypewriterText";
import AIPlatformIcons from "./AIPlatformIcons";

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
        <p className="min-w-0 text-[11px] leading-snug text-[#02024E]/65 sm:text-xs">{subtitle}</p>
        <span className="shrink-0 text-sm font-bold tabular-nums text-[#12B4CF]" aria-label={`${title} support level ${value}%`}>
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
          className="h-full rounded-full bg-[#12B4CF] transition-[width] duration-75"
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
      className="relative overflow-hidden pt-20 pb-10 sm:pt-16 sm:pb-14 md:py-18 xl:py-28"
      style={{ background: "#fffaf3" }}
    >

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid gap-6 items-center xl:grid-cols-[1.2fr_0.8fr] xl:gap-2 2xl:grid-cols-[1.3fr_0.7fr]">
          {/* Left: Text Content */}
          <div className="max-w-[720px] mx-auto xl:mx-0 text-left order-1">
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-[#12B4CF]/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full shadow-sm mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm font-semibold text-[#02024E]">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#12B4CF] rounded-full animate-pulse flex-shrink-0" />
                <span>Virtual Assistants for Your Business</span>
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#02024E] mb-3 sm:mb-4 lg:mb-6 leading-[1.1]"
            >
              You Lead the Business.
              <br />
              We Handle the Busywork.
            </h1>

            <div ref={typewriterRef}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#02024E] mb-3 sm:mb-4 lg:mb-6 leading-[1.1]">
                Powered By Trained VAs in <br />
                <span className="inline-block min-w-[10ch] sm:min-w-[12ch] text-[#12B4CF] font-semibold relative">
                  <TypewriterText words={typewriterWords} className="text-[#12B4CF]" onWordChange={setIndustryIndex} />
                </span>
              </p>
            </div>

            <p
              ref={descRef}
              className="text-sm sm:text-base md:text-lg lg:text-lg font-normal text-[#02024E]/80 leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xl"
            >
              {currentIndustry.description}
            </p>

            <div ref={askAiRef} className="mt-4 sm:mt-5">
              <AIPlatformIcons />
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
              <a
                href="https://calendly.com/virtualnexgen-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2CCBE6] px-5 sm:px-6 py-2.5 sm:py-3 text-[#02024E] font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#12B4CF] w-full sm:w-auto"
              >
                <span className="whitespace-nowrap">Book a Demo</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300" />
              </a>
              <a
                href="/calculator/savings-calculator"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2CCBE6] px-5 sm:px-6 py-2.5 sm:py-3 text-[#02024E] font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#12B4CF] w-full sm:w-auto"
              >
                <span className="whitespace-nowrap">See Your Savings Estimate</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right: Auto-cycling industry support cards */}
          <div
            ref={industryPanelRef}
            className="mt-4 sm:mt-6 lg:mt-8 order-2"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#12B4CF]">Industry-focused support</span>
              <span className="text-xs font-medium text-[#02024E]/50">{String(industryIndex + 1).padStart(2, "0")} / 15</span>
            </div>
            <div className="mb-3 flex items-center gap-2 text-[#02024E]">
              <currentIndustry.icon className="h-5 w-5 text-[#12B4CF]" />
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
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#12B4CF]" />
                          <h3 className="text-xs font-semibold leading-snug text-[#02024E] sm:text-sm">{task.title}</h3>
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
