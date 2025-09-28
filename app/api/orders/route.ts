/** @format */

// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userOrderId = searchParams.get("userOrderId");

    if (!userOrderId) {
      return NextResponse.json(
        { error: "userOrderId required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({ userOrderId });
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newOrder = await Order.create(body);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "id and status required" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
