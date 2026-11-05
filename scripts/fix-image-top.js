const fs = require('fs');

function fixImageTop(filePath, lettersComment) {
  let c = fs.readFileSync(filePath, 'utf8');

  // 1. items-center -> items-start on image wrapper so image anchors to top
  c = c.replace(
    'w-full max-w-[420px] mx-auto flex items-center justify-center',
    'w-full max-w-[420px] mx-auto flex items-start justify-center'
  );

  // 2. Add object-top to Image className so the subject stays at top
  c = c.replace(
    'className="object-contain filter contrast-[1.08] brightness-[1.05]"',
    'className="object-contain object-top filter contrast-[1.08] brightness-[1.05]"'
  );

  fs.writeFileSync(filePath, c, 'utf8');
  console.log('Fixed:', filePath);
}

fixImageTop('d:/defence/src/app/defence/page.tsx');
fixImageTop('d:/defence/src/app/aerospace/page.tsx');

