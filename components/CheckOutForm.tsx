"use client"

import { useEffect, useState } from "react"
import { useCart, useCartActions } from "@/lib/cart-store"
import { v4 as uuid } from "uuid"
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function CheckoutForm() {
  const { state } = useCart()
  const { updateCheckoutForm, placeOrder } = useCartActions()
  const router = useRouter()

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod")
  const [showModal, setShowModal] = useState(false)
  const [orderId, setOrderId] = useState<string>("")
  const [userOrderId, setUserOrderId] = useState<string>("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    updateCheckoutForm({ [name]: value })

    
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (state.items.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const subtotal = state.items.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0
  );
  const shipping = 250;
  const total = subtotal + shipping;

  // STEP 1: Check localStorage
  let finalUserOrderId  = localStorage.getItem("userOrderId");

  // STEP 2: If not in localStorage, verify from DB using email
  if (!finalUserOrderId && state.checkoutForm.email) {
    try {
      const res = await fetch(`/api/customers?email=${state.checkoutForm.email}`);
      const data = await res.json();

      if (data.success && data.userOrderId) {
        finalUserOrderId = data.userOrderId;
        localStorage.setItem("userOrderId", finalUserOrderId ?? "");
        
      } else {
        // STEP 3: No record in DB → generate new permanent userOrderId
        finalUserOrderId = uuid();
        localStorage.setItem("userOrderId", finalUserOrderId);

        // Save customer record in DB
        await fetch("/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: state.checkoutForm.email,
            userOrderId: finalUserOrderId,
          }),
        });
      }
    } catch (err) {
      console.error("Failed to check/create userOrderId:", err);
      alert("Something went wrong while verifying your customer ID.");
      return;
    }
  }

  // ✅ Now finalUserOrderId is guaranteed
  const newOrder = {
    id: uuid(), // unique per-order id
    userOrderId: finalUserOrderId,
    email: state.checkoutForm.email,
    items: state.items,
    subtotal,
    shipping,
    total,
    status: "pending",
    form: state.checkoutForm,
    createdAt: new Date().toISOString(),
    paymentMethod,
  };

  placeOrder(newOrder);

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    if(data.success){
    toast.success("Order placed successfully! please check order page");
    }
  } catch (err) {
    console.error("Failed to save order in DB:", err);
  }

  setOrderId(newOrder.id);
  setShowModal(true);
  router.push("/orders")

};

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 space-y-4 border rounded-xl shadow"
      >
        <h2 className="text-xl font-bold">Checkout</h2>

        <input
          type="text"
          name="name"
          value={state.checkoutForm.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={state.checkoutForm.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="address"
          value={state.checkoutForm.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="tel"
          name="phone"
          value={state.checkoutForm.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-2 border rounded"
        />

        <div className="space-y-2">
          <label className="font-semibold">Payment Method</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                disabled
                onChange={() => setPaymentMethod("card")}
              />
              Credit/Debit Card (Coming Soon)
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4 space-y-1 text-right">
          <p className="text-sm text-gray-600">
            Subtotal: PKR {state.items.reduce(
              (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
              0
            )}
          </p>
          <p className="text-sm text-gray-600">Shipping: PKR 250</p>
          <p className="text-lg font-bold">
            Total: PKR{" "}
            {state.items.reduce(
              (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
              0
            ) + 250}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Place Order
        </button>
      </form>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-lg text-center space-y-4">
            <h3 className="text-lg font-bold">Order Placed Successfully 🎉</h3>
            <p className="text-sm text-gray-600">
              Your <b>unique user ID</b> (track all your orders):
            </p>
            <div className="p-2 bg-gray-100 rounded font-mono text-sm">
              {userOrderId}
            </div>
            <p className="text-sm text-gray-600">
              Your <b>current order ID</b> (for this order only):
            </p>
            <div className="p-2 bg-gray-100 rounded font-mono text-sm">
              {orderId}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`User ID: ${userOrderId}, Order ID: ${orderId}`)
                alert("Copied to clipboard ✅")
              }}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Copy IDs
            </button>

            <p className="text-xs text-red-500 font-semibold">
              ⚠️ Do not share your IDs with anyone. Save them safely.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-200 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
