const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. In Mobile Responsive Hero, add the Back to Home button at top-left of the image
const mobileHeroTarget = '<div className="relative w-full max-w-[420px] mx-auto">';
const mobileHeroReplacement = `<div className="relative w-full max-w-[420px] mx-auto">
            {/* Responsive Only: Back to Home Button at Top-Left of Image */}
            <div className="absolute top-2.5 left-2.5 z-40 pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1.5 px-3 rounded-lg bg-[#040814]/85 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
                <span>BACK TO HOME</span>
              </Link>
            </div>`;

if (c.includes(mobileHeroTarget)) {
  c = c.replace(mobileHeroTarget, mobileHeroReplacement);
  console.log('Added Back to Home button to mobile hero image!');
} else {
  console.log('Mobile hero target NOT found!');
}

// 2. Hide the main content back button on mobile (so it is moved to mobile hero image)
const oldMainBackButton = '<div className="flex items-center justify-between pt-2">';
const newMainBackButton = '<div className="hidden sm:flex items-center justify-between pt-2">';

if (c.includes(oldMainBackButton)) {
  c = c.replace(oldMainBackButton, newMainBackButton);
  console.log('Updated main content back button to hidden on mobile (hidden sm:flex)!');
} else {
  console.log('Main content back button NOT found!');
}

fs.writeFileSync(file, c, 'utf8');
console.log('Done!');

