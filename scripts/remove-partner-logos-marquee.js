const fs = require('fs');

const file = 'd:/defence/src/app/partnerships/page.tsx';
let c = fs.readFileSync(file, 'utf8');

const targetMarquee = `          {/* Logo Affiliations Row - Infinite Smooth Rightward Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-4 border-y border-white/10 bg-[#060a14]/75 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#010309] via-[#010309]/80 to-transparent z-20 pointer-events-none rounded-l-2xl" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#010309] via-[#010309]/80 to-transparent z-20 pointer-events-none rounded-r-2xl" />

            <div className="flex overflow-hidden select-none">
              <motion.div
                className="flex items-center gap-10 sm:gap-16 flex-nowrap"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 48, ease: "linear", repeat: Infinity }}
              >
                {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((p, idx) => {
                  const Comp = p.component;
                  return (
                    <div key={`marquee-${idx}`} className="flex-shrink-0">
                      <Comp />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>`;

c = c.replace(/\r\n/g, '\n');
const normTarget = targetMarquee.replace(/\r\n/g, '\n');

if (c.includes(normTarget)) {
  c = c.replace(normTarget, '');
  console.log('Partner logos marquee strip removed successfully!');
} else {
  console.log('Target marquee NOT matched');
}

fs.writeFileSync(file, c, 'utf8');

