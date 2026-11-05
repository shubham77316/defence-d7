const fs = require('fs');
const file = 'd:/defence/src/components/layout/Navbar.tsx';
let c = fs.readFileSync(file, 'utf8');

// Remove onMouseEnter and onMouseLeave, and remove 'group' from className
c = c.replace(
  /className="relative group"\r\n\s+onMouseEnter=\{[^}]+\}\r\n\s+onMouseLeave=\{[^}]+\}/,
  'className="relative"'
);

// Also close dropdown when clicking outside — add a useEffect with click-outside listener
// For now just remove the group-hover chevron animation
c = c.replace(
  'group-hover:text-sky-300 group-hover:rotate-180',
  'transition-transform duration-200'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Done');

