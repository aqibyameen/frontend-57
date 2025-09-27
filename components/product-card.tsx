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
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface Product {
  _id: string;
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
  const router= useRouter()

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

  const handleAddToCart = (e: React.MouseEvent,bool?:boolean) => {
    e.stopPropagation();
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images[0] || "/placeholder.svg",
      size: product.sizes[0] || "M",
      color: "Black",
      quantity: 1,
    });
    toast.success("Product added to cart!");
    if(bool) router.push("/checkout") ;
  };

   return (
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -6,
    boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
  }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  className="w-full aspect-[1/2] max-h-[450px]"
>
  <Card className="group cursor-pointer flex flex-col h-full shadow-md transition-all duration-300">
    {/* Image Section */}
    <div
      className="relative h-[70%] w-full overflow-hidden rounded-t-md"
      onMouseEnter={product.images.length > 1 ? handleImageHover : undefined}
      onMouseLeave={product.images.length > 1 ? resetImageIndex : undefined}
      onClick={handleCardClick}
    >
      <Image
        src={product.images[currentImageIndex] || "/placeholder.svg"}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        
      />
    </div>

    {/* Content Section */}
    <div className="flex-[1] flex flex-col justify-between w-full h-[34%] mb-2   sm:mb-5   ">
    <CardContent
  className="p-2 sm:p-3" // smaller padding on xs
  onClick={handleCardClick}
>
  <div className="flex items-start justify-between">
    <h3 className="font-semibold text-xs sm:text-sm line-clamp-1">
      {product.name}
    </h3>
    <Badge variant="secondary" className="text-[10px] sm:text-xs">
      {product.category}
    </Badge>
  </div>

  <div className="flex items-center justify-between mt-1 sm:mt-2">
    <span className="font-bold text-sm sm:text-base">
      ${displayPrice?.toLocaleString()}
    </span>
    {hasDiscount && (
      <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
        ${product.price.toLocaleString()}
      </span>
    )}
  </div>
</CardContent>


    <CardFooter className="p-2 mb-2 sm:p-3 pt-0 ">
  <div className="flex gap-1.5 sm:gap-2 w-full">
    <Button
      className="flex-1 py-2 xs:py-1 sm:py-1 text-xs sm:text-sm"
      size="sm"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
      Add
    </Button>
    <Button
      className="flex-1 py-1.5 sm:py-1 text-xs sm:text-sm bg-transparent"
      variant="outline"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart(e,true);
      }}
    >
      Buy
    </Button>
  </div>
</CardFooter>

    </div>
  </Card>
</motion.div>




  )
}

