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
    <div className="flex min-h-screen bg-[#0a192f]">
      {/* Left side - Image / Illustration */}
      <div className="hidden w-1/2 items-center justify-center bg-[#112240] lg:flex">
        <motion.img
          src="/admin-illustration.svg"
          alt="Admin Illustration"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <motion.div
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          </div>

          <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@site.com"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-[#0a192f] focus:ring-2 focus:ring-[#0a192f]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-[#0a192f] focus:ring-2 focus:ring-[#0a192f]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full rounded-lg bg-[#0a192f] py-3 font-semibold text-white transition hover:bg-[#112240]"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
