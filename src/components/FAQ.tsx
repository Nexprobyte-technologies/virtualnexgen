"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
  {
    question: "How does the FAQ accordion improve user experience?",
    answer: "The accordion lets users quickly find answers without scrolling through long lists, keeping the page clean and responsive."
  },
  {
    question: "Can I customize the FAQ styling to match my brand?",
    answer: "Yes, you can modify Tailwind classes in the FAQ component to adjust colors, typography, and spacing."
  },
  {
    question: "Is the FAQ component accessible?",
    answer: "The component uses semantic button elements and ARIA attributes can be added to ensure keyboard navigation and screen reader support."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-12 sm:py-14 md:py-16 overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10 lg:px-12">
        <Reveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">
              FAQ
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink/70 max-w-2xl mx-auto">
              Get Answers to Common Queries About Our Services and Solutions.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-soft rounded-xl overflow-hidden transition-all duration-300 hover:border-brand/30"
                layout
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex items-center justify-between w-full px-5 sm:px-6 py-4 sm:py-5 text-left bg-white hover:bg-cream-2/30 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-ink pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink/50 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-ink/70 leading-relaxed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
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
    </section>
  );
}
