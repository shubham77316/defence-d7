"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function AboutContent() {
  const { settings } = useSettings();
  const heroTrackRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  // Scroll-driven straightening animation in pinned hero track:
  // CARD 1: Rotates from -8.5deg to 0deg during first phase (0 -> 0.20)
  const rawRotate1 = useTransform(scrollYProgress, [0, 0.20], [-8.5, 0]);
  const smoothRotate1 = useSpring(rawRotate1, {
    stiffness: 110,
    damping: 24,
    mass: 0.25,
  });

  const rawScale1 = useTransform(scrollYProgress, [0, 0.20, 0.25, 0.45], [0.96, 1, 1, 0.965]);
  const smoothScale1 = useSpring(rawScale1, {
    stiffness: 110,
    damping: 24,
    mass: 0.25,
  });

  const rawOpacity1 = useTransform(scrollYProgress, [0.38, 0.46], [1, 0.65]);
  const smoothOpacity1 = useSpring(rawOpacity1, {
    stiffness: 110,
    damping: 24,
  });

  // CARD 2 (Precision, Protect & Progress): 0.22 -> 0.45
  const rawY2 = useTransform(scrollYProgress, [0.22, 0.45], [950, 0]);
  const smoothY2 = useSpring(rawY2, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawRotate2 = useTransform(scrollYProgress, [0.22, 0.32, 0.45], [-16, -14, 0]);
  const smoothRotate2 = useSpring(rawRotate2, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawScale2 = useTransform(scrollYProgress, [0.22, 0.45, 0.50, 0.70], [0.96, 1, 1, 0.965]);
  const smoothScale2 = useSpring(rawScale2, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawOpacity2 = useTransform(scrollYProgress, [0.20, 0.24, 0.63, 0.71], [0, 1, 1, 0.65]);
  const smoothOpacity2 = useSpring(rawOpacity2, {
    stiffness: 120,
    damping: 25,
  });

  // CARD 3 (An Indigenous Defence Solutions Partner): 0.47 -> 0.70
  const rawY3 = useTransform(scrollYProgress, [0.47, 0.70], [950, 0]);
  const smoothY3 = useSpring(rawY3, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawRotate3 = useTransform(scrollYProgress, [0.47, 0.57, 0.70], [-16, -14, 0]);
  const smoothRotate3 = useSpring(rawRotate3, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawScale3 = useTransform(scrollYProgress, [0.47, 0.70, 0.75, 0.95], [0.96, 1, 1, 0.965]);
  const smoothScale3 = useSpring(rawScale3, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawOpacity3 = useTransform(scrollYProgress, [0.45, 0.49, 0.88, 0.96], [0, 1, 1, 0.65]);
  const smoothOpacity3 = useSpring(rawOpacity3, {
    stiffness: 120,
    damping: 25,
  });

  // CARD 4 (Built on Innovation, Certifications & Strategic Partnerships): 0.72 -> 0.95
  const rawY4 = useTransform(scrollYProgress, [0.72, 0.95], [950, 0]);
  const smoothY4 = useSpring(rawY4, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawRotate4 = useTransform(scrollYProgress, [0.72, 0.82, 0.95], [-16, -14, 0]);
  const smoothRotate4 = useSpring(rawRotate4, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawScale4 = useTransform(scrollYProgress, [0.72, 0.95], [0.96, 1]);
  const smoothScale4 = useSpring(rawScale4, {
    stiffness: 95,
    damping: 22,
    mass: 0.28,
  });

  const rawOpacity4 = useTransform(scrollYProgress, [0.70, 0.74], [0, 1]);
  const smoothOpacity4 = useSpring(rawOpacity4, {
    stiffness: 120,
    damping: 25,
  });

  return (
    <div className="relative min-h-screen pb-6 sm:pb-12 bg-[#030712] overflow-x-clip text-white selection:bg-sky-500/30 selection:text-sky-200">
      {/* Precision Engineering Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }}
      />

      {/* ========================================================================= */}
      {/* HERO SECTION: PINNED STICKY TRACK (4-Card Stacked Deck Scroll Animation)  */}
      {/* ========================================================================= */}
      <div ref={heroTrackRef} className="relative w-full h-[450vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-x-clip pt-16 sm:pt-20 pb-4 px-2.5 sm:px-6 md:px-8 lg:px-12 xl:px-14">
          {/* Back to Home Button */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-14 z-30 pointer-events-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 py-1.5 px-3.5 rounded-lg bg-[#040814]/80 hover:bg-[#071329] border border-cyan-400/30 hover:border-cyan-300/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
              <span>BACK TO HOME</span>
            </Link>
          </div>
          
          {/* Giant Monumental Background Typography: ABOUT US */}
          <div className="w-full flex justify-center items-center select-none pointer-events-none pb-2 sm:pb-4 overflow-visible">
            <h1 className="font-anton font-black uppercase text-[21vw] sm:text-[23.5vw] md:text-[25vw] lg:text-[26vw] xl:text-[26.8vw] 2xl:text-[27.2vw] tracking-[-0.015em] sm:tracking-[-0.02em] leading-[0.76] text-center bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent whitespace-nowrap mx-auto w-full">
              ABOUT US
            </h1>
          </div>

          {/* Overlapping Card Stack Container (Holds all 4 Cards in exact same coordinates) */}
          <div className="relative w-full max-w-6xl mx-auto -mt-10 sm:-mt-16 md:-mt-24 lg:-mt-36 xl:-mt-48 z-20">
            
            {/* =================================================================== */}
            {/* CARD 1: Hero Box (A Company Built Around Capability and Trust)      */}
            {/* =================================================================== */}
            <motion.div
              style={{ rotate: smoothRotate1, scale: smoothScale1, opacity: smoothOpacity1 }}
              className="relative w-full z-10 origin-center rounded-none overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.95)] border border-white/20 will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] sm:min-h-[500px]">
                
                {/* LEFT HALF: Luminous Ice-Cyan Panel */}
                <div className="lg:col-span-7 bg-gradient-to-br from-[#f0f7ff] via-[#e3f1fc] to-[#d4ebfa] text-[#051329] p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284c7]/10 border border-[#0284c7]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#0284c7]">
                        ABOUT SKY WARDENS GROUP
                      </span>
                    </div>

                    <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#051329] leading-[1.12]">
                      A Company Built Around Capability and Trust
                    </h2>

                    <p className="text-[#253f5e] text-sm sm:text-base md:text-[17px] leading-relaxed font-normal pt-1 max-w-xl">
                      Sky Wardens combines engineering focus, manufacturing depth, and disciplined execution to support high-stakes defence and industrial environments.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/capabilities"
                      className="group/btn inline-flex items-center gap-4 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#051329] hover:bg-[#0c2247] text-white text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-300 shadow-[0_6px_20px_rgba(5,19,41,0.25)] hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>Explore Capabilities</span>
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7ec8ff] text-[#051329] flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-sm">
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </Link>
                  </div>

                </div>

                {/* RIGHT HALF: Stealth Jet Visual Image */}
                <div className="hidden lg:block lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-[#030917]">
                  <Image
                    src="/images/footer-stealth-jet.jpg"
                    alt="Sky Wardens Tactical Defence"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>

              </div>
            </motion.div>

            {/* =================================================================== */}
            {/* CARD 2: Precision, Protect & Progress                               */}
            {/* =================================================================== */}
            <motion.div
              style={{
                y: smoothY2,
                rotate: smoothRotate2,
                scale: smoothScale2,
                opacity: smoothOpacity2,
              }}
              className="absolute inset-0 w-full z-20 origin-center rounded-none overflow-hidden shadow-[0_45px_120px_rgba(0,0,0,0.98)] border border-white/25 will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
                
                {/* Visual Panel: Image on Left */}
                <div className="hidden lg:block order-2 lg:order-1 lg:col-span-5 relative min-h-[240px] sm:min-h-[280px] lg:min-h-full overflow-hidden bg-[#030917]">
                  <Image
                    src="/images/about-defense-portal.jpg"
                    alt="Sky Wardens Precision Defence"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>

                {/* Text Panel: Ice-Cyan on Right */}
                <div className="order-1 lg:order-2 lg:col-span-7 bg-gradient-to-br from-[#f0f7ff] via-[#e3f1fc] to-[#d4ebfa] text-[#051329] p-4 sm:p-5 md:p-6 lg:p-6 pb-5 sm:pb-6 flex flex-col justify-between">
                  
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#0284c7]/10 border border-[#0284c7]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-[#0284c7]">
                        ABOUT SKY WARDENS
                      </span>
                    </div>

                    <h2 className="font-sans text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-black tracking-tight text-[#051329] leading-tight">
                      PRECISION, PROTECT &amp; PROGRESS
                    </h2>

                    <div className="space-y-1 sm:space-y-1.5 text-[#253f5e] text-[10.5px] sm:text-[11px] md:text-[11.5px] lg:text-[12px] leading-[1.35] sm:leading-[1.4] font-normal pt-0.5">
                      <p>
                        As a dynamic and forward-looking company, {settings.companyName || "Sky Wardens Alliance Private Limited"} is redefining the standards of the defence and industrial sectors. With innovation and quality at the core of our operations, we specialise in the manufacturing and supply of advanced military, tactical, and industrial solutions designed to meet the highest standards of performance, reliability, and operational excellence.
                      </p>
                      <p>
                        Driven by a vision to address the evolving needs of defence and civil organisations, we have expanded our capabilities into aerospace systems and advanced electronic solutions. Our Aerospace division focuses on drone development and space-oriented technologies, while our Advanced Systems division delivers cutting-edge electronic equipment for both defence and civilian applications, including communication systems and electronic warfare support.
                      </p>
                      <p>
                        Further strengthening our capabilities, our growing range of products, together with the expertise and offerings of our affiliates, has significantly expanded our portfolio. This enables us to provide a broader, more advanced, and highly diversified range of solutions tailored to the complex requirements of modern industries and strategic sectors.
                      </p>
                      <p>
                        The company remains committed to excellence at every stage, delivering more than just products by providing dependable solutions that protect, empower, and drive progress for every client. Each offering is developed under stringent quality control standards, ensuring superior performance, durability, and operational readiness.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 shrink-0">
                    <Link
                      href="#mission"
                      className="group/btn inline-flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#051329] hover:bg-[#0c2247] text-white text-xs sm:text-[13px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-[0_6px_20px_rgba(5,19,41,0.25)] hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>Our Mission &amp; Vision</span>
                      <span className="w-6 h-6 rounded-full bg-[#7ec8ff] text-[#051329] flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-sm">
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>

            {/* =================================================================== */}
            {/* CARD 3: An Indigenous Defence Solutions Partner                     */}
            {/* =================================================================== */}
            <motion.div
              style={{
                y: smoothY3,
                rotate: smoothRotate3,
                scale: smoothScale3,
                opacity: smoothOpacity3,
              }}
              className="absolute inset-0 w-full z-30 origin-center rounded-none overflow-hidden shadow-[0_45px_120px_rgba(0,0,0,0.98)] border border-white/25 will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
                
                {/* Text Panel: Ice-Cyan on Left */}
                <div className="lg:col-span-7 bg-gradient-to-br from-[#f0f7ff] via-[#e3f1fc] to-[#d4ebfa] text-[#051329] p-6 sm:p-8 md:p-9 lg:p-10 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-3 sm:space-y-3.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284c7]/10 border border-[#0284c7]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#0284c7]">
                        02 • ABOUT US
                      </span>
                    </div>

                    <h2 className="font-sans text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-black tracking-tight text-[#051329] leading-snug">
                      AN INDIGENOUS DEFENCE SOLUTIONS PARTNER
                    </h2>

                    <div className="space-y-2.5 text-[#253f5e] text-xs sm:text-[13px] md:text-[13.5px] leading-relaxed font-normal pt-1">
                      <p>
                        Sky Wardens Alliance Private Limited is an indigenous defence and industrial solutions company focused on innovation, precision, and manufacturing excellence. As part of the Sky Wardens Group, we are committed to supporting the evolving requirements of defence forces and allied sectors through reliable, future-ready solutions.
                      </p>
                      <p>
                        Our core manufacturing line includes drones, tactical defence products, electronic warfare support systems, communication systems, and high-end petrochem lubricant oils. We are continuously expanding our portfolio to offer more advanced, diversified, and strategically relevant solutions across defence, aerospace, and industrial domains in which every product is developed under stringent quality control standards.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 shrink-0">
                    <Link
                      href="/capabilities"
                      className="group/btn inline-flex items-center gap-4 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#051329] hover:bg-[#0c2247] text-white text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-300 shadow-[0_6px_20px_rgba(5,19,41,0.25)] hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>Explore Capabilities</span>
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7ec8ff] text-[#051329] flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-sm">
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </Link>
                  </div>

                </div>

                {/* Visual Panel: Tactical Operator Image on Right */}
                <div className="hidden lg:block lg:col-span-5 relative min-h-[260px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-[#030917]">
                  <Image
                    src="/images/tactical-defense-operator.jpg"
                    alt="Indigenous Defence Solutions"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>

              </div>
            </motion.div>

            {/* =================================================================== */}
            {/* CARD 4: Built on Innovation, Certifications & Partnerships         */}
            {/* =================================================================== */}
            <motion.div
              style={{
                y: smoothY4,
                rotate: smoothRotate4,
                scale: smoothScale4,
                opacity: smoothOpacity4,
              }}
              className="absolute inset-0 w-full z-40 origin-center rounded-none overflow-hidden shadow-[0_45px_120px_rgba(0,0,0,0.98)] border border-white/25 will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
                
                {/* Visual Panel: Stealth Fighter Hangar Image on Left */}
                <div className="hidden lg:block order-2 lg:order-1 lg:col-span-5 relative min-h-[260px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-[#030917]">
                  <Image
                    src="/images/stealth-fighter-hangar.jpg"
                    alt="Innovation & Strategic Partnerships"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>

                {/* Text Panel: Ice-Cyan on Right */}
                <div className="order-1 lg:order-2 lg:col-span-7 bg-gradient-to-br from-[#f0f7ff] via-[#e3f1fc] to-[#d4ebfa] text-[#051329] p-6 sm:p-8 md:p-9 lg:p-10 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-3 sm:space-y-3.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284c7]/10 border border-[#0284c7]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#0284c7]">
                        03 • OUR WORKFORCE &amp; CORE COMPETENCIES
                      </span>
                    </div>

                    <h2 className="font-sans text-xl sm:text-2xl md:text-[24px] lg:text-[26px] font-black tracking-tight text-[#051329] leading-snug">
                      BUILT ON INNOVATION, CERTIFICATIONS &amp; STRATEGIC PARTNERSHIPS
                    </h2>

                    <div className="space-y-2.5 text-[#253f5e] text-xs sm:text-[13px] md:text-[13.5px] leading-relaxed font-normal pt-1">
                      <p>
                        Our commitment to innovation has enabled us to develop over 10+ proprietary product blueprints and file multiple patents across ballistics, chemical technologies, and advanced electronics. Our pioneering achievements also include the launch of India&apos;s first drone-dropped fire suppression unit.
                      </p>
                      <p>
                        Our strategic partnerships with leading government agencies, DRDO, CSIR, and Tri-Service Headquarters (Army, Navy, Air Force) continue to strengthen our operational growth. Backed by ISO-certified facilities, we are proud to be officially registered vendors with DRDO and the Indian Army (Procurement Trials).
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 shrink-0">
                    <Link
                      href="/capabilities"
                      className="group/btn inline-flex items-center gap-4 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#051329] hover:bg-[#0c2247] text-white text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-300 shadow-[0_6px_20px_rgba(5,19,41,0.25)] hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>Explore Capabilities</span>
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7ec8ff] text-[#051329] flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-sm">
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTENT: Split Layout, Cards, Mission/Vision, Group of Sectors            */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5 space-y-8 sm:space-y-16 mt-4 sm:mt-14">

        {/* ========================================================================= */}
        {/* SECTION: MISSION & VISION                                                 */}
        {/* ========================================================================= */}
        <div id="mission" className="pt-4 sm:pt-8 space-y-4 sm:space-y-6 scroll-mt-28">
          
          {/* Editorial Split Header & Description (Clean - No Outer Box) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full pt-2 sm:pt-4 pb-2 sm:pb-3"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              
              {/* Left Column: Monumental Anton Heading (White & Light Blue with proper line gap) */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff]" />
                  <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#7ec8ff]">
                    OUR MISSION &amp; VISION
                  </span>
                </div>

                <h2 className="font-anton font-black uppercase text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8rem] 2xl:text-[9rem] tracking-tight flex flex-col select-none">
                  <span className="block text-white leading-none">
                    MISSION
                  </span>
                  <span className="block mt-3 sm:mt-4 md:mt-5 bg-gradient-to-r from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent leading-none">
                    &amp; VISION
                  </span>
                </h2>
              </div>

              {/* Right Column: Description aligned with bottom */}
              <div className="lg:col-span-5 space-y-4 w-full pb-1 sm:pb-2">
                <h3 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-snug">
                  Protection Engineered for the Frontlines
                </h3>
                
                <div className="space-y-3 text-slate-300 text-xs sm:text-sm md:text-[15px] leading-relaxed font-sans font-normal">
                  <p>
                    We aim to provide innovative, reliable, and high-performance defence and industrial solutions that enhance the operational capabilities of armed forces, civil authorities and strategic industries — with a focus on quality, technology and customer satisfaction.
                  </p>
                  <p className="text-slate-400">
                    As a global competitor in defence and aerospace innovation, we are driving self-reliance and technological advancement by offering cutting edge products and solutions that safeguard nations and empower industries.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Bottom 2-Column Cards: Aerospace & Defence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Card: Aerospace */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.65)] hover:border-[#7ec8ff]/40 transition-colors duration-300 space-y-4 flex flex-col justify-start"
            >
              <h4 className="font-oxanium text-2xl sm:text-3xl font-bold text-[#7ec8ff] tracking-wide">
                Aerospace
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal">
                To provide lightweight, high-performance armouring and protection solutions for aerospace platforms, ensuring enhanced survivability, reliability and performance through precision engineering and advanced material technologies.
              </p>
            </motion.div>

            {/* Right Card: Defence */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.65)] hover:border-[#7ec8ff]/40 transition-colors duration-300 space-y-4 flex flex-col justify-start"
            >
              <h4 className="font-oxanium text-2xl sm:text-3xl font-bold text-[#7ec8ff] tracking-wide">
                Defence
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal">
                To design, manufacture and deliver mission-critical protection systems and ballistic solutions that enhance soldier safety, mobility and operational effectiveness, while meeting the highest international standards and evolving battlefield requirements.
              </p>
            </motion.div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION: GROUP OF COMPANIES / OUR BUSINESSES (Exact 3 Columns Requested)  */}
        {/* ========================================================================= */}
        <div id="group" className="pt-10 sm:pt-10 space-y-6 sm:space-y-10 scroll-mt-28 w-full">
          
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2 sm:space-y-3 py-1"
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff]" />
              <span className="text-xs sm:text-[13px] font-oxanium font-bold tracking-[0.22em] uppercase text-[#7ec8ff]">
                GROUP OF COMPANIES
              </span>
            </div>
            <h2 className="font-oxanium text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              OUR BUSINESSES
            </h2>
          </motion.div>

          {/* 3 Sector Cards Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 sm:space-y-5"
          >
            {/* 3 Distinct Sector Columns: Each with its own Box + Button Directly Below */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              
              {/* Column 1: Aerospace */}
              <div className="flex flex-col space-y-4">
                <div className="group relative h-[450px] sm:h-[480px] md:h-[500px] rounded-2xl sm:rounded-3xl border border-white/[0.15] hover:border-sky-400/50 bg-[#070e1c]/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all duration-500 select-none">
                  {/* Background Image */}
                  <Image
                    src="/images/aerospace-card-bg.jpg"
                    alt="Aerospace"
                    fill
                    className="object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Atmospheric Dark Gradient Overlays (matching Image 2) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/30 pointer-events-none" />
                  <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

                  {/* Vertical Category Tag (Matches exact aesthetic from Image 2) */}
                  <div className="absolute left-4 sm:left-5 top-6 sm:top-7 z-20 flex flex-col items-center gap-3 pointer-events-none select-none">
                    <div className="flex items-center gap-2.5 [writing-mode:vertical-rl] rotate-180">
                      <span className="text-sm sm:text-base md:text-lg font-mono uppercase tracking-[0.25em] font-extrabold text-[#7ec8ff] drop-shadow-[0_0_16px_rgba(126,200,255,0.85)]">
                        AEROSPACE
                      </span>
                      <span className="w-7 sm:w-9 h-[2.5px] rounded-full bg-[#7ec8ff] shadow-[0_0_12px_#7ec8ff]" />
                    </div>
                  </div>

                  {/* Bottom Glassmorphic Caption Bar (Matching Image 2) */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-black/75 backdrop-blur-md border-t border-white/10 p-5 sm:p-6 select-none">
                    <div className="space-y-1.5">
                      <h3 className="font-oxanium text-sm sm:text-base md:text-[17px] font-bold uppercase tracking-tight text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        AEROSPACE SYSTEMS, AUTONOMOUS DRONES &amp; FLIGHT READINESS
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-normal line-clamp-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        Autonomous aerial systems, drone platforms, and aerospace-ready engineering developed for precision deployment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Particular Button Directly Under Box 1 (Exact Image 2 Hover Effect) */}
                <div className="flex justify-center">
                  <Link
                    href="/aerospace"
                    className="group relative inline-flex items-center justify-center w-full max-w-[290px] py-3 sm:py-3.5 px-6 bg-black/40 hover:bg-[#7ec8ff]/10 text-slate-200 hover:text-white border border-white/20 hover:border-[#7ec8ff]/90 text-xs sm:text-[13px] font-oxanium font-bold tracking-widest uppercase transition-all duration-300 ease-out backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(126,200,255,0.45),inset_0_0_15px_rgba(126,200,255,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 rounded-full overflow-hidden text-center cursor-pointer"
                  >
                    {/* Shimmer / Light beam sweep effect on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span className="transition-colors duration-300 group-hover:text-[#e0f2fe]">EXPLORE AEROSPACE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#7ec8ff] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(126,200,255,0.9)]" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Column 2: Defence */}
              <div className="flex flex-col space-y-4">
                <div className="group relative h-[450px] sm:h-[480px] md:h-[500px] rounded-2xl sm:rounded-3xl border border-white/[0.15] hover:border-sky-400/50 bg-[#070e1c]/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all duration-500 select-none">
                  {/* Background Image */}
                  <Image
                    src="/images/defence-card-bg.jpg"
                    alt="Defence"
                    fill
                    className="object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Atmospheric Dark Gradient Overlays (matching Image 2) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/30 pointer-events-none" />
                  <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

                  {/* Vertical Category Tag (Matches exact aesthetic from Image 2) */}
                  <div className="absolute left-4 sm:left-5 top-6 sm:top-7 z-20 flex flex-col items-center gap-3 pointer-events-none select-none">
                    <div className="flex items-center gap-2.5 [writing-mode:vertical-rl] rotate-180">
                      <span className="text-sm sm:text-base md:text-lg font-mono uppercase tracking-[0.25em] font-extrabold text-[#7ec8ff] drop-shadow-[0_0_16px_rgba(126,200,255,0.85)]">
                        DEFENCE
                      </span>
                      <span className="w-7 sm:w-9 h-[2.5px] rounded-full bg-[#7ec8ff] shadow-[0_0_12px_#7ec8ff]" />
                    </div>
                  </div>

                  {/* Bottom Glassmorphic Caption Bar (Matching Image 2) */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-black/75 backdrop-blur-md border-t border-white/10 p-5 sm:p-6 select-none">
                    <div className="space-y-1.5">
                      <h3 className="font-oxanium text-sm sm:text-base md:text-[17px] font-bold uppercase tracking-tight text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        DEFENCE SYSTEMS, PROTECTIVE PLATFORMS, AND READINESS UPDATES
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-normal line-clamp-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        Protective systems, tactical equipment, and defence manufacturing built for operational readiness across demanding field conditions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Particular Button Directly Under Box 2 (Exact Image 2 Hover Effect) */}
                <div className="flex justify-center">
                  <Link
                    href="/defence"
                    className="group relative inline-flex items-center justify-center w-full max-w-[290px] py-3 sm:py-3.5 px-6 bg-black/40 hover:bg-[#7ec8ff]/10 text-slate-200 hover:text-white border border-white/20 hover:border-[#7ec8ff]/90 text-xs sm:text-[13px] font-oxanium font-bold tracking-widest uppercase transition-all duration-300 ease-out backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(126,200,255,0.45),inset_0_0_15px_rgba(126,200,255,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 rounded-full overflow-hidden text-center cursor-pointer"
                  >
                    {/* Shimmer / Light beam sweep effect on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span className="transition-colors duration-300 group-hover:text-[#e0f2fe]">VIEW CAPABILITIES</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#7ec8ff] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(126,200,255,0.9)]" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Column 3: Affiliations */}
              <div className="flex flex-col space-y-4">
                <div className="group relative h-[450px] sm:h-[480px] md:h-[500px] rounded-2xl sm:rounded-3xl border border-white/[0.15] hover:border-sky-400/50 bg-[#070e1c]/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all duration-500 select-none">
                  {/* Background Image */}
                  <Image
                    src="/images/footer-missile-system.jpg"
                    alt="Affiliations"
                    fill
                    className="object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Atmospheric Dark Gradient Overlays (matching Image 2) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/30 pointer-events-none" />
                  <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

                  {/* Vertical Category Tag (Matches exact aesthetic from Image 2) */}
                  <div className="absolute left-4 sm:left-5 top-6 sm:top-7 z-20 flex flex-col items-center gap-3 pointer-events-none select-none">
                    <div className="flex items-center gap-2.5 [writing-mode:vertical-rl] rotate-180">
                      <span className="text-sm sm:text-base md:text-lg font-mono uppercase tracking-[0.25em] font-extrabold text-[#7ec8ff] drop-shadow-[0_0_16px_rgba(126,200,255,0.85)]">
                        AFFILIATIONS
                      </span>
                      <span className="w-7 sm:w-9 h-[2.5px] rounded-full bg-[#7ec8ff] shadow-[0_0_12px_#7ec8ff]" />
                    </div>
                  </div>

                  {/* Bottom Glassmorphic Caption Bar (Matching Image 2) */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-black/75 backdrop-blur-md border-t border-white/10 p-5 sm:p-6 select-none">
                    <div className="space-y-1.5">
                      <h3 className="font-oxanium text-sm sm:text-base md:text-[17px] font-bold uppercase tracking-tight text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        STRATEGIC COLLABORATIONS &amp; INSTITUTIONAL AFFILIATIONS
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed font-normal line-clamp-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        Strategic collaborations and aligned institutional relationships that broaden execution depth, capability access, and long-term growth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Particular Button Directly Under Box 3 (Exact Image 2 Hover Effect) */}
                <div className="flex justify-center">
                  <Link
                    href="/partnerships"
                    className="group relative inline-flex items-center justify-center w-full max-w-[290px] py-3 sm:py-3.5 px-6 bg-black/40 hover:bg-[#7ec8ff]/10 text-slate-200 hover:text-white border border-white/20 hover:border-[#7ec8ff]/90 text-xs sm:text-[13px] font-oxanium font-bold tracking-widest uppercase transition-all duration-300 ease-out backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(126,200,255,0.45),inset_0_0_15px_rgba(126,200,255,0.15)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100 rounded-full overflow-hidden text-center cursor-pointer"
                  >
                    {/* Shimmer / Light beam sweep effect on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span className="transition-colors duration-300 group-hover:text-[#e0f2fe]">VIEW PARTNERSHIPS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#7ec8ff] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(126,200,255,0.9)]" />
                    </span>
                  </Link>
                </div>
              </div>

            </div>
        </motion.div>

        </div>

      </div>
    </div>
  );
}
