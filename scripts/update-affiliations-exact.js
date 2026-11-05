const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Add scrollY hook for mobileProgress
const targetScroll = `  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });`;

const replacementScroll = `  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });
  const { scrollY } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const mobileProgressRaw = useTransform(scrollY, [0, 100], [0, 1], { clamp: true });
  const mobileProgress = useSpring(mobileProgressRaw, {
    stiffness: 150,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });`;

// 2. Replace Hero Block with separate Mobile + Desktop hero
const targetHero = `      {/* ========================================================================= */}
      {/* CINEMATIC STICKY SCROLL HERO TRACK (Letter-By-Letter Right Slide Reveal)  */}
      {/* ========================================================================= */}
      <div ref={heroTrackRef} className="relative w-full h-[240vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">

          {/* Background Image — fixed behind everything during scroll track */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/news-strategic-alliances.jpg"
              alt="Strategic Alliances & Affiliations"
              fill
              priority
              className="object-cover object-center brightness-95 contrast-105"
              sizes="100vw"
            />
            {/* Subtle Top Gradient for Navbar legibility & Dark Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/60 via-transparent to-[#030712]/60 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
          </div>

          {/* Back to Home Button — placed directly below the navbar logo / "Aerospace" */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-14 z-30 pointer-events-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1.5 px-3.5 rounded-lg bg-[#040814]/80 hover:bg-[#071329] border border-cyan-400/30 hover:border-cyan-300/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
              <span>BACK TO HOME</span>
            </Link>
          </div>

          {/* Top Spacer with Scroll Hint */}
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

          <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden flex items-end justify-center pointer-events-none select-none">
            <h1
              aria-label="AFFILIATIONS"
              className="font-anton font-black uppercase text-[14vw] sm:text-[15vw] md:text-[16vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none block overflow-visible"
            >
              {AFFILIATIONS_LETTERS.map((char, index) => (
                <AffiliationScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  progress={smoothProgress}
                />
              ))}
            </h1>
          </div>

        </div>
      </div>`;

const replacementHero = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Normal layout flow, zero sticky lag) */}
      {/* ========================================================================= */}
      <div className="sm:hidden relative w-full pt-14 pb-2 px-2 select-none overflow-x-clip">
        {/* Back to Home Button on mobile */}
        <div className="mb-2 pl-1 z-30 pointer-events-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1 px-3 rounded-lg bg-[#040814]/80 border border-cyan-400/30 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Tactical Image Box */}
        <div className="relative w-full max-w-[420px] mx-auto">
          <Image
            src="/images/news-strategic-alliances.jpg"
            alt="Strategic Alliances & Affiliations"
            width={900}
            height={600}
            priority
            className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
            sizes="(max-width: 640px) 100vw"
          />

          {/* AFFILIATIONS Letters Over The Image (Center at bottom where image finishes) */}
          <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
            <h1
              aria-label="AFFILIATIONS"
              className="font-anton font-black uppercase text-[13.5vw] xs:text-[14vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible"
            >
              {AFFILIATIONS_LETTERS.map((char, index) => (
                <AffiliationScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  progress={mobileProgress}
                />
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP CINEMATIC STICKY SCROLL TRACK (hidden sm:block)                */}
      {/* ========================================================================= */}
      <div ref={heroTrackRef} className="hidden sm:block relative w-full h-[180vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">

          {/* Background Image — fixed behind everything during scroll track */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/news-strategic-alliances.jpg"
              alt="Strategic Alliances & Affiliations"
              fill
              priority
              className="object-cover object-center brightness-95 contrast-105"
              sizes="100vw"
            />
            {/* Subtle Top Gradient for Navbar legibility & Dark Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 via-transparent to-[#030712]/50 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/85 to-transparent pointer-events-none" />
          </div>

          {/* Back to Home Button — placed directly below the navbar logo / "Aerospace" */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-14 z-30 pointer-events-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1.5 px-3.5 rounded-lg bg-[#040814]/80 hover:bg-[#071329] border border-cyan-400/30 hover:border-cyan-300/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
              <span>BACK TO HOME</span>
            </Link>
          </div>

          {/* Top Spacer with Scroll Hint */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-end pb-8">
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="pointer-events-none flex flex-col items-center gap-2 select-none"
            >
              <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-sky-300/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
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

          <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden flex items-end justify-center pb-2 pointer-events-none select-none">
            <h1
              aria-label="AFFILIATIONS"
              className="font-anton font-black uppercase text-[14vw] sm:text-[15vw] md:text-[16vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none block overflow-visible -mb-4 md:-mb-6"
            >
              {AFFILIATIONS_LETTERS.map((char, index) => (
                <AffiliationScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  progress={smoothProgress}
                />
              ))}
            </h1>
          </div>

        </div>
      </div>`;

c = c.replace(/\r\n/g, '\n');
const normScroll = targetScroll.replace(/\r\n/g, '\n');
const normHero = targetHero.replace(/\r\n/g, '\n');

if (c.includes(normScroll)) {
  c = c.replace(normScroll, replacementScroll.replace(/\r\n/g, '\n'));
  console.log('Scroll hooks replaced!');
} else {
  console.log('Scroll hooks NOT found!');
}

if (c.includes(normHero)) {
  c = c.replace(normHero, replacementHero.replace(/\r\n/g, '\n'));
  console.log('Hero block replaced!');
} else {
  console.log('Hero block NOT found!');
}

fs.writeFileSync(file, c, 'utf8');
console.log('Partnerships / Affiliations page updated!');

