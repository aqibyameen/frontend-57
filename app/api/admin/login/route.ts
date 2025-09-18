import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

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

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Store token in cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
