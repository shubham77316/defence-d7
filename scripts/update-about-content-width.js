const fs = require('fs');

const file = 'd:/defence/src/components/about/AboutContent.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Expand container width to match Navbar max-w-[1660px] px-2.5 sm:px-5 exactly
c = c.replace(
  'max-w-[1600px] mx-auto px-2.5 sm:px-6 space-y-8 sm:space-y-16 mt-4 sm:mt-14',
  'max-w-[1660px] mx-auto px-2.5 sm:px-5 space-y-8 sm:space-y-16 mt-4 sm:mt-14'
);

// 2. Remove max-w-xl constraint on right column so it extends to the end properly
c = c.replace(
  'lg:col-span-5 space-y-4 max-w-xl pb-1 sm:pb-2',
  'lg:col-span-5 space-y-4 w-full pb-1 sm:pb-2'
);

fs.writeFileSync(file, c, 'utf8');
console.log('AboutContent container width updated to match Navbar!');

