"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Service } from "@/lib/types";
import ChatBot from "@/components/ChatBot";

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/casestudy" },
];

const staticLinks = [
  { label: "Home", href: "#home" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isSubPage = pathname.startsWith("/blog") || pathname.startsWith("/services") || pathname.startsWith("/about") || pathname.startsWith("/casestudy") || pathname.startsWith("/contacts");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(() => {
    if (pathname.startsWith("/blog")) return "Blog";
    if (pathname.startsWith("/contacts")) return "Contact Us";
    if (pathname.startsWith("/services")) return "Services";
    if (pathname.startsWith("/about") || pathname.startsWith("/casestudy")) return "About Us";
    return "Home";
  });
  const [services, setServices] = useState<Service[]>([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const aboutDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.2;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(Array.isArray(data.services) ? data.services : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
<header
      className="site-navbar fixed top-0 left-0 right-0 z-50 mt-2 sm:mt-5 animate-[navbar-drop_700ms_cubic-bezier(0.22,1,0.36,1)_both]"
    >
      <div className="mx-auto w-[calc(100%-1rem)] sm:w-[80%] rounded-full border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.12)] px-3 sm:px-6 py-1 sm:py-2 transition-shadow duration-300 hover:shadow-[0_14px_42px_rgba(15,23,42,0.18)]">
          <div className="hidden xl:flex items-center justify-between py-1 px-2">
            <a href={isSubPage ? "/" : "#home"} className="flex shrink-0 pl-2">
              <Image
                src="/uploads/11590.webp"
                alt="Virtual Nexgen Solutions"
                width={200}
                height={52}
                loading="eager"
                className="h-14 w-auto object-contain"
              />
            </a>

            <nav>
              <ul className="flex items-center gap-1">
{isSubPage ? (
                    <li className="relative">
                      {activeNav === "Home" && <motion.span layoutId="navbar-active-indicator" className="pointer-events-none absolute inset-0 rounded-full bg-[#12B4CF]/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                      <Link
                        href="/"
                        onClick={() => setActiveNav("Home")}
                        className="relative z-10 block px-4 py-2 text-sm font-medium text-[#01012F] hover:text-[#12B4CF] transition-colors whitespace-nowrap rounded-full hover:bg-[#01012F]/5"
                      >
                        Home
                      </Link>
                    </li>
                  ) : (
                  staticLinks.map((link) => (
                    <li key={link.href} className="relative">
                      {activeNav === link.label && <motion.span layoutId="navbar-active-indicator" className="pointer-events-none absolute inset-0 rounded-full bg-[#12B4CF]/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                      <a
                        href={link.href}
                        onClick={() => setActiveNav(link.label)}
                        className="relative z-10 block px-4 py-2 text-sm font-medium text-[#01012F] hover:text-[#12B4CF] transition-colors whitespace-nowrap rounded-full hover:bg-[#01012F]/5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))
                )}

                <li ref={aboutDropdownRef} className="relative">
                  {activeNav === "About Us" && <motion.span layoutId="navbar-active-indicator" className="pointer-events-none absolute inset-0 rounded-full bg-[#12B4CF]/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <button
                    onClick={() => {
                      setActiveNav("About Us");
                      setAboutOpen(!aboutOpen);
                      setServicesOpen(false);
                    }}
                    className="relative z-10 flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#01012F] hover:text-[#12B4CF] transition-colors whitespace-nowrap rounded-full hover:bg-[#01012F]/5"
                  >
                    About Us
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`} />
                  </button>

                  {aboutOpen && (
                    <div className="absolute top-full left-0 mt-3 w-56 rounded-2xl border border-line bg-white shadow-2xl py-3 z-50">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setAboutOpen(false)}
                          className="block px-5 py-2.5 text-sm text-ink/80 hover:bg-cream-2 hover:text-brand transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>

                <li ref={dropdownRef} className="relative">
                  {activeNav === "Services" && <motion.span layoutId="navbar-active-indicator" className="pointer-events-none absolute inset-0 rounded-full bg-[#12B4CF]/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <button
                    onClick={() => {
                      setActiveNav("Services");
                      setServicesOpen(!servicesOpen);
                    }}
                    className="relative z-10 flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#01012F] hover:text-[#12B4CF] transition-colors whitespace-nowrap rounded-full hover:bg-[#01012F]/5"
                  >
                    Services
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>

{servicesOpen && (
                    <div className="absolute top-full right-0 mt-3 w-140 rounded-2xl border border-line bg-white shadow-2xl py-3 z-50">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-cream-2 hover:text-brand transition-colors"
                      >
                        All Services
                      </Link>
                      {services.length > 0 && <div className="border-t border-line my-1" />}
                      <div className="grid grid-cols-2 gap-1 px-2">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink/80 hover:bg-cream-2 hover:text-brand transition-colors"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>

                <li className="relative">
                  {activeNav === "Blog" && <motion.span layoutId="navbar-active-indicator" className="pointer-events-none absolute inset-0 rounded-full bg-[#12B4CF]/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <Link
                    href="/blog"
                    onClick={() => setActiveNav("Blog")}
                    className="relative z-10 block px-4 py-2 text-sm font-medium text-[#01012F] hover:text-[#12B4CF] transition-colors whitespace-nowrap rounded-full hover:bg-[#01012F]/5"
                  >
                    Blog
                  </Link>
                  </li>

                <li className="relative">
                  {activeNav === "Contact Us" && <motion.span layoutId="navbar-active-indicator" className="pointer-events-none absolute inset-0 rounded-full bg-[#12B4CF]/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <Link
                    href="/contacts"
                    onClick={() => setActiveNav("Contact Us")}
                    className="relative z-10 block px-4 py-2 text-sm font-medium text-[#01012F] hover:text-[#12B4CF] transition-colors whitespace-nowrap rounded-full hover:bg-[#01012F]/5"
                  >
                    Contact Us
                  </Link>
                  </li>

                <li>
                  <a
                    href="https://calendly.com/virtualnexgen-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#01012F] bg-[#01012F] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#12B4CF] hover:border-[#12B4CF] whitespace-nowrap"
                  >
                    <span>Appointment</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center justify-between gap-3 xl:hidden py-3">
            <a href={isSubPage ? "/" : "#home"} className="flex shrink-0">
              <Image
                src="/uploads/11590.webp"
                alt="Virtual Nexgen Solutions"
                width={180}
                height={48}
                loading="eager"
                className="h-10 w-auto object-contain"
              />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#01012F] hover:text-[#12B4CF] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="xl:hidden mt-2 max-h-[calc(100dvh-6rem-env(safe-area-inset-top))] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.15)] animate-[navbar-drop_350ms_cubic-bezier(0.22,1,0.36,1)_both]">
            <div className="mx-auto max-w-[1280px] px-6 py-4">
              <nav className="flex flex-col gap-1">
{isSubPage ? (
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-3 text-sm font-medium text-[#01012F] transition hover:bg-slate-100 hover:text-[#12B4CF]"
                    >
                      Home
                    </Link>
                  ) : (
                    staticLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-[#01012F] transition hover:bg-slate-100 hover:text-[#12B4CF]"
                      >
                        {link.label}
                      </a>
                    ))
                  )}

                  <div className="border-t border-slate-200 mt-2 pt-2">
                    <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">About Us</p>
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-4 py-2.5 text-sm text-[#01012F] transition hover:bg-slate-100 hover:text-[#12B4CF] block"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 mt-2 pt-2">
                    <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Services</p>
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-4 py-2.5 text-sm text-[#01012F] transition hover:bg-slate-100 hover:text-[#12B4CF] block"
                      >
                        {s.name}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#12B4CF] transition hover:bg-slate-100 block"
                    >
                      View All Services
                    </Link>
                  </div>

                  <div className="mt-3 border-t border-slate-200 pt-3">
                    <a
                      href="tel:+13418886504"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#01012F]"
                    >
                      <Phone className="h-4 w-4" />
                      +1 341 888 6504
                    </a>
                  <a
                    href="https://calendly.com/virtualnexgen-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 w-full rounded-full border border-[#01012F] bg-[#01012F] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 text-center hover:bg-[#12B4CF] hover:border-[#12B4CF] block"
                  >
                    <span>Book Appointment</span>
                  </a>
                </div>

                <div className="mt-3 border-t border-slate-200 pt-3 flex flex-col gap-1">
                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-[#01012F] transition hover:bg-slate-100 hover:text-[#12B4CF]"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contacts"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-[#01012F] transition hover:bg-slate-100 hover:text-[#12B4CF]"
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <div className="h-[40px]" />
      <ChatBot />
    </>
  );
}
