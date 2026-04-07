
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  text: { type: String, required: true },
  mediaAttached: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  suggestions: [String],
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", reviewSchema);