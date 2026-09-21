import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Virtual Nexgen Solutions",
  description:
    "Learn about Virtual Nexgen Solutions — your trusted partner for virtual assistant and AI automation services.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
