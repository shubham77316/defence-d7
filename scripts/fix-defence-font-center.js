const fs = require('fs');

const file = 'd:/defence/src/app/defence/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// Change image wrapper: use aspect ratio instead of fixed height
// So container height == image height exactly (no empty space above/below)
// Then font at bottom-[10%] sits at the visible bottom of the image
c = c.replace(
  'relative h-[calc(100dvh-11rem)] xs:h-[calc(100dvh-10rem)] w-full max-w-[420px] mx-auto flex items-start justify-center',
  'relative w-full px-2 mx-auto'
);

// Change sticky container padding to push image down just below navbar
c = c.replace(
  'sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-start items-center pt-3 overflow-hidden select-none',
  'sticky top-14 h-[calc(100dvh-3.5rem)] w-full flex flex-col justify-center items-center px-2 overflow-hidden select-none'
);

// Change Image to use natural aspect ratio
// Replace fill + object-top with width/height that allow natural ratio
c = c.replace(
  `<Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
              fill
              priority
              className="object-contain object-top filter contrast-[1.08] brightness-[1.05]"
              sizes="(max-width: 640px) 100vw, 420px"
            />`,
  `<Image
              src="/images/defence-tactical-soldier-hero.jpg"
              alt="Tactical Defence Systems and Personnel"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
              sizes="(max-width: 640px) 100vw"
            />`
);

// Position font: absolute at bottom of the relative container (which now = image bottom)
// Use bottom-0 translate-y-[-20%] to place it slightly above bottom edge of image
c = c.replace(
  'absolute bottom-5 xs:bottom-7 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none',
  'absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[25%]'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Done');

