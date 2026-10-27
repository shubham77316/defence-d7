"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DEFAULT_TICKER = [
  { tag: "SPOTLIGHT:", text: "SKY WARDENS MAKING HEADLINES" },
  { tag: "DEFENCE UPDATE:", text: "SOVEREIGN AIRFRAMES & AUTONOMOUS SURVEILLANCE FLEET EXPANDS" },
  { tag: "SPOTLIGHT:", text: "SKY WARDENS MAKING HEADLINES" },
  { tag: "STRATEGIC MILESTONE:", text: "MULTI-DOMAIN TACTICAL PLATFORMS ACHIEVE MISSION READINESS" },
  { tag: "SPOTLIGHT:", text: "SKY WARDENS MAKING HEADLINES" },
  { tag: "INDUSTRY LEADERSHIP:", text: "PRECISION INDIGENOUS ENGINEERING CALIBRATED FOR GLOBAL DEPLOYMENT" },
];

interface BreakingNewsTickerProps {
  initialItems?: Array<{ tag: string; text: string }>;
}

export default function BreakingNewsTickerSection({ initialItems }: BreakingNewsTickerProps) {
  const [items, setItems] = useState<Array<{ tag: string; text: string }>>(
    initialItems !== undefined ? initialItems : DEFAULT_TICKER
  );

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch("/api/homepage", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data?.tickerItems)) {
            setItems(json.data.tickerItems);
          }
        }
      } catch (err) {
        // Fallback to default
      }
    };
    fetchTicker();
  }, []);

  if (!items || items.length === 0) {
    return null;
  }

  const displayList = items.length < 4 ? [...items, ...items, ...items, ...items] : [...items, ...items];

  return (
    <section className="relative w-full bg-[#000208] py-3 sm:py-4 select-none z-20 border-t border-white/[0.08]">
      {/* Main Container Aligned with Navbar */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        {/* Clean Neutral Bordered Frame Bar */}
        <div className="relative w-full bg-[#050914] border border-white/15 rounded-full py-2 sm:py-2.5 overflow-hidden shadow-none">
          <div className="relative w-full flex items-center">
            {/* Left Fixed Badge: BREAKING NEWS */}
            <div className="relative z-20 flex-shrink-0 flex items-center pl-4 sm:pl-6 pr-3 sm:pr-4 bg-[#050914] border-r border-white/15">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7ec8ff]" />
                <span className="text-[11px] sm:text-xs md:text-[13px] font-mono font-bold uppercase tracking-[0.2em] text-[#7ec8ff] whitespace-nowrap">
                  BREAKING NEWS
                </span>
              </div>
            </div>

            {/* Left and Right Feather Gradient Edge Fades */}
            <div className="absolute left-[138px] sm:left-[172px] top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#050914] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#050914] to-transparent z-10 pointer-events-none" />

            {/* Continuous Smooth Infinite Marquee Stream */}
            <div className="flex overflow-hidden relative w-full items-center pl-6 [mask-image:linear-gradient(to_right,transparent,black_28px,black_calc(100%-40px),transparent)]">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  duration: 28,
                }}
                className="flex items-center gap-6 sm:gap-8 md:gap-10 flex-nowrap will-change-transform whitespace-nowrap"
              >
                {displayList.map((item, idx) => (
                  <div
                    key={`ticker-${idx}`}
                    className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 text-xs sm:text-sm font-mono tracking-wider uppercase font-medium"
                  >
                    <span className="text-[#7ec8ff] font-bold">
                      {item.tag || "SPOTLIGHT:"}
                    </span>
                    <span className="text-white">
                      {item.text}
                    </span>
                    <span className="text-white/30 font-normal pl-3">|</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
