const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. In AffiliationScrollLetter, add pb-2 so bg-clip-text never clips letter bottoms
const oldLetter = `    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"
    >
      {char}
    </motion.span>`;

const newLetter = `    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform pb-2"
    >
      {char}
    </motion.span>`;

c = c.replace(oldLetter, newLetter);

// 2. In Mobile Responsive Hero, remove translate-y-[10%] so letters are not pushed off-bottom and cut
const oldMobileHeading = `<div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
              <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">`;

const newMobileHeading = `<div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[2%] pb-1">
              <h1 className="font-anton font-black uppercase text-[14.5vw] xs:text-[15.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible pb-1">`;

c = c.replace(oldMobileHeading, newMobileHeading);

// 3. In Desktop Cinematic Hero:
// Replace negative margin (-mb-5 md:-mb-7 lg:-mb-9) and tight line height (leading-[0.78]) with proper line-height and padding so letters are 100% visible from top to bottom
const oldDesktopHeading = `<div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[15vw] md:text-[16vw] lg:text-[16.5vw] xl:text-[17vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.78] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-5 md:-mb-7 lg:-mb-9 block overflow-visible"
            >`;

const newDesktopHeading = `<div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-6 md:pb-8 lg:pb-10 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[14.5vw] md:text-[15.5vw] lg:text-[16vw] xl:text-[16.5vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.88] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none mb-0 pb-3 md:pb-4 block overflow-visible"
            >`;

c = c.replace(oldDesktopHeading, newDesktopHeading);

fs.writeFileSync(file, c, 'utf8');
console.log('Fixed affiliations font bottom cutoff on both desktop and mobile!');

