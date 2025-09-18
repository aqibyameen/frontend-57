/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // 🔹 Allow login page without token
  if (pathname === "/admin/login") {
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret);
        if (payload.role === "admin") {
          // Already logged in → redirect to dashboard
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
      } catch {
        // Invalid token → let them stay on login
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 🔹 All other /admin routes require token
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
