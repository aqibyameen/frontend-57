/** @format */

// app/admin/dashboard/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import AddProductModal from "@/components/addProductModal";
import { useAdmin } from "@/lib/AdminContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {

  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout");
    router.push("/admin/login");
  };
    const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 60000 },
    { month: "Mar", revenue: 30000 },
    { month: "Apr", revenue: 80000 },
    { month: "May", revenue: 55000 },
  ];

  const productData = [
    { name: "Anime Tees", value: 400 },
    { name: "Gaming Tees", value: 300 },
    { name: "Streetwear", value: 300 },
    { name: "Customs", value: 200 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  const { orders, customers, products } = useAdmin();

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col p-4 sm:p-6 lg:p-8">
      <motion.h1
        className="mb-8 text-2xl lg:text-3xl font-extrabold tracking-wide flex justify-between items-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>Dashboard Overview</div>
      </motion.h1>
      <div className="flex items-center justify-between ">
        <button
          onClick={() => setModalOpen(true)}
          className="mb-6 rounded-md bg-indigo-600 px-4 py-2 w-40 text-white hover:bg-indigo-700 transition"
        >
          + Add Product
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center  gap-3  p-3 mb-6 rounded-md bg-amber-100 px-4 py-2 w-40 text-red-400 hover:bg-red-500/20 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          {
            title: "Users",
            value: customers?.length ?? "0",
            gradient: "from-indigo-500 via-purple-500 to-pink-500",
          },
          {
            title: "Orders",
            value: orders?.length ?? "0",
            gradient: "from-teal-400 via-cyan-500 to-blue-600",
            onClick: () => router.push("/admin/orders/"),
          },
          {
            title: "Revenue",
            value: `PKR ${
              orders?.reduce((sum, order) => sum + order.total, 0) || 0
            }`,
            gradient: "from-orange-400 via-red-500 to-pink-600",
          },
          {
            title: "Products",
            value: products?.length ?? "0",
            gradient: "from-green-400 via-emerald-500 to-teal-600",
          },
        ].map((card, index) => (
          <motion.div
            key={card.title}
            className={`rounded-lg bg-gradient-to-r ${card.gradient} p-6 shadow-xl cursor-pointer`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + index * 0.12 }}
            whileHover={{ scale: 1.03 }}
            onClick={card.onClick}
          >
            <h2 className="text-lg font-medium">{card.title}</h2>
            <p className="mt-3 text-2xl lg:text-3xl font-extrabold">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>
  <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-8">
        {/* Revenue Chart */}
        <div className="bg-[#112240] p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Monthly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Chart */}
        <div className="bg-[#112240] p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Product Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {productData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <AddProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <AddProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
