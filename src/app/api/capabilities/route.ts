import { NextResponse } from "next/server";
import { CAPABILITIES_DATA } from "@/data/capabilities";

export async function GET() {
  return NextResponse.json({
    success: true,
    total: CAPABILITIES_DATA.length,
    capabilities: CAPABILITIES_DATA
  });
}
