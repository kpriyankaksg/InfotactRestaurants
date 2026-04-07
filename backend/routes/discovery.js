import express from "express";
import RestaurantsLists from "../models/RestaurantsLists.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lng, page = 1, limit = 10 } = req.query;

    const restaurants = await RestaurantsLists.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          distanceField: "distance",
          spherical: true
        }
      },
      {
        $addFields: {
          score: {
            $add: [
              { $multiply: [0.7, { $divide: [1, "$distance"] }] },
              { $multiply: [0.3, "$rating"] }
            ]
          }
        }
      },
      { $sort: { score: -1 } },
      { $skip: (page - 1) * parseInt(limit) },
      { $limit: parseInt(limit) }
    ]);

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Error discovering restaurants", error: err.message });
  }
});

export default router;