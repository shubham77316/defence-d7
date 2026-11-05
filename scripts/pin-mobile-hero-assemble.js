const fs = require('fs');

function updatePage(filePath, isAffiliations, isAerospace) {
  let c = fs.readFileSync(filePath, 'utf8');

  if (isAffiliations) {
    // 1. Partnerships / Affiliations
    // Replace hooks
    c = c.replace(
      /const mobileProgressRaw = useTransform\(scrollY, \[0, 100\], \[0, 1\], \{ clamp: true \}\);[\s\S]*?const mobileProgress = useSpring\(mobileProgressRaw, \{[\s\S]*?restDelta: 0\.001,[\s\S]*?\}\);/,
      `const mobileTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTrackRef,
    offset: ["start start", "end end"],
  });
  const mobileProgress = useSpring(mobileScrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });`
    );

    // Replace mobile hero block
    c = c.replace(
      /\{/\* ── 1\. MOBILE RESPONSIVE HERO[\s\S]*?\{/\* ── 2\. DESKTOP STICKY HERO SECTION/,
      `{/* ── 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) ── */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[180vh] select-none">
        <div className="sticky top-14 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">
          {/* Tactical Image Box */}
          <div className="relative w-full max-w-[420px] mx-auto">
            <Image
              src="/images/news-strategic-alliances.jpg"
              alt="Strategic Alliances & Affiliations"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
              sizes="(max-width: 640px) 100vw"
            />

            {/* AFFILIATIONS Letters Over The Image */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
              <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
                {AFFILIATIONS_LETTERS.map((char, index) => (
                  <AffiliationScrollLetter
                    key={index}
                    char={char}
                    index={index}
                    progress={mobileProgress}
                  />
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. DESKTOP STICKY HERO SECTION`
    );

  } else if (!isAerospace) {
    // 2. Defence page
    // Replace hooks
    c = c.replace(
      /const mobileProgressRaw = useTransform\(scrollY, \[0, 100\], \[0, 1\], \{ clamp: true \}\);[\s\S]*?const mobileProgress = useSpring\(mobileProgressRaw, \{[\s\S]*?restDelta: 0\.001,[\s\S]*?\}\);/,
      `const mobileTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTrackRef,
    offset: ["start start", "end end"],
  });
  const mobileProgress = useSpring(mobileScrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });`
    );

    // Replace mobile hero block
    c = c.replace(
      /\{\/\* 1\. MOBILE RESPONSIVE HERO[\s\S]*?\{\/\* 2\. DESKTOP CINEMATIC STICKY SCROLL TRACK/,
      `{/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[180vh] select-none">
        <div className="sticky top-14 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">
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
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP CINEMATIC STICKY SCROLL TRACK`
    );

  } else {
    // 3. Aerospace page
    // Replace hooks
    c = c.replace(
      /const mobileProgressRaw = useTransform\(scrollY, \[0, 100\], \[0, 1\], \{ clamp: true \}\);[\s\S]*?const mobileProgress = useSpring\(mobileProgressRaw, \{[\s\S]*?restDelta: 0\.001,[\s\S]*?\}\);/,
      `const mobileTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTrackRef,
    offset: ["start start", "end end"],
  });
  const mobileProgress = useSpring(mobileScrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });`
    );

    // Replace mobile hero block
    c = c.replace(
      /\{\/\* 1\. MOBILE RESPONSIVE HERO[\s\S]*?\{\/\* 2\. DESKTOP CINEMATIC STICKY SCROLL TRACK/,
      `{/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[180vh] select-none">
        <div className="sticky top-14 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">
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

            {/* AEROSPACE Letters Over The Image */}
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
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP CINEMATIC STICKY SCROLL TRACK`
    );
  }

  fs.writeFileSync(filePath, c, 'utf8');
  console.log('Updated:', filePath);
}

updatePage('d:/defence/src/app/defence/page.tsx', false, false);
updatePage('d:/defence/src/app/aerospace/page.tsx', false, true);
updatePage('d:/defence/src/app/partnerships/page.tsx', true, false);

