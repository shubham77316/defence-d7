const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Optimize Back to Home button for mobile
const oldBtn = `<div className="absolute top-2.5 left-2.5 z-40 pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1.5 px-3 rounded-lg bg-[#040814]/85 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
                <span>BACK TO HOME</span>
              </Link>
            </div>`;

const newBtn = `<div className="absolute top-3 left-3 z-40 pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 h-8 px-3 text-[11px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#040814]/90 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
                <span>BACK TO HOME</span>
              </Link>
            </div>`;

c = c.replace(oldBtn, newBtn);

// 2. Adjust card image aspect ratio for mobile only (width bada ke height kam, while keeping desktop as user liked)
const oldCardAspect = 'aspect-[4/4] sm:aspect-[4/3.8] lg:aspect-[4/4.2]';
const newCardAspect = 'aspect-[16/10] sm:aspect-[4/3.8] lg:aspect-[4/4.2]';

c = c.replace(oldCardAspect, newCardAspect);

fs.writeFileSync(file, c, 'utf8');
console.log('Mobile optimizations applied successfully!');

