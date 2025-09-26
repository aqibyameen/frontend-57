/** @format */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, User } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export function TestimonialsSection() {
  const controls = useAnimation();
  const [reviews, setReviews] = useState<any[]>([]);

  const startScroll = () => {
    controls.start(
      { x: ["0%", "-100%"] },
      {
        repeat: Infinity,
        duration: 8, // slower smooth scroll
        ease: "linear",
      }
    );
  };

  // Fetch reviews from API
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));

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
            What Our Customers <span className="text-blue-500">Say</span> ✨
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don’t just take our word for it — read what real customers think
            about our collections.
          </p>
        </div>

        {/* Infinite Scrolling Row */}
        <div className="relative w-full overflow-hidden p-4 px-0">
          <motion.div
            className="flex gap-6"
            animate={controls}
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() => startScroll()}
          >
            {[...reviews, ...reviews].map((review, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Card
                  className="min-w-[320px] max-w-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                             bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white border border-white/20"
                >
                  <CardContent className="p-4 my-2 space-y-4">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "fill-yellow-300 text-yellow-300 drop-shadow-md"
                              : "text-white/50"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="italic leading-relaxed bg-white/20 p-3 rounded-lg text-sm">
                      “{review.review}”
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-12 h-12 rounded-full ring-2 ring-white/40 shadow-md flex items-center justify-center bg-white/20">
                        <User className="w-6 h-6 text-white/80" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-base">
                            {review.name}
                          </h4>
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0 bg-white/30 text-white border border-white/20"
                          >
                            Verified
                          </Badge>
                        </div>
                        <p className="text-xs text-white/70">
                          Posted on:{" "}
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
