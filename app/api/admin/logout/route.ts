/** @format */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = NextResponse.redirect(new URL("/admin/login", req.url));

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
      sameSite: "strict", // include if used during login
    });

    console.log("Token cookie cleared, redirecting to login");

    return response;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
