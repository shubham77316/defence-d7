const fs = require('fs');

// 1. DEFENCE PAGE
{
  const file = 'd:/defence/src/app/defence/page.tsx';
  let c = fs.readFileSync(file, 'utf8');

  // Replace hook
  c = c.replace(
    `  const { scrollY } = useScroll();
  const mobileProgressRaw = useTransform(scrollY, [0, 100], [0, 1], { clamp: true });
  const mobileProgress = useSpring(mobileProgressRaw, {
    stiffness: 150,
    damping: 24,
    restDelta: 0.001,
  });`,
    `  const mobileTrackRef = useRef<HTMLDivElement>(null);
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
  const oldMobile = `      {/* ========================================================================= */}
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

  const newMobile = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) */}
      {/* ========================================================================= */}
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

            {/* DEFENCE Letters Over The Image (Assemble one by one during scroll) */}
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
      </div>`;

  c = c.replace(/\r\n/g, '\n');
  c = c.replace(oldMobile.replace(/\r\n/g, '\n'), newMobile.replace(/\r\n/g, '\n'));
  fs.writeFileSync(file, c, 'utf8');
  console.log('Defence pinned hero updated!');
}

// 2. AEROSPACE PAGE
{
  const file = 'd:/defence/src/app/aerospace/page.tsx';
  let c = fs.readFileSync(file, 'utf8');

  // Replace hook
  c = c.replace(
    `  const { scrollY } = useScroll();
  const mobileProgressRaw = useTransform(scrollY, [0, 100], [0, 1], { clamp: true });
  const mobileProgress = useSpring(mobileProgressRaw, {
    stiffness: 150,
    damping: 24,
    restDelta: 0.001,
  });`,
    `  const mobileTrackRef = useRef<HTMLDivElement>(null);
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
  const oldMobile = `      {/* ========================================================================= */}
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

  const newMobile = `      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) */}
      {/* ========================================================================= */}
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

            {/* AEROSPACE Letters Over The Image (Assemble one by one during scroll) */}
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
      </div>`;

  c = c.replace(/\r\n/g, '\n');
  c = c.replace(oldMobile.replace(/\r\n/g, '\n'), newMobile.replace(/\r\n/g, '\n'));
  fs.writeFileSync(file, c, 'utf8');
  console.log('Aerospace pinned hero updated!');
}

// 3. PARTNERSHIPS / AFFILIATIONS PAGE
{
  const file = 'd:/defence/src/app/partnerships/page.tsx';
  let c = fs.readFileSync(file, 'utf8');

  // Replace hook
  c = c.replace(
    `  const { scrollY } = useScroll();

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  const mobileProgressRaw = useTransform(scrollY, [0, 100], [0, 1], { clamp: true });
  const mobileProgress = useSpring(mobileProgressRaw, {
    stiffness: 150,
    damping: 24,
    restDelta: 0.001,
  });`,
    `  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  const mobileTrackRef = useRef<HTMLDivElement>(null);
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
  const oldMobile = `      {/* ── 1. MOBILE RESPONSIVE HERO (sm:hidden - Same as Aerospace & Defence) ── */}
      <div className="sm:hidden relative w-full pt-14 pb-2 px-2 select-none overflow-x-clip">
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

          {/* AFFILIATIONS Letters Over The Image (Center at bottom where image finishes) */}
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
      </div>`;

  const newMobile = `      {/* ── 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) ── */}
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

            {/* AFFILIATIONS Letters Over The Image (Assemble one by one during scroll) */}
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
      </div>`;

  c = c.replace(/\r\n/g, '\n');
  c = c.replace(oldMobile.replace(/\r\n/g, '\n'), newMobile.replace(/\r\n/g, '\n'));
  fs.writeFileSync(file, c, 'utf8');
  console.log('Affiliations pinned hero updated!');
}

