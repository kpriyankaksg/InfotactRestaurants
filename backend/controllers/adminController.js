
// // controllers/adminController.js
// import Restaurant from "../models/RestaurantsLists.js";
// import User from "../models/users.js";

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching users" });
//   }
// };

// export const getAllRestaurants = async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find({});
//     res.json(restaurants);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching restaurants" });
//   }
// };