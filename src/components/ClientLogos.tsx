"use client";

import Image from "next/image";
import Reveal from "./Reveal";

const logos = [
  { name: "AMS 360", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScE-KEH4zYxTUZ9fdHTrxqw1c9jLVcUUNuRm2os1ZOmjxHuinzGUCpRkLb&s=10" },
  { name: "Applied Systems", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT47PkrE_Fn2nOg4O0Hpmi0I6O5Oh-xkkNb-02XkNgzahB9RSiZ6WdAHA&s=10" },
  { name: "HawkSoft", src: "https://catalyit.com/hubfs/Solution%20Provider%20Logos/HawkSoft%20logo%20color%20with%20AMS%20tagline.png" },
  { name: "EzLynx", src: "https://ml.globenewswire.com/Resource/Download/2e03c5ba-c7ea-4705-8c4d-3d5c30a1d8a1?size=3" },
];

const doubled = [...logos, ...logos, ...logos];

export default function ClientLogos() {
  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-cream-2 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
              Trusted Partners
            </span>
            <h2 className="mt-3 sm:mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
              Our VAs Are Experts in All Major{" "}
              <span className="text-[#145454]">
                Insurance Software
              </span>
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="mt-6 sm:mt-8 lg:mt-12 overflow-hidden">
        <div className="logos-track flex w-max items-center py-3 sm:py-4">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex h-16 sm:h-20 w-36 sm:w-44 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-line mx-3 sm:mx-5"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={140}
                height={50}
                loading="lazy"
                className="h-8 sm:h-10 w-auto object-contain opacity-60"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
