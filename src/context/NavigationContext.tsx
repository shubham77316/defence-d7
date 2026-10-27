"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { NAV_LINKS, NavItem } from "@/data/navigation";

interface NavigationContextType {
  navLinks: NavItem[];
  loading: boolean;
  refreshNavigation: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextType>({
  navLinks: NAV_LINKS,
  loading: false,
  refreshNavigation: async () => {},
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [navLinks, setNavLinks] = useState<NavItem[]>(NAV_LINKS);
  const [loading, setLoading] = useState(true);

  const fetchNavigation = useCallback(async () => {
    try {
      const [res, newsRes] = await Promise.all([
        fetch("/api/navigation", { cache: "no-store" }),
        fetch("/api/news", { cache: "no-store" }).catch(() => null),
      ]);

      let orderedProductsChildren: { label: string; href: string; description: string }[] = [];
      if (newsRes && newsRes.ok) {
        try {
          const newsJson = await newsRes.json();
          if (newsJson.success && Array.isArray(newsJson.data) && newsJson.data.length > 0) {
            orderedProductsChildren = newsJson.data.map((item: any) => {
              const slug = (item.slug || item.id || item._id || "").toLowerCase();
              const rawTitle = (item.title || "").trim();

              if (slug.includes("defence") || rawTitle.toLowerCase().includes("defence")) {
                return {
                  label: "Defence Solutions",
                  href: "/defence",
                  description: "Tactical armor, survivability equipment and kinetic technologies.",
                };
              }

              if (slug.includes("aerospace") || rawTitle.toLowerCase().includes("aerospace")) {
                return {
                  label: "Aerospace Systems",
                  href: "/aerospace",
                  description: "Autonomous aerial platforms, tactical UAVs & surveillance suites.",
                };
              }

              return {
                label: rawTitle.toUpperCase() === "PETRO" ? "PETRO" : (rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1)),
                href: item.href || `/news/${slug}`,
                description: item.excerpt || item.description || "Strategic intelligence briefings and tactical system specifications.",
              };
            });
          }
        } catch {
          // Ignore news parsing error
        }
      }

      if (res.ok) {
        const json = await res.json();
        const items = json.data || json;
        if (Array.isArray(items) && items.length > 0) {
          // Normalize and sort items
          const visibleItems = items
            .filter((item: any) => item.isVisible !== false && (item.label || "").trim().toLowerCase() !== "e-shop")
            .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
            .map((item: any): NavItem => {
              let children = Array.isArray(item.children)
                ? item.children.map((child: any) => ({
                    label: child.label || "",
                    href: child.href || "/",
                    description: child.description || "",
                  }))
                : undefined;

              if (item.label?.toLowerCase() === "products" && orderedProductsChildren.length > 0) {
                children = orderedProductsChildren;
              }

              return {
                label: item.label || "Link",
                href: item.href || "/",
                description: item.description || "",
                badge: item.badge || "",
                children,
              };
            });

          if (visibleItems.length > 0) {
            setNavLinks(visibleItems);
          }
        }
      }
    } catch (err) {
      console.warn("[NavigationContext] Failed to load dynamic navigation:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNavigation();

    // Re-fetch whenever the user returns to this tab from CMS
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchNavigation();
      }
    };

    window.addEventListener("focus", fetchNavigation);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Periodically poll so edits in CMS reflect immediately
    const pollInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchNavigation();
      }
    }, 4000);

    return () => {
      window.removeEventListener("focus", fetchNavigation);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(pollInterval);
    };
  }, [fetchNavigation]);

  return (
    <NavigationContext.Provider
      value={{
        navLinks,
        loading,
        refreshNavigation: fetchNavigation,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  return ctx;
}
