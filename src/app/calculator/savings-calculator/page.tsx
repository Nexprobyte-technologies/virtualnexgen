"use client";

import { useState, useId } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Server,
  GraduationCap,
  Lock,
  BadgeDollarSign,
  Plus,
  Minus,
  Star,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle2,
  Users,
  Building2,
  CalendarCheck,
  Sparkles,
  Clock,
} from "lucide-react";

export default function SavingsCalculatorPage() {
  // Calculator state
  const [yourRate, setYourRate] = useState<number>(28);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [vaRate, setVaRate] = useState<number>(8);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Calculations
  const validYourRate = Math.max(0, Number(yourRate) || 0);
  const validHours = Math.max(0, Number(hoursPerWeek) || 0);
  const validVaRate = Math.max(0, Number(vaRate) || 0);

  const currentWeekly = validYourRate * validHours;
  const vaWeekly = validVaRate * validHours;
  const weeklySavings = Math.max(0, currentWeekly - vaWeekly);
  const monthlySavings = weeklySavings * 4;
  const annualSavings = weeklySavings * 52;
  const percentageSaved = currentWeekly > 0 ? Math.round((weeklySavings / currentWeekly) * 100) : 0;

  const vaRateOptions = [8, 9, 10, 11, 12, 14, 16];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => setEmailSubmitted(false), 5000);
      setEmailInput("");
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById("calculator-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "How accurate is the Insurance Virtual Assistant savings calculator?",
      a: "Our calculator provides an estimated comparison between your current in-house staffing costs and a dedicated Virtual Assistant. While actual savings may vary based on scope and service needs, most agencies see significant reductions of 60% to 80% in operational expenses.",
    },
    {
      q: "What costs are included in the in-house hiring comparison?",
      a: "The comparison factors in salary, payroll taxes, benefits, recruitment costs, onboarding time, office space, workstation hardware, equipment, software licenses, and ongoing HR management. These hidden overhead costs often make in-house staffing 2x to 3x more expensive than the base wage.",
    },
    {
      q: "What is included in Virtual Nexgen Solutions' VA pricing?",
      a: "Our pricing includes a dedicated, insurance-trained virtual assistant, onboarding support, performance management, quality control, supervisor oversight, and secure remote infrastructure. There are no recruitment fees, payroll taxes, health benefits, or hidden overhead expenses.",
    },
    {
      q: "Can a dedicated Virtual Assistant really replace in-house staff?",
      a: "Yes. Our virtual assistants are trained specifically in insurance and business operations including quoting, policy servicing, renewals, endorsements, claims intake, COI processing, and compliance workflows. Many agencies and companies use our VAs as a seamless extension of their in-house team.",
    },
    {
      q: "How much can an agency typically save?",
      a: "Many agencies save up to 60–80% compared to hiring locally, depending on role complexity and staffing structure. On average, our clients save between $35,000 to $48,000+ per full-time assistant annually.",
    },
  ];

  const reviews = [
    {
      name: "Michael Bennett",
      role: "Owner, HVAC Services",
      quote: "Having dedicated help with scheduling, customer follow-ups, and daily administrative work has made a real difference. Our team can spend more time on customers instead of chasing paperwork.",
    },
    {
      name: "Lauren Mitchell",
      role: "Managing Broker",
      quote: "The biggest benefit has been consistency. Our assistant understands our process, keeps our records organized, and helps make sure important follow-ups don't get missed.",
    },
    {
      name: "David Morgan",
      role: "Financial Advisor",
      quote: "We were looking for dependable help with client paperwork and meeting coordination. Having someone who learns our systems has made delegating routine tasks much easier.",
    },
    {
      name: "Stephanie Price",
      role: "Construction Project Manager",
      quote: "Our office gets busy very quickly, especially when several jobs are active. The additional support with documentation and coordination helps us keep things moving.",
    },
    {
      name: "Jennifer Walsh",
      role: "Independent Insurance Agent",
      quote: "The support with policy servicing, renewal follow-ups, and document requests has helped us manage our workload more consistently. It's been a useful addition to our agency.",
    },
    {
      name: "Olivia Grant",
      role: "Property Manager",
      quote: "We needed help keeping tenant requests, maintenance updates, and property records organized. Having dedicated administrative support has made our daily workflow easier to manage.",
    },
    {
      name: "Thomas Rivera",
      role: "Freight Operations Manager",
      quote: "Our team handles a lot of moving parts, from load updates to paperwork and invoicing. Having help with those details gives our dispatchers more time to focus on operations.",
    },
    {
      name: "Rebecca Adams",
      role: "Insurance Agency Principal",
      quote: "The communication has been straightforward, and our assistant has become familiar with how we work. It makes a difference when you don't have to explain the same process repeatedly.",
    },
    {
      name: "Nicole Parker",
      role: "E-commerce Founder",
      quote: "Having help with order-related questions, product updates, and routine store tasks has freed up time for us to focus on improving the customer experience.",
    },
    {
      name: "Peter Lawson",
      role: "Plumbing Contractor",
      quote: "We appreciate the support with appointment coordination and customer communication. It helps our office stay organized while our technicians are out in the field.",
    },
    {
      name: "Emily Richardson",
      role: "CPA Firm Partner",
      quote: "Document collection and client follow-ups can take up a surprising amount of time. The additional administrative support helps us keep files organized and work through our task list.",
    },
    {
      name: "Megan Phillips",
      role: "Roofing Company Owner",
      quote: "The support with lead tracking and inspection scheduling has helped us stay on top of incoming opportunities. Our team can focus more on estimates and managing jobs.",
    },
    {
      name: "Ashley Turner",
      role: "Office Administrator",
      quote: "Our assistant helps with scheduling, file organization, and routine coordination. It's a practical way to manage recurring work without putting more pressure on our internal team.",
    },
    {
      name: "Christopher Lee",
      role: "Wealth Advisor",
      quote: "Having support with client onboarding, CRM updates, and meeting preparation has helped our advisors spend more time on client relationships.",
    },
    {
      name: "Laura Bennett",
      role: "Restoration Project Manager",
      quote: "The administrative side of restoration work can get complicated when multiple jobs are underway. Help with job files and follow-ups makes it easier to keep information organized.",
    },
    {
      name: "Brandon Cole",
      role: "Mortgage Broker",
      quote: "We needed someone to help keep borrower documents and outstanding items organized. The support has made it easier for our loan team to track what's still needed.",
    },
    {
      name: "Mark Henderson",
      role: "General Contractor",
      quote: "The team has helped us keep project records, invoices, and routine coordination under control. It gives us more time to focus on the work happening on-site.",
    },
    {
      name: "Melissa Grant",
      role: "Medical Practice Administrator",
      quote: "Having help with appointment scheduling and routine administrative tasks has made our front-office workload more manageable. Clear procedures are especially important for our practice.",
    },
    {
      name: "Ryan Mitchell",
      role: "Business Owner",
      quote: "We value having a consistent point of contact who understands our workflows. Communication is clear, and recurring tasks are easier to delegate.",
    },
    {
      name: "Ashley Turner",
      role: "Dispatch Manager",
      quote: "Our assistant helps track loads, follow up on paperwork, and keep information updated. That support helps our team stay organized during busy days.",
    },
    {
      name: "Jonathan Miller",
      role: "Managing Attorney",
      quote: "We wanted reliable help with client intake, scheduling, and file organization. Having support for routine administrative work gives our legal team more time for case-related responsibilities.",
    },
    {
      name: "Samantha Reed",
      role: "Real Estate Broker Associate",
      quote: "The additional help with lead follow-ups and transaction coordination has made our workflow more manageable. It's valuable to have someone keeping track of the details.",
    },
    {
      name: "Rachel Foster",
      role: "HVAC Operations Manager",
      quote: "Our assistant helps keep customer requests and service appointments organized. It has reduced the amount of back-and-forth our office needs to handle.",
    },
    {
      name: "Matthew Scott",
      role: "Accounting Firm Owner",
      quote: "We appreciate the attention given to document organization and outstanding-item follow-ups. It helps our team stay on top of administrative work during busy periods.",
    },
    {
      name: "Kevin Parker",
      role: "Residential Property Manager",
      quote: "The support with maintenance coordination and tenant communication has helped us keep better track of open requests across our properties.",
    },
    {
      name: "Scott Reynolds",
      role: "Roofing Contractor",
      quote: "Having assistance with estimate follow-ups and customer records has made our office processes more consistent. It's helpful to know those tasks have dedicated attention.",
    },
    {
      name: "Natalie Brooks",
      role: "Wealth Management Operations Manager",
      quote: "Our VA helps with routine client communication and keeps important information organized. That allows our team to focus on providing advice and building relationships.",
    },
    {
      name: "Anthony Brooks",
      role: "Plumbing Company Owner",
      quote: "We needed support with scheduling, customer inquiries, and job updates. The added help has made it easier to coordinate our work without everything landing on one person.",
    },
    {
      name: "Amanda Ellis",
      role: "Mortgage Operations Manager",
      quote: "The administrative support has helped us keep applications, documents, and borrower follow-ups organized. It gives our loan officers more time to work directly with clients.",
    },
    {
      name: "Victoria Hayes",
      role: "Online Retail Business Owner",
      quote: "Having help with product listings, customer inquiries, and order administration keeps our store running more smoothly. It's a useful support system as our workload changes.",
    },
    {
      name: "Michelle Carter",
      role: "Insurance Agency Owner",
      quote: "Our assistant helps keep client records current and follows established procedures. We value having reliable support for the routine work that keeps the agency running.",
    },
    {
      name: "Jason Cooper",
      role: "Construction Business Owner",
      quote: "The support with project documentation, invoice tracking, and coordination has helped reduce the administrative back-and-forth between our office and field teams.",
    },
    {
      name: "James Patel",
      role: "Practice Administrator",
      quote: "We needed help with client scheduling and routine office tasks. Having additional support has helped our staff manage the workload while keeping patient needs at the center.",
    },
    {
      name: "Brian Mitchell",
      role: "Fleet Manager",
      quote: "The support with proof-of-delivery follow-ups and invoicing has helped us keep our paperwork moving. Those details matter when you're managing loads every day.",
    },
    {
      name: "Gregory Ellis",
      role: "Restoration Company Owner",
      quote: "Our assistant helps organize job documentation and keeps follow-ups moving. It's been helpful to have someone focused on the administrative details while our team handles active projects.",
    },
    {
      name: "Danielle Ward",
      role: "Service Coordinator",
      quote: "The extra support with scheduling, records, and customer communication has made our day-to-day operations easier to coordinate.",
    },
    {
      name: "Christopher Lee",
      role: "RIA Managing Partner",
      quote: "Having help with client documents, meeting preparation, and CRM updates has helped us create a more consistent administrative process.",
    },
    {
      name: "Rebecca Adams",
      role: "CPA & Firm Partner",
      quote: "We appreciate the help with transaction entry, document collection, and routine follow-ups. It allows our accounting team to concentrate on work that requires their expertise.",
    },
    {
      name: "Eric Sullivan",
      role: "Logistics Coordinator",
      quote: "The onboarding process helped us establish our expectations and workflows. Once everything was in place, handing over recurring tasks became much easier.",
    },
    {
      name: "Andrew Collins",
      role: "Real Estate Team Leader",
      quote: "Having support with new inquiries, appointment coordination, and client follow-ups has helped us keep our office organized and responsive.",
    },
    {
      name: "Robert Hayes",
      role: "Insurance Agency Principal",
      quote: "We value the consistency and attention to detail. Having help with routine policy updates and client requests makes the workload easier to manage.",
    },
    {
      name: "Claire Donovan",
      role: "Law Firm Partner",
      quote: "The support with file organization, scheduling, and routine coordination has helped our office stay on top of administrative responsibilities.",
    },
    {
      name: "Olivia Grant",
      role: "Property Operations Manager",
      quote: "We needed someone to help keep customer communication and maintenance requests organized. The support has made it easier to keep track of what needs attention.",
    },
    {
      name: "Dylan Foster",
      role: "E-commerce Business Owner",
      quote: "Our assistant helps with order administration and customer questions, giving us more time to focus on product development and growing the business.",
    },
    {
      name: "Daniel Brooks",
      role: "Business Owner",
      quote: "Having a dedicated person to support recurring administrative work has made our workflow more predictable. Clear communication and follow-through are what we value most.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fffaf3] text-[#02024E] pt-20 sm:pt-24">
        {/* ======================================================== */}
        {/* HERO SECTION */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden pt-2 pb-8 sm:pt-4 sm:pb-12 md:pt-4 md:pb-16">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-start">
              {/* Left Column */}
              <div className="relative z-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white border border-[#12B4CF]/30 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm mb-6 text-xs sm:text-sm font-semibold text-[#02024E]">
                  <span className="w-2 h-2 bg-[#12B4CF] rounded-full animate-pulse flex-shrink-0" />
                  <span>
                    <span className="font-normal text-[#02024E]/80">Insurance Virtual Assistant </span>
                    <span className="font-semibold text-[#02024E]">Savings Calculator</span>
                  </span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#02024E] mb-6 leading-[1.15] tracking-tight">
                  Insurance Staffing <br />
                  <span className="text-[#12B4CF]">Savings Calculator</span>
                </h1>

                {/* Paragraph */}
                <p className="text-base sm:text-lg font-normal text-[#02024E]/80 mb-8 lg:mb-10 max-w-xl leading-relaxed">
                  Compare your current in-house staffing costs with a full-time Insurance Virtual Assistant and uncover the real operational savings for your agency.
                </p>

                {/* Email Form */}
                <div className="max-w-md">
                  <form onSubmit={handleEmailSubmit} className="relative flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter Work Email"
                        required
                        className="w-full px-5 py-3.5 rounded-full border-2 border-[#02024E]/20 outline-none text-sm sm:text-base bg-white transition-all focus:border-[#12B4CF] focus:ring-2 focus:ring-[#12B4CF]/20 text-[#02024E] placeholder:text-[#02024E]/40"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-full bg-[#2CCBE6] hover:bg-[#12B4CF] text-[#02024E] font-bold text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow-[0_4px_16px_rgba(6,182,212,0.35)] whitespace-nowrap"
                    >
                      Start Free Trial
                    </button>
                  </form>
                  {emailSubmitted && (
                    <p className="mt-2 text-xs sm:text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Thank you! Our staffing advisor will reach out shortly.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Card with Floating Stats */}
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[420px] sm:max-w-[320px] aspect-[4/5] rounded-[40px] overflow-hidden border border-[#02024E]/10 shadow-[0_20px_60px_rgba(2,2,78,0.12)] bg-gradient-to-br from-white via-white/80 to-[#12B4CF]/10 backdrop-blur-sm p-6 flex flex-col justify-between">
                  {/* Background graphic */}
                  <div className="absolute inset-0 bg-[radial-gradient(#12B4CF_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  
                  {/* Top card content */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12B4CF]/10 text-[#02024E] font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#12B4CF]" />
                      <span>Dedicated Talent Model</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-[#02024E] leading-snug">
                      High Impact. <br />
                      Frictionless Scaling.
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#02024E]/70 leading-relaxed">
                      Cut administrative friction, expedite customer turnaround, and free your agents to write more policies.
                    </p>
                  </div>

                  {/* Middle illustration / card metrics */}
                  <div className="relative z-10 space-y-2.5 my-4">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#02024E]/10 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#12B4CF]/15 flex items-center justify-center text-[#12B4CF]">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-[#02024E]/60 font-medium">AMS & CRM Mastery</p>
                          <p className="text-sm font-bold text-[#02024E]">AMS360, Applied, HawkSoft</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Certified</span>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#02024E]/10 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#2CCBE6]/20 flex items-center justify-center text-[#02024E]">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-[#02024E]/60 font-medium">Turnaround Time</p>
                          <p className="text-sm font-bold text-[#02024E]">Under 2 Hours for COIs</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#12B4CF] bg-[#12B4CF]/10 px-2 py-1 rounded-full">Fast</span>
                    </div>
                  </div>

                  {/* Bottom reassurance */}
                  <div className="relative z-10 pt-2 border-t border-[#02024E]/10 flex items-center justify-between text-xs text-[#02024E]/60">
                    <span>✓ HIPAA & ISO Compliant</span>
                    <span>✓ No Long-Term Lock-in</span>
                  </div>
                </div>

                {/* Floating Badge 1 - Annual Savings */}
                <div className="absolute max-sm:left-2 max-sm:top-3 sm:-left-[54px] sm:top-14 z-30 sm:mr-[30px] bg-white border border-[#02024E]/15 rounded-2xl p-3 sm:p-5 shadow-2xl min-w-[125px] sm:min-w-[170px] animate-bounce [animation-duration:4s]">
                  <span className="text-lg sm:text-2xl font-black text-[#02024E] block">~$45k +</span>
                  <p className="text-[11px] sm:text-sm font-medium text-[#02024E]/70">Annual Savings</p>
                </div>

                {/* Floating Badge 2 - Lower Cost */}
                <div
                  className="absolute max-sm:right-2 max-sm:bottom-3 max-sm:translate-x-0 max-sm:ml-0 sm:-right-[56px] sm:bottom-16 z-30 sm:translate-x-10 sm:ml-10 bg-[#02024E] text-white rounded-2xl p-3.5 sm:p-5 shadow-2xl text-center min-w-[120px] sm:min-w-[130px]"
                >
                  <span className="text-lg sm:text-2xl font-black text-[#2CCBE6] block">60–80%</span>
                  <p className="text-[11px] sm:text-sm font-normal text-white/80">Lower Cost</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* TRUSTED BY AGENCIES BAR */}
        {/* ======================================================== */}
        <section className="bg-white border-y border-[#02024E]/10 py-8 sm:py-10">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
            <p className="text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-[#02024E]/60 mb-6 sm:mb-8">
              TRUSTED BY INSURANCE AGENCIES & ENTERPRISES ACROSS THE UNITED STATES
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fffaf3] border border-[#02024E]/10">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#02024E]">4.9 / 5 Rating</span>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#fffaf3] border border-[#02024E]/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs sm:text-sm font-bold text-[#02024E]">Verified Client Reviews</span>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#fffaf3] border border-[#02024E]/10">
                <ShieldCheck className="w-4 h-4 text-[#12B4CF]" />
                <span className="text-xs sm:text-sm font-bold text-[#02024E]">100% HIPAA & SOC2 Compliant</span>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#fffaf3] border border-[#02024E]/10">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-xs sm:text-sm font-bold text-[#02024E]">Zero Recruitment Fees</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* INTERACTIVE CALCULATOR SECTION */}
        {/* ======================================================== */}
        <section id="calculator-section" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="bg-white border-2 border-[#02024E]/10 rounded-3xl lg:rounded-[40px] shadow-[0_24px_70px_rgba(2,2,78,0.08)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Form Input Side */}
                <div className="p-6 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#12B4CF] mb-2">
                      Interactive ROI Estimator
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#02024E] mb-3">
                      Calculate Your Savings
                    </h2>
                    <p className="text-sm sm:text-base font-normal text-[#02024E]/70 mb-8 sm:mb-10">
                      Enter your current rates and hours to see potential savings immediately.
                    </p>

                    <div className="space-y-6">
                      {/* Rate and Hours Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                          <label className="text-sm font-bold text-[#02024E] block mb-2">
                            Your Current Hourly Rate ($)
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#02024E]/50 font-semibold">$</span>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={yourRate}
                              onChange={(e) => setYourRate(Number(e.target.value))}
                              placeholder="28"
                              className="w-full pl-8 pr-4 py-3.5 rounded-full border border-[#02024E]/20 text-[#02024E] font-bold text-base focus:outline-none focus:border-[#12B4CF] focus:ring-2 focus:ring-[#12B4CF]/20 bg-[#fffaf3] transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-bold text-[#02024E] block mb-2">
                            Hours Per Week
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="168"
                            step="1"
                            value={hoursPerWeek}
                            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                            placeholder="40"
                            className="w-full px-5 py-3.5 rounded-full border border-[#02024E]/20 text-[#02024E] font-bold text-base focus:outline-none focus:border-[#12B4CF] focus:ring-2 focus:ring-[#12B4CF]/20 bg-[#fffaf3] transition-all"
                          />
                        </div>
                      </div>

                      {/* VA Rate Dropdown */}
                      <div>
                        <label className="text-sm font-bold text-[#02024E] block mb-2">
                          Virtual Nexgen VA Hourly Rate ($)**
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full px-5 py-3.5 rounded-full border border-[#02024E]/20 text-[#02024E] font-bold text-base focus:outline-none focus:border-[#12B4CF] transition-colors bg-[#fffaf3] flex items-center justify-between cursor-pointer"
                          >
                            <span>${vaRate} / hr</span>
                            <ChevronDown className={`w-4 h-4 text-[#02024E]/60 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                          </button>

                          {dropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#02024E]/15 shadow-xl py-2 z-50 overflow-hidden">
                              {vaRateOptions.map((rate) => (
                                <button
                                  key={rate}
                                  type="button"
                                  onClick={() => {
                                    setVaRate(rate);
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full px-5 py-2.5 text-left text-sm font-semibold transition-colors flex items-center justify-between ${
                                    vaRate === rate ? "bg-[#12B4CF]/10 text-[#12B4CF]" : "text-[#02024E] hover:bg-[#fffaf3]"
                                  }`}
                                >
                                  <span>${rate} / hour</span>
                                  {vaRate === rate && <CheckCircle2 className="w-4 h-4 text-[#12B4CF]" />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={scrollToCalculator}
                        className="group inline-flex items-center justify-center sm:justify-between gap-4 rounded-full bg-[#2CCBE6] hover:bg-[#12B4CF] text-[#02024E] font-bold text-sm sm:text-base px-6 py-3.5 transition-all duration-300 shadow-sm hover:shadow-[0_4px_16px_rgba(6,182,212,0.35)] cursor-pointer mt-4 w-full sm:w-auto"
                      >
                        <span>Show My Savings</span>
                        <span className="w-8 h-8 rounded-full bg-[#02024E] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Legal note */}
                  <div className="mt-8 pt-6 border-t border-[#02024E]/10">
                    <p className="text-xs text-[#02024E]/60 leading-relaxed">
                      *The above-mentioned Virtual Nexgen rate is indicative and represents a starting range only. Final pricing may vary and shall be determined upon detailed evaluation of project scope, service requirements, timelines, and mutually agreed commercial terms.
                    </p>
                  </div>
                </div>

                {/* Results Display Side */}
                <div className="bg-[#fffaf3] p-5 sm:p-8 lg:p-12 xl:p-14 border-t lg:border-t-0 lg:border-l border-[#02024E]/10 flex flex-col justify-center gap-6">
                  {/* Dark Savings Card */}
                  <div className="bg-[#02024E] rounded-3xl p-5 sm:p-8 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#12B4CF]/15 rounded-full blur-2xl pointer-events-none" />
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white/90 mb-5 uppercase tracking-wider">
                      Your Potential Savings
                    </h3>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="bg-white rounded-2xl py-4 px-2 sm:px-3 text-center shadow-sm">
                        <p className="text-lg sm:text-2xl font-black text-[#02024E] leading-tight break-words">
                          ${weeklySavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <span className="text-[10px] sm:text-xs font-semibold text-[#02024E]/60 block mt-1">
                          Weekly Savings
                        </span>
                      </div>

                      <div className="bg-white rounded-2xl py-4 px-2 sm:px-3 text-center shadow-sm">
                        <p className="text-lg sm:text-2xl font-black text-[#02024E] leading-tight break-words">
                          ${monthlySavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <span className="text-[10px] sm:text-xs font-semibold text-[#02024E]/60 block mt-1">
                          Monthly Savings
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl py-5 sm:py-6 px-3 sm:px-4 text-center shadow-sm">
                      <p className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-black text-[#02024E] leading-tight mb-1 break-words">
                        ${annualSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <span className="text-xs sm:text-sm font-bold text-[#12B4CF] uppercase tracking-wide">
                        Annual Savings
                      </span>
                    </div>
                  </div>

                  {/* Cost Breakdown Card */}
                  <div className="bg-white rounded-2xl border border-[#02024E]/10 p-6 shadow-sm">
                    <h3 className="text-base sm:text-lg font-bold text-[#02024E] mb-4">
                      Cost Breakdown
                    </h3>
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="text-[#02024E]/70 font-medium">Current Weekly Cost</span>
                        <span className="font-bold text-[#02024E]">
                          ${currentWeekly.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="text-[#02024E]/70 font-medium">VA Weekly Cost</span>
                        <span className="font-bold text-[#12B4CF]">
                          ${vaWeekly.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#02024E]/10 text-base sm:text-lg">
                        <span className="font-bold text-[#02024E]">You Save</span>
                        <span className="font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                          {percentageSaved}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* THE REAL COST OF HIRING VS DELEGATING */}
        {/* ======================================================== */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white border-y border-[#02024E]/10">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12B4CF] block mb-2">
                Comparative Breakdown
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#02024E] mb-4 leading-tight">
                The Real Cost of Hiring vs Delegating
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-base sm:text-lg text-[#02024E]/70 leading-relaxed">
                  Hiring in-house includes salary, benefits, infrastructure, and long-term overhead. Delegating to a dedicated Virtual Assistant delivers the same output at a fraction of the cost.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12">
              {/* Box 1: In-House Hiring */}
              <div className="rounded-3xl border border-[#02024E]/15 bg-[#fffaf3] p-5 sm:p-8 shadow-sm flex flex-col items-center">
                <span className="px-5 sm:px-6 py-2 rounded-full bg-white border border-[#02024E]/20 text-[#02024E] font-bold text-xs sm:text-sm mb-5 sm:mb-6 shadow-sm">
                  In-House Hiring
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center">
                  {[
                    "Fixed Headcount Risk",
                    "Ongoing HR Management",
                    "Training & Ramp-Up Time",
                    "Hiring & Recruitment Costs",
                    "Equipment & Infrastructure",
                    "Office Space Lease",
                    "Benefits & Payroll Taxes",
                    "Heavy Base Salary",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold shadow-xs"
                    >
                      ✕ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 2: Dedicated VAs */}
              <div className="rounded-3xl border-2 border-[#12B4CF] bg-gradient-to-b from-white to-[#12B4CF]/5 p-5 sm:p-8 shadow-lg flex flex-col items-center relative">
                <div className="absolute -top-3 right-6 bg-[#12B4CF] text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
                <span className="px-5 sm:px-6 py-2 rounded-full bg-[#12B4CF] text-white font-bold text-xs sm:text-sm mb-5 sm:mb-6 shadow-sm">
                  Dedicated Virtual Nexgen VAs
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center">
                  {[
                    "Predictable Fixed Monthly Cost",
                    "Scalable On-Demand Support",
                    "Fast 48-Hour Onboarding",
                    "Industry-Trained from Day One",
                    "Zero Recruitment Hassles",
                    "No Office Space or Hardware Required",
                    "No Benefits or Payroll Taxes",
                    "Pre-vetted Top 1% Talent",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom highlight banner */}
            <div className="max-w-4xl mx-auto rounded-3xl bg-[#02024E] text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#12B4CF]/20 text-[#2CCBE6] text-xs font-bold mb-2">
                  Up to 80% compared to in-house hiring
                </span>
                <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                  This is just the beginning of your savings.
                </h3>
                <p className="text-sm text-white/70 mt-1 max-w-lg">
                  Reduce thousands in annual overhead without sacrificing productivity. Same output. Lower cost. Zero compromise.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full md:w-auto">
                <Link
                  href="/services"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors text-center w-full sm:w-auto"
                >
                  Discover All Services
                </Link>
                <a
                  href="https://calendly.com/virtualnexgen-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-[#2CCBE6] hover:bg-[#12B4CF] text-[#02024E] font-bold text-sm transition-colors text-center w-full sm:w-auto"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* WHY AGENCIES SAVE WITH VIRTUAL NEXGEN */}
        {/* ======================================================== */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Key Pillars */}
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-wider text-[#12B4CF] block mb-2">
                  Strategic Value
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#02024E] mb-4 leading-tight">
                  Why Agencies Save With Virtual Nexgen Solutions?
                </h2>
                <p className="text-base sm:text-lg text-[#02024E]/70 mb-10 max-w-xl leading-relaxed">
                  Built to reduce operational costs, increase efficiency, and scale businesses without adding headcount. Getting started is simple and risk-free.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Up to 60% Lower Operational Cost",
                      desc: "Compared to in-house hiring, without payroll taxes, health insurance, or facility overhead expenses.",
                    },
                    {
                      icon: Users,
                      title: "Dedicated, Full-Time Virtual Assistant",
                      desc: "Your assistant works exclusively within your workflows, communication channels, and management systems.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Flexible, Scalable Engagement",
                      desc: "Easily increase or adjust support as your book of business expands during renewal peaks.",
                    },
                    {
                      icon: Building2,
                      title: "No Recruitment or HR Management",
                      desc: "We handle recruitment, skills vetting, onboarding, continuous training, and performance supervision.",
                    },
                    {
                      icon: BadgeDollarSign,
                      title: "Transparent, Predictable Pricing",
                      desc: "One simple fixed monthly investment. No hidden software fees, equipment costs, or surprise invoices.",
                    },
                  ].map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div key={pillar.title} className="flex items-start gap-4 sm:gap-5 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#02024E]/10 flex items-center justify-center text-[#12B4CF] shadow-xs flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#02024E] mb-1">
                            {pillar.title}
                          </h3>
                          <p className="text-sm sm:text-base text-[#02024E]/70 leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Sticky Trust & Compliance Card */}
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <div className="bg-white border border-[#02024E]/15 rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs mb-3">
                      Enterprise Grade
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#02024E] mb-3">
                      Trust & Compliance
                    </h3>
                    <p className="text-sm sm:text-base text-[#02024E]/80 mb-4 leading-relaxed">
                      Security and confidentiality are foundational in business operations.
                    </p>
                    <p className="text-xs sm:text-sm text-[#02024E]/60 mb-6 leading-relaxed">
                      Our structured processes protect client data, policy records, and agency management systems at every stage.
                    </p>

                    <ul className="space-y-3">
                      {[
                        "Ongoing Compliance & HIPAA Training",
                        "Data Privacy–First Framework",
                        "ISO 27001–Aligned Security Practices",
                        "Strict NDA-Protected Assistants",
                        "Encrypted Remote Virtual Infrastructure",
                        "Audit-Ready Logs & Activity Monitoring",
                      ].map((badge) => (
                        <li
                          key={badge}
                          className="bg-[#fffaf3] rounded-2xl border border-[#02024E]/10 px-4 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#02024E]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#12B4CF] flex-shrink-0" />
                          <span>{badge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* BANNER: WE DON'T SELL HOURS */}
        {/* ======================================================== */}
        <section className="bg-gradient-to-r from-[#02024E] to-[#01012f] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#12B4CF_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12 relative z-10 text-center">
            <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl mx-auto">
              We don&apos;t <span className="text-[#2CCBE6]">sell hours.</span>
              <br />
              We build <span className="text-[#2CCBE6]">dedicated support teams.</span>
            </p>
            <p className="mt-6 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Partner with a managed service provider that takes ownership of reliability, quality, and business momentum.
            </p>
          </div>
        </section>

        {/* ======================================================== */}
        {/* WHAT OUR CLIENTS ARE SAYING (TESTIMONIALS) */}
        {/* ======================================================== */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12B4CF] block mb-2">
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#02024E] mb-4">
                Hear How Our Solutions Made a Difference
              </h2>
              <p className="text-base sm:text-lg text-[#02024E]/70 max-w-2xl mx-auto">
                Discover how Virtual Nexgen is helping agencies across the country optimize their operations and scale effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, showAllReviews ? reviews.length : 6).map((r, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-[#02024E]/10 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex text-amber-400 mb-4">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star key={starIndex} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-[#02024E]/80 leading-relaxed italic mb-6">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#02024E]/10 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#02024E] text-sm sm:text-base">{r.name}</p>
                      <p className="text-xs text-[#02024E]/60">{r.role}</p>
                    </div>
                    <span className="text-xs font-bold text-[#12B4CF] bg-[#12B4CF]/10 px-2.5 py-1 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {reviews.length > 6 && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllReviews((show) => !show)}
                  aria-expanded={showAllReviews}
                  className="inline-flex items-center gap-2 rounded-full border border-[#02024E]/20 bg-white px-6 py-3 text-sm font-bold text-[#02024E] shadow-sm transition-colors hover:border-[#12B4CF] hover:text-[#087f92]"
                >
                  {showAllReviews ? "Show less" : "View more"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllReviews ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* FREQUENTLY ASKED QUESTIONS */}
        {/* ======================================================== */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white border-t border-[#02024E]/10">
          <div className="mx-auto w-full max-w-[960px] px-4 sm:px-6 md:px-10">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12B4CF] block mb-2">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#02024E] mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-[#02024E]/70">
                Real clarity on virtual staffing, cost comparisons, and operational transitions.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#fffaf3] rounded-2xl border border-[#02024E]/10 overflow-hidden transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-bold text-base sm:text-lg text-[#02024E] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="w-8 h-8 rounded-full bg-white border border-[#02024E]/10 flex items-center justify-center flex-shrink-0 text-[#02024E]">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#02024E]/75 leading-relaxed border-t border-[#02024E]/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Consultation CTA card */}
            <div className="mt-16 sm:mt-20 bg-gradient-to-r from-[#12B4CF] to-[#2CCBE6] rounded-3xl p-6 sm:p-10 md:p-12 text-[#02024E] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight text-center md:text-left">
                  Start Saving With a Free Consultation
                </h3>
                <p className="text-sm sm:text-base text-[#02024E]/80 mt-2 text-center md:text-left">
                  Schedule a 30-minute discovery session with our operations team today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 w-full md:w-auto">
                <button
                  type="button"
                  onClick={scrollToCalculator}
                  className="px-6 py-3.5 rounded-full bg-white text-[#02024E] font-bold text-sm sm:text-base hover:bg-[#02024E] hover:text-white transition-all duration-300 shadow-sm cursor-pointer w-full sm:w-auto text-center"
                >
                  Calculate Savings
                </button>
                <a
                  href="https://calendly.com/virtualnexgen-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#02024E] text-white font-bold text-sm sm:text-base hover:bg-[#01012f] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  <span>Book Your Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
