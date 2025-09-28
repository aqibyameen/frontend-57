/** @format */

import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

interface Customer {
  id: string;
  email: string;
  userOrderId: string;
  createdAt: string;
}

// Temporary in-memory storage (⚡ replace with DB later)
let customers: Customer[] = [];

/**
 * POST /api/customers
 * Body: { email: string, userOrderId: string }
 */
export async function POST(req: Request) {
  try {
    const { email, userOrderId } = await req.json();
     await connectDB();
    if (!email || !userOrderId) {
      return NextResponse.json(
        { success: false, error: "Email and userOrderId are required" },
        { status: 400 }
      );
    }

    // check if customer already exists
    let existing = customers.find((c) => c.email === email);
    if (existing) {
      return NextResponse.json(
        { success: true, customer: existing },
        { status: 200 }
      );
    }

    // create new customer
    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      email,
      userOrderId,
      createdAt: new Date().toISOString(),
    };

    customers.push(newCustomer);
    const customer=await Customer.create({email,userOrderId});


    return NextResponse.json(
      { success: true, customer: customer },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/customers error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/customers?email=
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ success: true, customers }, { status: 200 });
  }

  const customer = customers.find((c) => c.email === email);
  if (customer) {
    return NextResponse.json(
      { success: true, userOrderId: customer.userOrderId },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, error: "Customer not found" },
    { status: 404 }
  );
}
