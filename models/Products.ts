/** @format */

import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  sizes: string[];
  gender: string[];
  price: number;
  discountPrice?: number;
  fabric: string;
  category: string;
  images: string[];
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    sizes: [String],
    gender: [String],
    price: { type: Number, required: true },
    discountPrice: Number,
    fabric: String,
    category: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
