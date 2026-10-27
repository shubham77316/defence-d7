"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SectorCard {
  id: string;
  number: string;
  title: string;
  tagline: string;
  desc: string;
  linkText: string;
  href: string;
  bgImage: string;
  normalBorder: string;
  hoverBorder: string;
  accentText: string;
  logoGlow?: string;
  renderLogo: () => React.ReactNode;
}

const renderAerospaceLogo = () => (
  <div className="relative flex items-center justify-center py-2">
    <svg
      className="w-28 h-28 sm:w-32 sm:h-32 transition-all duration-500 ease-out relative z-10 cursor-pointer"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="capAeroBlueGrad" x1="120" y1="12" x2="120" y2="208" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a5ddff" />
          <stop offset="30%" stopColor="#60b7ff" />
          <stop offset="70%" stopColor="#2e93e6" />
          <stop offset="100%" stopColor="#1b6fad" />
        </linearGradient>
      </defs>
      <path d="M 120 12 L 216 155 L 180 136 L 120 56 L 60 136 L 24 155 Z" fill="url(#capAeroBlueGrad)" />
      <path d="M 54 178 C 76 148 134 134 175 148 C 145 142 88 152 54 178 Z" fill="url(#capAeroBlueGrad)" opacity="0.95" />
      <path d="M 0 208 C 30 162 90 148 120 148 C 150 148 210 162 240 208 L 214 208 C 188 174 144 162 120 162 C 96 162 52 174 26 208 Z" fill="url(#capAeroBlueGrad)" />
    </svg>
  </div>
);

const renderDefenceLogo = () => (
  <div className="relative flex items-center justify-center py-2">
    <svg
      className="w-28 h-28 sm:w-32 sm:h-32 transition-all duration-500 ease-out relative z-10 cursor-pointer"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="capDefOliveGrad" x1="25" y1="30" x2="120" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a3e635" />
          <stop offset="0.5" stopColor="#65a30d" />
          <stop offset="1" stopColor="#3f6212" />
        </linearGradient>
        <linearGradient id="capDefBronzeGrad" x1="58" y1="30" x2="112" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="0.5" stopColor="#c2410c" />
          <stop offset="1" stopColor="#9a3412" />
        </linearGradient>
      </defs>
      <path d="M 52 32 L 20 98 L 34 98 L 46 72 L 66 72 L 74 88 L 88 88 L 62 32 Z M 52 56 L 60 72 L 48 72 Z" fill="url(#capDefOliveGrad)" />
      <path d="M 58 32 L 94 32 C 108 32 116 38 116 44 L 104 44 C 104 40 98 38 88 38 L 58 38 Z" fill="url(#capDefBronzeGrad)" />
      <path d="M 98 42 C 114 46 124 58 124 74 C 124 94 108 106 82 106 L 20 106 L 20 98 L 80 98 C 98 98 110 90 110 74 C 110 60 102 50 88 48 Z" fill="url(#capDefOliveGrad)" />
    </svg>
  </div>
);

const renderGenericLogo = (title: string) => (
  <div className="relative flex items-center justify-center py-2">
    <svg
      className="w-24 h-24 sm:w-28 sm:h-28 transition-all duration-500 ease-out relative z-10"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="70" cy="70" r="50" stroke="#7ec8ff" strokeWidth="2.5" opacity="0.8" strokeDasharray="6 4" />
      <circle cx="70" cy="70" r="26" fill="#0284c7" opacity="0.3" />
      <path d="M70 28 L84 62 L120 68 L94 92 L101 128 L70 110 L39 128 L46 92 L20 68 L56 62 Z" fill="#7ec8ff" opacity="0.9" />
    </svg>
  </div>
);

const DEFAULT_SECTORS: SectorCard[] = [
  {
    id: "aerospace",
    number: "SECTOR 01",
    title: "AEROSPACE",
    tagline: "Autonomous Aerial & Space Systems",
    desc: "Autonomous aerial systems, drone platforms, and aerospace-ready engineering developed for precision deployment.",
    linkText: "Explore Aerospace",
    href: "/aerospace",
    bgImage: "/images/aerospace-stealth-hangar.jpg",
    normalBorder: "border-sky-500/25",
    hoverBorder: "border-sky-400/90 shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    accentText: "text-sky-400",
    logoGlow: "",
    renderLogo: renderAerospaceLogo,
  },
  {
    id: "defence",
    number: "SECTOR 02",
    title: "DEFENCE",
    tagline: "Tactical & Protective Warfare",
    desc: "Protective systems, tactical gear, and operational defence equipment.",
    linkText: "Explore Defence",
    href: "/defence",
    bgImage: "/images/defence-card-bg.jpg",
    normalBorder: "border-lime-500/25",
    hoverBorder: "border-lime-400/90 shadow-[0_0_35px_rgba(163,230,53,0.25)]",
    accentText: "text-lime-400",
    logoGlow: "",
    renderLogo: renderDefenceLogo,
  },
];

export default function CapabilitiesPage() {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [sectors, setSectors] = useState<SectorCard[]>(DEFAULT_SECTORS);

  // Synchronize dynamic products/sectors from CMS
  const fetchSectors = async () => {
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mappedCards: SectorCard[] = json.data.map((item: any, idx: number) => {
            const num = `SECTOR ${String(idx + 1).padStart(2, "0")}`;
            const slug = (item.slug || item.id || item._id || "").toLowerCase();
            const titleUpper = (item.title || "SECTOR").toUpperCase();
            const bgImage = (item.image && typeof item.image === "string" && item.image.trim()) ? item.image.trim() : "";

            // 1. Aerospace Sector
            if (slug.includes("aerospace") || titleUpper.includes("AEROSPACE")) {
              return {
                id: slug || "aerospace",
                number: num,
                title: "AEROSPACE",
                tagline: "Autonomous Aerial & Space Systems",
                desc: item.excerpt || item.description || "Autonomous aerial systems, drone platforms, and aerospace-ready engineering developed for precision deployment.",
                linkText: "Explore Aerospace",
                href: "/aerospace",
                bgImage: bgImage || "/images/aerospace-stealth-hangar.jpg",
                normalBorder: "border-sky-500/25",
                hoverBorder: "border-sky-400/90 shadow-[0_0_35px_rgba(56,189,248,0.25)]",
                accentText: "text-sky-400",
                logoGlow: "",
                renderLogo: renderAerospaceLogo,
              };
            }

            // 2. Defence Sector
            if (slug.includes("defence") || titleUpper.includes("DEFENCE")) {
              return {
                id: slug || "defence",
                number: num,
                title: "DEFENCE",
                tagline: "Tactical & Protective Warfare",
                desc: item.excerpt || item.description || "Protective systems, tactical gear, and operational defence equipment.",
                linkText: "Explore Defence",
                href: "/defence",
                bgImage: bgImage || "/images/defence-card-bg.jpg",
                normalBorder: "border-lime-500/25",
                hoverBorder: "border-lime-400/90 shadow-[0_0_35px_rgba(163,230,53,0.25)]",
                accentText: "text-lime-400",
                logoGlow: "",
                renderLogo: renderDefenceLogo,
              };
            }

            // 3. Dynamic Products/Sectors added via CMS (e.g. VI, TEST, etc.)
            return {
              id: slug || `sector-${idx}`,
              number: num,
              title: titleUpper,
              tagline: item.category || "Specialized Sector",
              desc: item.excerpt || item.description || "Strategic industrial capability and engineering operations.",
              linkText: `Explore ${item.title}`,
              href: `/news/${slug}`,
              bgImage: bgImage || "/images/aerospace-stealth-hangar.jpg",
              normalBorder: "border-cyan-500/25",
              hoverBorder: "border-cyan-400/90 shadow-[0_0_35px_rgba(6,182,212,0.25)]",
              accentText: "text-cyan-400",
              logoGlow: "",
              renderLogo: () => renderGenericLogo(titleUpper),
            };
          });

          setSectors(mappedCards);
        }
      }
    } catch (err) {
      // Fallback
    }
  };

  useEffect(() => {
    fetchSectors();
    window.addEventListener("focus", fetchSectors);
    const interval = setInterval(fetchSectors, 3000);
    return () => {
      window.removeEventListener("focus", fetchSectors);
      clearInterval(interval);
    };
  }, []);

  // Scroll Container Ref for the kinetic heading & docking cards animation
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  // Silky smooth spring interpolation for scroll wheel gestures
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  // 1. Full-Screen Image Scroll Animation: starts fully visible, stays visible as scroll begins, then glides up and fades out
  const imageScrollOpacity = useTransform(smoothProgress, [0, 0.12, 0.38], [1, 1, 0]);
  const imageScrollScale = useTransform(smoothProgress, [0, 0.38], [1, 0.96]);
  const imageScrollY = useTransform(smoothProgress, [0, 0.38], [0, -70]);

  // 2. Heading vertical position & opacity:
  // At scroll = 0: ONLY the image is visible! Headline starts hidden below the viewport (105vh).
  // When user scrolls on the image: headline becomes visible and ascends smoothly to center (36vh) and docks at top (0vh)
  const headingOpacity = useTransform(smoothProgress, [0, 0.04], [0, 1]);
  const headingY = useTransform(smoothProgress, [0, 0.04, 0.35, 0.65, 1], ["105vh", "90vh", "36vh", "0vh", "0vh"]);

  // 3. Heading font color transitions across 3 distinct stages:
  // Stage 1 (entering from bottom): Signature Logo Light Blue #38bdf8 / #7ec8ff
  // Stage 2 (midway up): Ice Cyan / Slate Titanium #93c5fd / #cbd5e1
  // Stage 3 (at top/final): Pure Brilliant White #ffffff
  const headingColor = useTransform(
    smoothProgress,
    [0, 0.06, 0.35, 0.65, 1],
    ["#38bdf8", "#38bdf8", "#93c5fd", "#ffffff", "#ffffff"]
  );

  // 4. Category Tag & Subtitle fade in as heading settles at top
  const tagOpacity = useTransform(smoothProgress, [0.52, 0.65], [0, 1]);
  const subOpacity = useTransform(smoothProgress, [0.54, 0.68], [0, 1]);
  const subY = useTransform(smoothProgress, [0.54, 0.68], [14, 0]);

  // 5. Sector cards rise up smoothly from below and dock under heading
  const cardsY = useTransform(smoothProgress, [0.62, 0.88, 1], ["30vh", "0vh", "0vh"]);
  const cardsOpacity = useTransform(smoothProgress, [0.62, 0.82, 1], [0, 1, 1]);

  // 6. Initial scroll prompt on image (fades out as soon as user starts scrolling)
  const promptOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">

      {/* ======================================================== */}
      {/* SCROLL-DRIVEN ENTRANCE & DOCKING HERO TRACK              */}
      {/* ======================================================== */}
      <div ref={heroTrackRef} className="relative h-[230vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* ======================================================== */}
          {/* FULL-BLEED HERO IMAGE (Sized like Home Page Video)       */}
          {/* Drops in like a physical poster on page load             */}
          {/* ======================================================== */}
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              mass: 1.2,
              delay: 0.08,
            }}
            style={{
              opacity: imageScrollOpacity,
              scale: imageScrollScale,
              y: imageScrollY,
            }}
            className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none"
          >
            <Image
              src="/images/capabilities-aircraft-poster.jpg"
              alt="Strategic Aerospace Transport Aircraft"
              fill
              priority
              className="w-full h-full object-cover object-[center_42%] filter contrast-[1.08] brightness-[1.05]"
            />

            {/* Top Header Gradient (Protects Navbar) - Exact Match to Home Page */}
            <div className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-black/85 via-black/35 to-transparent pointer-events-none" />

            {/* Bottom Gradient (Protects Headline) - Exact Match to Home Page */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            {/* Left Contrast Gradient (Protects Left Typography) - Exact Match to Home Page */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent pointer-events-none" />

            {/* Tactical Caption Badge */}
            <div className="absolute bottom-8 left-6 sm:bottom-10 sm:left-10 lg:left-14 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030915]/85 border border-[#7ec8ff]/40 backdrop-blur-md shadow-lg pointer-events-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff] animate-pulse" />
              <span className="text-[#7ec8ff] font-oxanium text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase">
                SOVEREIGN AEROSPACE &bull; STRATEGIC AIRLIFT CAPABILITY
              </span>
            </div>
          </motion.div>

          {/* Initial Scroll Prompt situated cleanly near bottom (Fades out as soon as user scrolls) */}
          <motion.div
            style={{ opacity: promptOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none z-30"
          >
            <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#7ec8ff] uppercase drop-shadow-[0_0_8px_rgba(126,200,255,0.6)]">
              SCROLL DOWN TO EXPLORE
            </span>
            <span className="w-1.5 h-3 rounded-full bg-[#7ec8ff] animate-bounce" />
          </motion.div>

          {/* ======================================================== */}
          {/* MAIN HERO CONTENT (Headline + Sector Cards)              */}
          {/* ======================================================== */}
          <div className="relative w-full max-w-7xl mx-auto h-full flex flex-col justify-start pt-20 sm:pt-24 md:pt-28 pb-6 px-4 sm:px-6 lg:px-8 z-20 pointer-events-none">
            {/* Animated Headline Block (Starts completely hidden below screen, ascends on scroll) */}
            <motion.div
              style={{
                y: headingY,
                opacity: headingOpacity,
              }}
              className="relative space-y-3 sm:space-y-4 max-w-5xl"
            >
              {/* Category Tag */}
              <motion.div
                style={{ opacity: tagOpacity }}
                className="text-[#7ec8ff] font-mono text-xs sm:text-[13px] font-semibold tracking-[0.28em] uppercase flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#7ec8ff] animate-pulse" />
                <span>PRODUCTS &bull; SOVEREIGN CAPABILITY</span>
              </motion.div>

              {/* Monumental Display Headline with Dynamic Scroll-Driven Font Color (Clean, No Blue Glow Background) */}
              <motion.h1
                style={{
                  color: headingColor,
                }}
                className="font-oxanium text-3xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-black uppercase tracking-tight leading-[1.06] select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              >
                STRATEGIC CAPABILITY ACROSS<br />
                CORE INDUSTRIAL SECTORS
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                style={{ opacity: subOpacity, y: subY }}
                className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl pt-1"
              >
                Explore Sky Wardens&apos; product and capability portfolio across aerospace, defence, and advanced sovereign sectors.
              </motion.p>
            </motion.div>

            {/* Interactive Sector Cards with Background Image & Hover-Reveal Logo */}
            <motion.div
              style={{
                y: cardsY,
                opacity: cardsOpacity,
              }}
              className={`grid gap-6 sm:gap-8 mx-auto mt-6 sm:mt-8 w-full relative z-20 pointer-events-auto ${
                sectors.length === 1
                  ? "max-w-md grid-cols-1"
                  : sectors.length === 2
                  ? "max-w-4xl grid-cols-1 md:grid-cols-2"
                  : sectors.length === 3
                  ? "max-w-6xl grid-cols-1 md:grid-cols-3"
                  : "max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {sectors.map((sector) => {
                const isHovered = hoveredSector === sector.id;

                return (
                  <Link
                    key={sector.id}
                    href={sector.href}
                    onMouseEnter={() => setHoveredSector(sector.id)}
                    onMouseLeave={() => setHoveredSector(null)}
                    onFocus={() => setHoveredSector(sector.id)}
                    onBlur={() => setHoveredSector(null)}
                    className={`group relative ${
                      sectors.length > 2
                        ? "h-[340px] sm:h-[370px] md:h-[390px] lg:h-[410px]"
                        : "h-[360px] sm:h-[400px] md:h-[420px] lg:h-[440px]"
                    } rounded-2xl sm:rounded-3xl overflow-hidden border shadow-[0_16px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between p-5 sm:p-7 transition-all duration-500 block cursor-pointer select-none ${
                      isHovered
                        ? `${sector.hoverBorder} shadow-[0_22px_65px_rgba(0,0,0,0.95)] -translate-y-1`
                        : `${sector.normalBorder}`
                    }`}
                  >
                    {/* 1. Background Image with cinematic smooth zoom on hover */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      {sector.bgImage ? (
                        <Image
                          src={sector.bgImage}
                          alt={`${sector.title} backdrop`}
                          fill
                          priority
                          className={`object-cover object-center transition-transform duration-700 ease-out filter contrast-[1.15] ${
                            isHovered
                              ? "scale-110 brightness-[0.55]"
                              : "scale-100 brightness-[0.7]"
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#06152d] via-[#030917] to-[#02050f] flex items-center justify-center">
                          <span className="text-white/10 font-oxanium text-4xl font-bold uppercase select-none">
                            {sector.title}
                          </span>
                        </div>
                      )}

                      {/* Dark Cinematic Vignette & Gradients to guarantee text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02050f] via-[#02050f]/60 to-[#02050f]/85 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#02050f]/90 via-transparent to-[#02050f]/95" />
                    </div>

                    {/* 2. Top Sector Information */}
                    <div className="relative z-10 space-y-1 sm:space-y-1.5">
                      <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#7ec8ff] uppercase block">
                        {sector.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-wider font-oxanium uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                        {sector.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal max-w-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] line-clamp-2">
                        {sector.desc}
                      </p>
                    </div>

                    {/* 3. Center Logo Emblem: Hidden by default, smoothly reveals on hover with no color glow behind */}
                    <div className="relative z-10 flex items-center justify-center my-auto py-2">
                      <div
                        className={`transform transition-all duration-500 ease-out flex items-center justify-center pointer-events-none ${
                          isHovered
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-4 scale-90"
                        }`}
                      >
                        {sector.renderLogo()}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
        </div>

      </div>
    </div>

      {/* ======================================================== */}
      {/* LOWER CONTENT: BANNERS & ACCORDIONS (Normal Page Flow)   */}
      {/* ======================================================== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32 z-20">

        {/* ========================================== */}
        {/* E-SHOP BANNER (Explore Tactical Gear Store) */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 sm:mt-16 max-w-4xl mx-auto relative rounded-3xl overflow-hidden border border-sky-500/30 hover:border-[#7ec8ff]/60 bg-gradient-to-r from-[#030a18] via-[#051329] to-[#040c1d] p-7 sm:p-9 lg:p-11 shadow-[0_16px_50px_rgba(2,132,199,0.18)] transition-all duration-500 group"
        >
          {/* Subtle Radiant Logo-Blue Ambient Glows */}
          <div className="absolute top-0 left-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_left,rgba(126,200,255,0.18)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.14)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7ec8ff]/10 border border-[#7ec8ff]/25 backdrop-blur-md mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff] animate-pulse" />
                <span className="text-[#7ec8ff] font-oxanium text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase">
                  E-SHOP
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Explore Sky Wardens&apos; Tactical Gear Store.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm md:text-[15px] leading-relaxed pt-1">
                Shop for current product listings on the retail storefront.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/defence"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#93d5ff] via-[#5bb4f8] to-[#288ee0] hover:from-[#b6e5ff] hover:via-[#7ec8ff] hover:to-[#3ba1f3] text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(91,180,248,0.45)] hover:shadow-[0_0_35px_rgba(147,213,255,0.7)] hover:-translate-y-0.5"
              >
                <span>Visit E-Shop</span>
                <span className="ml-1.5 text-base leading-none">→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* PORTFOLIO UPDATE BANNER                    */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 sm:mt-8 max-w-4xl mx-auto relative rounded-2xl sm:rounded-3xl border border-sky-500/25 hover:border-[#7ec8ff]/40 bg-[#030916]/85 backdrop-blur-xl px-6 py-7 sm:px-10 sm:py-9 text-center shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-500 overflow-hidden"
        >
          {/* Subtle Ambient Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-16 bg-sky-500/10 blur-3xl pointer-events-none" />

          {/* Tactical Corner Brackets (Signature Light Blue #7ec8ff) */}
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 w-4 h-4 border-t-2 border-l-2 border-[#7ec8ff] drop-shadow-[0_0_8px_rgba(126,200,255,0.6)]" />
          <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-2 h-2 border-t border-r border-[#7ec8ff]/40" />
          <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 w-2 h-2 border-b border-l border-[#7ec8ff]/40" />
          <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 w-4 h-4 border-b-2 border-r-2 border-[#7ec8ff] drop-shadow-[0_0_8px_rgba(126,200,255,0.6)]" />

          {/* Symmetrical Brand Light Blue Tag */}
          <div className="flex items-center justify-center space-x-3 mb-3 select-none">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#7ec8ff]/50" />
            <span className="w-1.5 h-[1.5px] bg-[#7ec8ff]" />
            <span className="text-xs sm:text-[13px] font-oxanium font-bold tracking-[0.28em] text-[#7ec8ff] uppercase drop-shadow-[0_0_12px_rgba(126,200,255,0.45)]">
              PORTFOLIO UPDATE
            </span>
            <span className="w-1.5 h-[1.5px] bg-[#7ec8ff]" />
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#7ec8ff]/50" />
          </div>

          <p className="text-slate-200 font-sans text-xs sm:text-sm md:text-[14px] font-medium tracking-wide uppercase max-w-3xl mx-auto leading-relaxed">
            NEW PRODUCTS ARE CURRENTLY UNDER DESIGN &amp; EVALUATION, AND WILL BE ADDED AS THEY ARE CLEARED FOR RELEASE.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
