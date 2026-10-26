"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { COMPANY_INFO } from "@/data/company";
import { useSettings } from "@/context/SettingsContext";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Lock,
  Building2,
  User,
  Globe,
  MessageSquare
} from "lucide-react";

export default function ContactSection() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    country: "India",
    areaOfInterest: "Strategic Partnership",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setReferenceId(data.referenceId || `ANV-${Math.floor(100000 + Math.random() * 900000)}`);
        setFormData({
          fullName: "",
          company: "",
          email: "",
          phone: "",
          country: "India",
          areaOfInterest: "Strategic Partnership",
          message: ""
        });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit inquiry. Please verify inputs and retry.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage("Network or server connection issue. Please try again later.");
    }
  };

  return (
    <section className="relative py-28 bg-slate-950 overflow-hidden border-t border-slate-900" id="contact">
      {/* Background Lighting */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex justify-center">
            <Badge variant="radar" size="sm">
              Strategic Liaison
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Contact <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
              Sky Wardens
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Institutional, government procurement, and strategic industrial partnership communications are handled through verified liaison channels.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Corporate Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 space-y-6 border-cyan-500/20">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                <Lock className="w-4 h-4" />
                <span>Verified Liaison Desk</span>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Engineering Headquarters</div>
                    <div className="text-slate-400 text-xs mt-0.5">{settings.corporateOffice || COMPANY_INFO.contact.corporateOffice}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Direct Communications</div>
                    <a href={`mailto:${settings.contactEmail || COMPANY_INFO.contact.email}`} className="text-cyan-300 hover:underline text-xs">
                      {settings.contactEmail || COMPANY_INFO.contact.email}
                    </a>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      Strategic inquiries: {settings.inquiriesEmail || COMPANY_INFO.contact.inquiriesEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Telephone Exchange</div>
                    <div className="text-slate-300 text-xs">{settings.phone || COMPANY_INFO.contact.phone}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{settings.workingHours || COMPANY_INFO.contact.hours}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 leading-relaxed">
                <div className="text-cyan-400 font-bold mb-1">CLEARANCE NOTICE</div>
                {settings.clearanceNotice || COMPANY_INFO.contact.clearanceNotice}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 sm:p-10 border-cyan-500/30 shadow-2xl relative">
              
              {status === "success" ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Your transmission has been logged into the Sky Wardens liaison desk. A strategic representative will verify and respond via encrypted channel.
                  </p>
                  <div className="inline-block p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                    REFERENCE ID: {referenceId}
                  </div>
                  <div className="pt-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setStatus("idle")}
                    >
                      Send Another Transmission
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-between">
                    <span>Institutional Inquiry Transmission</span>
                    <span className="text-[10px] text-slate-400">ENCRYPTED PROTOCOL</span>
                  </div>

                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Commander Vikram Singh"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Company / Institution */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Organization / Entity <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Defence Force / Ministry / Enterprise"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Official Email <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="official@entity.gov.in"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Phone / DDI
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Country / Jurisdiction
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="India / Partner Nation"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Area of Interest */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">
                        Area of Interest <span className="text-cyan-400">*</span>
                      </label>
                      <select
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white transition-colors"
                      >
                        <option value="Aerospace">01 — Aerospace &amp; UAV Systems</option>
                        <option value="Defence">02 — Defence &amp; Tactical Protection</option>
                        <option value="Advanced Systems">03 — Advanced Systems &amp; Ground Robotics</option>
                        <option value="Petrochemical">04 — Petrochemical &amp; Tribology</option>
                        <option value="Strategic Partnership">Strategic Institutional Partnership</option>
                        <option value="General Inquiry">General Corporate Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-300">
                      Inquiry Details / Operational Requirements <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify operational parameters, procurement specifications, or institutional scope..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="cyan"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full justify-center"
                      icon={
                        status === "loading" ? (
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )
                      }
                    >
                      {status === "loading" ? "Transmitting..." : "Send Inquiry"}
                    </Button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
