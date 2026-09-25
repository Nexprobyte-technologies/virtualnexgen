import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Virtual Assistant & AI Automation Services | Virtual Nexgen Solutions",
  description:
    "Virtual Nexgen Solutions provides dedicated virtual assistants and AI automation services — administrative support, insurance, real estate, legal, healthcare, marketing, bookkeeping and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <noscript>
          <style>{`[data-animate]{opacity:1 !important;visibility:visible !important;}`}</style>
        </noscript>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
