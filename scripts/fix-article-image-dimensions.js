const fs = require('fs');

const newsPath = 'src/app/news/page.tsx';
let news = fs.readFileSync(newsPath, 'utf8');

// 1. Align all article containers with the Navbar logo: max-w-[1660px] mx-auto px-2.5 sm:px-5
const oldContainer = '<div className="relative z-10 w-full px-2.5 sm:px-6 md:px-8 lg:px-12 xl:px-14">';
const newContainer = '<div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">';

news = news.replaceAll(oldContainer, newContainer);

// 2. Increase the height of all article hero images
news = news.replaceAll(
  'h-[280px] sm:h-[440px]',
  'h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px]'
);

news = news.replaceAll(
  'h-[280px] sm:h-[400px]',
  'h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px]'
);

news = news.replaceAll(
  'h-[320px] sm:h-[480px] md:h-[560px]',
  'h-[340px] sm:h-[520px] md:h-[580px] lg:h-[640px]'
);

fs.writeFileSync(newsPath, news, 'utf8');
console.log('Successfully updated article hero image width (aligned with logo) and increased height!');

