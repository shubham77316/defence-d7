const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(
  'aspect-[16/10] sm:aspect-[4/3.8] lg:aspect-[4/4.2]',
  'aspect-[16/10]'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Updated image aspect ratio to aspect-[16/10] to reduce height!');

