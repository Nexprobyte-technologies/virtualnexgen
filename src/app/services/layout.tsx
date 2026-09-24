import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ClientLogos from "@/components/ClientLogos";
import FAQ9 from "@/components/FAQ9";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      {children}
      <ClientLogos />
      <FAQ9 />
      <Footer />
    </>
  );
}