"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Layers, ChevronUp, ChevronDown, RotateCcw, Zap } from "lucide-react";

export default function PlatformViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Separation Progress: 0 (Assembled) -> 1 (Spare Parts Exploded)
  const [progress, setProgress] = useState(0);
  const animProgress = useMotionValue(0);
  const springProgress = useSpring(animProgress, { stiffness: 120, damping: 20 });

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);

  // Transform layers based on springProgress (0 to 1)
  const assembledOpacity = useTransform(springProgress, [0, 0.7, 1], [1, 0.2, 0]);
  const explodedOpacity = useTransform(springProgress, [0, 0.3, 1], [0, 0.8, 1]);
  const explodedScale = useTransform(springProgress, [0, 1], [0.96, 1.02]);
  const explodedY = useTransform(springProgress, [0, 1], [8, 0]);

  // Window scroll detection within the showcase area
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // If user scrolls through page, gently trigger open between 0.35 and 0.65
      if (v > 0.35 && v < 0.85) {
        const p = Math.min(1, Math.max(0, (v - 0.35) / 0.35));
        animProgress.set(p);
        setProgress(p);
      }
    });
    return () => unsub();
  }, [scrollYProgress, animProgress]);

  // Mouse wheel handler directly on the missile stage
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Scrolling up (negative deltaY) opens/explodes spare parts, scrolling down closes
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    const newProgress = Math.min(1, Math.max(0, progress + delta));
    setProgress(newProgress);
    animProgress.set(newProgress);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleState = () => {
    const target = progress > 0.5 ? 0 : 1;
    setProgress(target);
    animProgress.set(target);
  };

  const isExploded = progress > 0.45;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex flex-col items-center justify-center select-none py-4"
    >
      {/* HUD Telemetry Top Indicator */}
      <div className="flex items-center justify-between w-full max-w-4xl px-4 mb-3 z-30">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-sky-950/70 border border-sky-500/30 text-sky-300">
            <span className={`w-1.5 h-1.5 rounded-full ${isExploded ? "bg-cyan-400 animate-ping" : "bg-sky-400"}`} />
            {isExploded ? "SPARE PARTS EXPANDED" : "FULLY ASSEMBLED"}
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
            {Math.round(progress * 100)}% SEPARATION
          </span>
        </div>

        {/* Scroll Helper / Interactive Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleState}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
          >
            <Layers className="w-3.5 h-3.5" />
            {isExploded ? "Close / Assemble" : "Explode Spare Parts"}
          </button>
        </div>
      </div>

      {/* 3D Holographic Stage */}
      <div className="relative w-full max-w-[960px] h-[340px] sm:h-[420px] flex items-center justify-center">
        
        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />

        {/* 3D Motion Perspective Card */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1100,
          }}
          className="relative z-20 w-full h-full flex items-center justify-center cursor-ns-resize"
        >
          {/* Layer 1: Fully Assembled Missile */}
          <motion.div
            style={{
              opacity: assembledOpacity,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Image
              src="/images/platform-showcase-missile.png"
              alt="Sky Wardens Assembled Platform"
              width={1024}
              height={407}
              className="w-full max-w-[920px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              priority
              unoptimized
            />
          </motion.div>

          {/* Layer 2: Exploded Spare Parts Missile (Outer Shell & Parts Open) */}
          <motion.div
            style={{
              opacity: explodedOpacity,
              scale: explodedScale,
              y: explodedY,
              filter: "drop-shadow(0 0 35px rgba(56,189,248,0.3))",
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Image
              src="/images/missile/stage_25.png"
              alt="Sky Wardens Exploded Spare Parts Platform"
              width={1024}
              height={407}
              className="w-full max-w-[920px] h-auto object-contain"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Directional Instruction & Progress Scrub Bar */}
      <div className="relative z-30 w-full max-w-xl mx-auto mt-2 px-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-sky-400 font-semibold">
            <ChevronUp className="w-3.5 h-3.5 animate-bounce" /> Scroll Up on missile to open spare parts
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <ChevronDown className="w-3.5 h-3.5" /> Scroll Down to close
          </span>
        </div>

        {/* Interactive Scrub Slider */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-500">0%</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setProgress(val);
              animProgress.set(val);
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400 focus:outline-none"
          />
          <span className="text-[10px] font-mono text-sky-400">100%</span>
        </div>
      </div>
    </div>
  );
}
