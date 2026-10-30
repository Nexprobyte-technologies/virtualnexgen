import type { Metadata } from "next";
import { getServices } from "@/lib/services";
import { SITE_URL } from "@/lib/blog-seo";
import FAQ9 from "@/components/FAQ9";
import { getServicePath } from "@/lib/service-routes";
import ServicesGrid from "./ServicesGrid";

export const dynamic = "force-dynamic";

const SERVICES_DESCRIPTION =
  "Expert virtual assistant and AI automation solutions tailored to your industry — delivered with precision and care.";

export const metadata: Metadata = {
  title: "Our Services | Virtual Nexgen Solutions",
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    type: "website",
    title: "Our Services | Virtual Nexgen Solutions",
    description: SERVICES_DESCRIPTION,
    url: `${SITE_URL}/services`,
    siteName: "Virtual Nexgen Solutions",
  },
};

export default async function ServicesListPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-[#fffaf3]">
      <div className="relative overflow-hidden py-6 bg-[#fffaf3] mt-10">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[#02024E] sm:text-4xl lg:text-5xl">
            Our{" "}
            <span className="text-[#12B4CF]">Services</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#02024E]/60 sm:text-lg">
            Expert virtual assistant and AI automation solutions tailored to
            your industry — delivered with precision and care.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
        {services.length === 0 ? (
          <div className="grid place-items-center rounded-[2rem] border border-[#01012F]/10 bg-[#fffaf3] p-16">
            <p className="text-lg font-semibold text-[#02024E]/50">
              No services available yet — check back soon!
            </p>
          </div>
        ) : (
          <ServicesGrid
            services={services.map((service) => ({
              slug: service.slug,
              href: getServicePath(service.slug),
              name: service.name,
              eyebrow: service.eyebrow,
              short: service.short,
              image:
                service.image?.trim() ||
                service.carouselImages?.find((image) => image?.trim()) ||
                "",
            }))}
          />
        )}
      </section>
      <FAQ9 />
    </main>
  );
}
