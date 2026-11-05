"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowLeft, Globe } from "lucide-react";

const AFFILIATIONS_LETTERS = ["A", "F", "F", "I", "L", "I", "A", "T", "I", "O", "N", "S"];

function AffiliationScrollLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.04 + index * 0.075;
  const end = Math.min(start + 0.18, 0.94);

  const x = useTransform(progress, [start, end], ["65vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.75, 1], { clamp: true });

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform pb-2"
    >
      {char}
    </motion.span>
  );
}

function RevealWord({
  text,
  range,
  progress,
}: {
  text: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const color = useTransform(
    progress,
    [range[0] - 0.05, range[0], range[1]],
    ["rgba(255, 255, 255, 0.28)", "rgba(255, 255, 255, 0.28)", "rgba(255, 255, 255, 1)"],
    { clamp: true }
  );
  const opacity = useTransform(
    progress,
    [range[0] - 0.05, range[0], range[1]],
    [0.35, 0.35, 1],
    { clamp: true }
  );

  return (
    <motion.span
      style={{ color, opacity }}
      className="inline-block transition-colors will-change-transform"
    >
      {text}
    </motion.span>
  );
}

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
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const headingRevealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingRevealProgress } = useScroll({
    target: headingRevealRef,
    offset: ["start 80%", "end 45%"],
  });
  const smoothHeadingProgress = useSpring(headingRevealProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTrackRef,
    offset: ["start start", "end end"],
  });
  const mobileProgress = useSpring(mobileScrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(scrollYProgressSpring, [0, 0.08], [1, 0]);

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
      image: "/images/tactical-defense-operator.jpg",
      paragraphs: [
        "Sky Wardens works in alignment with government entities, national bodies, and mission-critical sectors to ensure that every capability we support is relevant, dependable, and operationally meaningful. Our engagement model is shaped around sovereign requirements, regional priorities, and the practical demands of modern defence and security environments.",
        "We support programs where performance, reliability, and deployment relevance are non-negotiable. This includes collaboration across strategic segments tied to national defence preparedness, force modernisation, infrastructure protection, and long-term capability development. Our role is defined by disciplined execution, confidentiality, and an understanding that defence systems must ultimately serve real operational needs under demanding conditions.",
        "By working closely with government stakeholders and aligned institutions, Sky Wardens helps ensure that technologies are not only advanced in concept, but productive, useful, and calibrated to the utmost requirements of the country and region they are intended to serve."
      ]
    },
    {
      id: "industrial-capability",
      title: "Industrial Capability Partnerships",
      image: "/images/industrial-proving-grounds.jpg",
      paragraphs: [
        "Sky Wardens maintains industrial technology collaborations and alliances with leading engineering companies operating across advanced defence and strategic manufacturing domains. Through these partnerships, we engage in the development, integration, and advancement of capabilities across a focused set of mission areas.",
        "These areas include artillery and missile systems, AI-enabled guided shells, drones and loitering munitions, and battlefield mapping supported by predictive AI frameworks. Our collaboration model brings together industrial engineering depth, systems integration experience, and technology specialization to support scalable and future-relevant defence capability.",
        "We approach these partnerships as long-term industrial relationships rather than isolated project engagements. The objective is to build enduring technical competence, resilient supply alignment, and integrated development pathways that can support evolving operational requirements while maintaining appropriate discretion around program-level detail."
      ]
    },
    {
      id: "aerospace-advanced",
      title: "Aerospace and Advanced System Alliances",
      image: "/images/stealth-fighter-hangar.jpg",
      paragraphs: [
        "Sky Wardens works with specialized engineering and technology partners across aerospace and airborne systems, supporting advanced capability domains where stability, sensing, targeting, and processing performance are critical.",
        "Our aerospace-aligned engagements include aircraft systems such as optical electronic systems, stabilized guided weapons, image processing modules, air target lock-on and tracking modules, and stabilized suspension systems for radar antennas used on helicopters and UAV platforms. In parallel, our broader systems exposure also extends into naval and cross-domain defence technologies, including remote weapon station architectures, optical electronic systems, radar channel antenna posts, instrument TOI, visual observation channels, GPAP hardware and software systems, angular deformation measurement systems, and TAD-configured subsystems.",
        "These alliances are built around precision engineering, integration discipline, and mission adaptability. We deliberately maintain a low-signature communication posture around platform specifics, while continuing to deepen our role in the ecosystem of advanced air, naval, and multi-domain defence technologies."
      ]
    },
    {
      id: "global-capability",
      title: "Global Capability Integration",
      image: "/images/news-advanced-systems.jpg",
      paragraphs: [
        "Sky Wardens operates with active status in India, West Africa, and the Middle East, with further expansion planned as we continue to develop strategic relationships across emerging and established defence markets. This presence enables us to engage across multiple operational environments, understand diverse security requirements, and align capability development with regional realities.",
        "Our international posture is not defined by scale alone, but by selective integration with the right institutional, industrial, and technical ecosystems. This allows Sky Wardens to connect local requirement understanding with broader engineering collaboration, industrial partnerships, and advanced capability access.",
        "As our footprint grows, our focus remains consistent: build discreetly, collaborate selectively, and strengthen defence-relevant capability where it matters most. We believe meaningful expansion in this sector comes not from visibility, but from trust, technical seriousness, and sustained strategic relevance."
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#010309] text-white">

      {/* ── 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) ── */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[240vh] select-none">
        <div className="sticky top-14 z-30 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">
          {/* Tactical Image Box matching Defence and Aerospace exact layout */}
          <div className="relative w-full max-w-[420px] mx-auto">
            {/* Responsive Only: Back to Home Button at Top-Left of Image */}
            <div className="absolute top-2.5 left-2.5 z-40 pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 h-7 px-2.5 text-[10px] xs:text-[10.5px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#040814]/90 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto whitespace-nowrap"
              >
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
                <span>BACK TO HOME</span>
              </Link>
            </div>
            <Image
              src="/images/news-strategic-alliances.jpg"
              alt="Strategic Alliances & Affiliations"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
              sizes="(max-width: 640px) 100vw"
            />

            {/* AFFILIATIONS Letters Over The Image (Centered exactly where image ends, like Defence) */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[28%]">
              <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
                {AFFILIATIONS_LETTERS.map((char, index) => (
                  <AffiliationScrollLetter
                    key={index}
                    char={char}
                    index={index}
                    total={AFFILIATIONS_LETTERS.length}
                    progress={mobileProgress}
                  />
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP CINEMATIC STICKY SCROLL TRACK (hidden sm:block - Same as Defence) */}
      {/* ========================================================================= */}
      <div ref={heroRef} className="hidden sm:block relative w-full h-[180vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">
          
          {/* Tactical Operator & Alliances Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/news-strategic-alliances.jpg"
              alt="Strategic Alliances & Affiliations"
              fill
              priority
              className="object-cover object-center brightness-95 contrast-105"
              sizes="100vw"
            />
            {/* Subtle Top Gradient for Navbar legibility & Dark Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 via-transparent to-[#030712]/50 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/85 to-transparent pointer-events-none" />
          </div>

          {/* Desktop Back to Home Button */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-14 z-30 pointer-events-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1.5 px-3.5 rounded-lg bg-[#040814]/80 hover:bg-[#071329] border border-cyan-400/30 hover:border-cyan-300/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
              <span>BACK TO HOME</span>
            </Link>
          </div>

          {/* Top Spacer with Scroll Hint exactly like Defence */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-end pb-8">
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="pointer-events-none flex flex-col items-center gap-2 select-none"
            >
              <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-sky-300/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Scroll to Reveal
              </span>
              <div className="w-5 h-8 rounded-full border border-sky-400/40 flex items-start justify-center p-1 bg-black/30 backdrop-blur-sm">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-sky-300"
                />
              </div>
            </motion.div>
          </div>

          {/* Lower Content Block: Monumental AFFILIATIONS Letters Assembled from Right on Scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 sm:pb-3 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[15vw] md:text-[16vw] lg:text-[16.5vw] xl:text-[17vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.80] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-3 sm:-mb-4 md:-mb-5 lg:-mb-6 block overflow-visible"
            >
              {AFFILIATIONS_LETTERS.map((char, index) => (
                <AffiliationScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  total={AFFILIATIONS_LETTERS.length}
                  progress={scrollYProgressSpring}
                />
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 pt-2 sm:pt-16 pb-6 sm:pb-12 overflow-x-hidden">

        {/* Animated Defence Cyber Wireframe Background */}
        <div className="absolute top-0 inset-x-0 h-[750px] overflow-hidden pointer-events-none flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 w-[1000px] h-[480px] bg-gradient-to-b from-cyan-500/20 via-sky-600/10 to-transparent blur-[160px] rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 0.95, 1], opacity: [0.10, 0.20, 0.08, 0.10] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-36 w-[650px] h-[340px] bg-red-600/15 blur-[140px] rounded-full"
          />

          <svg viewBox="0 0 1000 600" className="w-full max-w-[1300px] h-full opacity-60">
            <defs>
              <linearGradient id="laserRedAnimated2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#dc2626" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wireGridAnimated2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#082f49" stopOpacity="0.05" />
              </linearGradient>
              <filter id="glowCyan2" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glowRed2" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <motion.ellipse cx="500" cy="300" rx="460" ry="255" fill="none" stroke="url(#wireGridAnimated2)" strokeWidth="1.5" strokeDasharray="8 6"
              animate={{ strokeDashoffset: [0, -200], opacity: [0.4, 0.7, 0.4] }}
              transition={{ strokeDashoffset: { duration: 25, repeat: Infinity, ease: "linear" }, opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            />
            <ellipse cx="500" cy="300" rx="410" ry="185" fill="none" stroke="url(#wireGridAnimated2)" strokeWidth="1.2" />
            <ellipse cx="500" cy="300" rx="320" ry="115" fill="none" stroke="url(#wireGridAnimated2)" strokeWidth="1" strokeDasharray="5 5" />
            <ellipse cx="500" cy="300" rx="180" ry="48" fill="none" stroke="url(#wireGridAnimated2)" strokeWidth="0.9" />
            <ellipse cx="500" cy="300" rx="150" ry="255" fill="none" stroke="url(#wireGridAnimated2)" strokeWidth="1.2" />
            <ellipse cx="500" cy="300" rx="300" ry="255" fill="none" stroke="url(#wireGridAnimated2)" strokeWidth="1.2" />
            <line x1="40" y1="300" x2="960" y2="300" stroke="url(#wireGridAnimated2)" strokeWidth="1.2" />
            <line x1="500" y1="45" x2="500" y2="555" stroke="url(#wireGridAnimated2)" strokeWidth="1.2" />

            <motion.line x1="500" y1="300" x2="500" y2="10" stroke="url(#laserRedAnimated2)" strokeWidth="2.8" filter="url(#glowRed2)"
              animate={{ opacity: [0.6, 1, 0.6], strokeWidth: [2.2, 3.2, 2.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.line x1="500" y1="300" x2="240" y2="110" stroke="url(#laserRedAnimated2)" strokeWidth="2.2" filter="url(#glowRed2)"
              animate={{ opacity: [0.4, 0.95, 0.4], x2: [230, 250, 230], y2: [100, 120, 100] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.line x1="500" y1="300" x2="760" y2="110" stroke="url(#laserRedAnimated2)" strokeWidth="2.2" filter="url(#glowRed2)"
              animate={{ opacity: [0.4, 0.95, 0.4], x2: [770, 750, 770], y2: [100, 120, 100] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.circle cx="500" cy="45" r="8" fill="none" stroke="#ef4444" strokeWidth="1.5"
              animate={{ r: [4, 18], opacity: [0.9, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <circle cx="500" cy="45" r="4" fill="#ef4444" filter="url(#glowRed2)" />
            <motion.circle cx="240" cy="110" r="6" fill="none" stroke="#38bdf8" strokeWidth="1.2"
              animate={{ r: [3, 14], opacity: [0.8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            />
            <circle cx="240" cy="110" r="3.5" fill="#38bdf8" filter="url(#glowCyan2)" />
            <motion.circle cx="760" cy="110" r="6" fill="none" stroke="#38bdf8" strokeWidth="1.2"
              animate={{ r: [3, 14], opacity: [0.8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
            />
            <circle cx="760" cy="110" r="3.5" fill="#38bdf8" filter="url(#glowCyan2)" />
            <circle cx="500" cy="300" r="4.5" fill="#ffffff" filter="url(#glowCyan2)" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5 space-y-4 sm:space-y-12">

          {/* Section Header with Word-by-Word Scroll Reveal and Centered Layout */}
          <div ref={headingRevealRef} className="space-y-3 sm:space-y-4 text-center flex flex-col items-center justify-center pt-1 pb-1 sm:pb-4">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                AFFILIATIONS
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight select-none">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <RevealWord text="INDUSTRIAL" range={[0.05, 0.35]} progress={smoothHeadingProgress} />
                <RevealWord text="RELATIONSHIPS." range={[0.25, 0.55]} progress={smoothHeadingProgress} />
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap mt-1">
                <RevealWord text="GLOBAL" range={[0.50, 0.75]} progress={smoothHeadingProgress} />
                <RevealWord text="CAPABILITY." range={[0.70, 0.95]} progress={smoothHeadingProgress} />
              </div>
            </h1>
          </div>

          {/* Strategic Dossier Cards - Large Prominent Image & Balanced Data (Matching Second Image) */}
          <div className="space-y-6 sm:space-y-12 lg:space-y-16 pt-0 sm:pt-6">
            {strategicDossiers.map((dossier, idx) => (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pb-6 sm:pb-12 lg:pb-16 border-b border-white/10 group last:border-b-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-14 items-start relative z-10">
                  {/* Left Column: Big Prominent Image */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#08101e] border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group-hover:border-cyan-400/50 transition-all duration-500">
                      <Image
                        src={dossier.image}
                        alt={dossier.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/70 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Right Column: Title + Paragraphs (Proper Data Spacing) */}
                  <div className="lg:col-span-6 flex flex-col justify-start space-y-3 sm:space-y-5 lg:pl-2">
                    <div>
                      <h2 className="text-xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-tight text-white">
                        {dossier.title}
                      </h2>
                    </div>

                    <div className="space-y-2.5 sm:space-y-4 text-slate-300 text-xs sm:text-[15px] lg:text-base leading-relaxed font-normal">
                      {dossier.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-slate-300/95 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Affiliations Update Banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-white/10 bg-[#070e1c]/60 backdrop-blur-xl px-6 py-7 sm:px-10 sm:py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] mt-6"
            >
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

        </div>
      </div>
    </div>
  );
}
