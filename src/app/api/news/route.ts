import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_API_URL = process.env.CMS_API_URL || "http://localhost:5000/api";

const FALLBACK_NEWS = [
  {
    id: "aerospace-highlights",
    title: "Aerospace highlights and autonomous program positioning",
    category: "AEROSPACE",
    date: "MARCH 2026",
    description:
      "Precision-engineered sovereign airframes, autonomous flight trials, and tactical unmanned aerial surveillance milestones.",
    image: "/images/stealth-fighter-hangar.jpg",
    href: "/news/aerospace-highlights",
  },
  {
    id: "defence-systems",
    title: "Defence systems, protective platforms, and readiness updates",
    category: "DEFENCE",
    date: "FEBRUARY 2026",
    description:
      "Multi-layered tactical air defence architectures, kinetic perimeter shields, and next-generation sovereign interception platforms.",
    image: "/images/defence-systems-radar.jpg",
    href: "/news/defence-systems",
  },
];

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/news?status=published`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const list = data.data || data;
      if (Array.isArray(list) && list.length > 0) {
        const formatted = list.map((item: any) => ({
          id: item.slug || item._id,
          slug: item.slug || item._id,
          title: item.title,
          category: item.category?.toUpperCase() || "DEFENCE",
          date: item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase() : "RECENT",
          description: item.excerpt || item.description || (item.content ? item.content[0] : ""),
          excerpt: item.excerpt || item.description || "",
          content: Array.isArray(item.content) ? item.content : typeof item.content === "string" ? [item.content] : [],
          image: (item.image && typeof item.image === "string") ? item.image.trim() : "",
          href: `/news/${item.slug || item._id}`,
          subcategories: item.subcategories || [],
        }));
        return NextResponse.json({ success: true, data: formatted });
      }
    }
  } catch (error) {
    console.warn("[NEWS PROXY] Express backend offline, serving fallback:", error);
  }

  return NextResponse.json({ success: true, data: FALLBACK_NEWS });
}
