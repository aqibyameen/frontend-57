/** @format */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Reviews";

// POST: create a new review
export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, review, rating } = await req.json();

    if (!name || !review || !rating) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newReview = new Review({ name, review, rating });
    await newReview.save();

    return NextResponse.json(
      { message: "Review saved successfully", review: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting review:", error);
    return NextResponse.json(
      { error: "Failed to save review" },
      { status: 500 }
    );
  }
}

// GET: fetch all reviews
export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
