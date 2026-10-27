"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface CapabilityItem {
  id: string;
  tag: string;
  value: string;
  desc: string;
  image: string;
}

// Standalone Capability Box with Bottom-Right Circular Image that Rises Diagonally on Scroll
function CapabilityCard({ item, idx }: { item: CapabilityItem; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Diagonal scroll motion: enters from bottom-right corner and glides up towards center
  const circleX = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -35]);
  const circleY = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -45]);
  const circleRotate = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -8]);
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 1.04]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[380px] sm:h-[420px] md:h-[440px] rounded-2xl sm:rounded-3xl border border-white/[0.12] hover:border-[#7ec8ff]/70 bg-gradient-to-b from-[#060c1c]/90 via-[#040814]/95 to-[#02050e] backdrop-blur-md overflow-hidden p-6 sm:p-7 flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_16px_45px_rgba(2,132,199,0.28)] transition-all duration-500 select-none cursor-pointer"
    >
      {/* Subtle Light Shimmer Sweep across the card on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      {/* Top Header & Content */}
      <div className="relative z-20 flex flex-col items-start w-full">
        {/* Primary Value / Title */}
        <h4 className="font-oxanium text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-white mt-1 leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {item.value} {item.tag}
        </h4>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mt-3 max-w-[80%] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          {item.desc}
        </p>
      </div>

      {/* Circular Imagery Disc: Enters diagonally from bottom-right corner and rises towards center on scroll */}
      <motion.div
        style={{
          x: circleX,
          y: circleY,
          rotate: circleRotate,
          scale: circleScale,
        }}
        className="absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full border-2 border-sky-400/40 group-hover:border-[#7ec8ff] overflow-hidden shadow-[0_14px_45px_rgba(0,0,0,0.95),0_0_25px_rgba(56,189,248,0.25)] z-10 transition-colors duration-500 pointer-events-none"
      >
        <Image
          src={item.image}
          alt={item.tag}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 contrast-105 group-hover:brightness-105"
        />
        {/* Radar glass tint & concentric border overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#02050e]/60 via-transparent to-sky-400/10 pointer-events-none" />
        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
      </motion.div>

      {/* Bottom Footer Accent */}
      <div className="relative z-20 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-500 uppercase mt-auto pt-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff] animate-pulse shadow-[0_0_8px_#7ec8ff]" />
        <span className="group-hover:text-slate-300 transition-colors duration-300">SKY WARDENS CAPABILITY</span>
      </div>
    </motion.div>
  );
}

export default function HomeAboutSplitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { settings } = useSettings();

  const capabilities: CapabilityItem[] = [
    {
      id: "01",
      tag: "SECTORS",
      value: "02",
      desc: "Aerospace and Defence platforms engineered for sovereign security.",
      image: "/images/foundation-sectors.jpg",
    },
    {
      id: "02",
      tag: "MODEL",
      value: "B2G",
      desc: "Government, institutional, and tier-1 defence partner engagement.",
      image: "/images/foundation-model.jpg",
    },
    {
      id: "03",
      tag: "DIRECTION",
      value: "Long Term",
      desc: "Durable capability, scale, and strategic execution built for decades.",
      image: "/images/foundation-direction.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 sm:pt-12 pb-8 sm:pb-10 bg-[#02050e] border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* Clean Solid Dark Background */}
      <div className="absolute inset-0 bg-[#02050e] pointer-events-none z-0" />

      {/* Main Inner Content */}
      <div className="relative w-full max-w-[1680px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-10">
        <div className="flex flex-col items-start justify-center space-y-8 sm:space-y-12">
          
          {/* ========================================================================= */}
          {/* TOP SECTION: ABOUT US HERO (PERFECTLY CENTER ALIGNED)                     */}
          {/* ========================================================================= */}
          <div className="relative w-full flex items-center justify-center text-center">
            <motion.div
              initial={{ y: 60, opacity: 0 }}
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
          {/* 3 STANDALONE CAPABILITY BOXES WITH BOTTOM-RIGHT PARALLAX CIRCLE RISING    */}
          {/* ========================================================================= */}
          <div className="relative w-full pt-2 pb-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 w-full max-w-7xl mx-auto">
              {capabilities.map((item, idx) => (
                <CapabilityCard key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM SECTION: NARRATIVE & LEARN MORE ACTION                             */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center text-center space-y-5 -mt-2 sm:-mt-3 max-w-3xl mx-auto"
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
