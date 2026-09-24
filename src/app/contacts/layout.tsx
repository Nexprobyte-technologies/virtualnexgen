import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Virtual Nexgen Solutions | Virtual Assistant & AI Automation",
  description:
    "Talk to sales, support, or careers at Virtual Nexgen Solutions. Tell us about your requirements and get a free consultation.",
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
