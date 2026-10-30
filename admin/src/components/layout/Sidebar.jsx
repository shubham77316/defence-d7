import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  Settings,
  Menu,
  Layers,
  Home,
  Info,
  Shield,
  Newspaper,
  Building2,
  UserCheck,
  ShieldCheck,
  History,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const NAV_SECTIONS = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard, module: "dashboard" },
    ],
  },
  {
    title: "WEBSITE CMS",
    items: [
      { label: "Header & Nav", href: "/navigation", icon: Menu, module: "navigation" },
      { label: "Homepage", href: "/homepage", icon: Home, module: "homepage" },
      { label: "About Page", href: "/about", icon: Info, module: "about" },
      { label: "Footer Management", href: "/footer", icon: Layers, module: "footer" },
    ],
  },
  {
    title: "DEFENCE & SYSTEMS",
    items: [
      { label: "Products & Systems", href: "/products", icon: Shield, module: "products" },
    ],
  },
  {
    title: "MEDIA & COMMS",
    items: [
      { label: "News & Insights", href: "/news", icon: Newspaper, module: "news" },
    ],
  },
  {
    title: "DATA & CMS",
    items: [
      { label: "Enquiries", href: "/enquiries", icon: Inbox, module: "enquiries", badge: "Live", badgeType: "danger" },
      { label: "Website Settings", href: "/settings", icon: Settings, module: "settings" },
      { label: "Audit Logs", href: "/audit-logs", icon: History, module: "profile" },
      { label: "Admin Profile", href: "/profile", icon: UserCheck, module: "profile" },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user } = useAuth();

  const isSuperAdmin = user?.role === "SUPER_ADMIN" || user?.role === "admin";

  // Filter sections and their items based on role and granular permissions
  const filteredSections = NAV_SECTIONS.map((section) => {
    const items = section.items.filter((item) => {
      if (item.superAdminOnly) {
        return isSuperAdmin;
      }
      if (isSuperAdmin) {
        return true;
      }
      // For regular ADMIN accounts
      if (!item.module) return true;
      return Array.isArray(user?.permissions) && user.permissions.includes(item.module);
    });
    return { ...section, items };
  }).filter((section) => section.items.length > 0);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#050b18] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Brand Identity */}
        <div className="h-20 flex items-center px-5 border-b border-white/10 gap-3 bg-[#040814]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#165a9b]/30 via-[#0e3d6e]/20 to-transparent border border-[#247bc4]/40 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(26,91,152,0.3)] shrink-0">
            <img
              src={logoImg}
              alt="Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_6px_rgba(36,123,196,0.5)]"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold tracking-wider text-white uppercase font-sans truncate">
              SKY WARDENS
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-medium text-sky-400 tracking-wide font-sans whitespace-nowrap">
                CMS Command
              </span>
              <span className="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 whitespace-nowrap">
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-3 px-3 overflow-y-auto space-y-3.5">
          {filteredSections.map((section, idx) => (
            <div key={section.title} className="space-y-1">
              <div
                className={`px-3 ${
                  idx === 0 ? "pt-1" : "pt-4 mt-1 border-t border-white/[0.07]"
                } pb-1.5 select-none`}
              >
                <span className="text-[11px] font-bold tracking-wider text-[#7ec8ff] uppercase font-sans">
                  {section.title}
                </span>
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? location.pathname === "/" || location.pathname === "/dashboard"
                    : location.pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium tracking-normal transition-all duration-200 group ${
                      isActive
                        ? item.superAdminOnly
                          ? "bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-white border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold"
                          : "bg-gradient-to-r from-sky-500/20 to-sky-500/5 text-white border border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.15)] font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-1">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? item.superAdminOnly
                              ? "text-emerald-400"
                              : "text-sky-400"
                            : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      />
                      <span className="whitespace-nowrap truncate">{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase font-sans whitespace-nowrap shrink-0 ml-auto ${
                          item.badgeType === "danger"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-[0_0_8px_rgba(244,63,94,0.15)]"
                            : item.superAdminOnly || item.badgeType === "emerald"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                            : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : (
                      isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0 ml-auto" />
                      )
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom External Link to Live Site */}
        <div className="p-4 border-t border-white/10 bg-[#040814]">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              View Public Website
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </aside>
    </>
  );
}
