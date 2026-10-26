"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "@/context/SettingsContext";
import { useNavigation } from "@/context/NavigationContext";

function renderSocialIcon(platform: string) {
  const p = (platform || "").toLowerCase();

  if (p.includes("instagram")) {
    return (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }

  if (p.includes("youtube")) {
    return (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  if (p.includes("linkedin")) {
    return (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    );
  }

  if (p.includes("facebook") || p.includes("fb")) {
    return (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 4 16.5 4H18V0h-3.808C9.59 0 9 3.585 9 6.056V8z" />
      </svg>
    );
  }

  if (p === "x" || p.includes("twitter")) {
    return (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (p.includes("tiktok")) {
    return (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 3.2-4.41V9.44a6.34 6.34 0 0 0-2.36-.44 6.34 6.34 0 1 0 6.34 6.34V8.58a8.21 8.21 0 0 0 5.24 1.58V6.69z" />
      </svg>
    );
  }

  if (p.includes("snap")) {
    return (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
        <path d="M12.001 2.25c-3.13 0-5.625 2.37-5.625 5.568 0 .428.057.854.168 1.272-.693.186-1.398.544-1.637 1.11-.271.642.122 1.353.738 1.572.062.022.126.038.19.048-.052.261-.092.528-.092.8 0 1.218.736 2.052 1.573 2.502-.045.244-.226.702-.857 1.096-.642.4-1.358.558-1.782.646-.226.047-.367.26-.328.484.05.289.336.574.887.695.733.161 1.633.09 2.502-.191.564-.183 1.1-.476 1.597-.847.74.321 1.632.503 2.666.503 1.034 0 1.926-.182 2.666-.503.497.371 1.033.664 1.597.847.869.281 1.769.352 2.502.191.551-.121.837-.406.887-.695.039-.224-.102-.437-.328-.484-.424-.088-1.14-.246-1.782-.646-.631-.394-.812-.852-.857-1.096.837-.45 1.573-1.284 1.573-2.502 0-.272-.04-.539-.092-.8.064-.01.128-.026.19-.048.616-.219 1.009-.93.738-1.572-.239-.566-.944-.924-1.637-1.11.111-.418.168-.844.168-1.272 0-3.198-2.495-5.568-5.625-5.568z" />
      </svg>
    );
  }

  if (p.includes("whatsapp")) {
    return (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
        <path d="M12.031 2C6.494 2 2 6.495 2 12.031a10 10 0 0 0 1.547 5.375L2 22l4.75-1.516A10 10 0 1 0 12.031 2zm0 18.25a8.2 8.2 0 0 1-4.203-1.156l-.313-.188-3.109.985.984-3.078-.187-.313A8.25 8.25 0 1 1 12.031 20.25z" />
      </svg>
    );
  }

  // Fallback dynamic web link icon
  return (
    <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="url(#footerSocialIconLogoBlue)" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="url(#footerSocialIconLogoBlue)" strokeWidth="2" fill="none" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="url(#footerSocialIconLogoBlue)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export default function Footer() {
  const { settings } = useSettings();
  const { navLinks: dynamicNavLinks } = useNavigation();
  const [footerData, setFooterData] = useState<{
    heading?: string;
    description?: string;
    inquiriesEmail?: string;
    copyrightText?: string;
    navLinks?: Array<{ label: string; href: string; order?: number }>;
    focusLinks?: Array<{ label: string; href: string; order?: number }>;
    socialLinks?: Array<{ platform: string; href: string; label?: string }>;
  } | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch("/api/footer", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setFooterData(json.data);
          }
        }
      } catch {
        // Fallback silently
      }
    };

    fetchFooter();
    window.addEventListener("focus", fetchFooter);
    const interval = setInterval(fetchFooter, 3000);
    return () => {
      window.removeEventListener("focus", fetchFooter);
      clearInterval(interval);
    };
  }, []);

  // Dynamic navigation links from Footer Management, falling back to header navigation links
  const navLinks =
    footerData?.navLinks && footerData.navLinks.length > 0
      ? footerData.navLinks.map((item) => ({
          label: item.label,
          href: item.href.startsWith("http")
            ? item.href
            : item.href.startsWith("/")
            ? item.href
            : `/${item.href.replace(/\s+/g, "-")}`,
        }))
      : dynamicNavLinks && dynamicNavLinks.length > 0
      ? dynamicNavLinks.map((item) => ({
          label: item.label,
          href: item.href.startsWith("http")
            ? item.href
            : item.href.startsWith("/")
            ? item.href
            : `/${item.href.replace(/\s+/g, "-")}`,
        }))
      : [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Products", href: "/capabilities" },
          { label: "Affiliations", href: "/partnerships" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
        ];

  // Dynamic focus links from Footer Management, falling back to default
  const focusLinks =
    footerData?.focusLinks && footerData.focusLinks.length > 0
      ? footerData.focusLinks.map((item) => ({
          label: item.label,
          href: item.href.startsWith("http")
            ? item.href
            : item.href.startsWith("/")
            ? item.href
            : `/${item.href.replace(/\s+/g, "-")}`,
        }))
      : [
          { label: "Aerospace", href: "/aerospace" },
          { label: "Defence", href: "/defence" },
        ];

  // Dynamic social links from Footer Management, falling back to Website Settings
  const rawSocials =
    footerData?.socialLinks && footerData.socialLinks.length > 0
      ? footerData.socialLinks.map((s) => ({
          label: s.platform || s.label || "Social",
          href: s.href || "#",
        }))
      : settings.socialLinks && settings.socialLinks.length > 0
      ? settings.socialLinks.map((s) => ({
          label: s.platform || "Social",
          href: s.url || "#",
        })) 
      : [
          { label: "Instagram", href: "https://instagram.com" },
          { label: "YouTube", href: "https://youtube.com" },
          { label: "LinkedIn", href: "https://linkedin.com" },
          { label: "Facebook", href: "https://facebook.com" },
          { label: "X", href: "https://x.com" },
          { label: "TikTok", href: "https://tiktok.com" },
        ];

  const socialLinks = rawSocials.map((item) => ({
    label: item.label,
    href: item.href.startsWith("http") ? item.href : `https://${item.href}`,
    icon: renderSocialIcon(item.label),
  }));

  return (
    <footer className="w-full bg-[#03060d] text-slate-300 border-t border-white/10 pt-10 sm:pt-14 pb-2 sm:pb-4">
      {/* Hidden Global SVG Gradient Definition for Social Icons */}
      <svg width="0" height="0" className="absolute pointer-events-none w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="footerSocialIconLogoBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7ec8ff" />
            <stop offset="30%" stopColor="#48a2f0" />
            <stop offset="70%" stopColor="#247bc4" />
            <stop offset="100%" stopColor="#1a64a0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="w-full px-3.5 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        {/* ========================================================= */}
        {/* ARCHITECTURAL BOXED GRID FRAME (Matching Reference Style) */}
        {/* ========================================================= */}
        <div className="w-full border border-white/15 bg-[#050914]/80 backdrop-blur-md">
          
          {/* TOP ROW: 3 Distinct Compartment Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
            
            {/* Box 1 (Top Left): Make In India Lion + Trajectory Statement */}
            <div className="sm:col-span-2 lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8">
              <Image
                src="/images/make-in-india-lion.png"
                alt="Make in India — Mechanical Lion"
                width={240}
                height={110}
                className="object-contain w-[140px] xs:w-[160px] sm:w-[190px] md:w-[220px] max-w-full h-auto opacity-95 hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
                priority
                unoptimized
              />

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-white tracking-tight leading-tight whitespace-pre-line">
                  {footerData?.heading?.trim() || "Raise your\nsovereign trajectory"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-md">
                  {footerData?.description || settings.seoDefaults?.metaDescription || settings.foundingVision || "Architecting sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations."}
                </p>
              </div>
            </div>

            {/* Box 2 (Top Middle): NAVIGATION Column */}
            <div className="sm:col-span-1 lg:col-span-3 border-t sm:border-t lg:border-t-0 lg:border-l border-white/15 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-semibold tracking-[0.3em] uppercase text-slate-500">
                  NAVIGATION
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm font-normal text-slate-300 hover:text-white transition-colors duration-200 block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Box 3 (Top Right): FOCUS */}
            <div className="sm:col-span-1 lg:col-span-3 border-t sm:border-t lg:border-t-0 sm:border-l border-white/15 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-semibold tracking-[0.3em] uppercase text-slate-500">
                  FOCUS
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  {focusLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm font-normal text-slate-300 hover:text-white transition-colors duration-200 block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* BOTTOM ROW: Symmetrical 2-Compartment Row (Social on Left, Inquiries on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/15">
            
            {/* Box 4 (Bottom Left): Social Icons Compartment */}
            <div className="lg:col-span-6 px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-slate-500">
                SOCIAL
              </span>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="transition-all duration-300 hover:scale-125 hover:brightness-125 cursor-pointer select-none shrink-0 p-0.5"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Box 5 (Bottom Right): Inquiries Email Compartment */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/15 lg:col-span-6 px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-slate-500">
                INQUIRIES
              </span>
              <a
                href={`mailto:${footerData?.inquiriesEmail || settings.inquiriesEmail || "contact@skywardens.in"}`}
                className="text-xs sm:text-sm font-mono text-slate-300 hover:text-white transition-colors duration-200"
              >
                {footerData?.inquiriesEmail || settings.inquiriesEmail || "contact@skywardens.in"}
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 sm:pt-6 pb-0 text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] text-slate-500 text-center sm:text-left">
          COPYRIGHT &copy; {new Date().getFullYear()} {footerData?.copyrightText || settings.copyrightText || settings.companyName || "SKY WARDENS ALLIANCE PVT. LTD."}
        </div>
      </div>

      {/* Massive Monumental SKY WARDENS Wordmark at the Very Last of the Page - Aligned With Navbar */}
      <div className="w-full pt-1 sm:pt-2 pb-0 flex items-center justify-center select-none overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        <svg
          viewBox="0 15 1000 133"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-hidden block"
          aria-label="SKY WARDENS"
        >
          <defs>
            {/* Top Half Solid Gradient: SKY (Royal Blue Sheen - Lighter Tone) */}
            <linearGradient id="footerSkyBlueTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7ec8ff" />
              <stop offset="30%" stopColor="#48a2f0" />
              <stop offset="70%" stopColor="#247bc4" />
              <stop offset="100%" stopColor="#1a64a0" />
            </linearGradient>

            {/* Top Half Solid Gradient: WARDENS (Titanium Steel Sheen - Lighter Tone) */}
            <linearGradient id="footerWardensSteelTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#f1f5f9" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Bottom Half Color Enhancer Gradient */}
            <linearGradient id="footerBottomPhotoEnhance" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
            </linearGradient>

            {/* Full Wordmark Letter ClipPath */}
            <clipPath id="footerFullWordmarkClip">
              <text
                x="0"
                y="146"
                fontFamily="var(--font-oxanium), 'Rajdhani', 'Anton', sans-serif"
                fontSize="180"
                fontWeight="900"
                letterSpacing="0"
                textLength="992"
                lengthAdjust="spacingAndGlyphs"
              >
                <tspan>SKY</tspan>
                <tspan dx="35">WARDENS</tspan>
              </text>
            </clipPath>

            {/* Top Half Clip (y: 0 to 86) */}
            <clipPath id="footerTopHalfClip">
              <rect x="0" y="0" width="1000" height="86" />
            </clipPath>

            {/* Bottom Half Clip (y: 86 to 156) */}
            <clipPath id="footerBottomHalfClip">
              <rect x="0" y="86" width="1000" height="70" />
            </clipPath>
          </defs>

          {/* Main Master Group with Letter Cutout */}
          <g clipPath="url(#footerFullWordmarkClip)">
            {/* TOP HALF: Clean Crisp Metallic Solid Typography */}
            <g clipPath="url(#footerTopHalfClip)">
              <rect x="0" y="0" width="315" height="86" fill="url(#footerSkyBlueTop)" />
              <rect x="310" y="0" width="690" height="86" fill="url(#footerWardensSteelTop)" />
              <rect x="0" y="0" width="1000" height="12" fill="#ffffff" opacity="0.25" />
            </g>

            {/* BOTTOM HALF: High-Impact Authentic Stealth Jet Photo */}
            <g clipPath="url(#footerBottomHalfClip)">
              <image
                href="/images/footer-stealth-jet.jpg"
                x="0"
                y="-10"
                width="1000"
                height="170"
                preserveAspectRatio="xMidYMid slice"
                className="filter brightness-105 contrast-105"
              />
              {/* Subtle Natural Atmosphere Tint */}
              <rect
                x="0"
                y="86"
                width="1000"
                height="70"
                fill="url(#footerBottomPhotoEnhance)"
                opacity="0.25"
              />
              <rect
                x="0"
                y="136"
                width="1000"
                height="20"
                fill="#010308"
                opacity="0.5"
              />
            </g>

            {/* MIDLINE: Futuristic Tactical Laser Divider Horizon */}
            <line x1="0" y1="86" x2="1000" y2="86" stroke="#38bdf8" strokeWidth="1.5" opacity="0.85" />
            <line x1="0" y1="86" x2="1000" y2="86" stroke="#ffffff" strokeWidth="0.6" opacity="0.9" />
          </g>

          {/* EXTERIOR: Sharp Bevel Outline for 3D Tactical Clarity */}
          <text
            x="0"
            y="146"
            fontFamily="var(--font-oxanium), 'Rajdhani', 'Anton', sans-serif"
            fontSize="180"
            fontWeight="900"
            letterSpacing="0"
            textLength="992"
            lengthAdjust="spacingAndGlyphs"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          >
            <tspan>SKY</tspan>
            <tspan dx="35">WARDENS</tspan>
          </text>
        </svg>
      </div>
    </footer>
  );
}
