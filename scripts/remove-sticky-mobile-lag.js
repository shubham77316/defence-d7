const fs = require('fs');

function updatePage(file, isAerospace) {
  let c = fs.readFileSync(file, 'utf8');

  if (!isAerospace) {
    const target = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Hero full view, fonts assemble, then scroll) */}
      {/* ========================================================================= */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[110vh] select-none">
        <div className="sticky top-14 w-full overflow-hidden select-none">
          {/* Tactical Image Box with Grenade-style compact containment */}
          <div className="relative w-full mx-auto">
            <Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
              sizes="(max-width: 640px) 100vw"
            />

            {/* DEFENCE Letters Over The Image (All assemble together on scroll) */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
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

    const replacement = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Normal layout flow, zero sticky lag) */}
      {/* ========================================================================= */}
      <div className="sm:hidden relative w-full pt-14 pb-2 px-2 select-none overflow-x-clip">
        {/* Tactical Image Box */}
        <div className="relative w-full max-w-[420px] mx-auto">
          <Image
            src="/images/defence-tactical-soldier-hero.jpg"
            alt="Tactical Defence Systems and Personnel"
            width={900}
            height={600}
            priority
            className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
            sizes="(max-width: 640px) 100vw"
          />

          {/* DEFENCE Letters Over The Image */}
          <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
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
      </div>`;

    // Also update mobileProgress to use window scrollY so letters assemble on scroll smoothly
    const scrollHookTarget = `  const mobileTrackRef = useRef<HTMLDivElement>(null);
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

    const scrollHookReplacement = `  const { scrollY } = useScroll();
  const mobileProgressRaw = useTransform(scrollY, [0, 100], [0, 1], { clamp: true });
  const mobileProgress = useSpring(mobileProgressRaw, {
    stiffness: 150,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });`;

    c = c.replace(/\r\n/g, '\n');
    const normTarget = target.replace(/\r\n/g, '\n');
    const normHookTarget = scrollHookTarget.replace(/\r\n/g, '\n');

    if (c.includes(normTarget)) {
      c = c.replace(normTarget, replacement.replace(/\r\n/g, '\n'));
      console.log('Hero block replaced successfully in defence!');
    } else {
      console.log('Hero block target not found in defence!');
    }

    if (c.includes(normHookTarget)) {
      c = c.replace(normHookTarget, scrollHookReplacement.replace(/\r\n/g, '\n'));
      console.log('Scroll hooks updated in defence!');
    } else {
      console.log('Scroll hooks target not found in defence!');
    }
  }

  fs.writeFileSync(file, c, 'utf8');
}

updatePage('d:/defence/src/app/defence/page.tsx', false);

