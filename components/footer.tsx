import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl text-foreground">TeeVibe</span>
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
                href="/size-guide"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Size Guide
              </Link>
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Returns & Exchanges
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
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
                href="/category/minimalist"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Minimalist
              </Link>
              <Link
                href="/category/oversized"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Oversized
              </Link>
              <Link
                href="/category/trending"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Trending
              </Link>
            </nav>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Connected</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-1 bg-background" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@teevibe.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 TeeVibe. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Secure payments powered by</span>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-background rounded text-xs font-medium">VISA</div>
              <div className="px-2 py-1 bg-background rounded text-xs font-medium">MC</div>
              <div className="px-2 py-1 bg-background rounded text-xs font-medium">AMEX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
