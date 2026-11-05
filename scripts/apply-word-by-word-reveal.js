const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Add RevealWord component at top if not present
const revealWordComponent = `function RevealWord({
  text,
  range,
  progress,
}: {
  text: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const color = useTransform(
    progress,
    [range[0] - 0.05, range[0], range[1]],
    ["rgba(255, 255, 255, 0.28)", "rgba(255, 255, 255, 0.28)", "rgba(255, 255, 255, 1)"],
    { clamp: true }
  );
  const opacity = useTransform(
    progress,
    [range[0] - 0.05, range[0], range[1]],
    [0.35, 0.35, 1],
    { clamp: true }
  );

  return (
    <motion.span
      style={{ color, opacity }}
      className="inline-block transition-colors will-change-transform"
    >
      {text}
    </motion.span>
  );
}
`;

if (!c.includes('function RevealWord')) {
  c = c.replace('// --- Vector Logos matching the reference aesthetic ---', revealWordComponent + '\n// --- Vector Logos matching the reference aesthetic ---');
}

// 2. Add scroll container ref for Industrial Relationships section
if (!c.includes('const headingRevealRef = useRef')) {
  c = c.replace(
    '  const { scrollYProgress: mobileScrollYProgress } = useScroll({',
    `  const headingRevealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingRevealProgress } = useScroll({
    target: headingRevealRef,
    offset: ["start 80%", "end 45%"],
  });
  const smoothHeadingProgress = useSpring(headingRevealProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const { scrollYProgress: mobileScrollYProgress } = useScroll({`
  );
}

// 3. Update the Section Header with RevealWord and center alignment
const oldHeader = `          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                AFFILIATIONS
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
              INDUSTRIAL RELATIONSHIPS. <br />
              GLOBAL CAPABILITY.
            </h1>
          </motion.div>`;

const newHeader = `          {/* Section Header with Word-by-Word Scroll Reveal and Centered Layout */}
          <div ref={headingRevealRef} className="space-y-4 text-center flex flex-col items-center justify-center py-6">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                AFFILIATIONS
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight select-none">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <RevealWord text="INDUSTRIAL" range={[0.05, 0.35]} progress={smoothHeadingProgress} />
                <RevealWord text="RELATIONSHIPS." range={[0.25, 0.55]} progress={smoothHeadingProgress} />
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap mt-1">
                <RevealWord text="GLOBAL" range={[0.50, 0.75]} progress={smoothHeadingProgress} />
                <RevealWord text="CAPABILITY." range={[0.70, 0.95]} progress={smoothHeadingProgress} />
              </div>
            </h1>
          </div>`;

c = c.replace(/\r\n/g, '\n');
const normOld = oldHeader.replace(/\r\n/g, '\n');
const normNew = newHeader.replace(/\r\n/g, '\n');

if (c.includes(normOld)) {
  c = c.replace(normOld, normNew);
  console.log('Heading replaced with centered RevealWord effect!');
} else {
  console.log('Old header target NOT found');
}

fs.writeFileSync(file, c, 'utf8');
console.log('Done updating partnerships page with word-by-word reveal!');

