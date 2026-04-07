import express from "express";
import Review from "../models/Review.js";
import { calculatePoints, suggestKeywords } from "../services/reviewEngine.js";

const router = express.Router();

router.post("/submitReview", async (req, res) => {
  try {
    const { userId, restaurantId, reviewText, mediaAttached, orderHistory } = req.body;

    const keywords = ["delicious", "spicy", "fresh", "service", "ambience"]; // base keywords
    const points = calculatePoints(reviewText, keywords, mediaAttached);
    const suggestions = suggestKeywords(reviewText, orderHistory);

    const review = new Review({
      userId,
      restaurantId,
      text: reviewText,
      mediaAttached,
      points,
      suggestions
    });

    await review.save();

    res.json({ success: true, points, suggestions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;