"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  href: string;
}

const FALLBACK_NEWS_ITEMS: NewsItem[] = [
  {
    id: "defence-systems",
    title: "Defence systems, protective platforms, and readiness updates",
    category: "DEFENCE",
    date: "FEBRUARY 2026",
    description:
      "Multi-layered tactical air defence architectures, kinetic perimeter shields, and next-generation sovereign interception platforms.",
    image: "/images/defence-systems-radar.jpg",
    href: "/news/defence-systems",
  },
  {
    id: "aerospace-highlights",
    title: "Aerospace highlights and autonomous program positioning",
    category: "AEROSPACE",
    date: "MARCH 2026",
    description:
      "Precision-engineered sovereign airframes, autonomous flight trials, and tactical unmanned aerial surveillance milestones.",
    image: "/images/stealth-fighter-hangar.jpg",
    href: "/news/aerospace-highlights",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 280, damping: 30 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: "spring" as const, stiffness: 280, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function NewsInsightsSection() {
  const [items, setItems] = useState<NewsItem[]>(FALLBACK_NEWS_ITEMS);
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Strictly extract only Defence and Aerospace (filter out test, vi, etc.)
          const defenceData = json.data.find((d: any) => {
            const s = `${d.slug || ""} ${d.category || ""} ${d.title || ""}`.toLowerCase();
            return (s.includes("defence") || s.includes("defense")) && !s.includes("test") && s !== "vi";
          });

          const aerospaceData = json.data.find((d: any) => {
            const s = `${d.slug || ""} ${d.category || ""} ${d.title || ""}`.toLowerCase();
            return s.includes("aerospace") && !s.includes("test") && s !== "vi";
          });

          const onlyTwo: NewsItem[] = [
            {
              id: defenceData?.slug || "defence-systems",
              title: defenceData?.title || FALLBACK_NEWS_ITEMS[0].title,
              category: "DEFENCE",
              date: defenceData?.date || FALLBACK_NEWS_ITEMS[0].date,
              description: defenceData?.excerpt || defenceData?.description || FALLBACK_NEWS_ITEMS[0].description,
              image:
                defenceData?.image && typeof defenceData.image === "string" && defenceData.image.trim().length > 0
                  ? defenceData.image.trim()
                  : FALLBACK_NEWS_ITEMS[0].image,
              href: `/news/${defenceData?.slug || "defence-systems"}`,
            },
            {
              id: aerospaceData?.slug || "aerospace-highlights",
              title: aerospaceData?.title || FALLBACK_NEWS_ITEMS[1].title,
              category: "AEROSPACE",
              date: aerospaceData?.date || FALLBACK_NEWS_ITEMS[1].date,
              description: aerospaceData?.excerpt || aerospaceData?.description || FALLBACK_NEWS_ITEMS[1].description,
              image:
                aerospaceData?.image && typeof aerospaceData.image === "string" && aerospaceData.image.trim().length > 0
                  ? aerospaceData.image.trim()
                  : FALLBACK_NEWS_ITEMS[1].image,
              href: `/news/${aerospaceData?.slug || "aerospace-highlights"}`,
            },
          ];

          setItems(onlyTwo);
        }
      }
    } catch {
      // Fallback silently
    }
  }, []);

  useEffect(() => {
    fetchNews();
    window.addEventListener("focus", fetchNews);
    const interval = setInterval(fetchNews, 8000);
    return () => {
      window.removeEventListener("focus", fetchNews);
      clearInterval(interval);
    };
  }, [fetchNews]);

  const activeIndex = ((page % items.length) + items.length) % items.length;
  const currentItem = items[activeIndex] || items[0];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const jumpToSlide = (targetIndex: number) => {
    const diff = targetIndex - activeIndex;
    if (diff !== 0) {
      setPage([page + diff, diff > 0 ? 1 : -1]);
    }
  };

  // Auto-play timer (slides every 6 seconds, pauses on hover)
  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [page, isHovered, items.length]);

  return (
    <section className="relative pt-6 sm:pt-10 pb-10 sm:pb-12 bg-[#02050e] overflow-hidden border-t border-white/10 select-none">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(14,165,233,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main Container */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl xl:max-w-[1120px] mx-auto w-full relative pb-6 sm:pb-8">
          <div className="flex flex-col items-center justify-center text-center space-y-2 sm:space-y-2.5 select-none">
            {/* Tag */}
            <div className="flex items-center justify-center space-x-3 select-none">
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
              <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
              <span className="text-xs sm:text-[13px] font-sans font-semibold tracking-[0.22em] text-white uppercase">
                THE NEWSROOM
              </span>
              <span className="w-1.5 sm:w-2 h-[1.5px] bg-white/60" />
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
            </div>

            {/* Monumental Headline */}
            <h2 className="font-oxanium text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase select-none">
              NEWS & INSIGHTS
            </h2>

            {/* Subtitle */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal select-none max-w-2xl">
              Strategic disclosures, technological breakthroughs, and multi-domain deployment communiqués.
            </p>
          </div>

          {/* Desktop Right View All Link */}
          <div className="hidden sm:flex absolute right-0 bottom-8 items-center">
            <Link
              href="/news"
              className="group inline-flex items-center gap-1.5 text-sm md:text-[15px] font-medium text-[#38bdf8] hover:text-[#7dd3fc] transition-colors duration-200"
            >
              <span className="tracking-wide">View all news</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#38bdf8] group-hover:text-[#7dd3fc]" />
            </Link>
          </div>
        </div>

        {/* FULL INTERACTIVE SLIDER CONTAINER */}
        <div
          className="max-w-4xl xl:max-w-[1120px] mx-auto w-full relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slider Screen */}
          <div className="relative w-full h-[330px] sm:h-[380px] md:h-[430px] lg:h-[460px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.92)] bg-[#050914]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold || offset.x < -100) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold || offset.x > 100) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              >
                {/* Background Image */}
                {currentItem.image ? (
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1120px"
                    priority
                    unoptimized
                    className="object-cover object-center filter brightness-95 contrast-105 select-none pointer-events-none"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#071329] via-[#040c1c] to-[#02050f]" />
                )}

                {/* Atmospheric Contrast Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

                {/* Vertical Category Tag (Matches exact aesthetic from user's screenshot) */}
                <div className="absolute left-4 sm:left-5 md:left-6 top-6 sm:top-7 z-20 flex flex-col items-center gap-3 pointer-events-none select-none">
                  <div className="flex items-center gap-2.5 [writing-mode:vertical-rl] rotate-180">
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-mono uppercase tracking-[0.25em] font-extrabold text-[#7ec8ff] drop-shadow-[0_0_16px_rgba(126,200,255,0.85)]">
                      {currentItem.category}
                    </span>
                    <span className="w-8 sm:w-10 h-[2.5px] rounded-full bg-[#7ec8ff] shadow-[0_0_12px_#7ec8ff]" />
                  </div>
                </div>

                {/* Bottom Glassmorphic Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-black/60 backdrop-blur-md border-t border-white/10 px-5 sm:px-7 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
                  <div className="max-w-3xl pr-2">
                    <h3 className="text-sm sm:text-base md:text-[17px] font-bold uppercase tracking-tight text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {currentItem.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-normal line-clamp-2 mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {currentItem.description}
                    </p>
                  </div>

                  {/* Read Article Action Button */}
                  <Link
                    href={currentItem.href}
                    className="group inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 hover:border-sky-400/60 text-sky-300 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.15)] shrink-0 self-start sm:self-center"
                  >
                    <span>Read Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Left Arrow Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-sky-400/50 text-white flex items-center justify-center transition-all hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.8)] cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 text-slate-200" />
            </button>

            {/* Floating Right Arrow Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-sky-400/50 text-white flex items-center justify-center transition-all hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.8)] cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5 text-slate-200" />
            </button>
          </div>

          {/* Bottom Pagination Dots / Progress Indicator */}
          <div className="flex items-center justify-center gap-2.5 pt-5 select-none">
            {items.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => jumpToSlide(idx)}
                  className={`relative transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-8 h-2.5 bg-[#38bdf8] shadow-[0_0_12px_#38bdf8]"
                      : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  title={`Go to slide ${idx + 1}: ${item.category}`}
                />
              );
            })}
          </div>

          {/* Mobile Bottom View All Link */}
          <div className="flex sm:hidden justify-center pt-3">
            <Link
              href="/news"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#38bdf8] hover:text-[#7dd3fc] transition-colors duration-200"
            >
              <span className="tracking-wide">View all news</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
