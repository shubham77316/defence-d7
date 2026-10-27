"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface StrategicCtaBannerProps {
  initialData?: {
    ctaBannerTitle?: string;
    ctaBannerDesc?: string;
    ctaBannerButtonText?: string;
    ctaBannerButtonLink?: string;
    ctaBannerSecondaryButtonText?: string;
    ctaBannerSecondaryButtonLink?: string;
  };
}

export default function StrategicCtaBannerSection({ initialData }: StrategicCtaBannerProps) {
  const [data, setData] = useState({
    ctaBannerTitle: initialData?.ctaBannerTitle ?? "SHAPING SOVEREIGN DEFENCE READINESS",
    ctaBannerDesc:
      initialData?.ctaBannerDesc ??
      "Partner with Sky Wardens to engineer and deploy next-generation autonomous aerospace airframes, multi-domain defence systems, and resilient industrial technologies.",
    ctaBannerButtonText: initialData?.ctaBannerButtonText ?? "Initiate Strategic Liaison",
    ctaBannerButtonLink: initialData?.ctaBannerButtonLink ?? "/contact",
    ctaBannerSecondaryButtonText: initialData?.ctaBannerSecondaryButtonText ?? "",
    ctaBannerSecondaryButtonLink: initialData?.ctaBannerSecondaryButtonLink ?? "/capabilities",
  });

  useEffect(() => {
    const fetchCta = async () => {
      try {
        const res = await fetch("/api/homepage", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setData({
              ctaBannerTitle: json.data.ctaBannerTitle !== undefined ? json.data.ctaBannerTitle : "",
              ctaBannerDesc: json.data.ctaBannerDesc !== undefined ? json.data.ctaBannerDesc : "",
              ctaBannerButtonText: json.data.ctaBannerButtonText !== undefined ? json.data.ctaBannerButtonText : "",
              ctaBannerButtonLink: json.data.ctaBannerButtonLink || "/contact",
              ctaBannerSecondaryButtonText:
                json.data.ctaBannerSecondaryButtonText !== undefined ? json.data.ctaBannerSecondaryButtonText : "",
              ctaBannerSecondaryButtonLink: json.data.ctaBannerSecondaryButtonLink || "/capabilities",
            });
          }
        }
      } catch (err) {
        // Fallback silently
      }
    };
    fetchCta();
  }, []);

  return (
    <section className="relative w-full bg-[#000208] text-white pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8 md:pb-10 overflow-hidden border-t border-white/5 select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Content Data & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left order-2 lg:order-1">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs sm:text-[13px] font-medium text-slate-300 tracking-wide">
                Introducing Next-Gen Sovereign Systems
              </span>
            </div>

            {/* Monumental Headline in Signature Radiant Blue & Titanium White Sheen */}
            {Boolean(data.ctaBannerTitle && data.ctaBannerTitle.trim()) && (
              <div className="w-full py-0.5 select-none">
                <h2 className="font-oxanium text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-400 drop-shadow-[0_4px_24px_rgba(56,189,248,0.22)]">
                  {data.ctaBannerTitle}
                </h2>
              </div>
            )}

            {/* Subtitle / Paragraph from CMS */}
            {Boolean(data.ctaBannerDesc && data.ctaBannerDesc.trim()) && (
              <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal select-none max-w-2xl">
                {data.ctaBannerDesc}
              </p>
            )}

            {/* CTA Buttons from CMS */}
            {(Boolean(data.ctaBannerButtonText && data.ctaBannerButtonText.trim()) ||
              Boolean(data.ctaBannerSecondaryButtonText && data.ctaBannerSecondaryButtonText.trim())) && (
              <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-4">
                {Boolean(data.ctaBannerButtonText && data.ctaBannerButtonText.trim()) && (
                  <Link
                    href={data.ctaBannerButtonLink || "/contact"}
                    className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#93d5ff] via-[#5bb4f8] to-[#288ee0] hover:from-[#b6e5ff] hover:via-[#7ec8ff] hover:to-[#3ba1f3] text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(91,180,248,0.45)] hover:shadow-[0_0_40px_rgba(147,213,255,0.8),0_0_15px_rgba(255,255,255,0.5)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 transition-all duration-300 ease-out rounded-full overflow-hidden text-center cursor-pointer border border-sky-200/50"
                  >
                    {/* Shimmer / Light beam sweep effect on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                    {/* Pulsing ambient radial glow */}
                    <span className="absolute -inset-1 rounded-full bg-sky-300/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <span className="relative z-10 flex items-center gap-2">
                      <span className="tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
                        {data.ctaBannerButtonText}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-950 font-bold transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]" />
                    </span>
                  </Link>
                )}

                {Boolean(data.ctaBannerSecondaryButtonText && data.ctaBannerSecondaryButtonText.trim()) && (
                  <Link
                    href={data.ctaBannerSecondaryButtonLink || "/capabilities"}
                    className="group relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black/40 hover:bg-[#7ec8ff]/10 text-slate-200 hover:text-white border border-white/20 hover:border-[#7ec8ff]/90 text-xs sm:text-sm font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(126,200,255,0.45),inset_0_0_15px_rgba(126,200,255,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 backdrop-blur-md transition-all duration-300 ease-out overflow-hidden text-center cursor-pointer"
                  >
                    {/* Subtle glassy shine sweep */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                    <span className="relative z-10 tracking-wide transition-colors duration-300 group-hover:text-[#e0f2fe]">
                      {data.ctaBannerSecondaryButtonText}
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right: Pure Transparent Robotic Arm Cutout */}
          <div className="lg:col-span-5 flex justify-center items-center relative order-1 lg:order-2">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center">
              <Image
                src="/images/modular-robotic-arm-transparent.png"
                alt="Sky Wardens Advanced Robotic Manipulator"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain object-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] relative z-10"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
