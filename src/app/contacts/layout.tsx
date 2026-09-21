import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Virtual Nexgen Solutions",
  description:
    "Get in touch with Virtual Nexgen Solutions for virtual assistant and AI automation services.",
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
