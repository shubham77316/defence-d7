"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingHeroWordmark() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef({
    anchorInitialTop: 240,
    startLeft: 48,
    startHeight: 200,
    dockedTop: 14,
    dockedLeft: 96,
    targetScale: 0.22,
    scrollThreshold: 220,
    ready: false,
  });

  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isHome || !mounted) return;

    const measure = () => {
      const anchor = document.getElementById("hero-title-anchor");
      const emblem = document.getElementById("navbar-emblem");

      if (!anchor) return;

      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const anchorRect = anchor.getBoundingClientRect();
      const emblemRect = emblem ? emblem.getBoundingClientRect() : null;

      const anchorInitialTop = anchorRect.top + currentScroll;
      const startLeft = anchorRect.left;
      const startHeight = anchorRect.height || 180;

      // Emblem dimensions
      const emblemTop = emblemRect ? emblemRect.top : 14;
      const emblemHeight = emblemRect ? emblemRect.height : 42;
      const emblemRight = emblemRect ? emblemRect.right : startLeft + 48;

      // Target scaled height when docked in navbar
      const targetHeight = Math.max(28, emblemHeight * 0.82);
      const targetScale = Math.min(0.34, Math.max(0.18, targetHeight / startHeight));

      // Docked coordinates
      const dockedTop = emblemTop + (emblemHeight - startHeight * targetScale) / 2;
      const dockedLeft = emblemRight + 12;

      // Scroll threshold over which transition completes
      const scrollThreshold = Math.max(160, Math.min(300, anchorInitialTop - dockedTop));

      metricsRef.current = {
        anchorInitialTop,
        startLeft,
        startHeight,
        dockedTop,
        dockedLeft,
        targetScale,
        scrollThreshold,
        ready: true,
      };

      // Apply initial positioning
      applyTransform();
    };

    const applyTransform = () => {
      if (!containerRef.current || !metricsRef.current.ready) return;

      const m = metricsRef.current;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const progress = Math.min(1, Math.max(0, scrollY / m.scrollThreshold));

      // Smooth interpolation
      const currentTop = Math.max(m.dockedTop, m.anchorInitialTop - scrollY);
      const currentLeft = m.startLeft + (m.dockedLeft - m.startLeft) * progress;
      const currentScale = 1.0 + (m.targetScale - 1.0) * progress;

      containerRef.current.style.top = `${currentTop}px`;
      containerRef.current.style.left = `${currentLeft}px`;
      containerRef.current.style.transform = `scale(${currentScale})`;
      containerRef.current.style.pointerEvents = progress > 0.8 ? "auto" : "none";
      containerRef.current.style.opacity = "1";
    };

    measure();

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(applyTransform);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    // Also listen to Lenis if available
    const win = window as any;
    if (win.lenis) {
      win.lenis.on("scroll", onScroll);
    }

    const timer1 = setTimeout(measure, 50);
    const timer2 = setTimeout(measure, 200);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (win.lenis) {
        win.lenis.off("scroll", onScroll);
      }
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isHome, mounted]);

  if (!isHome || !mounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        transformOrigin: "top left",
        zIndex: 45,
        opacity: 0, // starts hidden until measured
      }}
      className="select-none will-change-transform transition-opacity duration-150"
    >
      <Link href="/" className="cursor-pointer inline-block">
                {/* Exact monumental brand wordmark: SKY WARDENS on row 1, Aerospace / Defence underneath */}
        <div className="flex flex-col items-start select-none">
          {/* Row 1: SKY + WARDENS side-by-side */}
          <div className="flex items-baseline gap-2.5 xs:gap-3.5 sm:gap-5 md:gap-6 lg:gap-7 whitespace-nowrap">
            <span className="font-oxanium text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[120px] 2xl:text-[136px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#9ad6ff] via-[#5aa9f7] to-[#1d6fa5] leading-none">
              SKY
            </span>
            <span className="font-oxanium text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[104px] xl:text-[120px] 2xl:text-[136px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#f1f5f9] to-[#cbd5e1] leading-none">
              WARDENS
            </span>
          </div>

          {/* Row 2: Aerospace / Defence underneath */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-[0.25em] uppercase select-none mt-1.5 sm:mt-2.5 md:mt-3">
            <span className="text-[#7ec8ff]">Aerospace</span>
            <span className="text-white/40 font-normal">/</span>
            <span className="text-white">Defence</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
