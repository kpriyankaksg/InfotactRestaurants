
import RestaurantsLists from "../models/RestaurantsLists.js";
import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { userId, restaurantId, text, rating, mediaAttached, points, suggestions } = req.body;

    // Save review
    const review = new Review({ userId, restaurantId, text, rating, mediaAttached, points, suggestions });
    await review.save();

    // Recalculate average rating
    const agg = await Review.aggregate([
      { $match: { restaurantId: review.restaurantId } },
      { $group: { _id: "$restaurantId", avgRating: { $avg: "$rating" } } }
    ]);

    const avgRating = agg[0]?.avgRating || rating;

    await RestaurantsLists.findByIdAndUpdate(restaurantId, { rating: avgRating });

    res.status(201).json({ message: "Review added", review, avgRating });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};