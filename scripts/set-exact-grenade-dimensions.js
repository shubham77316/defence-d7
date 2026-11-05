const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetOld = `            {/* Image Card Frame preserving full 16:10 aspect ratio */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-sky-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.95)] bg-[#030712]">`;

const replacement = `            {/* Image Frame matching exact grenade dimensions: h-[185px] xs:h-[210px] */}
            <div className="relative w-full max-w-[420px] h-[185px] xs:h-[210px] overflow-hidden bg-[#030712]">`;

const normalizedTarget = targetOld.replace(/\r\n/g, '\n');
const normalizedContent = content.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const isCRLF = content.includes('\r\n');
  const finalReplacement = isCRLF ? replacement.replace(/\n/g, '\r\n') : replacement;
  const finalTarget = isCRLF ? targetOld.replace(/\n/g, '\r\n') : targetOld;
  content = content.replace(finalTarget, finalReplacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated image height & width to match grenade!');
} else {
  console.log('Target not found in content!');
}

