
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


