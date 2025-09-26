/** @format */

"use client";

import { useState } from "react";
import { Star, Heart, Pencil, Send, X } from "lucide-react";
import { toast } from "sonner";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, review, rating }),
      });

      const data = await res.json();
      if (res.ok) {
        setName("");
        setReview("");
        setRating(0);
        setShowForm(false);
        toast.success("Review submitted successfully!");
      } else {
        toast.error(data.error || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-8 py-8 space-y-6 text-center bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-md shadow-md">
      {/* Heart-touching Hook Line */}
      <h2 className="flex mx-auto items-center justify-center gap-2 text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
        <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
        Your words inspire us, your trust drives us
      </h2>
      <p className="text-gray-600 text-sm sm:text-base">
        Share your experience and help others feel confident in choosing us.
      </p>

      {/* Open Modal Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-transform transform hover:scale-105 text-sm sm:text-base"
        >
          <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Your Review
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg w-[90%] sm:w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
              Share Your Review
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />

              <textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-3 h-24 sm:h-28 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />

              {/* Rating stars */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className={`h-7 w-7 sm:h-9 sm:w-9 cursor-pointer transition-all duration-200 ${
                      i < rating
                        ? "fill-yellow-400 text-yellow-400 scale-110 drop-shadow-md"
                        : "text-gray-300 hover:text-yellow-400 hover:scale-110"
                    }`}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 sm:py-3 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
