/** @format */

import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) return;
  const mongoUri = process.env.MONGODB_URI!;
  try {
    await mongoose.connect(mongoUri!, {
      dbName: "nxtgenwear",
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};
