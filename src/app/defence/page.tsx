"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  overview?: string;
  information?: string;
}

interface DefenceSection {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  products: ProductItem[];
}

const DEFENCE_SECTIONS: DefenceSection[] = [
  {
    id: "helmets",
    number: "01",
    name: "Helmets",
    subtitle: "Ballistic and tactical head protection systems for field deployment.",
    products: [
      {
        id: "abhedya-level-iii",
        name: "Abhedya Level III Helmet",
        desc: "Protective headgear solution designed for defence and tactical deployment requirements.",
        overview: "Protective headgear solution designed for defence and tactical deployment requirements.",
        information: "Detailed specifications, sizing, and procurement information are available on request.",
        image: "/images/helmet-abhedya-level3.jpg"
      },
      {
        id: "ballistic-helmet-nij",
        name: "Ballistic Helmet NIJ",
        desc: "Ballistic helmet platform positioned for operational head protection and readiness.",
        overview: "Ballistic helmet platform positioned for operational head protection and readiness.",
        information: "Detailed specifications, sizing, and procurement information are available on request.",
        image: "/images/helmet-ballistic-nij.jpg"
      },
      {
        id: "vajra-helmet",
        name: "Vajra Helmet",
        desc: "Tactical helmet offering structured protection for frontline and response roles.",
        image: "/images/helmet-vajra-riot.jpg"
      }
    ]
  },
  {
    id: "shoes-boots",
    number: "02",
    name: "Shoes & Boots",
    subtitle: "Anti-spike and terrain-ready military footwear for varied operating conditions.",
    products: [
      {
        id: "canvas-jungle-anti-spike",
        name: "Canvas Jungle Anti-Spike Military Boots",
        desc: "Jungle-oriented anti-spike boots built for demanding terrain and field movement.",
        image: "/images/boots-canvas-jungle.jpg"
      },
      {
        id: "leather-jungle-anti-spike",
        name: "Leather Jungle Anti-Spike Military Boots",
        desc: "Leather anti-spike jungle boots configured for sustained outdoor defence use.",
        image: "/images/boots-leather-jungle.jpg"
      },
      {
        id: "leather-snow-adventure",
        name: "Leather Snow Adventure Military Boots",
        desc: "Cold-condition military boots developed for snow and high-exposure movement.",
        image: "/images/boots-snow-adventure.jpg"
      }
    ]
  },
  {
    id: "gloves",
    number: "03",
    name: "Gloves",
    subtitle: "Shock-resistant and tactical hand protection for operational use.",
    products: [
      {
        id: "stun-shock-dorsal-half-finger",
        name: "Stun Shock Proof Dorsal Half Finger Military Gloves",
        desc: "Half-finger glove platform shaped for tactical grip and shock-resistant handling.",
        image: "/images/gloves-dorsal-half-finger.jpg"
      },
      {
        id: "stun-shock-full-finger",
        name: "Stun Shock Proof Full Finger Military Gloves",
        desc: "Full-finger military gloves built for protected handling and operational comfort.",
        image: "/images/gloves-full-finger-stun.jpg"
      },
      {
        id: "stun-shock-half-finger",
        name: "Stun Shock Proof Military Half Finger Gloves",
        desc: "Shock-resistant half-finger gloves intended for fast-response tactical movement.",
        image: "/images/gloves-military-half-finger.jpg"
      },
      {
        id: "stun-shock-tactical-half-finger",
        name: "Stun Shock Proof Tactical Half Finger Military Glove",
        desc: "Tactical half-finger glove designed for dexterity, grip, and field protection.",
        image: "/images/gloves-tactical-half-finger.jpg"
      }
    ]
  },
  {
    id: "jackets-outerwear",
    number: "04",
    name: "Jackets & Outerwear",
    subtitle: "All-weather tactical jackets, body armor carriers, and ballistic vests.",
    products: [
      {
        id: "shakti-marine-jacket",
        name: "Shakti Marine Jacket",
        desc: "Operational marine outerwear tailored for durable duty use and layered protection.",
        image: "/images/jacket-shakti-marine.jpg"
      },
      {
        id: "shakti-vip-jackets",
        name: "Shakti VIP Jackets",
        desc: "Protective jacket line intended for discreet defence and VIP movement requirements.",
        image: "/images/jacket-shakti-vip.jpg"
      },
      {
        id: "shakti-level-iii-bulletproof",
        name: "Shakti - Level III bulletproof Jacket",
        desc: "Bulletproof torso protection configured for frontline defence applications.",
        image: "/images/jacket-shakti-level3.jpg"
      },
      {
        id: "shakti-level-iv-bulletproof",
        name: "Shakti Level Iv bulletproof Jacket",
        desc: "Higher-protection ballistic jacket platform for demanding threat environments.",
        image: "/images/jacket-shakti-level4.png"
      },
      {
        id: "shakti-tactical-jacket",
        name: "Shakti Tactical Jacket",
        desc: "Tactical protective jacket designed for operational mobility and field readiness.",
        image: "/images/jacket-shakti-tactical.png"
      }
    ]
  },
  {
    id: "riot-control",
    number: "05",
    name: "Riot Control",
    subtitle: "Protective gear for crowd-control, public-order, and response operations.",
    products: [
      {
        id: "riot-shield",
        name: "Riot Shield",
        desc: "Protective riot shield solution for public-order response and controlled engagement.",
        image: "/images/riot-shield.png"
      },
      {
        id: "vajra-riot-female-suit",
        name: "Vajra Riot Control Female Suit",
        desc: "Riot-control protective suit tailored for female response personnel.",
        image: "/images/riot-female-suit.png"
      },
      {
        id: "vajra-riot-male-suit",
        name: "Vajra Riot Control Male Suit",
        desc: "Riot-control protective suit configured for male operational response teams.",
        image: "/images/riot-male-suit.png"
      },
      {
        id: "vajra-riot-control-suit",
        name: "Vajra Riot Control Suit",
        desc: "Protective suit system intended for riot-control and public-order deployment.",
        image: "/images/riot-vajra-suit.png"
      }
    ]
  },
  {
    id: "impact-tools",
    number: "06",
    name: "Impact Tools",
    subtitle: "Tactical breaching equipment, expandable batons, and specialized forcible entry tools.",
    products: [
      {
        id: "dandd-stun-baton",
        name: "Dandd Stun Baton",
        desc: "Close-response stun baton designed for controlled tactical engagement scenarios.",
        image: "/images/baton-dandd-stun.png"
      },
      {
        id: "vajra-stun-baton",
        name: "Vajra Stun Baton",
        desc: "Response baton platform intended for security, control, and field support use.",
        image: "/images/baton-vajra-stun.png"
      }
    ]
  }
];

export default function DefencePage() {
  const [sections, setSections] = useState<DefenceSection[]>(DEFENCE_SECTIONS);
  const [activeSectionId, setActiveSectionId] = useState("helmets");
  const [modalProduct, setModalProduct] = useState<ProductItem | null>(null);
  const [modalSection, setModalSection] = useState<DefenceSection | null>(null);

  const handleNextModal = () => {
    if (!modalProduct) return;
    const allPlatforms = sections.flatMap((sec) =>
      sec.products.map((prod) => ({ product: prod, section: sec }))
    );
    const currIdx = allPlatforms.findIndex((item) => item.product.id === modalProduct.id);
    if (currIdx === -1) return;
    const nextIdx = (currIdx + 1) % allPlatforms.length;
    setModalProduct(allPlatforms[nextIdx].product);
    setModalSection(allPlatforms[nextIdx].section);
  };

  const handlePrevModal = () => {
    if (!modalProduct) return;
    const allPlatforms = sections.flatMap((sec) =>
      sec.products.map((prod) => ({ product: prod, section: sec }))
    );
    const currIdx = allPlatforms.findIndex((item) => item.product.id === modalProduct.id);
    if (currIdx === -1) return;
    const prevIdx = (currIdx - 1 + allPlatforms.length) % allPlatforms.length;
    setModalProduct(allPlatforms[prevIdx].product);
    setModalSection(allPlatforms[prevIdx].section);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalProduct || !modalSection) return;
      if (e.key === "Escape") setModalProduct(null);
      if (e.key === "ArrowRight") handleNextModal();
      if (e.key === "ArrowLeft") handlePrevModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalProduct, modalSection]);

  useEffect(() => {
    async function loadDynamicDefence() {
      try {
        const res = await fetch("/api/products?sector=defence&status=active", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = await res.json();
        const liveProducts = Array.isArray(json.data) ? json.data : (json.data?.data || []);
        if (!liveProducts || liveProducts.length === 0) return;

        setSections((prevSections) => {
          const newSections: DefenceSection[] = prevSections.map((sec) => ({
            ...sec,
            products: [...sec.products],
          }));

          liveProducts.forEach((dbProd: any) => {
            const prodName = dbProd.name || "Untitled";
            const prodDesc = dbProd.desc || "";
            const prodOverview = dbProd.overview || "";
            const prodInfo = dbProd.information || "";
            const prodImg = (dbProd.image && typeof dbProd.image === "string") ? dbProd.image.trim() : "";
            const prodCat = (dbProd.category || "Helmets").trim();
            const prodId = dbProd.slug || dbProd._id || prodName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            // Look for matching category section
            let targetSection = newSections.find(
              (sec) =>
                sec.name.toLowerCase() === prodCat.toLowerCase() ||
                sec.id.toLowerCase() === prodCat.toLowerCase().replace(/[^a-z0-9]+/g, "-")
            );

            // If not found, create new section dynamically
            if (!targetSection) {
              const secNum = dbProd.categoryNumber || String(newSections.length + 1).padStart(2, "0");
              targetSection = {
                id: prodCat.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                number: secNum,
                name: prodCat,
                subtitle: dbProd.categorySubtitle || "Ballistic and tactical defence gear for field deployment.",
                products: [],
              };
              newSections.push(targetSection);
            }

            // Check if product already exists in section
            const existingIdx = targetSection.products.findIndex(
              (p) =>
                p.id === prodId ||
                p.name.toLowerCase().trim() === prodName.toLowerCase().trim()
            );

            if (existingIdx !== -1) {
              targetSection.products[existingIdx] = {
                ...targetSection.products[existingIdx],
                name: prodName,
                desc: prodDesc,
                overview: prodOverview || targetSection.products[existingIdx].overview,
                information: prodInfo || targetSection.products[existingIdx].information,
                image: prodImg,
              };
            } else {
              targetSection.products.push({
                id: prodId,
                name: prodName,
                desc: prodDesc,
                overview: prodOverview,
                information: prodInfo,
                image: prodImg,
              });
            }
          });

          return newSections;
        });
      } catch (err) {
        console.warn("Failed to fetch dynamic defence products:", err);
      }
    }

    loadDynamicDefence();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="defence" className="relative min-h-screen pt-28 sm:pt-36 pb-24 bg-[#030712] overflow-x-clip text-white selection:bg-sky-500/30 selection:text-sky-200">
      {/* Precision Engineering Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }}
      />

      {/* Subtle Radial Blue Glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-sky-600/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 space-y-10 sm:space-y-12">
        
        {/* ========================================================================= */}
        {/* MAIN PAGE HEADER: DEFENCE + SUBTITLE                                      */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-oxanium text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none">
            DEFENCE
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-[17px] font-normal max-w-3xl leading-relaxed">
            Protective systems, tactical gear, and mission-ready defence equipment for field deployment and operational response.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* MAIN CONTENT GRID: 2 COLUMNS (LEFT: CONTINUOUS SECTIONS, RIGHT: SIDEBAR)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: All Continuous Sections Rendered in Sequence */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-14 sm:space-y-16">
            
            {sections.map((section, secIdx) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-32 space-y-6 sm:space-y-8"
              >
                {/* Category Header */}
                <div className="space-y-1.5">
                  <div className="text-xs sm:text-[13px] font-mono font-semibold text-sky-400 tracking-[0.2em] uppercase">
                    {section.number}
                  </div>
                  <h2 className="font-oxanium text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                    {section.name}
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm font-normal">
                    {section.subtitle}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {section.products.map((product, idx) => {
                    const hasProductImage = Boolean(product.image && product.image.trim().length > 0);

                    return (
                      <div
                        key={product.id}
                        className="rounded-2xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between hover:border-sky-400/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] group"
                      >
                        <div>
                          {/* Top Equipment / Helmet Image Box (Only if image was added) */}
                          {hasProductImage ? (
                            <div className="relative w-full h-48 sm:h-52 rounded-xl bg-[#030714] border border-white/5 overflow-hidden mb-4">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1c] via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>
                          ) : null}

                          {/* Middle Info */}
                          <div className={`space-y-2 ${hasProductImage ? "pt-1" : "pt-2"}`}>
                            <h3 className="font-oxanium text-xl font-bold text-white group-hover:text-sky-300 transition-colors duration-200">
                              {product.name}
                            </h3>
                            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                              {product.desc}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Button */}
                        <div className="pt-5">
                        <button
                          type="button"
                          onClick={() => {
                            setModalProduct(product);
                            setModalSection(section);
                          }}
                          className={`inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                            (secIdx === 1 && idx === 1) || (secIdx === 5 && idx === 1)
                              ? "bg-[#00d2ff] hover:bg-[#38bdf8] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:scale-105"
                              : "bg-transparent hover:bg-sky-500/15 border border-sky-400/40 text-sky-300 hover:text-white"
                          }`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
                </div>

                {/* Distinct Divider Line between Sections */}
                {secIdx < sections.length - 1 && (
                  <div className="pt-8 sm:pt-10">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>
                )}
              </div>
            ))}

            {/* Portfolio Update Elegant Banner */}
            <div className="relative rounded-2xl border border-white/10 bg-[#070e1c]/60 backdrop-blur-xl px-6 py-7 sm:px-10 sm:py-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-400/30" />
              <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-sky-400/30" />
              
              <div className="text-xs sm:text-[13px] font-sans font-semibold tracking-wider text-[#7ec8ff] uppercase mb-2.5">
                PORTFOLIO UPDATE
              </div>
              <p className="text-slate-300 font-sans text-xs sm:text-[13.5px] md:text-sm font-normal tracking-wide uppercase max-w-3xl mx-auto leading-relaxed">
                NEW PRODUCTS ARE CURRENTLY UNDER DESIGN &amp; EVALUATION, AND WILL BE ADDED AS THEY ARE CLEARED FOR RELEASE.
              </p>
            </div>

          </div>

          {/* Right Column: Sticky Sections Sidebar Nav with Smooth Anchor Scroll */}
          <aside className="lg:col-span-4 xl:col-span-3 sticky top-28 self-start z-20">
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/95 backdrop-blur-2xl p-4 sm:p-5 space-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
              {/* Sidebar Header */}
              <div className="text-[11px] font-mono tracking-[0.25em] text-sky-400 font-semibold uppercase px-3 py-1.5">
                SECTIONS
              </div>

              {/* Navigation List */}
              <div className="space-y-1.5 pt-1">
                {sections.map((sec) => {
                  const isActive = activeSectionId === sec.id;

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 block cursor-pointer ${
                        isActive
                          ? "bg-[#0b2238] border border-sky-400/50 text-sky-200 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                          : "text-slate-400 hover:text-sky-300 hover:bg-slate-900/60 border border-transparent"
                      }`}
                    >
                      {sec.number} {sec.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

        </div>

      </div>

      {/* Interactive Platform Details Modal */}
      <AnimatePresence>
        {modalProduct && modalSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl lg:max-w-5xl bg-[#060b16] border border-slate-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.95)] text-white overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev / Next Chevrons on edges */}
              <button
                type="button"
                onClick={handlePrevModal}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111927]/90 border border-white/10 hover:border-cyan-400/50 hover:bg-[#1a2538] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md z-10"
                title="Previous Platform"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextModal}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111927]/90 border border-white/10 hover:border-cyan-400/50 hover:bg-[#1a2538] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-md z-10"
                title="Next Platform"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Top Header */}
              <div className="flex items-start justify-between pb-3 sm:pb-4">
                <div>
                  <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase font-sans">
                    {modalSection.name}
                  </div>
                  <h2 className="font-oxanium text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
                    {modalProduct.name}
                  </h2>
                </div>

                {/* Top Right Close Button */}
                <button
                  type="button"
                  onClick={() => setModalProduct(null)}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors cursor-pointer pt-1"
                >
                  Close
                </button>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start pt-2 sm:pt-4">
                {/* Left Column: Helmet / Equipment Image Box (Only if image exists) */}
                {modalProduct.image && modalProduct.image.trim().length > 0 ? (
                  <div className="md:col-span-5 flex flex-col items-center justify-center">
                    <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#030712] border border-white/[0.08] overflow-hidden shadow-inner">
                      <Image
                        src={modalProduct.image}
                        alt={modalProduct.name}
                        fill
                        unoptimized
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                ) : null}

                {/* Right Column: Overview, Information & Request Info Button */}
                <div className={`${modalProduct.image && modalProduct.image.trim().length > 0 ? "md:col-span-7" : "md:col-span-12"} flex flex-col justify-between max-h-[70vh] sm:max-h-[75vh] overflow-y-auto pr-2 sm:pr-4`}>
                  <div className="space-y-6">
                    {/* Overview */}
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase mb-1.5 font-sans">
                        OVERVIEW
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                        {modalProduct.overview || modalProduct.desc}
                      </p>
                    </div>

                    {/* Information */}
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#00c8ff] uppercase mb-1.5 font-sans">
                        INFORMATION
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                        {modalProduct.information || "Detailed specifications, sizing, and procurement information are available on request."}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Request Information Button */}
                  <div className="pt-8 pb-2">
                    <Link
                      href={`/contact?product=${encodeURIComponent(modalProduct.name)}`}
                      className="inline-flex items-center px-6 py-2.5 rounded-lg border border-[#00d2ff] bg-transparent hover:bg-sky-500/15 text-sky-300 hover:text-white text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.15)]"
                    >
                      Request Information
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
