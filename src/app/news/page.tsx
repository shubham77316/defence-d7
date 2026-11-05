"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
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
  bodySections?: {
    heading?: string;
    paragraphs: string[];
  }[];
}

const NEWS_BACKDROP_STYLE = {
  backgroundImage:
    "radial-gradient(ellipse at 12% 8%, rgba(14, 165, 233, 0.10), transparent 34%), radial-gradient(ellipse at 84% 38%, rgba(8, 47, 73, 0.24), transparent 40%), linear-gradient(180deg, #020817 0%, #02050e 52%, #030712 100%)",
};

const NEWS_LETTERS = ["N", "E", "W", "S"];

function NewsScrollLetter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.01 + index * 0.16;
  const end = Math.min(start + 0.24, 0.98);
  const y = useTransform(progress, [start, end], ["110vh", "0vh"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.05, end], [0, 1, 1], { clamp: true });

  return (
    <motion.span
      style={{ y, opacity }}
      className="inline-block select-none font-anton text-[15vh] font-black uppercase leading-[0.63] tracking-tight text-center bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] sm:text-[17vh] md:text-[19vh] xl:text-[20.5vh]"
    >
      {char}
    </motion.span>
  );
}

function NewsMobileScrollLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.04 + index * 0.18;
  const end = Math.min(start + 0.22, 0.94);

  const x = useTransform(progress, [start, end], ["65vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.75, 1], { clamp: true });

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"
    >
      {char}
    </motion.span>
  );
}

const CATEGORIES = [
  "All",
  "Company News",
  "Partner News",
];

const articlesData: Article[] = [
  {
    id: "lorem-ipsum",
    category: "Company News",
    categoryBadge: "COMPANY NEWS",
    meta: "2 min read",
    title: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.",
    image: "/images/aerospace-stealth-hangar.jpg",
    bodySections: [
      {
        heading: "Lorem Ipsum Dolor Sit Amet",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam ante. Vivamus feugiat, elit nec facilisis sodales, arcu metus facilisis nisl, vel finibus quam lacus id lorem.",
          "Curabitur vehicula neque sit amet sem malesuada, in pulvinar libero sagittis. Donec bibendum augue nec tellus semper, vel posuere justo dapibus. Nam nec arcu et justo tincidunt sodales non nec ex.",
        ],
      },
      {
        heading: "Consectetur Adipiscing Elit",
        paragraphs: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
        ],
      },
      {
        heading: "Tempor Incididunt Ut Labore",
        paragraphs: [
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
          "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil.",
        ],
      },
      {
        heading: "Duis Aute Irure Dolor",
        paragraphs: [
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
          "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        ],
      },
    ],
  },
  {
    id: "sed-do-eiusmod",
    category: "Partner News",
    categoryBadge: "PARTNER NEWS",
    meta: "2 min read",
    title: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    image: "/images/tactical-defense-operator.jpg",
    bodySections: [
      {
        heading: "Ut Enim Ad Minim Veniam",
        paragraphs: [
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        ],
      },
      {
        heading: "Quis Nostrud Exercitation",
        paragraphs: [
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
          "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
        ],
      },
      {
        heading: "Ullamco Laboris Nisi Ut Aliquip",
        paragraphs: [
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio.",
          "Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia.",
        ],
      },
      {
        heading: "Sunt In Culpa Qui Officia",
        paragraphs: [
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
        ],
      },
    ],
  },
  {
    id: "quis-nostrud",
    category: "Company News",
    categoryBadge: "COMPANY NEWS",
    meta: "3 min read",
    title: "Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip",
    excerpt:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit.",
    image: "/images/news-advanced-systems.jpg",
    bodySections: [
      {
        heading: "Excepteur Sint Occaecat",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ],
      },
      {
        heading: "Duis Aute Irure Dolor",
        paragraphs: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        ],
      },
      {
        heading: "Deserunt Mollit Anim Id",
        paragraphs: [
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
        ],
      },
    ],
  },
];

const REPLACED_ARTICLE_IDS = new Set([
  "aerospace-highlights",
  "defence-systems",
  "advanced-systems",
  "lorem-ipsum",
  "sed-do-eiusmod",
  "quis-nostrud",
]);

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [articlesList, setArticlesList] = useState<Article[]>(articlesData);
  const newsHeroTrackRef = useRef<HTMLDivElement>(null);
  const mobileNewsTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileNewsTrackRef,
    offset: ["start start", "end end"],
  });
  const mobileProgress = useSpring(mobileScrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });
  const { scrollYProgress: newsHeroProgress } = useScroll({
    target: newsHeroTrackRef,
    offset: ["start start", "end end"],
  });
  const smoothNewsHeroProgress = useSpring(newsHeroProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });
  const newsScrollHintOpacity = useTransform(
    smoothNewsHeroProgress,
    [0, 0.06],
    [1, 0],
    { clamp: true },
  );

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
          if (json.success && Array.isArray(json.data)) {
            const customArticles: Article[] = json.data
              .map((d: any): Article => ({
                id: d.slug || d._id || d.id,
                category: (d.category ? (d.category.charAt(0).toUpperCase() + d.category.slice(1).toLowerCase()) : "Innovation"),
                categoryBadge: (d.category || "INNOVATION").toUpperCase(),
                meta: d.meta || `${d.date || new Date(d.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • ${d.readTime || "3 min read"}`,
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
              .filter(
                (d: Article) =>
                  !articlesData.some((a) => a.id === d.id) &&
                  !REPLACED_ARTICLE_IDS.has(d.id),
              );

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

  // Deduplicate strictly: every category appears EXACTLY ONCE
  const seenCategories = new Set<string>();
  const categoriesList: string[] = ["All"];
  seenCategories.add("all");

  // Add standard categories first
  CATEGORIES.forEach((c) => {
    const key = c.trim().toLowerCase();
    if (key && !seenCategories.has(key)) {
      seenCategories.add(key);
      categoriesList.push(c.trim());
    }
  });


  const filteredArticles =
    selectedCategory.toLowerCase() === "all"
      ? articlesList
      : articlesList.filter(
          (article) =>
            (article.category || "").toLowerCase() === selectedCategory.toLowerCase()
        );

  const relatedArticles = articlesList
    .filter((a) => a.id !== activeArticleId)
    .slice(0, 2);

  // If viewing Aerospace highlights article
  if (activeArticleId === "aerospace-highlights" || (activeArticle && activeArticleId === "aerospace-highlights")) {
    return (
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 font-sans pb-0 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        {/* Scroll-pinned News hero */}
        <div ref={newsHeroTrackRef} className="relative z-10 h-[220vh] w-full select-none">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 z-0">
              <Image
                src="/images/defence-systems-radar.jpg"
                alt="Defence radar system at an operational site"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center brightness-[0.62] contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/65 via-[#030712]/20 to-[#030712]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 via-transparent to-[#030712]/55" />
            </div>

            <div className="absolute left-4 top-20 z-30 pointer-events-auto sm:left-6 sm:top-24 md:left-8 lg:left-12 xl:left-14">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-[#040814]/80 px-3.5 py-1.5 text-xs uppercase tracking-wider text-cyan-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-cyan-300/60 hover:bg-[#071329] hover:text-white sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4 text-cyan-400 transition-transform group-hover:-translate-x-1" />
                <span>BACK TO HOME</span>
              </Link>
            </div>

            <motion.div
              style={{ opacity: newsScrollHintOpacity }}
              className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-sky-200/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-xs">
                Scroll to Reveal
              </span>
              <div className="flex h-8 w-5 items-start justify-center rounded-full border border-sky-300/45 bg-black/30 p-1 backdrop-blur-sm">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="h-1.5 w-1.5 rounded-full bg-sky-200"
                />
              </div>
            </motion.div>

            <div className="pointer-events-none absolute right-4 top-20 z-20 flex flex-col items-center select-none sm:right-6 md:right-8 lg:right-10 xl:right-14">
              <h1 aria-label="NEWS" className="flex flex-col items-center">
                {NEWS_LETTERS.map((char, index) => (
                  <NewsScrollLetter
                    key={`${char}-${index}`}
                    char={char}
                    index={index}
                    progress={smoothNewsHeroProgress}
                  />
                ))}
              </h1>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">
          {/* Top Back Button */}
          <div className="mb-3.5 sm:mb-6">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to News &amp; Insights</span>
            </button>
          </div>

          {/* Article Header Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5"
          >
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/40 border border-sky-500/30 uppercase">
              AEROSPACE
              
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Aerospace highlights and autonomous flight program positioning
            </h1>

            <p className="text-xs sm:text-sm font-mono text-slate-400">
              March 2026 &bull; 4 min read &bull; Official Strategic Dispatch
            </p>

            <div className="relative w-full h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mt-4">
              <Image
                src="/images/stealth-fighter-hangar.jpg"
                alt="Aerospace stealth fighter hangar"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>

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
                <span>Back to News &amp; Insights</span>
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
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 font-sans pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-12 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">
          {/* Breadcrumb nav */}
          <div className="mb-3.5 sm:mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="hover:text-sky-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to All News
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Partner News</span>
          </div>

          {/* Article Header */}
          <div className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5">
            {/* Badge + meta row */}
            <div className="flex items-center gap-3">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/40 border border-sky-500/30 uppercase">
                PARTNER NEWS
              </span>
              <span className="text-xs font-mono text-slate-400">2 min read</span>
            </div>

            {/* Big heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna
            </h1>

            {/* Authority row */}
            <div className="pb-2">
              <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5 font-mono">
                AUTHORITY / DIRECTORATE
              </span>
              <span className="text-white font-semibold text-sm">Strategic Partnerships Desk</span>
            </div>

            {/* Full-bleed hero image below heading */}
            <div className="relative w-full h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px] overflow-hidden shadow-2xl">
              <Image
                src="/images/tactical-defense-operator.jpg"
                alt="Specialist engineer analyzing tactical defence command telemetry"
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02050e]/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Article Body Content */}
          <div className="space-y-8 mt-8 text-slate-200">

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ut Enim Ad Minim Veniam
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Quis Nostrud Exercitation
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ullamco Laboris Nisi Ut Aliquip
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, simillique sunt in culpa qui officia deserunt mollitia.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sunt In Culpa Qui Officia
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.
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
                <span>Back to News &amp; Insights</span>
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
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 font-sans pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-12 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">
          {/* Top Back Button */}
          <div className="mb-3.5 sm:mb-6">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5">
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
              <div className="relative w-full h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
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
              <span>Back to News &amp; Insights</span>
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
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 font-sans pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-12 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>
        {/* Background ambient lighting */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">
          {/* Top Back Button */}
          <div className="mb-3.5 sm:mb-6">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST & SECOND IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5">
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
              <div className="relative w-full h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
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
              <span>Back to News &amp; Insights</span>
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
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 font-sans pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-12 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>
        {/* Ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">
          {/* Top Back Button */}
          <div className="mb-3.5 sm:mb-6">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5">
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
              <div className="relative w-full h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
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
              <span>Back to News &amp; Insights</span>
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
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 font-sans pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-12 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>
        {/* Ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">
          {/* Top Back Button */}
          <div className="mb-3.5 sm:mb-6">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to News &amp; Insights</span>
            </button>
          </div>

          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}
          <div className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5">
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
              <div className="relative w-full h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
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
              <span>Back to News &amp; Insights</span>
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
      <div className="w-full min-h-screen bg-[#02050e] text-slate-100 font-sans pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-12 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">
          <div className="mb-3.5 sm:mb-6">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to News &amp; Insights</span>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5"
          >
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
              <div className="relative w-full h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mt-4 bg-black/40">
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
          </motion.div>

          {activeArticle.bodySections ? (
            <div className="space-y-8 text-slate-200 text-base sm:text-[17px] leading-relaxed">
              {activeArticle.bodySections.map((section, sectionIndex) => (
                <motion.section
                  key={`${section.heading || "section"}-${sectionIndex}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {section.heading && (
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${sectionIndex}-${paragraphIndex}`}
                      className="text-slate-300 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </motion.section>
              ))}
            </div>
          ) : (
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
          )}

          {relatedArticles.length > 0 && (
            <section className="mt-14 sm:mt-16 border-t border-slate-800 pt-8">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-2">
                CONTINUE READING
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
                Related Strategic Reports
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => setActiveArticleId(article.id)}
                    className="group overflow-hidden rounded-2xl border border-slate-800/90 bg-[#050c1c]/90 text-left shadow-[0_12px_35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-sky-500/40"
                  >
                    {article.image && (
                      <div className="relative h-[240px] sm:h-[320px] w-full overflow-hidden bg-black/40">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 inline-block rounded-full border border-slate-700/80 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-sky-400 backdrop-blur-md">
                          {article.categoryBadge}
                        </span>
                      </div>
                    )}
                    <div className="p-4 sm:p-5">
                      <h3 className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-sky-300 sm:text-base">
                        {article.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: Cinematic news hero followed by the article grid
  return (
    <div className="w-full min-h-screen bg-[#02050e] text-slate-100 font-sans pb-0 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-sky-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[45%] right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-[130px] rounded-full" />
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Matching Defence exact mobile layout) */}
      {/* ========================================================================= */}
      <div ref={mobileNewsTrackRef} className="sm:hidden relative w-full h-[240vh] select-none">
        <div className="sticky top-14 z-30 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">
          {/* Tactical Image Box */}
          <div className="relative w-full max-w-[420px] mx-auto">
            {/* Responsive Only: Back to Home Button at Top-Left of Image */}
            <div className="absolute top-2.5 left-2.5 z-40 pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 h-7 px-2.5 text-[10px] xs:text-[10.5px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#040814]/90 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto whitespace-nowrap"
              >
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
                <span>BACK TO HOME</span>
              </Link>
            </div>
            <Image
              src="/images/news-advanced-systems.jpg"
              alt="Mission control team reviewing orbital defence updates"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
              sizes="(max-width: 640px) 100vw"
            />

            {/* NEWS Letters Over The Image (Assemble one by one during scroll) */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
              <h1 className="font-anton font-black uppercase text-[24vw] xs:text-[25vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
                {NEWS_LETTERS.map((char, index) => (
                  <NewsMobileScrollLetter
                    key={index}
                    char={char}
                    index={index}
                    total={NEWS_LETTERS.length}
                    progress={mobileProgress}
                  />
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP CINEMATIC STICKY SCROLL TRACK (hidden sm:block)                */}
      {/* ========================================================================= */}
      <div ref={newsHeroTrackRef} className="hidden sm:block relative z-10 h-[220vh] w-full select-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/images/news-advanced-systems.jpg"
              alt="Mission control team reviewing orbital defence updates"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.62] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/65 via-[#030712]/20 to-[#030712]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 via-transparent to-[#030712]/55" />
          </div>

          <div className="absolute left-4 top-20 z-30 pointer-events-auto sm:left-6 sm:top-24 md:left-8 lg:left-12 xl:left-14">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-[#040814]/80 px-3.5 py-1.5 text-xs uppercase tracking-wider text-cyan-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-cyan-300/60 hover:bg-[#071329] hover:text-white sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-400 transition-transform group-hover:-translate-x-1" />
              <span>BACK TO HOME</span>
            </Link>
          </div>

          <motion.div
            style={{ opacity: newsScrollHintOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-sky-200/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-xs">
              Scroll to Reveal
            </span>
            <div className="flex h-8 w-5 items-start justify-center rounded-full border border-sky-300/45 bg-black/30 p-1 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-sky-200"
              />
            </div>
          </motion.div>

          <div className="pointer-events-none absolute right-4 top-20 z-20 flex flex-col items-center select-none sm:right-6 md:right-8 lg:right-10 xl:right-14">
            <h1 aria-label="NEWS" className="flex flex-col items-center">
              {NEWS_LETTERS.map((char, index) => (
                <NewsScrollLetter
                  key={`${char}-${index}`}
                  char={char}
                  index={index}
                  progress={smoothNewsHeroProgress}
                />
              ))}
            </h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5 pt-4 sm:pt-12 pb-3 sm:pb-10 lg:pb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-7"
        >
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-sky-400 uppercase block mb-1.5 sm:mb-2.5">
            LATEST DISPATCHES
          </span>
          <div className="group w-fit max-w-full [perspective:1000px]">
            <h1 className="relative [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:[transform:rotateX(180deg)] motion-reduce:transition-none">
              <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-white tracking-tight leading-tight [backface-visibility:hidden]">
                News, Insights &amp; Operational Reports
              </span>
              <span aria-hidden="true" className="absolute inset-0 flex items-center text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight leading-tight text-sky-300 [transform:rotateX(180deg)] [backface-visibility:hidden]">
                STRATEGIC DISPATCHES
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-5 sm:mb-8 no-scrollbar">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "bg-sky-400/15 text-sky-200 font-bold border border-sky-300/50 shadow-[0_0_12px_rgba(56,189,248,0.16)]"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
            {filteredArticles.map((article, index) => {
              const hasImage = Boolean(article.image && article.image.trim().length > 0);

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(index * 0.12, 0.6),
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
              </motion.article>
            );
          })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#050c1c]/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              No articles found in this category. Showing all latest dispatches shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
