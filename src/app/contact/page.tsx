"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    enquiryType: "",
    firstName: "",
    company: "",
    country: "",
    city: "",
    email: "",
    contactNo: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.company || !formData.contactNo || !formData.message) {
      setStatus("error");
      setStatusMsg("Please fill in all mandatory fields.");
      return;
    }

    setStatus("loading");
    setStatusMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.firstName,
          company: formData.company,
          country: formData.country || "India",
          city: formData.city,
          email: formData.email,
          contactNo: formData.contactNo,
          message: formData.message,
          areaOfInterest: formData.enquiryType
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setStatusMsg("Your enquiry has been received. Our liaison team will contact you shortly.");
        setFormData({
          enquiryType: "",
          firstName: "",
          company: "",
          country: "",
          city: "",
          email: "",
          contactNo: "",
          message: ""
        });
      } else {
        setStatus("error");
        setStatusMsg(data.message || "Failed to submit. Please verify details and try again.");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen pt-32 sm:pt-36 pb-24 sm:pb-32 bg-[#000000] overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section matching Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-4xl"
        >
          {/* Category Tag */}
          <div className="text-[#7ec8ff] font-oxanium text-xs sm:text-[13px] font-bold tracking-[0.28em] uppercase drop-shadow-[0_0_12px_rgba(126,200,255,0.4)]">
            CONTACT
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black uppercase text-white tracking-tight leading-[1.08]">
            START A STRATEGIC<br />
            CONVERSATION
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
            Join hands with Anuvyom Alliance, where innovation meets mission-critical execution.
          </p>
        </motion.div>

        {/* Two-Column Grid matching Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-12 sm:mt-16">
          
          {/* Left Column: Corporate Office Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Corporate Office Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] tracking-tight">
              Corporate Office
            </h2>

            {/* Address Block */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-slate-300 text-xs sm:text-[13.5px] leading-relaxed">
                <p>{settings.corporateOffice || "Sky Wardens Strategic Engineering Centre, Defence & Aerospace Tech Corridor, India"}</p>
              </div>
            </div>

            {/* Email & Working Hours Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    Email
                  </h3>
                  <div className="text-slate-400 text-xs sm:text-[13px] leading-relaxed space-y-0.5">
                    <p>
                      <a href={`mailto:${settings.contactEmail || "liaison@skywardens.com"}`} className="hover:text-cyan-300 transition-colors">
                        {settings.contactEmail || "liaison@skywardens.com"}
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${settings.inquiriesEmail || "contact@skywardens.in"}`} className="hover:text-cyan-300 transition-colors">
                        {settings.inquiriesEmail || "contact@skywardens.in"}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    Working Hours
                  </h3>
                  <div className="text-slate-400 text-xs sm:text-[13px] leading-relaxed space-y-0.5">
                    <p>{settings.workingHours || "0900 – 1800 IST (Mon – Fri)"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start gap-3.5 pt-2">
              <div className="w-11 h-11 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  Phone Number
                </h3>
                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-mono">
                  <a href={`tel:${settings.phone || "+91 (0) 11 4988 2000"}`} className="hover:text-cyan-300 transition-colors">
                    {settings.phone || "+91 (0) 11 4988 2000"}
                  </a>
                </p>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[240px] sm:h-[260px] w-full bg-[#0a0f1d]">
              <iframe
                title="Anuvyom Alliance Location"
                src="https://maps.google.com/maps?q=Anuvyom+Alliance+Pvt+Ltd,+Site+V,+Greater+Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-105"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 z-10">
                <a
                  href="https://maps.google.com/?q=Anuvyom+Alliance+Pvt+Ltd,+Site+V,+Greater+Noida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold shadow-md transition-all hover:scale-105"
                >
                  <span>Open in Maps</span>
                  <span className="text-[11px]">↗</span>
                </a>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="space-y-4 pt-3">
              <h3 className="text-xl sm:text-2xl font-bold text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7ec8ff] via-[#9ad2ff] to-[#cbe7ff] drop-shadow-[0_2px_10px_rgba(126,200,255,0.25)]">
                Follow Us
              </h3>
              <div className="flex items-center justify-center gap-4 sm:gap-5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-full border border-[#7ec8ff]/35 hover:border-[#7ec8ff]/70 bg-[#071326]/60 hover:bg-[#0c203d]/80 flex items-center justify-center text-[#7ec8ff] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(126,200,255,0.18)] hover:shadow-[0_0_22px_rgba(126,200,255,0.4)] hover:scale-110"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-12 h-12 rounded-full border border-[#7ec8ff]/35 hover:border-[#7ec8ff]/70 bg-[#071326]/60 hover:bg-[#0c203d]/80 flex items-center justify-center text-[#7ec8ff] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(126,200,255,0.18)] hover:shadow-[0_0_22px_rgba(126,200,255,0.4)] hover:scale-110"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-12 h-12 rounded-full border border-[#7ec8ff]/35 hover:border-[#7ec8ff]/70 bg-[#071326]/60 hover:bg-[#0c203d]/80 flex items-center justify-center text-[#7ec8ff] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(126,200,255,0.18)] hover:shadow-[0_0_22px_rgba(126,200,255,0.4)] hover:scale-110"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* X */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="w-12 h-12 rounded-full border border-[#7ec8ff]/35 hover:border-[#7ec8ff]/70 bg-[#071326]/60 hover:bg-[#0c203d]/80 flex items-center justify-center text-[#7ec8ff] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(126,200,255,0.18)] hover:shadow-[0_0_22px_rgba(126,200,255,0.4)] hover:scale-110"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form Card matching exact screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-[28px] sm:rounded-[32px] bg-[#020514]/95 border border-[#0f172a] p-8 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
              
              <div className="text-slate-300 text-sm font-normal mb-8">
                Fields marked with <span className="text-white">*</span> are mandatory
              </div>

              <form onSubmit={handleSubmit} className="space-y-7">
                
                {/* Row 1: Select Enquiry Type & First Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-xs sm:text-[13px] text-slate-300 font-normal mb-2">
                      Select Enquiry Type*
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-[#7ec8ff] pb-2 text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#05081c] text-slate-400">
                        Choose an enquiry
                      </option>
                      <option value="Product(s) Enquiry" className="bg-[#05081c] text-white">
                        Product(s) Enquiry
                      </option>
                      <option value="Strategic Partnership / Joint Venture" className="bg-[#05081c] text-white">
                        Strategic Partnership / Joint Venture
                      </option>
                      <option value="Procurement / Tender" className="bg-[#05081c] text-white">
                        Procurement / Tender
                      </option>
                      <option value="Distributor / Channel Partnership" className="bg-[#05081c] text-white">
                        Distributor / Channel Partnership
                      </option>
                      <option value="Institutional / Government Engagement" className="bg-[#05081c] text-white">
                        Institutional / Government Engagement
                      </option>
                      <option value="Affiliations / Collaboration" className="bg-[#05081c] text-white">
                        Affiliations / Collaboration
                      </option>
                      <option value="Careers / Recruitment" className="bg-[#05081c] text-white">
                        Careers / Recruitment
                      </option>
                      <option value="Media / Corporate Communication" className="bg-[#05081c] text-white">
                        Media / Corporate Communication
                      </option>
                      <option value="General Enquiry" className="bg-[#05081c] text-white">
                        General Enquiry
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] text-slate-300 font-normal mb-2">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                      className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-[#7ec8ff] pb-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Select Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-xs sm:text-[13px] text-slate-300 font-normal mb-2">
                      Company*
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter company"
                      required
                      className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-[#7ec8ff] pb-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] text-slate-300 font-normal mb-2">
                      Select Country*
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-[#7ec8ff] pb-2 text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#05081c] text-slate-400">Choose a country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-[#05081c] text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: City & Email Id */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-xs sm:text-[13px] text-slate-300 font-normal mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city (optional)"
                      className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-[#7ec8ff] pb-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-[13px] text-slate-300 font-normal mb-2">
                      Email Id*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                      className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-[#7ec8ff] pb-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 4: Contact No. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-xs sm:text-[13px] text-slate-300 font-normal mb-2">
                      Contact No.*
                    </label>
                    <div className="flex items-center gap-3 border-b border-white/20 hover:border-white/40 focus-within:border-[#7ec8ff] pb-2 transition-colors">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-white whitespace-nowrap cursor-pointer">
                        <span>IN +91</span>
                        <span className="text-xs text-slate-400">⌄</span>
                      </div>
                      <input
                        type="tel"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        placeholder="Enter phone no."
                        required
                        className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="hidden sm:block" />
                </div>

                {/* Row 5: Message */}
                <div>
                  <label className="block text-xs sm:text-[13px] text-slate-300 font-normal mb-2">
                    Message*
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your enquiry"
                    required
                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-[#7ec8ff] pb-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Status Feedback */}
                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                {/* Footer Row: Notice & Submit Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-4">
                  <div className="text-slate-400 text-xs sm:text-[13px]">
                    Your enquiry will be sent directly to Anuvyom.
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center px-10 py-2.5 rounded-full border border-[#7ec8ff] text-[#7ec8ff] hover:bg-[#7ec8ff] hover:text-slate-950 font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_0_16px_rgba(126,200,255,0.22)] hover:shadow-[0_0_25px_rgba(126,200,255,0.45)] disabled:opacity-50"
                  >
                    <span>{status === "loading" ? "Submitting..." : "Submit"}</span>
                  </button>
                </div>

              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
