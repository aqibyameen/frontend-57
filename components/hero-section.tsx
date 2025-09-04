"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const heroSlides = [
  {
    id: 1,
    title: "Winter Collection 2025",
    subtitle: "Stay warm, look cool",
    description: "Discover our premium winter t-shirt collection featuring cozy fabrics and trending designs",
    cta: "Shop Winter Collection",
    image: "/winter-t-shirt-collection-cozy-warm-clothing.jpg",
    bgGradient: "from-blue-600/20 to-purple-600/20",
  },
  {
    id: 2,
    title: "Anime Collection",
    subtitle: "Express your passion",
    description: "Exclusive anime-inspired designs from your favorite series and characters",
    cta: "Explore Anime Tees",
    image: "/anime-t-shirt-collection-colorful-manga-designs.jpg",
    bgGradient: "from-pink-500/20 to-orange-500/20",
  },
  {
    id: 3,
    title: "Gaming Legends",
    subtitle: "Level up your style",
    description: "Premium gaming t-shirts for true gamers and esports enthusiasts",
    cta: "Shop Gaming Tees",
    image: "/gaming-t-shirt-collection-esports-retro-gaming.jpg",
    bgGradient: "from-green-500/20 to-teal-500/20",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden bg-muted/30">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentSlideData.image || "/placeholder.svg"}
          alt={currentSlideData.title}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        <div
          className={cn("absolute inset-0 bg-gradient-to-r transition-all duration-700", currentSlideData.bgGradient)}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-wider uppercase opacity-90">{currentSlideData.subtitle}</p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">{currentSlideData.title}</h1>
            </div>

            <p className="text-lg md:text-xl opacity-90 text-pretty max-w-lg">{currentSlideData.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
              >
                {currentSlideData.cta}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-transparent"
              >
                View All Collections
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
        />
      </div>
    </section>
  )
}
