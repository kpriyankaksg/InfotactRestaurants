
import Order from "../models/order.js";

// Mock checkout flow
export const checkout = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    // Simulate payment gateway (always succeeds here)
    const paymentSuccess = true;

    if (paymentSuccess) {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: "Paid" },
        { new: true }
      );

      if (!order) return res.status(404).json({ message: "Order not found" });

      return res.json({ success: true, message: "Payment successful", order });
    } else {
      return res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};