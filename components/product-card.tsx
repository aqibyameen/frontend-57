"use client";

import type React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart, useCartActions } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  sizes: string[];
  gender: string[];
  price: number;
  discountPrice?: number;
  fabric: string;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { state } = useCart();
  const { addToCart, addToWishlist, removeFromWishlist } = useCartActions();

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice : product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice!) / product.price) * 100
      )
    : 0;

  const isInWishlist = state.wishlist.some((item) => item.id === product.id);

  const handleImageHover = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const resetImageIndex = () => {
    setCurrentImageIndex(0);
  };

  const handleCardClick = () => {
    onProductClick?.(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.images[0] || "/placeholder.svg",
        category: product.category,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add with default size and color - in real app, this would open size/color selector
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images[0] || "/placeholder.svg",
      size: product.sizes[0] || "M",
      color: "Black", // Default color
      quantity: 1,
    });
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div
        className="relative aspect-[4/3] overflow-hidden"
        onMouseEnter={handleImageHover}
        onMouseLeave={resetImageIndex}
        onClick={handleCardClick}
      >
        <Image
          src={
            product.images[currentImageIndex] ||
            "/placeholder.svg?height=240&width=320&query=product"
          }
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            -{discountPercentage}%
          </Badge>
        )}
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background",
            isInWishlist && "text-red-500 hover:text-red-600"
          )}
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("h-4 w-4", isInWishlist && "fill-current")} />
        </Button>
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-3" onClick={handleCardClick}>
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">
              {product.name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {product.gender.map((g) => (
              <Badge key={g} variant="outline" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                ${displayPrice?.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {product.fabric}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-muted-foreground">Sizes:</span>
            {product.sizes.slice(0, 3).map((size) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
            {product.sizes.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.sizes.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <div className="flex gap-2 w-full">
          <Button className="flex-1 py-3" size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            className="flex-1 py-3 bg-transparent"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Handle buy now - would typically add to cart and redirect to checkout
              handleAddToCart(e);
            }}
          >
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
