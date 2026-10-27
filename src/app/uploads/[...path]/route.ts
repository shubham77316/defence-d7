import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await context.params;
    const filename = pathSegments.join("/");

    // 1. Check in public/uploads
    const localPublicPath = path.join(process.cwd(), "public/uploads", filename);
    // 2. Check in server/uploads
    const serverUploadsPath = path.join(process.cwd(), "server/uploads", filename);

    let filePathToServe = "";
    if (fs.existsSync(localPublicPath)) {
      filePathToServe = localPublicPath;
    } else if (fs.existsSync(serverUploadsPath)) {
      filePathToServe = serverUploadsPath;
    }

    if (filePathToServe) {
      const fileBuffer = fs.readFileSync(filePathToServe);
      const ext = path.extname(filePathToServe).toLowerCase().replace(".", "");

      const mimeMap: Record<string, string> = {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        jfif: "image/jpeg",
        pjpeg: "image/jpeg",
        pjp: "image/jpeg",
        webp: "image/webp",
        svg: "image/svg+xml",
        gif: "image/gif",
        bmp: "image/bmp",
        ico: "image/x-icon",
        pdf: "application/pdf",
      };

      const contentType = mimeMap[ext] || "application/octet-stream";

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // 3. Fallback: proxy from Express backend
    const backendRes = await fetch(`http://localhost:5000/uploads/${filename}`);
    if (backendRes.ok) {
      const arrayBuffer = await backendRes.arrayBuffer();
      const contentType =
        backendRes.headers.get("content-type") || "application/octet-stream";
      return new NextResponse(Buffer.from(arrayBuffer), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse("File not found", { status: 404 });
  } catch (error: any) {
    return new NextResponse("Error serving upload: " + error.message, { status: 500 });
  }
}
