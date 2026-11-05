const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Exact AffiliationScrollLetter matching DefenceScrollLetter
const targetLetter = `function AffiliationScrollLetter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  // One by one staggered scroll reveal matching Defence & Aerospace
  const start = 0.04 + index * 0.065;
  const end = Math.min(start + 0.16, 0.94);

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
}`;

const replacementLetter = `function AffiliationScrollLetter({
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
  const start = 0.04 + index * 0.075;
  const end = Math.min(start + 0.18, 0.94);

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
}`;

// 2. Exact Desktop Hero matching Defence
const targetDesktopHero = `      {/* ── 2. DESKTOP STICKY HERO SECTION (hidden sm:block) ── */}
      <div ref={heroRef} className="hidden sm:block relative h-[170vh] w-full overflow-x-hidden">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between">

          {/* Background Image — fixed behind everything */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/news-strategic-alliances.jpg"
              alt="Strategic Alliances"
              fill
              priority
              className="object-cover object-center brightness-[0.82] contrast-[1.08]"
              sizes="100vw"
            />
            {/* Dark overlay top */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#010309]/75 via-transparent to-[#010309]" />
            {/* Bottom fade into page */}
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#010309] to-transparent" />
          </div>

          {/* HUD corner labels */}
          <div className="absolute top-24 left-8 text-[9px] font-mono text-cyan-400/40 tracking-widest hidden lg:block select-none z-10">
            <div>[GEO-LATTICE // 44.02° N : 77.20° E]</div>
            <div>[ORBIT-SYNC // 32.4 GHz CARRIER]</div>
          </div>
          <div className="absolute top-24 right-8 text-[9px] font-mono text-red-400/40 tracking-widest text-right hidden lg:block select-none z-10">
            <div>[TARGETING LASERS // NOMINAL]</div>
            <div>[SEC-CLEARANCE // ACTIVE]</div>
          </div>

          {/* Scroll hint */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-10">
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
              />
            </motion.div>
          </div>

          {/* Lower Content Block: Monumental AFFILIATIONS Letters Assembled in Center from Right on Scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 overflow-visible">
            <h1 className="font-anton font-black uppercase text-[15vw] md:text-[16vw] lg:text-[16.5vw] xl:text-[17vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-4 md:-mb-6 block overflow-visible">
              {AFFILIATIONS_LETTERS.map((char, i) => (
                <AffiliationScrollLetter
                  key={i}
                  char={char}
                  index={i}
                  progress={scrollYProgressSpring}
                />
              ))}
            </h1>
          </div>

        </div>
      </div>`;

const replacementDesktopHero = `      {/* ========================================================================= */}
      {/* 2. DESKTOP CINEMATIC STICKY SCROLL TRACK (hidden sm:block - Same as Defence) */}
      {/* ========================================================================= */}
      <div ref={heroRef} className="hidden sm:block relative w-full h-[180vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">
          
          {/* Tactical Operator & Alliances Background Image */}
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

          {/* Top Spacer with Scroll Hint exactly like Defence */}
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

          {/* Lower Content Block: Monumental AFFILIATIONS Letters Assembled from Right on Scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[15vw] md:text-[16vw] lg:text-[16.5vw] xl:text-[17vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-5 md:-mb-7 lg:-mb-9 block overflow-visible"
            >
              {AFFILIATIONS_LETTERS.map((char, index) => (
                <AffiliationScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  total={AFFILIATIONS_LETTERS.length}
                  progress={scrollYProgressSpring}
                />
              ))}
            </h1>
          </div>
        </div>
      </div>`;

// 3. Update Mobile Hero letter props
const targetMobileLetterProps = `{AFFILIATIONS_LETTERS.map((char, index) => (
                <AffiliationScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  progress={mobileProgress}
                />
              ))}`;

const replacementMobileLetterProps = `{AFFILIATIONS_LETTERS.map((char, index) => (
                <AffiliationScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  total={AFFILIATIONS_LETTERS.length}
                  progress={mobileProgress}
                />
              ))}`;

// 4. Update spring stiffness & damping to match defence exactly
const targetHookTiming = `  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });`;

const replacementHookTiming = `  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });`;

c = c.replace(/\r\n/g, '\n');
const normLetter = targetLetter.replace(/\r\n/g, '\n');
const normDesktop = targetDesktopHero.replace(/\r\n/g, '\n');
const normHook = targetHookTiming.replace(/\r\n/g, '\n');

if (c.includes(normLetter)) {
  c = c.replace(normLetter, replacementLetter.replace(/\r\n/g, '\n'));
  console.log('Letter function updated to match defence!');
} else {
  console.log('Letter function NOT matched');
}

if (c.includes(normDesktop)) {
  c = c.replace(normDesktop, replacementDesktopHero.replace(/\r\n/g, '\n'));
  console.log('Desktop hero updated to match defence!');
} else {
  console.log('Desktop hero NOT matched');
}

if (c.includes(normHook)) {
  c = c.replace(normHook, replacementHookTiming.replace(/\r\n/g, '\n'));
  console.log('Hook timing updated to match defence!');
} else {
  console.log('Hook timing NOT matched');
}

fs.writeFileSync(file, c, 'utf8');
console.log('Partnerships exact defence clone done!');

