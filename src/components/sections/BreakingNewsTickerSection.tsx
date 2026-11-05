"use client";

import { motion } from "framer-motion";

const TICKER_TEXT = "SPOTLIGHT: SKY WARDENS MAKING HEADLINES";

export default function BreakingNewsTickerSection() {
  const displayList = Array.from({ length: 8 }, (_, idx) => idx);

  return (
    <section className="relative w-full overflow-hidden bg-[#125386] py-3 sm:py-4 select-none z-20">
      <div className="flex overflow-hidden relative w-full items-center">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 28,
          }}
          className="flex items-center gap-6 sm:gap-8 md:gap-10 flex-nowrap will-change-transform whitespace-nowrap"
        >
          {displayList.map((idx) => (
            <div
              key={`ticker-${idx}`}
              className="flex items-center gap-3 sm:gap-4 flex-shrink-0 text-sm sm:text-base font-sans font-bold tracking-[0.08em] uppercase"
            >
              <span className="text-white font-bold">
                {TICKER_TEXT}
              </span>
              <span aria-hidden="true" className="w-2.5 h-2.5 bg-black flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
