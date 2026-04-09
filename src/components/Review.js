
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Review = () => {
  const [reviewText, setReviewText] = useState("");
  const [mediaAttached, setMediaAttached] = useState(false);
  const [points, setPoints] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [rating, setRating]= useState("");
  const location=useLocation();
  const userId= location.state?.userId;
  const restaurantId= location.state?.resId;
  const orderHistory=location.state?.items;
  console.log(restaurantId);

  const handleSubmit = async (e) => {
    //console.log(userId,restaurantId,orderHistory,reviewText,mediaAttached);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/reviews/submitReview", {
        userId: userId,
        restaurantId: restaurantId,
        reviewText: reviewText,
        mediaAttached: mediaAttached,
        orderHistory: orderHistory,
         rating: rating
      });
      console.log(res.data);
      setPoints(res.data.points);
      setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Write a Review</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience..."
          className="w-full border rounded p-3"
          rows={5}
        />
        <label className="block mb-2">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value="">Select rating</option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐ 2</option>
            <option value="3">⭐ 3</option>
            <option value="4">⭐ 4</option>
            <option value="5">⭐ 5</option>
          </select>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={mediaAttached}
            onChange={() => setMediaAttached(!mediaAttached)}
          />
          <label>Attach media (photo/video)</label>
        </div>


        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </form>

      {points !== null && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Your Review Score</h2>
          <p className="text-lg font-bold text-green-700">+{points} points earned!</p>

          {suggestions.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium">Suggested Keywords:</h3>
              <ul className="flex gap-2 mt-2">
                {suggestions.map((word, idx) => (
                  <li
                    key={idx}
                    className="bg-yellow-200 px-3 py-1 rounded-full text-sm"
                  >
                    {word}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Try adding these words to make your review more descriptive!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Review;