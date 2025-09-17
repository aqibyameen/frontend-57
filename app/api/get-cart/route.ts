import { NextResponse } from "next/server";
import { getCartData } from "../save-design/route";

export async function GET() {
  const cart = getCartData();
  if (!cart) return NextResponse.json({ error: "Cart is empty" }, { status: 404 });
  return NextResponse.json(cart);
}
