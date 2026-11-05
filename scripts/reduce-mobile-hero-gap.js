const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Reduce outer top padding on mobile (like Defence pt-3 sm:pt-16)
c = c.replace(
  '<div className="relative z-10 pt-16 pb-28 overflow-x-hidden">',
  '<div className="relative z-10 pt-2 sm:pt-16 pb-20 sm:pb-28 overflow-x-hidden">'
);

// 2. Reduce space-y on mobile
c = c.replace(
  'max-w-[1660px] mx-auto px-2.5 sm:px-5 space-y-16',
  'max-w-[1660px] mx-auto px-2.5 sm:px-5 space-y-8 sm:space-y-16'
);

// 3. Reduce heading section top padding on mobile
c = c.replace(
  '<div ref={headingRevealRef} className="space-y-4 text-center flex flex-col items-center justify-center py-6">',
  '<div ref={headingRevealRef} className="space-y-3 sm:space-y-4 text-center flex flex-col items-center justify-center pt-1 pb-4 sm:py-6">'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Mobile gap between Hero and Affiliations badge properly reduced!');

