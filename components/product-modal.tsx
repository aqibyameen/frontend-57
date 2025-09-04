"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Minus, Plus, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart, useCartActions } from "@/lib/cart-store"

interface Product {
  id: string
  name: string
  description: string
  sizes: string[]
  gender: string[]
  price: number
  discountPrice?: number
  fabric: string
  category: string
  images: string[]
  createdAt: string
  updatedAt: string
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const colors = ["Black", "White", "Navy", "Gray", "Red"] // Mock colors
const stockStatus = "In Stock" // Mock stock status

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("Black")
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)

  const { state } = useCart()
  const { addToCart, addToWishlist, removeFromWishlist } = useCartActions()

  if (!product) return null

  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const displayPrice = hasDiscount ? product.discountPrice : product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0

  const isInWishlist = state.wishlist.some((item) => item.id === product.id)

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      // In a real app, you'd show an error message
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images[0] || "/placeholder.svg",
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    })
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.images[0] || "/placeholder.svg",
        category: product.category,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-10" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-300 cursor-zoom-in",
                  isZoomed && "scale-150",
                )}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              {hasDiscount && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                  -{discountPercentage}%
                </Badge>
              )}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-5 w-5 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Thumbnail Grid */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "aspect-square rounded-md overflow-hidden border-2 transition-colors",
                      selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground",
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
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h1 className="text-2xl font-bold text-balance">{product.name}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={cn(isInWishlist && "text-red-500 hover:text-red-600")}
                >
                  <Heart className={cn("h-5 w-5", isInWishlist && "fill-current")} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {stockStatus}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">${displayPrice.toLocaleString()}</span>
                {hasDiscount && (
                  <span className="text-xl text-muted-foreground line-through">${product.price.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground text-pretty">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Fabric:</span>
                <span className="ml-2 text-muted-foreground">{product.fabric}</span>
              </div>
              <div>
                <span className="font-medium">Gender:</span>
                <span className="ml-2 text-muted-foreground">{product.gender.join(", ")}</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Size *</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={!selectedSize}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  size="lg"
                  onClick={() => {
                    handleAddToCart()
                    // In real app, would redirect to checkout
                  }}
                  disabled={!selectedSize}
                >
                  Buy Now
                </Button>
              </div>

              <Button variant="ghost" className="w-full" size="lg" onClick={handleWishlistToggle}>
                <Heart className={cn("h-4 w-4 mr-2", isInWishlist && "fill-current")} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
