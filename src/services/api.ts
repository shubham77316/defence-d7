/**
 * Sky Wardens CMS Integration Service
 * Connects Next.js frontend with the Node.js/Express CMS backend (port 5000)
 * Includes resilient fallbacks to static data if backend is offline.
 */

import { NAV_LINKS as navigationLinks } from "../data/navigation";
import { COMPANY_INFO as companyInfo } from "../data/company";
import { BUSINESS_SECTORS as businesses } from "../data/businesses";
import { STRATEGIC_ECOSYSTEM as partners } from "../data/partners";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL ||
  (typeof window !== "undefined"
    ? "http://localhost:5000/api"
    : process.env.CMS_API_URL || "http://localhost:5000/api");

async function fetchFromApi<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 }, // Revalidate every 60s in Next.js ISR
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return fallbackData;
    }

    const json = await res.json();
    return (json.data !== undefined ? json.data : json) as T;
  } catch (error) {
    // Return static data fallback silently
    return fallbackData;
  }
}

export const cmsApi = {
  // Website Settings
  getSettings: async () => {
    return fetchFromApi("/settings", {
      siteName: companyInfo.name,
      companyName: companyInfo.name,
      tagline: companyInfo.tagline,
      contactEmail: companyInfo.contact.email,
      contactPhone: companyInfo.contact.phone,
      headquartersAddress: companyInfo.contact.corporateOffice,
    });
  },

  // Navigation Items
  getNavigation: async () => {
    return fetchFromApi("/navigation", navigationLinks);
  },

  // Footer Content
  getFooter: async () => {
    return fetchFromApi("/footer", {
      tagline: companyInfo.tagline,
      statement: companyInfo.foundingVision,
      address: companyInfo.contact.corporateOffice,
      contactEmail: companyInfo.contact.email,
      contactPhone: companyInfo.contact.phone,
    });
  },

  // Homepage Config
  getHomepage: async () => {
    return fetchFromApi("/homepage", {
      heroTitle: "ARCHITECTING SOVEREIGN DEFENCE AND AEROSPACE ECOSYSTEMS",
      heroSubtitle: "Advanced platforms engineered for multi-domain tactical supremacy.",
    });
  },

  // About Page Config
  getAbout: async () => {
    return fetchFromApi("/about", {
      headline: "DEFENCE ENGINEERING BUILT FOR STRATEGIC INDEPENDENCE",
      subHeadline: "From carbon-composite airframes to quantum-resistant radar suites.",
    });
  },

  // Products & Systems
  getProducts: async (category?: string) => {
    const qs = category && category !== "ALL" ? `?category=${encodeURIComponent(category)}` : "";
    return fetchFromApi(`/products${qs}`, businesses);
  },

  getProductBySlug: async (slug: string) => {
    return fetchFromApi(`/products/${slug}`, null);
  },

  // News & Intelligence
  getNews: async (category?: string) => {
    const qs = category && category !== "ALL" ? `?category=${encodeURIComponent(category)}` : "";
    return fetchFromApi(`/news${qs}`, []);
  },

  getNewsBySlug: async (slug: string) => {
    return fetchFromApi(`/news/${slug}`, null);
  },

  // Strategic Partners
  getPartners: async () => {
    return fetchFromApi("/partners", partners);
  },

  // FAQs
  getFaqs: async () => {
    return fetchFromApi("/faqs", []);
  },

  // Submit Contact Form
  submitContact: async (data: Record<string, any>) => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

export default cmsApi;
