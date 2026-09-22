"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { ContactPage as ContactPageData } from "@/lib/types";

export default function ContactPage() {
  const [data, setData] = useState<ContactPageData | null>(null);

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((d) => setData(d))
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
              eyebrow="Get In Touch"
              title="Contact Us"
              description="We'd love to hear from you. Reach out to us for any inquiries or to get started with our services."
            />
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="mb-6 text-2xl font-bold text-ink">Send Us a Message</h3>
                <form className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-gradient-to-r from-brand-deep to-brand px-8 py-3 text-sm font-semibold text-ink transition-all hover:shadow-[0_4px_16px_rgba(164,189,188,0.35)]"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-ink">Contact Information</h3>
                <div className="space-y-6">
                  {data?.address && (
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream-2 text-brand">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">Address</p>
                        <p className="text-sm text-ink/60">{data.address}</p>
                      </div>
                    </div>
                  )}
                  {data?.phone && (
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream-2 text-brand">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">Phone</p>
                        <p className="text-sm text-ink/60">{data.phone}</p>
                      </div>
                    </div>
                  )}
                  {data?.email && (
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream-2 text-brand">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">Email</p>
                        <p className="text-sm text-ink/60">{data.email}</p>
                      </div>
                    </div>
                  )}
                  {data?.hours && (
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream-2 text-brand">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">Hours</p>
                        <p className="text-sm text-ink/60">{data.hours}</p>
                      </div>
                    </div>
                  )}
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
