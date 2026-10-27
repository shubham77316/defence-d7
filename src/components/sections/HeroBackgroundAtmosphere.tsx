"use client";

import React from "react";

export default function HeroBackgroundAtmosphere() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none bg-black flex items-center justify-center">
      {/* 1. Full Screen HD Background Video on Desktop */}
      <div className="hidden sm:flex absolute inset-0 w-full h-full items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[1.05]"
        >
          <source src="/videos/hero-grenade-hd.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Top Header Gradient (Protects Navbar) */}
      <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

      {/* 3. Bottom Gradient (Protects Headline & Buttons) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

      {/* 4. Left-Side Subtle Desktop Contrast (Keeps Left Text Crisp on Larger Screens) */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
