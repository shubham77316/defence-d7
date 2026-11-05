const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldHeader = `          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}\r\n          <div className="mb-8 space-y-5">\r\n            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">\r\n              Defence systems, protective platforms, and readiness updates\r\n            </h1>\r\n\r\n            <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-xs font-mono border-b border-slate-800/80 pb-4">\r\n              <div>\r\n                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">\r\n                  PUBLISHED\r\n                </span>\r\n                <span className="text-white font-semibold">February 2026</span>\r\n              </div>\r\n              <div>\r\n                <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5">\r\n                  AUTHORITY / DIRECTORATE\r\n                </span>\r\n                <span className="text-white font-semibold">Strategic Defence Technology Directorate</span>\r\n              </div>\r\n            </div>\r\n\r\n            <div className="space-y-2 mt-4">\r\n              <div className="relative w-full h-[280px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">\r\n                <Image\r\n                  src="/images/tactical-defense-operator.jpg"\r\n                  alt="Specialist engineer analyzing tactical defence command telemetry"\r\n                  fill\r\n                  priority\r\n                  className="object-cover"\r\n                />\r\n              </div>\r\n              <p className="text-center italic text-xs text-slate-400 font-sans pt-1">\r\n                Specialist engineer analyzing tactical defence command telemetry\r\n              </p>\r\n            </div>\r\n          </div>`;

const newHeader = `          {/* Article Header */}\r\n          <div className="mb-8 space-y-5">\r\n            {/* Badge + meta row */}\r\n            <div className="flex items-center gap-3">\r\n              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-sky-400 bg-sky-950/40 border border-sky-500/30 uppercase">\r\n                PARTNER NEWS\r\n              </span>\r\n              <span className="text-xs font-mono text-slate-400">2 min read</span>\r\n            </div>\r\n\r\n            {/* Big heading */}\r\n            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">\r\n              Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna\r\n            </h1>\r\n\r\n            {/* Authority row */}\r\n            <div className="pb-2">\r\n              <span className="text-slate-500 uppercase block text-[10px] tracking-wider font-bold mb-0.5 font-mono">\r\n                AUTHORITY / DIRECTORATE\r\n              </span>\r\n              <span className="text-white font-semibold text-sm">Strategic Partnerships Desk</span>\r\n            </div>\r\n\r\n            {/* Full-width hero image below heading */}\r\n            <div className="relative w-full h-[280px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">\r\n              <Image\r\n                src="/images/tactical-defense-operator.jpg"\r\n                alt="Specialist engineer analyzing tactical defence command telemetry"\r\n                fill\r\n                priority\r\n                className="object-cover"\r\n              />\r\n            </div>\r\n          </div>`;

if (content.includes(oldHeader)) {
  content = content.replace(oldHeader, newHeader);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Done - defence-systems header updated');
} else {
  console.log('ERROR: target block not found - trying splice approach');
  // Splice approach
  const startMarker = '          {/* FIRST IMAGE DATA: Header & Hero Image with Authority */}';
  const endMarker = '          </div>\r\n\r\n          {/* SECOND IMAGE DATA:';
  const si = content.indexOf(startMarker);
  const ei = content.indexOf(endMarker, si);
  if (si !== -1 && ei !== -1) {
    content = content.substring(0, si) + newHeader + '\r\n\r\n' + content.substring(ei + '          </div>\r\n\r\n'.length);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Done via splice');
  } else {
    console.log('ERROR: markers not found either. si=' + si + ' ei=' + ei);
  }
}

