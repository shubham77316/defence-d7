import { NextResponse } from "next/server";
import { BUSINESS_SECTORS } from "@/data/businesses";

export async function GET() {
  return NextResponse.json({
    success: true,
    total: BUSINESS_SECTORS.length,
    sectors: BUSINESS_SECTORS
  });
}
