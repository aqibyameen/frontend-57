/** @format */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // default is normal user
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

// Reuse model if already declared (for hot-reloading in Next.js)
export default mongoose.models.User || mongoose.model("User", UserSchema);
