/** @format */

// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1e3a8a] lg:flex-row">
      {/* Left side illustration (hidden on small screens) */}
      <div className="hidden w-full items-center justify-center bg-[#112240] lg:flex lg:w-1/2">
        <motion.img
          src="/kakashi.png"
          alt="Admin Illustration"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xs md:max-w-md lg:max-w-lg drop-shadow-2xl"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
        <motion.div
          className="w-full max-w-sm sm:max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <motion.img
              src="/logo.png"
              alt="Logo"
              className="h-14 w-auto object-contain sm:h-20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <h1 className="mb-6 text-center text-xl font-bold text-gray-800 sm:text-2xl">
            Admin Login
          </h1>

          {error && (
            <motion.p
              className="mb-4 rounded-md bg-red-100 p-2 text-sm text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@site.com"
                className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <motion.button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 py-3 font-semibold text-white shadow-lg"
              whileTap={{ scale: 0.95 }}
              whileHover={{
                scale: 1.03,
                background:
                  "linear-gradient(to right, #4f46e5, #7c3aed, #2563eb)",
              }}
              transition={{ duration: 0.3 }}
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
