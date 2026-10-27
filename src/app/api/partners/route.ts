import { NextResponse } from "next/server";
import { STRATEGIC_ECOSYSTEM, ECOSYSTEM_DISCLAIMER } from "@/data/partners";

export async function GET() {
  return NextResponse.json({
    success: true,
    disclaimer: ECOSYSTEM_DISCLAIMER,
    total: STRATEGIC_ECOSYSTEM.length,
    entities: STRATEGIC_ECOSYSTEM
  });
}
