/** @format */

// app/admin/dashboard/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, LogOut, Home, Users, Settings, X } from "lucide-react";

export default function AdminDashboard() {
  const [open, setOpen] = useState(true); // Desktop sidebar open by default
  const [mobileOpen, setMobileOpen] = useState(false); // Separate state for mobile

  const sidebarLinks = [
    { name: "Dashboard", icon: <Home size={20} />, href: "#" },
    { name: "Users", icon: <Users size={20} />, href: "#" },
    { name: "Settings", icon: <Settings size={20} />, href: "#" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a192f] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-full bg-[#0f1c3f]/90 backdrop-blur-md shadow-lg z-50 transition-all duration-300
          ${
            mobileOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64 lg:translate-x-0"
          } 
          ${open ? "lg:w-64" : "lg:w-20"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2
            className={`text-xl font-bold tracking-wide ${
              !open && "hidden lg:block"
            }`}
          >
            Admin
          </h2>

          {/* Close button only on mobile */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Toggle button only on desktop */}
          <button
            className="hidden lg:block text-white"
            onClick={() => setOpen(!open)}
          >
            <Menu size={24} />
          </button>
        </div>

        <nav className="space-y-4 px-5 mt-6">
          {sidebarLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 rounded-lg p-3 text-gray-200 hover:bg-white/10 transition"
            >
              {link.icon}
              {open && <span>{link.name}</span>}
            </a>
          ))}
          <a
            href="/admin/login"
            className="flex items-center gap-3 rounded-lg p-3 text-red-400 hover:bg-red-500/20 transition"
          >
            <LogOut size={20} />
            {open && "Logout"}
          </a>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Top bar for mobile */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Dashboard Heading */}
        <motion.h1
          className="mb-8 text-2xl lg:text-3xl font-extrabold tracking-wide"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dashboard Overview
        </motion.h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
          ].map((card, index) => (
            <motion.div
              key={card.title}
              className={`rounded-md bg-gradient-to-r ${card.gradient} p-6 shadow-xl`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-lg font-medium">{card.title}</h2>
              <p className="mt-3 text-2xl lg:text-3xl font-extrabold">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
