"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { COMPANY_INFO } from "@/data/company";

export interface SettingsData {
  siteName: string;
  companyName: string;
  tagline: string;
  subTagline: string;
  foundingVision: string;
  corporateOffice: string;
  contactEmail: string;
  inquiriesEmail: string;
  phone: string;
  workingHours: string;
  clearanceNotice: string;
  logoUrl?: string;
  faviconUrl?: string;
  socialLinks?: Array<{ platform: string; url: string; icon?: string }>;
  seoDefaults?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  copyrightText: string;
}

const DEFAULT_SETTINGS: SettingsData = {
  siteName: COMPANY_INFO.name || "Sky Wardens",
  companyName: "Sky Wardens Alliance Private Limited",
  tagline: COMPANY_INFO.tagline || "Engineering Strategic Capability For The Next Era",
  subTagline: COMPANY_INFO.subTagline || "Aerospace / Defence / Advanced Systems / Petrochemical",
  foundingVision: COMPANY_INFO.foundingVision || "Sky Wardens was established to develop durable industrial capability, engineering systems and strategic technologies designed for long-term impact.",
  corporateOffice: COMPANY_INFO.contact.corporateOffice || "Sky Wardens Strategic Engineering Centre, Defence & Aerospace Tech Corridor, India",
  contactEmail: COMPANY_INFO.contact.email || "liaison@skywardens.com",
  inquiriesEmail: COMPANY_INFO.contact.inquiriesEmail || "contact@skywardens.in",
  phone: COMPANY_INFO.contact.phone || "+91 (0) 11 4988 2000",
  workingHours: COMPANY_INFO.contact.hours || "0900 – 1800 IST (Mon – Fri)",
  clearanceNotice: COMPANY_INFO.contact.clearanceNotice || "Institutional and government procurement inquiries are routed through secure, verified liaison protocols.",
  copyrightText: "SKY WARDENS ALLIANCE PVT. LTD.",
  seoDefaults: {
    metaTitle: "Sky Wardens — Sovereign Aerospace & Defence Engineering Group",
    metaDescription: "Sky Wardens architects and manufactures sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
    keywords: ["Sky Wardens", "Defence Engineering", "Aerospace Systems", "UAV Platforms", "Sovereign Capability"],
  },
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "YouTube", url: "https://youtube.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "X", url: "https://x.com" },
    { platform: "TikTok", url: "https://tiktok.com" },
  ],
};

interface SettingsContextType {
  settings: SettingsData;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  loading: false,
  refreshSettings: async () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const loaded = json.data;
          setSettings((prev) => ({
            ...prev,
            ...loaded,
            siteName: loaded.siteName || prev.siteName,
            companyName: loaded.companyName || prev.companyName,
            tagline: loaded.tagline || prev.tagline,
            subTagline: loaded.subTagline || prev.subTagline,
            foundingVision: loaded.foundingVision || prev.foundingVision,
            corporateOffice: loaded.corporateOffice || prev.corporateOffice,
            contactEmail: loaded.contactEmail || prev.contactEmail,
            inquiriesEmail: loaded.inquiriesEmail || prev.inquiriesEmail,
            phone: loaded.phone || prev.phone,
            workingHours: loaded.workingHours || prev.workingHours,
            clearanceNotice: loaded.clearanceNotice || prev.clearanceNotice,
            copyrightText: loaded.copyrightText || prev.copyrightText,
            seoDefaults: {
              ...prev.seoDefaults,
              ...(loaded.seoDefaults || {}),
            },
            socialLinks: loaded.socialLinks?.length ? loaded.socialLinks : prev.socialLinks,
          }));

          // Live document title updates for SEO and browser tab
          if (loaded.seoDefaults?.metaTitle && typeof document !== "undefined") {
            document.title = loaded.seoDefaults.metaTitle;
          }
        }
      }
    } catch (err) {
      console.warn("[SettingsContext] Failed to load dynamic settings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchSettings();
      }
    };

    window.addEventListener("focus", fetchSettings);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const pollInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchSettings();
      }
    }, 4000);

    return () => {
      window.removeEventListener("focus", fetchSettings);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(pollInterval);
    };
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  return ctx;
}
