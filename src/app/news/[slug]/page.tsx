"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  X,
  ArrowLeft,
  Shield,
  Clock,
  Calendar,
  Layers,
  Box,
  FolderTree,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  overview?: string;
  information?: string;
  specs?: string;
}

interface SectorSection {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  products: ProductItem[];
}

interface ArticleData {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryBadge: string;
  date: string;
  meta: string;
  readTime: string;
  description: string;
  excerpt: string;
  content: string[];
  image: string;
  tags?: string[];
  author?: string;
  subcategories?: Array<{
    number: string;
    name: string;
    subtitle?: string;
    items: Array<{
      name: string;
      desc?: string;
      image?: string;
      specs?: string;
    }>;
  }>;
}

const DEFAULT_DEFENCE_SECTIONS: SectorSection[] = [
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
        id: "shakti-tactical-jacket",
        name: "Shakti Tactical Armor Vest",
        desc: "Modular load-bearing vest with integrated ballistic plate inserts.",
        image: "/images/jacket-shakti-tactical.png"
      },
      {
        id: "shakti-level-4",
        name: "Shakti Level IV Heavy Carrier",
        desc: "Maximum-protection plate carrier configured for high-threat combat environments.",
        image: "/images/jacket-shakti-level4.png"
      }
    ]
  },
  {
    id: "riot-control",
    number: "05",
    name: "Riot Control",
    subtitle: "Non-lethal crowd management suits, shields, and perimeter control equipment.",
    products: [
      {
        id: "vajra-riot-suit",
        name: "Vajra Full Body Riot Suit",
        desc: "Comprehensive blunt-force protection suit for law enforcement personnel.",
        image: "/images/riot-vajra-suit.png"
      },
      {
        id: "tactical-riot-shield",
        name: "Polycarbonate Riot Shield",
        desc: "High-impact transparent ballistic barrier designed for field control squads.",
        image: "/images/riot-shield.png"
      }
    ]
  }
];

export default function DynamicArticlePage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [sections, setSections] = useState<SectorSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  // Product Preview Modal State
  const [modalProduct, setModalProduct] = useState<ProductItem | null>(null);
  const [modalSection, setModalSection] = useState<SectorSection | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        let articleData: ArticleData | null = null;

        // 1. Fetch primary news / sector record
        try {
          const res = await fetch(`/api/news/${slug}`, { cache: "no-store" });
          if (res.ok) {
            const json = await res.json();
            if (json.success && json.data) {
              articleData = json.data;
            }
          }
        } catch {
          // Continue to fallback
        }

        // 2. Fallback to list search if slug API returned 404
        if (!articleData) {
          try {
            const listRes = await fetch("/api/news", { cache: "no-store" });
            if (listRes.ok) {
              const listJson = await listRes.json();
              if (listJson.success && Array.isArray(listJson.data)) {
                const found = listJson.data.find(
                  (item: any) =>
                    (item.slug || item.id || "").toLowerCase() === slug.toLowerCase()
                );
                if (found) {
                  articleData = {
                    id: found.id || found.slug,
                    slug: found.slug || found.id,
                    title: found.title,
                    category: (found.category || "DEFENCE").toUpperCase(),
                    categoryBadge: (found.category || "DEFENCE").toUpperCase(),
                    date: found.date || "RECENT",
                    meta: `${found.date || "OCTOBER 2026"} • 3 MIN READ`,
                    readTime: "3 MIN READ",
                    description: found.description || found.excerpt || "",
                    excerpt: found.excerpt || found.description || "",
                    content: found.content && found.content.length > 0 ? found.content : [found.description || found.excerpt || ""],
                    image: (found.image && typeof found.image === "string") ? found.image.trim() : "",
                    subcategories: found.subcategories || [],
                  };
                }
              }
            }
          } catch {
            // Continue
          }
        }

        // Fallback for defence or aerospace if not in news
        if (!articleData) {
          if (slug.toLowerCase() === "defence") {
            articleData = {
              id: "defence",
              slug: "defence",
              title: "DEFENCE",
              category: "DEFENCE",
              categoryBadge: "DEFENCE",
              date: "FEBRUARY 2026",
              meta: "FEBRUARY 2026 • OPERATIONAL",
              readTime: "3 MIN READ",
              description: "Protective systems, tactical gear, and mission-ready defence equipment for field deployment and operational response.",
              excerpt: "Protective systems, tactical gear, and mission-ready defence equipment for field deployment and operational response.",
              content: ["Protective systems, tactical gear, and mission-ready defence equipment for field deployment and operational response."],
              image: "/images/defence-systems-radar.jpg",
            };
          } else if (slug.toLowerCase() === "aerospace") {
            articleData = {
              id: "aerospace",
              slug: "aerospace",
              title: "AEROSPACE",
              category: "AEROSPACE",
              categoryBadge: "AEROSPACE",
              date: "MARCH 2026",
              meta: "MARCH 2026 • AUTONOMOUS",
              readTime: "3 MIN READ",
              description: "Autonomous aerial platforms, tactical UAVs, and precision airframes for reconnaissance and defence missions.",
              excerpt: "Autonomous aerial platforms, tactical UAVs, and precision airframes for reconnaissance and defence missions.",
              content: ["Autonomous aerial platforms, tactical UAVs, and precision airframes for reconnaissance and defence missions."],
              image: "/images/stealth-fighter-hangar.jpg",
            };
          } else {
            // Generic fallback for custom slugs like VI
            articleData = {
              id: slug,
              slug: slug,
              title: slug.toUpperCase(),
              category: slug.toUpperCase(),
              categoryBadge: slug.toUpperCase(),
              date: "RECENT",
              meta: "OCTOBER 2026 • ACTIVE",
              readTime: "3 MIN READ",
              description: `Mission-ready operational platforms, integrated tactical assets, and capability specifications for ${slug.toUpperCase()}.`,
              excerpt: `Mission-ready operational platforms, integrated tactical assets, and capability specifications for ${slug.toUpperCase()}.`,
              content: [`Mission-ready operational platforms, integrated tactical assets, and capability specifications for ${slug.toUpperCase()}.`],
              image: "",
            };
          }
        }

        setArticle(articleData);

        // 3. Assemble Subcategories & Product Cards
        let assembledSections: SectorSection[] = [];

        // Check if article has custom subcategories configured via Admin Panel
        if (articleData.subcategories && articleData.subcategories.length > 0) {
          assembledSections = articleData.subcategories.map((subcat, idx) => ({
            id: (subcat.name || `sec-${idx}`).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            number: subcat.number || String(idx + 1).padStart(2, "0"),
            name: subcat.name,
            subtitle: subcat.subtitle || `Tactical systems and deployment-ready equipment for ${subcat.name}.`,
            products: (subcat.items || []).map((item, itIdx) => ({
              id: `${(item.name || `item-${itIdx}`).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
              name: item.name,
              desc: item.desc || "Protective solution designed for defence and tactical deployment requirements.",
              image: (item.image && typeof item.image === "string" && item.image.trim().length > 0)
                ? item.image.trim()
                : (articleData?.image && typeof articleData.image === "string" && articleData.image.trim().length > 0)
                ? articleData.image.trim()
                : "",
              overview: item.desc || articleData?.description || "Tactical platform engineered for high-assurance mission profiles.",
              information: item.specs ? `Specifications: ${item.specs}` : "Detailed specifications, sizing, and procurement information are available on request.",
              specs: item.specs,
            })),
          }));
        }

        // Also fetch any standalone products registered under this sector from /api/products
        try {
          const prodRes = await fetch(`/api/products?sector=${slug}`, { cache: "no-store" });
          if (prodRes.ok) {
            const prodJson = await prodRes.json();
            const prodList = Array.isArray(prodJson.data) ? prodJson.data : Array.isArray(prodJson) ? prodJson : [];
            if (prodList.length > 0) {
              // Group products by category
              const groups: { [key: string]: typeof prodList } = {};
              prodList.forEach((p: any) => {
                const catName = p.category || "General Equipment";
                if (!groups[catName]) groups[catName] = [];
                groups[catName].push(p);
              });

              Object.entries(groups).forEach(([catName, prods], gIdx) => {
                const existing = assembledSections.find(
                  (s) => s.name.toLowerCase() === catName.toLowerCase()
                );
                const mappedProds: ProductItem[] = prods.map((p: any) => ({
                  id: p.slug || p._id || `prod-${p.name}`,
                  name: p.name,
                  desc: p.desc || "Precision engineered defence asset.",
                  image: (p.image && typeof p.image === "string") ? p.image.trim() : "",
                  overview: p.overview || p.desc,
                  information: p.information || "Detailed specifications, sizing, and procurement information are available on request.",
                }));

                if (existing) {
                  existing.products = [...existing.products, ...mappedProds];
                } else {
                  assembledSections.push({
                    id: catName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    number: String(assembledSections.length + 1).padStart(2, "0"),
                    name: catName,
                    subtitle: prods[0]?.categorySubtitle || "Specialized operational systems.",
                    products: mappedProds,
                  });
                }
              });
            }
          }
        } catch {
          // Ignore
        }

        // If no sections found yet, use default defence sections or generate from article
        if (assembledSections.length === 0) {
          if (slug.toLowerCase() === "defence") {
            assembledSections = DEFAULT_DEFENCE_SECTIONS;
          } else {
            // Generate standard primary subcategory from article
            assembledSections = [
              {
                id: `${slug}-systems`,
                number: "01",
                name: `${articleData.title} Systems & Platforms`,
                subtitle: articleData.excerpt || "Strategic platforms and operational systems.",
                products: [
                  {
                    id: `${slug}-primary-1`,
                    name: `${articleData.title} Primary Platform`,
                    desc: articleData.excerpt || articleData.description || "Mission-focused operational platform.",
                    image: (articleData.image && typeof articleData.image === "string") ? articleData.image.trim() : "",
                    overview: articleData.description || articleData.excerpt,
                    information: "Detailed technical data, tactical parameters, and deployment specs available upon clearance.",
                  },
                ],
              },
            ];
          }
        }

        setSections(assembledSections);
        if (assembledSections.length > 0) {
          setActiveSectionId(assembledSections[0].id);
        }
      } catch (err) {
        console.error("Failed to load article/sector page:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Observer for active section highlighting on scroll
  useEffect(() => {
    if (sections.length === 0) return;

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

  const handleNextModal = () => {
    if (!modalProduct || !modalSection) return;
    const idx = modalSection.products.findIndex((p) => p.id === modalProduct.id);
    if (idx !== -1 && idx < modalSection.products.length - 1) {
      setModalProduct(modalSection.products[idx + 1]);
    } else {
      setModalProduct(modalSection.products[0]);
    }
  };

  const handlePrevModal = () => {
    if (!modalProduct || !modalSection) return;
    const idx = modalSection.products.findIndex((p) => p.id === modalProduct.id);
    if (idx > 0) {
      setModalProduct(modalSection.products[idx - 1]);
    } else {
      setModalProduct(modalSection.products[modalSection.products.length - 1]);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center pt-24 pb-20">
        <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
          Decrypting Operational Capability &bull; {slug?.toUpperCase()}
        </p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Operational Sector Not Found</h2>
        <p className="text-sm text-slate-400 mb-6 max-w-md">
          The requested operational capability specification could not be located in active archives.
        </p>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-sky-400 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Newsroom</span>
        </Link>
      </div>
    );
  }

  return (
    <div id="sector-page" className="relative min-h-screen pt-28 sm:pt-36 pb-24 bg-[#030712] overflow-x-clip text-white selection:bg-sky-500/30 selection:text-sky-200">
      {/* Precision Engineering Grid Background matching DEFENCE page */}
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
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Command Portfolio</span>
          </Link>

          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest hidden sm:inline-block">
            REF: SW-{article.slug.toUpperCase()}
          </span>
        </div>

        {/* ========================================================================= */}
        {/* MAIN PAGE HEADER: TITLE + SUBTITLE (EXACTLY AS IN USER'S IMAGE)           */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-oxanium text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none">
            {article.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-[17px] font-normal max-w-3xl leading-relaxed">
            {article.description || article.excerpt}
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
                        key={product.id || idx}
                        className="rounded-2xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between hover:border-sky-400/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] group"
                      >
                        <div>
                          {/* Top Equipment / Platform Image Box (Only if image was added) */}
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
                            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal line-clamp-3">
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
                            className="inline-block px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer bg-transparent hover:bg-sky-500/15 border border-sky-400/40 text-sky-300 hover:text-white"
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
                NEW PLATFORMS ARE CURRENTLY UNDER DESIGN &amp; EVALUATION, AND WILL BE ADDED AS THEY ARE CLEARED FOR RELEASE.
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
                {/* Left Column: Equipment Image Box (Only if image exists) */}
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

                    {modalProduct.specs && (
                      <div>
                        <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-sky-400 uppercase mb-1.5 font-sans">
                          SPECIFICATIONS
                        </div>
                        <p className="text-xs sm:text-[13px] text-sky-300 font-mono leading-relaxed">
                          {modalProduct.specs}
                        </p>
                      </div>
                    )}
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
