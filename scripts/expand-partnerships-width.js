const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(
  'max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-16',
  'w-full max-w-[1660px] mx-auto px-2.5 sm:px-5 space-y-16'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Partnerships 4 boxes and data width updated to match Navbar Logo to Contact button!');

