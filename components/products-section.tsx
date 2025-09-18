/** @format */

"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Grid, List } from "lucide-react";

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

const Product: Product[] = [
  {
    id: "p1",
    name: "Classic White T-Shirt",
    description:
      "A timeless crew-neck t-shirt made with soft cotton fabric, perfect for casual wear.",
    sizes: ["S", "M", "L", "XL"],
    gender: ["Men", "Women"],
    price: 1200,
    discountPrice: 950,
    fabric: "100% Cotton",
    category: "T-Shirts",
    images: [
      "/images/products/white-tshirt-front.jpg",
      "/images/products/white-tshirt-back.jpg",
    ],
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-10T14:30:00Z",
  },
  {
    id: "p2",
    name: "Slim Fit Blue Jeans",
    description:
      "Stylish slim-fit denim jeans with stretch for comfort and durability.",
    sizes: ["30", "32", "34", "36"],
    gender: ["Men"],
    price: 3500,
    discountPrice: 2999,
    fabric: "Denim (98% Cotton, 2% Spandex)",
    category: "Jeans",
    images: [
      "/images/products/blue-jeans-front.jpg",
      "/images/products/blue-jeans-back.jpg",
    ],
    createdAt: "2025-08-15T09:20:00Z",
    updatedAt: "2025-09-12T18:10:00Z",
  },
  {
    id: "p3",
    name: "Floral Summer Dress",
    description:
      "Lightweight sleeveless dress with floral patterns, ideal for summer outings.",
    sizes: ["S", "M", "L"],
    gender: ["Women"],
    price: 4200,
    discountPrice: 3699,
    fabric: "Rayon",
    category: "Dresses",
    images: [
      "/images/products/floral-dress-front.jpg",
      "/images/products/floral-dress-back.jpg",
    ],
    createdAt: "2025-07-25T12:00:00Z",
    updatedAt: "2025-09-14T11:15:00Z",
  },
  {
    id: "p4",
    name: "Running Sneakers",
    description:
      "Lightweight, breathable sneakers designed for comfort and performance during runs.",
    sizes: ["7", "8", "9", "10", "11"],
    gender: ["Men", "Women"],
    price: 6500,
    discountPrice: 5799,
    fabric: "Mesh + Rubber Sole",
    category: "Footwear",
    images: [
      "/images/products/sneakers-front.jpg",
      "/images/products/sneakers-side.jpg",
    ],
    createdAt: "2025-06-18T16:40:00Z",
    updatedAt: "2025-09-10T19:00:00Z",
  },
  {
    id: "p5",
    name: "Leather Jacket",
    description:
      "Premium genuine leather jacket with zip closure and multiple pockets.",
    sizes: ["M", "L", "XL"],
    gender: ["Men"],
    price: 12000,
    discountPrice: 9999,
    fabric: "100% Genuine Leather",
    category: "Jackets",
    images: [
      "/images/products/leather-jacket-front.jpg",
      "/images/products/leather-jacket-back.jpg",
    ],
    createdAt: "2025-05-05T13:10:00Z",
    updatedAt: "2025-09-11T20:20:00Z",
  },
];

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  console.log("Products:", products);
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = Product; // Replace with actual fetch call if needed
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by gender
    if (selectedGender !== "all") {
      filtered = filtered.filter((product) =>
        product.gender.some(
          (g) => g.toLowerCase() === selectedGender.toLowerCase()
        )
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case "price-high":
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedGender, sortBy]);

  const categories = [...new Set(products.map((p) => p.category))];
  const genders = [...new Set(products.flatMap((p) => p.gender))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted aspect-square rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Discover our collection of {products.length} premium products
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedGender !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Gender: {selectedGender}
                <button
                  onClick={() => setSelectedGender("all")}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedGender("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
