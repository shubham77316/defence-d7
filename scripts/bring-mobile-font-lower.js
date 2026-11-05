const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(
  'translate-y-[10%]',
  'translate-y-[28%]'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Updated mobile font to translate-y-[28%] (thoda sa aur niche jaha image puri hoti hai)!');

