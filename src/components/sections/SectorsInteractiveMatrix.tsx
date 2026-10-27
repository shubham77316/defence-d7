"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Geometric Cyber Insignia Icons matching exact reference aesthetic
function GeoHexagon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" className="stroke-cyan-400" />
      <line x1="6" y1="34" x2="42" y2="14" className="stroke-cyan-400/80" />
      <line x1="24" y1="44" x2="33" y2="24" className="stroke-cyan-400/60" />
      <circle cx="15" cy="20" r="2.5" className="fill-cyan-400 stroke-none" />
    </svg>
  );
}

function GeoDiamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <polygon points="24,6 42,20 24,42 6,20" className="stroke-cyan-400" />
      <polyline points="14,20 24,30 34,20" className="stroke-cyan-400/80" />
      <line x1="24" y1="6" x2="24" y2="30" className="stroke-cyan-400/60" />
      <circle cx="24" cy="14" r="2.5" className="fill-cyan-400 stroke-none" />
    </svg>
  );
}

function GeoMatrix({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <rect x="8" y="8" width="32" height="32" rx="4" className="stroke-cyan-400" />
      <polyline points="16,32 16,16 32,16 32,32" className="stroke-cyan-400/80" />
      <circle cx="24" cy="24" r="3" className="fill-cyan-400 stroke-none" />
      <line x1="24" y1="8" x2="24" y2="16" className="stroke-cyan-400/60" />
      <line x1="24" y1="32" x2="24" y2="40" className="stroke-cyan-400/60" />
    </svg>
  );
}

function GeoPolymer({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <polygon points="24,6 38,15 38,33 24,42 10,33 10,15" className="stroke-cyan-400" />
      <polyline points="24,6 24,42" className="stroke-cyan-400/60" />
      <polyline points="10,15 24,24 38,15" className="stroke-cyan-400/80" />
      <polyline points="10,33 24,24 38,33" className="stroke-cyan-400/80" />
      <circle cx="30" cy="20" r="2.5" className="fill-cyan-400 stroke-none" />
    </svg>
  );
}

export default function SectorsInteractiveMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickedBox, setClickedBox] = useState<number | null>(null);
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  // Scroll tracking linked directly to user mouse scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  // Spring configuration for buttery smooth organic scroll physics
  const springConfig = { stiffness: 90, damping: 22, mass: 0.6 };

  // Box 01: Enters from extreme right
  const rawX0 = useTransform(scrollYProgress, [0.05, 0.45], [550, 0]);
  const rawOpacity0 = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const x0 = useSpring(rawX0, springConfig);
  const opacity0 = useSpring(rawOpacity0, springConfig);

  // Box 02: Enters from extreme right (slightly offset)
  const rawX1 = useTransform(scrollYProgress, [0.15, 0.55], [600, 0]);
  const rawOpacity1 = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const x1 = useSpring(rawX1, springConfig);
  const opacity1 = useSpring(rawOpacity1, springConfig);

  // Box 03: Enters from extreme left
  const rawX2 = useTransform(scrollYProgress, [0.25, 0.65], [-550, 0]);
  const rawOpacity2 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const x2 = useSpring(rawX2, springConfig);
  const opacity2 = useSpring(rawOpacity2, springConfig);

  // Box 04: Enters from extreme left (slightly offset)
  const rawX3 = useTransform(scrollYProgress, [0.35, 0.75], [-600, 0]);
  const rawOpacity3 = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const x3 = useSpring(rawX3, springConfig);
  const opacity3 = useSpring(rawOpacity3, springConfig);

  const scrollAnimations = [
    { x: x0, opacity: opacity0 },
    { x: x1, opacity: opacity1 },
    { x: x2, opacity: opacity2 },
    { x: x3, opacity: opacity3 },
  ];

  // 4 Sector Boxes:
  // - Top 2 Boxes positioned to the RIGHT corner
  // - Bottom 2 Boxes positioned to the LEFT corner
  const sectors = [
    {
      number: "01",
      title: "Aerospace Systems",
      desc: "Autonomous airframes, stealth loitering munitions & high-altitude strategic recon platforms.",
      metric: "MACH 4.2+ // STRATOSPHERIC",
      icon: GeoHexagon,
      href: "/businesses#aerospace",
      cornerStyle: "self-end mr-0 sm:mr-4 lg:mr-8",
    },
    {
      number: "02",
      title: "Strategic Defence",
      desc: "Kinetic weapon systems, advanced ballistic armor & mission-critical soldier survivability gear.",
      metric: "STANAG 4 // KINETIC SHIELD",
      icon: GeoDiamond,
      href: "/businesses#defence",
      cornerStyle: "self-end mr-0 sm:mr-4 lg:mr-8",
    },
    {
      number: "03",
      title: "Advanced Systems",
      desc: "Edge AI compute modules, real-time sensor fusion & swarm autonomous robotics architecture.",
      metric: "120 TOPS // SENSOR FUSION",
      icon: GeoMatrix,
      href: "/businesses#advanced-systems",
      cornerStyle: "self-start ml-0 sm:ml-4 lg:ml-8",
    },
    {
      number: "04",
      title: "Petrochemical",
      desc: "High-shear synthetic lubricants, ballistic composites & specialized engineered polymer resins.",
      metric: "-50°C ~ +380°C // HIGH-SHEAR",
      icon: GeoPolymer,
      href: "/businesses#petrochemical",
      cornerStyle: "self-start ml-0 sm:ml-4 lg:ml-8",
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 bg-[#010308] border-t border-white/10 overflow-hidden"
    >
      {/* Ambient Radial Lighting Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[550px] bg-cyan-500/5 blur-[180px] pointer-events-none" />

      {/* Full-width container */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 w-full">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon;
            const isBoxClicked = clickedBox === index;
            const isBoxHovered = hoveredBox === index;
            const anim = scrollAnimations[index];

            return (
              <motion.div
                key={sector.number}
                style={{
                  x: anim.x,
                  opacity: anim.opacity,
                }}
                whileHover={{ scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } }}
                onMouseEnter={() => setHoveredBox(index)}
                onMouseLeave={() => setHoveredBox(null)}
                onClick={() => setClickedBox(clickedBox === index ? null : index)}
                className={`w-full max-w-lg sm:max-w-xl lg:max-w-2xl cursor-pointer ${sector.cornerStyle}`}
              >
                <div
                  className={`group relative block rounded-2xl bg-[#060b16]/95 border p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden ${
                    isBoxClicked
                      ? "border-cyan-400 bg-[#0a1428] shadow-[0_16px_45px_rgba(34,211,238,0.25)]"
                      : isBoxHovered
                      ? "border-cyan-400/70 bg-[#081020] shadow-[0_14px_40px_rgba(34,211,238,0.18)]"
                      : "border-white/10 hover:border-cyan-500/40 hover:bg-[#070e1c]"
                  }`}
                >
                  {/* Top Glowing Cyan Neon Accent Runner Line */}
                  <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-85 group-hover:opacity-100 group-hover:via-cyan-300 transition-all duration-300 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                  
                  {/* Ambient Radiant Subtle Shimmer on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                    {/* Left Geometric Vector Symbol in Rounded Square Container */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-2xl bg-[#03060f] border border-cyan-500/30 group-hover:border-cyan-400 flex items-center justify-center p-2.5 sm:p-3 transition-transform duration-300 group-hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                      <IconComponent className="w-full h-full" />
                    </div>

                    {/* Middle / Right Content */}
                    <div className="flex-1 min-w-0">
                      {/* Top Row: Title + 3 Status Dots */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                            {sector.title}
                          </h3>
                        </div>

                        {/* Top-Right Tactical Status Dots */}
                        <div className="flex items-center gap-1 text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                        {sector.desc}
                      </p>

                      {/* Bottom Telemetry Strip */}
                      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                          <span className="text-slate-300 font-medium tracking-wide">{sector.metric}</span>
                        </div>
                        <Link
                          href={sector.href}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-cyan-400 font-semibold hover:text-white tracking-wider transition-colors"
                        >
                          <span>VIEW DETAILS</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

