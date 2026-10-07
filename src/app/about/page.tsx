import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAbout } from "@/lib/about";
import AboutEditorialView from "@/components/about/AboutEditorialView";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const aboutData = getAbout();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F2FCFE] text-ink">
        <AboutEditorialView initialData={aboutData} />
      </main>
      <Footer />
    </>
  );
}
