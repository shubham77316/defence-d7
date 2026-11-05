const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove dynamic category-from-articles block (lines 128-138)
const oldDynamic = `  // Add any custom categories from articles, ignoring case duplicates\r\n  articlesList.forEach((a) => {\r\n    const raw = (a.category || "").trim();\r\n    if (raw) {\r\n      const key = raw.toLowerCase();\r\n      if (!seenCategories.has(key)) {\r\n        seenCategories.add(key);\r\n        categoriesList.push(raw);\r\n      }\r\n    }\r\n  });\r\n`;
content = content.replace(oldDynamic, '');

if (content.includes('articlesList.forEach')) {
  console.log('ERROR: still found articlesList.forEach — trying CRLF variant');
} else {
  fs.writeFileSync(file, content, 'utf8');
  console.log('Done - dynamic article categories removed');
}

