
//require("dotenv").config(); // Load environment variables
import cors from "cors";
import { config } from 'dotenv'; // Import the config function
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/review.js";

config();
//const authRoutes= require("./routes/auth");
//const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

//const crypto = require('crypto');
// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);
// Window.localStorage.setItem("JWT_Token",secret);


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);


 await mongoose.connect("mongodb+srv://kpriyankaksg:ndyIgQ7srvtlPA8c@cluster0.l38jwjc.mongodb.net/Restaurants?appName=Cluster0")
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
   
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
   

  });


app.listen(PORT,()=> console.log(`Server running on port" ${PORT}`))

