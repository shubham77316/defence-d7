"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function HomeAboutSplitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { settings } = useSettings();

  const capabilities = [
    {
      id: "01",
      tag: "SECTORS",
      value: "02",
      desc: "Aerospace and Defence.",
      image: "/images/foundation-sectors.jpg",
    },
    {
      id: "02",
      tag: "MODEL",
      value: "B2G",
      desc: "Government, institutional, and strategic partner engagement.",
      image: "/images/foundation-model.jpg",
    },
    {
      id: "03",
      tag: "DIRECTION",
      value: "Long Term",
      desc: "Capability, scale, and execution built to last decades.",
      image: "/images/foundation-direction.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 sm:pt-12 pb-8 sm:pb-10 bg-[#02050e] border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* Clean Solid Dark Background (Blue Haze Removed) */}
      <div className="absolute inset-0 bg-[#02050e] pointer-events-none z-0" />

      {/* Main Inner Content - Ultra-Wide Container for Increased Box Width */}
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
              {/* Top Tag: OUR CAPABILITIES (Centered with Symmetric Lines) */}
              <div className="flex items-center justify-center space-x-3 select-none">
                <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
                <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
                <span className="text-xs sm:text-[13px] font-sans font-semibold tracking-[0.22em] text-white uppercase">
                  OUR CAPABILITIES
                </span>
                <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
                <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
              </div>

              {/* Massive ABOUT US - Centered Typography with Clean Shadow (No Blue Glow) */}
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

              {/* Subheading (Centered) - Sleek Proportion with Symmetric Glow Line */}
              <div className="flex flex-col items-center text-center space-y-2 w-full">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-oxanium font-bold uppercase tracking-[0.05em] text-white leading-tight text-center">
                  BUILT FOR WHAT THE DEFENCE WORLD NEEDS
                </h3>
                <div className="w-36 sm:w-56 md:w-72 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]" />
                <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-3xl mx-auto pt-2">
                  {settings.foundingVision || "Sky Wardens was established to develop durable industrial capability, engineering systems and strategic technologies designed for long-term impact."}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* CAPABILITY GRID: ULTRA-WIDE & LOW-PROFILE RECTANGULAR BOXES                */}
          {/* ========================================================================= */}
          <div className="relative w-full pt-1 pb-0">
            {/* Wide Rectangular Box Container - Sleek Low Height & Expansive Width */}
            <div className="relative w-full border border-white/[0.12] bg-[#02050e]/60 backdrop-blur-md overflow-hidden rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              {/* 3 Column Grid with Vertical Dividers */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.12]">
                {capabilities.map((item, idx) => {
                  const initialAnim =
                    idx === 0
                      ? { opacity: 0, x: -20, y: 0 }
                      : idx === 2
                      ? { opacity: 0, x: 20, y: 0 }
                      : { opacity: 0, x: 0, y: 15 };

                  const sliderDirectionClass =
                    idx === 0
                      ? "-translate-x-full group-hover:translate-x-0"
                      : idx === 1
                      ? "-translate-y-full group-hover:translate-y-0"
                      : "translate-x-full group-hover:translate-x-0";

                  return (
                    <motion.div
                      key={item.id}
                      initial={initialAnim}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.25,
                        delay: 0,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative flex flex-col items-center justify-center text-center px-4 py-4 sm:px-6 sm:py-5 lg:py-6 group overflow-hidden cursor-pointer transition-all duration-300"
                    >
                      {/* Directional White Background Slider: Box 1 (Left), Box 2 (Top), Box 3 (Right) - Slow Velvet Smooth GPU Glide */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 bg-white ${sliderDirectionClass} transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform z-0`}
                      />

                      {/* Main Heading - Original Oxanium Font */}
                      <h4 className="relative z-10 font-oxanium text-sm sm:text-base lg:text-lg xl:text-xl font-bold uppercase tracking-wide text-white group-hover:text-slate-950 transition-colors duration-700 ease-out leading-tight w-full px-2 sm:px-4">
                        {item.value} {item.tag}
                      </h4>

                      {/* Monospace Bracketed Subtitle - Slow silky smooth transition to dark slate on white background */}
                      <p className="mt-1.5 sm:mt-2 relative z-10 text-[10px] sm:text-[11px] lg:text-xs font-mono uppercase tracking-[0.14em] text-slate-400 group-hover:text-slate-700 transition-colors duration-700 ease-out leading-relaxed w-full max-w-md lg:max-w-xl px-2">
                        [ {item.desc.replace(/\.$/, "")} ]
                      </p>
                    </motion.div>
                  );
                })}
              </div>
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
            className="w-full flex flex-col items-center text-center space-y-5 -mt-3 sm:-mt-5 max-w-3xl mx-auto"
          >
            {/* Narrative 2-Line Text */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal select-none text-center">
              Sky Wardens was established to develop durable industrial capability, the kind that takes years to build and decades to matter.
            </p>

            {/* Learn More Button */}
            <div className="pt-1 flex justify-center">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white text-white hover:text-slate-950 border border-white/20 hover:border-white text-xs font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 group"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 text-slate-300 group-hover:text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
