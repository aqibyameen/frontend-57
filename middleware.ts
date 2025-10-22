/** @format */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 🔹 Define public routes for Clerk
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/api/webhook(.*)"]);

// 🔹 Admin middleware (JWT verification)
async function adminMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload?.role !== "admin") {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
}

// 🔹 Combined middleware (Clerk + Admin)
export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // ✅ Handle admin routes
  if (path.startsWith("/admin/dashboard")) {
    return adminMiddleware(req);
  }

  // ✅ Clerk-protected routes (non-public)
  if (!isPublicRoute(req)) {
    await auth.protect(); // redirects to Clerk sign-in page automatically
  }

  return NextResponse.next();
});

// 🔹 Matcher config
export const config = {
  matcher: [
    // Protect admin & Clerk routes
    "/admin/dashboard/:path*",
     // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
