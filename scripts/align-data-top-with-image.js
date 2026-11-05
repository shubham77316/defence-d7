const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Change grid alignment from items-center to items-start
c = c.replace(
  'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10',
  'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative z-10'
);

// 2. Change right column flex alignment from justify-center to justify-start
c = c.replace(
  'lg:col-span-6 flex flex-col justify-center space-y-5 lg:pl-2',
  'lg:col-span-6 flex flex-col justify-start space-y-5 lg:pl-2 pt-0.5 sm:pt-1'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Aligned data with top of image!');

