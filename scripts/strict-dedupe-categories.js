const fs = require('fs');

// 1. Update src/app/api/news/route.ts
const routeFile = 'd:/defence/src/app/api/news/route.ts';
let routeCode = fs.readFileSync(routeFile, 'utf8');
routeCode = routeCode.replace('category: "AEROSPACE"', 'category: "Aerospace"');
routeCode = routeCode.replace('category: "DEFENCE"', 'category: "Defence"');
routeCode = routeCode.replace('category: item.category?.toUpperCase() || "DEFENCE"', 'category: (item.category ? (item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase()) : "Defence")');
fs.writeFileSync(routeFile, routeCode, 'utf8');
console.log('Updated route.ts');

// 2. Update src/app/news/page.tsx
const pageFile = 'd:/defence/src/app/news/page.tsx';
let pageCode = fs.readFileSync(pageFile, 'utf8');

// Ensure normalizeCategory function is used in fetchNews
const oldFetchMap = `                id: d.slug || d._id,
                category: d.category || "Innovation",`;
const oldFetchMapCrlf = oldFetchMap.replace(/\n/g, '\r\n');

const newFetchMap = `                id: d.slug || d._id,
                category: (d.category ? (d.category.charAt(0).toUpperCase() + d.category.slice(1).toLowerCase()) : "Innovation"),`;
const newFetchMapCrlf = newFetchMap.replace(/\n/g, '\r\n');

if (pageCode.includes(oldFetchMapCrlf)) {
  pageCode = pageCode.replace(oldFetchMapCrlf, newFetchMapCrlf);
  console.log('Updated fetch mapping in page.tsx');
} else if (pageCode.includes(oldFetchMap)) {
  pageCode = pageCode.replace(oldFetchMap, newFetchMap);
  console.log('Updated fetch mapping (LF) in page.tsx');
}

// Ensure categoriesList deduplicates strictly by lowercase set and retains only ONE copy
const oldCategoriesListRegex = /\/\/ Deduplicate categories[\s\S]*?const categoriesList = Array\.from\(categoriesMap\.values\(\)\);/;

const newCategoriesListCode = `// Deduplicate strictly: every category appears EXACTLY ONCE
  const seenCategories = new Set<string>();
  const categoriesList: string[] = ["All"];
  seenCategories.add("all");

  // Add standard categories first
  CATEGORIES.forEach((c) => {
    const key = c.trim().toLowerCase();
    if (key && !seenCategories.has(key)) {
      seenCategories.add(key);
      const formatted = c.trim().charAt(0).toUpperCase() + c.trim().slice(1).toLowerCase();
      categoriesList.push(formatted);
    }
  });

  // Add any custom categories from articles, ignoring case duplicates
  articlesList.forEach((a) => {
    const raw = (a.category || "").trim();
    if (raw) {
      const key = raw.toLowerCase();
      if (!seenCategories.has(key)) {
        seenCategories.add(key);
        const formatted = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
        categoriesList.push(formatted);
      }
    }
  });`;

if (oldCategoriesListRegex.test(pageCode)) {
  pageCode = pageCode.replace(oldCategoriesListRegex, newCategoriesListCode);
  console.log('Updated categoriesList deduplication in page.tsx');
} else {
  console.log('oldCategoriesListRegex did not match');
}

fs.writeFileSync(pageFile, pageCode, 'utf8');
console.log('Done updating both files.');

