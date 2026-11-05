const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the split hero with the unified scroll-reveal hero that works on both mobile & desktop
const startMarker = '{/* ========================================================================= */}\r\n      {/* MOBILE RESPONSIVE HERO (Clean flow matching Image 2 with zero empty gaps) */}';
const endMarker = '{/* Main Content Area */}';

let si = content.indexOf(startMarker);
let isCRLF = true;
if (si === -1) {
  // Try LF
  const startMarkerLF = '{/* ========================================================================= */}\n      {/* MOBILE RESPONSIVE HERO (Clean flow matching Image 2 with zero empty gaps) */}';
  si = content.indexOf(startMarkerLF);
  isCRLF = false;
}

if (si === -1) {
  console.log('Start marker not found!');
  process.exit(1);
}

const ei = content.indexOf(endMarker, si);
if (ei === -1) {
  console.log('End marker not found!');
  process.exit(1);
}

const newHero = `{/* ========================================================================= */}
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
      </div>

      `;

const formattedReplacement = isCRLF ? newHero.replace(/\n/g, '\r\n') : newHero;
content = content.substring(0, si) + formattedReplacement + content.substring(ei);
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated to scroll-reveal animation on both responsive and desktop!');

