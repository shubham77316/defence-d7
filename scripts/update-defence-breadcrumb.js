const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find the defence-systems back button block (second occurrence after line 377)
// Replace the simple back button with breadcrumb style for defence-systems view
const defenceSection = content.indexOf('if (activeArticleId === "defence-systems")');
if (defenceSection === -1) { console.log('ERROR: defence-systems section not found'); process.exit(1); }

const oldBtn = `          {/* Top Back Button */}\r\n          <div className="mb-8">\r\n            <button\r\n              type="button"\r\n              onClick={() => setActiveArticleId(null)}\r\n              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050c1c] border border-slate-700/80 hover:border-sky-400 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"\r\n            >\r\n              <ArrowLeft className="w-3.5 h-3.5" />\r\n              <span>← Back to News &amp; Insights</span>\r\n            </button>\r\n          </div>`;

const newBtn = `          {/* Breadcrumb nav */}\r\n          <div className="mb-8 flex items-center gap-2 text-xs font-mono text-slate-400">\r\n            <button\r\n              type="button"\r\n              onClick={() => setActiveArticleId(null)}\r\n              className="hover:text-sky-400 transition-colors cursor-pointer flex items-center gap-1"\r\n            >\r\n              <ArrowLeft className="w-3 h-3" />\r\n              Back to All News\r\n            </button>\r\n            <span className="text-slate-600">/</span>\r\n            <span className="text-slate-300">Partner News</span>\r\n          </div>`;

// Only replace within the defence-systems section
const sectionText = content.substring(defenceSection);
if (sectionText.includes(oldBtn)) {
  const replaced = sectionText.replace(oldBtn, newBtn);
  content = content.substring(0, defenceSection) + replaced;
  fs.writeFileSync(file, content, 'utf8');
  console.log('Done - breadcrumb updated');
} else {
  console.log('ERROR: button block not found in defence-systems section');
}

