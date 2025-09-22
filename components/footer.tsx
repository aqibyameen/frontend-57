
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"


export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand Section */}

          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            
              <Image src="./logo.png" alt="logo" width={150} height={80} className="font-bold text-xl text-foreground" / >
            </div>
            <p className="text-muted-foreground text-sm text-pretty">
              Premium quality t-shirts with unique designs. Express your personality with our curated collections of
              anime, gaming, and streetwear tees.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>

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
