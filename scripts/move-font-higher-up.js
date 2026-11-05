const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetOld = `              {/* DEFENCE Letters Centered Exactly Where The Image Ends */}
              <div className="absolute -bottom-5 xs:-bottom-6 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
                <h1 className="font-anton font-black uppercase text-[17.5vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
                  {DEFENCE_LETTERS.map((char, index) => (
                    <DefenceScrollLetter
                      key={index}
                      char={char}
                      index={index}
                      total={DEFENCE_LETTERS.length}
                      progress={smoothProgress}
                    />
                  ))}
                </h1>
              </div>
            </div>

            {/* Scroll Hint directly below font */}
            <div className="w-full flex flex-col items-center pt-8 pb-2">`;

const replacement = `              {/* DEFENCE Letters Over The Image (Higher up over soldier's legs like reference) */}
              <div className="absolute bottom-1 xs:bottom-2 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none">
                <h1 className="font-anton font-black uppercase text-[18vw] xs:text-[19vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
                  {DEFENCE_LETTERS.map((char, index) => (
                    <DefenceScrollLetter
                      key={index}
                      char={char}
                      index={index}
                      total={DEFENCE_LETTERS.length}
                      progress={smoothProgress}
                    />
                  ))}
                </h1>
              </div>
            </div>

            {/* Scroll Hint directly below */}
            <div className="w-full flex flex-col items-center pt-3 pb-1">`;

const normalizedTarget = targetOld.replace(/\r\n/g, '\n');
const normalizedContent = content.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const isCRLF = content.includes('\r\n');
  const finalReplacement = isCRLF ? replacement.replace(/\n/g, '\r\n') : replacement;
  const finalTarget = isCRLF ? targetOld.replace(/\n/g, '\r\n') : targetOld;
  content = content.replace(finalTarget, finalReplacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully moved DEFENCE font higher up over the image!');
} else {
  console.log('Target not found!');
}

