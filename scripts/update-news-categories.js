const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace CATEGORIES array
const oldCats = `const CATEGORIES = [\r\n  "All",\r\n  "Aerospace",\r\n  "Defence",\r\n  "Sovereign Tech",\r\n  "Strategic Alliances",\r\n  "Manufacturing",\r\n];`;
const newCats = `const CATEGORIES = [\r\n  "All",\r\n  "Company News",\r\n  "Partner News",\r\n];`;
content = content.replace(oldCats, newCats);

// 2. Update each article's category + categoryBadge
// aerospace-highlights -> Company News
content = content.replace(
  `    category: "Aerospace",\r\n    categoryBadge: "AEROSPACE",`,
  `    category: "Company News",\r\n    categoryBadge: "COMPANY NEWS",`
);
// defence-systems -> Company News
content = content.replace(
  `    category: "Defence",\r\n    categoryBadge: "DEFENCE",`,
  `    category: "Partner News",\r\n    categoryBadge: "PARTNER NEWS",`
);
// tactical-uav -> Company News
content = content.replace(
  `    category: "Sovereign Tech",\r\n    categoryBadge: "SOVEREIGN TECH",`,
  `    category: "Company News",\r\n    categoryBadge: "COMPANY NEWS",`
);
// strategic-alliances -> Partner News
content = content.replace(
  `    category: "Strategic Alliances",\r\n    categoryBadge: "STRATEGIC ALLIANCES",`,
  `    category: "Partner News",\r\n    categoryBadge: "PARTNER NEWS",`
);
// advanced-systems -> Company News
content = content.replace(
  `    category: "Advanced Systems",\r\n    categoryBadge: "ADVANCED SYSTEMS",`,
  `    category: "Company News",\r\n    categoryBadge: "COMPANY NEWS",`
);
// manufacturing -> Company News
content = content.replace(
  `    category: "Manufacturing",\r\n    categoryBadge: "MANUFACTURING",`,
  `    category: "Company News",\r\n    categoryBadge: "COMPANY NEWS",`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Done - Categories updated to Company News / Partner News');

