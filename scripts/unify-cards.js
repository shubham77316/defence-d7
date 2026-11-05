const fs = require('fs');
const file = 'd:/defence/src/app/careers/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const oldBlockStart = '          {CAREER_POSITIONS.map((pos) => {';
const oldBlockEnd = '        {/* Speculative Applications & Research Fellowships Banner */}';

const startIdx = c.indexOf(oldBlockStart);
const endIdx = c.indexOf(oldBlockEnd);

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found:', { startIdx, endIdx });
  process.exit(1);
}

const newCardsBlock = `          {CAREER_POSITIONS.map((pos) => {
            const isExpanded = expandedRole === pos.id;
            const isFullWidth = pos.id === "lead-avionics";

            return (
              <motion.div
                key={pos.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={\`bg-[#050c1c]/90 border border-slate-800/90 hover:border-[#1a4a75]/80 rounded-2xl p-6 sm:p-7 transition-colors duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between group \${
                  isFullWidth ? "lg:col-span-2 w-full" : ""
                }\`}
              >
                <div>
                  {/* Top Tags Row */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
                    {/* Category Blue Pill */}
                    <span className="bg-[#0c2847] text-[#5cb1f7] text-[10.5px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#1a4a75]/80">
                      {pos.category}
                    </span>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{pos.location}</span>
                    </div>

                    {/* Job Type */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{pos.type}</span>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{pos.experience}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={\`font-bold text-white tracking-tight mb-3 group-hover:text-sky-200 transition-colors \${
                    isFullWidth ? "text-xl sm:text-2xl lg:text-3xl" : "text-xl sm:text-2xl"
                  }\`}>
                    {pos.title}
                  </h3>

                  {/* Summary Description */}
                  <p className={\`text-slate-400 font-normal leading-relaxed mb-5 \${
                    isFullWidth ? "text-xs sm:text-sm md:text-[14.5px] max-w-4xl" : "text-xs sm:text-sm"
                  }\`}>
                    {pos.description}
                  </p>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pos.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-[#071328]/90 text-slate-300 border border-slate-800/90 font-mono tracking-tight"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Accordion Expandable Responsibilities & Scope */}
                  {isExpanded && (
                    <div className="mb-6 pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-2">
                          {pos.responsibilitiesTitle || "CORE RESPONSIBILITIES"}
                        </h4>
                        <ul className="space-y-2 pl-4 list-disc text-xs text-slate-300 leading-relaxed marker:text-sky-400">
                          {pos.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-2">
                          {pos.qualificationsTitle || "QUALIFICATIONS & EXPERIENCE"}
                        </h4>
                        <ul className="space-y-2 pl-4 list-disc text-xs text-slate-300 leading-relaxed marker:text-sky-400">
                          {pos.qualifications.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Row: Left Accordion Toggle + Right Apply Button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  {/* Left: View Responsibilities & Scope */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(pos.id)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium transition-colors cursor-pointer select-none"
                  >
                    <span>View Responsibilities &amp; Scope</span>
                    <ChevronDown
                      className={\`w-4 h-4 text-slate-400 transition-transform duration-200 \${
                        isExpanded ? "rotate-180 text-sky-400" : ""
                      }\`}
                    />
                  </button>

                  {/* Right: Apply for Role Button */}
                  <button
                    type="button"
                    onClick={() => handleApplyClick(pos)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#18629b] to-[#124d7c] hover:from-[#1e78bf] hover:to-[#165e99] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-lg border border-[#2e8bd9]/50 shadow-[0_0_15px_rgba(24,98,155,0.35)] hover:shadow-[0_0_20px_rgba(36,123,196,0.5)] transition-all cursor-pointer"
                  >
                    <span>APPLY FOR ROLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        `;

c = c.slice(0, startIdx) + newCardsBlock + c.slice(endIdx);
fs.writeFileSync(file, c, 'utf8');
console.log('Successfully made all card designs identical and matching the box below it!');

