const fs = require('fs');

// 1. In Footer.tsx: Reduce top padding and top row padding so Make in India isn't miles away from the previous card
const footerFile = 'd:/defence/src/components/layout/Footer.tsx';
let fContent = fs.readFileSync(footerFile, 'utf8');

fContent = fContent.replace(
  '<footer className="w-full bg-[#03060d] text-slate-300 border-t border-white/10 pt-10 sm:pt-14 pb-2 sm:pb-4">',
  '<footer className="w-full bg-[#03060d] text-slate-300 border-t border-white/10 pt-4 sm:pt-8 pb-2 sm:pb-4">'
);

fContent = fContent.replace(
  'gap-x-4 sm:gap-x-8 gap-y-8 lg:gap-12 py-4 sm:py-6',
  'gap-x-4 sm:gap-x-8 gap-y-8 lg:gap-12 pt-2 sm:pt-3 pb-4 sm:pb-6'
);

fs.writeFileSync(footerFile, fContent, 'utf8');
console.log('Footer.tsx updated with proper top padding!');

// 2. In partnerships/page.tsx: Reduce bottom padding before footer
const partFile = 'd:/defence/src/app/partnerships/page.tsx';
let pContent = fs.readFileSync(partFile, 'utf8');

pContent = pContent.replace(
  '<div className="relative z-10 pt-2 sm:pt-16 pb-20 sm:pb-28 overflow-x-hidden">',
  '<div className="relative z-10 pt-2 sm:pt-16 pb-6 sm:pb-12 overflow-x-hidden">'
);

fs.writeFileSync(partFile, pContent, 'utf8');
console.log('partnerships/page.tsx updated with reduced bottom padding!');

// 3. In AboutContent.tsx: Reduce bottom padding before footer
const aboutFile = 'd:/defence/src/components/about/AboutContent.tsx';
let aContent = fs.readFileSync(aboutFile, 'utf8');

aContent = aContent.replace(
  'relative min-h-screen pb-10 sm:pb-24 bg-[#030712]',
  'relative min-h-screen pb-6 sm:pb-12 bg-[#030712]'
);

fs.writeFileSync(aboutFile, aContent, 'utf8');
console.log('AboutContent.tsx updated with reduced bottom padding!');

