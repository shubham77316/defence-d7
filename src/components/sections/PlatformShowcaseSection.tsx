"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PlatformShowcaseProps {
  initialData?: {
    showcaseTitle?: string;
    showcaseSubtitle?: string;
    showcaseDesc?: string;
  };
}

export default function PlatformShowcaseSection({ initialData }: PlatformShowcaseProps) {
  const [data, setData] = useState({
    showcaseTitle: initialData?.showcaseTitle ?? "A GLIMPSE OF WHAT WE BUILD",
    showcaseSubtitle: initialData?.showcaseSubtitle ?? "FEATURED PLATFORM",
    showcaseDesc: initialData?.showcaseDesc ?? "The details are classified, the capability is not.",
  });

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const res = await fetch("/api/homepage", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setData({
              showcaseTitle: json.data.showcaseTitle !== undefined ? json.data.showcaseTitle : "",
              showcaseSubtitle: json.data.showcaseSubtitle !== undefined ? json.data.showcaseSubtitle : "",
              showcaseDesc: json.data.showcaseDesc !== undefined ? json.data.showcaseDesc : "",
            });
          }
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchShowcase();
  }, []);

  return (
    <section className="relative w-full pt-6 sm:pt-10 pb-12 sm:pb-16 bg-[#020409] overflow-hidden flex flex-col items-center justify-center border-t border-white/10">
      {/* Subtle, natural vignette without artificial streaks */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.6)_0%,transparent_80%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center space-y-5 sm:space-y-6 z-10">
        {/* ==================================================== */}
        {/* CENTERED HEADER DIRECTLY ABOVE MISSILE               */}
        {/* ==================================================== */}
        <div className="flex flex-col items-center text-center space-y-2 sm:space-y-2.5 max-w-5xl mx-auto select-none">
          {/* Clean Modern White Tag */}
          {Boolean(data.showcaseSubtitle && data.showcaseSubtitle.trim()) && (
            <div className="flex items-center justify-center space-x-3 select-none">
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
              <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
              <span className="text-xs sm:text-[13px] font-sans font-semibold tracking-[0.22em] text-white uppercase">
                {data.showcaseSubtitle}
              </span>
              <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
            </div>
          )}

          {/* Monumental Headline matching Sky Wardens Typography */}
          {Boolean(data.showcaseTitle && data.showcaseTitle.trim()) && (
            <div className="w-full flex justify-center py-1">
              <h2 className="font-oxanium text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#93d5ff] via-[#f1f5f9] to-[#ffffff] drop-shadow-[0_4px_28px_rgba(56,189,248,0.28)] text-center">
                {data.showcaseTitle}
              </h2>
            </div>
          )}

          {/* Subtitle / Description from CMS */}
          {Boolean(data.showcaseDesc && data.showcaseDesc.trim()) && (
            <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl">
              {data.showcaseDesc}
            </p>
          )}
        </div>

        {/* PLATFORM SHOWCASE VISUAL (MISSILE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          animate={{
            y: [-6, 6, -6],
          }}
          // @ts-expect-error framer-motion transition prop
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative w-full flex items-center justify-center pt-0"
        >
          <Image
            src="/images/platform-showcase-missile.png"
            alt="Sky Wardens Hypersonic Platform"
            width={1200}
            height={480}
            className="w-full max-w-[1050px] h-auto object-contain transition-transform duration-500 hover:scale-[1.02] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
            priority
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
}
