"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface CapabilityItem {
  id: string;
  badge?: string;
  headline: string;
  desc: string;
  image: string;
}

// Reusable Physical Pill Card Component
function CapabilityCardContent({ item }: { item: CapabilityItem }) {
  return (
    <div className="relative w-full h-[470px] sm:h-[530px] md:h-[550px] rounded-[32px] sm:rounded-[38px] md:rounded-[42px] bg-[#02050e] border border-white/[0.14] pt-2.5 sm:pt-3 px-2.5 sm:px-3.5 pb-4 sm:pb-5 flex flex-col justify-between shadow-[0_24px_60px_rgba(0,0,0,0.98),0_0_0_1px_rgba(56,189,248,0.22),0_-6px_20px_rgba(0,0,0,0.85)] overflow-hidden select-none">
      {/* Subtle cyan border accent highlight */}
      <div className="absolute inset-0 rounded-[32px] sm:rounded-[38px] md:rounded-[42px] border border-sky-400/20 pointer-events-none" />

      {/* TOP PORTION: INNER ROUNDED PHOTOGRAPH */}
      <div className="relative w-full h-[255px] sm:h-[300px] md:h-[320px] rounded-[22px] sm:rounded-[26px] md:rounded-[30px] overflow-hidden bg-[#070d1e] shadow-[inset_0_0_24px_rgba(0,0,0,0.85)]">
        <Image
          src={item.image}
          alt={item.headline}
          fill
          sizes="(max-width: 768px) 100vw, 520px"
          priority
          className="object-cover object-center filter brightness-95 contrast-105"
        />
        {/* Subtle atmospheric vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* BOTTOM PORTION: BOLD CENTERED STATEMENT */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-3 sm:px-5 py-3 sm:py-4">
        <h4 className="font-sans text-xl sm:text-2xl md:text-[24px] font-bold text-white leading-snug tracking-tight text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {item.headline}
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed text-center mt-2.5 max-w-[92%]">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

// Unified Stacking Deck with scroll-driven clamped transforms:
// Sequence on scroll:
// 1. Card 1 (01 // SECTORS) is anchored at top: 0px.
// 2. As you scroll, Card 2 (02 // MODEL) smoothly rises from below and docks at top: 48px.
//    Card 1's badge "01 // SECTORS" remains 100% visible with breathing room.
// 3. As you scroll further, Card 3 (03 // DIRECTION) smoothly rises from below and docks at top: 96px.
//    Card 2's badge "02 // MODEL" and Card 1's badge "01 // SECTORS" both remain 100% visible,
//    with Card 3 fully displaying its badge, photo, headline, and desc in front!
function ScrollDeckCards({ capabilities }: { capabilities: CapabilityItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 96px", "end end"],
  });

  // Card 2 (Model, idx 1): rises from 850px below to 0px, clamping precisely at top-[48px]
  const card1Y = useTransform(scrollYProgress, [0.08, 0.44], [850, 0], { clamp: true });
  const card1Opacity = useTransform(scrollYProgress, [0.06, 0.16], [0, 1], { clamp: true });

  // Card 3 (Direction, idx 2): rises from 850px below to 0px, clamping precisely at top-[96px]
  const card2Y = useTransform(scrollYProgress, [0.52, 0.88], [850, 0], { clamp: true });
  const card2Opacity = useTransform(scrollYProgress, [0.50, 0.60], [0, 1], { clamp: true });

  return (
    <div ref={containerRef} className="relative w-full h-[185vh] sm:h-[225vh]">
      {/* Pinned Sticky Stage - Stays centered below navbar */}
      <div className="sticky top-[88px] sm:top-[104px] w-full max-w-[490px] sm:max-w-[520px] mx-auto h-[555px] sm:h-[635px] md:h-[650px] flex justify-center pointer-events-none">
        
        {/* CARD 1 (SECTORS) - BASE LAYER at top: 0 */}
        <div
          className="absolute top-0 w-full flex justify-center pointer-events-auto"
          style={{ zIndex: 10 }}
        >
          <CapabilityCardContent item={capabilities[0]} />
        </div>

        {/* CARD 2 (MODEL) - MIDDLE LAYER docks at top: 48px */}
        <motion.div
          className="absolute top-[38px] sm:top-[48px] w-full flex justify-center pointer-events-auto"
          style={{
            y: card1Y,
            opacity: card1Opacity,
            zIndex: 20,
          }}
        >
          <CapabilityCardContent item={capabilities[1]} />
        </motion.div>

        {/* CARD 3 (DIRECTION) - TOP LAYER docks at top: 96px */}
        <motion.div
          className="absolute top-[76px] sm:top-[96px] w-full flex justify-center pointer-events-auto"
          style={{
            y: card2Y,
            opacity: card2Opacity,
            zIndex: 30,
          }}
        >
          <CapabilityCardContent item={capabilities[2]} />
        </motion.div>
      </div>
    </div>
  );
}

export default function HomeAboutSplitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { settings } = useSettings();

  const capabilities: CapabilityItem[] = [
    {
      id: "01",
      badge: "01 // SECTORS",
      headline: "Aerospace & defence platforms engineered for sovereign security.",
      desc: "Next-generation kinetic, autonomous, and strategic aerospace systems designed for long-term operational superiority.",
      image: "/images/foundation-sectors.jpg",
    },
    {
      id: "02",
      badge: "02 // MODEL",
      headline: "Direct sovereign engagement and alliances built to outlast trends.",
      desc: "High-level institutional alignment with defense ministries, armed forces, and global Tier-1 strategic partners.",
      image: "/images/foundation-model.jpg",
    },
    {
      id: "03",
      badge: "03 // DIRECTION",
      headline: "Durable industrial capability that takes years to build and decades to matter.",
      desc: "Sovereign domestic manufacturing, deep precision engineering, and strategic deterrence designed for decades.",
      image: "/images/foundation-direction.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 sm:pt-12 pb-12 sm:pb-20 bg-[#02050e] border-t border-white/[0.08] overflow-visible select-none"
    >
      {/* Clean Solid Dark Background with subtle ambient glow */}
      <div className="absolute inset-0 bg-[#02050e] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Inner Content */}
      <div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-10">
        <div className="flex flex-col items-center justify-center space-y-5 sm:space-y-8">
          
          {/* ========================================================================= */}
          {/* TOP SECTION: ABOUT US HERO (PERFECTLY CENTER ALIGNED)                     */}
          {/* ========================================================================= */}
          <div className="relative w-full flex items-center justify-center text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.15 }}
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
          {/* 3-CARD SCROLL STACKING DECK (EXACT REFERENCE FORMAT WITH CLAMPED TRAVEL)   */}
          {/* ========================================================================= */}
          <ScrollDeckCards capabilities={capabilities} />

          {/* ========================================================================= */}
          {/* BOTTOM SECTION: NARRATIVE & LEARN MORE ACTION                             */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center text-center space-y-4 sm:space-y-5 max-w-3xl mx-auto pt-1 sm:pt-2"
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
