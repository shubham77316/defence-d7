import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_API_URL = process.env.CMS_API_URL || "http://localhost:5000/api";

const DEFAULT_HOMEPAGE = {
  heroTag: "SOVEREIGN AEROSPACE & DEFENCE SYSTEMS",
  heroTitle: "ENGINEERING STRATEGIC CAPABILITY FOR THE NEXT ERA",
  heroSubtitle:
    "Architecting sovereign aerospace platforms, kinetic tactical survivability systems, and specialized industrial petrochemical formulations.",
  heroCtaText: "",
  heroCtaLink: "/capabilities",
  heroSecondaryCtaText: "Initiate Liaison",
  heroSecondaryCtaLink: "/contact",
  tickerItems: [
    { tag: "SPOTLIGHT:", text: "SKY WARDENS MAKING HEADLINES" },
    { tag: "DEFENCE UPDATE:", text: "SOVEREIGN AIRFRAMES & AUTONOMOUS SURVEILLANCE FLEET EXPANDS" },
    { tag: "SPOTLIGHT:", text: "SKY WARDENS MAKING HEADLINES" },
    { tag: "STRATEGIC MILESTONE:", text: "MULTI-DOMAIN TACTICAL PLATFORMS ACHIEVE MISSION READINESS" },
    { tag: "SPOTLIGHT:", text: "SKY WARDENS MAKING HEADLINES" },
    { tag: "INDUSTRY LEADERSHIP:", text: "PRECISION INDIGENOUS ENGINEERING CALIBRATED FOR GLOBAL DEPLOYMENT" },
  ],
  showcaseTitle: "STRATEGIC HYPERSONIC & AEROSPACE PLATFORMS",
  showcaseSubtitle: "SOVEREIGN MULTI-MISSION AIRFRAMES",
  showcaseDesc:
    "Engineered to deliver unmatched beyond-line-of-sight situational intelligence and tactical air superiority.",
  ctaBannerTitle: "SHAPING SOVEREIGN DEFENCE READINESS",
  ctaBannerDesc:
    "Partner with Sky Wardens to engineer and deploy next-generation autonomous aerospace airframes, multi-domain defence systems, and resilient industrial technologies.",
  ctaBannerButtonText: "Initiate Strategic Liaison",
  ctaBannerButtonLink: "/contact",
  ctaBannerSecondaryButtonText: "",
  ctaBannerSecondaryButtonLink: "/capabilities",
};

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/homepage`, {
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
    console.warn("[HOMEPAGE API PROXY] Backend unreachable, returning fallback:", error);
  }

  return NextResponse.json(
    {
      success: true,
      data: DEFAULT_HOMEPAGE,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
