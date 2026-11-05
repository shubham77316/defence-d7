const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Mobile Hero: Set translate-y-[8%] like Defence
c = c.replace(
  'translate-y-[2%] pb-1',
  'translate-y-[8%]'
);

// 2. Desktop Hero: Bring font slightly down, matching Defence aesthetic
const oldDesktopBlock = `<div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-6 md:pb-8 lg:pb-10 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[14.5vw] md:text-[15.5vw] lg:text-[16vw] xl:text-[16.5vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.88] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none mb-0 pb-3 md:pb-4 block overflow-visible"
            >`;

const newDesktopBlock = `<div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col items-center justify-end text-center pb-2 sm:pb-3 overflow-visible">
            <h1
              className="font-anton font-black uppercase text-[15vw] md:text-[16vw] lg:text-[16.5vw] xl:text-[17vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.80] text-center drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none pointer-events-none -mb-3 sm:-mb-4 md:-mb-5 lg:-mb-6 block overflow-visible"
            >`;

c = c.replace(oldDesktopBlock, newDesktopBlock);

fs.writeFileSync(file, c, 'utf8');
console.log('Positioned Affiliations font slightly down, matching Defence!');

