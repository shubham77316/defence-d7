const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Expand container width from max-w-6xl to max-w-7xl
c = c.replace(
  'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12',
  'max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-16'
);

// 2. Make image bigger and data proper in strategicDossiers loop
const oldCards = `          {/* Strategic Dossier Cards - 2 Column with Image & Content (Matching Second Image) */}
          <div className="space-y-12 sm:space-y-16 pt-6">
            {strategicDossiers.map((dossier, idx) => (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pb-12 sm:pb-16 border-b border-white/10 group last:border-b-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                  {/* Left Column: Image with Tactical Reticle */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#08101e] border border-white/10 shadow-2xl group-hover:border-cyan-400/40 transition-colors duration-500">
                      <Image
                        src={dossier.image}
                        alt={dossier.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/65 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Tactical HUD Reticle */}
                      <div className="absolute top-4 right-4 z-10 pointer-events-none">
                        <svg className="w-7 h-7 text-cyan-400/70" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1" />
                          <line x1="14" y1="2" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
                          <line x1="14" y1="21" x2="14" y2="26" stroke="currentColor" strokeWidth="1" />
                          <line x1="2" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1" />
                          <line x1="21" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title + Paragraphs */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-4 pt-1">
                    <div>
                      <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight leading-snug text-white">
                        {dossier.title}
                      </h2>
                    </div>

                    <div className="space-y-4 text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal">
                      {dossier.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-slate-300/90 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}`;

const newCards = `          {/* Strategic Dossier Cards - Large Prominent Image & Balanced Data (Matching Second Image) */}
          <div className="space-y-16 sm:space-y-24 pt-8">
            {strategicDossiers.map((dossier, idx) => (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pb-16 sm:pb-20 border-b border-white/10 group last:border-b-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
                  {/* Left Column: Big Prominent Image with Tactical HUD Reticle */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative w-full aspect-[4/4] sm:aspect-[4/3.8] lg:aspect-[4/4.2] rounded-2xl overflow-hidden bg-[#08101e] border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group-hover:border-cyan-400/50 transition-all duration-500">
                      <Image
                        src={dossier.image}
                        alt={dossier.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/70 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Tactical HUD Reticle */}
                      <div className="absolute top-4 right-4 z-10 pointer-events-none">
                        <svg className="w-8 h-8 text-cyan-400/80 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1" />
                          <line x1="14" y1="2" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
                          <line x1="14" y1="21" x2="14" y2="26" stroke="currentColor" strokeWidth="1" />
                          <line x1="2" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1" />
                          <line x1="21" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title + Paragraphs (Proper Data Spacing) */}
                  <div className="lg:col-span-6 flex flex-col justify-center space-y-5 lg:pl-2">
                    <div>
                      <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-snug text-white">
                        {dossier.title}
                      </h2>
                    </div>

                    <div className="space-y-4 text-slate-300 text-sm sm:text-[15px] lg:text-base leading-relaxed font-normal">
                      {dossier.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-slate-300/95 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}`;

c = c.replace(/\r\n/g, '\n');
const normOldCards = oldCards.replace(/\r\n/g, '\n');
const normNewCards = newCards.replace(/\r\n/g, '\n');

if (c.includes(normOldCards)) {
  c = c.replace(normOldCards, normNewCards);
  console.log('Cards replaced with bigger image and proper data spacing!');
} else {
  console.log('Old cards NOT found');
}

fs.writeFileSync(file, c, 'utf8');
console.log('Done!');

