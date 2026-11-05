const fs = require('fs');

const newsPath = 'src/app/news/page.tsx';
let news = fs.readFileSync(newsPath, 'utf8');

// Remove pb-20 from default view root container
news = news.replace(
  'font-sans pb-20 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>',
  'font-sans pb-0 selection:bg-sky-500 selection:text-slate-950" style={NEWS_BACKDROP_STYLE}>'
);

// Reduce bottom padding on main content wrapper above footer
news = news.replace(
  'pt-4 sm:pt-12 pb-6 sm:pb-16 lg:pb-20',
  'pt-4 sm:pt-12 pb-3 sm:pb-10 lg:pb-16'
);

// Also check article detail view root pb-20
news = news.replaceAll(
  'pb-20 selection:bg-sky-500',
  'pb-4 sm:pb-12 selection:bg-sky-500'
);

fs.writeFileSync(newsPath, news, 'utf8');
console.log('Successfully fixed News bottom gap above Footer!');

