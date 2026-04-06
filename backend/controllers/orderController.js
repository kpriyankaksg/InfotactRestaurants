
import Order from "../models/order.js";

// Create a new order (status = Pending)
export const createOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, tables, totalAmount } = req.body;

    const order = new Order({
      userId,
      restaurantId,
      items,
      tables,
      totalAmount,
      status: "Pending"
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

// Get order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId").populate("restaurantId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};