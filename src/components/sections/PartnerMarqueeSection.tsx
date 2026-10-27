"use client";

import React from "react";
import { motion } from "framer-motion";

// --- High-Fidelity Vector Insignia & Partner Brand Logos ---

function LogoCsirNal() {
  return (
    <div className="flex flex-col items-center justify-center group/item cursor-pointer">
      <div className="relative w-22 h-11 flex items-center justify-center transition-transform duration-300 group-hover/item:scale-105">
        <svg viewBox="0 0 120 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M 28 44 L 56 6 L 68 6 L 62 44 Z"
            stroke="#0ea5e9"
            strokeWidth="3.2"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="50" cy="24" r="2" fill="#38bdf8" />
          <circle cx="45" cy="30" r="1.8" fill="#38bdf8" />
          <circle cx="53" cy="32" r="1.8" fill="#38bdf8" />
          <circle cx="48" cy="36" r="2" fill="#38bdf8" />
          <circle cx="55" cy="26" r="1.6" fill="#38bdf8" />
          <circle cx="43" cy="22" r="1.6" fill="#38bdf8" />
          <circle cx="56" cy="38" r="1.5" fill="#38bdf8" />
          <text x="60" y="50" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em" textAnchor="middle">
            CSIR-NAL
          </text>
        </svg>
      </div>
    </div>
  );
}

function LogoDrdo() {
  return (
    <div className="flex flex-col items-center justify-center group/item cursor-pointer">
      <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover/item:scale-105">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="32" cy="32" r="29" fill="#003366" stroke="#38bdf8" strokeWidth="2.2" />
          <circle cx="32" cy="32" r="25" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="16" y1="46" x2="48" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="46" x2="16" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="32" r="10" fill="#dc2626" stroke="#fbbf24" strokeWidth="1.2" />
          <path d="M 28 32 L 32 24 L 36 32 Z" fill="#fbbf24" />
          <text x="32" y="56" fill="#ffffff" fontSize="6.5" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.12em" textAnchor="middle">
            DRDO
          </text>
        </svg>
      </div>
    </div>
  );
}

function LogoNavyServices() {
  return (
    <div className="flex flex-col items-center justify-center group/item cursor-pointer">
      <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover/item:scale-105">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="32" cy="32" r="28" fill="#080c14" stroke="#eab308" strokeWidth="2" />
          <path
            d="M 32 14 L 32 46 M 22 36 C 22 46 42 46 42 36 M 24 22 L 40 22"
            stroke="#facc15"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="18" r="3" stroke="#facc15" strokeWidth="1.8" />
          <path d="M 14 26 Q 24 22 32 30 Q 40 22 50 26" stroke="#facc15" strokeWidth="1.8" fill="none" />
          <path d="M 18 50 Q 32 54 46 50" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function LogoIaf() {
  return (
    <div className="flex flex-col items-center justify-center group/item cursor-pointer">
      <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover/item:scale-105">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 30 8 L 34 8 L 33 13 L 31 13 Z" fill="#fbbf24" />
          <path
            d="M 32 18 C 22 14 10 22 8 28 C 16 26 24 26 32 32 C 40 26 48 26 56 28 C 54 22 42 14 32 18 Z"
            fill="#38bdf8"
            stroke="#e0f2fe"
            strokeWidth="1"
          />
          <circle cx="32" cy="40" r="14" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx="32" cy="40" r="9" fill="#ffffff" />
          <circle cx="32" cy="40" r="4.5" fill="#16a34a" />
          <path d="M 16 48 Q 32 58 48 48" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function LogoIndianArmy() {
  return (
    <div className="flex flex-col items-center justify-center group/item cursor-pointer">
      <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover/item:scale-105">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M 28 8 L 36 8 L 35 18 L 29 18 Z M 25 12 L 39 12 M 26 18 L 38 18 L 36 24 L 28 24 Z"
            fill="#facc15"
            stroke="#eab308"
            strokeWidth="0.8"
          />
          <circle cx="32" cy="22" r="2" fill="#1e3a8a" />
          <line x1="12" y1="52" x2="52" y2="24" stroke="#facc15" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="52" y1="52" x2="12" y2="24" stroke="#facc15" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="14" cy="50" r="2.5" fill="#ca8a04" />
          <circle cx="50" cy="50" r="2.5" fill="#ca8a04" />
          <path d="M 10 46 L 18 54" stroke="#eab308" strokeWidth="2" />
          <path d="M 54 46 L 46 54" stroke="#eab308" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function LogoIsro() {
  return (
    <div className="flex flex-col items-center justify-center group/item cursor-pointer">
      <div className="relative w-18 h-12 flex items-center justify-center transition-transform duration-300 group-hover/item:scale-105">
        <svg viewBox="0 0 100 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 50 4 L 46 28 L 50 24 L 54 28 Z" fill="#f97316" />
          <line x1="32" y1="20" x2="68" y2="20" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="50" y1="24" x2="50" y2="40" stroke="#f97316" strokeWidth="2.4" strokeLinecap="round" />
          <text x="32" y="44" fill="#f97316" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            इसरो
          </text>
          <text x="64" y="44" fill="#0284c7" fontSize="11" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.05em">
            isro
          </text>
        </svg>
      </div>
    </div>
  );
}

function LogoAirblades() {
  return (
    <div className="flex flex-col items-center justify-center group/item cursor-pointer px-5 flex-shrink-0">
      <div className="relative h-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover/item:scale-105">
        <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-6">
          <circle cx="40" cy="16" r="3" fill="#ffffff" />
          <path d="M 40 13 Q 40 2 46 4 Q 44 12 40 14" fill="#ffffff" />
          <path d="M 37 18 Q 26 24 28 29 Q 36 24 38 18" fill="#ffffff" />
          <path d="M 43 18 Q 54 24 52 29 Q 44 24 42 18" fill="#ffffff" />
        </svg>
        <span className="text-sm font-black italic tracking-wider text-white uppercase font-sans">
          Airblades
        </span>
        <span className="text-[7px] font-mono tracking-widest text-slate-400 uppercase">
          Build to Last. Designed to Perform.
        </span>
      </div>
    </div>
  );
}

function LogoAndurax() {
  return (
    <div className="flex items-center gap-2.5 group/item cursor-pointer px-5 flex-shrink-0">
      <div className="relative flex items-center gap-2.5 transition-transform duration-300 group-hover/item:scale-105">
        <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-6">
          <polygon points="4,22 28,6 56,18 42,28 28,20" fill="#ffffff" opacity="0.9" />
          <polygon points="28,20 42,28 34,34 16,28" fill="#94a3b8" />
        </svg>
        <span className="text-base font-bold tracking-tight text-white font-sans">
          AnduraX
        </span>
      </div>
    </div>
  );
}

function LogoBharatForge() {
  return (
    <div className="flex items-center gap-3.5 group/item cursor-pointer px-5 flex-shrink-0">
      <div className="relative flex items-center gap-3.5 transition-transform duration-300 group-hover/item:scale-105">
        <span className="text-xs sm:text-sm font-black tracking-[0.16em] uppercase text-white font-sans">
          BHARAT FORGE
        </span>
        <div className="h-4.5 w-[1px] bg-slate-700" />
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5">
            <circle cx="16" cy="16" r="14" stroke="#ffffff" strokeWidth="2" />
            <path d="M 12 10 L 20 16 L 12 22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[6px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
            KALYANI
          </span>
        </div>
      </div>
    </div>
  );
}

function LogoCentum() {
  return (
    <div className="flex items-center gap-2.5 group/item cursor-pointer px-5 flex-shrink-0">
      <div className="relative flex items-center gap-2.5 transition-transform duration-300 group-hover/item:scale-105">
        <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full border border-sky-300 bg-sky-500/20" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-black tracking-wider uppercase text-cyan-200 font-sans leading-none">
            CENTUM
          </span>
          <span className="text-[8.5px] font-mono tracking-[0.25em] text-cyan-400/90 uppercase mt-0.5 font-bold">
            T &amp; S
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PartnerMarqueeSection() {
  const allMarqueeLogos = [
    { id: "csir", component: LogoCsirNal },
    { id: "drdo", component: LogoDrdo },
    { id: "navy", component: LogoNavyServices },
    { id: "iaf", component: LogoIaf },
    { id: "army", component: LogoIndianArmy },
    { id: "isro", component: LogoIsro },
    { id: "airblades", component: LogoAirblades },
    { id: "andurax", component: LogoAndurax },
    { id: "bharatforge", component: LogoBharatForge },
    { id: "centum", component: LogoCentum },
  ];

  return (
    <section className="relative w-full bg-[#010308]/90 border-y border-white/[0.06] py-4 sm:py-5 overflow-hidden select-none z-20">
      {/* Left/Right Edge Deep Atmosphere Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#010308] via-[#010308]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#010308] via-[#010308]/80 to-transparent z-20 pointer-events-none" />

      {/* Moving Marquee Stream - Pure Logos (Smooth Slow Infinite Loop) */}
      <div className="flex overflow-hidden relative w-full items-center">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 35,
          }}
          className="flex items-center gap-10 sm:gap-14 lg:gap-16 flex-nowrap will-change-transform py-0 pr-10 sm:pr-14 lg:pr-16"
        >
          {[
            ...allMarqueeLogos,
            ...allMarqueeLogos,
          ].map((item, idx) => {
            const ItemComponent = item.component;
            return (
              <div
                key={`partner-logo-${item.id}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] cursor-pointer py-1"
              >
                <ItemComponent />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
