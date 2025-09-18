/** @format */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.redirect("/admin/login");

    // Clear token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // expire immediately
    });

    return response;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
