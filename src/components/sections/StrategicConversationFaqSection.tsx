"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface FaqItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    num: "01",
    question: "What sectors does Sky Wardens operate in?",
    answer:
      "Sky Wardens operates across two core strategic domains: Aerospace (unmanned aerial platforms, autonomous flight systems, and sovereign airframes) and Defence (tactical survivability, multi-layered kinetic platforms, and protective architectures).",
  },
  {
    id: "faq-2",
    num: "02",
    question: "Who does Sky Wardens work with?",
    answer:
      "Sky Wardens engages directly with government entities, sovereign defence procurement agencies, national aerospace laboratories, and verified tier-1 industrial engineering conglomerates across India, the Middle East, and allied operational theatres.",
  },
  {
    id: "faq-3",
    num: "03",
    question: "Can organisations request customised solutions?",
    answer:
      "Yes. Sky Wardens develops bespoke engineering architectures, mission-specific tactical payloads, and sovereign hardware-software stacks calibrated to unique operational environments and institutional mission demands.",
  },
];

export default function StrategicConversationFaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <section id="contact" className="relative bg-[#000208] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 overflow-hidden border-t border-white/5 scroll-mt-24">
      


      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        
        {/* ========================================================= */}
        {/* TOP PART: START A STRATEGIC CONVERSATION                 */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3 pb-4 sm:pb-6">
          
          {/* Signature Light Blue Tag matching Logo */}
          <div className="flex items-center justify-center space-x-3 select-none">
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#7ec8ff]/40" />
            <span className="w-1.5 sm:w-2 h-[1.5px] bg-[#7ec8ff]/80" />
            <span className="text-xs sm:text-[13px] font-oxanium font-bold tracking-[0.28em] text-[#7ec8ff] uppercase drop-shadow-[0_0_12px_rgba(126,200,255,0.4)]">
              CONTACT
            </span>
            <span className="w-1.5 sm:w-2 h-[1.5px] bg-[#7ec8ff]/80" />
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#7ec8ff]/40" />
          </div>

          {/* Heading */}
          <div className="w-full flex justify-center py-0.5">
            <svg
              viewBox="0 0 740 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[520px] sm:max-w-[640px] md:max-w-[720px] h-auto drop-shadow-[0_4px_24px_rgba(56,189,248,0.22)]"
              aria-label="START A STRATEGIC CONVERSATION"
            >
              <defs>
                {/* Brand Logo Shield Light Radiant Blue Sheen */}
                <linearGradient id="stratLogoShieldBlueSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#93d5ff" />
                  <stop offset="30%" stopColor="#5bb4f8" />
                  <stop offset="70%" stopColor="#288ee0" />
                  <stop offset="100%" stopColor="#1a68aa" />
                </linearGradient>

                {/* Titanium White Steel Radiant Gradient */}
                <linearGradient id="stratLogoTitaniumSteelSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#f1f5f9" />
                  <stop offset="70%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>

              {/* LINE 1: START A STRATEGIC */}
              <text
                x="50%"
                y="32"
                textAnchor="middle"
                fontFamily="var(--font-oxanium), 'Rajdhani', 'Anton', sans-serif"
                fontSize="38"
                fontWeight="900"
                letterSpacing="0.08em"
              >
                <tspan fill="url(#stratLogoTitaniumSteelSheen)">START </tspan>
                <tspan fill="url(#stratLogoShieldBlueSheen)">A </tspan>
                <tspan fill="url(#stratLogoTitaniumSteelSheen)">STRATEGIC</tspan>
              </text>

              {/* LINE 2: CONVERSATION */}
              <text
                x="50%"
                y="74"
                textAnchor="middle"
                fontFamily="var(--font-oxanium), 'Rajdhani', 'Anton', sans-serif"
                fontSize="38"
                fontWeight="900"
                letterSpacing="0.08em"
              >
                <tspan fill="url(#stratLogoShieldBlueSheen)">CONVERSATION</tspan>
              </text>
            </svg>
          </div>

          {/* Subtitle */}
          <p className="text-slate-400 text-xs sm:text-sm font-light tracking-wide max-w-xl mx-auto">
            Ideas grow through the right discussions. Start one with us today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1.5 sm:pt-2">
            {/* Contact Sky Wardens Button (Solid White Pill with Light Sweep, Radial Glow & Sliding Arrow) */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 ease-out shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.7),0_0_20px_rgba(126,200,255,0.45)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 overflow-hidden select-none cursor-pointer border border-white/90"
            >
              {/* Shimmer light sweep beam */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-sky-400/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              {/* Pulsing ambient glow */}
              <span className="absolute -inset-1 rounded-full bg-white/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="font-bold tracking-wide">
                  Contact Sky Wardens
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]" />
              </span>
            </Link>

            {/* Learn About Us Button (Dark Translucent Pill with Logo Sheen Border, Light Sweep & Sliding Arrow) */}
            <Link
              href="/about"
              className="group relative inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black/40 hover:bg-[#7ec8ff]/10 text-slate-200 hover:text-white border border-white/20 hover:border-[#7ec8ff]/90 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ease-out backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(126,200,255,0.45),inset_0_0_15px_rgba(126,200,255,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 overflow-hidden select-none cursor-pointer"
            >
              {/* Shimmer / Light beam sweep effect on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="transition-colors duration-300 group-hover:text-[#e0f2fe]">
                  Learn About Us
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#7ec8ff] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(126,200,255,0.9)]" />
              </span>
            </Link>
          </div>

        </div>

        {/* Divider Line */}
        <div className="w-full border-t border-white/10" />

        {/* ========================================================= */}
        {/* BOTTOM PART: FREQUENTLY ASKED QUESTIONS                   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 pt-6 sm:pt-8 items-start">
          
          {/* LEFT: Heading */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-[1.15]">
              FREQUENTLY ASKED <br />
              QUESTIONS
            </h3>
          </div>

          {/* RIGHT: Accordion FAQ List */}
          <div className="lg:col-span-7 divide-y divide-white/10">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaq === item.id;

              return (
                <div key={item.id} className="py-5 sm:py-6 first:pt-0 last:pb-0">
                  {/* Accordion Question Bar */}
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-center justify-between gap-4 text-left group transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                      {/* Cyan Number */}
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-sky-400 mt-0.5 sm:mt-0 shrink-0">
                        {item.num}
                      </span>
                      {/* Question Text */}
                      <span className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-white transition-colors">
                        {item.question}
                      </span>
                    </div>

                    {/* Circular Chevron Toggle Button */}
                    <div
                      className={`w-8 h-8 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-sky-400/50 group-hover:bg-white/[0.08] ${
                        isOpen ? "bg-sky-500/20 border-sky-400 text-sky-300" : "text-slate-400"
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3.5 pl-7 sm:pl-8 pr-4">
                          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
