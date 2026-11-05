const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update smoothProgress / mobileProgress
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

// 2. Replace the entire hero block
const targetHero = `      {/* ========================================================================= */}
      {/* CINEMATIC STICKY SCROLL HERO TRACK (Letter-By-Letter Scroll Reveal)       */}
      {/* ========================================================================= */}
      <div ref={heroTrackRef} className="relative w-full h-[180vh] sm:h-[240vh] select-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
          
          {/* 1. MOBILE RESPONSIVE HERO (sm:hidden) */}
          <div className="sm:hidden w-full h-full flex flex-col justify-start pt-16 px-2 overflow-hidden select-none">
            {/* Image Stage preserving exact grenade size: h-[185px] xs:h-[210px] max-w-[420px] */}
            <div className="relative h-[185px] xs:h-[210px] w-full max-w-[420px] mx-auto flex items-center justify-center">
              <Image
                src="/images/defence-tactical-soldier-hero.jpg"
                alt="Tactical Defence Systems and Personnel"
                fill
                priority
                className="object-contain filter contrast-[1.08] brightness-[1.05]"
                sizes="(max-width: 640px) 100vw, 420px"
              />

              {/* DEFENCE Letters Over The Image (Higher up over soldier's legs like reference) */}
              <div className="absolute bottom-1 xs:bottom-2 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
                <h1 className="font-anton font-black uppercase text-[18vw] xs:text-[19vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
                  {DEFENCE_LETTERS.map((char, index) => (
                    <DefenceScrollLetter
                      key={index}
                      char={char}
                      index={index}
                      total={DEFENCE_LETTERS.length}
                      progress={smoothProgress}
                    />
                  ))}
                </h1>
              </div>
            </div>

            {/* Scroll Hint directly below */}
            <div className="w-full flex flex-col items-center pt-3 pb-1">
              <motion.div
                style={{ opacity: scrollHintOpacity }}
                className="pointer-events-none flex flex-col items-center gap-1.5 select-none"
              >
                <span className="text-[10px] font-mono font-medium tracking-[0.25em] uppercase text-sky-300/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  Scroll to Reveal
                </span>
                <div className="w-4 h-7 rounded-full border border-sky-400/40 flex items-start justify-center p-1 bg-black/30 backdrop-blur-sm">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-sky-300"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* 2. DESKTOP CINEMATIC HERO (hidden sm:flex) */}
          <div className="hidden sm:flex w-full h-full flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">
            {/* Tactical Operator & Base Background Image */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <Image
                src="/images/defence-tactical-soldier-hero.jpg"
                alt="Tactical Defence Systems and Personnel"
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

            {/* Top Spacer to let Tactical Operator be prominent in center with Scroll Hint */}
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

            {/* Lower Content Block: Monumental DEFENCE Letters Assembled from Right on Scroll */}
            <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 overflow-visible">
              <h1
                className="font-anton font-black uppercase text-[20vw] md:text-[21vw] lg:text-[22vw] xl:text-[23vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-5 md:-mb-7 lg:-mb-9 block overflow-visible"
              >
                {DEFENCE_LETTERS.map((char, index) => (
                  <DefenceScrollLetter
                    key={index}
                    char={char}
                    index={index}
                    total={DEFENCE_LETTERS.length}
                    progress={smoothProgress}
                  />
                ))}
              </h1>
            </div>
          </div>

        </div>
      </div>`;

const replacementHero = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Zero void, proper tight margin)     */}
      {/* ========================================================================= */}
      <div className="sm:hidden relative w-full pt-14 pb-1 px-2 select-none overflow-x-clip">
        {/* Image Stage preserving exact grenade size: h-[185px] xs:h-[210px] max-w-[420px] */}
        <div className="relative h-[185px] xs:h-[210px] w-full max-w-[420px] mx-auto flex items-center justify-center">
          <Image
            src="/images/defence-tactical-soldier-hero.jpg"
            alt="Tactical Defence Systems and Personnel"
            fill
            priority
            className="object-contain filter contrast-[1.08] brightness-[1.05]"
            sizes="(max-width: 640px) 100vw, 420px"
          />

          {/* DEFENCE Letters Over The Image */}
          <div className="absolute bottom-1 xs:bottom-2 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
            <h1 className="font-anton font-black uppercase text-[18vw] xs:text-[19vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
              {DEFENCE_LETTERS.map((char, index) => (
                <DefenceScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  total={DEFENCE_LETTERS.length}
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
          
          {/* Tactical Operator & Base Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
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

          {/* Top Spacer to let Tactical Operator be prominent in center with Scroll Hint */}
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

          {/* Lower Content Block: Monumental DEFENCE Letters Assembled from Right on Scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[20vw] md:text-[21vw] lg:text-[22vw] xl:text-[23vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-5 md:-mb-7 lg:-mb-9 block overflow-visible"
            >
              {DEFENCE_LETTERS.map((char, index) => (
                <DefenceScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  total={DEFENCE_LETTERS.length}
                  progress={smoothProgress}
                />
              ))}
            </h1>
          </div>
        </div>
      </div>`;

// Apply replacement 1
const normalizedTargetScroll = targetScroll.replace(/\r\n/g, '\n');
const normalizedReplacementScroll = replacementScroll.replace(/\r\n/g, '\n');
const isCRLF = content.includes('\r\n');

let normalizedContent = content.replace(/\r\n/g, '\n');
if (normalizedContent.includes(normalizedTargetScroll)) {
  normalizedContent = normalizedContent.replace(normalizedTargetScroll, normalizedReplacementScroll);
  console.log('Scroll replacement 1 matched!');
} else {
  console.log('Scroll target not matched!');
}

const normalizedTargetHero = targetHero.replace(/\r\n/g, '\n');
const normalizedReplacementHero = replacementHero.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTargetHero)) {
  normalizedContent = normalizedContent.replace(normalizedTargetHero, normalizedReplacementHero);
  console.log('Hero replacement 2 matched!');
} else {
  console.log('Hero target not matched!');
}

content = isCRLF ? normalizedContent.replace(/\n/g, '\r\n') : normalizedContent;
fs.writeFileSync(file, content, 'utf8');
console.log('Done updating defence page!');

