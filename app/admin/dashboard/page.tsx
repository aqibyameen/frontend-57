/** @format */

// app/admin/dashboard/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, LogOut, Home, Users, Settings, X } from "lucide-react";
import { useRouter } from "next/navigation";
import AddProductModal from "@/components/addProductModal";

export default function AdminDashboard() {
  const router = useRouter();
  const [open, setOpen] = useState(true); // controls desktop collapsed / expanded
  const [mobileOpen, setMobileOpen] = useState(false); // controls mobile drawer
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout");
    router.push("/admin/login");
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: <Home size={18} />, href: "#" },
    { name: "Users", icon: <Users size={18} />, href: "#" },
    { name: "Settings", icon: <Settings size={18} />, href: "#" },
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          w-64 bg-[#0f1c3f]/90 backdrop-blur-md shadow-lg
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${open ? "lg:w-64" : "lg:w-20"}`}
        aria-hidden={!mobileOpen && !open}
      >
        <div
          className={`flex items-center px-4 py-3 border-b border-white/10
            ${!open ? "lg:justify-center" : "justify-between"}`}
        >
          {open ? (
            <h2 className="text-xl font-bold tracking-wide">Admin</h2>
          ) : (
            /* keep space for icon alignment when collapsed */
            <div className="w-6" />
          )}

          <div className="flex items-center gap-2">
            {/* Close button on mobile */}
            <button
              className="lg:hidden p-1"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            {/* Toggle collapse on desktop */}
            <button
              className="hidden lg:inline-flex p-1"
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <nav className="p-3 space-y-2">
          {sidebarLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg p-3 text-gray-200 hover:bg-white/10 transition
                ${!open ? "justify-center" : ""}`}
            >
              {link.icon}
              {open && <span className="truncate">{link.name}</span>}
            </a>
          ))}

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 rounded-lg w-full p-3 text-red-400 hover:bg-red-500/20 transition
              ${!open ? "justify-center" : ""}`}
          >
            <LogOut size={18} />
            {open && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Mobile overlay (only when drawer open) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content: gets left margin on lg depending on sidebar width */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300
          p-4 sm:p-6 lg:p-8
          ${open ? "lg:ml-64" : "lg:ml-20"}`}
      >
        {/* Mobile top bar (shows menu button) */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-1"
          >
            <Menu size={28} />
          </button>
        </div>

        <motion.h1
          className="mb-8 text-2xl lg:text-3xl font-extrabold tracking-wide"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dashboard Overview
        </motion.h1>

        <button
          onClick={() => setModalOpen(true)}
          className="mb-6 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          + Add Product
        </button>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            {
              title: "Users",
              value: "1,245",
              gradient: "from-indigo-500 via-purple-500 to-pink-500",
            },
            {
              title: "Orders",
              value: "530",
              gradient: "from-teal-400 via-cyan-500 to-blue-600",
            },
            {
              title: "Revenue",
              value: "$12,340",
              gradient: "from-orange-400 via-red-500 to-pink-600",
            },
            {
              title: "Products",
              value: "320",
              gradient: "from-green-400 via-emerald-500 to-teal-600",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              className={`rounded-lg bg-gradient-to-r ${card.gradient} p-6 shadow-xl`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.12 }}
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-lg font-medium">{card.title}</h2>
              <p className="mt-3 text-2xl lg:text-3xl font-extrabold">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      <AddProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
