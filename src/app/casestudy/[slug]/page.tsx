"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import type { CaseStudy } from "@/lib/types";

const SERVICES = [
  { name: "Insurance Virtual Assistants", slug: "Insurance-Virtual-Assistants" },
  { name: "Real Estate Virtual Assistants", slug: "Real-Estate-Virtual-Assistants" },
  { name: "Legal Virtual Assistants", slug: "Legal-Virtual-Assistants" },
  { name: "Healthcare Virtual Assistants", slug: "Healthcare-Virtual-Assistants" },
  { name: "Marketing Virtual Assistants", slug: "Marketing-Virtual-Assistants" },
  { name: "Administrative Support", slug: "Administrative-Support" },
  { name: "Bookkeeping Virtual Assistants", slug: "Bookkeeping-Virtual-Assistants" },
  { name: "AI Automation Services", slug: "AI-Automation-Services" },
  { name: "Manufacturing & Engineering Services with Excellence", slug: "Manufacturing-Engineering-Services-with-Excellence" },
];

const TAGS = [
  { label: "Insurance Solutions", slug: "Insurance-Virtual-Assistants" },
  { label: "Real Estate Solutions", slug: "Real-Estate-Virtual-Assistants" },
  { label: "Legal Solutions", slug: "Legal-Virtual-Assistants" },
  { label: "Healthcare Solutions", slug: "Healthcare-Virtual-Assistants" },
  { label: "Marketing Solutions", slug: "Marketing-Virtual-Assistants" },
  { label: "Admin Solutions", slug: "Administrative-Support" },
  { label: "Bookkeeping Solutions", slug: "Bookkeeping-Virtual-Assistants" },
  { label: "AI Solutions", slug: "AI-Automation-Services" },
  { label: "Manufacturing & Engineering Services with Excellence", slug: "Manufacturing-Engineering-Services-with-Excellence" },
];

const BLOG_IMAGES = [
  { slug: "restoration-virtual-assistant-administrative-support", image: "https://virtualnexgen.com/assets/uploads/blog/50402.png" },
  { slug: "plumbing-virtual-assistant-pre-service-support", image: "https://virtualnexgen.com/assets/uploads/blog/11318.png" },
  { slug: "hvac-virtual-assistant-call-booking-support", image: "https://virtualnexgen.com/assets/uploads/blog/35847.png" },
  { slug: "wealth-management-virtual-assistant-client-support", image: "https://virtualnexgen.com/assets/uploads/blog/22695.png" },
  { slug: "insurance-virtual-assistant-client-request-support", image: "https://virtualnexgen.com/assets/uploads/blog/34381.png" },
  { slug: "ecommerce-virtual-assistant-administrative-support", image: "https://virtualnexgen.com/assets/uploads/blog/30607.png" },
  { slug: "property-management-virtual-assistant-operations-support", image: "https://virtualnexgen.com/assets/uploads/blog/57929.png" },
  { slug: "real-estate-lead-management-support", image: "https://virtualnexgen.com/assets/uploads/blog/73004.png" },
];

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

        {/* Content + Sidebar */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-12 lg:flex-row">
              {/* Main Content - 8/12 */}
              <div className="w-full lg:w-2/3">
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

                <div
                  className="prose prose-lg max-w-none text-ink/70 prose-headings:text-ink prose-strong:text-ink prose-li:text-ink/70"
                  dangerouslySetInnerHTML={{ __html: study.content }}
                />

                {/* CTA Button */}
                <div className="mt-10">
                  <a
                    href="https://calendly.com/virtualnexgen-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
                  >
                    Get in Touch Now! <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Sidebar - 4/12 */}
              <div className="w-full lg:w-1/3">
                <div className="sticky top-28 space-y-8">
                  {/* Our Services */}
                  <div className="rounded-2xl border border-line bg-white p-6">
                    <h3 className="mb-4 text-lg font-bold text-ink">Our Services</h3>
                    <ul className="space-y-3">
                      {SERVICES.map((service) => (
                        <li key={service.slug} className="flex items-center gap-3">
                          <span className="flex-shrink-0 flex h-3 w-3 items-center justify-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                          </span>
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-sm text-ink/70 hover:text-brand transition-colors"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tag Cloud */}
                  <div className="rounded-2xl border border-line bg-white p-6">
                    <h3 className="mb-4 text-lg font-bold text-ink">Tag Cloud</h3>
                    <div className="flex flex-wrap gap-2">
                      {TAGS.map((tag) => (
                        <Link
                          key={tag.slug}
                          href={`/services/${tag.slug}`}
                          className="rounded-full bg-cream-2 px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-brand/10 hover:text-brand-dark transition-colors"
                        >
                          {tag.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Insights & Updates */}
                  <div className="rounded-2xl border border-line bg-white p-6">
                    <h3 className="mb-4 text-lg font-bold text-ink">Insights & Updates</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {BLOG_IMAGES.map((blog) => (
                        <Link
                          key={blog.slug}
                          href={`/blog/${blog.slug}`}
                          className="group relative aspect-square overflow-hidden rounded-lg"
                        >
                          <Image
                            src={blog.image}
                            alt="Blog"
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
