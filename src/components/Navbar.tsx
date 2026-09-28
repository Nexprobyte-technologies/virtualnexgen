"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#132F4A]/90 backdrop-blur-xl border-b border-white/10"
          : isSubPage
          ? "bg-[#132F4A]/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto w-[80%] rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-6 py-2">
          <div className="hidden lg:flex items-center justify-between py-1 px-2">
            <a href={isSubPage ? "/" : "#home"} className="flex shrink-0 pl-2">
              <Image
                src="https://virtualnexgen.com/assets/uploads/logo/11590.png"
                alt="Virtual Nexgen Solutions"
                width={200}
                height={52}
                loading="eager"
                className="h-12 w-auto object-contain"
              />
            </a>

            <nav>
              <ul className="flex items-center gap-1">
{isSubPage ? (
                    <li>
                      <Link
                        href="/"
                        className="relative px-4 py-2 text-sm font-medium text-white hover:text-white transition-colors whitespace-nowrap rounded-full hover:bg-white/5"
                      >
                        Home
                      </Link>
                    </li>
                  ) : (
                  staticLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="relative px-4 py-2 text-sm font-medium text-white hover:text-white transition-colors whitespace-nowrap rounded-full hover:bg-white/5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))
                )}

                <li ref={aboutDropdownRef} className="relative">
                  <button
                    onClick={() => {
                      setAboutOpen(!aboutOpen);
                      setServicesOpen(false);
                    }}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-white transition-colors whitespace-nowrap rounded-full hover:bg-white/5"
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
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-white transition-colors whitespace-nowrap rounded-full hover:bg-white/5"
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

                <li>
                  <Link
                    href="/blog"
                    className="relative px-4 py-2 text-sm font-medium text-white hover:text-white transition-colors whitespace-nowrap rounded-full hover:bg-white/5"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contacts"
                    className="relative px-4 py-2 text-sm font-medium text-white hover:text-white transition-colors whitespace-nowrap rounded-full hover:bg-white/5"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <a
                    href="https://calendly.com/virtualnexgen-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#132F4A] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 shadow-[0_4px_16px_rgba(6,182,212,0.35)] hover:shadow-[0_6px_22px_rgba(6,182,212,0.5)] hover:scale-105 whitespace-nowrap"
                  >
                    Appointment
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center justify-between gap-3 lg:hidden py-3">
            <a href={isSubPage ? "/" : "#home"} className="flex shrink-0">
              <Image
                src="https://virtualnexgen.com/assets/uploads/logo/11590.png"
                alt="Virtual Nexgen Solutions"
                width={180}
                height={48}
                loading="eager"
                className="h-10 w-auto object-contain"
              />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white hover:text-[#06B6D4] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-line bg-[#132F4A]">
            <div className="mx-auto max-w-[1280px] px-6 py-4">
              <nav className="flex flex-col gap-1">
{isSubPage ? (
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white"
                    >
                      Home
                    </Link>
                  ) : (
                    staticLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </a>
                    ))
                  )}

                  <div className="border-t border-white/20 mt-2 pt-2">
                    <p className="px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">About Us</p>
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-4 py-2.5 text-sm text-white transition hover:bg-white/10 hover:text-[#06B6D4] block"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-white/20 mt-2 pt-2">
                    <p className="px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">Services</p>
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-4 py-2.5 text-sm text-white transition hover:bg-white/10 hover:text-[#06B6D4] block"
                      >
                        {s.name}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#06B6D4] transition hover:bg-white/10 block"
                    >
                      View All Services
                    </Link>
                  </div>

                  <div className="mt-3 border-t border-white/20 pt-3">
                    <a
                      href="tel:+13418886504"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white"
                    >
                      <Phone className="h-4 w-4" />
                      +1 341 888 6504
                    </a>
                  <a
                    href="https://calendly.com/virtualnexgen-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 w-full rounded-full bg-[#132F4A] px-5 py-3 text-sm font-semibold text-white text-center shadow-[0_4px_16px_rgba(6,182,212,0.35)] block"
                  >
                    Book Appointment
                  </a>
                </div>

                <div className="mt-3 border-t border-white/20 pt-3 flex flex-col gap-1">
                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contacts"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white"
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
