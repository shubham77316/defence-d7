const fs = require('fs');
const file = 'd:/defence/src/app/partnerships/page.tsx';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const goodBlock = [
  '                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">',
  '                  {/* Left Column: Image */}',
  '                  <div className="lg:col-span-5 relative">',
  '                    <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#08101e] group-hover:border-cyan-400/40 transition-colors duration-500">',
  '                      <Image',
  '                        src={dossier.image}',
  '                        alt={dossier.title}',
  '                        fill',
  '                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"',
  '                        sizes="(max-width: 1024px) 100vw, 40vw"',
  '                      />',
  '                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/75 via-transparent to-transparent pointer-events-none" />',
  '                      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-wider text-cyan-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-400/30">',
  '                        DOSSIER 0{idx + 1}',
  '                      </div>',
  '                    </div>',
  '                  </div>',
  '',
  '                  {/* Right Column: Title + Description */}',
  '                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">',
  '                    <div>',
  '                      <div className="inline-block mb-2.5">',
  '                        <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30 inline-block">',
  '                          PROGRAM 0{idx + 1}',
  '                        </span>',
  '                      </div>',
  '                      <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">',
  '                        {dossier.title}',
  '                      </h2>',
  '                    </div>',
  '',
  '                    <div className="space-y-3 text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal">',
  '                      {dossier.paragraphs.map((p, pIdx) => (',
  '                        <p key={pIdx} className="text-slate-300/90 leading-relaxed">',
  '                          {p}',
  '                        </p>',
  '                      ))}',
  '                    </div>',
  '',
  '                    <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-cyan-400/60">',
  '                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />',
  '                      <span>SEC-LEVEL 4 // ACTIVE ENGAGEMENT STATUS</span>',
  '                    </div>',
  '                  </div>',
  '                </div>',
];

// Replace lines 483-521 (0-indexed), which is 39 lines
lines.splice(483, 39, ...goodBlock);

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Done. New line count:', lines.length);

