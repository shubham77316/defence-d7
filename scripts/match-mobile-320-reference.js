const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const oldMobileHero = `      {/* ── 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) ── */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[240vh] select-none">
        <div className="sticky top-14 z-30 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">
          {/* Tactical Image Box */}
          <div className="relative w-full max-w-[420px] mx-auto">
            {/* Responsive Only: Back to Home Button at Top-Left of Image */}
            <div className="absolute top-3 left-3 z-40 pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 h-8 px-3 text-[11px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#040814]/90 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
                <span>BACK TO HOME</span>
              </Link>
            </div>
            <Image
              src="/images/news-strategic-alliances.jpg"
              alt="Strategic Alliances & Affiliations"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
              sizes="(max-width: 640px) 100vw"
            />

            {/* AFFILIATIONS Letters Over The Image (Assemble one by one during scroll) */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[8%]">
              <h1 className="font-anton font-black uppercase text-[14.5vw] xs:text-[15.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible pb-1">
                {AFFILIATIONS_LETTERS.map((char, index) => (
                  <AffiliationScrollLetter
                    key={index}
                    char={char}
                    index={index}
                    total={AFFILIATIONS_LETTERS.length}
                    progress={mobileProgress}
                  />
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>`;

const newMobileHero = `      {/* ── 1. MOBILE RESPONSIVE HERO (sm:hidden - Pinned while fonts assemble one by one) ── */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[240vh] select-none">
        <div className="sticky top-14 z-30 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">
          {/* Tactical Image Box matching main website 320px reference */}
          <div className="relative w-full max-w-[420px] mx-auto rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            {/* Responsive Only: Back to Home Button at Top-Left of Image */}
            <div className="absolute top-2.5 left-2.5 z-40 pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 h-7 px-2.5 text-[10px] xs:text-[10.5px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#040814]/90 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto whitespace-nowrap"
              >
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
                <span>BACK TO HOME</span>
              </Link>
            </div>
            <Image
              src="/images/news-strategic-alliances.jpg"
              alt="Strategic Alliances & Affiliations"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05]"
              sizes="(max-width: 640px) 100vw"
            />

            {/* AFFILIATIONS Letters Over The Image (Resting cleanly at bottom edge, exactly as in reference) */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
              <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
                {AFFILIATIONS_LETTERS.map((char, index) => (
                  <AffiliationScrollLetter
                    key={index}
                    char={char}
                    index={index}
                    total={AFFILIATIONS_LETTERS.length}
                    progress={mobileProgress}
                  />
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>`;

c = c.replace(oldMobileHero, newMobileHero);
fs.writeFileSync(file, c, 'utf8');
console.log('Mobile hero updated to match 320px reference image perfectly!');

