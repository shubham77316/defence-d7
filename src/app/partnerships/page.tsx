"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Globe, Lock } from "lucide-react";

// --- Vector Logos matching the reference aesthetic ---
function LogoIafCrest() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <path d="M 30 8 L 34 8 L 33 13 L 31 13 Z" fill="#fbbf24" />
        <path d="M 32 18 C 22 14 10 22 8 28 C 16 26 24 26 32 32 C 40 26 48 26 56 28 C 54 22 42 14 32 18 Z" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1" />
        <circle cx="32" cy="40" r="14" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="32" cy="40" r="9" fill="#ffffff" />
        <circle cx="32" cy="40" r="4.5" fill="#16a34a" />
        <path d="M 16 48 Q 32 58 48 48" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase mt-1">IAF</span>
    </div>
  );
}

function LogoArmyCrest() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <path d="M 28 8 L 36 8 L 35 18 L 29 18 Z M 25 12 L 39 12 M 26 18 L 38 18 L 36 24 L 28 24 Z" fill="#facc15" stroke="#eab308" strokeWidth="0.8" />
        <circle cx="32" cy="22" r="2" fill="#1e3a8a" />
        <line x1="12" y1="52" x2="52" y2="24" stroke="#facc15" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="52" y1="52" x2="12" y2="24" stroke="#facc15" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="14" cy="50" r="2.5" fill="#ca8a04" />
        <circle cx="50" cy="50" r="2.5" fill="#ca8a04" />
        <path d="M 10 46 L 18 54" stroke="#eab308" strokeWidth="2" />
        <path d="M 54 46 L 46 54" stroke="#eab308" strokeWidth="2" />
      </svg>
      <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase mt-1">ARMY</span>
    </div>
  );
}

function LogoIsroCrest() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 54" fill="none" className="w-16 h-10">
        <path d="M 50 4 L 46 28 L 50 24 L 54 28 Z" fill="#f97316" />
        <line x1="32" y1="20" x2="68" y2="20" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="50" y1="24" x2="50" y2="40" stroke="#f97316" strokeWidth="2.4" strokeLinecap="round" />
        <text x="32" y="44" fill="#f97316" fontSize="11" fontFamily="sans-serif" fontWeight="bold">इसरो</text>
        <text x="64" y="44" fill="#0284c7" fontSize="11" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.05em">isro</text>
      </svg>
      <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase mt-1">ISRO</span>
    </div>
  );
}

function LogoCsirCsio() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center bg-cyan-950/30">
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
          <circle cx="16" cy="16" r="10" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 1.5" />
          <circle cx="16" cy="16" r="4" fill="#38bdf8" />
          <line x1="16" y1="2" x2="16" y2="30" stroke="#38bdf8" strokeWidth="1" />
          <line x1="2" y1="16" x2="30" y2="16" stroke="#38bdf8" strokeWidth="1" />
        </svg>
      </div>
      <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase mt-1">CSIR-CSIO</span>
    </div>
  );
}

function LogoAirblades() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <div className="flex flex-col items-center justify-center">
        <svg viewBox="0 0 80 32" fill="none" className="w-12 h-6">
          <circle cx="40" cy="16" r="3" fill="#ffffff" />
          <path d="M 40 13 Q 40 2 46 4 Q 44 12 40 14" fill="#ffffff" />
          <path d="M 37 18 Q 26 24 28 29 Q 36 24 38 18" fill="#ffffff" />
          <path d="M 43 18 Q 54 24 52 29 Q 44 24 42 18" fill="#ffffff" />
        </svg>
        <span className="text-xs font-black italic tracking-wider text-white uppercase font-sans">
          Airblades
        </span>
      </div>
    </div>
  );
}

function LogoAndurax() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <svg viewBox="0 0 60 36" fill="none" className="w-12 h-7">
        <polygon points="4,20 28,6 56,16 42,26 28,18" fill="#ffffff" opacity="0.9" />
        <polygon points="28,18 42,26 34,32 16,26" fill="#94a3b8" />
      </svg>
      <span className="text-xs font-bold tracking-tight text-white font-sans mt-0.5">
        AnduraX
      </span>
    </div>
  );
}

function LogoBharatForge() {
  return (
    <div className="flex items-center gap-2 p-2 group hover:scale-105 transition-transform">
      <span className="text-xs font-black tracking-widest text-white uppercase font-sans">
        BHARAT FORGE
      </span>
      <span className="text-[9px] font-mono text-cyan-300 font-bold uppercase">KALYANI</span>
    </div>
  );
}

function LogoCentum() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <div className="w-8 h-8 rounded-full border border-cyan-400 flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded-full bg-cyan-400/40" />
      </div>
      <span className="text-[9px] font-mono text-cyan-300 font-bold uppercase mt-1">CENTUM T&S</span>
    </div>
  );
}

function LogoTas() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <span className="text-base font-black tracking-widest text-amber-400 font-sans">TAS</span>
      <span className="text-[8px] font-mono text-slate-400 uppercase">Throttle Aero</span>
    </div>
  );
}

function LogoVigyanlabs() {
  return (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform">
      <span className="text-sm font-extrabold tracking-tight text-white font-sans">VIGYANLABS</span>
      <span className="text-[8px] font-mono text-cyan-300 uppercase">Innovations</span>
    </div>
  );
}

export default function PartnershipsPage() {
  const partnerLogos = [
    { name: "Indian Air Force", component: LogoIafCrest },
    { name: "Indian Army", component: LogoArmyCrest },
    { name: "ISRO", component: LogoIsroCrest },
    { name: "CSIR-CSIO", component: LogoCsirCsio },
    { name: "Airblades", component: LogoAirblades },
    { name: "AnduraX", component: LogoAndurax },
    { name: "Bharat Forge", component: LogoBharatForge },
    { name: "Centum T&S", component: LogoCentum },
    { name: "TAS", component: LogoTas },
    { name: "Vigyanlabs", component: LogoVigyanlabs },
  ];

  const strategicDossiers = [
    {
      id: "gov-aligned",
      title: "Government Aligned Strategic Program",
      paragraphs: [
        "Sky Wardens works in alignment with government entities, national bodies, and mission-critical sectors to ensure that every capability we support is relevant, dependable, and operationally meaningful. Our engagement model is shaped around sovereign requirements, regional priorities, and the practical demands of modern defence and security environments.",
        "We support programs where performance, reliability, and deployment relevance are non-negotiable. This includes collaboration across strategic segments tied to national defence preparedness, force modernisation, infrastructure protection, and long-term capability development. Our role is defined by disciplined execution, confidentiality, and an understanding that defence systems must ultimately serve real operational needs under demanding conditions.",
        "By working closely with government stakeholders and aligned institutions, Sky Wardens helps ensure that technologies are not only advanced in concept, but productive, useful, and calibrated to the utmost requirements of the country and region they are intended to serve."
      ]
    },
    {
      id: "industrial-capability",
      title: "Industrial Capability Partnerships",
      paragraphs: [
        "Sky Wardens maintains industrial technology collaborations and alliances with leading engineering companies operating across advanced defence and strategic manufacturing domains. Through these partnerships, we engage in the development, integration, and advancement of capabilities across a focused set of mission areas.",
        "These areas include artillery and missile systems, AI-enabled guided shells, drones and loitering munitions, and battlefield mapping supported by predictive AI frameworks. Our collaboration model brings together industrial engineering depth, systems integration experience, and technology specialization to support scalable and future-relevant defence capability.",
        "We approach these partnerships as long-term industrial relationships rather than isolated project engagements. The objective is to build enduring technical competence, resilient supply alignment, and integrated development pathways that can support evolving operational requirements while maintaining appropriate discretion around program-level detail."
      ]
    },
    {
      id: "aerospace-advanced",
      title: "Aerospace and Advanced System Alliances",
      paragraphs: [
        "Sky Wardens works with specialized engineering and technology partners across aerospace and airborne systems, supporting advanced capability domains where stability, sensing, targeting, and processing performance are critical.",
        "Our aerospace-aligned engagements include aircraft systems such as optical electronic systems, stabilized guided weapons, image processing modules, air target lock-on and tracking modules, and stabilized suspension systems for radar antennas used on helicopters and UAV platforms. In parallel, our broader systems exposure also extends into naval and cross-domain defence technologies, including remote weapon station architectures, optical electronic systems, radar channel antenna posts, instrument TOI, visual observation channels, GPAP hardware and software systems, angular deformation measurement systems, and TAD-configured subsystems.",
        "These alliances are built around precision engineering, integration discipline, and mission adaptability. We deliberately maintain a low-signature communication posture around platform specifics, while continuing to deepen our role in the ecosystem of advanced air, naval, and multi-domain defence technologies."
      ]
    },
    {
      id: "global-capability",
      title: "Global Capability Integration",
      paragraphs: [
        "Sky Wardens operates with active status in India, West Africa, and the Middle East, with further expansion planned as we continue to develop strategic relationships across emerging and established defence markets. This presence enables us to engage across multiple operational environments, understand diverse security requirements, and align capability development with regional realities.",
        "Our international posture is not defined by scale alone, but by selective integration with the right institutional, industrial, and technical ecosystems. This allows Sky Wardens to connect local requirement understanding with broader engineering collaboration, industrial partnerships, and advanced capability access.",
        "As our footprint grows, our focus remains consistent: build discreetly, collaborate selectively, and strengthen defence-relevant capability where it matters most. We believe meaningful expansion in this sector comes not from visibility, but from trust, technical seriousness, and sustained strategic relevance."
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#010309] text-white pt-24 pb-28 overflow-hidden">
      
      {/* High-End Animated Defense Cyber Wireframe & Laser Canvas */}
      <div className="absolute top-0 inset-x-0 h-[750px] overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Dynamic Breathing Ambient Auroras */}
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-16 w-[1000px] h-[480px] bg-gradient-to-b from-cyan-500/20 via-sky-600/10 to-transparent blur-[160px] rounded-full" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.25, 0.95, 1],
            opacity: [0.10, 0.20, 0.08, 0.10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-36 w-[650px] h-[340px] bg-red-600/15 blur-[140px] rounded-full" 
        />

        {/* Tactical HUD Coordinate Grid Elements */}
        <div className="absolute top-8 left-8 text-[9px] font-mono text-cyan-400/40 tracking-widest hidden lg:block select-none">
          <div>[GEO-LATTICE // 44.02° N : 77.20° E]</div>
          <div>[ORBIT-SYNC // 32.4 GHz CARRIER]</div>
        </div>
        <div className="absolute top-8 right-8 text-[9px] font-mono text-red-400/40 tracking-widest text-right hidden lg:block select-none">
          <div>[TARGETING LASERS // NOMINAL]</div>
          <div>[SEC-CLEARANCE // ACTIVE]</div>
        </div>

        {/* 3D Wireframe Geodesic Globe Canvas with Motion Animations */}
        <svg viewBox="0 0 1000 600" className="w-full max-w-[1300px] h-full opacity-60">
          <defs>
            {/* Pulsing Red Laser Gradient */}
            <linearGradient id="laserRedAnimated" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
            </linearGradient>

            {/* Glowing Cyan Wireframe Grid Gradient */}
            <linearGradient id="wireGridAnimated" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.05" />
            </linearGradient>

            {/* Subtle Cyan Glow Filter */}
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Red Laser Glow Filter */}
            <filter id="glowRed" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rotating Equatorial Orbit Ring */}
          <motion.ellipse
            cx="500"
            cy="300"
            rx="460"
            ry="255"
            fill="none"
            stroke="url(#wireGridAnimated)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            animate={{
              strokeDashoffset: [0, -200],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              strokeDashoffset: { duration: 25, repeat: Infinity, ease: "linear" },
              opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Inner Latitude Arcs */}
          <ellipse cx="500" cy="300" rx="410" ry="185" fill="none" stroke="url(#wireGridAnimated)" strokeWidth="1.2" />
          <ellipse cx="500" cy="300" rx="320" ry="115" fill="none" stroke="url(#wireGridAnimated)" strokeWidth="1" strokeDasharray="5 5" />
          <ellipse cx="500" cy="300" rx="180" ry="48" fill="none" stroke="url(#wireGridAnimated)" strokeWidth="0.9" />

          {/* Longitude Meridians */}
          <ellipse cx="500" cy="300" rx="150" ry="255" fill="none" stroke="url(#wireGridAnimated)" strokeWidth="1.2" />
          <ellipse cx="500" cy="300" rx="300" ry="255" fill="none" stroke="url(#wireGridAnimated)" strokeWidth="1.2" />
          <line x1="40" y1="300" x2="960" y2="300" stroke="url(#wireGridAnimated)" strokeWidth="1.2" />
          <line x1="500" y1="45" x2="500" y2="555" stroke="url(#wireGridAnimated)" strokeWidth="1.2" />

          {/* Dynamic Laser Beams with Pulse Animations */}
          {/* Main Apex Red Beam */}
          <motion.line
            x1="500"
            y1="300"
            x2="500"
            y2="10"
            stroke="url(#laserRedAnimated)"
            strokeWidth="2.8"
            filter="url(#glowRed)"
            animate={{
              opacity: [0.6, 1, 0.6],
              strokeWidth: [2.2, 3.2, 2.2]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Secondary Red Beams */}
          <motion.line
            x1="492"
            y1="300"
            x2="480"
            y2="30"
            stroke="url(#laserRedAnimated)"
            strokeWidth="1.8"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.line
            x1="508"
            y1="300"
            x2="520"
            y2="30"
            stroke="url(#laserRedAnimated)"
            strokeWidth="1.8"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Sweeping Angled Laser Vectors */}
          <motion.line
            x1="500"
            y1="300"
            x2="240"
            y2="110"
            stroke="url(#laserRedAnimated)"
            strokeWidth="2.2"
            filter="url(#glowRed)"
            animate={{
              opacity: [0.4, 0.95, 0.4],
              x2: [230, 250, 230],
              y2: [100, 120, 100]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="500"
            y1="300"
            x2="760"
            y2="110"
            stroke="url(#laserRedAnimated)"
            strokeWidth="2.2"
            filter="url(#glowRed)"
            animate={{
              opacity: [0.4, 0.95, 0.4],
              x2: [770, 750, 770],
              y2: [100, 120, 100]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.line
            x1="500"
            y1="300"
            x2="140"
            y2="210"
            stroke="url(#laserRedAnimated)"
            strokeWidth="1.6"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
          <motion.line
            x1="500"
            y1="300"
            x2="860"
            y2="210"
            stroke="url(#laserRedAnimated)"
            strokeWidth="1.6"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          />

          {/* Lower Trajectory Beams */}
          <line x1="500" y1="300" x2="330" y2="490" stroke="url(#laserRedAnimated)" strokeWidth="1.4" opacity="0.4" />
          <line x1="500" y1="300" x2="670" y2="490" stroke="url(#laserRedAnimated)" strokeWidth="1.4" opacity="0.4" />

          {/* Glowing Pulse Rings around Critical Coordinates */}
          <motion.circle
            cx="500"
            cy="45"
            r="8"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            animate={{
              r: [4, 18],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <circle cx="500" cy="45" r="4" fill="#ef4444" filter="url(#glowRed)" />

          <motion.circle
            cx="240"
            cy="110"
            r="6"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.2"
            animate={{
              r: [3, 14],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.4
            }}
          />
          <circle cx="240" cy="110" r="3.5" fill="#38bdf8" filter="url(#glowCyan)" />

          <motion.circle
            cx="760"
            cy="110"
            r="6"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.2"
            animate={{
              r: [3, 14],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.8
            }}
          />
          <circle cx="760" cy="110" r="3.5" fill="#38bdf8" filter="url(#glowCyan)" />

          <circle cx="140" cy="210" r="3" fill="#38bdf8" opacity="0.7" />
          <circle cx="860" cy="210" r="3" fill="#38bdf8" opacity="0.7" />
          <circle cx="500" cy="300" r="4.5" fill="#ffffff" filter="url(#glowCyan)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 hover:text-white uppercase tracking-wider transition-colors py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/40"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
              AFFILIATIONS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
            INDUSTRIAL RELATIONSHIPS. <br />
            GLOBAL CAPABILITY.
          </h1>
        </motion.div>

        {/* Logo Affiliations Row - Infinite Smooth Rightward Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative py-4 border-y border-white/10 bg-[#060a14]/75 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
          {/* Left & Right Gradient Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#010309] via-[#010309]/80 to-transparent z-20 pointer-events-none rounded-l-2xl" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#010309] via-[#010309]/80 to-transparent z-20 pointer-events-none rounded-r-2xl" />

          {/* Continuous Infinite Marquee Track Moving to RIGHT (->) */}
          <div className="flex overflow-hidden select-none">
            <motion.div
              className="flex items-center gap-10 sm:gap-16 flex-nowrap"
              animate={{
                x: ["-50%", "0%"]
              }}
              transition={{
                duration: 48,
                ease: "linear",
                repeat: Infinity
              }}
            >
              {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((p, idx) => {
                const Comp = p.component;
                return (
                  <div key={`marquee-${idx}`} className="flex-shrink-0">
                    <Comp />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Strategic Dossier Cards matching Image 2 and Image 3 */}
        <div className="space-y-8 pt-4">
          {strategicDossiers.map((dossier, idx) => (
            <motion.div
              key={dossier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl bg-[#060a14]/90 border border-white/10 hover:border-cyan-400/40 p-6 sm:p-10 backdrop-blur-2xl transition-all duration-300 shadow-[0_16px_50px_rgba(0,0,0,0.8)] overflow-hidden group"
            >
              {/* Top Accent Gradient Runner Line */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-75 group-hover:opacity-100 group-hover:via-cyan-300 transition-all duration-300" />

              {/* Ambient Radiant Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 relative z-10">
                
                {/* Left Column: Title */}
                <div className="lg:col-span-4 flex flex-col justify-start">
                  <div className="inline-block">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30 mb-3 inline-block">
                      PROGRAM 0{idx + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                      {dossier.title}
                    </h2>
                  </div>
                </div>

                {/* Right Column: In-depth Descriptive Paragraphs */}
                <div className="lg:col-span-8 space-y-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  {dossier.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-300/95 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

          {/* Affiliations Update Elegant Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-white/10 bg-[#070e1c]/60 backdrop-blur-xl px-6 py-7 sm:px-10 sm:py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] mt-6"
          >
            {/* Subtle Softer Corner Accents */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-400/30" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-sky-400/30" />

            <div className="text-xs sm:text-[13px] font-sans font-semibold tracking-wider text-[#7ec8ff] uppercase mb-2.5">
              AFFILIATIONS UPDATE
            </div>
            <p className="text-slate-300 font-sans text-xs sm:text-[13.5px] md:text-sm font-normal tracking-wide uppercase max-w-3xl mx-auto leading-relaxed">
              NEW PRODUCTS WITH OUR VARIOUS PARTNERS (ALL TYPES OF INSTITUTIONS LISTED) ARE CURRENTLY UNDER DESIGN &amp; EVALUATION, AND WILL BE ADDED AS THEY ARE CLEARED FOR RELEASE.
            </p>
          </motion.div>
        </div>

        {/* Security & Confidentiality Notice Footer Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#7ec8ff]" />
            <span>RESTRICTED REPOSITORY // NDAS &amp; SOVEREIGN CLEARANCE PROTOCOLS ACTIVE</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[#7ec8ff] hover:text-white font-sans font-semibold transition-colors uppercase tracking-wider"
          >
            <span>Initiate Sovereign Partnership Dialogue</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
