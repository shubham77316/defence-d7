const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix 1: Change the outer container for defence-systems article from full-width to max-w-4xl centered (like aerospace)
const oldContainer = `        <div className="relative z-10 w-full px-2.5 sm:px-6 md:px-8 lg:px-12 xl:px-14">\r\n          {/* Breadcrumb nav */}`;
const newContainer = `        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">\r\n          {/* Breadcrumb nav */}`;
content = content.replace(oldContainer, newContainer);

// Fix 2: Make hero image full-bleed, taller, no rounded corners, object-top
const oldImg = `            {/* Full-width hero image below heading */}\r\n            <div className="relative w-full h-[280px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">\r\n              <Image\r\n                src="/images/tactical-defense-operator.jpg"\r\n                alt="Specialist engineer analyzing tactical defence command telemetry"\r\n                fill\r\n                priority\r\n                className="object-cover"\r\n              />\r\n            </div>`;
const newImg = `            {/* Full-bleed hero image below heading */}\r\n            <div className="relative w-full h-[320px] sm:h-[480px] md:h-[560px] overflow-hidden shadow-2xl">\r\n              <Image\r\n                src="/images/tactical-defense-operator.jpg"\r\n                alt="Specialist engineer analyzing tactical defence command telemetry"\r\n                fill\r\n                priority\r\n                className="object-cover object-top"\r\n              />\r\n              <div className="absolute inset-0 bg-gradient-to-t from-[#02050e]/60 via-transparent to-transparent" />\r\n            </div>`;

if (content.includes(oldImg)) {
  content = content.replace(oldImg, newImg);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Done - image updated to full-bleed tall responsive format');
} else {
  console.log('ERROR: image block not found');
}

