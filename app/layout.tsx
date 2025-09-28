/** @format */

// app/layout.tsx
import type { Metadata } from "next";
import { Work_Sans, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { CartProvider } from "@/lib/cart-store";
// @ts-ignore: allow global CSS side-effect import (Next.js global stylesheet)
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { AdminProvider } from "@/lib/AdminContext";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NXTGEN Wears Premium T-Shirt Store",
  icons:{
    icon:"./logo.png"
  },
  description:
    "Discover premium quality t-shirts from anime, gaming, and streetwear collections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${workSans.variable} ${openSans.variable}`}
      >
        <CartProvider>
          <Navigation />
          <Toaster position="top-right" richColors />
          <Suspense fallback={<p>Loading...</p>}>
            <AdminProvider>{children}</AdminProvider>
          </Suspense>
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
