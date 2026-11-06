"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingHeroWordmark() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateARef = useRef<HTMLDivElement>(null);
  const stateBRef = useRef<HTMLDivElement>(null);

  const metricsRef = useRef({
    anchorInitialTop: 240,
    startLeft: 48,
    startHeight: 200,
    dockedTop: 22,
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
      const emblemHeight = emblemRect ? emblemRect.height : 44;
      const emblemRight = emblemRect ? emblemRect.right : startLeft + 48;

      // Target scaled height when docked in navbar
      const targetHeight = Math.max(26, Math.min(34, emblemHeight * 0.78));
      const targetScale = Math.min(0.32, Math.max(0.18, targetHeight / startHeight));

      // Docked coordinates: moved lower so SKY WARDENS centers right alongside the emblem
      const dockedTop = emblemTop + (emblemHeight - 26) / 2 + 2;
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

      // Dynamically measure live emblem position for 100% accurate alignment on scroll
      const emblem = document.getElementById("navbar-emblem");
      let targetDockedTop = m.dockedTop;
      let targetDockedLeft = m.dockedLeft;

      if (emblem) {
        const eRect = emblem.getBoundingClientRect();
        targetDockedTop = eRect.top + (eRect.height - 26) / 2 + 2;
        targetDockedLeft = eRect.right + 12;
      }

      // Smooth interpolation
      const currentTop = Math.max(targetDockedTop, m.anchorInitialTop - scrollY);
      const currentLeft = m.startLeft + (targetDockedLeft - m.startLeft) * progress;
      const currentScale = 1.0 + (m.targetScale - 1.0) * progress;

      containerRef.current.style.top = `${currentTop}px`;
      containerRef.current.style.left = `${currentLeft}px`;
      containerRef.current.style.transform = `scale(${currentScale})`;
      containerRef.current.style.pointerEvents = progress > 0.8 ? "auto" : "none";
      containerRef.current.style.opacity = "1";

      // Cross-fade between State A (Hero stacked) and State B (Navbar horizontal)
      const fadeStart = 0.35;
      const fadeEnd = 0.65;
      let opacityA = 1;
      let opacityB = 0;

      if (progress <= fadeStart) {
        opacityA = 1;
        opacityB = 0;
      } else if (progress >= fadeEnd) {
        opacityA = 0;
        opacityB = 1;
      } else {
        const t = (progress - fadeStart) / (fadeEnd - fadeStart);
        opacityA = 1 - t;
        opacityB = t;
      }

      if (stateARef.current) {
        stateARef.current.style.opacity = `${opacityA}`;
      }
      if (stateBRef.current) {
        stateBRef.current.style.opacity = `${opacityB}`;
      }
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
        <div className="relative select-none">
          {/* State A: Monumental Stacked (Hero down position - exact original design) */}
          <div
            ref={stateARef}
            style={{ opacity: 1 }}
            className="flex flex-col items-start select-none -space-y-3 sm:-space-y-5 md:-space-y-7 lg:-space-y-9 xl:-space-y-11"
          >
            {/* Row 1: SKY on left + Aerospace / Defence directly above 'DENS' */}
            <div className="flex items-baseline gap-3 sm:gap-5 md:gap-7 lg:gap-8 flex-wrap">
              <span className="font-oxanium text-7xl xs:text-8xl sm:text-9xl md:text-[120px] lg:text-[142px] xl:text-[164px] 2xl:text-[180px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#9ad6ff] via-[#5aa9f7] to-[#1d6fa5] leading-none">
                SKY
              </span>

              {/* Exact 'Aerospace / Defence' tagline above DENS */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-[0.2em] uppercase select-none pb-1 sm:pb-3 md:pb-5 lg:pb-7">
                <span className="text-[#7ec8ff]">Aerospace</span>
                <span className="text-white/40 font-normal">/</span>
                <span className="text-white">Defence</span>
              </div>
            </div>

            {/* Row 2: WARDENS */}
            <span className="font-oxanium text-7xl xs:text-8xl sm:text-9xl md:text-[120px] lg:text-[142px] xl:text-[164px] 2xl:text-[180px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#f1f5f9] to-[#cbd5e1] leading-none">
              WARDENS
            </span>
          </div>

          {/* State B: Horizontal Wordmark (Navbar top docked position - exact uploaded image) */}
          <div
            ref={stateBRef}
            style={{ opacity: 0 }}
            className="absolute top-0 left-0 flex flex-col items-start select-none pointer-events-none"
          >
            {/* Row 1: SKY + WARDENS side-by-side */}
            <div className="flex items-baseline gap-3 sm:gap-4 whitespace-nowrap">
              <span className="font-oxanium text-7xl xs:text-8xl sm:text-9xl md:text-[120px] lg:text-[142px] xl:text-[164px] 2xl:text-[180px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#9ad6ff] via-[#5aa9f7] to-[#1d6fa5] leading-none">
                SKY
              </span>
              <span className="font-oxanium text-7xl xs:text-8xl sm:text-9xl md:text-[120px] lg:text-[142px] xl:text-[164px] 2xl:text-[180px] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#f1f5f9] to-[#cbd5e1] leading-none">
                WARDENS
              </span>
            </div>

            {/* Row 2: AEROSPACE / DEFENCE underneath */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold tracking-[0.25em] uppercase select-none mt-2 sm:mt-2.5">
              <span className="text-[#7ec8ff]">AEROSPACE</span>
              <span className="text-white/40 font-normal">/</span>
              <span className="text-white">DEFENCE</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
