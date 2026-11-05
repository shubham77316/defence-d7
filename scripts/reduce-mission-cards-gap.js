const fs = require('fs');

const file = 'd:/defence/src/components/about/AboutContent.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Reduce vertical space-y in mission section from space-y-8 sm:space-y-10 down to space-y-4 sm:space-y-6
c = c.replace(
  '<div id="mission" className="pt-6 sm:pt-10 space-y-8 sm:space-y-10 scroll-mt-28">',
  '<div id="mission" className="pt-4 sm:pt-8 space-y-4 sm:space-y-6 scroll-mt-28">'
);

// 2. Reduce bottom padding on the header/description block from pb-6 sm:py-6 to pt-2 sm:pt-4 pb-2 sm:pb-3
c = c.replace(
  'className="w-full pt-4 pb-6 sm:py-6"',
  'className="w-full pt-2 sm:pt-4 pb-2 sm:pb-3"'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Reduced gap between description and Aerospace/Defence cards in AboutContent!');

