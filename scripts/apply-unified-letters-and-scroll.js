const fs = require('fs');

// ============================================================================
// 1. UPDATE DEFENCE PAGE
// ============================================================================
{
  const file = 'd:/defence/src/app/defence/page.tsx';
  let content = fs.readFileSync(file, 'utf8');

  // Replace DefenceScrollLetter to bring all letters together:
  const targetLetter = `function DefenceScrollLetter({
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
  const start = 0.04 + index * 0.11;
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

  const replacementLetter = `function DefenceScrollLetter({
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
  // All letters assemble together simultaneously ("ak sath sab font aajaye")
  const start = 0.02;
  const end = 0.22;

  const x = useTransform(progress, [start, end], ["50vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.8, 1], { clamp: true });

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"
    >
      {char}
    </motion.span>
  );
}`;

  // Replace scroll hooks in Defence
  const targetHooks = `  const heroTrackRef = useRef<HTMLDivElement>(null);
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

  const replacementHooks = `  const heroTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const mobileTrackRef = useRef<HTMLDivElement>(null);
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

  // Replace mobile hero in Defence
  const targetMobileHero = `      {/* ========================================================================= */}
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
      </div>`;

  const replacementMobileHero = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Hero full view, fonts assemble, then scroll) */}
      {/* ========================================================================= */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[135vh] select-none">
        <div className="sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-center items-center px-4 overflow-hidden select-none">
          {/* Tactical Image Box with Grenade-style compact containment */}
          <div className="relative h-[200px] xs:h-[225px] w-full max-w-[420px] mx-auto flex items-center justify-center">
            <Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
              fill
              priority
              className="object-contain filter contrast-[1.08] brightness-[1.05]"
              sizes="(max-width: 640px) 100vw, 420px"
            />

            {/* DEFENCE Letters Over The Image (All assemble together on scroll) */}
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

  let norm = content.replace(/\r\n/g, '\n');
  norm = norm.replace(targetLetter.replace(/\r\n/g, '\n'), replacementLetter.replace(/\r\n/g, '\n'));
  norm = norm.replace(targetHooks.replace(/\r\n/g, '\n'), replacementHooks.replace(/\r\n/g, '\n'));
  norm = norm.replace(targetMobileHero.replace(/\r\n/g, '\n'), replacementMobileHero.replace(/\r\n/g, '\n'));

  // Also make desktop track h-[180vh] for snappy reveal
  norm = norm.replace('h-[240vh] select-none', 'h-[180vh] select-none');

  fs.writeFileSync(file, norm, 'utf8');
  console.log('Defence page updated successfully!');
}

// ============================================================================
// 2. UPDATE AEROSPACE PAGE
// ============================================================================
{
  const file = 'd:/defence/src/app/aerospace/page.tsx';
  let content = fs.readFileSync(file, 'utf8');

  // Replace AerospaceScrollLetter to bring all letters together:
  const targetLetter = `function AerospaceScrollLetter({
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
  const start = 0.04 + index * 0.085;
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

  const replacementLetter = `function AerospaceScrollLetter({
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
  // All letters assemble together simultaneously ("ak sath sab font aajaye")
  const start = 0.02;
  const end = 0.22;

  const x = useTransform(progress, [start, end], ["50vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.8, 1], { clamp: true });

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"
    >
      {char}
    </motion.span>
  );
}`;

  // Replace scroll hooks in Aerospace
  const targetHooks = `  const heroTrackRef = useRef<HTMLDivElement>(null);
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

  const replacementHooks = `  const heroTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const mobileTrackRef = useRef<HTMLDivElement>(null);
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

  // Replace mobile hero in Aerospace
  const targetMobileHero = `      {/* ========================================================================= */}
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
      </div>`;

  const replacementMobileHero = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Hero full view, fonts assemble, then scroll) */}
      {/* ========================================================================= */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[135vh] select-none">
        <div className="sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-center items-center px-4 overflow-hidden select-none">
          {/* Tactical Image Box with Grenade-style compact containment */}
          <div className="relative h-[200px] xs:h-[225px] w-full max-w-[420px] mx-auto flex items-center justify-center">
            <Image
              src="/images/aerospace-drone-city-hero.jpg"
              alt="Aerospace Tactical UAV Platform"
              fill
              priority
              className="object-contain filter contrast-[1.08] brightness-[1.05]"
              sizes="(max-width: 640px) 100vw, 420px"
            />

            {/* AEROSPACE Letters Over The Image (All assemble together on scroll) */}
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

  let norm = content.replace(/\r\n/g, '\n');
  norm = norm.replace(targetLetter.replace(/\r\n/g, '\n'), replacementLetter.replace(/\r\n/g, '\n'));
  norm = norm.replace(targetHooks.replace(/\r\n/g, '\n'), replacementHooks.replace(/\r\n/g, '\n'));
  norm = norm.replace(targetMobileHero.replace(/\r\n/g, '\n'), replacementMobileHero.replace(/\r\n/g, '\n'));

  // Also make desktop track h-[180vh] for snappy reveal
  norm = norm.replace('h-[240vh] select-none', 'h-[180vh] select-none');

  fs.writeFileSync(file, norm, 'utf8');
  console.log('Aerospace page updated successfully!');
}

