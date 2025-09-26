"use client"

import CheckoutForm from "@/components/CheckOutForm"
import { useCart } from "@/lib/cart-store"
import Image from "next/image"

export default function CheckoutPage() {
  const { state } = useCart()

  const subtotal = state.items.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0
  )

  const shippingCost = 250
  const grandTotal = subtotal + shippingCost

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* =================== Cart Summary =================== */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-xl font-semibold">Your Order</h2>

        <div className="space-y-4">
          {state.items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-center gap-4 border p-4 rounded-lg"
            >
              <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {item.size} • Color: {item.color}
                </p>
                <p className="text-sm">
                  Qty: {item.quantity} ×{" "}
                  PKR {(item.discountPrice ?? item.price).toLocaleString()}
                </p>
              </div>

              <div className="font-semibold">
                PKR{" "}
                {((item.discountPrice ?? item.price) * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t pt-4 space-y-2 text-right">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-lg font-medium">
              PKR {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-lg font-medium">PKR {shippingCost}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>PKR :{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* =================== Checkout Form =================== */}
      <div>
        <CheckoutForm />
      </div>
    </div>
  )
}
