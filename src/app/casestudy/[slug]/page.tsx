"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        <main className="pt-24 flex items-center justify-center min-h-screen">
          <p className="text-ink/50">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <Link
              href="/casestudy"
              className="mb-8 inline-flex items-center gap-2 text-sm text-brand hover:text-brand-deep transition-colors"
            >
              ← Back to Case Studies
            </Link>

            {study.image && (
              <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h1 className="mb-4 text-3xl font-extrabold text-ink sm:text-4xl">
              {study.title}
            </h1>

            <div className="mb-6 flex flex-wrap gap-3">
              {study.industry && (
                <span className="rounded-full bg-cream-2 px-4 py-1.5 text-xs font-semibold text-brand-dark">
                  {study.industry}
                </span>
              )}
              {study.date && (
                <span className="text-sm text-ink/50">{study.date}</span>
              )}
            </div>

            {study.excerpt && (
              <p className="mb-8 text-lg text-ink/70 leading-relaxed">
                {study.excerpt}
              </p>
            )}

            {study.content && (
              <div className="prose prose-lg max-w-none text-ink/70">
                {study.content.split("\n").map((para, i) => (
                  <p key={i} className="mb-4">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {study.results && (
              <div className="mt-12 rounded-2xl bg-cream-1 p-8">
                <h2 className="mb-4 text-xl font-bold text-ink">Results</h2>
                <p className="text-ink/70">{study.results}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
