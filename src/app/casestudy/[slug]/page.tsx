"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        <main className="pt-10 flex items-center justify-center min-h-screen">
          <p className="text-ink/50">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
        <main className="pt-10">
        {/* Hero Banner */}
        <section className="relative overflow-hidden py-6" style={{ background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(151,199,199,1) 50%, rgba(255,255,255,1) 100%)" }}>
          <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-deep/8 blur-[120px]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-ink/50">
              <Link href="/" className="hover:text-brand transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/casestudy" className="hover:text-brand transition-colors">Case Studies</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-ink/70 line-clamp-1 max-w-xs">{study.title}</span>
            </nav>

            {study.tag && (
              <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark mb-4">
                {study.tag}
              </span>
            )}
            {study.tags && (
              <p className="mb-4 text-sm font-medium text-ink/60">{study.tags}</p>
            )}
            <h1 className="text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl max-w-4xl mx-auto">
              {study.title}
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto w-full max-w-4xl">
              {study.image && (
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Below image: h2 / p / span */}
              <div className="mt-10">
                {/* Tag pills (span) */}
                <div className="flex flex-wrap items-center gap-2">
                  {study.tag && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-dark" />
                      {study.tag}
                    </span>
                  )}
                  {study.industry && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-cream-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {study.industry}
                    </span>
                  )}
                  {study.date && (
                    <span className="inline-flex items-center gap-1.5 px-1 text-sm font-medium text-ink/50">
                      <CalendarDays className="h-4 w-4 text-brand-dark" />
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
                    <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.25em] text-brand-dark">
                      The Challenge
                    </span>
                    <h2 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
                      {study.excerpt}
                    </h2>
                  </div>
                )}

                {/* Paragraph (p) */}
                {study.results && (
                  <p className="mt-6 max-w-3xl border-l-2 border-brand/25 pl-5 text-lg leading-relaxed text-ink/70">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-[0.25em] text-brand-dark">
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
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-ink"
                  >
                    <Phone className="h-4 w-4" />
                    Get in Touch Now!
                  </a>
                </div>

                <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
              </div>

              <div
                className="prose prose-lg max-w-none text-ink/70 prose-headings:text-ink prose-strong:text-ink prose-li:text-ink/70"
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
