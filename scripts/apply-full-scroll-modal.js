const fs = require('fs');

// 1. Update src/app/careers/page.tsx
const careersPath = 'src/app/careers/page.tsx';
let careersContent = fs.readFileSync(careersPath, 'utf8');

const targetModalBlock = `{/* Application Modal (Matching Candidate Submission Dossier design) */}
      {applyModalRole && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setApplyModalRole(null)}
        >
          <div
            className="relative w-full max-w-2xl sm:max-w-3xl bg-[#060b17] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain my-auto"
            onClick={(e) => e.stopPropagation()}
          >`;

const replacementModalBlock = `{/* Application Modal (Matching Candidate Submission Dossier design) */}
      {applyModalRole && (
        <div
          className="fixed inset-0 z-[100000] overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md p-3 sm:p-6"
          onClick={() => setApplyModalRole(null)}
        >
          <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
            <div
              className="relative w-full max-w-2xl sm:max-w-3xl bg-[#060b17] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-auto"
              onClick={(e) => e.stopPropagation()}
            >`;

// Also add a close wrapper div before the end of the modal:
// Look for the end of the modal:
const endTarget = `              </form>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}`;

const endReplacement = `              </form>
            )}
          </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}`;

if (careersContent.includes(targetModalBlock)) {
  careersContent = careersContent.replace(targetModalBlock, replacementModalBlock);
  careersContent = careersContent.replace(endTarget, endReplacement);
  fs.writeFileSync(careersPath, careersContent, 'utf8');
  console.log('Successfully updated careers modal for full top-to-bottom scroll!');
} else {
  console.log('Target modal block not found directly, checking normalized content...');
  // Check if already replaced or alternate whitespace
}

// 2. Update src/components/layout/Navbar.tsx header z-index when mobileMenuOpen
const navbarPath = 'src/components/layout/Navbar.tsx';
let navbarContent = fs.readFileSync(navbarPath, 'utf8');
navbarContent = navbarContent.replace(
  '${mobileMenuOpen ? "z-50" : "z-40"}',
  '${mobileMenuOpen ? "z-[100000]" : "z-40"}'
);
fs.writeFileSync(navbarPath, navbarContent, 'utf8');
console.log('Successfully updated Navbar z-index to z-[100000] for mobile menu!');

