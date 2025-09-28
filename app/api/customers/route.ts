/** @format */

import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userOrderId = searchParams.get("userOrderId");

    if (userOrderId) {
      const customer = await Customer.findOne({ userOrderId });

      return NextResponse.json({
        success: true,
        customer: customer ?? null,
      });
    } else {
      const customers = await Customer.find().sort({ createdAt: -1 });

      return NextResponse.json({
        success: true,
        customers,
      });
    }
  } catch (err) {
    console.error("GET /customers error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch customer(s)" },
      { status: 500 }
    );
  }
}
