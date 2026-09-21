import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Virtual Nexgen Solutions",
  description:
    "Explore our case studies showcasing successful virtual assistant and AI automation implementations.",
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
