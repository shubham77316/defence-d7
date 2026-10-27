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
    heroCtaText: initialData?.heroCtaText !== undefined ? initialData.heroCtaText : "",
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
              heroCtaText: json.data.heroCtaText !== undefined ? json.data.heroCtaText : prev.heroCtaText,
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
    <section className="relative w-full sm:min-h-screen pt-0 sm:pt-24 lg:pt-28 pb-8 sm:pb-16 lg:pb-20 flex flex-col justify-between sm:justify-end items-start overflow-hidden bg-[#020612]">
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
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 z-10 flex flex-col items-start text-left mt-1 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left space-y-4 sm:space-y-6 max-w-4xl w-full"
        >

          {/* Monumental Display Headline */}
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="font-oxanium text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-semibold tracking-wide text-white leading-[1.18] select-none text-left">
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
            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed select-none">
              {data.heroSubtitle}
            </p>
          )}

          {/* Action Group: Buttons */}
          {(Boolean(data.heroCtaText && data.heroCtaText.trim()) ||
            Boolean(data.heroSecondaryCtaText && data.heroSecondaryCtaText.trim())) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 pt-3 w-full sm:w-auto">
              {Boolean(data.heroCtaText && data.heroCtaText.trim()) && (
                <Link
                  href={data.heroCtaLink || "/capabilities"}
                  className="group relative inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#1d6fa5] via-[#257dc0] to-[#5aa9f7] hover:from-[#257dc0] hover:via-[#3b8fd4] hover:to-[#70b9ff] text-white font-bold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 ease-out shadow-[0_0_25px_rgba(90,169,247,0.4)] hover:shadow-[0_0_40px_rgba(90,169,247,0.75),0_0_15px_rgba(255,255,255,0.4)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 rounded-full overflow-hidden text-center cursor-pointer border border-sky-300/30"
                >
                  {/* Shimmer / Light beam sweep effect on hover */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                  {/* Pulsing ambient radial glow */}
                  <span className="absolute -inset-1 rounded-full bg-sky-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      {data.heroCtaText}
                    </span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              )}

              {Boolean(data.heroSecondaryCtaText && data.heroSecondaryCtaText.trim()) && (
                <Link
                  href={data.heroSecondaryCtaLink || "/contact"}
                  className="group relative inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-black/40 hover:bg-sky-500/10 text-slate-200 hover:text-white border border-white/20 hover:border-sky-400/70 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ease-out backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.35),inset_0_0_15px_rgba(56,189,248,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 rounded-full overflow-hidden text-center cursor-pointer"
                >
                  {/* Subtle glassy shine sweep */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                  <span className="relative z-10 tracking-widest transition-colors duration-300 group-hover:text-sky-200">
                    {data.heroSecondaryCtaText}
                  </span>
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
