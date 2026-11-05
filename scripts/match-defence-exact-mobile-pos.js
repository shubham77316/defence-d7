const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const oldMobileHero = `          {/* Tactical Image Box matching main website 320px reference */}
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
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[5%]">
              <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">`;

const newMobileHero = `          {/* Tactical Image Box matching Defence and Aerospace exact layout */}
          <div className="relative w-full max-w-[420px] mx-auto">
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
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
              sizes="(max-width: 640px) 100vw"
            />

            {/* AFFILIATIONS Letters Over The Image (Centered exactly where image ends, like Defence) */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
              <h1 className="font-anton font-black uppercase text-[15.5vw] xs:text-[16.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">`;

c = c.replace(oldMobileHero, newMobileHero);
fs.writeFileSync(file, c, 'utf8');
console.log('Mobile hero updated with exact Defence bottom positioning (translate-y-[10%])!');

