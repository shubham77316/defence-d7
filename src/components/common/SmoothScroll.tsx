"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Ultra-luxurious, buttery-smooth Lenis momentum configuration
    const lenis = new Lenis({
      duration: 1.4, // Luxurious smooth inertia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential silky glide
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95, // Soft, fluid mouse wheel step
      touchMultiplier: 1.6, // Natural touch responsiveness
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for external components
    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    // High-performance requestAnimationFrame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth scroll for in-page anchor links (e.g. #mission, #businesses)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const elem = document.querySelector(href);
        if (elem && lenisRef.current) {
          e.preventDefault();
          lenisRef.current.scrollTo(elem as HTMLElement, { offset: -70, duration: 1.5 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as any).lenis;
      }
    };
  }, []);

  // Smooth scroll to top instantly on page navigation
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
