"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ProseContent from "@/components/ProseContent";
import type { AboutSection, AboutFeature } from "@/lib/types";
import {
  Building2,
  Award,
  Sparkles,
  Target,
  ShieldCheck,
  UserCheck,
  SlidersHorizontal,
  Clock,
  DollarSign,
  Headphones,
  BadgeCheck,
  Circle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Award,
  Sparkles,
  Target,
  ShieldCheck,
  UserCheck,
  SlidersHorizontal,
  Clock,
  DollarSign,
  Headphones,
  BadgeCheck,
};

function getIcon(name: string) {
  return ICON_MAP[name] || Circle;
}

export default function AboutPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [features, setFeatures] = useState<AboutFeature[]>([]);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroDescription, setHeroDescription] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setSections(data.sections || []);
          setFeatures(data.features || []);
          setHeroTitle(data.heroTitle || "");
          setHeroSubtitle(data.heroSubtitle || "");
          setHeroImage(data.heroImage || "");
          setHeroDescription(data.heroDescription || "");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-10">
        {/* Hero Banner */}
        <section className="relative overflow-hidden py-8" style={{ background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(151,199,199,1) 50%, rgba(255,255,255,1) 100%)" }}>
          <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-deep/8 blur-[120px]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <SectionHeading
              eyebrow="About Us"
              title={heroTitle || "About Virtual Nexgen Solutions"}
              description={heroSubtitle || heroDescription || "Transforming Businesses with AI & Virtual Assistance Since 2016"}
            />
          </div>
        </section>

        {/* Dynamic Sections */}
        {sections.map((section, i) => {
          const SectionIcon = getIcon(section.icon || "");
          return (
            <section
              key={section.id || i}
              className={`py-20 ${i % 2 === 0 ? "bg-background" : "bg-cream-1"}`}
            >
              <div className="mx-auto max-w-7xl px-6">
                <div className={`flex flex-col gap-12 lg:flex-row ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""} items-center`}>
                  {section.image && (
                    <div className={`relative w-full ${i === 0 ? "lg:w-1/3" : "lg:w-2/5"}`}>
                      <div className={`relative overflow-hidden rounded-2xl ${i === 0 ? "aspect-square lg:max-w-sm mx-auto" : "aspect-[4/3]"}`}>
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className={i === 1 ? "object-contain" : "object-cover"}
                        />
                      </div>
                    </div>
                  )}
                  <div className={`w-full ${section.image ? (i === 0 ? "lg:w-2/3" : "lg:w-3/5") : ""}`}>
                    {section.eyebrow && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-cream-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark mb-4">
                        {section.icon && <SectionIcon className="h-3.5 w-3.5" />}
                        {section.eyebrow}
                      </span>
                    )}
                    {i === 1 ? (
                      <h1 className="mb-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                        {section.title}
                      </h1>
                    ) : (
                      <h2 className="mb-4 text-3xl font-bold text-ink">
                        {section.title}
                      </h2>
                    )}
                    <ProseContent
                      html={section.content}
                      className="prose prose-lg max-w-none text-ink/70"
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Why Choose Us - Features with left icons */}
        
      </main>
      <Footer />
    </>
  );
}
