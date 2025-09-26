/** @format */

import ReviewForm from "@/components/reviewForm";
import { TestimonialsSection } from "@/components/testimonials-section";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-50">
      <ReviewForm />
      <TestimonialsSection />
    </div>
  );
};

export default page;
