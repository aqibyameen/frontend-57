
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Order {
  id: string
  items: any[]
  subtotal: number
  shipping: number
  total: number
  status: string
  paymentMethod: string
  createdAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [userOrderId, setUserOrderId] = useState("")
  const [step, setStep] = useState<"email" | "order" | "orders">("email")
  const [error, setError] = useState("")

  // ✅ Initial load: check localStorage
  useEffect(() => {
    const userOrderId = localStorage.getItem("userOrderId")
    if (userOrderId) {
      
      fetchOrders( userOrderId)
    } else {
      setLoading(false)
    }
  }, [])

  // ✅ Check customer by email
  const checkCustomer = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/customers?email=${email}`)
      const data = await res.json()

      if (data.success && data.customer) {
        setStep("order")
      } else {
        setError("Customer not found")
      }
    } catch {
      setError("Failed to check customer")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Fetch orders
  const fetchOrders = async ( userOrderId: string) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/orders?userOrderId=${userOrderId}`)
      const data = await res.json()

      if (data.success) {
        setOrders(data.orders)
        localStorage.setItem("userOrderId", userOrderId)
        setStep("orders")
      } else {
        setError("Invalid Order ID or No orders found")
      }
    } catch {
      setError("Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !userOrderId) return
    fetchOrders( userOrderId)
  }

  // ✅ Loading state
  if (loading) {
    return <p className="text-center py-10">Loading...</p>
  }

  // ✅ Step 1: Enter Email
  if (step === "email") {
    return (
      <div className="max-w-md mx-auto py-10">
        <h2 className="text-xl font-bold mb-4">Enter Email</h2>
        <form onSubmit={checkCustomer} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Continue
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    )
  }

  // ✅ Step 2: Enter Order ID
  if (step === "order") {
    return (
      <div className="max-w-md mx-auto py-10">
        <h2 className="text-xl font-bold mb-4">Enter Order ID</h2>
        <form onSubmit={handleOrderSubmit} className="space-y-4">
          <input
            type="text"
            value={userOrderId}
            onChange={(e) => setUserOrderId(e.target.value)}
            placeholder="Enter your Order ID"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Fetch Orders
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    )
  }

  // ✅ Step 3: Orders found or not
  if (step === "orders" && orders.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">No orders found</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold">My Orders</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-xl shadow p-6 space-y-4 bg-white"
        >
          {/* Order header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">
                Order #{order.id.slice(0, 8)}
              </h2>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Payment:{" "}
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Credit/Debit"}
              </p>
            </div>
            <span className="px-3 py-1 text-sm rounded-lg bg-gray-200">
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image ?? "/placeholder.png"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.size} • {item.color}
                    </p>
                    <p className="text-sm">
                      Qty: {item.quantity} × PKR{" "}
                      {item.discountPrice ?? item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  PKR {(item.discountPrice ?? item.price) * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-1 text-right">
            <p className="text-sm text-gray-600">
              Subtotal: PKR {order.subtotal}
            </p>
            <p className="text-sm text-gray-600">
              Shipping: PKR {order.shipping}
            </p>
            <p className="text-lg font-bold">Total: PKR {order.total}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
