import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    // ✅ Role-based check
    if (payload?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
