import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { SignJWT } from "jose";

<<<<<<< HEAD
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

=======
>>>>>>> main
export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Only allow admin
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

<<<<<<< HEAD
    // Create JWT with jose
    // Both in route.ts and middleware.ts
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "supersecretkey"
    );
    const token = await new SignJWT({
      id: user._id.toString(),
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secret);
=======
    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
>>>>>>> main

    // Store token in cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
<<<<<<< HEAD
      maxAge: 60 * 60 * 24, // 1 day
=======
>>>>>>> main
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
