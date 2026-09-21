"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import type { AboutSection } from "@/lib/types";

export default function AboutPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setSections(data.sections || []);
          setHeroTitle(data.heroTitle || "");
          setHeroDescription(data.heroDescription || "");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-cream-1 to-background py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <SectionHeading
              eyebrow="About Us"
              title={heroTitle || "About Virtual Nexgen Solutions"}
              description={heroDescription || "We deliver world-class virtual assistant and AI automation solutions that help businesses scale efficiently."}
            />
          </div>
        </section>

        {/* Dynamic Sections */}
        {sections.map((section, i) => (
          <section
            key={section.id || i}
            className={`py-20 ${i % 2 === 0 ? "bg-background" : "bg-cream-1"}`}
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className={`flex flex-col gap-12 lg:flex-row ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""} items-center`}>
                {section.image && (
                  <div className="relative w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className={`w-full ${section.image ? "lg:w-1/2" : ""}`}>
                  <h2 className="mb-4 text-3xl font-bold text-ink">
                    {section.title}
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-ink/70"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
