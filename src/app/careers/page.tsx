"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
  Upload,
} from "lucide-react";

const CAREERS_LETTERS = ["C", "A", "R", "E", "E", "R", "S"];

function CareerScrollLetter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.01 + index * 0.1;
  const end = Math.min(start + 0.18, 0.96);
  const y = useTransform(progress, [start, end], ["110vh", "0vh"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 1, 1], { clamp: true });
  return (
    <motion.span
      style={{ y, opacity }}
      className="inline-block font-anton font-black uppercase text-[14vh] sm:text-[15.5vh] md:text-[17vh] lg:text-[19vh] xl:text-[20.5vh] leading-[0.63] tracking-tight text-center bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] select-none"
    >
      {char}
    </motion.span>
  );
}

function CareerMobileScrollLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.04 + index * 0.11;
  const end = Math.min(start + 0.18, 0.94);

  const x = useTransform(progress, [start, end], ["65vw", "0vw"], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.04, end], [0, 0.75, 1], { clamp: true });

  return (
    <motion.span
      style={{ x, opacity }}
      className="inline-block bg-gradient-to-b from-[#e0f2fe] via-[#7ec8ff] to-[#38bdf8] bg-clip-text text-transparent will-change-transform"
    >
      {char}
    </motion.span>
  );
}

interface CareerPosition {
  id: string;
  category: string;
  location: string;
  type: string;
  experience: string;
  title: string;
  description: string;
  skills: string[];
  responsibilitiesTitle?: string;
  responsibilities: string[];
  qualificationsTitle?: string;
  qualifications: string[];
}

const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: "lead-avionics",
    category: "AEROSPACE SYSTEMS",
    location: "Bengaluru, India (On site)",
    type: "Full Time",
    experience: "6 - 10 Years",
    title: "Lead Flight Systems & Avionics Engineer",
    description:
      "Lead the architecture, hardware-in-the-loop (HIL) integration, and validation of sovereign autonomous flight control units, mission computers, and fly-by-wire telemetry for next-generation aerial defense platforms.",
    skills: [
      "Embedded C/C++",
      "MIL-STD-1553",
      "Flight Control Laws",
      "HIL Simulation",
      "ARINC 429",
    ],
    responsibilitiesTitle: "CORE RESPONSIBILITIES",
    
    responsibilities: [
      "Architect high-integrity fly-by-wire flight control software and redundant telemetry architectures compliant with mission-critical defense standards.",
      "Direct hardware-in-the-loop (HIL) testing, sensor calibration, and optical tracking integration on full-scale flight simulators.",
      "Conduct flight-line software updates and collaborate with instrumentation engineers during live range validation trials.",
      "Lead cross-functional reviews with propulsion, aerodynamics, and structural teams to ensure seamless airframe-avionics cohesion.",
    ],
    qualificationsTitle: "QUALIFICATIONS & EXPERIENCE",
    qualifications: [
      "B.Tech / M.Tech in Aerospace, Electronics, or Avionics Engineering.",
      "Demonstrated experience with embedded C/C++, RTOS, ARINC 429, and MIL-STD-1553 protocols.",
      "Familiarity with autonomous flight guidance laws, inertial navigation systems (INS/GPS), and fail-safe logic.",
    ],
  },
  {
    id: "tactical-ai",
    category: "DEFENCE & ADVANCED SYSTEMS",
    location: "Hyderabad, India (On site)",
    type: "Full Time",
    experience: "4 - 8 Years",
    title: "Senior Tactical Autonomy & Edge AI Specialist",
    description:
      "Architect resilient multi-agent swarming algorithms, low-latency computer vision target tracking pipelines, and edge-compute modules engineered for zero-compromise operations in contested electromagnetic theaters.",
    skills: [
      "Edge AI / TensorRT",
      "ROS2 / DDS",
      "Sensor Fusion",
      "CUDA / FPGA",
      "Target Acquisition",
    ],
    responsibilitiesTitle: "CORE RESPONSIBILITIES",
    responsibilities: [
      "Design and deploy distributed swarm coordination routines resilient to RF jamming and intermittent satellite connectivity.",
      "Optimize real-time optical/thermal target classification models for ruggedized on-board compute acceleration (CUDA/TensorRT/FPGA).",
      "Implement zero-latency message protocols between airborne surveillance units and mobile tactical ground control nodes.",
      "Conduct rigorous adversarial testing and hardware validation against simulated electronic warfare countermeasures.",
    ],
    qualificationsTitle: "QUALIFICATIONS & EXPERIENCE",
    qualifications: [
      "Degree in Computer Science, Robotics, Electrical Engineering, or related technical discipline.",
      "Hands-on expertise with ROS2, DDS messaging, OpenCV, and deep learning inference optimization on edge GPUs.",
      "Strong background in state estimation, Kalman filtering, and distributed cooperative control algorithms.",
    ],
  },
  {
    id: "materials-composite",
    category: "AEROSPACE & METALLURGY",
    location: "Pune / Bengaluru, India (On site)",
    type: "Full Time",
    experience: "5 - 9 Years",
    title: "Materials & Structural Composite Specialist",
    description:
      "Direct high-temperature composite synthesis, ballistic ceramic armor matrix engineering, and aerodynamic airframe structural integrity evaluations across extreme acoustic, thermal, and kinetic operating envelopes.",
    skills: [
      "Composite Prepregs",
      "Autoclave Curing",
      "STANAG Ballistics",
      "FEA Structural Stress",
      "Non-Destructive Testing",
    ],
    responsibilitiesTitle: "CORE RESPONSIBILITIES",
    responsibilities: [
      "Develop lightweight ceramic-metallic composite matrices tailored for high-threat ballistic stopping power and STANAG protection compliance.",
      "Oversee carbon fiber prepreg layup protocols, automated vacuum bagging, and autoclave curing cycles for primary airframe sub-assemblies.",
      "Perform high-fidelity finite element analysis (FEA) evaluating shock propagation, aero-thermal heating, and acoustic fatigue life.",
      "Establish non-destructive inspection (NDI) standards and ultrasonic scanning workflows for finished composite structures.",
    ],
    qualificationsTitle: "QUALIFICATIONS & EXPERIENCE",
    qualifications: [
      "B.Tech / M.Tech / Ph.D. in Materials Science, Metallurgical Engineering, or Mechanical Engineering.",
      "5+ years of hands-on experience in aerospace composites, armor testing, or high-performance defense metallurgy.",
      "Proficiency with structural FEA software (Abaqus/ANSYS) and standard composite characterization testing (ASTM/MIL standards).",
    ],
  },
];

export default function CareersPage() {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(heroProgress, {
    stiffness: 100,
    damping: 22,
    restDelta: 0.001,
  });

  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileTrackRef,
    offset: ["start start", "end end"],
  });
  const mobileProgress = useSpring(mobileScrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.06], [1, 0], { clamp: true });
  const careerHeadingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: careerHeadingProgress } = useScroll({
    target: careerHeadingRef,
    offset: ["start 85%", "end 40%"],
  });
  const careerHeadingBrightness = useTransform(careerHeadingProgress, [0, 1], [0, 1]);
  const [applyModalRole, setApplyModalRole] = useState<CareerPosition | null>(null);

  // Lock body scroll when application modal is open
  useEffect(() => {
    if (applyModalRole) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [applyModalRole]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experienceYears: "",
    portfolioUrl: "",
    coverNote: "",
  });
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [ndaAgreed, setNdaAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const toggleAccordion = (roleId: string) => {
    setExpandedRole((prev) => (prev === roleId ? null : roleId));
  };

  const handleApplyClick = (role: CareerPosition) => {
    setApplyModalRole(role);
    setSubmittedSuccess(false);
    setResumeFileName(null);
    setNdaAgreed(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          organization: "Career Applicant",
          purpose: `Career Application: ${applyModalRole?.title}`,
          message: `Position: ${applyModalRole?.title} | Exp: ${formData.experienceYears} | Resume: ${resumeFileName || "Not specified"}\n\nDefense Focus / Brief Note:\n${formData.coverNote}`,
        }),
      }).catch(() => {});

      setSubmittedSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experienceYears: "",
        portfolioUrl: "",
        coverNote: "",
      });
      setResumeFileName(null);
      setNdaAgreed(false);
    } catch {
      setSubmittedSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-x-clip text-white selection:bg-sky-500/30 selection:text-sky-200">

      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE HERO (sm:hidden - Exact same format/margin as Defence) */}
      {/* ========================================================================= */}
      <div ref={mobileTrackRef} className="sm:hidden relative w-full h-[240vh] select-none">
        <div className="sticky top-14 z-30 w-full flex flex-col justify-start items-center pt-2 px-2 overflow-hidden select-none">
          {/* Tactical Image Box matching Defence exact layout */}
          <div className="relative w-full max-w-[420px] mx-auto">
            {/* Responsive Only: Back to Home Button at Top-Left of Image */}
            <div className="absolute top-2.5 left-2.5 z-40 pointer-events-auto">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 h-7 px-2.5 text-[10px] xs:text-[10.5px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#040814]/90 hover:bg-[#071329] border border-cyan-400/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8)] group select-auto whitespace-nowrap"
              >
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
                <span>BACK TO HOME</span>
              </Link>
            </div>
            <Image
              src="/images/tactical-defense-operator.jpg"
              alt="Careers at Sky Wardens"
              width={900}
              height={600}
              priority
              className="w-full h-auto object-cover filter contrast-[1.08] brightness-[1.05] rounded-sm"
              sizes="(max-width: 640px) 100vw"
            />

            {/* CAREERS Letters Over The Image (Assemble one by one during scroll like Defence) */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center text-center overflow-visible pointer-events-none translate-y-[10%]">
              <h1 className="font-anton font-black uppercase text-[18vw] xs:text-[19vw] tracking-[-0.01em] leading-none text-center drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)] whitespace-nowrap mx-auto w-full select-none block overflow-visible">
                {CAREERS_LETTERS.map((char, index) => (
                  <CareerMobileScrollLetter
                    key={index}
                    char={char}
                    index={index}
                    total={CAREERS_LETTERS.length}
                    progress={mobileProgress}
                  />
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP CINEMATIC STICKY SCROLL HERO (hidden sm:block)                  */}
      {/* ========================================================================= */}
      <div ref={heroTrackRef} className="hidden sm:block relative w-full h-[220vh] select-none">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-28 overflow-hidden select-none">

          {/* Background Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/tactical-defense-operator.jpg"
              alt="Careers at Sky Wardens"
              fill
              priority
              className="object-cover object-center brightness-90 contrast-110"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-transparent to-[#030712] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/55 via-transparent to-[#030712]/55 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />
          </div>

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

          {/* Scroll hint */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-end pb-8">
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="pointer-events-none flex flex-col items-center gap-2 select-none"
            >
              <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.3em] uppercase text-sky-300/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Scroll to Reveal
              </span>
              <div className="w-5 h-8 rounded-full border border-sky-400/40 flex items-start justify-center p-1 bg-black/30 backdrop-blur-sm">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-sky-300"
                />
              </div>
            </motion.div>
          </div>

          {/* Vertical CAREERS letters column */}
          <div className="absolute right-4 sm:right-6 md:right-8 lg:right-10 xl:right-14 top-18 sm:top-20 lg:top-22 z-20 flex flex-col items-center pointer-events-none select-none">
            <h1 aria-label="CAREERS" className="flex flex-col items-center select-none pointer-events-none">
              {CAREERS_LETTERS.map((char, index) => (
                <CareerScrollLetter
                  key={index}
                  char={char}
                  index={index}
                  progress={smoothProgress}
                />
              ))}
            </h1>
          </div>

        </div>
      </div>


      {/* ── MAIN CAREERS CONTENT ── */}
      <div className="relative z-10 pt-4 sm:pt-16 pb-3 sm:pb-12 lg:pb-20 overflow-x-hidden">
        <div className="relative z-10 w-full max-w-[1660px] mx-auto px-2.5 sm:px-5">

        {/* Header Section */}
        <div className="max-w-4xl mb-3.5 sm:mb-8 lg:mb-12 text-left">
          {/* Top Tag */}
          <div className="flex items-center justify-start gap-2 mb-3 sm:mb-4">
            <span className="w-4 h-[2px] bg-sky-400 inline-block" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-sky-400 font-semibold uppercase">
              OPPORTUNITIES &amp; GROWTH
            </span>
          </div>

          {/* Main Title */}
          <h2
            ref={careerHeadingRef}
            className="relative text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-600 uppercase font-sans leading-[1.08] mb-4 sm:mb-6 text-left"
          >
            ADVANCING DEFENCE <br />
            &amp; YOUR CAREER
            <motion.span
              aria-hidden="true"
              style={{ opacity: careerHeadingBrightness }}
              className="pointer-events-none absolute inset-0 text-slate-100"
            >
              ADVANCING DEFENCE <br />
              &amp; YOUR CAREER
            </motion.span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-3xl text-xs sm:text-base text-slate-300 font-normal leading-relaxed">
            Sky Wardens is building long-term sovereign capability in aerospace &amp; defence. We work
            with individuals who value technical excellence, long-term thinking, and meaningful
            industrial impact.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          
          {CAREER_POSITIONS.map((pos) => {
            const isExpanded = expandedRole === pos.id;
            const isFullWidth = pos.id === "lead-avionics";

            return (
              <motion.div
                key={pos.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-[#050c1c]/90 border border-slate-800/90 hover:border-[#1a4a75]/80 rounded-2xl p-4.5 sm:p-6 lg:p-7 transition-colors duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between group ${
                  isFullWidth ? "lg:col-span-2 w-full" : ""
                }`}
              >
                <div>
                  {/* Top Tags Row */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
                    {/* Category Blue Pill */}
                    <span className="bg-[#0c2847] text-[#5cb1f7] text-[10.5px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#1a4a75]/80">
                      {pos.category}
                    </span>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{pos.location}</span>
                    </div>

                    {/* Job Type */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{pos.type}</span>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{pos.experience}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-white tracking-tight mb-3 group-hover:text-sky-200 transition-colors ${
                    isFullWidth ? "text-xl sm:text-2xl lg:text-3xl" : "text-xl sm:text-2xl"
                  }`}>
                    {pos.title}
                  </h3>

                  {/* Summary Description */}
                  <p className={`text-slate-400 font-normal leading-relaxed mb-5 ${
                    isFullWidth ? "text-xs sm:text-sm md:text-[14.5px] max-w-4xl" : "text-xs sm:text-sm"
                  }`}>
                    {pos.description}
                  </p>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pos.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-[#071328]/90 text-slate-300 border border-slate-800/90 font-mono tracking-tight"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Accordion Expandable Responsibilities & Scope */}
                  {isExpanded && (
                    <div className="mb-6 pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-2">
                          {pos.responsibilitiesTitle || "CORE RESPONSIBILITIES"}
                        </h4>
                        <ul className="space-y-2 pl-4 list-disc text-xs text-slate-300 leading-relaxed marker:text-sky-400">
                          {pos.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-2">
                          {pos.qualificationsTitle || "QUALIFICATIONS & EXPERIENCE"}
                        </h4>
                        <ul className="space-y-2 pl-4 list-disc text-xs text-slate-300 leading-relaxed marker:text-sky-400">
                          {pos.qualifications.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Row: Left Accordion Toggle + Right Apply Button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  {/* Left: View Responsibilities & Scope */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(pos.id)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium transition-colors cursor-pointer select-none"
                  >
                    <span>View Responsibilities &amp; Scope</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-sky-400" : ""
                      }`}
                    />
                  </button>

                  {/* Right: Apply for Role Button */}
                  <button
                    type="button"
                    onClick={() => handleApplyClick(pos)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#18629b] to-[#124d7c] hover:from-[#1e78bf] hover:to-[#165e99] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-lg border border-[#2e8bd9]/50 shadow-[0_0_15px_rgba(24,98,155,0.35)] hover:shadow-[0_0_20px_rgba(36,123,196,0.5)] transition-all cursor-pointer"
                  >
                    <span>APPLY FOR ROLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

                {/* Speculative Applications & Research Fellowships Banner */}
        <div className="w-full mt-3 sm:mt-6 lg:mt-8 p-4.5 sm:p-7 lg:p-8 rounded-2xl bg-[#050c1c]/90 border border-slate-800/90 shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Speculative Applications & Research Fellowships
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
              Don’t see an exact match for your specific engineering or defense discipline? We are
              constantly seeking exceptional researchers, aerodynamicists, and systems architects.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              handleApplyClick({
                id: "speculative",
                category: "GENERAL INQUIRY",
                location: "India (Flexible)",
                type: "Full Time / Fellowship",
                experience: "Any Level",
                title: "Speculative Research & Engineering Fellowship",
                description:
                  "Open exploratory application for elite aerospace, defence, robotics, and advanced engineering specialists.",
                skills: ["Sovereign Capability", "R&D", "Strategic Systems"],
                responsibilities: [],
                qualifications: [],
              })
            }
            className="inline-flex items-center gap-2 bg-[#040915] hover:bg-[#071328] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg border border-slate-700/80 hover:border-slate-500 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>SUBMIT CREDENTIALS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Application Modal (Matching Candidate Submission Dossier design - Perfect 320px to 4K responsiveness) */}
      {applyModalRole && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain"
          style={{
            paddingTop: "max(8px, env(safe-area-inset-top))",
            paddingBottom: "max(8px, env(safe-area-inset-bottom))",
            paddingLeft: "max(8px, env(safe-area-inset-left))",
            paddingRight: "max(8px, env(safe-area-inset-right))",
          }}
          onClick={() => setApplyModalRole(null)} 
        >
          <div
            className="relative w-full max-w-[844px] max-h-[calc(100dvh-16px)] sm:max-h-[90vh] overflow-y-auto overscroll-contain bg-[#060b17] border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-auto box-border [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#030712] [&::-webkit-scrollbar-thumb]:bg-sky-500/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-sky-400"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(56, 189, 248, 0.6) rgba(3, 7, 18, 0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header: Sticky on mobile scroll so title and close button are permanently visible */}
            <div className="sticky -top-3.5 sm:-top-7 md:-top-8 bg-[#060b17]/95 backdrop-blur-md z-30 -mx-3.5 sm:-mx-7 md:-mx-8 px-3.5 sm:px-7 md:px-8 pt-3.5 sm:pt-7 md:pt-8 pb-3 sm:pb-5 mb-3 sm:mb-5 border-b border-slate-800/80 flex items-start justify-between gap-3">
              <div className="min-w-0 pr-2">
                <h2 className="text-xs sm:text-base md:text-lg font-mono font-bold tracking-wider text-sky-400 uppercase leading-snug break-words">
                  CANDIDATE SUBMISSION DOSSIER
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5 leading-relaxed">
                  Provide your technical credentials and background for immediate evaluation.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setApplyModalRole(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111927] hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Application Transmitted
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  Your candidate dossier for{" "}
                  <span className="text-sky-300 font-semibold">{applyModalRole.title}</span> has
                  been transmitted to the sovereign defense technical talent evaluation committee.
                </p>
                <button
                  type="button"
                  onClick={() => setApplyModalRole(null)}
                  className="mt-3 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b61] to-[#125386] hover:from-[#114b7a] hover:to-[#1766a5] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border border-sky-500/30"
                >
                  Close Dossier
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                {/* Row 1: Full Name & Email Address (Single column on 320px mobile, 2 cols on desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1.5">
                      FULL NAME <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full h-11 px-3.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1.5">
                      EMAIL ADDRESS <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@example.com"
                      className="w-full h-11 px-3.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Contact Phone & Total Experience (Single column on 320px mobile, 2 cols on desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1.5">
                      CONTACT PHONE <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-3.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1.5">
                      TOTAL EXPERIENCE <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.experienceYears}
                      onChange={(e) =>
                        setFormData({ ...formData, experienceYears: e.target.value })
                      }
                      placeholder="e.g. 7 Years (Aerospace)"
                      className="w-full h-11 px-3.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Resume / CV Dossier Upload */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1.5">
                    RESUME / CV DOSSIER <span className="text-sky-400">*</span>
                  </label>
                  <label
                    htmlFor="resume-upload"
                    className="group relative flex flex-col sm:flex-row items-center justify-center py-3.5 px-3 sm:py-4 sm:px-6 rounded-xl border border-dashed border-slate-700/80 hover:border-sky-400/80 bg-[#040814]/50 cursor-pointer transition-all duration-200 gap-1.5 sm:gap-3 w-full text-center"
                  >
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResumeFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    <Upload className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide break-words max-w-full">
                      {resumeFileName ? resumeFileName : "Click to upload PDF or DOCX Resume"}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 shrink-0">
                      (Max 15 MB)
                    </span>
                  </label>
                </div>

                {/* Row 4: Defense Focus / Brief Note */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-1.5">
                    DEFENSE FOCUS / BRIEF NOTE
                  </label>
                  <textarea
                    rows={2}
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Highlight relevant airframe, autonomy, or defense projects..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  />
                </div>

                {/* Row 5: NDA & Genuine Credentials Agreement Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="nda-agreement"
                    required
                    checked={ndaAgreed}
                    onChange={(e) => setNdaAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded bg-[#040814] border-slate-700 text-sky-500 focus:ring-0 cursor-pointer accent-sky-500 shrink-0"
                  />
                  <label
                    htmlFor="nda-agreement"
                    className="text-[10.5px] sm:text-xs text-slate-300 font-normal leading-relaxed cursor-pointer select-none"
                  >
                    I confirm that the submitted technical credentials are genuine and agree to Sky Wardens sovereign defense confidentiality and NDA protocols.
                  </label>
                </div>

                {/* Row 6: Submit Button & Cancel (Full-width stacked on 320px mobile, horizontal on desktop) */}
                <div className="pt-2 sm:pt-3 pb-1 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyModalRole(null)}
                    className="w-full sm:w-auto py-2.5 sm:py-3 px-5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs sm:text-sm tracking-wider uppercase border border-slate-700/60 transition-colors cursor-pointer text-center"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#0d3b61] to-[#125386] hover:from-[#114b7a] hover:to-[#1766a5] text-sky-200 hover:text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-sky-500/40 shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <span>TRANSMITTING APPLICATION...</span>
                    ) : (
                      <>
                        <span className="truncate">TRANSMIT APPLICATION</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}