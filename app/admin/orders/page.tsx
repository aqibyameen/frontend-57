/** @format */
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useAdmin } from "@/lib/AdminContext";

interface Order {
  _id: string;
  userOrderId: string;
  email: string;
  total: number;
  status: "pending" | "dispatch" | "delivered";
  paymentMethod: string;
  createdAt: string;
  form: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    size?: string;
    color?: string;
    image?: string;
  }[];
}

export default function AdminOrders() {
  const { orders, loadingOrders, refreshOrders } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshOrders();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loadingOrders)
    return (
      <div className="flex items-center justify-center h-40 text-blue-600">
        <Loader2 className="animate-spin mr-2" />
        Loading orders...
      </div>
    );

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
        Admin Orders
      </h1>

      {orders.length === 0 ? (
        <Card className="p-6 text-center shadow-md">No orders found.</Card>
      ) : (
        <div className="space-y-4 ">
          {/* Desktop Table */}
          <div className="hidden md:block rounded-md ">
            <Table className="w-full bg-white p-4 rounded-md shadow-md">
              <TableHeader className="bg-black">
                <TableRow>
                  <TableHead className="text-white">Order ID</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Contact</TableHead>
                  <TableHead className="text-white">Total (Rs)</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    className="cursor-pointer hover:bg-blue-50"
                  >
                    <TableCell onClick={() => setSelectedOrder(order)}>
                      {order.userOrderId}
                    </TableCell>
                    <TableCell>{order.form.email}</TableCell>
                    <TableCell>{order.form.phone}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value as Order["status"]
                          )
                        }
                        className="border border-blue-300 rounded p-1 text-sm bg-white focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="dispatch">Dispatch</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4  md:hidden">
            {orders.map((order) => (
              <Card
                key={order._id}
                className="p-4 shadow-sm border border-blue-200"
              >
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      onClick={() => setSelectedOrder(order)}
                      className="font-semibold text-blue-700"
                    >
                      {order.userOrderId}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      Rs {order.total}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.form.email}</p>
                  <p className="text-sm text-gray-600">{order.form.phone}</p>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value as Order["status"]
                      )
                    }
                    className="mt-2 w-full border border-blue-300 rounded p-1 text-sm bg-white focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="dispatch">Dispatch</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-lg sm:max-w-2xl ">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-blue-700">
                  Order #{selectedOrder.userOrderId}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Customer Info */}
                <div className="text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedOrder.form.name}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {selectedOrder.form.address}
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>{" "}
                    {selectedOrder.paymentMethod.toUpperCase()}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 border rounded-lg p-3"
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover border"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-blue-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size ?? "N/A"} | Color:{" "}
                          {item.color ?? "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="font-semibold text-blue-700">
                        Rs {item.discountPrice ?? item.price} x {item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right font-bold text-blue-800">
                  Total: Rs {selectedOrder.total}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
