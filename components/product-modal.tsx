/** @format */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Minus, Plus, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart, useCartActions } from "@/lib/cart-store";

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

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const colors = ["Black", "White", "Navy", "Gray", "Red"];
const stockStatus = "In Stock";

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const { state } = useCart();
  const { addToCart, addToWishlist, removeFromWishlist } = useCartActions();

  if (!product) return null;

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice : product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice!) / product.price) * 100
      )
    : 0;

  const isInWishlist = state.wishlist.some((item) => item.id === product.id);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images[0] || "/placeholder.svg",
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
  };

  const handleWishlistToggle = () => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* allow full width dialog content; inner container will control responsive width */}
      <DialogContent className="max-w-none w-full p-0">
        {/* Centered inner container:
            - Mobile: nearly full width with horizontal padding (w-full, px)
            - Desktop (lg): fixed to 80vw width (lg:w-[80vw]) and centered via mx-auto
        */}
        <div className="mx-auto w-full sm:w-[95%] lg:w-[80vw] max-h-[90vh] overflow-y-auto rounded-xl bg-background shadow-xl">
          <DialogHeader className="relative p-4 border-b">
            <DialogTitle className="sr-only">{product.name}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>

          {/* content padding is responsive */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                  <img
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-300 cursor-zoom-in",
                      isZoomed && "scale-150"
                    )}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                  {hasDiscount && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      -{discountPercentage}%
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                    <ZoomIn className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "aspect-square rounded-md overflow-hidden border-2 transition-colors",
                          selectedImage === index
                            ? "border-primary"
                            : "border-transparent hover:border-muted-foreground"
                        )}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleWishlistToggle}
                      className={cn(isInWishlist && "text-red-500")}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5",
                          isInWishlist && "fill-current"
                        )}
                      />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      {stockStatus}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">
                      ${displayPrice?.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Fabric:</span>
                      <span className="ml-2 text-muted-foreground">
                        {product.fabric}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Gender:</span>
                      <span className="ml-2 text-muted-foreground">
                        {product.gender.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Size *</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <Button
                          key={size}
                          variant={
                            selectedSize === size ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <Button
                          key={color}
                          variant={
                            selectedColor === color ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Quantity</h3>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-medium">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - kept visible and comfortable on mobile */}
                <div className="mt-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!selectedSize}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      size="lg"
                      onClick={() => {
                        handleAddToCart();
                        // redirect to checkout in real app
                      }}
                      disabled={!selectedSize}
                    >
                      Buy Now
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full mt-3"
                    size="lg"
                    onClick={handleWishlistToggle}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 mr-2",
                        isInWishlist && "fill-current"
                      )}
                    />
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
