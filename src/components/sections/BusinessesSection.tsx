"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface SectorCard {
  id: string;
  number: string;
  title: string;
  tagline: string;
  desc: string;
  linkText: string;
  href?: string;
  bgImage: string;
  glowClass: string;
  accentBorder: string;
  accentText: string;
  logoGlow: string;
  renderLogo: () => React.ReactNode;
}

const renderAerospaceLogo = () => (
  <div className="relative flex items-center justify-center py-2">
    <svg
      className="w-32 h-32 sm:w-36 sm:h-36 transition-all duration-500 ease-out relative z-10 cursor-pointer"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="exactAeroBlueGrad" x1="120" y1="12" x2="120" y2="208" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a5ddff" />
          <stop offset="30%" stopColor="#60b7ff" />
          <stop offset="70%" stopColor="#2e93e6" />
          <stop offset="100%" stopColor="#1b6fad" />
        </linearGradient>
      </defs>
      <path
        d="M 120 12 L 216 155 L 180 136 L 120 56 L 60 136 L 24 155 Z"
        fill="url(#exactAeroBlueGrad)"
      />
      <path
        d="M 54 178 C 76 148 134 134 175 148 C 145 142 88 152 54 178 Z"
        fill="url(#exactAeroBlueGrad)"
        opacity="0.95"
      />
      <path
        d="M 0 208 C 30 162 90 148 120 148 C 150 148 210 162 240 208 L 214 208 C 188 174 144 162 120 162 C 96 162 52 174 26 208 Z"
        fill="url(#exactAeroBlueGrad)"
      />
    </svg>
  </div>
);

const renderDefenceLogo = () => (
  <div className="relative flex items-center justify-center py-2">
    <svg
      className="w-32 h-32 sm:w-36 sm:h-36 transition-all duration-500 ease-out relative z-10 cursor-pointer"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="defOliveGrad" x1="25" y1="30" x2="120" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a3e635" />
          <stop offset="0.5" stopColor="#65a30d" />
          <stop offset="1" stopColor="#3f6212" />
        </linearGradient>
        <linearGradient id="defBronzeGrad" x1="58" y1="30" x2="112" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="0.5" stopColor="#c2410c" />
          <stop offset="1" stopColor="#9a3412" />
        </linearGradient>
      </defs>
      <path
        d="M 52 32 L 20 98 L 34 98 L 46 72 L 66 72 L 74 88 L 88 88 L 62 32 Z M 52 56 L 60 72 L 48 72 Z"
        fill="url(#defOliveGrad)"
      />
      <path
        d="M 58 32 L 94 32 C 108 32 116 38 116 44 L 104 44 C 104 40 98 38 88 38 L 58 38 Z"
        fill="url(#defBronzeGrad)"
      />
      <path
        d="M 98 42 C 114 46 124 58 124 74 C 124 94 108 106 82 106 L 20 106 L 20 98 L 80 98 C 98 98 110 90 110 74 C 110 60 102 50 88 48 Z"
        fill="url(#defOliveGrad)"
      />
    </svg>
  </div>
);

const renderGenericLogo = (title: string) => (
  <div className="relative flex items-center justify-center py-2">
    <svg
      className="w-28 h-28 sm:w-32 sm:h-32 transition-all duration-500 ease-out relative z-10"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="70" cy="70" r="50" stroke="#38bdf8" strokeWidth="2.5" opacity="0.8" strokeDasharray="6 4" />
      <circle cx="70" cy="70" r="26" fill="#0284c7" opacity="0.3" />
      <path d="M70 28 L84 62 L120 68 L94 92 L101 128 L70 110 L39 128 L46 92 L20 68 L56 62 Z" fill="#38bdf8" opacity="0.9" />
    </svg>
  </div>
);

const DEFAULT_SECTORS: SectorCard[] = [
  {
    id: "defence-systems",
    number: "01",
    title: "DEFENCE",
    tagline: "Tactical & Protective Warfare",
    desc: "Protective gear and tactical equipment for the field.",
    linkText: "Explore Defence",
    href: "/defence",
    bgImage: "/images/defence-card-bg.jpg",
    glowClass: "bg-lime-500/25",
    accentBorder: "border-lime-500/30 group-hover:border-lime-400/80",
    accentText: "text-lime-400 group-hover:text-white",
    logoGlow: "drop-shadow-[0_0_35px_rgba(163,230,53,0.7)]",
    renderLogo: renderDefenceLogo,
  },
  {
    id: "jio",
    number: "02",
    title: "JIO",
    tagline: "Specialized Defence Sector",
    desc: "Tactical communications and sovereign systems.",
    linkText: "Explore Jio",
    href: "/news/jio",
    bgImage: "/images/stealth-fighter-hangar.jpg",
    glowClass: "bg-cyan-500/25",
    accentBorder: "border-cyan-500/40 group-hover:border-cyan-300/90",
    accentText: "text-cyan-400 group-hover:text-white",
    logoGlow: "drop-shadow-[0_0_35px_rgba(6,182,212,0.7)]",
    renderLogo: () => renderGenericLogo("JIO"),
  },
  {
    id: "petro",
    number: "03",
    title: "PETRO",
    tagline: "Energy & Strategic Materials",
    desc: "Strategic fuels, composite materials, and defence logistics.",
    linkText: "Explore Petro",
    href: "/news/petro",
    bgImage: "/uploads/screenshot_2026-09-26_154438_1792580426117_728760.png",
    glowClass: "bg-rose-500/25",
    accentBorder: "border-rose-500/40 group-hover:border-rose-300/90",
    accentText: "text-rose-400 group-hover:text-white",
    logoGlow: "drop-shadow-[0_0_35px_rgba(244,63,94,0.7)]",
    renderLogo: () => renderGenericLogo("PETRO"),
  },
  {
    id: "bisto",
    number: "04",
    title: "BISTO",
    tagline: "Tactical Operations",
    desc: "Specialized sovereign systems and equipment.",
    linkText: "Explore Bisto",
    href: "/news/bisto",
    bgImage: "/images/stealth-fighter-hangar.jpg",
    glowClass: "bg-amber-500/25",
    accentBorder: "border-amber-500/40 group-hover:border-amber-300/90",
    accentText: "text-amber-400 group-hover:text-white",
    logoGlow: "drop-shadow-[0_0_35px_rgba(245,158,11,0.7)]",
    renderLogo: () => renderGenericLogo("BISTO"),
  },
  {
    id: "aerospace-highlights",
    number: "05",
    title: "AEROSPACE",
    tagline: "Autonomous Aerial & Space Systems",
    desc: "UAV platforms and aerial surveillance systems.",
    linkText: "Explore Aerospace",
    href: "/aerospace",
    bgImage: "/images/aerospace-stealth-hangar.jpg",
    glowClass: "bg-sky-500/25",
    accentBorder: "border-sky-500/30 group-hover:border-sky-400/80",
    accentText: "text-sky-400 group-hover:text-white",
    logoGlow: "drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]",
    renderLogo: renderAerospaceLogo,
  },
];

export default function BusinessesSection() {
  const [sectors, setSectors] = useState<SectorCard[]>(DEFAULT_SECTORS);

  // Synchronize directly with CMS / The Newsroom order
  const fetchSectors = async () => {
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mappedCards: SectorCard[] = json.data.map((item: any, idx: number) => {
            const num = String(idx + 1).padStart(2, "0");
            const slug = (item.slug || item.id || item._id || "").toLowerCase();
            const titleUpper = (item.title || "SECTOR").toUpperCase();

            // Match Defence Card
            if (slug.includes("defence") || titleUpper.includes("DEFENCE")) {
              return {
                id: slug || "defence-systems",
                number: num,
                title: "DEFENCE",
                tagline: "Tactical & Protective Warfare",
                desc: item.description || item.excerpt || "Protective gear and tactical equipment for the field.",
                linkText: "Explore Defence",
                href: "/defence",
                bgImage: item.image || "/images/defence-card-bg.jpg",
                glowClass: "bg-lime-500/25",
                accentBorder: "border-lime-500/30 group-hover:border-lime-400/80",
                accentText: "text-lime-400 group-hover:text-white",
                logoGlow: "drop-shadow-[0_0_35px_rgba(163,230,53,0.7)]",
                renderLogo: renderDefenceLogo,
              };
            }

            // Match Aerospace Card
            if (slug.includes("aerospace") || titleUpper.includes("AEROSPACE")) {
              return {
                id: slug || "aerospace-highlights",
                number: num,
                title: "AEROSPACE",
                tagline: "Autonomous Aerial & Space Systems",
                desc: item.description || item.excerpt || "UAV platforms and aerial surveillance systems.",
                linkText: "Explore Aerospace",
                href: "/aerospace",
                bgImage: item.image || "/images/aerospace-stealth-hangar.jpg",
                glowClass: "bg-sky-500/25",
                accentBorder: "border-sky-500/30 group-hover:border-sky-400/80",
                accentText: "text-sky-400 group-hover:text-white",
                logoGlow: "drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]",
                renderLogo: renderAerospaceLogo,
              };
            }

            // Dynamic sector for other items (e.g. JIO, PETRO, BISTO)
            return {
              id: slug || `sector-${idx}`,
              number: num,
              title: titleUpper,
              tagline: item.category || "Specialized Sector",
              desc: item.excerpt || item.description || "Strategic industrial capability and engineering operations.",
              linkText: `Explore ${item.title}`,
              href: `/news/${slug}`,
              bgImage: (item.image && typeof item.image === "string") ? item.image.trim() : "",
              glowClass: "bg-cyan-500/25",
              accentBorder: "border-cyan-500/40 group-hover:border-cyan-300/90",
              accentText: "text-cyan-400 group-hover:text-white",
              logoGlow: "drop-shadow-[0_0_35px_rgba(6,182,212,0.7)]",
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

  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-[#010308] overflow-hidden border-t border-white/10 select-none">
      {/* Background Ambience Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Centered Header matching exact ABOUT US SVG Wordmark Typography */}
        <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3 max-w-5xl mx-auto select-none">
          {/* Clean Modern White Tag */}
          <div className="flex items-center justify-center space-x-3 select-none">
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
            <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
            <span className="text-xs sm:text-[13px] font-sans font-semibold tracking-[0.22em] text-white uppercase">
              OUR BUSINESSES
            </span>
            <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
          </div>

          {/* Monumental Headline matching Sky Wardens Typography */}
          <div className="w-full flex justify-center py-0.5">
            <svg
              viewBox="0 0 780 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[540px] sm:max-w-[660px] md:max-w-[760px] h-auto drop-shadow-[0_4px_24px_rgba(56,189,248,0.25)]"
              aria-label="WE OPERATE WHERE IMPACT MATTERS"
            >
              <defs>
                {/* Brand Logo Shield Light Radiant Blue Sheen */}
                <linearGradient id="busLogoShieldBlueSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#93d5ff" />
                  <stop offset="30%" stopColor="#5bb4f8" />
                  <stop offset="70%" stopColor="#288ee0" />
                  <stop offset="100%" stopColor="#1a68aa" />
                </linearGradient>

                {/* Titanium White Steel Radiant Gradient */}
                <linearGradient id="busLogoTitaniumSteelSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="45%" stopColor="#e2e8f0" />
                  <stop offset="70%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
              </defs>

              {/* LINE 1: WE OPERATE WHERE */}
              <text
                x="50%"
                y="34"
                textAnchor="middle"
                fontFamily="var(--font-oxanium), 'Rajdhani', 'Anton', sans-serif"
                fontSize="36"
                fontWeight="900"
                letterSpacing="0.08em"
                fill="url(#busLogoTitaniumSteelSheen)"
              >
                WE OPERATE WHERE
              </text>

              {/* LINE 2: IMPACT MATTERS */}
              <text
                x="50%"
                y="74"
                textAnchor="middle"
                fontFamily="var(--font-oxanium), 'Rajdhani', 'Anton', sans-serif"
                fontSize="36"
                fontWeight="900"
                letterSpacing="0.08em"
              >
                <tspan fill="url(#busLogoShieldBlueSheen)">IMPACT </tspan>
                <tspan fill="url(#busLogoTitaniumSteelSheen)">MATTERS</tspan>
              </text>
            </svg>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl">
            Sky Wardens operates in sectors where the stakes are too high for anything less than full commitment.
          </p>

        </div>

        {/* Sector Cards */}
        <div
          className={`grid grid-cols-1 ${
            sectors.length === 2
              ? "md:grid-cols-2 max-w-4xl"
              : sectors.length === 3
              ? "md:grid-cols-2 lg:grid-cols-3 max-w-6xl"
              : sectors.length === 4
              ? "md:grid-cols-2 lg:grid-cols-4 max-w-7xl"
              : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-[1440px]"
          } gap-6 sm:gap-8 mx-auto`}
        >
          {sectors.map((sector) => (
            <motion.div
              layout
              key={sector.id}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className={`group relative h-[420px] sm:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border ${sector.accentBorder} shadow-[0_16px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_22px_65px_rgba(0,0,0,0.95)] hover:-translate-y-1.5 flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 select-none cursor-pointer`}
            >
              {/* Sector Number Badge */}
              <div className="absolute top-4 right-4 z-20 flex items-center px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-slate-700/80 text-slate-300 group-hover:border-sky-400/80 transition-colors pointer-events-none">
                <span className="text-[11px] font-mono font-bold text-slate-200">{sector.number}</span>
              </div>

              {/* Clickable Card Link */}
              <Link
                href={sector.href || (sector.linkText.includes("Aerospace") ? "/aerospace" : "/defence")}
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label={`Explore ${sector.title}`}
              />

                {/* 1. Background Image (if present) or Sleek Technical Gradient */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  {sector.bgImage && sector.bgImage.trim().length > 0 ? (
                    <Image
                      src={sector.bgImage}
                      alt={`${sector.title} backdrop`}
                      fill
                      unoptimized
                      priority
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.7] contrast-[1.15] group-hover:brightness-[0.55]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#071329] via-[#040c1c] to-[#02050f]" />
                  )}

                  {/* Dark Vignette & Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02050f] via-[#02050f]/60 to-[#02050f]/85 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#02050f]/90 via-transparent to-[#02050f]/95" />
                </div>

                {/* 2. Top Sector Information */}
                <div className="relative z-10 space-y-1 sm:space-y-1.5 pointer-events-none pr-24">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-wider font-oxanium uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                    {sector.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal max-w-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] line-clamp-3">
                    {sector.desc}
                  </p>
                </div>

                {/* 3. Center Logo Emblem: Hidden by default, reveals on cursor hover with clean dark background */}
                <div className="relative z-10 flex items-center justify-center my-auto py-2 pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 scale-90 group-hover:scale-100 transition-all duration-500 ease-out flex items-center justify-center">
                    {sector.renderLogo()}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
