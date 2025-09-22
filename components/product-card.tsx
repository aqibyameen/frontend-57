/** @format */

"use client";

import type React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart, useCartActions } from "@/lib/cart-store";
import { motion } from "framer-motion";

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
  const { addToCart } = useCartActions();

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice : product.price;

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images[0] || "/placeholder.svg",
      size: product.sizes[0] || "M",
      color: "Black",
      quantity: 1,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-[400px]"
    >
      <Card className="group transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col h-full">
        {/* Image Section */}
        <div
          className="relative flex-[3] w-full overflow-hidden rounded-t-md"
          onMouseEnter={
            product.images.length > 1 ? handleImageHover : undefined
          }
          onMouseLeave={product.images.length > 1 ? resetImageIndex : undefined}
          onClick={handleCardClick}
        >
          <Image
            src={product.images[currentImageIndex] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />

          {/* Dot indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full transition ${
                    currentImageIndex === index ? "bg-white" : "bg-gray-400/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-[1] flex flex-col justify-between w-full">
          <CardContent className="p-3" onClick={handleCardClick}>
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-sm line-clamp-1">
                {product.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-base">
                ${displayPrice?.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-3 pt-0">
            <div className="flex gap-2 w-full">
              <Button
                className="flex-1 py-2"
                size="sm"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </Button>
              <Button
                className="flex-1 py-2 bg-transparent"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(e);
                }}
              >
                Buy
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
