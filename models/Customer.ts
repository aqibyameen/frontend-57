/** @format */

import mongoose, { Schema, model, models } from "mongoose";

const CustomerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  userOrderId: { type: String, required: true }, // permanent tracking id
  createdAt: { type: Date, default: Date.now },
});

export default models.Customer || model("Customer", CustomerSchema);
