"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroRocketLaunchVisual() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[520px] lg:min-h-[620px] flex items-center justify-center select-none overflow-visible">
      
      {/* 1. Deep Atmospheric Sky-Blue Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(14,165,233,0.1)_35%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_60%)] blur-3xl pointer-events-none" />

      {/* 2. Full-Bleed Laptop & Launch Cloud Base from User's Exact Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[840px] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center"
      >
        {/* Exact Base Composition Image with Feathered Dark Blue Edge Blending */}
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-user-rocket-full.png"
            alt="Sky Wardens Aerospace Strategic Rocket Launching from Laptop"
            fill
            className="object-contain object-center filter contrast-[1.05] brightness-[1.02]"
            priority
            unoptimized
          />

          {/* Seamless Edge Gradient Fade Masks (left, right, top, bottom) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#01040a] via-transparent to-[#01040a]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01040a] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 3. Rocket Rising Slowly from the Laptop Screen */}
        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0.92 }}
          animate={{
            y: isHovered ? -20 : 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            y: { duration: 2.8, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 2.8, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 1.6, ease: "easeOut" },
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Continuous Hover / Float Physics */}
          <motion.div
            animate={{
              y: [-6, 8, -6],
              rotate: [-0.5, 0.5, -0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Pulsating Engine Thrust Flame Glow Overlay */}
            <motion.div
              animate={{
                opacity: [0.35, 0.75, 0.35],
                scaleY: isHovered ? [1.1, 1.3, 1.1] : [0.95, 1.15, 0.95],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute top-[48%] left-1/2 -translate-x-1/2 w-28 sm:w-40 h-40 sm:h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9)_0%,rgba(249,115,22,0.8)_25%,rgba(56,189,248,0.4)_50%,transparent_75%)] blur-xl pointer-events-none mix-blend-screen"
            />
          </motion.div>
        </motion.div>

      </motion.div>

    </div>
  );
}
