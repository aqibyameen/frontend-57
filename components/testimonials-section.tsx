"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/customer-avatar-asian-woman-smiling.jpg",
    rating: 5,
    review:
      "Amazing quality t-shirts! The anime designs are so detailed and the fabric is incredibly soft. Will definitely order again!",
    product: "Anime Collection",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "/customer-avatar-black-man-casual.jpg",
    rating: 5,
    review:
      "The gaming tees are perfect! Great fit, vibrant colors, and the designs are exactly what I was looking for. Fast shipping too!",
    product: "Gaming Tees",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "/customer-avatar-latina-woman-professional.jpg",
    rating: 4,
    review:
      "Love the minimalist designs. They're clean, stylish, and go with everything. The oversized fit is exactly what I wanted.",
    product: "Minimalist Collection",
    verified: true,
  },
  {
    id: 4,
    name: "Alex Kim",
    avatar: "/customer-avatar-asian-man-trendy.jpg",
    rating: 5,
    review:
      "Streetwear collection is fire! The quality is top-notch and the designs are unique. TeeVibe has become my go-to store.",
    product: "Streetwear",
    verified: true,
  },
  {
    id: 5,
    name: "Jessica Taylor",
    avatar: "/customer-avatar-white-woman-casual.jpg",
    rating: 5,
    review:
      "Excellent customer service and the t-shirts exceeded my expectations. The fabric quality is amazing for the price point.",
    product: "Round Neck Collection",
    verified: true,
  },
  {
    id: 6,
    name: "David Park",
    avatar: "/customer-avatar-asian-man-glasses.jpg",
    rating: 4,
    review:
      "Great selection and fast delivery. The sizing chart was accurate and the t-shirt fits perfectly. Highly recommend!",
    product: "Trending Collection",
    verified: true,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't just take our word for it - hear from thousands of satisfied customers who love our t-shirts
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-muted-foreground text-pretty leading-relaxed">"{testimonial.review}"</p>

                  {/* Customer Info */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <Badge variant="secondary" className="text-xs px-2 py-0">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Purchased: {testimonial.product}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Join thousands of happy customers</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>4.8/5 based on 2,847 reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
