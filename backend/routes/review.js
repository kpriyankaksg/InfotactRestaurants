import express from "express";
import RestaurantsLists from "../models/RestaurantsLists.js";
import Review from "../models/Review.js";
import { calculatePoints, suggestKeywords } from "../services/reviewEngine.js";

const router = express.Router();

router.post("/submitReview", async (req, res) => {
  try {
    const { userId, restaurantId, reviewText, mediaAttached, orderHistory,rating } = req.body;

    const keywords = ["delicious", "spicy", "fresh", "service", "ambience"]; // base keywords
    const points = calculatePoints(reviewText, keywords, mediaAttached);
    const suggestions = suggestKeywords(reviewText, orderHistory);

    const review = new Review({
      userId,
      restaurantId,
      text: reviewText,
      mediaAttached,
      points,
      suggestions,
      rating   
    });

    await review.save();
 // Recalculate average rating
    const agg = await Review.aggregate([
      { $match: { restaurantId: review.restaurantId } },
      { $group: { _id: "$restaurantId", avgRating: { $avg: "$rating" } } }
    ]);

    const avgRating = agg[0]?.avgRating || rating;

    await RestaurantsLists.findByIdAndUpdate(restaurantId, { rating: avgRating });

    res.json({ success: true, points, suggestions, avgRating });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;