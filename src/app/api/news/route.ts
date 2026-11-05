import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_API_URL = process.env.CMS_API_URL || "http://localhost:5000/api";

const FALLBACK_NEWS = [
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit",
    category: "Company News",
    meta: "2 min read",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.",
    image: "/images/aerospace-stealth-hangar.jpg",
    href: "/news/lorem-ipsum",
  },
  {
    id: "sed-do-eiusmod",
    title: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna",
    category: "Partner News",
    meta: "2 min read",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    image: "/images/tactical-defense-operator.jpg",
    href: "/news/sed-do-eiusmod",
  },
  {
    id: "quis-nostrud",
    title: "Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip",
    category: "Company News",
    meta: "3 min read",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit.",
    image: "/images/news-advanced-systems.jpg",
    href: "/news/quis-nostrud",
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
          category: (item.category ? (item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase()) : "Defence"),
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
