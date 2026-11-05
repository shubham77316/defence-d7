const fs = require('fs');

const careersPath = 'src/app/careers/page.tsx';
let careers = fs.readFileSync(careersPath, 'utf8');

const modalStart = `{/* Application Modal (Matching Candidate Submission Dossier design) */}`;
const modalEnd = `    </div>
    </div>
  );
}`;

const sIdx = careers.indexOf(modalStart);
const eIdx = careers.indexOf(modalEnd);

if (sIdx === -1 || eIdx === -1) {
  console.error('Could not find modal boundaries', { sIdx, eIdx });
  process.exit(1);
}

const replacement = `{/* Application Modal (Matching Candidate Submission Dossier design) */}
      {applyModalRole && (
        <div
          className="fixed inset-0 z-[100000] overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-md p-2.5 sm:p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#030712] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-sky-500/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-sky-400"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(56, 189, 248, 0.6) rgba(3, 7, 18, 0.8)",
          }}
          onClick={() => setApplyModalRole(null)}
        >
          {/* Centering wrapper: items-start on mobile guarantees top title is NEVER cut off; items-center on desktop */}
          <div className="min-h-full flex items-start sm:items-center justify-center py-4 sm:py-8">
            <div
              className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl bg-[#060b17] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] sm:my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 mb-3 sm:mb-5 pb-3 border-b border-slate-800/80">
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-mono font-bold tracking-wider text-sky-400 uppercase">
                    CANDIDATE SUBMISSION DOSSIER
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5">
                    Provide your technical credentials and background for immediate evaluation.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setApplyModalRole(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111927] hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submittedSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Application Transmitted
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                    Your candidate dossier for{" "}
                    <span className="text-sky-300 font-semibold">{applyModalRole.title}</span> has
                    been transmitted to the sovereign defense technical talent evaluation committee.
                  </p>
                  <button
                    type="button"
                    onClick={() => setApplyModalRole(null)}
                    className="mt-3 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b61] to-[#125386] hover:from-[#114b7a] hover:to-[#1766a5] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border border-sky-500/30"
                  >
                    Close Dossier
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                  {/* Row 1: Full Name & Email Address (Side-by-side 2 cols) */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1">
                        FULL NAME <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1">
                        EMAIL ADDRESS <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@example.com"
                        className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Contact Phone & Total Experience (Side-by-side 2 cols) */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1">
                        CONTACT PHONE <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1">
                        TOTAL EXPERIENCE <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.experienceYears}
                        onChange={(e) =>
                          setFormData({ ...formData, experienceYears: e.target.value })
                        }
                        placeholder="e.g. 7 Years (Aerospace)"
                        className="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Resume / CV Dossier Upload */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1">
                      RESUME / CV DOSSIER <span className="text-sky-400">*</span>
                    </label>
                    <label
                      htmlFor="resume-upload"
                      className="group relative flex flex-col sm:flex-row items-center justify-center py-3 px-4 sm:py-4 sm:px-6 rounded-xl border border-dashed border-slate-700/80 hover:border-sky-400/80 bg-[#040814]/50 cursor-pointer transition-all duration-200 gap-1.5 sm:gap-3"
                    >
                      <input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFileName(e.target.files[0].name);
                          }
                        }}
                      />
                      <Upload className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-bold text-white tracking-wide text-center">
                        {resumeFileName ? resumeFileName : "Click to upload PDF or DOCX Resume"}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-400">
                        (Max 15 MB)
                      </span>
                    </label>
                  </div>

                  {/* Row 4: Defense Focus / Brief Note */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1">
                      DEFENSE FOCUS / BRIEF NOTE
                    </label>
                    <textarea
                      rows={2}
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      placeholder="Highlight relevant airframe, autonomy, or defense projects..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Row 5: NDA & Genuine Credentials Agreement Checkbox */}
                  <div className="flex items-start gap-2.5 pt-0.5">
                    <input
                      type="checkbox"
                      id="nda-agreement"
                      required
                      checked={ndaAgreed}
                      onChange={(e) => setNdaAgreed(e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5 rounded bg-[#040814] border-slate-700 text-sky-500 focus:ring-0 cursor-pointer accent-sky-500 shrink-0"
                    />
                    <label
                      htmlFor="nda-agreement"
                      className="text-[10.5px] sm:text-xs text-slate-300 font-normal leading-snug cursor-pointer select-none"
                    >
                      I confirm that the submitted technical credentials are genuine and agree to Sky Wardens sovereign defense confidentiality and NDA protocols.
                    </label>
                  </div>

                  {/* Row 6: Submit Button & Cancel */}
                  <div className="pt-2 pb-1 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setApplyModalRole(null)}
                      className="py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs sm:text-sm tracking-wider uppercase border border-slate-700/60 transition-colors cursor-pointer shrink-0"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#0d3b61] to-[#125386] hover:from-[#114b7a] hover:to-[#1766a5] text-sky-200 hover:text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-sky-500/40 shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <span>TRANSMITTING APPLICATION...</span>
                      ) : (
                        <>
                          <span>TRANSMIT APPLICATION</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}`;

careers = careers.slice(0, sIdx) + replacement;
fs.writeFileSync(careersPath, careers, 'utf8');
console.log('Successfully updated modal for non-clipping top-to-bottom scroll!');

