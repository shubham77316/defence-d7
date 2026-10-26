import { NextResponse } from "next/server";
import { NAV_LINKS } from "@/data/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_API_URL = process.env.CMS_API_URL || "http://localhost:5000/api";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/navigation`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const json = await res.json();
      const rawItems = json.data || json;
      const items = Array.isArray(rawItems)
        ? rawItems.filter((i: any) => (i.label || "").trim().toLowerCase() !== "e-shop")
        : rawItems;
      return NextResponse.json(
        {
          success: true,
          data: items,
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
    console.warn("[NAVIGATION PROXY] Backend unreachable, falling back to static links:", error);
  }

  return NextResponse.json(
    {
      success: true,
      data: NAV_LINKS,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
