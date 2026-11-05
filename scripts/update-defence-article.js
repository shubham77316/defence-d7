const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace defence-systems title and excerpt
content = content.replace(
  '    title: "Defence systems, protective platforms, and readiness updates",\r\n    excerpt:\r\n      "Sovereign tactical systems engineered for extreme operational theaters, mission-critical environments, and multi-domain defense preparedness.",',
  '    title: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna",\r\n    excerpt:\r\n      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Done');

