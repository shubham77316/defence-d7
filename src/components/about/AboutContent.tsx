"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

export default function AboutContent() {
  const { settings } = useSettings();
  return (
    <div className="relative min-h-screen pt-28 sm:pt-36 pb-24 bg-[#030712] overflow-hidden text-white selection:bg-sky-500/30 selection:text-sky-200">
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

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* TOP ROW: Split Layout (ABOUT SKY WARDENS + IDENTITY CARD)                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Big Bold Typography */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 pt-2"
          >
            {/* Tag: ABOUT US */}
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff] shadow-[0_0_8px_rgba(126,200,255,0.85)]" />
              <span className="text-xs sm:text-[13px] font-oxanium font-bold tracking-[0.22em] uppercase text-[#7ec8ff] drop-shadow-[0_0_10px_rgba(126,200,255,0.35)]">
                ABOUT US
              </span>
            </div>

            {/* Main Headline: ABOUT SKY WARDENS GROUP */}
            <h1 className="font-oxanium text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
              ABOUT <br />
              SKY WARDENS <br />
              GROUP
            </h1>
          </motion.div>

          {/* Right Column: Identity Card Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-4 hover:border-sky-400/30 transition-colors duration-300"
          >
            {/* Tag: IDENTITY */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff] shadow-[0_0_8px_rgba(126,200,255,0.85)]" />
              <span className="text-[11px] sm:text-xs font-oxanium font-bold tracking-[0.22em] uppercase text-[#7ec8ff] drop-shadow-[0_0_10px_rgba(126,200,255,0.35)]">
                IDENTITY
              </span>
            </div>

            {/* Title: A COMPANY BUILT AROUND CAPABILITY AND TRUST */}
            <h2 className="font-oxanium text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide text-white leading-tight">
              A COMPANY BUILT AROUND <br className="hidden sm:inline" />
              CAPABILITY AND TRUST
            </h2>

            {/* Subtext Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal pt-1">
              Sky Wardens combines engineering focus, manufacturing depth, and disciplined execution to support high-stakes defence and industrial environments.
            </p>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* MIDDLE SECTION: Full Expansive Card (PRECISION, PROTECT & PROGRESS)      */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-6 sm:p-10 md:p-12 lg:p-14 shadow-[0_16px_50px_rgba(0,0,0,0.7)] hover:border-sky-400/30 transition-colors duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Header Inside Card */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff] shadow-[0_0_8px_rgba(126,200,255,0.85)]" />
                <span className="text-[11px] sm:text-xs font-oxanium font-bold tracking-[0.22em] uppercase text-[#7ec8ff] drop-shadow-[0_0_10px_rgba(126,200,255,0.35)]">
                  ABOUT SKY WARDENS
                </span>
              </div>

              <h3 className="font-oxanium text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                PRECISION, <br />
                PROTECT &amp; <br />
                PROGRESS
              </h3>
            </div>

            {/* Right Detailed Narrative Paragraphs */}
            <div className="lg:col-span-8 space-y-5 sm:space-y-6 text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal text-justify sm:text-left">
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
        </motion.div>

        {/* ========================================================================= */}
        {/* SECTION: 2-COLUMN CARDS (02: INDIGENOUS PARTNER & 03: INNOVATION)         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 02: AN INDIGENOUS DEFENCE SOLUTIONS PARTNER */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.65)] hover:border-sky-400/30 transition-colors duration-300 space-y-6"
          >
            <div className="space-y-4">
              {/* Header with 02 Badge + Tag */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#041226] border border-[#7ec8ff]/30 flex items-center justify-center text-xs font-oxanium font-bold text-[#7ec8ff] shrink-0 shadow-[0_0_12px_rgba(126,200,255,0.2)]">
                  02
                </span>
                <span className="text-[11px] sm:text-xs font-oxanium font-bold tracking-[0.22em] uppercase text-[#7ec8ff] drop-shadow-[0_0_10px_rgba(126,200,255,0.35)]">
                  ABOUT US
                </span>
              </div>

              {/* Title */}
              <h3 className="font-oxanium text-xl sm:text-2xl md:text-[26px] font-black uppercase tracking-wide text-white leading-snug">
                AN INDIGENOUS DEFENCE SOLUTIONS PARTNER
              </h3>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal">
              <p>
                Sky Wardens Alliance Private Limited is an indigenous defence and industrial solutions company focused on innovation, precision, and manufacturing excellence. As part of the Sky Wardens Group, we are committed to supporting the evolving requirements of defence forces and allied sectors through reliable, future-ready solutions.
              </p>
              <p>
                Our core manufacturing line includes drones, tactical defence products, electronic warfare support systems, communication systems, and high-end petrochem lubricant oils. We are continuously expanding our portfolio to offer more advanced, diversified, and strategically relevant solutions across defence, aerospace, and industrial domains in which every product is developed under stringent quality control standards to ensure consistent performance, durability, and operational readiness.
              </p>
            </div>
          </motion.div>

          {/* Card 03: BUILT ON INNOVATION, CERTIFICATIONS, AND STRATEGIC PARTNERSHIPS */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.65)] hover:border-sky-400/30 transition-colors duration-300 space-y-6"
          >
            <div className="space-y-4">
              {/* Header with 03 Badge + Tag */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#041226] border border-[#7ec8ff]/30 flex items-center justify-center text-xs font-oxanium font-bold text-[#7ec8ff] shrink-0 shadow-[0_0_12px_rgba(126,200,255,0.2)]">
                  03
                </span>
                <span className="text-[11px] sm:text-xs font-oxanium font-bold tracking-[0.22em] uppercase text-[#7ec8ff] drop-shadow-[0_0_10px_rgba(126,200,255,0.35)]">
                  OUR WORKFORCE &amp; CORE COMPETENCIES
                </span>
              </div>

              {/* Title */}
              <h3 className="font-oxanium text-xl sm:text-2xl md:text-[26px] font-black uppercase tracking-wide text-white leading-snug">
                BUILT ON INNOVATION, CERTIFICATIONS, AND STRATEGIC PARTNERSHIPS
              </h3>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal">
              <p>
                Our commitment to innovation and impact has enabled us to develop over 10+ proprietary product blueprints and file multiple patents across key areas of defence and advanced technology. Furthermore, we have several more patents underway, including 3 patents in ballistics, 1 patent in chemical technologies, and 2 patents in advanced electronics, with additional innovations in progress. Our pioneering achievements also include the launch of India&apos;s first drone-dropped fire suppression unit, which is currently in the pilot stage and many more still under testing and review.
              </p>
              <p>
                Our strategic partnerships with leading government agencies, DRDO, CSIR (Council of Scientific and Industrial Research), and private-sector leaders continue to strengthen our growth and technological advancement in defence and tactical domains. Sky Wardens is also coordinating with Tri-Service Headquarters, including the Army, Navy, and Air Force. Backed by ISO-certified facilities, we are proud to be officially registered vendors with DRDO, the Indian Army (Procurement Trials), and multiple State Police Forces, reinforcing our position as a trusted partner in national security, innovation, and indigenous capability development.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION: MISSION & VISION                                                 */}
        {/* ========================================================================= */}
        <div id="mission" className="pt-6 sm:pt-10 space-y-8 sm:space-y-10 scroll-mt-28">
          
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2 sm:space-y-3"
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff] shadow-[0_0_8px_rgba(126,200,255,0.85)]" />
              <span className="text-xs sm:text-[13px] font-oxanium font-bold tracking-[0.22em] uppercase text-[#7ec8ff] drop-shadow-[0_0_10px_rgba(126,200,255,0.35)]">
                OUR MISSION &amp; VISION
              </span>
            </div>
            <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              MISSION &amp; VISION
            </h2>
          </motion.div>

          {/* Top Full-Width Card: Protection Engineered for the Frontlines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#070e1c]/85 backdrop-blur-xl p-6 sm:p-10 md:p-12 shadow-[0_16px_50px_rgba(0,0,0,0.65)] hover:border-sky-400/30 transition-colors duration-300 space-y-4"
          >
            <h3 className="font-oxanium text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
              Protection Engineered for the Frontlines
            </h3>
            
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal">
              <p>
                We aim to provide innovative, reliable, and high-performance defence and industrial solutions that enhance the operational capabilities of armed forces, civil authorities and strategic industries - with a focus on quality, technology and customer satisfaction.
              </p>
              <p>
                As a global competitor in defence and aerospace innovation, we are driving self-reliance and technological advancement by offering cutting edge products and solutions that safeguard nations and empower industries.
              </p>
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
        <div id="group" className="pt-6 sm:pt-10 space-y-8 sm:space-y-10 scroll-mt-28">
          
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2 sm:space-y-3"
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ec8ff] shadow-[0_0_8px_rgba(126,200,255,0.85)]" />
              <span className="text-xs sm:text-[13px] font-oxanium font-bold tracking-[0.22em] uppercase text-[#7ec8ff] drop-shadow-[0_0_10px_rgba(126,200,255,0.35)]">
                GROUP OF COMPANIES
              </span>
            </div>
            <h2 className="font-oxanium text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              OUR BUSINESSES
            </h2>
          </motion.div>

          {/* 3 Sector 3D Flip Panels: Aerospace, Defence, Affiliations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl sm:rounded-3xl border border-white/[0.15] bg-[#070e1c]/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.12]">
              
              {/* Panel 1: Aerospace Flip Card */}
              <div className="group [perspective:1600px] h-[440px] sm:h-[480px] md:h-[500px] cursor-pointer select-none">
                <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT FACE: Image + Title + Plus */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden flex flex-col justify-start p-6 sm:p-8 bg-[#040816]">
                    <Image
                      src="/images/aerospace-card-bg.jpg"
                      alt="Aerospace"
                      fill
                      className="object-cover object-center brightness-75 group-hover:brightness-90 transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
                    <div className="relative z-10 flex items-start justify-between w-full">
                      <h3 className="font-oxanium text-2xl sm:text-3xl font-bold text-white tracking-wide">
                        Aerospace
                      </h3>
                      <span className="text-2xl font-light text-white/70 group-hover:text-sky-300 transition-colors duration-300">
                        +
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE: Exactly Matching Reference Image (Light Card, Clean Text & Navy Button) */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#eef3f8] text-[#1e293b] flex flex-col justify-between p-6 sm:p-8 overflow-hidden shadow-2xl">
                    {/* Top Row: Title + Minus Icon */}
                    <div className="flex items-start justify-between w-full">
                      <h4 className="font-oxanium text-2xl sm:text-3xl font-bold text-[#102d5c] tracking-wide">
                        Aerospace
                      </h4>
                      <span className="text-2xl font-bold text-[#102d5c] select-none leading-none">
                        &minus;
                      </span>
                    </div>

                    {/* Middle: Exact Text from User Image */}
                    <div className="my-auto py-2">
                      <p className="text-[#334155] text-sm sm:text-[15px] md:text-base leading-relaxed font-normal">
                        Autonomous aerial systems, <br />
                        drone platforms, and <br />
                        aerospace-ready engineering <br />
                        developed for precision <br />
                        deployment.
                      </p>
                    </div>

                    {/* Bottom: Centered Navy Blue Button */}
                    <div className="flex justify-center w-full pt-2">
                      <Link
                        href="/aerospace"
                        className="inline-flex items-center justify-center px-7 py-2.5 rounded-md bg-[#102d5c] hover:bg-[#183d78] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                      >
                        Explore Aerospace
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

              {/* Panel 2: Defence Flip Card */}
              <div className="group [perspective:1600px] h-[440px] sm:h-[480px] md:h-[500px] cursor-pointer select-none">
                <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT FACE: Image + Title + Plus */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden flex flex-col justify-start p-6 sm:p-8 bg-[#040816]">
                    <Image
                      src="/images/defence-card-bg.jpg"
                      alt="Defence"
                      fill
                      className="object-cover object-center brightness-75 group-hover:brightness-90 transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
                    <div className="relative z-10 flex items-start justify-between w-full">
                      <h3 className="font-oxanium text-2xl sm:text-3xl font-bold text-white tracking-wide">
                        Defence
                      </h3>
                      <span className="text-2xl font-light text-white/70 group-hover:text-sky-300 transition-colors duration-300">
                        +
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE: Exactly Matching Reference Image (Light Card, Clean Text & Navy Button) */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#eef3f8] text-[#1e293b] flex flex-col justify-between p-6 sm:p-8 overflow-hidden shadow-2xl">
                    {/* Top Row: Title + Minus Icon */}
                    <div className="flex items-start justify-between w-full">
                      <h4 className="font-oxanium text-2xl sm:text-3xl font-bold text-[#102d5c] tracking-wide">
                        Defence
                      </h4>
                      <span className="text-2xl font-bold text-[#102d5c] select-none leading-none">
                        &minus;
                      </span>
                    </div>

                    {/* Middle: Exact Text from User Image */}
                    <div className="my-auto py-2">
                      <p className="text-[#334155] text-sm sm:text-[15px] md:text-base leading-relaxed font-normal">
                        Protective systems, tactical <br />
                        equipment, and defence <br />
                        manufacturing built for <br />
                        operational readiness across <br />
                        demanding field conditions.
                      </p>
                    </div>

                    {/* Bottom: Centered Navy Blue Button */}
                    <div className="flex justify-center w-full pt-2">
                      <Link
                        href="/defence"
                        className="inline-flex items-center justify-center px-7 py-2.5 rounded-md bg-[#102d5c] hover:bg-[#183d78] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                      >
                        View Capabilities
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

              {/* Panel 3: Affiliations Flip Card */}
              <div className="group [perspective:1600px] h-[440px] sm:h-[480px] md:h-[500px] cursor-pointer select-none">
                <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT FACE: Image + Title + Plus */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden flex flex-col justify-start p-6 sm:p-8 bg-[#040816]">
                    <Image
                      src="/images/footer-missile-system.jpg"
                      alt="Affiliations"
                      fill
                      className="object-cover object-center brightness-75 group-hover:brightness-90 transition-all duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
                    <div className="relative z-10 flex items-start justify-between w-full">
                      <h3 className="font-oxanium text-2xl sm:text-3xl font-bold text-white tracking-wide">
                        Affiliations
                      </h3>
                      <span className="text-2xl font-light text-white/70 group-hover:text-sky-300 transition-colors duration-300">
                        +
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE: Exactly Matching Reference Image (Light Card, Clean Text & Navy Button) */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#eef3f8] text-[#1e293b] flex flex-col justify-between p-6 sm:p-8 overflow-hidden shadow-2xl">
                    {/* Top Row: Title + Minus Icon */}
                    <div className="flex items-start justify-between w-full">
                      <h4 className="font-oxanium text-2xl sm:text-3xl font-bold text-[#102d5c] tracking-wide">
                        Affiliations
                      </h4>
                      <span className="text-2xl font-bold text-[#102d5c] select-none leading-none">
                        &minus;
                      </span>
                    </div>

                    {/* Middle: Exact Text from User Image */}
                    <div className="my-auto py-2">
                      <p className="text-[#334155] text-sm sm:text-[15px] md:text-base leading-relaxed font-normal">
                        Strategic collaborations and <br />
                        aligned institutional <br />
                        relationships that broaden <br />
                        execution depth, capability <br />
                        access, and long-term growth.
                      </p>
                    </div>

                    {/* Bottom: Centered Navy Blue Button */}
                    <div className="flex justify-center w-full pt-2">
                      <Link
                        href="/partnerships"
                        className="inline-flex items-center justify-center px-7 py-2.5 rounded-md bg-[#102d5c] hover:bg-[#183d78] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                      >
                        View Partnerships
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
