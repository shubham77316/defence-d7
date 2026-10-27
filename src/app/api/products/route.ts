import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND_API_URL = process.env.CMS_API_URL || "http://localhost:5000/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = `${BACKEND_API_URL}/products${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(targetUrl, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    }

    return NextResponse.json(
      { success: false, message: `Backend responded with ${res.status}`, data: [] },
      { status: res.status }
    );
  } catch (error: any) {
    console.error("Products Next.js API proxy error:", error.message);
    return NextResponse.json(
      { success: false, message: "Error fetching products from backend", data: [] },
      { status: 500 }
    );
  }
}
