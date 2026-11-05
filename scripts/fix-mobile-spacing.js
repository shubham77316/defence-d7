const fs = require('fs');

// Fix Defence mobile hero
{
  const file = 'd:/defence/src/app/defense-fix.txt';
}

function fix(filePath, imageHeight, letterSize) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Remove top padding from sticky container so image fills to top of viewport
  //    Change: "sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-center items-center px-4 overflow-hidden"
  //    To: "sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-start items-center pt-4 overflow-hidden"
  content = content.replace(
    'sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-center items-center px-4 overflow-hidden select-none',
    'sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-start items-center pt-3 overflow-hidden select-none'
  );

  // 2. Make image bigger - fill most of the screen height, remove fixed px height
  //    Change h-[200px] xs:h-[225px] to use calc of viewport minus nav + font space
  //    Use h-[calc(100dvh-9rem)] to give max height while leaving room for font and hint
  content = content.replace(
    'relative h-[200px] xs:h-[225px] w-full max-w-[420px] mx-auto flex items-center justify-center',
    'relative h-[calc(100dvh-11rem)] xs:h-[calc(100dvh-10rem)] w-full max-w-[420px] mx-auto flex items-center justify-center'
  );

  // 3. Move font position higher - change bottom-1 xs:bottom-2 to bottom-6 xs:bottom-8
  content = content.replace(
    'absolute bottom-1 xs:bottom-2 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none',
    'absolute bottom-5 xs:bottom-7 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', filePath);
}

fix('d:/defence/src/app/defence/page.tsx');
fix('d:/defence/src/app/aerospace/page.tsx');

