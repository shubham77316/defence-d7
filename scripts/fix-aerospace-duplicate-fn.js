const fs = require('fs');
const file = 'd:/defence/src/app/aerospace/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const badFull = `function AerospaceScrollLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.04 + index * 0.085;
  const end = Math.min(start + 0.16, 0.94);

  const x = useTransform(progress, [start, end], ["65vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.75, 1], { clamp: true });

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"
    >
      {char}
    </motion.span>
  );
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // All letters assemble together simultaneously ("ak sath sab font aajaye")
  const start = 0.02;
  const end = 0.22;

  const x = useTransform(progress, [start, end], ["50vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.8, 1], { clamp: true });

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"
    >
      {char}
    </motion.span>
  );
}`;

const goodFull = `function AerospaceScrollLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.04 + index * 0.085;
  const end = Math.min(start + 0.16, 0.94);

  const x = useTransform(progress, [start, end], ["65vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.75, 1], { clamp: true });

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"
    >
      {char}
    </motion.span>
  );
}`;

if (content.includes(badFull)) {
  content = content.replace(badFull, goodFull);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Aerospace fixed: duplicate function body removed');
} else {
  console.log('Pattern not found in aerospace');
}

