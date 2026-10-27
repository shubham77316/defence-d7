"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- High-Fidelity Vector Insignia & Partner Brand Logos ---

// 1. Indian Army Insignia
function EmblemIA() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 flex items-center justify-center">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {/* Ashoka Lion Capital (Gold) */}
        <path
          d="M 44 10 L 56 10 L 55 24 L 45 24 Z M 40 16 L 60 16 M 42 24 L 58 24 L 55 32 L 45 32 Z"
          fill="#facc15"
          stroke="#ca8a04"
          strokeWidth="1"
        />
        {/* Ashoka Chakra Wheel */}
        <circle cx="50" cy="28" r="3" fill="#1e3a8a" stroke="#facc15" strokeWidth="0.8" />
        {/* Crossed Cavalry Scimitars / Swords */}
        <line x1="20" y1="80" x2="80" y2="38" stroke="#facc15" strokeWidth="4.2" strokeLinecap="round" />
        <line x1="80" y1="80" x2="20" y2="38" stroke="#facc15" strokeWidth="4.2" strokeLinecap="round" />
        {/* Golden Hilts & Guards */}
        <circle cx="22" cy="78" r="4" fill="#ca8a04" stroke="#facc15" strokeWidth="1.2" />
        <circle cx="78" cy="78" r="4" fill="#ca8a04" stroke="#facc15" strokeWidth="1.2" />
        <path d="M 16 72 L 28 84" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
        <path d="M 84 72 L 72 84" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 2. DRDO Emblem
function EmblemDRDO() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 flex items-center justify-center">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {/* Main Blue Outer Roundel */}
        <circle cx="50" cy="50" r="44" fill="#003b7a" stroke="#38bdf8" strokeWidth="3" />
        <circle cx="50" cy="50" r="38" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
        {/* Crossed Missiles/Arrows */}
        <line x1="24" y1="72" x2="76" y2="28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <line x1="76" y1="72" x2="24" y2="28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        {/* Center Target Core */}
        <circle cx="50" cy="50" r="16" fill="#dc2626" stroke="#fbbf24" strokeWidth="2" />
        <path d="M 44 50 L 50 38 L 56 50 Z" fill="#fbbf24" />
        {/* Top/Bottom Text Arc */}
        <text x="50" y="24" fill="#ffffff" fontSize="9" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.2em" textAnchor="middle">
          D R D O
        </text>
        <text x="50" y="86" fill="#ffffff" fontSize="9" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.2em" textAnchor="middle">
          D R D O
        </text>
      </svg>
    </div>
  );
}

// 3. Indian Air Force Crest
function EmblemIAF() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 flex items-center justify-center">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {/* Ashoka Lion Top */}
        <path d="M 47 12 L 53 12 L 52 20 L 48 20 Z" fill="#fbbf24" />
        {/* Soaring Golden Himalayan Eagle */}
        <path
          d="M 50 26 C 34 20 16 32 12 40 C 24 38 36 38 50 48 C 64 38 76 38 88 40 C 84 32 66 20 50 26 Z"
          fill="#38bdf8"
          stroke="#facc15"
          strokeWidth="1.8"
        />
        {/* Inner IAF Tricolor Roundel (Saffron-White-Green) */}
        <circle cx="50" cy="58" r="20" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="2.2" />
        <circle cx="50" cy="58" r="13" fill="#ffffff" />
        <circle cx="50" cy="58" r="6.5" fill="#16a34a" />
        {/* Golden Bottom Wreath Ribbon */}
        <path d="M 26 70 Q 50 86 74 70" stroke="#fbbf24" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 4. CSIR-NAL (National Aerospace Laboratories)
function EmblemCSIRNAL() {
  return (
    <div className="relative w-24 h-15 sm:w-28 sm:h-18 md:w-32 md:h-20 flex items-center justify-center">
      <svg viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {/* Aerodynamic Aircraft Vertical Tail Fin Contour */}
        <path
          d="M 28 62 L 72 10 L 88 10 L 80 62 Z"
          stroke="#0ea5e9"
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Industrial Precision Gear Vector */}
        <g transform="translate(68, 40) scale(0.65)" stroke="#0ea5e9" strokeWidth="2.5" fill="none">
          <circle cx="20" cy="20" r="12" />
          <circle cx="20" cy="20" r="6" fill="#0ea5e9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="20"
              y1="4"
              x2="20"
              y2="9"
              transform={`rotate(${angle} 20 20)`}
              strokeLinecap="round"
            />
          ))}
        </g>
        {/* CSIR-NAL Wordmark */}
        <text x="60" y="74" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="0.12em" textAnchor="middle">
          CSIR-NAL
        </text>
      </svg>
    </div>
  );
}

// 5. ISRO (Indian Space Research Organisation)
function EmblemISRO() {
  return (
    <div className="relative w-24 h-15 sm:w-28 sm:h-18 md:w-32 md:h-20 flex items-center justify-center">
      <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {/* Orange Rocket Satellite Arrow Core */}
        <path d="M 60 4 L 55 36 L 60 31 L 65 36 Z" fill="#f97316" />
        {/* Left/Right Solar Panel Array Wings (Cyan/Sky) */}
        <line x1="38" y1="24" x2="82" y2="24" stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" />
        <line x1="60" y1="31" x2="60" y2="52" stroke="#f97316" strokeWidth="3.2" strokeLinecap="round" />
        {/* Devanagari इसरो + ISRO Typography */}
        <text x="36" y="58" fill="#f97316" fontSize="15" fontFamily="sans-serif" fontWeight="bold">
          इसरो
        </text>
        <text x="80" y="58" fill="#0284c7" fontSize="15" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.05em">
          isro
        </text>
      </svg>
    </div>
  );
}

// 6. Integrated Defence Staff (IDS)
function EmblemIDS() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 flex items-center justify-center">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {/* Outer Circular Shield */}
        <circle cx="50" cy="50" r="44" fill="#080c14" stroke="#eab308" strokeWidth="3" />
        <circle cx="50" cy="50" r="37" fill="#7f1d1d" stroke="#facc15" strokeWidth="1.2" />
        {/* Tri-Services Anchor & Crossed Swords */}
        <path
          d="M 50 24 L 50 68 M 36 54 C 36 68 64 68 64 54 M 38 36 L 62 36"
          stroke="#facc15"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="30" r="4" stroke="#facc15" strokeWidth="2.2" />
        <line x1="28" y1="64" x2="72" y2="34" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="72" y1="64" x2="28" y2="34" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
        {/* Motto Ribbon */}
        <path d="M 22 80 Q 50 88 78 80" stroke="#dc2626" strokeWidth="2" fill="none" />
        <text x="50" y="85" fill="#fef08a" fontSize="5.5" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.08em" textAnchor="middle">
          VICTORY THROUGH JOINTNESS
        </text>
      </svg>
    </div>
  );
}

// 7. CSIR-CSIO
function EmblemCSIRCSIO() {
  return (
    <div className="relative w-20 h-16 sm:w-24 sm:h-18 md:w-28 md:h-20 flex items-center justify-center">
      <svg viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {/* Industrial Gear Outer Ring */}
        <circle cx="70" cy="42" r="30" stroke="#0ea5e9" strokeWidth="3.5" fill="none" />
        <circle cx="70" cy="42" r="22" stroke="#0ea5e9" strokeWidth="2" fill="none" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <line
            key={i}
            x1="70"
            y1="10"
            x2="70"
            y2="16"
            transform={`rotate(${angle} 70 42)`}
            stroke="#0ea5e9"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
        {/* Inner Scientific Core */}
        <circle cx="70" cy="42" r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M 78 34 C 72 28 62 30 60 42 C 62 54 72 56 78 50" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* CSIR-CSIO Text */}
        <text x="70" y="86" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="0.14em" textAnchor="middle">
          CSIR-CSIO
        </text>
      </svg>
    </div>
  );
}

// 8. Airblades
function EmblemAirblades() {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-18 h-7 sm:w-20 sm:h-8 md:w-22 md:h-8.5 mb-0.5">
        <circle cx="50" cy="18" r="4" fill="#38bdf8" />
        <path d="M 50 14 Q 50 0 58 3 Q 55 13 50 15" fill="#f8fafc" />
        <path d="M 46 22 Q 32 30 35 36 Q 44 30 47 22" fill="#f8fafc" />
        <path d="M 54 22 Q 68 30 65 36 Q 56 30 53 22" fill="#f8fafc" />
      </svg>
      <span className="text-xs sm:text-sm md:text-base font-black italic tracking-wider text-white uppercase font-sans">
        Airblades
      </span>
      <span className="text-[6px] sm:text-[7px] md:text-[7.5px] font-mono tracking-[0.14em] text-sky-400 uppercase mt-0.5 text-center font-bold">
        Build to Last &bull; Designed to Perform
      </span>
    </div>
  );
}

// 9. AnduraX
function EmblemAndurax() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-6 sm:w-10 sm:h-7 md:w-11 md:h-8">
        <polygon points="6,28 36,8 72,22 54,36 36,26" fill="#f8fafc" opacity="0.95" />
        <polygon points="36,26 54,36 44,44 22,36" fill="#0284c7" />
      </svg>
      <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white font-sans">
        AnduraX
      </span>
    </div>
  );
}

// 10. Bharat Forge Kalyani
function EmblemBharatForge() {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5">
      <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-[0.12em] uppercase text-white font-sans text-center">
        BHARAT FORGE
      </span>
      <div className="flex items-center gap-1">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
          <circle cx="20" cy="20" r="17" stroke="#38bdf8" strokeWidth="2.5" />
          <path d="M 14 12 L 26 20 L 14 28" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[7px] sm:text-[8px] font-mono tracking-[0.2em] text-sky-300 uppercase font-bold">
          KALYANI
        </span>
      </div>
    </div>
  );
}

// 11. Centum T&S
function EmblemCentum() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9">
        <circle cx="25" cy="25" r="22" stroke="#0284c7" strokeWidth="2.5" />
        <circle cx="25" cy="25" r="14" stroke="#38bdf8" strokeWidth="2" />
        <path d="M 32 17 C 26 10 16 14 14 25 C 16 36 26 40 32 33" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
      <div className="flex flex-col">
        <span className="text-sm sm:text-base md:text-lg font-black tracking-wider uppercase text-white font-sans leading-none">
          CENTUM
        </span>
        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-sky-400 uppercase mt-0.5 font-bold">
          T&amp;S
        </span>
      </div>
    </div>
  );
}

// 12. Pagariya Group
function EmblemPagariya() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9">
        <path d="M 22 2 L 28 16 L 42 22 L 28 28 L 22 42 L 16 28 L 2 22 L 16 16 Z" fill="#f8fafc" opacity="0.95" />
        <circle cx="22" cy="22" r="5" fill="#38bdf8" />
      </svg>
      <div className="flex flex-col">
        <span className="text-xs sm:text-sm md:text-base font-black tracking-wider uppercase text-white font-serif leading-none">
          PAGARIYA
        </span>
        <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.16em] text-sky-300 uppercase font-serif">
          GROUP
        </span>
      </div>
    </div>
  );
}

// 13. PSGL Group
function EmblemPSGL() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-9 sm:w-8 sm:h-10 md:w-9 md:h-11">
        <path d="M 12 60 L 12 10 L 36 10 C 50 10 54 22 54 28 C 54 36 48 42 36 42 L 12 42" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 20 28 L 36 28" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col">
        <span className="text-sm sm:text-base md:text-lg font-black tracking-wider uppercase text-white font-sans leading-none">
          PSGL
        </span>
        <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.12em] text-sky-300 uppercase font-sans">
          GROUP
        </span>
      </div>
    </div>
  );
}

// 14. Sky Wardens
function EmblemSkyWardens() {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-8 sm:w-12 sm:h-9 md:w-13 md:h-10 mb-0.5">
        <path d="M 40 6 L 68 18 L 68 42 C 68 56 40 68 40 68 C 40 68 12 56 12 42 L 12 18 Z" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
        <path d="M 28 38 C 32 28 38 22 48 18 C 42 26 40 32 44 42 C 38 38 32 36 28 38 Z" fill="#f8fafc" opacity="0.95" />
      </svg>
      <div className="flex items-center gap-1">
        <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.14em] uppercase text-white font-sans">
          SKY
        </span>
        <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-[0.14em] uppercase text-sky-400 font-sans">
          WARDENS
        </span>
      </div>
    </div>
  );
}

// 15. Throttle Aerospace Systems (TAS)
function EmblemTAS() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-baseline gap-0">
        <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white font-sans leading-none">T</span>
        <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-amber-400 font-sans leading-none relative">A</span>
        <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white font-sans leading-none">S</span>
      </div>
      <span className="text-[6px] sm:text-[7px] md:text-[8px] font-mono tracking-[0.14em] text-amber-400 uppercase mt-0.5 font-bold">
        Throttle Aerospace
      </span>
    </div>
  );
}

// 16. Vigyanlabs
function EmblemVigyanlabs() {
  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-7 sm:w-28 sm:h-9 md:w-32 md:h-10">
        <path d="M 10 12 C 14 32 22 48 30 48 C 36 48 40 32 42 22" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 42 22 C 44 28 46 34 50 34 C 54 34 56 28 56 24" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 56 18 C 56 18 58 14 62 14 C 66 14 66 20 66 24 C 66 30 64 36 68 36" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 68 36 C 72 36 74 28 76 22 C 78 16 80 14 84 14 C 88 14 88 22 88 28" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 88 28 C 88 32 90 36 94 36 C 98 36 100 28 100 22" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 104 8 C 104 8 104 28 104 36 C 104 40 108 42 110 36" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 114 22 C 110 22 108 26 108 30 C 108 36 112 38 116 36 C 118 34 118 30 116 28 C 114 26 110 28 110 30" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <line x1="88" y1="40" x2="108" y2="38" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

interface PartnerBadgeProps {
  id: string;
  code: string;
  name: string;
  component: React.ComponentType;
}

// Concentric Double-Circle Round Badge Component matching Dark Aesthetic
function CircularPartnerBadge({ card }: { card: PartnerBadgeProps }) {
  const Emblem = card.component;
  return (
    <div className="group relative flex-shrink-0 cursor-pointer select-none">
      {/* Outer Circle (Concentric Ring 1) - Sleek Dark Border with Sky Blue Hover Transition */}
      <div className="w-48 h-48 xs:w-52 xs:h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-[260px] lg:h-[260px] xl:w-[272px] xl:h-[272px] 2xl:w-[280px] 2xl:h-[280px] aspect-square rounded-full border border-white/15 group-hover:border-sky-400/60 group-hover:bg-sky-500/[0.04] flex items-center justify-center transition-all duration-300">
        
        {/* Inner Circle (Concentric Ring 2) - Clean Translucent Frosted Dark Disc */}
        <div className="w-[72%] h-[72%] rounded-full border border-white/15 group-hover:border-sky-400/80 bg-[#040814]/80 group-hover:bg-gradient-to-b group-hover:from-sky-950/60 group-hover:via-[#07132a]/80 group-hover:to-[#02050e] backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.6)] group-hover:shadow-[0_12px_28px_rgba(2,132,199,0.25)] flex flex-col items-center justify-center px-3 pt-2 pb-3.5 sm:px-4 sm:pt-3 sm:pb-4 text-center transition-all duration-300 group-hover:scale-[1.03]">
          
          {/* Logo / Emblem positioned in upper-middle */}
          <div className="flex-1 flex items-center justify-center w-full max-h-[48%] mb-1 transition-transform duration-300 group-hover:scale-105">
            <Emblem />
          </div>

          {/* Clean Organization Code & Name Lifted Safely Within the Circle (zero overflow) */}
          <div className="w-full flex flex-col items-center justify-center pointer-events-none px-1">
            <span className="text-[10.5px] xs:text-[11.5px] sm:text-xs md:text-[13px] font-mono font-bold tracking-wider text-white uppercase line-clamp-1 group-hover:text-sky-400 transition-colors duration-300">
              {card.code}
            </span>
            <span className="text-[8px] xs:text-[9px] sm:text-[9.5px] md:text-[10px] text-slate-400 font-sans font-medium tracking-tight leading-tight line-clamp-1 max-w-[80%] mt-0.5 group-hover:text-slate-200 transition-colors duration-300">
              {card.name}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PartnershipsSection() {
  // Complete 16 Partner Cards
  const allPartnerCards: PartnerBadgeProps[] = [
    {
      id: "ia",
      code: "INDIAN ARMY",
      name: "Indian Army",
      component: EmblemIA,
    },
    {
      id: "drdo",
      code: "DRDO",
      name: "Defence Research & Development Organisation",
      component: EmblemDRDO,
    },
    {
      id: "iaf",
      code: "INDIAN AIR FORCE",
      name: "Indian Air Force",
      component: EmblemIAF,
    },
    {
      id: "csir-nal",
      code: "CSIR-NAL",
      name: "National Aerospace Laboratories",
      component: EmblemCSIRNAL,
    },
    {
      id: "ids",
      code: "IDS",
      name: "Integrated Defence Staff",
      component: EmblemIDS,
    },
    {
      id: "isro",
      code: "ISRO",
      name: "Indian Space Research Organisation",
      component: EmblemISRO,
    },
    {
      id: "csir-csio",
      code: "CSIR-CSIO",
      name: "Central Scientific Instruments Organisation",
      component: EmblemCSIRCSIO,
    },
    {
      id: "airblades",
      code: "AIRBLADES",
      name: "Airblades Propulsion",
      component: EmblemAirblades,
    },
    {
      id: "andurax",
      code: "ANDURAX",
      name: "Andura Expeditions",
      component: EmblemAndurax,
    },
    {
      id: "bharat-forge",
      code: "BHARAT FORGE",
      name: "Bharat Forge Kalyani",
      component: EmblemBharatForge,
    },
    {
      id: "centum",
      code: "CENTUM T&S",
      name: "Centum Technologies & Solutions",
      component: EmblemCentum,
    },
    {
      id: "pagariya",
      code: "PAGARIYA GROUP",
      name: "Pagariya Group",
      component: EmblemPagariya,
    },
    {
      id: "psgl",
      code: "PSGL GROUP",
      name: "Project Services Group Limited",
      component: EmblemPSGL,
    },
    {
      id: "sky-wardens",
      code: "SKY WARDENS",
      name: "Sky Wardens Defence",
      component: EmblemSkyWardens,
    },
    {
      id: "tas",
      code: "TAS",
      name: "Throttle Aerospace Systems",
      component: EmblemTAS,
    },
    {
      id: "vigyanlabs",
      code: "VIGYANLABS",
      name: "Vigyanlabs Innovations",
      component: EmblemVigyanlabs,
    },
  ];

  // 16 Partners split into 2 tracks of 8 for the concentric circular marquee
  const row1Partners = allPartnerCards.slice(0, 8);
  const row2Partners = allPartnerCards.slice(8, 16);

  return (
    <section className="relative pt-8 sm:pt-12 pb-8 sm:pb-10 bg-[#02050e] border-t border-white/[0.08] overflow-hidden select-none">
      {/* Clean Solid Dark Background (Blue Haze Removed) */}
      <div className="absolute inset-0 bg-[#02050e] pointer-events-none z-0" />

      <div className="relative w-full space-y-8 sm:space-y-12 z-10">
        
        {/* Section Header (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3 max-w-4xl mx-auto px-4 select-none"
        >
          {/* Symmetrical Header Tag */}
          <div className="flex items-center justify-center space-x-3 select-none">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-white/40" />
            <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/70" />
            <span className="text-xs sm:text-[13px] font-sans font-semibold tracking-[0.22em] text-white uppercase">
              AFFILIATIONS
            </span>
            <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/70" />
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-white/40" />
          </div>

          {/* Section Main Title matching Sky Wardens Typography */}
          <div className="w-full flex justify-center py-0.5">
            <svg
              viewBox="0 0 820 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[580px] sm:max-w-[720px] md:max-w-[820px] h-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              aria-label="PARTNERSHIPS WITH PURPOSE"
            >
              <defs>
                {/* Standard Logo Blue Metallic Gradient */}
                <linearGradient id="partLogoShieldBlueSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7ec8ff" />
                  <stop offset="30%" stopColor="#48a2f0" />
                  <stop offset="70%" stopColor="#247bc4" />
                  <stop offset="100%" stopColor="#1a64a0" />
                </linearGradient>

                {/* Titanium White Steel Static Gradient */}
                <linearGradient id="partLogoTitaniumSteelSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#f1f5f9" />
                  <stop offset="70%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>

              <text
                x="50%"
                y="42"
                textAnchor="middle"
                fontFamily="var(--font-oxanium), 'Rajdhani', 'Anton', sans-serif"
                fontSize="42"
                fontWeight="900"
                letterSpacing="0.08em"
              >
                <tspan fill="url(#partLogoShieldBlueSheen)">PARTNERSHIPS </tspan>
                <tspan fill="url(#partLogoTitaniumSteelSheen)">WITH </tspan>
                <tspan fill="url(#partLogoShieldBlueSheen)">PURPOSE</tspan>
              </text>
            </svg>
          </div>

          {/* Subtitle Description */}
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl text-center">
            Sky Wardens works with government bodies, industrial partners, and engineering institutions. Every relationship is chosen deliberately and built to last.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2-ROW INFINITE SLOW CONCENTRIC CIRCULAR BADGE MARQUEE                     */}
        {/* ========================================================================= */}
        <div className="relative w-full overflow-hidden py-4 sm:py-6 space-y-5 sm:space-y-6">
          
          {/* ROW 1: 8 Sovereign & Institutional Partners (Moving Smoothly Left) */}
          <div className="flex overflow-hidden relative w-full">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 42 }}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-nowrap will-change-transform pr-2 sm:pr-3 md:pr-4"
            >
              {[...row1Partners, ...row1Partners].map((card, idx) => (
                <CircularPartnerBadge key={`row1-${card.id}-${idx}`} card={card} />
              ))}
            </motion.div>
          </div>

          {/* ROW 2: 8 Strategic & Industrial Partners (Moving Smoothly Right/Offset) */}
          <div className="flex overflow-hidden relative w-full">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 46 }}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-nowrap will-change-transform pr-2 sm:pr-3 md:pr-4"
            >
              {[...row2Partners, ...row2Partners].map((card, idx) => (
                <CircularPartnerBadge key={`row2-${card.id}-${idx}`} card={card} />
              ))}
            </motion.div>
          </div>

        </div>

        {/* Learn More Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center pt-2 pb-2"
        >
          <Link
            href="/partnerships"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-white hover:bg-white/[0.1] hover:border-sky-400/60 hover:text-sky-300 text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_20px_rgba(2,132,199,0.3)] hover:-translate-y-0.5"
          >
            <span>Learn More</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
