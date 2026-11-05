const fs = require('fs');

const file = 'src/components/about/AboutContent.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = 'overflow-x-clip pt-16 sm:pt-20 pb-4 px-2.5 sm:px-6 md:px-8 lg:px-12 xl:px-14">';
const addition = `
          {/* Back to Home Button */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-14 z-30 pointer-events-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1.5 px-3.5 rounded-lg bg-[#040814]/80 hover:bg-[#071329] border border-cyan-400/30 hover:border-cyan-300/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
              <span>BACK TO HOME</span>
            </Link>
          </div>`;

if (content.includes(target) && !content.includes('BACK TO HOME')) {
  content = content.replace(target, target + addition);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated AboutContent.tsx');
} else {
  console.log('Target not found or already updated');
}

