import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CinematicVideoSection() {
  return (
    <section className="relative py-28 bg-[#010308] border-t border-white/10 overflow-hidden">
      {/* Studio Blue Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_65%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-Width Editorial Feature Frame with High-End Photography */}
        <div className="relative rounded-2xl bg-[#040814]/90 border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl backdrop-blur-xl">
          
          {/* Background Proving Grounds Visual */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <Image
              src="/images/industrial-proving-grounds.jpg"
              alt="Precision Industrial Aerospace Proving Grounds"
              fill
              className="object-cover object-center brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040814] via-[#040814]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-[#040814]" />
          </div>

          <div className="max-w-3xl space-y-7 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#060e20]/80 border border-sky-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="text-[10px] font-mono tracking-[0.22em] text-sky-200 uppercase font-medium">
                04 // PROVING GROUNDS &amp; VALIDATION
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Engineering What <br />
              <span className="font-light italic text-slate-300">Comes Next</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Sky Wardens deploys specialized testing infrastructure spanning wind tunnels, live-fire ballistic ranges, anechoic chambers, and advanced tribology synthesis to guarantee mission readiness.
            </p>

            {/* Structured Metric Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="space-y-1">
                <div className="spec-label text-[10px] text-sky-400 font-bold">AERODYNAMICS</div>
                <div className="text-sm font-semibold text-white">Transonic Evaluation</div>
              </div>
              <div className="space-y-1">
                <div className="spec-label text-[10px] text-emerald-400 font-bold">SURVIVABILITY</div>
                <div className="text-sm font-semibold text-white">STANAG Ballistic Range</div>
              </div>
              <div className="space-y-1">
                <div className="spec-label text-[10px] text-amber-400 font-bold">ELECTRONICS</div>
                <div className="text-sm font-semibold text-white">Anechoic RF Chamber</div>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/capabilities"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-slate-950 hover:bg-slate-200 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg rounded-md"
              >
                <span>View Validation Facilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
