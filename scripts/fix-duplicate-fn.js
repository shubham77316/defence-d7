const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove the duplicate bad function body inserted by the broken revert script
// Lines 35-57 contain "  );\n}: {\n  char:..." which is the mangled duplicate
// We need to replace the whole DefenceScrollLetter function with the correct one

const badFull = `function DefenceScrollLetter({
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
  const start = 0.04 + index * 0.11;
  const end = Math.min(start + 0.18, 0.94);

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

const goodFull = `function DefenceScrollLetter({
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
  const start = 0.04 + index * 0.11;
  const end = Math.min(start + 0.18, 0.94);

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
  console.log('Fixed: duplicate function body removed');
} else {
  console.log('Pattern not found - trying line-by-line approach');
  // fallback: just remove lines 36-57 by line number
  const lines = content.split('\n');
  // lines are 0-indexed, so line 36 = index 35, line 57 = index 56
  // The bad duplicate starts with "}: {" after the first return statement
  let startBad = -1, endBad = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '}: {' && i > 30 && i < 60) {
      startBad = i;
    }
    // The second closing brace after the duplicate function ends
    if (startBad !== -1 && lines[i].trim() === '}' && i > startBad + 15) {
      endBad = i;
      break;
    }
  }
  if (startBad !== -1 && endBad !== -1) {
    lines.splice(startBad, endBad - startBad + 1);
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    console.log(`Fallback: removed lines ${startBad+1} to ${endBad+1}`);
  } else {
    console.log('Could not find bad block');
  }
}

