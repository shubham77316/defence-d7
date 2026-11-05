const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Update AffiliationScrollLetter function to match DefenceScrollLetter staggered timing
const targetLetter = `function AffiliationScrollLetter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.01 + index * 0.06;
  const end = Math.min(start + 0.14, 0.96);

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

const replacementLetter = `function AffiliationScrollLetter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  // One by one staggered scroll reveal matching Defence & Aerospace
  const start = 0.04 + index * 0.065;
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

// 2. In desktop hero, change right-aligned text to centered monumental block just like defence
const targetDesktopLetters = `          {/* AFFILIATIONS letters — right side, bottom, animate bottom→top */}
          <div className="relative z-10 w-full px-10 flex justify-end pb-0">
            <h1 className="font-anton font-black uppercase text-[10.5vw] leading-none tracking-tight text-right whitespace-nowrap select-none">
              {AFFILIATIONS_LETTERS.map((char, i) => (
                <AffiliationScrollLetter
                  key={i}
                  char={char}
                  index={i}
                  progress={scrollYProgressSpring}
                />
              ))}
            </h1>
          </div>`;

const replacementDesktopLetters = `          {/* Lower Content Block: Monumental AFFILIATIONS Letters Assembled in Center from Right on Scroll */}
          <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 overflow-visible">
            <h1 className="font-anton font-black uppercase text-[15vw] md:text-[16vw] lg:text-[16.5vw] xl:text-[17vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-4 md:-mb-6 block overflow-visible">
              {AFFILIATIONS_LETTERS.map((char, i) => (
                <AffiliationScrollLetter
                  key={i}
                  char={char}
                  index={i}
                  progress={scrollYProgressSpring}
                />
              ))}
            </h1>
          </div>`;

c = c.replace(/\r\n/g, '\n');
const normLetter = targetLetter.replace(/\r\n/g, '\n');
const normDesktop = targetDesktopLetters.replace(/\r\n/g, '\n');

if (c.includes(normLetter)) {
  c = c.replace(normLetter, replacementLetter.replace(/\r\n/g, '\n'));
  console.log('AffiliationScrollLetter updated!');
} else {
  console.log('AffiliationScrollLetter target NOT found!');
}

if (c.includes(normDesktop)) {
  c = c.replace(normDesktop, replacementDesktopLetters.replace(/\r\n/g, '\n'));
  console.log('Desktop centered letters updated!');
} else {
  console.log('Desktop letters target NOT found!');
}

fs.writeFileSync(file, c, 'utf8');
console.log('Done updating partnerships page font to match defence!');

