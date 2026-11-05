const fs = require('fs');

const newsPath = 'src/app/news/page.tsx';
let news = fs.readFileSync(newsPath, 'utf8');

// 1. Fix the main content wrapper padding and max-w
news = news.replace(
  '<div className="relative z-10 w-full px-2.5 pt-8 sm:px-6 md:px-8 lg:px-12 xl:px-14">',
  '<div className="relative z-10 w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pt-4 sm:pt-12 pb-6 sm:pb-16 lg:pb-20">'
);

// 2. Fix Header Section motion.div: remove translate-x-2, adjust margins
news = news.replace(
  'className="mb-8 translate-x-2 sm:mb-10"',
  'className="mb-4 sm:mb-7"'
);

// 3. Spacing above title: block mb-3 -> block mb-1.5 sm:mb-2.5
news = news.replace(
  'text-sky-400 uppercase block mb-3',
  'text-sky-400 uppercase block mb-1.5 sm:mb-2.5'
);

// 4. Heading size on mobile: text-3xl sm:text-4xl -> text-2xl sm:text-4xl
news = news.replaceAll(
  'text-3xl sm:text-4xl md:text-5xl lg:text-[46px]',
  'text-2xl sm:text-4xl md:text-5xl lg:text-[46px]'
);

// 5. Category Filter Pills: remove translate-x-2, no-scrollbar, single-row on mobile, compact bottom margin
news = news.replace(
  'className="flex flex-wrap items-center gap-2.5 pb-4 mb-10 translate-x-2 sm:mb-12"',
  'className="flex items-center gap-2 overflow-x-auto pb-1 mb-5 sm:mb-8 no-scrollbar"'
);

// 6. Category pill padding on mobile: px-4 py-2 -> px-3.5 py-1.5 sm:px-4 sm:py-2
news = news.replace(
  'className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${',
  'className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${'
);

// 7. Articles Grid: remove translate-x-2, compact gap on mobile: gap-4 sm:gap-7
news = news.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 translate-x-2">',
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">'
);

// 8. Empty state: remove translate-x-2
news = news.replace(
  '<div className="text-center py-20 bg-[#050c1c]/40 rounded-2xl border border-slate-800 translate-x-2">',
  '<div className="text-center py-16 bg-[#050c1c]/40 rounded-2xl border border-slate-800">'
);

fs.writeFileSync(newsPath, news, 'utf8');
console.log('Successfully updated News spacing and margins!');

