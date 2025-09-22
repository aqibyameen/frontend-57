/** @format */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, User } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Khan",
    rating: 5,
    review:
      "Bohat hi zabardast quality hai! Kapra soft hai aur design bilkul original lagte hain. Family bhi impressed ho gayi!",
    product: "Anime Collection",
    verified: true,
  },
  {
    id: 2,
    name: "Usman Ali",
    rating: 5,
    review:
      "Best gaming tees I’ve bought so far. Colors bilkul vibrant hain aur fitting perfect hai. Delivery bhi time par mil gayi.",
    product: "Gaming Tees",
    verified: true,
  },
  {
    id: 3,
    name: "Hira Fatima",
    rating: 4,
    review:
      "Minimalist collection is awesome! Simple designs but classy look dete hain. Oversized fit bhi bohat acha hai.",
    product: "Minimalist Collection",
    verified: true,
  },
  {
    id: 4,
    name: "Bilal Ahmed",
    rating: 5,
    review:
      "Streetwear tees are 🔥🔥 Kapra durable hai aur wash ke baad bhi shape waisi ki waisi rehti hai. Highly recommended!",
    product: "Streetwear",
    verified: true,
  },
  {
    id: 5,
    name: "Fatima Noor",
    rating: 5,
    review:
      "Customer service bohat cooperative tha. Size exchange karwaya aur process bohat smooth tha. T-shirts ki quality amazing hai.",
    product: "Round Neck Collection",
    verified: true,
  },
  {
    id: 6,
    name: "Hamza Sheikh",
    rating: 4,
    review:
      "Really happy with my purchase. Fabric comfortable hai aur fitting bilkul website ke size chart jaisi hai. 👍",
    product: "Trending Collection",
    verified: true,
  },
];
export function TestimonialsSection() {
  const controls = useAnimation();

  const startScroll = () => {
    controls.start(
      { x: ["0%", "-100%"] },
      {
        repeat: Infinity,
        duration: 10, // speed (increase for slower scroll)
        ease: "linear",
      }
    );
  };

  useEffect(() => {
    startScroll();
    return () => {
      controls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-10 bg-gradient-to-b from-muted/40 to-background overflow-hidden">
      <div className="container mx-auto px-2">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            What Our Customers Say ✨
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don’t just take our word for it — read what real customers in
            Pakistan think about our collections.
          </p>
        </div>

        {/* Infinite Scrolling Row */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={controls}
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() => startScroll()}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={index}
                className="min-w-[320px] max-w-sm border border-transparent bg-gradient-to-tr from-background to-muted/50 rounded-2xl shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-4 my-2 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-muted-foreground italic leading-relaxed bg-muted/30 p-3 rounded-lg">
                    “{testimonial.review}”
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-full ring-2 ring-primary shadow-md flex items-center justify-center bg-muted">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-base">
                          {testimonial.name}
                        </h4>
                        {testimonial.verified && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0 bg-primary/10 text-primary border border-primary/20"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Purchased: {testimonial.product}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Join thousands of happy customers across Pakistan
          </p>
          <div className="flex items-center justify-center gap-2 text-base text-muted-foreground">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-medium">4.8/5 based on 2,847 reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
