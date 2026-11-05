const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Add scrollY hook in PartnershipsPage
const targetHook = `  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  const scrollHintOpacity = useTransform(scrollYProgressSpring, [0, 0.08], [1, 0]);`;

const replacementHook = `  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const { scrollY } = useScroll();

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
  });

  const scrollHintOpacity = useTransform(scrollYProgressSpring, [0, 0.08], [1, 0]);`;

// 2. Add Mobile Hero (sm:hidden) before Desktop Hero (hidden sm:block)
const targetHero = `      {/* ── STICKY HERO SECTION ── */}
      <div ref={heroRef} className="relative h-[170vh] w-full overflow-x-hidden">`;

const replacementHero = `      {/* ── 1. MOBILE RESPONSIVE HERO (sm:hidden - Same as Aerospace & Defence) ── */}
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
      </div>

      {/* ── 2. DESKTOP STICKY HERO SECTION (hidden sm:block) ── */}
      <div ref={heroRef} className="hidden sm:block relative h-[170vh] w-full overflow-x-hidden">`;

c = c.replace(/\r\n/g, '\n');
const normHook = targetHook.replace(/\r\n/g, '\n');
const normHero = targetHero.replace(/\r\n/g, '\n');

if (c.includes(normHook)) {
  c = c.replace(normHook, replacementHook.replace(/\r\n/g, '\n'));
  console.log('Hooks replaced!');
} else {
  console.log('Hooks NOT found!');
}

if (c.includes(normHero)) {
  c = c.replace(normHero, replacementHero.replace(/\r\n/g, '\n'));
  console.log('Hero replaced!');
} else {
  console.log('Hero NOT found!');
}

fs.writeFileSync(file, c, 'utf8');
console.log('Done modifying partnerships page!');

