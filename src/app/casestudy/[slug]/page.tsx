"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollExpand from "@/components/ScrollExpand";
import { CalendarDays, ChevronRight, Phone } from "lucide-react";
import type { CaseStudy } from "@/lib/types";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [study, setStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/casestudy/${slug}`)
      .then((r) => r.json())
      .then((data) => setStudy(data))
      .catch(() => {});
  }, [slug]);

  if (!study) {
    return (
      <>
        <Navbar />
        <main className="pt-10 flex items-center justify-center min-h-screen bg-[#132F4A]">
          <p className="text-white/50">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
        <main className="pt-10 bg-[#132F4A]">
        {/* Hero Banner */}


        {/* Scroll-Expand Cover */}
        {study.image && (
          <ScrollExpand
            useWindowScroll
            src={study.image}
            alt={study.title}
            startWidth={56}
            startHeight={72}
            startRadius={28}
            endRadius={0}
            mediaZoom={1.3}
            scrollDistance={1.1}
            holdDistance={0.4}
            smoothing={0.12}
            overlayScrim={0.4}
          />
        )}

        {/* Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto w-full max-w-4xl">
              <div className="mt-10">
                {/* Tag pills (span) */}
                <div className="flex flex-wrap items-center gap-2">
                  {study.tag && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      {study.tag}
                    </span>
                  )}
                  {study.industry && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {study.industry}
                    </span>
                  )}
                  {study.date && (
                    <span className="inline-flex items-center gap-1.5 px-1 text-sm font-medium text-white/70">
                      <CalendarDays className="h-4 w-4 text-white" />
                      {new Date(study.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>

                {/* Heading (h2) with accent bar */}
                {study.excerpt && (
                  <div className="relative mt-7 pl-5">
                    <span className="absolute bottom-1 left-0 top-1 w-1 rounded-full bg-gradient-to-b from-brand to-brand-deep" />
                    <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.25em] text-white">
                      The Challenge
                    </span>
                    <h2 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                      {study.excerpt}
                    </h2>
                  </div>
                )}

                {/* Paragraph (p) */}
                {study.results && (
                  <p className="mt-6 max-w-3xl border-l-2 border-white/25 pl-5 text-lg leading-relaxed text-white/85">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-[0.25em] text-white">
                      The Result
                    </span>
                    {study.results}
                  </p>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/casestudy"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
                  >
                    Explore all case studies
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://calendly.com/virtualnexgen-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/80"
                  >
                    <Phone className="h-4 w-4" />
                    Get in Touch Now!
                  </a>
                </div>

                <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
              </div>

              <div
                className="max-w-none text-[17px] leading-relaxed text-white [&_a]:text-white [&_a]:underline [&_a]:decoration-white/40 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-white/70 [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-white/25 [&_blockquote]:pl-5 [&_blockquote]:text-white/75 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-white [&_em]:text-white/90 [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:leading-tight [&_h1]:text-white [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-white [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:font-bold [&_h4]:text-white [&_hr]:my-8 [&_hr]:border-white/15 [&_li]:my-1.5 [&_li]:pl-1 [&_li]:text-white [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_p]:text-white/85 [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-white/5 [&_pre]:p-4 [&_pre]:text-white [&_strong]:font-bold [&_strong]:text-white [&_table]:my-5 [&_table]:w-full [&_table]:text-white/85 [&_td]:border-t [&_td]:border-white/10 [&_td]:px-3 [&_td]:py-2 [&_th]:border-t [&_th]:border-white/10 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold [&_th]:text-white [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: study.content }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
