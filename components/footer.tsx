/** @format */

import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand Section */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Link
                href="/"
                className="flex items-center flex-shrink-0 w-1/3 md:w-[30%]" // 30% width
              >
                <Image
                  src="/logo.png"
                  alt="NextGenWear Logo"
                  width={400}
                  height={200}
                  className="w-full h-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              Premium quality t-shirts with unique designs. Express your
              personality with our curated collections.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/category/anime-t-shirts"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Anime T-Shirts
              </Link>
              <Link
                href="/category/gaming-tees"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Gaming Tees
              </Link>
              <Link
                href="/category/streetwear"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Streetwear
              </Link>
              <Link
                href="/category/oversized"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Oversized
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" />
                <span>nextgenwear@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4" />
                <span>+92 346 8345809</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t py-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-2">
          <span>© 2025 NextGenWear. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
