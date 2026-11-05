const fs = require('fs');
const file = 'd:/defence/src/app/defence/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `          {/* Tactical Operator & Base Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
              fill
              priority
              className="object-cover object-center brightness-95 contrast-105"
              sizes="100vw"
            />
            {/* Subtle Top Gradient for Navbar legibility & Dark Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/60 via-transparent to-[#030712]/60 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
          </div>`;

const replacement = `          {/* Tactical Operator & Base Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center bg-[#030712]">
            <Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
              fill
              priority
              className="object-contain sm:object-cover object-center brightness-95 contrast-105"
              sizes="100vw"
            />
            {/* Subtle Top Gradient for Navbar legibility & Dark Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712] pointer-events-none" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#030712]/60 via-transparent to-[#030712]/60 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
          </div>`;

// Normalize newlines for replacement
const normalizedTarget = target.replace(/\r\n/g, '\n');
const normalizedContent = content.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const isCRLF = content.includes('\r\n');
  const finalReplacement = isCRLF ? replacement.replace(/\n/g, '\r\n') : replacement;
  const finalTarget = isCRLF ? target.replace(/\n/g, '\r\n') : target;
  content = content.replace(finalTarget, finalReplacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated defence hero image classes!');
} else {
  console.log('Target not found in content!');
}

