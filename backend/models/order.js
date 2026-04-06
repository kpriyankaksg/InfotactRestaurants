// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    items: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // menu item id
        itemName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        category: { type: String }
      }
    ],
    tables: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // table id
        tableNumber: { type: Number, required: true },
        capacity: { type: Number, required: true }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 99
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);