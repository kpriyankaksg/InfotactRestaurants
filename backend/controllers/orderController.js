
import mongoose from "mongoose";
import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, restaurants, totalAmount } = req.body;

    const order = new Order({
      userId,
      restaurants, // array of restaurants with items + tables
      totalAmount,
      status: "Pending"
    });
    await order.save();
    //extra...........
     // Broadcast to all connected merchants
    const io = req.app.get("io");
    console.log("Emitting newOrder for:", order._id);
    io.emit("newOrder", order);
//................................
    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};


// Get order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("restaurants.restaurantId"); // only populate refs

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("restaurants.restaurantId"); // ✅ only populate refs

    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err); // ⭐ log full error
    res.status(500).json({ message: "Error fetching user orders", error: err.message });
  }
};


// Get daily revenue for a restaurant
export const getDailyRevenue = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const revenue = await Order.aggregate([
      {
        $match: {
          "restaurants.restaurantId": new mongoose.Types.ObjectId(restaurantId), // match restaurant
          status: "Paid",                           // only paid orders
          createdAt: { $gte: today }                // only today
        }
        
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);
    console.log("Matched orders:", revenue);


    res.json({ dailyRevenue: revenue[0]?.total || 0 });
  } catch (err) {
    console.error("Error calculating revenue:", err);
    res.status(500).json({ message: "Error calculating revenue", error: err.message });
  }
};
// get yesterday revenue
export const getYesterdayRevenue = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const revenue = await Order.aggregate([
      {
        $match: {
          "restaurants.restaurantId": new mongoose.Types.ObjectId(restaurantId),
          status: "Paid",
          createdAt: { $gte: yesterday, $lt: today }
        }
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({ yesterdayRevenue: revenue[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: "Error calculating yesterday's revenue" });
  }
};



