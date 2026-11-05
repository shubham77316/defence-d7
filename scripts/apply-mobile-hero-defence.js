const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetOldHero = `      {/* ========================================================================= */}
      {/* CINEMATIC STICKY SCROLL HERO TRACK (Letter-By-Letter Right Slide Reveal)  */}
      {/* ========================================================================= */}
      <div ref={heroTrackRef} className="relative w-full h-[240vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">
          
          {/* Tactical Operator & Base Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center bg-[#030712]">
            <Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
              fill
              priority
              className="object-contain sm:object-cover object-center brightness-95 contrast-105"
              sizes="100vw"
            />
            {/* Subtle Top Gradient for Navbar legibility & Dark Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712] pointer-events-none" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#030712]/60 via-transparent to-[#030712]/60 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
          </div>

          {/* Top Spacer to let Tactical Operator be prominent in center with Scroll Hint */}
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

          {/* Lower Content Block: Monumental DEFENCE Letters Assembled from Right on Scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-0 sm:pb-2 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[19vw] sm:text-[20vw] md:text-[21vw] lg:text-[22vw] xl:text-[23vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-3 sm:-mb-5 md:-mb-7 lg:-mb-9 block overflow-visible"
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

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-12 sm:pt-16 pb-24 space-y-12 sm:space-y-16">`;

const replacementNewHero = `      {/* ========================================================================= */}
      {/* MOBILE RESPONSIVE HERO (Clean flow matching Image 2 with zero empty gaps) */}
      {/* ========================================================================= */}
      <div className="sm:hidden relative w-full pt-16 pb-3 flex flex-col items-center bg-[#030712] select-none">
        {/* Full Image with tight padding matching Image 2 */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src="/images/defence-tactical-soldier-hero.jpg"
            alt="Tactical Defence Systems and Personnel"
            fill
            priority
            className="object-cover object-center brightness-100 contrast-105"
            sizes="100vw"
          />
          {/* Edge vignettes */}
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#030712]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
        </div>

        {/* Title Directly Below Image (Exact Image 2 spacing) */}
        <div className="w-full px-4 pt-3 pb-1 flex flex-col items-center text-center">
          <h1 className="font-anton font-black uppercase text-[14vw] tracking-tight leading-none bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            DEFENCE
          </h1>
          <p className="text-[11px] font-mono text-sky-300/80 tracking-[0.2em] uppercase mt-2">
            Tactical Systems &amp; Protective Gear
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CINEMATIC STICKY SCROLL HERO TRACK - DESKTOP (Letter-By-Letter Right Slide) */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/60 via-transparent to-[#030712]/60 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
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

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-4 sm:pt-16 pb-24 space-y-12 sm:space-y-16">`;

const normalizedTarget = targetOldHero.replace(/\r\n/g, '\n');
const normalizedContent = content.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const isCRLF = content.includes('\r\n');
  const finalReplacement = isCRLF ? replacementNewHero.replace(/\n/g, '\r\n') : replacementNewHero;
  const finalTarget = isCRLF ? targetOldHero.replace(/\n/g, '\r\n') : targetOldHero;
  content = content.replace(finalTarget, finalReplacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated defence hero to mobile-optimized flow!');
} else {
  console.log('Target hero not found in content!');
}

