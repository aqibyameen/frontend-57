// app/api/orders/route.ts
import { NextResponse } from "next/server"
import Order from "@/models/Order"   // your order schema
import { connectDB } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    await connectDB()
    const data = await req.json()

    const order = await Order.create(data)

    return NextResponse.json({ success: true, order })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const email = searchParams.get("email")
  const userOrderId = searchParams.get("userOrderId")

  if (!email || !userOrderId) {
    return NextResponse.json({ success: false, error: "Missing credentials" })
  }

  const orders = await Order.find({ id: userOrderId })
  if (!orders.length) {
    return NextResponse.json({ success: false, error: "No orders found" })
  }

  return NextResponse.json({ success: true, orders })
}
