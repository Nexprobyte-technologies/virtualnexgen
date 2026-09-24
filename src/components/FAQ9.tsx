"use client";

import { useState } from "react";
import { ChevronDown, Mail, Phone, CheckCircle } from "lucide-react";
import Reveal from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What services do your virtual assistants provide?",
    answer: "Our virtual assistants offer a wide range of services including administrative support, insurance processing, real estate assistance, legal support, healthcare management, bookkeeping, marketing, and AI automation. Each VA is trained to handle industry-specific tasks efficiently.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and online payment methods. Our billing is transparent with no hidden fees, and you can choose monthly or quarterly payment plans that suit your business needs.",
  },
  {
    question: "What are your pricing plans?",
    answer: "We offer flexible pricing plans starting from part-time support to full-time dedicated virtual assistants. Pricing depends on the hours required, skill level, and complexity of tasks. Contact us for a customized quote tailored to your business requirements.",
  },
  {
    question: "What happens if I am not satisfied with my virtual assistant?",
    answer: "Your satisfaction is our priority. If you're not happy with your virtual assistant, we offer a replacement at no extra cost. We also maintain open communication channels to address any concerns and ensure the working relationship meets your expectations.",
  },
  {
    question: "How do I track the work being done by my virtual assistant?",
    answer: "We provide regular progress reports, daily/weekly summaries, and access to project management tools so you can track tasks, deadlines, and deliverables in real-time. Your VA maintains detailed logs of all activities for full transparency.",
  },
  {
    question: "How do I communicate with my virtual assistant?",
    answer: "You can communicate with your VA through email, phone, video calls, instant messaging, or any collaboration tool you prefer such as Slack, Microsoft Teams, or Zoom. We adapt to your preferred communication style and schedule.",
  },
  {
    question: "Are your virtual assistants trained for specific industries?",
    answer: "Yes, our VAs are trained and experienced in specific industries including insurance, real estate, legal, healthcare, and more. They understand industry-specific workflows, terminology, and software tools to deliver high-quality support from day one.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely. We follow strict data security protocols including NDAs, secure file sharing, encrypted communications, and GDPR compliance. Your business data and personal information are always protected with us.",
  },
  {
    question: "Do I need to provide any tools or software for the virtual assistant?",
    answer: "You can provide access to your existing tools and software, or we can work with popular platforms. Many of our VAs are already proficient in common tools like AMS 360, Applied Systems, QuickBooks, Salesforce, and more.",
  },
  {
    question: "What is the process to get started?",
    answer: "Getting started is simple: 1) Schedule a free consultation call with us, 2) Discuss your business needs and requirements, 3) We match you with the right virtual assistant, 4) Onboarding and trial period begins, 5) Your VA starts delivering results. The entire process takes just 2-3 business days.",
  },
];

const stats = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "24h", label: "Avg Response Time" },
  { value: "500+", label: "Active VAs" },
  { value: "50+", label: "Industries Served" },
];

export default function FAQ9() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex-1 min-w-0">
            <Reveal>
              <div className="mb-8 sm:mb-10">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                  FAQ
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-base sm:text-lg text-ink/70 max-w-xl">
                  Get answers to common queries about our virtual assistant services and solutions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
<div className="flex flex-col gap-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="group border border-soft rounded-xl overflow-hidden transition-all duration-300 hover:border-brand/30 bg-white"
                    whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="flex items-start justify-between w-full px-5 sm:px-6 py-4 sm:py-5 text-left bg-white hover:bg-cream-2/30 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-semibold text-ink pr-4 leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-ink/50 flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-ink/70 leading-relaxed border-t border-soft"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden w-[380px] shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="bg-ink rounded-2xl p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-6">
                  Still have questions?
                </h3>
                <p className="text-ink/60 mb-6">
                  Can't find the answer you're looking for? Our team is here to help.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@nexprobyte.com"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Mail className="w-5 h-5 text-brand" />
                    <span className="font-medium">hello@nexprobyte.com</span>
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Phone className="w-5 h-5 text-brand" />
                    <span className="font-medium">+1 (234) 567-890</span>
                  </a>
                </div>
              </div>

              <div className="bg-cream-2 rounded-2xl p-6 sm:p-8 border border-soft">
                <h3 className="text-xl sm:text-2xl font-bold text-ink mb-6">
                  Trusted by Businesses Worldwide
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-3xl sm:text-4xl font-bold text-brand mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-ink/60">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="lg:hidden mt-10">
          <div className="bg-ink rounded-2xl p-6 sm:p-8 text-white space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold">
              Still have questions?
            </h3>
            <p className="text-ink/60">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:hello@nexprobyte.com"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Mail className="w-5 h-5 text-brand" />
                <span className="font-medium">hello@nexprobyte.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Phone className="w-5 h-5 text-brand" />
                <span className="font-medium">+1 (234) 567-890</span>
              </a>
            </div>
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Trusted by Businesses Worldwide
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl sm:text-4xl font-bold text-brand mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-ink/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}