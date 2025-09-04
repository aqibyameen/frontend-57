"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const categories = [
  {
    id: "anime",
    name: "Anime T-Shirts",
    description: "Express your favorite anime characters",
    image: "/anime-category-vibrant-character-designs.jpg",
    href: "/category/anime-t-shirts",
    color: "from-pink-500/20 to-purple-500/20",
    featured: true,
  },
  {
    id: "gaming",
    name: "Gaming Tees",
    description: "Level up your gaming style",
    image: "/gaming-category-retro-console-designs.jpg",
    href: "/category/gaming-tees",
    color: "from-green-500/20 to-teal-500/20",
    featured: true,
  },
  {
    id: "streetwear",
    name: "Streetwear",
    description: "Urban fashion meets comfort",
    image: "/streetwear-category-urban-fashion-style.jpg",
    href: "/category/streetwear",
    color: "from-orange-500/20 to-red-500/20",
    featured: true,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean, simple, elegant designs",
    image: "/minimalist-category-clean-simple-designs.jpg",
    href: "/category/minimalist",
    color: "from-gray-500/20 to-slate-500/20",
    featured: false,
  },
  {
    id: "oversized",
    name: "Oversized",
    description: "Comfort meets contemporary style",
    image: "/oversized-category-comfortable-loose-fit.jpg",
    href: "/category/oversized",
    color: "from-blue-500/20 to-indigo-500/20",
    featured: false,
  },
  {
    id: "trending",
    name: "Trending",
    description: "What's hot right now",
    image: "/trending-category-popular-current-styles.jpg",
    href: "/category/trending",
    color: "from-yellow-500/20 to-orange-500/20",
    featured: false,
  },
  {
    id: "round-neck",
    name: "Round Neck",
    description: "Classic comfort for everyone",
    image: "/round-neck-category-classic-comfortable-fit.jpg",
    href: "/category/round-neck",
    color: "from-emerald-500/20 to-green-500/20",
    featured: false,
  },
]

export function CategoriesSection() {
  const featuredCategories = categories.filter((cat) => cat.featured)
  const regularCategories = categories.filter((cat) => !cat.featured)

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our curated collections designed for every style and personality
          </p>
        </div>

        {/* Featured Categories - Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredCategories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} group-hover:opacity-80 transition-opacity duration-300`}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 text-balance">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-4 text-pretty">{category.description}</p>
                    <Button
                      variant="secondary"
                      className="self-start bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Regular Categories - Smaller Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {regularCategories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} group-hover:opacity-80 transition-opacity duration-300`}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                    <h3 className="text-lg font-semibold mb-1 text-balance">{category.name}</h3>
                    <p className="text-xs opacity-90 text-pretty">{category.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Categories CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
