/** @format */

"use client";
import { useAdmin } from "@/lib/AdminContext";

export default function OrdersPage() {
  const { orders, loadingOrders, refreshOrders } = useAdmin(); // ✅ get loadingOrders from context

  if (loadingOrders) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">
                Order ID: {order.userOrderId}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    order.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  } font-medium`}
                >
                  {order.status}
                </span>
              </p>
              <p>
                <span className="font-semibold">Total:</span> Rs {order.total}
              </p>

              {/* Items Section */}
              <div className="mt-4">
                <h2 className="font-semibold mb-2">Items:</h2>
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border p-2 rounded-lg bg-gray-50"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                          No Img
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × Rs {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
