/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Home,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useCart, useCartActions } from "@/lib/cart-store";
import { CartDrawer } from "./cart-drawer";
import Image from "next/image";

const categories = [
  "Anime T-Shirts",
  "Gaming Tees",
  "Streetwear",
  "Minimalist",
  "Oversized",
  "Custom T-Shirts",
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const { toggleCart } = useCartActions();

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-4 lg:gap-8">
            <Link
              href="/"
              className="flex items-center p-5 space-x-2 flex-shrink-0"
            >
              <Image
                src="/logo.png"
                alt="nextgenwear"
                width={140}
                height={70}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center flex-1 justify-center">
              <nav className="flex items-center space-x-6 xl:space-x-8">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base"
                >
                  Home
                </Link>
                <Link
                  href="/orders"
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  Orders
                </Link>
                <Link
                  href="/reviews"
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base"
                >
                  Reviews
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-foreground hover:text-primary font-medium text-sm xl:text-base h-auto p-2"
                    >
                      Categories
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category} asChild>
                        <Link
                          href={
                            category === "Custom T-Shirts"
                              ? "/custom-tshirt"
                              : `/category/${category
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`
                          }
                        >
                          {category}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm xl:text-base"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Desktop Right Side Actions */}
            <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10"
                onClick={toggleCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Button>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signin">Sign In</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Right Side - Only Hamburger */}
            <div className="flex sm:hidden items-center flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Tablet Right Side - All Icons + Hamburger */}
            <div className="hidden sm:flex md:hidden items-center space-x-2 flex-shrink-0">
              {/* Wishlist */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9"
                >
                  <Heart className="h-4 w-4" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={toggleCart}
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                    {cartCount > 9 ? "9+" : cartCount}
                  </Badge>
                )}
              </Button>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signin">Sign In</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Hamburger Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="border-t bg-background/95 backdrop-blur animate-in slide-in-from-top-2 duration-200">
              <div className="px-3 sm:px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    className="text-foreground hover:text-primary hover:bg-muted/50 transition-all font-medium py-3 px-2 rounded-md -mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/orders"
                    className="text-foreground hover:text-primary hover:bg-muted/50 transition-all font-medium py-3 px-2 rounded-md -mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Order
                  </Link>
                  <Link
                    href="/reviews/"
                    className="text-foreground hover:text-primary hover:bg-muted/50 transition-all font-medium py-3 px-2 rounded-md -mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reviews
                  </Link>

                  {/* Mobile Categories */}
                  <div className="py-2">
                    <span className="text-muted-foreground font-medium text-sm px-2">
                      Categories
                    </span>
                    <div className="mt-2 space-y-1">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={
                            category === "Custom T-Shirts"
                              ? "/custom-tshirt"
                              : `/category/${category
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`
                          }
                          className="block text-foreground hover:text-primary hover:bg-muted/50 transition-all py-2 px-4 rounded-md text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/reviews"
                    className="text-foreground hover:text-primary hover:bg-muted/50 transition-all font-medium py-3 px-2 rounded-md -mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reviews
                  </Link>

                  <Link
                    href="/contact"
                    className="text-foreground hover:text-primary hover:bg-muted/50 transition-all font-medium py-3 px-2 rounded-md -mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border/50 supports-[backdrop-filter]:bg-background/60 sm:hidden">
        <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center p-2 min-w-0"
          >
            <Home className="h-6 w-6 text-muted-foreground" />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="flex flex-col items-center justify-center p-2 min-w-0 relative"
          >
            <Heart className="h-6 w-6 text-muted-foreground" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </Badge>
            )}
          </Link>

          {/* Cart */}
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center justify-center p-2 h-auto min-w-0 relative"
            onClick={toggleCart}
          >
            <ShoppingBag
              className="h-8 w-8 text-muted-foreground"
              strokeWidth={2}
            />
            {cartCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                {cartCount > 9 ? "9+" : cartCount}
              </Badge>
            )}
          </Button>

          {/* Profile */}
          <Link
            href="/profile"
            className="flex flex-col items-center justify-center p-2 min-w-0"
          >
            <User className="h-6 w-6 text-muted-foreground" />
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Spacer */}
      {/* <div className="h-16 sm:hidden" /> */}

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
