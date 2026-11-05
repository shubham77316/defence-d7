const fs = require('fs');

const newsPath = 'src/app/news/page.tsx';
let news = fs.readFileSync(newsPath, 'utf8');

// Normalize line endings to find cleanly
const isCRLF = news.includes('\r\n');
const lines = news.split(/\r?\n/);

// Find index of NewsScrollLetter definition
let fnIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function NewsScrollLetter(')) {
    fnIndex = i;
    break;
  }
}

// Find index of end of NewsScrollLetter
let fnEndIndex = -1;
if (fnIndex !== -1) {
  for (let i = fnIndex; i < lines.length; i++) {
    if (lines[i].trim() === '}') {
      fnEndIndex = i;
      break;
    }
  }
}

console.log('fnIndex:', fnIndex, 'fnEndIndex:', fnEndIndex);

const mobileLetterLines = [
  '',
  'function NewsMobileScrollLetter({',
  '  char,',
  '  index,',
  '  total,',
  '  progress,',
  '}: {',
  '  char: string;',
  '  index: number;',
  '  total: number;',
  '  progress: MotionValue<number>;',
  '}) {',
  '  const start = 0.04 + index * 0.18;',
  '  const end = Math.min(start + 0.22, 0.94);',
  '',
  '  const x = useTransform(progress, [start, end], ["65vw", "0vw"], { clamp: true });',
  '  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.75, 1], { clamp: true });',
  '',
  '  return (',
  '    <motion.span',
  '      style={{ x, opacity }}',
  '      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"',
  '    >',
  '      {char}',
  '    </motion.span>',
  '  );',
  '}',
];

if (!news.includes('NewsMobileScrollLetter') && fnEndIndex !== -1) {
  lines.splice(fnEndIndex + 1, 0, ...mobileLetterLines);
}

// Find Hook index
let hookIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const newsHeroTrackRef = useRef<HTMLDivElement>(null);')) {
    hookIndex = i;
    break;
  }
}

console.log('hookIndex:', hookIndex);

const newHookLines = [
  '  const mobileNewsTrackRef = useRef<HTMLDivElement>(null);',
  '  const { scrollYProgress: mobileScrollYProgress } = useScroll({',
  '    target: mobileNewsTrackRef,',
  '    offset: ["start start", "end end"],',
  '  });',
  '  const mobileProgress = useSpring(mobileScrollYProgress, {',
  '    stiffness: 140,',
  '    damping: 24,',
  '    restDelta: 0.001,',
  '  });',
];

if (!news.includes('mobileNewsTrackRef') && hookIndex !== -1) {
  lines.splice(hookIndex + 1, 0, ...newHookLines);
}

// Find default view hero section: "{/* Cinematic sticky scroll hero */}"
let heroLineIndex = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes('Cinematic sticky scroll hero')) {
    heroLineIndex = i;
    break;
  }
}

console.log('heroLineIndex:', heroLineIndex);

if (heroLineIndex !== -1) {
  // Check lines[heroLineIndex + 1] has div ref={newsHeroTrackRef}
  const mobileHeroBlock = [
    '      {/* ========================================================================= */}',
    '      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Matching Defence exact mobile layout) */}',
    '      {/* ========================================================================= */}',
    '      <div ref={mobileNewsTrackRef} className="sm:hidden relative w-full h-[240vh] select-none">',
    '        <div className="sticky top-14 z-30 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">',
    '          {/* Tactical Image Box */}',
    '          <div className="relative w-full max-w-[420px] mx-auto">',
    '            {/* Responsive Only: Back to Home Button at Top-Left of Image */}',
    '            <div className="absolute top-2.5 left-2.5 z-40 pointer-events-auto">',
    '              <Link',
    '                href="/"',
    '                className="inline-flex items-center justify-center gap-1.5 h-7 px-2.5 text-[10px] xs:text-[10.5px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#040814]/90 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto whitespace-nowrap"',
    '              >',
    '                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />',
    '                <span>BACK TO HOME</span>',
    '              </Link>',
    '            </div>',
    '            <Image',
    '              src="/images/news-advanced-systems.jpg"',
    '              alt="Mission control team reviewing orbital defence updates"',
    '              width={900}',
    '              height={600}',
    '              priority',
    '              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"',
    '              sizes="(max-width: 640px) 100vw"',
    '            />',
    '',
    '            {/* NEWS Letters Over The Image (Assemble one by one during scroll) */}',
    '            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">',
    '              <h1 className="font-anton font-black uppercase text-[24vw] xs:text-[25vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">',
    '                {NEWS_LETTERS.map((char, index) => (',
    '                  <NewsMobileScrollLetter',
    '                    key={index}',
    '                    char={char}',
    '                    index={index}',
    '                    total={NEWS_LETTERS.length}',
    '                    progress={mobileProgress}',
    '                  />',
    '                ))}',
    '              </h1>',
    '            </div>',
    '          </div>',
    '        </div>',
    '      </div>',
    '',
    '      {/* ========================================================================= */}',
    '      {/* 2. DESKTOP CINEMATIC STICKY SCROLL TRACK (hidden sm:block)                */}',
    '      {/* ========================================================================= */}',
  ];

  // Update the line with ref={newsHeroTrackRef} to have hidden sm:block
  for (let j = heroLineIndex; j < heroLineIndex + 5; j++) {
    if (lines[j].includes('ref={newsHeroTrackRef}')) {
      lines[j] = lines[j].replace('className="relative z-10', 'className="hidden sm:block relative z-10');
      break;
    }
  }

  // Replace comment line with mobileHeroBlock
  lines.splice(heroLineIndex, 1, ...mobileHeroBlock);
}

const glue = isCRLF ? '\r\n' : '\n';
fs.writeFileSync(newsPath, lines.join(glue), 'utf8');
console.log('Successfully written updated news page with exact defence mobile layout!');
