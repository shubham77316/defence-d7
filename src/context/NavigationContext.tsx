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
      const res = await fetch("/api/navigation", { cache: "no-store" });

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

              if (item.label?.trim().toLowerCase() === "products") {
                children = NAV_LINKS.find((link) => link.label === "Products")?.children;
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
