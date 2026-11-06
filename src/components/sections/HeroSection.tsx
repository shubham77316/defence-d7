"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroBackgroundAtmosphere from "@/components/sections/HeroBackgroundAtmosphere";

interface HeroSectionProps {
  initialData?: {
    heroTag?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaText?: string;
    heroCtaLink?: string;
    heroSecondaryCtaText?: string;
    heroSecondaryCtaLink?: string;
  };
}

function formatHeadline(title: string) {
  if (!title) return ["ENGINEERING", "STRATEGIC CAPABILITY", "FOR THE NEXT ERA"];
  if (title.includes("\n")) {
    return title.split("\n").filter(Boolean);
  }
  const words = title.trim().split(" ");
  if (words.length <= 3) {
    return words;
  }
  const midStart = Math.max(1, Math.floor(words.length / 3));
  const midEnd = Math.max(midStart + 1, Math.floor((2 * words.length) / 3));
  return [
    words.slice(0, midStart).join(" "),
    words.slice(midStart, midEnd).join(" "),
    words.slice(midEnd).join(" "),
  ];
}

export default function HeroSection({ initialData }: HeroSectionProps) {
  const [data, setData] = useState({
    heroTag: initialData?.heroTag ?? "",
    heroTitle: initialData?.heroTitle ?? "ENGINEERING STRATEGIC CAPABILITY FOR THE NEXT ERA",
    heroSubtitle:
      initialData?.heroSubtitle ??
      "Architecting sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
    heroCtaText: initialData?.heroCtaText?.trim() || "Explore Capabilities",
    heroCtaLink: initialData?.heroCtaLink || "/capabilities",
    heroSecondaryCtaText:
      initialData?.heroSecondaryCtaText !== undefined ? initialData.heroSecondaryCtaText : "Initiate Liaison",
    heroSecondaryCtaLink: initialData?.heroSecondaryCtaLink || "/contact",
  });

  useEffect(() => {
    // Fetch live CMS homepage data in background to ensure real-time accuracy
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/homepage", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setData((prev) => ({
              ...prev,
              ...json.data,
              heroCtaText: json.data.heroCtaText?.trim() || "Explore Capabilities",
              heroSecondaryCtaText:
                json.data.heroSecondaryCtaText !== undefined
                  ? json.data.heroSecondaryCtaText
                  : prev.heroSecondaryCtaText,
            }));
          }
        }
      } catch (err) {
        // Keep initialData silently
      }
    };
    fetchLatest();
  }, []);

  const titleLines = formatHeadline(data.heroTitle || "");

  return (
    <section className="relative w-full sm:min-h-screen pt-0 sm:pt-24 lg:pt-28 pb-6 sm:pb-10 lg:pb-12 flex flex-col justify-between sm:justify-end items-start overflow-hidden bg-[#020612]">
      {/* 1. Deep Royal Navy Atmospheric Lighting & Desktop Background Video */}
      <HeroBackgroundAtmosphere />

      {/* 2. Mobile Video in Document Flow (Directly below Navbar, directly above Headline) */}
      <div className="w-full sm:hidden pt-14 pb-2 flex items-center justify-center relative z-10 select-none pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-[185px] xs:h-[210px] w-auto max-w-full object-contain filter contrast-[1.08] brightness-[1.05]"
        >
          <source src="/videos/hero-grenade-hd.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 3. Main Hero Inner Content */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-10 flex flex-col items-start text-left mt-3 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left max-w-6xl w-full"
        >

          {/* Monumental Stacked Brand Wordmark - Inspired by Reference */}
          <div className="flex flex-col items-start select-none -space-y-3 sm:-space-y-5 md:-space-y-7 lg:-space-y-9 xl:-space-y-11">
            <span className="font-oxanium text-7xl xs:text-8xl sm:text-9xl md:text-[120px] lg:text-[142px] xl:text-[164px] 2xl:text-[180px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#9ad6ff] via-[#5aa9f7] to-[#1d6fa5] drop-shadow-[0_4px_24px_rgba(56,189,248,0.4)] leading-none">
              SKY
            </span>
            <span className="font-oxanium text-7xl xs:text-8xl sm:text-9xl md:text-[120px] lg:text-[142px] xl:text-[164px] 2xl:text-[180px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#f1f5f9] to-[#cbd5e1] drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] leading-none">
              WARDENS
            </span>
          </div>

          {/* Monumental Display Headline */}
          <div className="space-y-0.5 sm:space-y-1 -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-10">
            <h1 className="font-oxanium text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-semibold tracking-wide text-white leading-[1.2] select-none text-left">
              {titleLines.map((line, idx) => (
                <span
                  key={idx}
                  className={`block ${
                    idx === 1
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#5aa9f7] via-[#93c5fd] to-white drop-shadow-[0_2px_12px_rgba(90,169,247,0.3)]"
                      : "text-white"
                  }`}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>

          {/* Hero Subtitle from CMS */}
          {data.heroSubtitle && (
            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl text-left leading-relaxed select-none mt-3.5 sm:mt-5">
              {data.heroSubtitle}
            </p>
          )}

                    {/* Action Group: Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto">
            {/* 1. Explore Capabilities (Primary Radiant Blue Pill) */}
            <Link
              href={data.heroCtaLink || "/capabilities"}
              className="group relative inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#1d6fa5] via-[#257dc0] to-[#4ea0f0] hover:from-[#227cb9] hover:via-[#318dd5] hover:to-[#5eb1ff] text-white font-bold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 ease-out shadow-[0_4px_18px_rgba(29,111,165,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.55),0_0_10px_rgba(255,255,255,0.25)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 rounded-full overflow-hidden text-center cursor-pointer border border-sky-300/30 hover:border-sky-300/70"
            >
              {/* Shimmer light sweep on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              {/* Controlled subtle blue edge glow on hover */}
              <span className="absolute -inset-0.5 rounded-full bg-sky-400/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {data.heroCtaText?.trim() || "Explore Capabilities"}
                </span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* 2. Initiate Liaison (Secondary Translucent Dark Pill) */}
            <Link
              href={data.heroSecondaryCtaLink || "/contact"}
              className="group relative inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-black/40 hover:bg-[#7ec8ff]/10 text-slate-200 hover:text-white border border-white/20 hover:border-[#7ec8ff]/90 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ease-out backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(126,200,255,0.45),inset_0_0_15px_rgba(126,200,255,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 rounded-full overflow-hidden text-center cursor-pointer"
            >
              {/* Subtle glassy shine sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              <span className="relative z-10 tracking-widest transition-colors duration-300 group-hover:text-[#e0f2fe]">
                {data.heroSecondaryCtaText?.trim() || "Initiate Liaison"}
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
