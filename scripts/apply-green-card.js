const fs = require('fs');
const file = 'd:/defence/src/app/careers/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// We will replace the entire mapping block inside CAREER_POSITIONS.map
const oldMapStart = `        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {CAREER_POSITIONS.map((pos) => {
            const isExpanded = expandedRole === pos.id;

            return (
              <motion.div
                key={pos.id}
                initial={pos.id === "lead-avionics" ? { opacity: 0, x: -90 } : false}
                whileInView={pos.id === "lead-avionics" ? { opacity: 1, x: 0 } : undefined}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={\`bg-[#050c1c]/90 border border-slate-800/90 hover:border-[#1a4a75]/80 rounded-2xl p-6 sm:p-7 transition-colors duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.6)] group \${
                  pos.id === "lead-avionics"
                    ? "lg:col-span-2 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)] gap-x-8"
                    : "flex flex-col justify-between"
                }\`}
              >`;

const newMapStart = `        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {CAREER_POSITIONS.map((pos) => {
            const isExpanded = expandedRole === pos.id;
            const isFeatured = pos.id === "lead-avionics";

            if (isFeatured) {
              return (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-2 w-full max-w-5xl mx-auto rounded-3xl bg-[#5ee374] text-black p-7 sm:p-10 lg:p-12 relative overflow-hidden border-2 border-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-300"
                >
                  {/* Top Tags Bar */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
                    <span className="bg-black text-[#5ee374] text-[11px] font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full border border-black">
                      {pos.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-black/90 bg-black/10 px-3 py-1 rounded-full">
                      <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>{pos.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-black/90 bg-black/10 px-3 py-1 rounded-full">
                      <Briefcase className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>{pos.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-black/90 bg-black/10 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>{pos.experience}</span>
                    </div>
                  </div>

                  {/* Main Role Title (Editorial Typography matching Image 1) */}
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-[1.08] mb-4">
                    {pos.title}
                  </h3>

                  {/* Summary Description */}
                  <p className="text-sm sm:text-base text-black/85 font-medium leading-relaxed max-w-3xl mb-6">
                    {pos.description}
                  </p>

                  {/* Signature Diagonal Hatch Graphic (Exact style from Image 1) */}
                  <div className="my-6 w-full h-16 sm:h-20 relative overflow-hidden rounded-xl border border-black/30 pointer-events-none bg-black/[0.04]">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="diagStripePattern" width="22" height="22" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="22" stroke="#000000" strokeWidth="2.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#diagStripePattern)" />
                    </svg>
                  </div>

                  {/* Terminal Prompt Lines (Matching Image 1) */}
                  <div className="font-mono text-xs sm:text-sm font-bold text-black space-y-2 uppercase tracking-wide mb-6">
                    <div className="flex items-start sm:items-center gap-2">
                      <span className="font-black text-base leading-none">&gt;</span>
                      <span>NO UNNECESSARY COMPLEXITY. DEFENCE PRECISION AT SCALE.</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2">
                      <span className="font-black text-base leading-none">&gt;</span>
                      <span>EXPERIENCE: 6–10 YEARS REQUIRED // SOVEREIGN FLIGHT CONTROLS &amp; AVIONICS</span>
                    </div>
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pos.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs rounded-md bg-black text-[#5ee374] font-mono font-bold tracking-tight border border-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Accordion Expandable Responsibilities & Scope */}
                  {isExpanded && (
                    <div className="mb-6 pt-5 border-t border-black/25 space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs font-mono font-black uppercase tracking-wider text-black mb-2">
                          {pos.responsibilitiesTitle || "CORE RESPONSIBILITIES"}
                        </h4>
                        <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-black/90 font-medium leading-relaxed marker:text-black">
                          {pos.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono font-black uppercase tracking-wider text-black mb-2">
                          {pos.qualificationsTitle || "QUALIFICATIONS & EXPERIENCE"}
                        </h4>
                        <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-black/90 font-medium leading-relaxed marker:text-black">
                          {pos.qualifications.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom Row: Left Accordion Toggle + Right Apply Button */}
                  <div className="pt-4 border-t border-black/25 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(pos.id)}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-black hover:text-black/70 uppercase transition-colors cursor-pointer select-none"
                    >
                      <span>View Responsibilities &amp; Scope</span>
                      <ChevronDown
                        className={\`w-4 h-4 text-black transition-transform duration-200 \${
                          isExpanded ? "rotate-180" : ""
                        }\`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApplyClick(pos)}
                      className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-[#5ee374] hover:text-white text-xs sm:text-sm font-mono font-black uppercase tracking-wider px-6 py-3 rounded-xl border border-black shadow-[0_6px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
                    >
                      <span>APPLY FOR ROLE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={pos.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#050c1c]/90 border border-slate-800/90 hover:border-[#1a4a75]/80 rounded-2xl p-6 sm:p-7 transition-colors duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between group"
              >`;

if (c.includes(oldMapStart)) {
  c = c.replace(oldMapStart, newMapStart);
  fs.writeFileSync(file, c, 'utf8');
  console.log('Successfully updated careers page with Image 1 editorial green design!');
} else {
  console.log('oldMapStart not found, check formatting');
}

