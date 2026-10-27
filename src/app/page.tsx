import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import PartnerMarqueeSection from "@/components/sections/PartnerMarqueeSection";
import HomeAboutSplitSection from "@/components/sections/HomeAboutSplitSection";
import BusinessesSection from "@/components/sections/BusinessesSection";
import PlatformShowcaseSection from "@/components/sections/PlatformShowcaseSection";
import PartnershipsSection from "@/components/sections/PartnershipsSection";
import NewsInsightsSection from "@/components/sections/NewsInsightsSection";
import StrategicCtaBannerSection from "@/components/sections/StrategicCtaBannerSection";
import StrategicConversationFaqSection from "@/components/sections/StrategicConversationFaqSection";
import BreakingNewsTickerSection from "@/components/sections/BreakingNewsTickerSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getHomepageData() {
  try {
    const apiUrl = process.env.CMS_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${apiUrl}/homepage`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      return json.data || null;
    }
  } catch (err) {
    console.error("Failed to fetch homepage data on server:", err);
  }
  return null;
}

export default async function HomePage() {
  const homepageData = await getHomepageData();

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      {/* 1. Flagship 3D Hero Section */}
      <HeroSection initialData={homepageData} />

      {/* 2. Moving Partner Pod Horizon Stream (Directly Below Hero) */}
      <PartnerMarqueeSection />

      {/* 3. About Split Section */}
      <HomeAboutSplitSection />

      {/* 4. Core Businesses Section */}
      <BusinessesSection />

      {/* 4. Featured Platform Showcase */}
      <PlatformShowcaseSection initialData={homepageData} />

      {/* 5. Affiliations / Partnerships */}
      <PartnershipsSection />

      {/* 6. The Newsroom / News & Insights */}
      <NewsInsightsSection />

      {/* 7. Strategic Vision CTA Banner */}
      <StrategicCtaBannerSection initialData={homepageData} />

      {/* 8. Strategic Conversation & FAQ */}
      <StrategicConversationFaqSection />

      {/* 9. Live Breaking News / Spotlight Ticker */}
      <BreakingNewsTickerSection initialItems={homepageData?.tickerItems} />
    </div>
  );
}
