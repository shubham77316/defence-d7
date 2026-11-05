const fs = require('fs');

const file = 'src/components/layout/Navbar.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add body scroll lock effect
const scrollLockTarget = `  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);`;

const scrollLockReplacement = `  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);`;

// 2. Update header z-index
code = code.replace(
  'className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${',
  'className={`fixed top-0 left-0 right-0 ${mobileMenuOpen ? "z-50" : "z-40"} transition-all duration-300 ${'
);

// 3. Replace mobile drawer
const oldDrawerStart = '{/* Mobile Drawer Menu */}';
const oldDrawerEnd = '    </header>';

const oldIdx = code.indexOf(oldDrawerStart);
const endIdx = code.indexOf(oldDrawerEnd);

if (oldIdx !== -1 && endIdx !== -1) {
  const newDrawer = `{/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 sm:top-16 bottom-0 z-50 bg-[#02050f]/98 backdrop-blur-3xl border-t border-sky-400/20 px-4 py-4 sm:px-6 sm:py-5 overflow-y-auto overscroll-contain animate-in fade-in duration-200">
          <div className="space-y-4 pb-36">
            <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Sovereign Tactical Navigation</span>
              <span className="text-sky-300 font-mono">SYS-ONLINE</span>
            </div>

            <nav className="space-y-1 sm:space-y-2">
              {activeNavLinks.map((item, idx) => {
                const targetHref = normalizeHref(item.href);
                const isExternal = checkIsExternal(item);

                return (
                  <div key={\`\${item.label}-\${item.href || ""}-\${idx}\`} className="border-b border-slate-900/60 pb-2">
                    {isExternal ? (
                      <a
                        href={targetHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-1.5 text-[15px] sm:text-base font-medium text-slate-200 hover:text-sky-300 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] uppercase px-1 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-400/30">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    ) : (
                      <Link
                        href={targetHref}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-1.5 text-[15px] sm:text-base font-medium text-slate-200 hover:text-sky-300 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] uppercase px-1 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-400/30">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <span className="text-xs font-mono text-sky-400/70">&rarr;</span>
                      </Link>
                    )}

                    {item.children && item.children.length > 0 && (
                      <div className="pl-4 mt-1 space-y-1 border-l border-sky-400/20">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={normalizeHref(child.href)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs text-slate-400 hover:text-sky-300 py-1 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="pt-5 border-t border-slate-800/80 space-y-3">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Sky Wardens
              </Button>
              <div className="text-center text-[10px] text-slate-400 font-mono tracking-wider">
                B2G &bull; DEFENCE &bull; AEROSPACE &bull; STRATEGIC CAPABILITY
              </div>
            </div>
          </div>
        </div>
      )}\n  `;

  code = code.slice(0, oldIdx) + newDrawer + code.slice(endIdx);
}

// Add the scroll lock effect if not present
if (!code.includes('Lock body scroll when mobile menu is open')) {
  code = code.replace(
    /(\/\/ Close mobile menu on route change[\s\S]*?setActiveDropdown\(null\);\s*\}, \[pathname\]\);)/,
    `$1\n\n  // Lock body scroll when mobile menu is open\n  useEffect(() => {\n    if (mobileMenuOpen) {\n      document.body.style.overflow = "hidden";\n    } else {\n      document.body.style.overflow = "";\n    }\n    return () => {\n      document.body.style.overflow = "";\n    };\n  }, [mobileMenuOpen]);`
  );
}

fs.writeFileSync(file, code, 'utf8');
console.log('Successfully updated Navbar.tsx!');

