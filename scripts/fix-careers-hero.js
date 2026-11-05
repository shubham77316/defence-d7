const fs = require('fs');
const file = 'd:/defence/src/app/careers/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// Find the function component open and add the scroll refs + hooks
const fnOpen = `export default function CareersPage() {\r\n  const [expandedRole, setExpandedRole] = useState<string | null>(null);`;
const fnOpenNew = `export default function CareersPage() {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(heroProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });`;

c = c.replace(fnOpen, fnOpenNew);

// Replace the old return block hero
const oldHero = `  return (\r\n    <div className="min-h-screen bg-[#020408] text-slate-100 pt-28 pb-24 relative overflow-hidden">\r\n      {/* Background Ambience & Subtle Grid */}\r\n      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-900/15 rounded-full blur-[150px] pointer-events-none" />\r\n      <div\r\n        className="absolute inset-0 opacity-[0.03] pointer-events-none"\r\n        style={{\r\n          backgroundImage: \`radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px)\`,\r\n          backgroundSize: "36px 36px",\r\n        }}\r\n      />\r\n\r\n      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">\r\n        {/* Header Section (Exactly matching user screenshot) */}\r\n        <div className="max-w-4xl mb-12 sm:mb-14">\r\n          {/* Top Tag */}\r\n          <div className="flex items-center gap-2 mb-4">\r\n            <span className="w-4 h-[2px] bg-sky-400 inline-block" />\r\n            <span className="text-xs sm:text-sm font-mono tracking-widest text-sky-400 font-semibold uppercase">\r\n              OPPORTUNITIES & GROWTH\r\n            </span>\r\n          </div>\r\n\r\n          {/* Main Title */}\r\n          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans leading-[1.08] mb-6">\r\n            ADVANCING DEFENCE <br />\r\n            & YOUR CAREER\r\n          </h1>\r\n\r\n          {/* Subtitle Paragraph */}\r\n          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-3xl">\r\n            Anuvyom is designed as a long term industrial platform focused on aerospace & defence\r\n            sector. We are interested in working with individuals who value\r\n            technical excellence, long term thinking, and meaningful industrial impact.\r\n          </p>\r\n        </div>\r\n\r\n        {/* Exact 2 Job Cards Grid (Matching screenshot precisely) */}\r\n        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">`;

const newHero = `  return (
    <div className="relative min-h-screen bg-[#030712] overflow-x-clip text-white selection:bg-sky-500/30 selection:text-sky-200">

      {/* ── CINEMATIC STICKY SCROLL HERO (Careers) ── */}
      <div ref={heroTrackRef} className="relative w-full h-[220vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">

          {/* Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Careers at Sky Wardens"
              fill
              priority
              className="object-cover object-center brightness-90 contrast-110"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-transparent to-[#030712] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/55 via-transparent to-[#030712]/55 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
          </div>

          {/* Back to Home Button */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-14 z-30 pointer-events-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1.5 px-3.5 rounded-lg bg-[#040814]/80 hover:bg-[#071329] border border-cyan-400/30 hover:border-cyan-300/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
              <span>BACK TO HOME</span>
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-end pb-8">
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="pointer-events-none flex flex-col items-center gap-2 select-none"
            >
              <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.3em] uppercase text-sky-300/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Scroll to Reveal
              </span>
              <div className="w-5 h-8 rounded-full border border-sky-400/40 flex items-start justify-center p-1 bg-black/30 backdrop-blur-sm">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-sky-300"
                />
              </div>
            </motion.div>
          </div>

          {/* Vertical CAREERS letters column */}
          <div className="absolute right-4 sm:right-6 md:right-8 lg:right-10 xl:right-14 top-18 sm:top-20 lg:top-22 z-20 flex flex-col items-center pointer-events-none select-none">
            <h1 aria-label="CAREERS" className="flex flex-col items-center select-none pointer-events-none">
              {CAREERS_LETTERS.map((char, index) => (
                <CareerScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  progress={smoothProgress}
                />
              ))}
            </h1>
          </div>

        </div>
      </div>

      {/* ── MAIN CAREERS CONTENT ── */}
      <div className="relative z-10 pt-8 pb-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="max-w-4xl mb-12 sm:mb-14">
          {/* Top Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-[2px] bg-sky-400 inline-block" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-sky-400 font-semibold uppercase">
              OPPORTUNITIES &amp; GROWTH
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans leading-[1.08] mb-6">
            ADVANCING DEFENCE <br />
            &amp; YOUR CAREER
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-3xl">
            Sky Wardens is building long-term sovereign capability in aerospace &amp; defence. We work
            with individuals who value technical excellence, long-term thinking, and meaningful
            industrial impact.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">`;

c = c.replace(oldHero, newHero);

fs.writeFileSync(file, c, 'utf8');
console.log('Hero replaced. Length:', c.length);

