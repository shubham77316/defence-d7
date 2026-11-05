const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldBlock = `const articlesData: Article[] = [\r\n  {\r\n    id: "aerospace-highlights",\r\n    category: "Company News",\r\n    categoryBadge: "COMPANY NEWS",\r\n    meta: "2 min read",\r\n    title: "Aerospace highlights and autonomous flight program positioning",\r\n    excerpt:\r\n      "Precision-engineered sovereign airframes, autonomous flight trials, and tactical unmanned aerial surveillance milestones achieve key flight milestones.",\r\n    image: "/images/stealth-fighter-hangar.jpg",\r\n  },\r\n  {\r\n    id: "advanced-systems",\r\n    category: "Company News",\r\n    categoryBadge: "COMPANY NEWS",\r\n    meta: "3 min read",\r\n    title: "AI-enabled edge telemetry deployment for multi-theater command coordination",\r\n    titleClass: "text-[#38bdf8]",\r\n    excerpt:\r\n      "Encrypted communication arrays and edge-AI compute units deliver real-time sensor fusion and zero-latency situational awareness.",\r\n    image: "/images/news-advanced-systems.jpg",\r\n  },\r\n];`;

const newBlock = `const articlesData: Article[] = [\r\n  {\r\n    id: "aerospace-highlights",\r\n    category: "Company News",\r\n    categoryBadge: "COMPANY NEWS",\r\n    meta: "2 min read",\r\n    title: "Aerospace highlights and autonomous flight program positioning",\r\n    excerpt:\r\n      "Precision-engineered sovereign airframes, autonomous flight trials, and tactical unmanned aerial surveillance milestones achieve key flight milestones.",\r\n    image: "/images/stealth-fighter-hangar.jpg",\r\n  },\r\n  {\r\n    id: "defence-systems",\r\n    category: "Partner News",\r\n    categoryBadge: "PARTNER NEWS",\r\n    meta: "2 min read",\r\n    title: "Defence systems, protective platforms, and readiness updates",\r\n    excerpt:\r\n      "Sovereign tactical systems engineered for extreme operational theaters, mission-critical environments, and multi-domain defense preparedness.",\r\n    image: "/images/tactical-defense-operator.jpg",\r\n  },\r\n  {\r\n    id: "advanced-systems",\r\n    category: "Company News",\r\n    categoryBadge: "COMPANY NEWS",\r\n    meta: "3 min read",\r\n    title: "AI-enabled edge telemetry deployment for multi-theater command coordination",\r\n    titleClass: "text-[#38bdf8]",\r\n    excerpt:\r\n      "Encrypted communication arrays and edge-AI compute units deliver real-time sensor fusion and zero-latency situational awareness.",\r\n    image: "/images/news-advanced-systems.jpg",\r\n  },\r\n];`;

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Done - 3 articles set');
} else {
  // Try finding by start marker
  const start = content.indexOf('const articlesData: Article[] = [');
  const end = content.indexOf('];\n\nexport default', start);
  const end2 = content.indexOf('];\r\n\r\nexport default', start);
  const realEnd = end2 !== -1 ? end2 + 3 : end + 2;
  if (start !== -1 && realEnd > start) {
    content = content.substring(0, start) + newBlock + content.substring(realEnd);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Done via splice - 3 articles set');
  } else {
    console.log('ERROR: could not find articlesData block');
  }
}

