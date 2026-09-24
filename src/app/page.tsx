import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ClientLogos from "@/components/ClientLogos";
import CounterStats from "@/components/CounterStats";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Services from "@/components/Services";
import About from "@/components/About";
import BuiltFor from "@/components/BuiltFor";
import WhyChoose from "@/components/WhyChoose";
import HowWeSupport from "@/components/HowWeSupport";
import DedicatedVADifference from "@/components/DedicatedVADifference";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import InternationalClients from "@/components/InternationalClients";
import IndustriesWeServe from "@/components/IndustriesWeServe";

import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothAnchor from "@/components/SmoothAnchor";
import ChatBot from "@/components/ChatBot";
import MotionWrapper from "@/components/MotionWrapper";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #A4BDBC 50%, #000000 100%)" }}>
      <ScrollProgress />
      <SmoothAnchor />
      <CustomCursor />
      <Navbar />
      <MotionWrapper>
        <Hero />
        <Marquee />
        <HowWeSupport />   
        <CounterStats />
        <ClientLogos />
        <WhyChoose />
        {/* <Stats /> */}
        <Features />
        <DedicatedVADifference />
        <About />
        
        <BuiltFor />
        
        
        <Services />
        <IndustriesWeServe />
        <Testimonials />
        <CTA />
        <InternationalClients />
      </MotionWrapper>
      <Footer />
      <ChatBot />
    </main>
  );
}