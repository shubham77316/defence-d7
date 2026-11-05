const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetOld = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Exact Second Image/Grenade style)   */}
      {/* ========================================================================= */}
      <div className="w-full sm:hidden pt-14 pb-2 flex items-center justify-center relative z-10 select-none">
        <div className="relative h-[185px] xs:h-[210px] w-full max-w-[420px] px-2 flex items-center justify-center">
          <Image
            src="/images/defence-tactical-soldier-hero.jpg"
            alt="Tactical Defence Systems and Personnel"
            fill
            priority
            className="object-contain filter contrast-[1.08] brightness-[1.05]"
            sizes="(max-width: 640px) 100vw, 420px"
          />
        </div>
      </div>

      {/* Mobile Title & Tagline Directly Below Visual (Exact Image 2 flow) */}
      <div className="w-full sm:hidden px-4 pt-1 pb-3 flex flex-col items-center text-center z-10">
        <h1 className="font-anton font-black uppercase text-4xl xs:text-5xl tracking-tight leading-none bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          DEFENCE
        </h1>
        <p className="text-[11px] font-mono text-sky-300/80 tracking-[0.2em] uppercase mt-1.5">
          Tactical Systems &amp; Protective Gear
        </p>
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

const replacement = `      {/* ========================================================================= */}
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

              {/* DEFENCE Letters Centered Exactly Where The Image Ends */}
              <div className="absolute -bottom-5 xs:-bottom-6 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
                <h1 className="font-anton font-black uppercase text-[17.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
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

            {/* Scroll Hint directly below font */}
            <div className="w-full flex flex-col items-center pt-8 pb-2">
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

const normalizedTarget = targetOld.replace(/\r\n/g, '\n');
const normalizedContent = content.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const isCRLF = content.includes('\r\n');
  const finalReplacement = isCRLF ? replacement.replace(/\n/g, '\r\n') : replacement;
  const finalTarget = isCRLF ? targetOld.replace(/\n/g, '\r\n') : targetOld;
  content = content.replace(finalTarget, finalReplacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully positioned DEFENCE font centered at image bottom with scroll-reveal!');
} else {
  console.log('Target block not found!');
}

