// models/Order.ts
import mongoose, { Schema, model, models } from "mongoose"

const OrderSchema = new Schema({
  id: { type: String, required: true }, // per-order id (changes every order)
  userOrderId: { type: String, required: true }, // permanent tracking id for user
  email: { type: String, required: true }, // root-level for fast querying

  items: [
    {
      id: String,
      name: String,
      price: Number,
      discountPrice: Number,
      quantity: Number,
      size: String,
      color: String,
      image: String,
    },
  ],

  subtotal: Number,
  shipping: Number,
  total: Number,

  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

  form: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },

  paymentMethod: { type: String, default: "cod" },
  createdAt: { type: Date, default: Date.now },
})

export default models.Order || model("Order", OrderSchema)
