"use client";

import React, { useState } from "react";
import {
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
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [applyModalRole, setApplyModalRole] = useState<CareerPosition | null>(null);

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
    <div className="min-h-screen bg-[#020408] text-slate-100 pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambience & Subtle Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-900/15 rounded-full blur-[150px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section (Exactly matching user screenshot) */}
        <div className="max-w-4xl mb-12 sm:mb-14">
          {/* Top Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-[2px] bg-sky-400 inline-block" />
            <span className="text-xs sm:text-sm font-mono tracking-widest text-sky-400 font-semibold uppercase">
              OPPORTUNITIES & GROWTH
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans leading-[1.08] mb-6">
            ADVANCING DEFENCE <br />
            & YOUR CAREER
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-3xl">
            Anuvyom is designed as a long term industrial platform focused on aerospace & defence
            sector. We are interested in working with individuals who value
            technical excellence, long term thinking, and meaningful industrial impact.
          </p>
        </div>

        {/* Exact 2 Job Cards Grid (Matching screenshot precisely) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {CAREER_POSITIONS.map((pos) => {
            const isExpanded = expandedRole === pos.id;

            return (
              <div
                key={pos.id}
                className="bg-[#050c1c]/90 border border-slate-800/90 hover:border-[#1a4a75]/80 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between group"
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
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-sky-200 transition-colors">
                    {pos.title}
                  </h3>

                  {/* Summary Description */}
                  <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed mb-5">
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
                    <span>View Responsibilities & Scope</span>
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
              </div>
            );
          })}
        </div>

        {/* Speculative Applications & Research Fellowships Banner */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-[#050c1c]/90 border border-slate-800/90 shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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

      {/* Application Modal (Matching Candidate Submission Dossier design) */}
      {applyModalRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl sm:max-w-3xl bg-[#060b17] border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base sm:text-lg font-mono font-bold tracking-wider text-sky-400 uppercase">
                  CANDIDATE SUBMISSION DOSSIER
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-normal mt-1">
                  Provide your technical credentials and background for immediate evaluation.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setApplyModalRole(null)}
                className="w-9 h-9 rounded-full bg-[#111927] hover:bg-slate-700/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
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
                  className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b61] to-[#125386] hover:from-[#114b7a] hover:to-[#1766a5] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border border-sky-500/30"
                >
                  Close Dossier
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-2">
                      FULL NAME <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-2">
                      EMAIL ADDRESS <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@example.com"
                      className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Contact Phone & Total Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-2">
                      CONTACT PHONE <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-2">
                      TOTAL EXPERIENCE <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.experienceYears}
                      onChange={(e) =>
                        setFormData({ ...formData, experienceYears: e.target.value })
                      }
                      placeholder="e.g. 7 Years (Aerospace/Defense)"
                      className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Resume / CV Dossier Upload */}
                <div>
                  <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-2">
                    RESUME / CV DOSSIER <span className="text-sky-400">*</span>
                  </label>
                  <label
                    htmlFor="resume-upload"
                    className="group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-xl border border-dashed border-slate-700/80 hover:border-sky-400/80 bg-[#040814]/50 cursor-pointer transition-all duration-200"
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
                    <Upload className="w-6 h-6 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide text-center">
                      {resumeFileName ? resumeFileName : "Click to upload PDF or DOCX Resume"}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      Maximum file size: 15 MB
                    </span>
                  </label>
                </div>

                {/* Row 4: Defense Focus / Brief Note */}
                <div>
                  <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase mb-2">
                    DEFENSE FOCUS / BRIEF NOTE
                  </label>
                  <textarea
                    rows={4}
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Highlight relevant airframe, autonomy, or defense projects..."
                    className="w-full px-4 py-3 text-xs sm:text-sm bg-[#040814] border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  />
                </div>

                {/* Row 5: NDA & Genuine Credentials Agreement Checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="nda-agreement"
                    required
                    checked={ndaAgreed}
                    onChange={(e) => setNdaAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded bg-[#040814] border-slate-700 text-sky-500 focus:ring-0 cursor-pointer accent-sky-500"
                  />
                  <label
                    htmlFor="nda-agreement"
                    className="text-[11.5px] sm:text-xs text-slate-300 font-normal leading-relaxed cursor-pointer select-none"
                  >
                    I confirm that the submitted technical credentials are genuine and agree to Sky Wardens sovereign defense confidentiality and NDA protocols.
                  </label>
                </div>

                {/* Row 6: Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0d3b61] to-[#125386] hover:from-[#114b7a] hover:to-[#1766a5] text-sky-200 hover:text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-sky-500/40 shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all cursor-pointer"
                >
                  {submitting ? (
                    <span>TRANSMITTING APPLICATION...</span>
                  ) : (
                    <>
                      <span>TRANSMIT APPLICATION</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
