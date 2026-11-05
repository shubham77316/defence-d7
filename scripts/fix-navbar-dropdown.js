const fs = require('fs');
const file = 'd:/defence/src/components/layout/Navbar.tsx';
let c = fs.readFileSync(file, 'utf8');

// Add data-nav-dropdown attribute to the dropdown wrapper div
c = c.replace(
  'className="relative"\r\n                  >',
  'className="relative"\r\n                    data-nav-dropdown="true"\r\n                  >'
);

// Fix duplicate transition class on ChevronDown
c = c.replace(
  'transition-transform duration-200 transition-transform duration-200',
  'transition-transform duration-200'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Done');

