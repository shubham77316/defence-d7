"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface CapabilityCardData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
}

const CAPABILITY_CARDS: CapabilityCardData[] = [
  {
    id: "01",
    badge: "01 // STRATEGIC SECTORS",
    title: "Aerospace & Multi-Domain Defence",
    subtitle:
      "Sovereign tactical airframes, kinetic survivability, and autonomous reconnaissance engineered for national security.",
    image: "/images/foundation-sectors.jpg",
  },
  {
    id: "02",
    badge: "02 // OPERATIONAL MODEL",
    title: "Direct Sovereign B2G Engagement",
    subtitle:
      "Chosen deliberately to partner with armed forces, tier-1 industrial conglomerates, and sovereign defence laboratories.",
    image: "/images/foundation-model.jpg",
  },
  {
    id: "03",
    badge: "03 // LONG-TERM DIRECTION",
    title: "Built for What Decades to Matter",
    subtitle:
      "Durable sovereign industrial capability, the kind that takes years to build and decades to execute.",
    image: "/images/foundation-direction.jpg",
  },
];

export default function HomeAboutSplitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { settings } = useSettings();

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 sm:pt-12 pb-10 sm:pb-14 bg-[#02050e] border-t border-white/[0.08] select-none"
    >
      {/* Clean Solid Dark Background */}
      <div className="absolute inset-0 bg-[#02050e] pointer-events-none z-0" />

      {/* Main Inner Content */}
      <div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-10">
        <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12">
          
          {/* ========================================================================= */}
          {/* TOP SECTION: ABOUT US HERO (PERFECTLY CENTER ALIGNED)                     */}
          {/* ========================================================================= */}
          <div className="relative w-full flex items-center justify-center text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto"
            >
              {/* Top Tag: OUR CAPABILITIES */}
              <div className="flex items-center justify-center space-x-3 select-none">
                <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
                <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
                <span className="text-xs sm:text-[13px] font-sans font-semibold tracking-[0.22em] text-white uppercase">
                  OUR CAPABILITIES
                </span>
                <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
                <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
              </div>

              {/* Massive ABOUT US Typography */}
              <div className="text-center select-none pt-1">
                <h2 className="font-oxanium text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-black tracking-tight uppercase leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                  <span className="bg-gradient-to-b from-[#5aa9f7] via-[#257dc0] to-[#0f4477] bg-clip-text text-transparent">
                    ABOUT{" "}
                  </span>
                  <span className="bg-gradient-to-b from-white via-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
                    US
                  </span>
                </h2>
              </div>

              {/* Subheading with Symmetric Glow Line */}
              <div className="flex flex-col items-center text-center space-y-2 w-full">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-oxanium font-bold uppercase tracking-[0.05em] text-white leading-tight text-center">
                  BUILT FOR WHAT THE DEFENCE WORLD NEEDS
                </h3>
                <div className="w-36 sm:w-56 md:w-72 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]" />
                <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal select-none text-center max-w-3xl mx-auto pt-2">
                  {settings.foundingVision || "Sky Wardens was established to develop durable industrial capability, engineering systems and strategic technologies designed for long-term impact."}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* PINNED STACKING CARDS ON SCROLL (MATCHING REFERENCE SCREENSHOTS)          */}
          {/* ========================================================================= */}
          <div className="relative w-full max-w-[560px] mx-auto pt-4 pb-8">
            {CAPABILITY_CARDS.map((card, idx) => {
              // Staggered sticky top offsets so previous cards peek out from behind
              const stickyTop = `calc(90px + ${idx * 26}px)`;
              const isLast = idx === CAPABILITY_CARDS.length - 1;

              return (
                <div
                  key={card.id}
                  className={`sticky flex justify-center w-full ${
                    isLast ? "mb-6" : "mb-28 sm:mb-36 md:mb-44"
                  }`}
                  style={{ top: stickyTop }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative w-full h-[470px] sm:h-[520px] md:h-[550px] rounded-[32px] sm:rounded-[38px] border-2 border-white/[0.14] hover:border-[#7ec8ff]/80 bg-[#030611] backdrop-blur-2xl p-3.5 sm:p-4.5 md:p-5 flex flex-col justify-between shadow-[0_24px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(0,0,0,0.85)] hover:shadow-[0_24px_70px_rgba(2,132,199,0.32)] transition-all duration-300 select-none cursor-pointer overflow-hidden"
                  >
                    {/* Diagonal Shimmer beam sweep on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none rounded-[32px] sm:rounded-[38px] z-30" />

                    {/* Top Part: High-Resolution Visual with Rounded Corners (matching Reference Image 1) */}
                    <div className="relative w-full h-[270px] sm:h-[310px] md:h-[330px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/10 group-hover:border-[#7ec8ff]/40 transition-colors duration-300">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 540px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95 contrast-105"
                      />
                      {/* Top Corner Pill Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="font-oxanium text-[10px] sm:text-[11px] font-bold tracking-widest text-[#7ec8ff] uppercase px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-sky-400/30 shadow-md">
                          {card.badge}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Part: Clean Centered Typography Statement (matching Reference Image 1) */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-3 sm:px-6 pt-3 pb-2">
                      <h4 className="font-oxanium text-xl sm:text-2xl md:text-[25px] font-bold text-white tracking-tight leading-tight group-hover:text-[#e0f2fe] transition-colors duration-300">
                        {card.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mt-2.5 max-w-md">
                        {card.subtitle}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM SECTION: NARRATIVE & LEARN MORE ACTION                             */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center text-center space-y-5 -mt-2 sm:-mt-4 max-w-3xl mx-auto"
          >
            {/* Narrative 2-Line Text */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal select-none text-center">
              Sky Wardens was established to develop durable industrial capability, the kind that takes years to build and decades to matter.
            </p>

            {/* Learn More Button */}
            <div className="pt-2 flex justify-center">
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center px-8 sm:px-9 py-3 sm:py-3.5 bg-black/40 hover:bg-[#7ec8ff]/10 text-slate-200 hover:text-white border border-white/20 hover:border-[#7ec8ff]/90 text-xs font-bold tracking-widest uppercase transition-all duration-300 ease-out backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(126,200,255,0.45),inset_0_0_15px_rgba(126,200,255,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 rounded-full overflow-hidden text-center cursor-pointer"
              >
                {/* Shimmer / Light beam sweep effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="transition-colors duration-300 group-hover:text-[#e0f2fe]">LEARN MORE</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#7ec8ff] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(126,200,255,0.9)]" />
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
