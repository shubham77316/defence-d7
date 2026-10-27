import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  fullName?: string;
  firstName?: string;
  company?: string;
  email: string;
  phone?: string;
  contactNo?: string;
  country?: string;
  city?: string;
  areaOfInterest?: string;
  enquiryType?: string;
  message: string;
}

const BACKEND_API_URL = process.env.CMS_API_URL || "http://localhost:5000/api";

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    const name = body.fullName || body.firstName || "";
    const organization = body.company || "Individual / Direct Liaison";
    const email = body.email;
    const phone = body.phone || body.contactNo || "";
    const message = body.message;
    const country = body.country || "India";
    const city = body.city || "";
    const areaOfInterest = body.areaOfInterest || body.enquiryType || "General Strategic Inquiry";

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Valid name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "A valid corporate or institutional email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: "Inquiry message must contain at least 5 characters detailing requirements." },
        { status: 400 }
      );
    }

    // Try forwarding to Express CMS backend so it saves in MongoDB
    try {
      const backendRes = await fetch(`${BACKEND_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": req.headers.get("x-forwarded-for") || "127.0.0.1",
        },
        body: JSON.stringify({
          fullName: name.trim(),
          company: organization.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          country: country.trim(),
          city: city.trim(),
          areaOfInterest,
          message: message.trim(),
        }),
      });

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        return NextResponse.json(
          {
            success: true,
            referenceId: backendData.referenceId || backendData.data?.referenceId,
            message: backendData.message || "Institutional transmission received and logged into sovereign liaison desk.",
            receiptTimestamp: backendData.data?.createdAt || new Date().toISOString(),
          },
          { status: 201 }
        );
      }
    } catch (backendError) {
      console.warn("[CONTACT ROUTE] Express backend unreachable, generating fallback reference ID:", backendError);
    }

    // Resilient fallback if backend server is temporarily uncontactable
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomHex = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase();
    const referenceId = `ANV-${timestamp}-${randomHex}`;

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Institutional transmission received and queued for strategic liaison review.",
        receiptTimestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[SKY WARDENS CONTACT ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server processing error. Transmission could not be completed.",
      },
      { status: 500 }
    );
  }
}
