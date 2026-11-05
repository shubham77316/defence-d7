const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetOld = `      {/* ========================================================================= */}
      {/* CINEMATIC STICKY SCROLL HERO TRACK (Letter-By-Letter Scroll Reveal)       */}
      {/* ========================================================================= */}
      <div ref={heroTrackRef} className="relative w-full h-[200vh] sm:h-[240vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-16 sm:pt-28 overflow-hidden select-none">
          
          {/* Tactical Operator & Base Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
              fill
              priority
              className="object-cover object-[center_35%] sm:object-center brightness-95 contrast-105"
              sizes="100vw"
            />
            {/* Subtle Top Gradient for Navbar legibility & Dark Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 via-transparent to-[#030712]/50 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/85 to-transparent pointer-events-none" />
          </div>

          {/* Top Spacer to let Tactical Operator be prominent in center with Scroll Hint */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-end pb-6 sm:pb-8">
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="pointer-events-none flex flex-col items-center gap-2 select-none"
            >
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.3em] uppercase text-sky-300/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
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
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-2 sm:px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-1 sm:pb-2 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[20vw] sm:text-[20vw] md:text-[21vw] lg:text-[22vw] xl:text-[23vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.8] sm:leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-3 sm:-mb-5 md:-mb-7 lg:-mb-9 block overflow-visible"
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
      <div ref={heroTrackRef} className="relative w-full h-[200vh] sm:h-[240vh] select-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
          
          {/* 1. MOBILE RESPONSIVE HERO (sm:hidden) - Full Image like Image 2 with DEFENCE letters OVER the image */}
          <div className="sm:hidden w-full h-full flex flex-col justify-center items-center pt-14 pb-4 px-3 overflow-hidden select-none">
            {/* Image Card Frame preserving full 16:10 aspect ratio */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-sky-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.95)] bg-[#030712]">
              <Image
                src="/images/defence-tactical-soldier-hero.jpg"
                alt="Tactical Defence Systems and Personnel"
                fill
                priority
                className="object-cover object-center brightness-95 contrast-105"
                sizes="100vw"
              />
              {/* Subtle top & bottom vignettes */}
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#030712]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent pointer-events-none" />

              {/* DEFENCE Letters OVER The Bottom of the Image (Exact Website Style) */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end text-center pb-0.5 overflow-visible pointer-events-none">
                <h1 className="font-anton font-black uppercase text-[17vw] tracking-[-0.01em] leading-[0.8] text-center drop-shadow-[0_12px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
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

const normalizedTarget = targetOld.replace(/\r\n/g, '\n');
const normalizedContent = content.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const isCRLF = content.includes('\r\n');
  const finalReplacement = isCRLF ? replacement.replace(/\n/g, '\r\n') : replacement;
  const finalTarget = isCRLF ? targetOld.replace(/\n/g, '\r\n') : targetOld;
  content = content.replace(finalTarget, finalReplacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated defence hero with perfect mobile & desktop layouts!');
} else {
  console.log('Target hero not found in content!');
}

