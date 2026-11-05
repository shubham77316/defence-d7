const fs = require('fs');

const file = 'd:/defence/src/app/aerospace/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Replace scroll hooks in Aerospace to match defence
const targetHooks = `  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTrackRef,
    offset: ["start start", "end end"],
  });
  const mobileProgress = useSpring(mobileScrollYProgress, {
    stiffness: 150,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });
  const mobileHintOpacity = useTransform(mobileProgress, [0, 0.08], [1, 0], { clamp: true });`;

const replacementHooks = `  const { scrollY } = useScroll();
  const mobileProgressRaw = useTransform(scrollY, [0, 100], [0, 1], { clamp: true });
  const mobileProgress = useSpring(mobileProgressRaw, {
    stiffness: 150,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });`;

// 2. Replace mobile hero block in Aerospace
const targetHero = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Hero full view, fonts assemble, then scroll) */}
      {/* ========================================================================= */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[135vh] select-none">
        <div className="sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-start items-center pt-3 overflow-hidden select-none">
          {/* Tactical Image Box with Grenade-style compact containment */}
          <div className="relative h-[calc(100dvh-11rem)] xs:h-[calc(100dvh-10rem)] w-full max-w-[420px] mx-auto flex items-start justify-center">
            <Image
              src="/images/aerospace-drone-city-hero.jpg"
              alt="Aerospace Tactical UAV Platform"
              fill
              priority
              className="object-contain object-top filter contrast-[1.08] brightness-[1.05]"
              sizes="(max-width: 640px) 100vw, 420px"
            />

            {/* AEROSPACE Letters Over The Image (All assemble together on scroll) */}
            <div className="absolute bottom-5 xs:bottom-7 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
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

          {/* Scroll to Reveal Hint */}
          <motion.div
            style={{ opacity: mobileHintOpacity }}
            className="mt-6 pointer-events-none flex flex-col items-center gap-2 select-none"
          >
            <span className="text-[10px] font-mono font-medium tracking-[0.3em] uppercase text-sky-300/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
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
      </div>`;

const replacementHero = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Normal layout flow, zero sticky lag) */}
      {/* ========================================================================= */}
      <div className="sm:hidden relative w-full pt-14 pb-2 px-2 select-none overflow-x-clip">
        {/* Tactical Image Box */}
        <div className="relative w-full max-w-[420px] mx-auto">
          <Image
            src="/images/aerospace-drone-city-hero.jpg"
            alt="Aerospace Tactical UAV Platform"
            width={900}
            height={600}
            priority
            className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
            sizes="(max-width: 640px) 100vw"
          />

          {/* AEROSPACE Letters Over The Image (Center at bottom where image finishes) */}
          <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
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
      </div>`;

c = c.replace(/\r\n/g, '\n');
const normHooks = targetHooks.replace(/\r\n/g, '\n');
const normHero = targetHero.replace(/\r\n/g, '\n');

if (c.includes(normHooks)) {
  c = c.replace(normHooks, replacementHooks.replace(/\r\n/g, '\n'));
  console.log('Aerospace hooks replaced!');
} else {
  console.log('Aerospace hooks NOT matched!');
}

if (c.includes(normHero)) {
  c = c.replace(normHero, replacementHero.replace(/\r\n/g, '\n'));
  console.log('Aerospace hero replaced!');
} else {
  console.log('Aerospace hero NOT matched!');
}

// Ensure main content padding is pt-3 sm:pt-16
c = c.replace('pt-12 sm:pt-16 pb-24', 'pt-3 sm:pt-16 pb-24');

fs.writeFileSync(file, c, 'utf8');
console.log('Aerospace page updated successfully!');

