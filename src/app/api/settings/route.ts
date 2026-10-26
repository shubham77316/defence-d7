import { NextResponse } from "next/server";
import { COMPANY_INFO } from "@/data/company";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_API_URL = process.env.CMS_API_URL || "http://localhost:5000/api";

const DEFAULT_SETTINGS = {
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
  logoUrl: "/images/skywardens-logo.png",
  faviconUrl: "/favicon.ico",
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "YouTube", url: "https://youtube.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "X", url: "https://x.com" },
    { platform: "TikTok", url: "https://tiktok.com" },
  ],
  seoDefaults: {
    metaTitle: "Sky Wardens — Sovereign Aerospace & Defence Engineering Group",
    metaDescription: "Sky Wardens architects and manufactures sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
    keywords: ["Sky Wardens", "Defence Engineering", "Aerospace Systems", "UAV Platforms", "Sovereign Capability"],
  },
  copyrightText: "SKY WARDENS ALLIANCE PVT. LTD.",
};

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/settings`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(
        {
          success: true,
          data: data.data || data,
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
    }
  } catch (error) {
    console.warn("[SETTINGS API PROXY] Backend unreachable, returning fallback:", error);
  }

  return NextResponse.json(
    {
      success: true,
      data: DEFAULT_SETTINGS,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
