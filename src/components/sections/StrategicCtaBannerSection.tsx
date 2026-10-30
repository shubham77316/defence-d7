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
      <div className="w-full px-2.5 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Content Data & CTAs (Aligned with Logo) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6 text-left order-2 lg:order-1">
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
                <h2 className="font-oxanium text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black uppercase tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-400 drop-shadow-[0_4px_24px_rgba(56,189,248,0.22)]">
                  {data.ctaBannerTitle}
                </h2>
              </div>
            )}

            {/* Subtitle / Paragraph from CMS */}
            {Boolean(data.ctaBannerDesc && data.ctaBannerDesc.trim()) && (
              <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal select-none max-w-3xl">
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
                    className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#93d5ff] via-[#5bb4f8] to-[#288ee0] hover:brightness-105 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_16px_rgba(40,142,224,0.3)] hover:shadow-[0_6px_22px_rgba(40,142,224,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center cursor-pointer border border-sky-300/40"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="tracking-wide">
                        {data.ctaBannerButtonText}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-950 font-bold transition-transform duration-200 ease-out group-hover:translate-x-1" />
                    </span>
                  </Link>
                )}

                {Boolean(data.ctaBannerSecondaryButtonText && data.ctaBannerSecondaryButtonText.trim()) && (
                  <Link
                    href={data.ctaBannerSecondaryButtonLink || "/capabilities"}
                    className="group relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 hover:border-white/30 text-xs sm:text-sm font-semibold tracking-wide hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center cursor-pointer"
                  >
                    <span className="tracking-wide">
                      {data.ctaBannerSecondaryButtonText}
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right: Pure Transparent Robotic Arm Cutout (Aligned with Contact Button) */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end items-center relative order-1 lg:order-2">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center lg:justify-end">
              <Image
                src="/images/modular-robotic-arm-transparent.png"
                alt="Sky Wardens Advanced Robotic Manipulator"
                fill
                sizes="(max-width: 768px) 100vw, 440px"
                className="object-contain object-center lg:object-right drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] relative z-10"
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
