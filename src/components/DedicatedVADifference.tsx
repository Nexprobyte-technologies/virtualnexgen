"use client";

import {
  Brain,
  CircleCheck,
  Clock,
  GraduationCap,
  MessageSquare,
  Sliders,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import ContainerScroll from "./ContainerScroll";

const features = [
  {
    icon: UserCheck,
    label: "Dedicated, One-on-One Support",
    description:
      "Work with a VA focused on your business, rather than sharing assistance across multiple clients.",
  },
  {
    icon: Clock,
    label: "Consistent Long-Term Partnership",
    description:
      "Build a lasting working relationship with the same assistant who understands your day to day operations.",
  },
  {
    icon: Brain,
    label: "A VA Who Knows Your Business",
    description:
      "Reduce repeated explanations as your assistant becomes familiar with your systems, processes, and priorities.",
  },
  {
    icon: Sliders,
    label: "Support Built Around Your Workflow",
    description:
      "Get assistance tailored to your specific tasks, procedures, and business requirements.",
  },
  {
    icon: MessageSquare,
    label: "Clear, Reliable Communication",
    description:
      "Stay informed through regular updates, direct communication, and clear task coordination.",
  },
  {
    icon: Clock,
    label: "Availability That Fits Your Business",
    description:
      "Arrange dedicated support around your agreed working hours and operational needs.",
  },
  {
    icon: GraduationCap,
    label: "Structured Onboarding & Training",
    description:
      "Help your VA get familiar with your tools, responsibilities, and standard operating procedures.",
  },
  {
    icon: TrendingUp,
    label: "Flexible, Scalable Support",
    description:
      "Expand your virtual assistant support as your workload and business needs increase.",
  },
  {
    icon: TrendingUp,
    label: "Consistent Quality Standards",
    description:
      "Use defined workflows, quality checks, and performance monitoring to support reliable execution.",
  },
  {
    icon: CircleCheck,
    label: "Clear Accountability",
    description:
      "Maintain defined responsibilities, ongoing oversight, and a clear point of contact for your support.",
  },
];

export default function DedicatedVADifference() {
  return (
    <section className="bg-navyblue from-white via-[#132F4A] to-white relative overflow-hidden pt-[200px] pb-0 sm:pb-2 md:pb-4">
      <ContainerScroll
        titleComponent={
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="mb-3 inline-flex items-center justify-center gap-2 sm:gap-3">
              <span className="h-[2px] w-5 rounded-full bg-white sm:w-8" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white sm:text-xs lg:text-sm">
                THE DEDICATED VA DIFFERENCE
              </span>
              <span className="h-[2px] w-5 rounded-full bg-white sm:w-8" />
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-white sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              Why Choose a Dedicated VA?
            </h2>
            <p className="mx-auto max-w-[700px] text-xs font-normal leading-relaxed text-white sm:text-sm md:text-base lg:text-lg">
              See why businesses choose us for reliable, personalized support
              &mdash; without the inconsistency of shared assistants or freelance platforms.
            </p>
          </div>
        }
      >
        <div className="h-full w-full overflow-y-auto rounded-[20px] border border-ink/10 bg-white p-3 shadow-xl sm:p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, label, description }, index) => (
              <article
                key={label}
                className={`flex min-h-24 items-start gap-3 rounded-xl border border-[#132F4A]/10 bg-[#132F4A]/[0.03] p-3 transition-colors hover:border-[#06B6D4]/40 hover:bg-[#06B6D4]/[0.05] sm:p-4 ${index === features.length - 1 ? "lg:col-start-2" : ""}`}
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#06B6D4]/10 text-[#132F4A]">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-snug text-[#132F4A] sm:text-base">
                    {label}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#132F4A]/70 sm:text-sm">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
