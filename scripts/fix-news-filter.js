const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Replace categoriesList definition to deduplicate case-insensitively
const oldListDef = `  const categoriesList = [\\r?\\n\\s+"All",\\r?\\n\\s+\\.\\.\\.Array\\.from\\([\\s\\S]*?\\),\\r?\\n\\s+\\];`;
const newListDef = `  // Deduplicate categories case-insensitively so no duplicate pills (e.g. AEROSPACE vs Aerospace)
  const categoriesMap = new Map<string, string>();
  categoriesMap.set("all", "All");
  CATEGORIES.forEach((cat) => {
    if (cat.trim()) categoriesMap.set(cat.trim().toLowerCase(), cat.trim());
  });
  articlesList.forEach((a) => {
    const raw = (a.category || "").trim();
    if (raw) {
      const key = raw.toLowerCase();
      if (!categoriesMap.has(key)) {
        const formatted = raw.charAt(0).toUpperCase() + raw.slice(1);
        categoriesMap.set(key, formatted);
      }
    }
  });
  const categoriesList = Array.from(categoriesMap.values());`;

const reList = new RegExp(oldListDef);
if (!reList.test(c)) {
  console.log('Regex oldListDef did not match');
  process.exit(1);
}
c = c.replace(reList, newListDef);

// 2. Enhance button styling for single-active glow & tap feedback
const oldBtn = `              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={\`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer \${
                  isActive
                    ? "bg-[#0ea5e9] text-black font-bold shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                    : "bg-[#050c1c]/90 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                }\`}
              >
                {cat}
              </button>`;

const newBtn = `              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={\`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer select-none active:scale-95 \${
                  isActive
                    ? "bg-[#0ea5e9] text-black font-bold shadow-[0_0_18px_rgba(14,165,233,0.55)] border border-[#38bdf8] scale-[1.03]"
                    : "bg-[#050c1c]/90 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                }\`}
              >
                {cat}
              </button>`;

if (c.includes(oldBtn)) {
  c = c.replace(oldBtn, newBtn);
} else {
  // Try CRLF
  const oldBtnCrlf = oldBtn.replace(/\n/g, '\r\n');
  const newBtnCrlf = newBtn.replace(/\n/g, '\r\n');
  if (c.includes(oldBtnCrlf)) {
    c = c.replace(oldBtnCrlf, newBtnCrlf);
  } else {
    console.log('oldBtn not found, replacing via regex');
    c = c.replace(
      /<button[\s\S]*?onClick=\{\(\) => setSelectedCategory\(cat\)\}[\s\S]*?<\/button>/,
      newBtnCrlf
    );
  }
}

fs.writeFileSync(file, c, 'utf8');
console.log('Successfully updated News categories deduplication and active effect!');

