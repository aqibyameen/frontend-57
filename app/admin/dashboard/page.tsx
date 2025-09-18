/** @format */

// app/admin/dashboard/page.tsx
"use client";

import { useState } from "react";
import { Menu, LogOut, Home, Users, Settings } from "lucide-react";

export default function AdminDashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } bg-white p-4 shadow-md transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-xl font-bold text-gray-800 ${!open && "hidden"}`}
          >
            Admin
          </h2>
          <button onClick={() => setOpen(!open)}>
            <Menu size={24} />
          </button>
        </div>

        <nav className="mt-6 space-y-3">
          <a
            href="#"
            className="flex items-center gap-3 rounded-md p-2 text-gray-700 hover:bg-gray-100"
          >
            <Home size={20} /> {open && "Dashboard"}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md p-2 text-gray-700 hover:bg-gray-100"
          >
            <Users size={20} /> {open && "Users"}
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md p-2 text-gray-700 hover:bg-gray-100"
          >
            <Settings size={20} /> {open && "Settings"}
          </a>
          <a
            href="/admin/login"
            className="flex items-center gap-3 rounded-md p-2 text-red-600 hover:bg-red-100"
          >
            <LogOut size={20} /> {open && "Logout"}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <p className="mt-2 text-2xl font-bold text-black">1,245</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <p className="mt-2 text-2xl font-bold text-black">530</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="mt-2 text-2xl font-bold text-black">$12,340</p>
          </div>
        </div>
      </main>
    </div>
  );
}
