const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'src', 'app', 'partnerships', 'page.tsx'),
  path.join(__dirname, '..', 'frontend-only', 'src', 'app', 'partnerships', 'page.tsx'),
  path.join(__dirname, '..', 'only front-end', 'frontend-only', 'src', 'app', 'partnerships', 'page.tsx'),
];

// Read current file
const src = fs.readFileSync(files[0], 'utf8');

// ---- 1. Fix AffiliationScrollLetter: exact copy of AerospaceScrollLetter stagger ----
// 12 letters: start = 0.04 + index * 0.065  end = min(start+0.16, 0.94)
const oldLetter = `  const start = 0.01 + index * 0.06;
  const end = Math.min(start + 0.14, 0.96);

  const x = useTransform(progress, [start, end], ["65vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.75, 1], { clamp: true });`;

const newLetter = `  const start = 0.04 + index * 0.065;
  const end = Math.min(start + 0.16, 0.94);

  const x = useTransform(progress, [start, end], ["65vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.75, 1], { clamp: true });`;

// ---- 2. Fix outer wrapper: overflow-x-clip like aerospace ----
const oldOuter = `    <div className="relative min-h-screen bg-[#010309] text-white">`;
const newOuter = `    <div className="relative min-h-screen bg-[#010309] overflow-x-clip text-white">`;

// ---- 3. Fix heroRef div: h-[240vh] no overflow, like aerospace ----
const oldHero = `      <div ref={heroRef} className="relative h-[170vh] w-full overflow-x-hidden">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between">`;
const newHero = `      <div ref={heroRef} className="relative w-full h-[240vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">`;

// ---- 4. Fix scroll hint: exact aerospace style ----
const oldHint = `          {/* Scroll hint */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-10">
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
              />
            </motion.div>
          </div>`;

const newHint = `          {/* Top Spacer / Scroll Hint */}
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
          </div>`;

// ---- 5. Fix letters container + h1: exact aerospace style ----
const oldLetters = `          {/* AFFILIATIONS letters — right side, bottom, animate bottom→top */}
          <div className="relative z-10 w-full px-10 flex justify-end pb-0">
            <h1 className="font-anton font-black uppercase text-[10.5vw] leading-none tracking-tight text-right whitespace-nowrap select-none">`;

const newLetters = `          {/* Monumental AFFILIATIONS Letters — assembled from right on scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-0 sm:pb-2 overflow-visible">
            <h1 className="font-anton font-black uppercase text-[14.5vw] sm:text-[15.5vw] md:text-[16.5vw] lg:text-[17.5vw] xl:text-[18vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-3 sm:-mb-5 md:-mb-7 lg:-mb-9 block overflow-visible">`;

// ---- 6. Fix spring: use aerospace spring settings ----
const oldSpring = `  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });`;

const newSpring = `  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });`;

// ---- 7. Fix scrollHintOpacity range ----
const oldHintOpacity = `  const scrollHintOpacity = useTransform(scrollYProgressSpring, [0, 0.08], [1, 0]);`;
const newHintOpacity = `  const scrollHintOpacity = useTransform(scrollYProgressSpring, [0, 0.06], [1, 0], { clamp: true });`;

// Apply all replacements
let out = src;

function replace(label, from, to) {
  if (!out.includes(from)) {
    console.error(`MISS [${label}]: target not found`);
    return;
  }
  out = out.split(from).join(to);
  console.log(`OK   [${label}]`);
}

replace('letter stagger', oldLetter, newLetter);
replace('outer wrapper', oldOuter, newOuter);
replace('heroRef div', oldHero, newHero);
replace('scroll hint', oldHint, newHint);
replace('letters h1', oldLetters, newLetters);
replace('spring settings', oldSpring, newSpring);
replace('hint opacity', oldHintOpacity, newHintOpacity);

// Write to all files
let ok = 0;
for (const f of files) {
  try {
    if (!fs.existsSync(f)) { console.log(`SKIP: ${f}`); continue; }
    fs.writeFileSync(f, out, 'utf8');
    console.log(`WRITTEN: ${f}`);
    ok++;
  } catch (e) {
    console.error(`FAIL: ${f}`, e.message);
  }
}
console.log(`\nDone: ${ok} files written.`);

