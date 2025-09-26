import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Customer from "@/models/Customer"

// 🔹 GET /api/customers?email=...
export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const userOrderId = searchParams.get("userOrderId")

    if (!userOrderId) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      )
    }

    const customer = await Customer.findOne({id: userOrderId })

    return NextResponse.json({
      success: true,
      userOrderId: customer ? customer.userOrderId : null,
    })
  } catch (err) {
    console.error("GET /customers error:", err)
    return NextResponse.json(
      { success: false, error: "Failed to fetch customer" },
      { status: 500 }
    )
  }
}

// 🔹 POST /api/customers
export async function POST(req: Request) {
  try {
    await connectDB()
    const { email, userOrderId } = await req.json()

    if (!email || !userOrderId) {
      return NextResponse.json(
        { success: false, error: "Email and userOrderId are required" },
        { status: 400 }
      )
    }

    // check existing
    const existing = await Customer.findOne({ email })
    if (existing) {
      return NextResponse.json({
        success: true,
        userOrderId: existing.userOrderId,
      })
    }

    // create new
    const customer = await Customer.create({
      email,
      userOrderId,
    })

    return NextResponse.json({
      success: true,
      userOrderId: customer.userOrderId,
    })
  } catch (err) {
    console.error("POST /customers error:", err)
    return NextResponse.json(
      { success: false, error: "Failed to create customer" },
      { status: 500 }
    )
  }
}
