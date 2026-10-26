import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_API_URL = process.env.CMS_API_URL || "http://localhost:5000/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const res = await fetch(`${BACKEND_API_URL}/news/${slug}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const item = data.data || data;
      if (item && item.title) {
        return NextResponse.json({
          success: true,
          data: {
            id: item.slug || item._id,
            slug: item.slug || item._id,
            title: item.title,
            category: (item.category || "DEFENCE").toUpperCase(),
            categoryBadge: (item.category || "DEFENCE").toUpperCase(),
            date: item.date || new Date(item.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase(),
            meta: `${item.date || "OCTOBER 2026"} • ${item.readTime || "3 MIN READ"}`,
            readTime: item.readTime || "3 MIN READ",
            description: item.excerpt || item.description || "",
            excerpt: item.excerpt || item.description || "",
            content: Array.isArray(item.content)
              ? item.content
              : typeof item.content === "string"
              ? [item.content]
              : item.excerpt
              ? [item.excerpt]
              : [],
            image: (item.image && typeof item.image === "string") ? item.image.trim() : "",
            tags: item.tags || [],
            author: item.author || "Sky Wardens Command",
            subcategories: item.subcategories || [],
          },
        });
      }
    }
  } catch (error) {
    console.error("[NEWS BY SLUG API ERROR]", error);
  }

  return NextResponse.json(
    { success: false, message: "Article not found" },
    { status: 404 }
  );
}
