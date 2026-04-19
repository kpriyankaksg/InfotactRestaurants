import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

import Order from "./models/order.js";
import authRoutes from "./routes/auth.js";
import discoverRoutes from "./routes/discovery.js";
import itemRoutes from "./routes/item.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/review.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // single server instance

// Attach socket.io to the same server
const io = new Server(server, {
   cors: {
    origin: "http://localhost:3000", // your React frontend
    methods: ["GET", "POST"]
  }
 });
 app.set("io", io); // make io available in routes
 io.on("connection",async (socket) => {
  console.log("Client connected:", socket.id);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const todaysOrders = await Order.find({ createdAt: { $gte: today } })
      .populate("restaurants.restaurantId");
    socket.emit("recentOrders", todaysOrders);
  } catch (err) {
    console.error("Error fetching today's orders:", err.message);
  }


 //socket.emit("newOrder", { test: true });

  // socket.on("test", (msg) => {
  //   console.log("Got test:", msg);
 // });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/discover", discoverRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/items", itemRoutes);
// app.use("/api/admin", adminRoutes);


// MongoDB connection
mongoose.connect(process.env.ATLAS_URL)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));