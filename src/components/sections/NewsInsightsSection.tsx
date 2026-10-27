"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

export default function NewsInsightsSection() {
  const [items, setItems] = useState<NewsItem[]>(FALLBACK_NEWS_ITEMS);
  const [activeId, setActiveId] = useState<string>(FALLBACK_NEWS_ITEMS[0].id);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            // Strictly extract only Defence and Aerospace
            const defenceData = json.data.find((d: any) => {
              const s = `${d.slug || ""} ${d.category || ""} ${d.title || ""}`.toLowerCase();
              return s.includes("defence") || s.includes("defense");
            });

            const aerospaceData = json.data.find((d: any) => {
              const s = `${d.slug || ""} ${d.category || ""} ${d.title || ""}`.toLowerCase();
              return s.includes("aerospace");
            });

            const onlyTwo: NewsItem[] = [
              {
                id: defenceData?.slug || "defence-systems",
                title: defenceData?.title || FALLBACK_NEWS_ITEMS[0].title,
                category: "DEFENCE",
                date: defenceData?.date || FALLBACK_NEWS_ITEMS[0].date,
                description: defenceData?.excerpt || defenceData?.description || FALLBACK_NEWS_ITEMS[0].description,
                image: (defenceData?.image && typeof defenceData.image === "string" && defenceData.image.trim().length > 0)
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
                image: (aerospaceData?.image && typeof aerospaceData.image === "string" && aerospaceData.image.trim().length > 0)
                  ? aerospaceData.image.trim()
                  : FALLBACK_NEWS_ITEMS[1].image,
                href: `/news/${aerospaceData?.slug || "aerospace-highlights"}`,
              },
            ];

            setItems(onlyTwo);
            setActiveId((prev) => (onlyTwo.some((d) => d.id === prev) ? prev : onlyTwo[0].id));
          }
        }
      } catch (err) {
        // Fallback silently
      }
    };
    fetchNews();

    window.addEventListener("focus", fetchNews);
    const interval = setInterval(fetchNews, 4000);
    return () => {
      window.removeEventListener("focus", fetchNews);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-10 bg-[#02050e] overflow-hidden border-t border-white/10 select-none">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(14,165,233,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main Container Aligned with Navbar */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 z-10">
        {/* Section Header */}
        <div className="max-w-4xl xl:max-w-[1120px] mx-auto w-full relative pb-5 sm:pb-7">
          <div className="flex flex-col items-center justify-center text-center space-y-2 sm:space-y-2.5 select-none">
            {/* Clean Modern White Tag */}
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

          {/* Mobile Center View All Link */}
          <div className="flex sm:hidden justify-center pt-3">
            <Link
              href="/news"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#38bdf8] hover:text-[#7dd3fc] transition-colors duration-200"
            >
              <span className="tracking-wide">View all news</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#38bdf8] group-hover:text-[#7dd3fc]" />
            </Link>
          </div>
        </div>

        {/* Seamless Expanding Accordion Gallery */}
        <div className="max-w-4xl xl:max-w-[1120px] mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-0 w-full h-[320px] sm:h-[360px] md:h-[410px] lg:h-[440px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] divide-y md:divide-y-0 md:divide-x divide-white/10 transition-all duration-500 bg-[#050914]">
            {items.map((item, idx) => {
              const isActive = activeId === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  transition={{
                    layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${
                    isActive
                      ? "flex-[2.8] md:flex-[2.6] shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]"
                      : "flex-[1] opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Background Image Fill (if image exists) or tactical gradient */}
                  {item.image && item.image.trim().length > 0 ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={`object-cover object-center transition-transform duration-700 ${
                        isActive ? "scale-100" : "scale-110 grayscale-[15%]"
                      }`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#071329] via-[#040c1c] to-[#02050f]" />
                  )}

                  {/* Subtle Hover / Active Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                      isActive
                        ? "bg-transparent"
                        : "bg-black/35 hover:bg-black/10"
                    }`}
                  />

                  {/* Left Edge Subtle Contrast Gradient */}
                  <div className="absolute inset-y-0 left-0 w-24 sm:w-28 bg-gradient-to-r from-black/70 via-black/25 to-transparent pointer-events-none z-10" />

                  {/* Vertical Category Label */}
                  <div className="absolute left-3 sm:left-4 md:left-5 top-5 sm:top-6 z-20 flex flex-col items-center gap-3.5 pointer-events-none select-none">
                    <div className="flex items-center gap-2.5 [writing-mode:vertical-rl] rotate-180">
                      <span
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl font-mono uppercase tracking-[0.25em] font-extrabold transition-all duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] ${
                          isActive
                            ? "text-[#7ec8ff] drop-shadow-[0_0_16px_rgba(126,200,255,0.8)]"
                            : "text-white/75"
                        }`}
                      >
                        {item.category}
                      </span>
                      <span
                        className={`w-8 sm:w-10 h-[2.5px] rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-[#7ec8ff] shadow-[0_0_10px_#7ec8ff]"
                            : "bg-white/25"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Data Overlay inside Image */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-x-0 bottom-0 z-20 bg-black/50 backdrop-blur-md border-t border-white/10 px-4 py-2 sm:px-5 sm:py-2.5 pointer-events-none select-none"
                      >
                        <div className="max-w-3xl pr-2">
                          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-white leading-snug line-clamp-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                            {item.title}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-slate-200/90 leading-relaxed font-normal line-clamp-1 sm:line-clamp-2 mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
