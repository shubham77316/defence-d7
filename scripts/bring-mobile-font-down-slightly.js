const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// In Mobile Responsive Hero (sm:hidden ONLY), bring font slightly down with translate-y-[5%]
const oldMobileContainer = `<div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
              <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">`;

const newMobileContainer = `<div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[5%]">
              <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">`;

c = c.replace(oldMobileContainer, newMobileContainer);
fs.writeFileSync(file, c, 'utf8');
console.log('Mobile font brought slightly down (translate-y-[5%]) with zero changes to desktop!');

