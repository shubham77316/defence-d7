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
    dockedTop: 16,
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
      const target = document.getElementById("navbar-wordmark-container");
      const emblem = document.getElementById("navbar-emblem");

      if (!anchor) return;

      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const anchorRect = anchor.getBoundingClientRect();

      const anchorInitialTop = anchorRect.top + currentScroll;
      const startLeft = anchorRect.left;
      const startHeight = anchorRect.height || 180;

      let dockedTop = 16;
      let dockedLeft = startLeft + 52;
      let targetScale = 0.22;

      if (target) {
        const tRect = target.getBoundingClientRect();
        dockedTop = tRect.top;
        dockedLeft = tRect.left;
        targetScale = Math.min(0.3, Math.max(0.18, (tRect.height || 36) / startHeight));
      } else if (emblem) {
        const eRect = emblem.getBoundingClientRect();
        dockedTop = eRect.top + (eRect.height - 32) / 2;
        dockedLeft = eRect.right + 12;
      }

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

      applyTransform();
    };

    const applyTransform = () => {
      if (!containerRef.current || !metricsRef.current.ready) return;

      const m = metricsRef.current;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const progress = Math.min(1, Math.max(0, scrollY / m.scrollThreshold));

      // Read live target bounding box if available for pixel-perfect landing
      const target = document.getElementById("navbar-wordmark-container");
      let liveDockedTop = m.dockedTop;
      let liveDockedLeft = m.dockedLeft;

      if (target) {
        const tRect = target.getBoundingClientRect();
        if (tRect.top > 0) {
          liveDockedTop = tRect.top;
          liveDockedLeft = tRect.left;
        }
      }

      // Smooth interpolation of position and scale
      const currentTop = Math.max(liveDockedTop, m.anchorInitialTop - scrollY);
      const currentLeft = m.startLeft + (liveDockedLeft - m.startLeft) * progress;
      const currentScale = 1.0 + (m.targetScale - 1.0) * progress;

      // Cross-fade: floating wordmark smoothly dissolves into native navbar wordmark between 100px and 220px
      const fadeProgress = Math.min(1, Math.max(0, (scrollY - 100) / 120));
      const floatingOpacity = 1 - fadeProgress;

      containerRef.current.style.top = `${currentTop}px`;
      containerRef.current.style.left = `${currentLeft}px`;
      containerRef.current.style.transform = `scale(${currentScale})`;
      containerRef.current.style.opacity = `${floatingOpacity}`;
      containerRef.current.style.pointerEvents = floatingOpacity > 0.5 ? "auto" : "none";
    };

    measure();

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(applyTransform);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    const win = window as any;
    if (win.lenis) {
      win.lenis.on("scroll", onScroll);
    }

    const timer1 = setTimeout(measure, 60);
    const timer2 = setTimeout(measure, 250);

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
        opacity: 0,
      }}
      className="select-none will-change-transform will-change-[opacity]"
    >
      <Link href="/" className="cursor-pointer inline-block">
        {/* Monumental Stacked Brand Wordmark (Exact Hero Design) */}
        <div className="flex flex-col items-start select-none -space-y-3 sm:-space-y-5 md:-space-y-7 lg:-space-y-9 xl:-space-y-11">
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
      </Link>
    </div>
  );
}
