import { NextResponse } from "next/server";

export async function GET() {
  const healthData = {
    status: "healthy",
    brand: "Sky Wardens",
    version: "2.4.0-defence-prod",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 1240),
    services: {
      api: "operational",
      inquiryGateway: "operational",
      telemetryEngine: "operational",
      securityEncryption: "AES-256-GCM"
    },
    systemMetrics: {
      sectorsActive: 4,
      networkLatencyMs: 14,
      nodeEnv: process.env.NODE_ENV || "production"
    }
  };

  return NextResponse.json(healthData, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Sovereign-System": "SKYWARDENS-GRID"
    }
  });
}
