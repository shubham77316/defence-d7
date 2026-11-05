const fs = require('fs');

// 1. Update src/app/careers/page.tsx to exactly match Image 2 format
const careersPath = 'src/app/careers/page.tsx';
let careers = fs.readFileSync(careersPath, 'utf8');

// Replace the modal section with the 2-column Image 2 layout
const modalStartRegex = /{\/\* Application Modal \(Matching Candidate Submission Dossier design\) \*\/}[\s\S]*?{applyModalRole && \([\s\S]*?onClick=\{\(e\) => e\.stopPropagation\(\)\}\s*>/;

const newModalTop = `{/* Application Modal (Matching Candidate Submission Dossier design) */}
      {applyModalRole && (
        <div
          className="fixed inset-0 z-[100000] overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-md p-3 sm:p-6"
          onClick={() => setApplyModalRole(null)}
        >
          <div className="min-h-full flex items-center justify-center py-4 sm:py-8">
            <div
              className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl bg-[#060b17] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-auto"
              onClick={(e) => e.stopPropagation()}
            >`;

// Also replace the form inner content to use grid-cols-2 everywhere
const formSearch = `<form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">`;

const formReplace = `<form onSubmit={handleFormSubmit} className="space-y-2.5 sm:space-y-3.5">
                {/* Row 1: Full Name & Email Address (Side-by-side 2 cols) */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">`;

careers = careers.replace(modalStartRegex, newModalTop);
careers = careers.replace(formSearch, formReplace);

// Also replace Row 2: Contact Phone & Total Experience to grid-cols-2
const row2Search = `{/* Row 2: Contact Phone & Total Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">`;

const row2Replace = `{/* Row 2: Contact Phone & Total Experience (Side-by-side 2 cols) */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">`;

careers = careers.replace(row2Search, row2Replace);

// Make textarea rows={2.5} on compact screens (rows={2} with className for smooth height)
careers = careers.replace('rows={3}', 'rows={2}');

// Make Resume upload box slightly more compact for mobile
const resumeUploadSearch = `<label
                    htmlFor="resume-upload"
                    className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border border-dashed border-slate-700/80 hover:border-sky-400/80 bg-[#040814]/50 cursor-pointer transition-all duration-200"
                  >`;

const resumeUploadReplace = `<label
                    htmlFor="resume-upload"
                    className="group relative flex flex-col items-center justify-center p-3 sm:p-4.5 rounded-xl border border-dashed border-slate-700/80 hover:border-sky-400/80 bg-[#040814]/50 cursor-pointer transition-all duration-200"
                  >`;

careers = careers.replace(resumeUploadSearch, resumeUploadReplace);

fs.writeFileSync(careersPath, careers, 'utf8');
console.log('Successfully updated careers modal to match Image 2 format!');

// 2. Update src/components/ui/BlueParticleTrail.tsx to stop drawing HUD reticle when modal is open
const particlePath = 'src/components/ui/BlueParticleTrail.tsx';
let particle = fs.readFileSync(particlePath, 'utf8');

if (!particle.includes('document.body.style.overflow === "hidden"')) {
  // Inside render function, right after ctx.clearRect
  const clearRectSearch = 'ctx.clearRect(0, 0, width, height);';
  const clearRectReplace = `ctx.clearRect(0, 0, width, height);

      // Do not render tactical HUD reticle over open modals or mobile drawers
      if (typeof document !== "undefined" && document.body.style.overflow === "hidden") {
        animId = requestAnimationFrame(render);
        return;
      }`;
  particle = particle.replace(clearRectSearch, clearRectReplace);
  fs.writeFileSync(particlePath, particle, 'utf8');
  console.log('Successfully updated BlueParticleTrail to hide reticle when modal is open!');
} else {
  console.log('BlueParticleTrail already has modal check.');
}

