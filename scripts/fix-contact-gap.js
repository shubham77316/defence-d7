const fs = require('fs');

const file = 'src/app/contact/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'pb-24 sm:pb-32 bg-[#000000]',
  'pb-3 sm:pb-16 lg:pb-24 bg-[#000000]'
);

code = code.replace(
  'p-8 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)]',
  'p-5 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)]'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Successfully updated contact/page.tsx!');

