
//require("dotenv").config(); // Load environment variables
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import discoverRoutes from "./routes/discovery.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/review.js";
dotenv.config();

// config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use("/api/discover", discoverRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);


//  await mongoose.connect("mongodb+srv://kpriyankaksg:ndyIgQ7srvtlPA8c@cluster0.l38jwjc.mongodb.net/Restaurants?appName=Cluster0")
await mongoose.connect(process.env.ATLAS_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
   
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
   
  });


app.listen(PORT,()=> console.log(`Server running on port" ${PORT}`))

