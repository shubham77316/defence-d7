const fs = require('fs');
const file = 'd:/defence/src/app/aerospace/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update scroll hooks
const targetScroll = `  const heroTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });`;

const replacementScroll = `  const heroTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });
  const { scrollY } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const mobileProgressRaw = useTransform(scrollY, [0, 140], [0, 1], { clamp: true });
  const mobileProgress = useSpring(mobileProgressRaw, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });`;

if (content.includes(targetScroll)) {
  content = content.replace(targetScroll, replacementScroll);
  console.log('Scroll replacement 1 matched!');
} else {
  // Try CRLF / LF normalization
  const normContent = content.replace(/\r\n/g, '\n');
  const normTarget = targetScroll.replace(/\r\n/g, '\n');
  if (normContent.includes(normTarget)) {
    content = normContent.replace(normTarget, replacementScroll.replace(/\r\n/g, '\n'));
    console.log('Scroll replacement 1 matched with normalized newlines!');
  } else {
    console.error('Failed to match targetScroll');
  }
}

// 2. Replace Hero and Main Content Area pt-12
const targetHero = `      {/* ========================================================================= */}
      {/* CINEMATIC STICKY SCROLL HERO TRACK (Letter-By-Letter Right Slide Reveal)  */}
      {/* ========================================================================= */}
      <div ref={heroTrackRef} className="relative w-full h-[240vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">
          
          {/* Tactical Drone Dusk City Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/aerospace-drone-city-hero.jpg"
              alt="Aerospace Tactical UAV Platform"
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

          {/* Top Spacer to let the Drone be prominent in center with Scroll Hint */}
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

          {/* Lower Content Block: Monumental AEROSPACE Letters Assembled from Right on Scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-0 sm:pb-2 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[17.5vw] sm:text-[18.5vw] md:text-[19.5vw] lg:text-[20.5vw] xl:text-[21vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-3 sm:-mb-5 md:-mb-7 lg:-mb-9 block overflow-visible"
            >
              {AEROSPACE_LETTERS.map((char, index) => (
                <AerospaceScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  total={AEROSPACE_LETTERS.length}
                  progress={smoothProgress}
                />
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-12 sm:pt-16 pb-24 space-y-12 sm:space-y-16">`;

const replacementHero = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Zero void, proper tight margin)     */}
      {/* ========================================================================= */}
      <div className="sm:hidden relative w-full pt-14 pb-1 px-2 select-none overflow-x-clip">
        {/* Image Stage preserving exact grenade/tactical size: h-[185px] xs:h-[210px] max-w-[420px] */}
        <div className="relative h-[185px] xs:h-[210px] w-full max-w-[420px] mx-auto flex items-center justify-center">
          <Image
            src="/images/aerospace-drone-city-hero.jpg"
            alt="Aerospace Tactical UAV Platform"
            fill
            priority
            className="object-contain filter contrast-[1.08] brightness-[1.05]"
            sizes="(max-width: 640px) 100vw, 420px"
          />

          {/* AEROSPACE Letters Over The Image */}
          <div className="absolute bottom-1 xs:bottom-2 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
            <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
              {AEROSPACE_LETTERS.map((char, index) => (
                <AerospaceScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  total={AEROSPACE_LETTERS.length}
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
      <div ref={heroTrackRef} className="hidden sm:block relative w-full h-[240vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">
          
          {/* Tactical Drone Dusk City Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/aerospace-drone-city-hero.jpg"
              alt="Aerospace Tactical UAV Platform"
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

          {/* Top Spacer to let the Drone be prominent in center with Scroll Hint */}
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

          {/* Lower Content Block: Monumental AEROSPACE Letters Assembled from Right on Scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[17.5vw] sm:text-[18.5vw] md:text-[19.5vw] lg:text-[20.5vw] xl:text-[21vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-5 md:-mb-7 lg:-mb-9 block overflow-visible"
            >
              {AEROSPACE_LETTERS.map((char, index) => (
                <AerospaceScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  total={AEROSPACE_LETTERS.length}
                  progress={smoothProgress}
                />
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-4 sm:pt-16 pb-24 space-y-12 sm:space-y-16">`;

const normContent2 = content.replace(/\r\n/g, '\n');
const normTarget2 = targetHero.replace(/\r\n/g, '\n');
if (normContent2.includes(normTarget2)) {
  content = normContent2.replace(normTarget2, replacementHero.replace(/\r\n/g, '\n'));
  console.log('Hero replacement 2 matched with normalized newlines!');
} else {
  console.error('Failed to match targetHero');
}

fs.writeFileSync(file, content, 'utf8');
console.log('Done updating aerospace page!');

