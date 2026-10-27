"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CAPABILITIES_DATA } from "@/data/capabilities";
import { ArrowRight, Cpu, Radio, Shield, Target, Award, Zap, Compass, CheckCircle2 } from "lucide-react";

export default function CapabilitiesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Aerospace Systems", "Defence Engineering", "Advanced Systems", "Petrochemical"];

  const filteredCapabilities =
    activeCategory === "All"
      ? CAPABILITIES_DATA
      : CAPABILITIES_DATA.filter((cap) => cap.category === activeCategory);

  return (
    <section className="relative py-28 bg-slate-950 overflow-hidden border-t border-slate-900">
      {/* Grid Pattern & Depth Lights */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="cyan" size="sm">
              Technology Matrix
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
              Sovereign Supremacy
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Multi-domain technological capabilities developed for mission success in extreme operating conditions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Capability Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapabilities.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between group hover:border-cyan-400/60 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                    {item.readinessLevel}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {item.metrics.map((m) => (
                    <div key={m.label} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                      <div className="text-xs font-mono font-bold text-cyan-300 mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <Button
            href="/technology"
            variant="secondary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Autonomous &amp; AI Systems
          </Button>
        </div>

      </div>
    </section>
  );
}
