import { NextRequest, NextResponse } from "next/server";
import { POST as handleContactPost } from "../contact/route";

export async function POST(req: NextRequest) {
  return handleContactPost(req);
}
