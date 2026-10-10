"use client";

import { Star } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Michael Bennett",
    role: "Owner, HVAC Services",
    text: "Having dedicated help with scheduling, customer follow-ups, and daily administrative work has made a real difference. Our team can spend more time on customers instead of chasing paperwork.",
  },
  {
    name: "Lauren Mitchell",
    role: "Managing Broker",
    text: "The biggest benefit has been consistency. Our assistant understands our process, keeps our records organized, and helps make sure important follow-ups don't get missed.",
  },
  {
    name: "David Morgan",
    role: "Financial Advisor",
    text: "We were looking for dependable help with client paperwork and meeting coordination. Having someone who learns our systems has made delegating routine tasks much easier.",
  },
  {
    name: "Stephanie Price",
    role: "Construction Project Manager",
    text: "Our office gets busy very quickly, especially when several jobs are active. The additional support with documentation and coordination helps us keep things moving.",
  },
  {
    name: "Jennifer Walsh",
    role: "Independent Insurance Agent",
    text: "The support with policy servicing, renewal follow-ups, and document requests has helped us manage our workload more consistently. It's been a useful addition to our agency.",
  },
  {
    name: "Olivia Grant",
    role: "Property Manager",
    text: "We needed help keeping tenant requests, maintenance updates, and property records organized. Having dedicated administrative support has made our daily workflow easier to manage.",
  },
  {
    name: "Thomas Rivera",
    role: "Freight Operations Manager",
    text: "Our team handles a lot of moving parts, from load updates to paperwork and invoicing. Having help with those details gives our dispatchers more time to focus on operations.",
  },
  {
    name: "Rebecca Adams",
    role: "Insurance Agency Principal",
    text: "The communication has been straightforward, and our assistant has become familiar with how we work. It makes a difference when you don't have to explain the same process repeatedly.",
  },
  {
    name: "Nicole Parker",
    role: "E-commerce Founder",
    text: "Having help with order-related questions, product updates, and routine store tasks has freed up time for us to focus on improving the customer experience.",
  },
  {
    name: "Peter Lawson",
    role: "Plumbing Contractor",
    text: "We appreciate the support with appointment coordination and customer communication. It helps our office stay organized while our technicians are out in the field.",
  },
  {
    name: "Emily Richardson",
    role: "CPA Firm Partner",
    text: "Document collection and client follow-ups can take up a surprising amount of time. The additional administrative support helps us keep files organized and work through our task list.",
  },
  {
    name: "Megan Phillips",
    role: "Roofing Company Owner",
    text: "The support with lead tracking and inspection scheduling has helped us stay on top of incoming opportunities. Our team can focus more on estimates and managing jobs.",
  },
  {
    name: "Ashley Turner",
    role: "Office Administrator",
    text: "Our assistant helps with scheduling, file organization, and routine coordination. It's a practical way to manage recurring work without putting more pressure on our internal team.",
  },
  {
    name: "Christopher Lee",
    role: "Wealth Advisor",
    text: "Having support with client onboarding, CRM updates, and meeting preparation has helped our advisors spend more time on client relationships.",
  },
  {
    name: "Laura Bennett",
    role: "Restoration Project Manager",
    text: "The administrative side of restoration work can get complicated when multiple jobs are underway. Help with job files and follow-ups makes it easier to keep information organized.",
  },
  {
    name: "Brandon Cole",
    role: "Mortgage Broker",
    text: "We needed help keeping borrower documents and outstanding items organized. The support has made it easier for our loan team to track what's still needed.",
  },
  {
    name: "Mark Henderson",
    role: "General Contractor",
    text: "The team has helped us keep project records, invoices, and routine coordination under control. It gives us more time to focus on the work happening on-site.",
  },
  {
    name: "Melissa Grant",
    role: "Medical Practice Administrator",
    text: "Having help with appointment scheduling and routine administrative tasks has made our front-office workload more manageable. Clear procedures are especially important for our practice.",
  },
  {
    name: "Ryan Mitchell",
    role: "Business Owner",
    text: "We value having a consistent point of contact who understands our workflows. Communication is clear, and recurring tasks are easier to delegate.",
  },
  {
    name: "Ashley Turner",
    role: "Dispatch Manager",
    text: "Our assistant helps track loads, follow up on paperwork, and keep information updated. That support helps our team stay organized during busy days.",
  },
  {
    name: "Jonathan Miller",
    role: "Managing Attorney",
    text: "We wanted reliable help with client intake, scheduling, and file organization. Having support for routine administrative work gives our legal team more time for case-related responsibilities.",
  },
  {
    name: "Samantha Reed",
    role: "Real Estate Broker Associate",
    text: "The additional help with lead follow-ups and transaction coordination has made our workflow more manageable. It's valuable to have someone keeping track of the details.",
  },
  {
    name: "Rachel Foster",
    role: "HVAC Operations Manager",
    text: "Our assistant helps keep customer requests and service appointments organized. It has reduced the amount of back-and-forth our office needs to handle.",
  },
  {
    name: "Matthew Scott",
    role: "Accounting Firm Owner",
    text: "We appreciate the attention given to document organization and outstanding-item follow-ups. It helps our team stay on top of administrative work during busy periods.",
  },
  {
    name: "Kevin Parker",
    role: "Residential Property Manager",
    text: "The support with maintenance coordination and tenant communication has helped us keep better track of open requests across our properties.",
  },
  {
    name: "Scott Reynolds",
    role: "Roofing Contractor",
    text: "Having assistance with estimate follow-ups and customer records has made our office processes more consistent. It's helpful to know those tasks have dedicated attention.",
  },
  {
    name: "Natalie Brooks",
    role: "Wealth Management Operations Manager",
    text: "Our VA helps with routine client communication and keeps important information organized. That allows our team to focus on providing advice and building relationships.",
  },
  {
    name: "Anthony Brooks",
    role: "Plumbing Company Owner",
    text: "We needed support with scheduling, customer inquiries, and job updates. The added help has made it easier to coordinate our work without everything landing on one person.",
  },
  {
    name: "Amanda Ellis",
    role: "Mortgage Operations Manager",
    text: "The administrative support has helped us keep applications, documents, and borrower follow-ups organized. It gives our loan officers more time to work directly with clients.",
  },
  {
    name: "Victoria Hayes",
    role: "Online Retail Business Owner",
    text: "Having help with product listings, customer inquiries, and order administration keeps our store running more smoothly. It's a useful support system as our workload changes.",
  },
  {
    name: "Michelle Carter",
    role: "Insurance Agency Owner",
    text: "Our assistant helps keep client records current and follows established procedures. We value having reliable support for the routine work that keeps the agency running.",
  },
  {
    name: "Jason Cooper",
    role: "Construction Business Owner",
    text: "The support with project documentation, invoice tracking, and coordination has helped reduce the administrative back-and-forth between our office and field teams.",
  },
  {
    name: "James Patel",
    role: "Practice Administrator",
    text: "We needed help with client scheduling and routine office tasks. Having additional support has helped our staff manage the workload while keeping patient needs at the center.",
  },
  {
    name: "Brian Mitchell",
    role: "Fleet Manager",
    text: "The support with proof-of-delivery follow-ups and invoicing has helped us keep our paperwork moving. Those details matter when you're managing loads every day.",
  },
  {
    name: "Gregory Ellis",
    role: "Restoration Company Owner",
    text: "Our assistant helps organize job documentation and keeps follow-ups moving. It's been helpful to have someone focused on the administrative details while our team handles active projects.",
  },
  {
    name: "Danielle Ward",
    role: "Service Coordinator",
    text: "The extra support with scheduling, records, and customer communication has made our day-to-day operations easier to coordinate.",
  },
  {
    name: "Christopher Lee",
    role: "RIA Managing Partner",
    text: "Having help with client documents, meeting preparation, and CRM updates has helped us create a more consistent administrative process.",
  },
  {
    name: "Rebecca Adams",
    role: "CPA & Firm Partner",
    text: "We appreciate the help with transaction entry, document collection, and routine follow-ups. It allows our accounting team to concentrate on work that requires their expertise.",
  },
  {
    name: "Eric Sullivan",
    role: "Logistics Coordinator",
    text: "The onboarding process helped us establish our expectations and workflows. Once everything was in place, handing over recurring tasks became much easier.",
  },
  {
    name: "Andrew Collins",
    role: "Real Estate Team Leader",
    text: "Having support with new inquiries, appointment coordination, and client follow-ups has helped us keep our office organized and responsive.",
  },
  {
    name: "Robert Hayes",
    role: "Insurance Agency Principal",
    text: "We value the consistency and attention to detail. Having help with routine policy updates and client requests makes the workload easier to manage.",
  },
  {
    name: "Claire Donovan",
    role: "Law Firm Partner",
    text: "The support with file organization, scheduling, and routine coordination has helped our office stay on top of administrative responsibilities.",
  },
  {
    name: "Olivia Grant",
    role: "Property Operations Manager",
    text: "We needed someone to help keep customer communication and maintenance requests organized. The support has made it easier to keep track of what needs attention.",
  },
  {
    name: "Dylan Foster",
    role: "E-commerce Business Owner",
    text: "Our assistant helps with order administration and customer questions, giving us more time to focus on product development and growing the business.",
  },
  {
    name: "Client",
    role: "Business Owner",
    text: "Having a dedicated person to support recurring administrative work has made our workflow more predictable. Clear communication and follow-through are what we value most.",
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
      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:border-[#12B4CF]/40 hover:bg-white/15 hover:shadow-[0_8px_40px_rgba(6,182,212,0.08)]">
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="h-3.5 w-3.5 fill-[#12B4CF] text-[#12B4CF]" />
          ))}
        </div>
        <blockquote className="text-sm italic leading-relaxed text-[#02024E]/70">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>
        <div className="mt-5">
          <div>
            <p className="text-sm font-semibold text-[#02024E]">{testimonial.name}</p>
            <p className="text-xs text-[#02024E]/40">{testimonial.role}</p>
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
        className="testimonials-marquee-track flex flex-col"
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
        .testimonials-marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <section
        id="testimonials"
        className="relative overflow-hidden py-8 sm:py-12 lg:py-16 bg-[#fffaf3]"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal y={20}>
              <span className="inline-block rounded-full bg-[#12B4CF]/10 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#12B4CF] ring-1 ring-[#12B4CF]/30">
                Client Testimonials
              </span>
            </Reveal>
            <Reveal y={30} delay={0.12}>
<h2 className="mt-5 sm:mt-7 text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-[#02024E]">
              Hear How Our Solutions{" "}
              <span className="text-[#12B4CF]">
                Made a Difference
              </span>
            </h2>
            </Reveal>
            <Reveal y={20} delay={0.24}>
              <p className="mx-auto mt-3 sm:mt-5 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-[#02024E]/60">
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
