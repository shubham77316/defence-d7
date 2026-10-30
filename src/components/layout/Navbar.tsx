"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/navigation";
import { useNavigation } from "@/context/NavigationContext";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";

function normalizeHref(href?: string): string {
  if (!href) return "/";
  const trimmed = href.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("#")
  ) {
    return trimmed;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed.replace(/\s+/g, "-")}`;
}

function checkIsExternal(item: { badge?: string; href?: string; label?: string }): boolean {
  const badgeLower = (item.badge || "").toLowerCase();
  const href = (item.href || "").trim().toLowerCase();
  return (
    badgeLower === "external" ||
    item.label === "E-Shop" ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { navLinks } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const activeNavLinks = navLinks && navLinks.length > 0 ? navLinks : NAV_LINKS;
  const contactItem = activeNavLinks.find((item) => item.label.trim().toLowerCase() === "contact");
  const mainNavLinks = activeNavLinks.filter((item) => item.label.trim().toLowerCase() !== "contact");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-sky-400/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-2 sm:py-3"
          : "bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-2.5 sm:py-5"
      }`}
    >
      <div className="w-full px-2.5 sm:px-6 md:px-8 lg:px-12 xl:px-14 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Brand Logo */}
        <Logo size="md" showSectorsList />

        {/* Desktop Navigation Links: All options directly visible */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          {/* Sleek Capsule Pill containing all navigation options */}
          <nav className="flex items-center bg-[#040814]/95 backdrop-blur-xl border border-sky-400/35 hover:border-sky-300/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.85)] px-4 xl:px-5 py-1.5 gap-3 xl:gap-5 select-none whitespace-nowrap overflow-visible transition-colors duration-300">
            {mainNavLinks.map((item, idx) => {
              const targetHref = normalizeHref(item.href);
              const isActive = pathname === targetHref || (targetHref !== "/" && pathname.startsWith(targetHref));
              const hasChildren = item.children && item.children.length > 0;
              const isExternal = checkIsExternal(item);
              const itemKey = `${item.label}-${item.href || ""}-${idx}`;

              if (hasChildren) {
                return (
                  <div
                    key={itemKey}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown((prev) => (prev === item.label ? null : item.label))}
                      className={`flex items-center gap-1 text-[13px] xl:text-sm font-medium tracking-wide transition-colors py-1 ${
                        isActive ? "text-sky-300" : "text-slate-200 hover:text-sky-300"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge && item.badge.toLowerCase() !== "external" && (
                        <span className="ml-1 text-[9px] uppercase px-1 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-400/30">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Dropdown Card */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="w-64 rounded-xl p-2 border border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
                          <div className="space-y-1">
                            {item.children?.map((child, cIdx) => (
                              <Link
                                key={`${child.label}-${child.href || cIdx}`}
                                href={normalizeHref(child.href)}
                                className="block px-3 py-2 rounded-lg hover:bg-slate-900/90 transition-colors group/item"
                              >
                                <div className="text-xs font-medium text-slate-200 group-hover/item:text-sky-300">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="text-[10.5px] text-slate-400 mt-0.5 line-clamp-1">
                                    {child.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (isExternal) {
                return (
                  <a
                    key={itemKey}
                    href={targetHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[13px] xl:text-sm font-medium tracking-wide text-slate-200 hover:text-sky-300 transition-colors py-1 group"
                  >
                    <span>{item.label}</span>
                    {item.badge && item.badge.toLowerCase() !== "external" && (
                      <span className="ml-1 text-[9px] uppercase px-1 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-400/30">
                        {item.badge}
                      </span>
                    )}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 transition-colors" />
                  </a>
                );
              }

              return (
                <Link
                  key={itemKey}
                  href={targetHref}
                  className={`flex items-center gap-1 text-[13px] xl:text-sm font-medium tracking-wide transition-colors py-1 ${
                    isActive ? "text-sky-300" : "text-slate-200 hover:text-sky-300"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[9px] uppercase px-1 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-400/30 max-w-[70px] truncate inline-block" title={item.badge}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Contact Button */}
          <Link
            href={contactItem ? normalizeHref(contactItem.href) : "/contact"}
            className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-[#9ad6ff] via-[#7ec8ff] to-[#5cb1f7] text-[#041427] hover:from-white hover:via-[#bce2ff] hover:to-[#7ec8ff] border border-white/50 transition-all duration-300 shadow-[0_2px_14px_rgba(126,200,255,0.35)] hover:shadow-[0_4px_22px_rgba(126,200,255,0.55)] hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
          >
            {contactItem?.label || "Contact"}
          </Link>
        </div>

        {/* Mobile Hamburger Button & Action */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
          <Link
            href={contactItem ? normalizeHref(contactItem.href) : "/contact"}
            className="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase rounded-full bg-sky-400/15 text-sky-200 border border-sky-300/40 whitespace-nowrap shrink-0 hover:bg-sky-400/25 transition-colors"
          >
            {contactItem?.label || "Inquire"}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-400 transition-colors shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-slate-950/98 backdrop-blur-2xl border-t border-slate-800 p-6 overflow-y-auto flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Sovereign Tactical Navigation</span>
              <span className="text-sky-300 font-mono">SYS-ONLINE</span>
            </div>

            <nav className="space-y-2">
              {activeNavLinks.map((item, idx) => {
                const targetHref = normalizeHref(item.href);
                const isExternal = checkIsExternal(item);

                return (
                  <div key={`${item.label}-${item.href || ""}-${idx}`} className="border-b border-slate-900/60 pb-2">
                    {isExternal ? (
                      <a
                        href={targetHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 text-base font-medium text-slate-200 hover:text-sky-300"
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] uppercase px-1 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-400/30">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    ) : (
                      <Link
                        href={targetHref}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 text-base font-medium text-slate-200 hover:text-sky-300"
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] uppercase px-1 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono border border-sky-400/30">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <span className="text-xs font-mono text-sky-400/70">&rarr;</span>
                      </Link>
                    )}

                    {item.children && item.children.length > 0 && (
                      <div className="pl-4 mt-1 space-y-1.5 border-l border-sky-400/20">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={normalizeHref(child.href)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs text-slate-400 hover:text-sky-300 py-1"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-3">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Sky Wardens
            </Button>
            <div className="text-center text-[10px] text-slate-400 font-mono tracking-wider">
              B2G &bull; DEFENCE &bull; AEROSPACE &bull; STRATEGIC CAPABILITY
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
