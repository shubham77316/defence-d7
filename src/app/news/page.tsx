"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Share2, Check, CheckCircle2 } from "lucide-react";

interface Article {
  id: string;
  category: string;
  categoryBadge: string;
  meta: string;
  title: string;
  titleClass?: string;
  excerpt: string;
  image: string;
  content?: string[];
}

const CATEGORIES = [
  "All",
  "Aerospace",
  "Defence",
  "Sovereign Tech",
  "Strategic Alliances",
  "Advanced Systems",
  "Manufacturing",
];

const articlesData: Article[] = [
  {
    id: "aerospace-highlights",
    category: "Aerospace",
    categoryBadge: "AEROSPACE",
    meta: "March 2026 • 4 min read",
    title: "Aerospace highlights and autonomous flight program positioning",
    excerpt:
      "Precision-engineered sovereign airframes, autonomous flight trials, and tactical unmanned aerial surveillance milestones achieve key flight milestones.",
    image: "/images/stealth-fighter-hangar.jpg",
  },
  {
    id: "defence-systems",
    category: "Defence",
    categoryBadge: "DEFENCE",
    meta: "February 2026 • 5 min read",
    title: "Defence systems, protective platforms, and readiness updates",
    excerpt:
      "Sovereign tactical systems engineered for extreme operational theaters, mission-critical environments, and multi-domain defense preparedness.",
    image: "/images/tactical-defense-operator.jpg",
  },
  {
    id: "tactical-uav",
    category: "Sovereign Tech",
    categoryBadge: "SOVEREIGN TECH",
    meta: "February 2026 • 3 min read",
    title: "Tactical UAV flight trials validate high-altitude flight envelope",
    excerpt:
      "Autonomous loitering platform successfully completes demanding endurance and optical tracking benchmarks in harsh weather environments.",
    image: "/images/tactical-uav-orbit.jpg",
  },
  {
    id: "strategic-alliances",
    category: "Strategic Alliances",
    categoryBadge: "STRATEGIC ALLIANCES",
    meta: "January 2026 • 6 min read",
    title: "Institutional partnerships accelerate domestic guided weapons integration",
    excerpt:
      "Multi-domain industrial collaborations unite defence engineering depth with precision avionics and next-generation electronic countermeasures.",
    image: "/images/news-strategic-alliances.jpg",
  },
  {
    id: "advanced-systems",
    category: "Advanced Systems",
    categoryBadge: "ADVANCED SYSTEMS",
    meta: "January 2026 • 4 min read",
    title: "AI-enabled edge telemetry deployment for multi-theater command coordination",
    titleClass: "text-[#38bdf8]",
    excerpt:
      "Encrypted communication arrays and edge-AI compute units deliver real-time sensor fusion and zero-latency situational awareness.",
    image: "/images/news-advanced-systems.jpg",
  },
  {
    id: "manufacturing-facility",
    category: "Manufacturing",
    categoryBadge: "MANUFACTURING",
    meta: "December 2025 • 5 min read",
    title: "High-precision manufacturing facility scale-up for loitering munitions",
    excerpt:
      "Expanded domestic aerospace production lines integrate automated robotic calibration for mission-critical electronic components and airframes.",
    image: "/images/news-manufacturing-facility.jpg",
  }
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [articlesList, setArticlesList] = useState<Article[]>(articlesData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeArticleId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get("id");
      if (idParam) {
        setActiveArticleId(idParam);
      }
    }
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const customArticles: Article[] = json.data
              .map((d: any): Article => ({
                id: d.slug || d._id,
                category: d.category || "Innovation",
                categoryBadge: (d.category || "INNOVATION").toUpperCase(),
                meta: `${d.date || new Date(d.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • ${d.readTime || "3 min read"}`,
                title: d.title,
                excerpt: d.excerpt || d.description || "",
                image: (d.image && typeof d.image === "string") ? d.image.trim() : "",
                content: Array.isArray(d.content)
                  ? d.content
                  : typeof d.content === "string"
                  ? [d.content]
                  : d.excerpt
                  ? [d.excerpt]
                  : [],
              }))
              .filter((d: Article) => !articlesData.some((a) => a.id === d.id));

            setArticlesList([...customArticles, ...articlesData]);
          }
        }
      } catch (err) {
        // Fallback
      }
    };

    fetchNews();
    window.addEventListener("focus", fetchNews);
    const interval = setInterval(fetchNews, 4000);
    return () => {
      window.removeEventListener("focus", fetchNews);
      clearInterval(interval);
    };
  }, []);

  const activeArticle = articlesList.find((a) => a.id === activeArticleId);

  const categoriesList = [
    "All",
    ...Array.from(
      new Set(
        articlesList
          .map((a) => (a.category || "").trim())
          .filter(Boolean)
      )
    ),
  ];

  const filteredArticles =
    selectedCategory.toLowerCase() === "all"
      ? articlesList
      : articlesList.filter(
          (article) =>
            (article.category || "").toLowerCase() === selectedCategory.toLowerCase()
        );

  const relatedArticles = articlesList
    .filter((a) => a.id !== activeArticleId)
    .slice(0, 3);

  // If viewing Aerospace highlights article
  if (activeArticleId === "aerospace-highlights" || (activeArticle && activeArticleId === "aerospace-highlights")) {
    return (
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 pt-24 sm:pt-28 pb-20 selection:bg-sky-500 selection:text-slate-950">
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Back Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to News &amp; Insights</span>
            </button>
          </div>

          {/* Article Header Details */}
          <div className="mb-8 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/40 border border-sky-500/30 uppercase">
              AEROSPACE
              
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Aerospace highlights and autonomous flight program positioning
            </h1>

            <p className="text-xs sm:text-sm font-mono text-slate-400">
              March 2026 &bull; 4 min read &bull; Official Strategic Dispatch
            </p>

            <div className="relative w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mt-4">
              <Image
                src="/images/stealth-fighter-hangar.jpg"
                alt="Aerospace stealth fighter hangar"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* SECOND IMAGE DATA: Highlights & Section 1 */}
          <div className="space-y-8 text-slate-200 text-base sm:text-[17px] leading-relaxed">
            {/* Intro Lead Callout with Left Cyan Border */}
            <div className="border-l-4 border-sky-400 pl-4 sm:pl-5 py-1">
              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                Sky Wardens accelerates its autonomous aviation roadmap with milestone validations across advanced flight envelopes, radar cross-section mitigation, and high-altitude station-keeping capabilities.
              </p>
            </div>

            {/* Key Strategic Highlights Box */}
            <div className="rounded-2xl bg-[#050c1c]/90 border border-slate-800/90 p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.6)] space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <span className="text-sky-400 font-mono text-lg">◈</span>
                <span>Key Strategic Highlights</span>
              </div>

              <div className="space-y-3 pl-1">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Over 240 cumulative autonomous test-flight hours recorded across contested-condition simulations.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Integration of indigenous high-bandwidth telemetry and optical electronic target acquisition modules.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Deployment readiness milestone slated for tactical forces across mountain and maritime surveillance operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Autonomous Envelopes and High-Mach Endurance */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Autonomous Envelopes and High-Mach Endurance
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The aerospace engineering division has successfully concluded high-altitude envelope validation for its flagship autonomous airframe program. Engineered to operate under contested electromagnetic conditions, the platform demonstrated resilient low-altitude terrain following and extended loiter capability during multi-day simulated trials.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Through a proprietary composite airframe architecture, thermal dissipation and acoustic signatures have been significantly mitigated, ensuring optimal stealth profile without compromising structural durability or payload volume.
              </p>
            </div>

            {/* THIRD IMAGE DATA: Quote & Domestic Supply Chain & Roadmap */}
            {/* Quote Callout */}
            <div className="border-l-4 border-sky-400 bg-[#050c1c]/90 p-6 sm:p-7 rounded-r-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <p className="italic text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                &ldquo;Our objective is sovereign technological superiority &mdash; developing airborne platforms that execute high-stakes surveillance and deterrent missions without reliance on external supply chains.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-mono text-sky-400 font-semibold mt-3">
                &mdash; Sovereign Aerospace Systems Division
              </p>
            </div>

            {/* Section: Domestic Supply Chain and Modular Avionics */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Domestic Supply Chain and Modular Avionics
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The avionics bay incorporates modular computational units designed for plug-and-play adaptability. Payload configurations can be transitioned within 45 minutes on the tarmac, enabling rapid shifts from optical surveillance to electronic countermeasures.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Crucially, 100% of the internal processing nodes and structural sub-assemblies are developed and integrated domestically through aligned manufacturing alliances, assuring full strategic autonomy.
              </p>

              <ul className="space-y-2.5 pl-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-bold">&bull;</span>
                  <span>Rapid-swap payload architecture supporting optical and multispectral pods.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-bold">&bull;</span>
                  <span>Hardened MIL-STD avionics with built-in electronic counter-countermeasure routines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-bold">&bull;</span>
                  <span>Seamless tactical mesh communications linking ground operators with airborne nodes.</span>
                </li>
              </ul>
            </div>

            {/* Section: Next-Phase Roadmap */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Next-Phase Roadmap
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Looking forward into Q3 2026, the program will transition toward swarm coordination trials, evaluating distributed intelligence routines where multiple platforms coordinate autonomous surveillance tracks over expansive operational theaters.
              </p>
            </div>
          </div>

          {/* FOURTH IMAGE DATA: Back to News & Insights Pill + Related Reports */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-800 space-y-10">
            {/* Center Back Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setActiveArticleId(null)}
                className="px-6 py-2.5 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-white inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/20"
              >
                <span>&larr; Back to News &amp; Insights</span>
              </button>
            </div>

            {/* Related Strategic Reports Section */}
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-2">
                CONTINUE READING
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
                Related Strategic Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (rel.id === "aerospace-highlights") {
                        setActiveArticleId(rel.id);
                      }
                    }}
                    className="group bg-[#050c1c]/90 rounded-2xl border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full h-[160px] sm:h-[170px] overflow-hidden bg-black/40">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-black/60 backdrop-blur-md border border-slate-700/80 uppercase">
                            {rel.categoryBadge}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <p className="text-[11px] text-slate-400 font-medium mb-1.5">
                          {rel.meta.split("•")[0]}
                        </p>
                        <h4 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If viewing Defence Systems article (Second Box)
  if (activeArticleId === "defence-systems") {
    return (
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 pt-24 sm:pt-28 pb-20 selection:bg-sky-500 selection:text-slate-950">
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Back Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-8 space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Defence systems, protective platforms, and readiness updates
            </h1>

            <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-xs font-mono border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  PUBLISHED
                </span>
                <span className="text-white font-semibold">February 2026</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  AUTHORITY / DIRECTORATE
                </span>
                <span className="text-white font-semibold">Strategic Defence Technology Directorate</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="relative w-full h-[280px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <Image
                  src="/images/tactical-defense-operator.jpg"
                  alt="Specialist engineer analyzing tactical defence command telemetry"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <p className="text-center italic text-xs text-slate-400 font-sans pt-1">
                Specialist engineer analyzing tactical defence command telemetry
              </p>
            </div>
          </div>

          {/* SECOND IMAGE DATA: Lead Callout, Highlights Box, and Hardened Platforms Section */}
          <div className="space-y-8 text-slate-200 text-base sm:text-[17px] leading-relaxed">
            {/* Intro Lead Callout with Left Cyan Border */}
            <div className="border-l-4 border-sky-400 pl-4 sm:pl-5 py-1">
              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                A comprehensive review of upgraded armor protection platforms, automated remote weapon stations, and field-tested tactical readiness enhancements designed for front-line armed forces.
              </p>
            </div>

            {/* Key Strategic Highlights Box */}
            <div className="rounded-2xl bg-[#050c1c]/90 border border-slate-800/90 p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.6)] space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <span className="text-sky-400 font-mono text-lg">◈</span>
                <span>Key Strategic Highlights</span>
              </div>

              <div className="space-y-3 pl-1">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Ballistic and blast-resistant composite materials tested to highest international STANAG standards.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Sensor-fused automated fire-control systems delivering sub-second target acquisition.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Field validation across extreme desert heat, saline coastal fronts, and sub-zero Himalayan altitudes.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Hardened Platforms for Contested Battlefields */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Hardened Platforms for Contested Battlefields
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Modern front-line security demands systems that withstand kinetic impacts, shaped charges, and asymmetric drone threats. Sky Wardens has finalized development of next-generation protective armor kits engineered specifically for tactical mobility vehicles and stationary forward posts.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Utilizing lightweight ceramic-metallic composite matrices, the new systems achieve superior multi-hit stopping power while shedding 18% of traditional gross armor weight, preserving vehicle engine lifespan and cross-country maneuvering agility.
              </p>
            </div>

            {/* THIRD IMAGE DATA: Automated Remote Weapon Stations, Quote, Bullets, Force Modernization */}
            {/* Section: Automated Remote Weapon Stations & Sighting */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Automated Remote Weapon Stations &amp; Sighting
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                In parallel, trials of the gyro-stabilized Remote Weapon Station (RWS) have registered exceptional hit-probability benchmarks during mobile firings. Equipped with dual thermal observation channels and laser rangefinding, the station maintains target lock while traveling at speeds up to 60 km/h across rugged terrain.
              </p>
            </div>

            {/* Quote Callout */}
            <div className="border-l-4 border-sky-400 bg-[#050c1c]/90 p-6 sm:p-7 rounded-r-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <p className="italic text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                &ldquo;Defence readiness is defined by decisive protection and absolute weapon reliability when fractions of a second decide operational survival.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-mono text-sky-400 font-semibold mt-3">
                &mdash; Strategic Defence Technology Directorate
              </p>
            </div>

            {/* Bullets */}
            <ul className="space-y-2.5 pl-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-sky-400 font-bold">&bull;</span>
                <span>Continuous 360-degree panoramic day/night surveillance with automatic motion detection.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-sky-400 font-bold">&bull;</span>
                <span>Slew-to-cue integration with acoustic gunshot detection sensors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-sky-400 font-bold">&bull;</span>
                <span>Remote cabin operation preventing soldier exposure to open-fire environments.</span>
              </li>
            </ul>

            {/* Section: Force Modernization Alignment */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Force Modernization Alignment
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                These platform upgrades are directly calibrated to national armed forces modernization tenders, demonstrating sovereign manufacturing excellence and accelerated procurement turnaround times.
              </p>
            </div>
          </div>

          {/* FOURTH IMAGE DATA: Back Button + Related Strategic Reports */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-800 space-y-10">
            {/* Center Back Button */}
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setActiveArticleId(null)}
                className="px-6 py-2.5 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-white inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/20"
              >
                <span>&larr; Back to News &amp; Insights</span>
              </button>
            </div>

            {/* Related Strategic Reports Section */}
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-2">
                CONTINUE READING
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
                Related Strategic Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: "aerospace-highlights",
                    categoryBadge: "AEROSPACE",
                    date: "March 2026",
                    title: "Aerospace highlights and autonomous program...",
                    image: "/images/stealth-fighter-hangar.jpg",
                  },
                  {
                    id: "tactical-uav",
                    categoryBadge: "SOVEREIGN TECH",
                    date: "February 2026",
                    title: "Tactical UAV flight trials validate high-altitude flight envelope",
                    image: "/images/tactical-uav-orbit.jpg",
                  },
                  {
                    id: "strategic-alliances",
                    categoryBadge: "STRATEGIC ALLIANCES",
                    date: "January 2026",
                    title: "Institutional partnerships accelerate domestic guided...",
                    image: "/images/news-strategic-alliances.jpg",
                  },
                ].map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (rel.id === "aerospace-highlights" || rel.id === "defence-systems") {
                        setActiveArticleId(rel.id);
                      }
                    }}
                    className="group bg-[#050c1c]/90 rounded-2xl border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="relative w-full h-[160px] sm:h-[170px] overflow-hidden bg-black/40">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-black/60 backdrop-blur-md border border-slate-700/80 uppercase">
                            {rel.categoryBadge}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <p className="text-[11px] text-slate-400 font-medium mb-1.5">
                          {rel.date}
                        </p>
                        <h4 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If viewing Tactical UAV article (Third Box)
  if (activeArticleId === "tactical-uav") {
    return (
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 pt-24 sm:pt-28 pb-20 selection:bg-sky-500 selection:text-slate-950">
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Back Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-8 space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Tactical UAV flight trials validate high-altitude flight envelope
            </h1>

            <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-xs font-mono border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  PUBLISHED
                </span>
                <span className="text-white font-semibold">February 2026</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  AUTHORITY / DIRECTORATE
                </span>
                <span className="text-white font-semibold">Tactical Flight Operations Group</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="relative w-full h-[280px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <Image
                  src="/images/tactical-uav-orbit.jpg"
                  alt="Tactical UAV flight system flying above orbital horizon"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <p className="text-center italic text-xs text-slate-400 font-sans pt-1">
                Tactical UAV flight system flying above orbital horizon
              </p>
            </div>
          </div>

          {/* SECOND IMAGE DATA: Lead Callout, Highlights Box, and Sub-Zero Alpine Section */}
          <div className="space-y-8 text-slate-200 text-base sm:text-[17px] leading-relaxed">
            {/* Intro Lead Callout with Left Cyan Border */}
            <div className="border-l-4 border-sky-400 pl-4 sm:pl-5 py-1">
              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                High-altitude testing proves autonomous endurance, sub-zero engine reliability, and precision optical tracking across challenging mountainous terrain.
              </p>
            </div>

            {/* Key Strategic Highlights Box */}
            <div className="rounded-2xl bg-[#050c1c]/90 border border-slate-800/90 p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.6)] space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <span className="text-sky-400 font-mono text-lg">◈</span>
                <span>Key Strategic Highlights</span>
              </div>

              <div className="space-y-3 pl-1">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Operating altitude confirmed up to 18,500 feet above sea level.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Continuous endurance exceeding 14 hours in sub-zero alpine conditions.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Encrypted line-of-sight datalink maintaining seamless telemetry beyond 120 km.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Sub-Zero Alpine Navigation & Thermal Stability */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sub-Zero Alpine Navigation &amp; Thermal Stability
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Operating at extreme elevations requires specialized engine tuning, anti-icing wing protocols, and high-density battery thermal management. During recent high-altitude trials in northern sectors, the UAV performed flawlessly over continuous multi-hour circuits.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The platform demonstrated instantaneous target lock on moving perimeter vectors, transmitting high-definition infrared telemetry through contested electronic jamming environments without telemetry degradation.
              </p>
            </div>

            {/* Quote Callout */}
            <div className="border-l-4 border-sky-400 bg-[#050c1c]/90 p-6 sm:p-7 rounded-r-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <p className="italic text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                &ldquo;Validating high-altitude performance gives our armed forces an unwavering surveillance eye in frontiers where ground observation is virtually impossible.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-mono text-sky-400 font-semibold mt-3">
                &mdash; Tactical Flight Operations Group
              </p>
            </div>

            {/* THIRD IMAGE DATA: Payload Modularity and Rapid Reconfiguration */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Payload Modularity and Rapid Reconfiguration
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Field personnel can swap the central sensor payload in less than 30 minutes, switching between electronic reconnaissance packages, laser target designators, and synthetic aperture radar (SAR) modules.
              </p>
            </div>
          </div>

          {/* Back to News Pill Button */}
          <div className="mt-12 sm:mt-14 pt-8 border-t border-slate-800 flex justify-start">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="px-6 py-2.5 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-white inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/20"
            >
              <span>&larr; Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FOURTH IMAGE DATA: Related Strategic Reports & Footer Cards */}
          <div className="mt-10 sm:mt-12 space-y-8">
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-2">
                CONTINUE READING
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
                Related Strategic Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: "aerospace-highlights",
                    categoryBadge: "AEROSPACE",
                    date: "March 2026",
                    title: "Aerospace highlights and autonomous flight program...",
                    image: "/images/stealth-fighter-hangar.jpg",
                  },
                  {
                    id: "defence-systems",
                    categoryBadge: "DEFENCE",
                    date: "February 2026",
                    title: "Defence systems, protective platforms, and readiness...",
                    image: "/images/tactical-defense-operator.jpg",
                  },
                  {
                    id: "strategic-alliances",
                    categoryBadge: "STRATEGIC ALLIANCES",
                    date: "January 2026",
                    title: "Institutional partnerships accelerate domestic guided...",
                    image: "/images/news-strategic-alliances.jpg",
                  },
                ].map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (
                        rel.id === "aerospace-highlights" ||
                        rel.id === "defence-systems" ||
                        rel.id === "tactical-uav"
                      ) {
                        setActiveArticleId(rel.id);
                      }
                    }}
                    className="group bg-[#050c1c]/90 rounded-2xl border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="relative w-full h-[160px] sm:h-[170px] overflow-hidden bg-black/40">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-black/60 backdrop-blur-md border border-slate-700/80 uppercase">
                            {rel.categoryBadge}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <p className="text-[11px] text-slate-400 font-medium mb-1.5">
                          {rel.date}
                        </p>
                        <h4 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If viewing Strategic Alliances article (Fourth Box)
  if (activeArticleId === "strategic-alliances") {
    return (
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 pt-24 sm:pt-28 pb-20 selection:bg-sky-500 selection:text-slate-950">
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Back Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST & SECOND IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-8 space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Institutional partnerships accelerate domestic guided weapons integration
            </h1>

            <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-xs font-mono border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  PUBLISHED
                </span>
                <span className="text-white font-semibold">January 2026</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  AUTHORITY / DIRECTORATE
                </span>
                <span className="text-white font-semibold">Strategic Alliances &amp; Capability Bureau</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="relative w-full h-[280px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <Image
                  src="/images/news-strategic-alliances.jpg"
                  alt="Defence forces and industrial partners marking strategic sovereign capability milestones"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <p className="text-center italic text-xs text-slate-400 font-sans pt-1">
                Defence forces and industrial partners marking strategic sovereign capability milestones
              </p>
            </div>
          </div>

          {/* THIRD IMAGE DATA: Lead Callout, Highlights Box, and Sovereign Co-Development */}
          <div className="space-y-8 text-slate-200 text-base sm:text-[17px] leading-relaxed">
            {/* Intro Lead Callout with Left Cyan Border */}
            <div className="border-l-4 border-sky-400 pl-4 sm:pl-5 py-1">
              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                Collaborative framework brings together premiere research institutions, state defense laboratories, and private engineering leaders to accelerate indigenous precision munitions development.
              </p>
            </div>

            {/* Key Strategic Highlights Box */}
            <div className="rounded-2xl bg-[#050c1c]/90 border border-slate-800/90 p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.6)] space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <span className="text-sky-400 font-mono text-lg">◈</span>
                <span>Key Strategic Highlights</span>
              </div>

              <div className="space-y-3 pl-1">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Strategic synergy between research labs, tier-1 defense contractors, and specialized manufacturing plants.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Development of anti-jam seeker heads and AI-guided terminal flight corrections.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Establishment of joint qualification and simulated wind-tunnel testing facilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Sovereign Co-Development Frameworks */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sovereign Co-Development Frameworks
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                National defense capability depends on deep industrial partnerships that bridge scientific research with rapid manufacturing execution. Sky Wardens has formalized agreements with leading research organizations and aerospace consortiums to co-develop precision-guided ammunition and loitering munition propulsion modules.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                By aligning technical competencies across aerodynamic simulation, solid rocket propellant formulation, and seeker miniaturization, the alliance has compressed prototype iteration cycles from years into months.
              </p>
            </div>

            {/* FOURTH IMAGE DATA: Joint Testing & Calibration Milestones, Quote, Back Button */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Joint Testing &amp; Calibration Milestones
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Extensive static firings and hardware-in-the-loop (HIL) simulations have demonstrated guidance accuracy with a circular error probable (CEP) of under 1 meter under GPS-denied scenarios.
              </p>
            </div>

            {/* Quote Callout */}
            <div className="border-l-4 border-sky-400 bg-[#050c1c]/90 p-6 sm:p-7 rounded-r-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <p className="italic text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                &ldquo;Institutional alliances turn raw sovereign ambition into deployable, field-tested capability for national defense readiness.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-mono text-sky-400 font-semibold mt-3">
                &mdash; Strategic Alliances &amp; Capability Bureau
              </p>
            </div>
          </div>

          {/* Back to News Pill Button */}
          <div className="mt-12 sm:mt-14 pt-8 border-t border-slate-800 flex justify-start">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="px-6 py-2.5 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-white inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/20"
            >
              <span>&larr; Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIFTH IMAGE DATA: Related Strategic Reports & Footer Cards */}
          <div className="mt-10 sm:mt-12 space-y-8">
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-2">
                CONTINUE READING
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
                Related Strategic Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: "aerospace-highlights",
                    categoryBadge: "AEROSPACE",
                    date: "March 2026",
                    title: "Aerospace highlights and autonomous flight program...",
                    image: "/images/stealth-fighter-hangar.jpg",
                  },
                  {
                    id: "defence-systems",
                    categoryBadge: "DEFENCE",
                    date: "February 2026",
                    title: "Defence systems, protective platforms, and readiness...",
                    image: "/images/tactical-defense-operator.jpg",
                  },
                  {
                    id: "tactical-uav",
                    categoryBadge: "SOVEREIGN TECH",
                    date: "February 2026",
                    title: "Tactical UAV flight trials validate high-altitude flight envelope",
                    image: "/images/tactical-uav-orbit.jpg",
                  },
                ].map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setActiveArticleId(rel.id);
                    }}
                    className="group bg-[#050c1c]/90 rounded-2xl border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="relative w-full h-[160px] sm:h-[170px] overflow-hidden bg-black/40">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-black/60 backdrop-blur-md border border-slate-700/80 uppercase">
                            {rel.categoryBadge}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <p className="text-[11px] text-slate-400 font-medium mb-1.5">
                          {rel.date}
                        </p>
                        <h4 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ARTICLE 5 VIEW: AI-enabled edge telemetry deployment
  if (activeArticleId === "advanced-systems") {
    return (
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 pt-24 sm:pt-28 pb-20 selection:bg-sky-500 selection:text-slate-950">
        {/* Ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Back Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-8 space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              AI-enabled edge telemetry deployment for multi-theater command coordination
            </h1>

            <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-xs font-mono border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  PUBLISHED
                </span>
                <span className="text-white font-semibold">January 2026</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  AUTHORITY / DIRECTORATE
                </span>
                <span className="text-white font-semibold">Cyber &amp; Autonomous Systems Research</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="relative w-full h-[280px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <Image
                  src="/images/news-advanced-systems.jpg"
                  alt="Tactical telemetry and orbital defence mission control tablet"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <p className="text-center italic text-xs text-slate-400 font-sans pt-1">
                Tactical telemetry and orbital defence mission control tablet
              </p>
            </div>
          </div>

          {/* SECOND IMAGE DATA: Lead Callout, Highlights Box, and Detailed Sections */}
          <div className="space-y-8 text-slate-200 text-base sm:text-[17px] leading-relaxed">
            {/* Intro Lead Callout with Left Cyan Border */}
            <div className="border-l-4 border-sky-400 pl-4 sm:pl-5 py-1">
              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                Deployable tactical computing arrays fuse satellite imagery, radar feeds, and frontline drone video into an actionable single-pane-of-glass operational picture.
              </p>
            </div>

            {/* Key Strategic Highlights Box */}
            <div className="rounded-2xl bg-[#050c1c]/90 border border-slate-800/90 p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.6)] space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <span className="text-sky-400 font-mono text-lg">◈</span>
                <span>Key Strategic Highlights</span>
              </div>

              <div className="space-y-3 pl-1">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Sub-millisecond inference time on edge computing clusters running in mobile command centers.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Multi-spectral video automated target identification and track association.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Quantum-resistant encryption safeguarding inter-unit battle-space communications.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Zero-Latency Signal Routing Under Heavy Jamming */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Zero-Latency Signal Routing Under Heavy Jamming
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Modern warfare takes place as much in the electromagnetic spectrum as on the physical battlefield. Sky Wardens&apos; newly deployed edge telemetry architecture incorporates cognitive frequency hopping to ensure unbroken command connectivity even in heavily jammed electronic warfare sectors.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Local compute nodes process sensor feeds on-site rather than transmitting raw bandwidth over strained satellite uplinks, delivering synthesized threat assessments directly to frontline commanders.
              </p>
            </div>

            {/* Section: Predictive Battle-Space Threat Synthesis */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Predictive Battle-Space Threat Synthesis
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                By employing lightweight neural models trained specifically on military asset profiles, the system automatically detects abnormal movement clusters and highlights potential ambush or artillery staging activities before they materialize.
              </p>
            </div>
          </div>

          {/* THIRD IMAGE DATA: Centered Back Button & Related Strategic Reports */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-800 flex justify-center">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="px-6 py-2.5 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-white inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/20"
            >
              <span>&larr; Back to News &amp; Insights</span>
            </button>
          </div>

          <div className="mt-10 sm:mt-12 space-y-8">
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-2">
                CONTINUE READING
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
                Related Strategic Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: "aerospace-highlights",
                    categoryBadge: "AEROSPACE",
                    date: "March 2026",
                    title: "Aerospace highlights and autonomous flight program...",
                    image: "/images/stealth-fighter-hangar.jpg",
                  },
                  {
                    id: "defence-systems",
                    categoryBadge: "DEFENCE",
                    date: "February 2026",
                    title: "Defence systems, protective platforms, and readiness...",
                    image: "/images/tactical-defense-operator.jpg",
                  },
                  {
                    id: "tactical-uav",
                    categoryBadge: "SOVEREIGN TECH",
                    date: "February 2026",
                    title: "Tactical UAV flight trials validate high-altitude flight envelope",
                    image: "/images/tactical-uav-orbit.jpg",
                  },
                ].map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setActiveArticleId(rel.id);
                    }}
                    className="group bg-[#050c1c]/90 rounded-2xl border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="relative w-full h-[160px] sm:h-[170px] overflow-hidden bg-black/40">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-black/60 backdrop-blur-md border border-slate-700/80 uppercase">
                            {rel.categoryBadge}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <p className="text-[11px] text-slate-400 font-medium mb-1.5">
                          {rel.date}
                        </p>
                        <h4 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ARTICLE 6 VIEW: High-precision manufacturing facility scale-up
  if (activeArticleId === "manufacturing-facility") {
    return (
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 pt-24 sm:pt-28 pb-20 selection:bg-sky-500 selection:text-slate-950">
        {/* Ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Back Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-8 space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              High-precision manufacturing facility scale-up for loitering munitions
            </h1>

            <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-xs font-mono border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  PUBLISHED
                </span>
                <span className="text-white font-semibold">December 2025</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">
                  AUTHORITY / DIRECTORATE
                </span>
                <span className="text-white font-semibold">Industrial Manufacturing Operations</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="relative w-full h-[280px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <Image
                  src="/images/news-manufacturing-facility.jpg"
                  alt="Advanced aerospace manufacturing bay assembling precision tactical drone systems"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <p className="text-center italic text-xs text-slate-400 font-sans pt-1">
                Advanced aerospace manufacturing bay assembling precision tactical drone systems
              </p>
            </div>
          </div>

          {/* SECOND & THIRD IMAGE DATA: Lead Callout, Highlights Box, Detailed Sections, Quote */}
          <div className="space-y-8 text-slate-200 text-base sm:text-[17px] leading-relaxed">
            {/* Intro Lead Callout with Left Cyan Border */}
            <div className="border-l-4 border-sky-400 pl-4 sm:pl-5 py-1">
              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                New state-of-the-art facility increases annual manufacturing output by 300% to meet growing domestic and allied force defense procurement schedules.
              </p>
            </div>

            {/* Key Strategic Highlights Box */}
            <div className="rounded-2xl bg-[#050c1c]/90 border border-slate-800/90 p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.6)] space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <span className="text-sky-400 font-mono text-lg">◈</span>
                <span>Key Strategic Highlights</span>
              </div>

              <div className="space-y-3 pl-1">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Cleanroom robotic surface-mount assembly lines certified for aerospace-grade electronics.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    High-precision 5-axis CNC machining centers achieving micrometer-level structural tolerances.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold mt-0.5 text-base">✓</span>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                    Automated quality inspection with 100% radiographic X-ray scanning of composite airframe bonds.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Robotic Precision & High-Tolerance Fabrication */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Robotic Precision &amp; High-Tolerance Fabrication
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                To keep pace with accelerated production quotas, Sky Wardens has commissioned an expanded 85,000 sq ft manufacturing wing equipped with automated optical inspection and automated robotic component placement.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                This investment ensures that every loitering munition and tactical drone leaving the facility satisfies uncompromising structural and aerodynamic tolerances, ready for immediate tactical deployment.
              </p>
            </div>

            {/* Quote Callout */}
            <div className="border-l-4 border-sky-400 bg-[#050c1c]/90 p-6 sm:p-7 rounded-r-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <p className="italic text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                &ldquo;Manufacturing depth is the bedrock of sovereign defense. Building at scale with zero margin for error is our core commitment to the armed forces.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-mono text-sky-400 font-semibold mt-3">
                &mdash; Industrial Manufacturing Operations
              </p>
            </div>

            {/* Section: Rapid Scalability for Strategic Readiness */}
            <div className="pt-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Rapid Scalability for Strategic Readiness
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The modular assembly line is designed to scale production by 3x within 72 hours in response to emergency replenishment demands, backed by strategic domestic supply stockpiles.
              </p>
            </div>
          </div>

          {/* Centered Back Button & Related Strategic Reports */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-800 flex justify-center">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="px-6 py-2.5 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-white inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/20"
            >
              <span>&larr; Back to News &amp; Insights</span>
            </button>
          </div>

          <div className="mt-10 sm:mt-12 space-y-8">
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-2">
                CONTINUE READING
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
                Related Strategic Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: "aerospace-highlights",
                    categoryBadge: "AEROSPACE",
                    date: "March 2026",
                    title: "Aerospace highlights and autonomous flight program...",
                    image: "/images/stealth-fighter-hangar.jpg",
                  },
                  {
                    id: "defence-systems",
                    categoryBadge: "DEFENCE",
                    date: "February 2026",
                    title: "Defence systems, protective platforms, and readiness...",
                    image: "/images/tactical-defense-operator.jpg",
                  },
                  {
                    id: "tactical-uav",
                    categoryBadge: "SOVEREIGN TECH",
                    date: "February 2026",
                    title: "Tactical UAV flight trials validate high-altitude flight envelope",
                    image: "/images/tactical-uav-orbit.jpg",
                  },
                ].map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setActiveArticleId(rel.id);
                    }}
                    className="group bg-[#050c1c]/90 rounded-2xl border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="relative w-full h-[160px] sm:h-[170px] overflow-hidden bg-black/40">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-black/60 backdrop-blur-md border border-slate-700/80 uppercase">
                            {rel.categoryBadge}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <p className="text-[11px] text-slate-400 font-medium mb-1.5">
                          {rel.date}
                        </p>
                        <h4 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic Article View for custom articles added via CMS (e.g. petrochemichal)
  if (activeArticle && ![
    "aerospace-highlights",
    "defence-systems",
    "tactical-uav",
    "strategic-alliances",
    "advanced-systems",
    "manufacturing-facility"
  ].includes(activeArticleId || "")) {
    return (
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 pt-24 sm:pt-28 pb-20 selection:bg-sky-500 selection:text-slate-950">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to News &amp; Insights</span>
            </button>
          </div>

          <div className="mb-8 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/40 border border-sky-500/30 uppercase">
              {activeArticle.categoryBadge}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-xs sm:text-sm font-mono text-slate-400">
              {activeArticle.meta} &bull; Official Strategic Dispatch
            </p>

            {activeArticle.image && activeArticle.image.trim().length > 0 && (
              <div className="relative w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mt-4 bg-black/40">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  unoptimized
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-6 text-slate-200 text-base sm:text-[17px] leading-relaxed">
            {activeArticle.excerpt && (
              <div className="border-l-4 border-sky-400 pl-4 sm:pl-5 py-1">
                <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                  {activeArticle.excerpt}
                </p>
              </div>
            )}

            {activeArticle.content && activeArticle.content.length > 0 ? (
              activeArticle.content.map((p, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-slate-300 leading-relaxed">
                {activeArticle.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: 6 Articles Grid
  return (
    <div className="w-full min-h-screen bg-[#02050e] text-slate-100 pt-24 sm:pt-28 pb-20 selection:bg-sky-500 selection:text-slate-950">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-sky-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-3">
            LATEST DISPATCHES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-white tracking-tight leading-tight">
            News, Insights &amp; Operational Reports
          </h1>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 sm:mb-12 no-scrollbar">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0ea5e9] text-black font-bold shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                    : "bg-[#050c1c]/90 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 6 Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredArticles.map((article) => {
              const hasImage = Boolean(article.image && article.image.trim().length > 0);

              return (
                <div
                  key={article.id}
                  className="group relative bg-[#050c1c]/90 rounded-2xl border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with Badge (Only if image exists) */}
                    {hasImage ? (
                      <div className="relative w-full h-[210px] sm:h-[230px] overflow-hidden bg-black/40">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050c1c] via-transparent to-transparent opacity-80" />

                        {/* Top-Left Category Badge */}
                        <div className="absolute top-3.5 left-3.5">
                          <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-sky-400 bg-black/60 backdrop-blur-md border border-slate-700/80 uppercase">
                            {article.categoryBadge}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Text-Only Card: Category Badge at Top */
                      <div className="p-5 sm:p-6 pb-0 pt-6">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/40 border border-sky-500/30 uppercase">
                          {article.categoryBadge}
                        </span>
                      </div>
                    )}

                    {/* Card Body */}
                    <div className={`p-5 sm:p-6 pb-2 ${!hasImage ? "pt-3" : ""}`}>
                      {/* Meta: Date & Read Time */}
                      <p className="text-xs text-slate-400 font-medium mb-2.5">
                        {article.meta}
                      </p>

                      {/* Title */}
                      <h2
                        onClick={() => setActiveArticleId(article.id)}
                        className={`text-lg sm:text-xl font-bold transition-colors leading-snug tracking-tight mb-3 cursor-pointer ${
                          article.titleClass || "text-white group-hover:text-sky-300"
                        }`}
                      >
                        {article.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                {/* Card Footer Link */}
                <div className="p-5 sm:p-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveArticleId(article.id)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-sky-400 group-hover:text-sky-300 transition-colors cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#050c1c]/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              No articles found in this category. Showing all latest dispatches shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
