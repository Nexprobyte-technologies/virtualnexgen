"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
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
      <main className="pt-24">
        <section className="relative overflow-hidden bg-gradient-to-b from-cream-1 to-background py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <SectionHeading
              eyebrow="Our Work"
              title="Case Studies"
              description="See how we've helped businesses transform with virtual assistance and AI automation."
            />
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/casestudy/${study.slug}`}
                  className="group block rounded-2xl border border-line bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  {study.image && (
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="mb-2 text-lg font-bold text-ink group-hover:text-brand transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-ink/60 line-clamp-3">
                    {study.excerpt}
                  </p>
                  {study.industry && (
                    <span className="mt-3 inline-block rounded-full bg-cream-2 px-3 py-1 text-xs font-medium text-brand-dark">
                      {study.industry}
                    </span>
                  )}
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
