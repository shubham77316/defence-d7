"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Layers, Factory } from "lucide-react";

export default function AboutOverviewSection() {
  const cards = [
    {
      id: "sectors",
      index: "01",
      label: "SECTORS",
      metric: "04",
      desc: "Aerospace, Defence, Advanced Systems, and Petrochemical industrial verticals engineered in tandem.",
      tags: ["UAS", "Armament", "Robotics", "Polymers"],
      icon: Layers,
      image: "/images/foundation-sectors.jpg",
      initial: { opacity: 0, y: 30 },
      delay: 0.1
    },
    {
      id: "model",
      index: "02",
      label: "MODEL",
      metric: "B2G",
      desc: "Government, institutional, defence forces, and strategic partner ecosystem engagement.",
      tags: ["Defence Procurement", "Sovereign R&D"],
      icon: Shield,
      image: "/images/foundation-model.jpg",
      initial: { opacity: 0, y: 30 },
      delay: 0.2
    },
    {
      id: "direction",
      index: "03",
      label: "DIRECTION",
      metric: "Long Term",
      desc: "Sovereign capability, manufacturing scale, and high-tolerance execution built to endure across decades.",
      tags: ["Deep IP", "Precision Tooling"],
      icon: Factory,
      image: "/images/foundation-direction.jpg",
      initial: { opacity: 0, y: 30 },
      delay: 0.3
    }
  ];

  return (
    <section className="relative py-24 bg-[#010308] border-t border-white/10 overflow-hidden">
      {/* Studio Blue Radial Spotlight in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          {/* Tagline Pill matching reference image */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#060e20]/80 border border-sky-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[10px] font-mono tracking-[0.22em] text-sky-200 uppercase font-medium">
              02 // STRATEGIC FOUNDATION
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-[1.08]">
            BUILT FOR WHAT THE <br />
            <span className="text-slate-300 font-light italic">
              DEFENCE WORLD NEEDS
            </span>
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl mx-auto">
            Sky Wardens was established to develop durable industrial capability, sovereign systems and strategic technologies designed for multi-decade deployment.
          </p>
        </motion.div>

        {/* 3 Core Metric Studio Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={card.initial}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: card.delay }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative rounded-2xl overflow-hidden group flex flex-col justify-between min-h-[340px] cursor-pointer shadow-xl border border-white/10 hover:border-sky-400/50 transition-all duration-300"
              >
                {/* Background Image - Always Visible */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className="object-cover object-center brightness-[0.8] contrast-110 saturate-110 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                  {/* Subtle dark gradient at bottom for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Image-state content: Small label visible on image */}
                <div className="relative z-10 p-7 sm:p-8 flex flex-col justify-end h-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono text-sky-400 font-bold tracking-wider">
                      {card.index}
                    </span>
                    <span className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] font-semibold">
                      {card.label}
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight drop-shadow-lg">
                    {card.metric}
                  </div>
                </div>

                {/* White Poster Overlay - Slides Down from Top on Hover */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform pointer-events-auto">
                    <div className="w-full h-full bg-white/95 backdrop-blur-sm p-7 sm:p-8 flex flex-col justify-between">
                      {/* Header */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-sky-600 font-bold tracking-wider">
                              {card.index}
                            </span>
                            <span className="text-[11px] font-mono text-slate-600 uppercase tracking-[0.2em] font-semibold">
                              {card.label}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">
                            <IconComponent className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Metric */}
                        <div className="text-4xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">
                          {card.metric}
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[320px]">
                          {card.desc}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-2">
                        {card.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-mono text-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white/[0.04] hover:bg-white text-slate-200 hover:text-slate-950 border border-white/20 hover:border-white text-[11px] font-semibold font-mono uppercase tracking-[0.2em] transition-all duration-300 shadow-md group rounded-md"
          >
            <span>LEARN MORE ABOUT SKY WARDENS</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
