const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');
// Remove "Advanced Systems" line from CATEGORIES array
content = content.replace('  "Advanced Systems",\r\n', '');
content = content.replace('  "Advanced Systems",\n', ''); // LF fallback
fs.writeFileSync(file, content, 'utf8');
console.log('Done - Advanced Systems removed');

