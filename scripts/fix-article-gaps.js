const fs = require('fs');

const newsPath = 'src/app/news/page.tsx';
let news = fs.readFileSync(newsPath, 'utf8');

// 1. Remove duplicate arrow in Back button
news = news.replaceAll(
  '<span>← Back to News &amp; Insights</span>',
  '<span>Back to News &amp; Insights</span>'
);

news = news.replaceAll(
  '<span>&larr; Back to News &amp; Insights</span>',
  '<span>Back to News &amp; Insights</span>'
);

// 2. Reduce gap below the Back button from mb-8 to mb-3.5 sm:mb-6
news = news.replaceAll(
  '{/* Top Back Button */}\n          <div className="mb-8">',
  '{/* Top Back Button */}\n          <div className="mb-3.5 sm:mb-6">'
);
news = news.replaceAll(
  '{/* Top Back Button */}\r\n          <div className="mb-8">',
  '{/* Top Back Button */}\r\n          <div className="mb-3.5 sm:mb-6">'
);

// Also for any plain <div className="mb-8">\n            <button\n              type="button"\n              onClick={() => setActiveArticleId(null)}
news = news.replaceAll(
  '<div className="mb-8">\n            <button\n              type="button"\n              onClick={() => setActiveArticleId(null)}',
  '<div className="mb-3.5 sm:mb-6">\n            <button\n              type="button"\n              onClick={() => setActiveArticleId(null)}'
);
news = news.replaceAll(
  '<div className="mb-8">\r\n            <button\r\n              type="button"\r\n              onClick={() => setActiveArticleId(null)}',
  '<div className="mb-3.5 sm:mb-6">\r\n            <button\r\n              type="button"\r\n              onClick={() => setActiveArticleId(null)}'
);

// Breadcrumb mb-8 in defence-systems
news = news.replaceAll(
  'className="mb-8 flex items-center gap-2 text-xs font-mono text-slate-400"',
  'className="mb-3.5 sm:mb-6 flex items-center gap-2 text-xs font-mono text-slate-400"'
);

// 3. Compact header section spacing
news = news.replaceAll(
  'className="mb-8 space-y-4"',
  'className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5"'
);
news = news.replaceAll(
  'className="mb-8 space-y-5"',
  'className="mb-4 sm:mb-7 space-y-2 sm:space-y-3.5"'
);

// 4. Reduce root top padding on mobile from pt-24 (96px) to pt-20 sm:pt-24 md:pt-28
news = news.replaceAll(
  'pt-24 sm:pt-28',
  'pt-20 sm:pt-24 md:pt-28'
);

// 5. Align defence-systems container to max-w-[1660px] mx-auto px-2.5 sm:px-5
news = news.replace(
  '<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">',
  '<div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">'
);

fs.writeFileSync(newsPath, news, 'utf8');
console.log('Successfully fixed article gaps and margins!');

