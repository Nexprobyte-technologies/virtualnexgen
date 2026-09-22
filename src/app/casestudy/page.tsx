"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/types";

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    fetch("/api/casestudy")
      .then((r) => r.json())
      .then((data) => setStudies(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-10">
        <section className="relative overflow-hidden py-8" style={{ background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(151,199,199,1) 50%, rgba(255,255,255,1) 100%)" }}>
          <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-deep/8 blur-[120px]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <SectionHeading
              eyebrow="Case Study"
              title="How Our Virtual Assistants and AI Automation Services Transformed Businesses."
            />
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/casestudy/${study.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  {study.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {study.tag && (
                      <span className="mb-2 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-dark">
                        {study.tag}
                      </span>
                    )}
                    {study.tags && (
                      <p className="mb-2 text-xs text-ink/50">{study.tags}</p>
                    )}
                    <h3 className="mb-3 text-lg font-bold text-ink group-hover:text-brand transition-colors line-clamp-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-ink/60 line-clamp-3 mb-4">
                      {study.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:text-brand-dark transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {studies.length === 0 && (
              <p className="text-center text-ink/50 py-12">No case studies yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
