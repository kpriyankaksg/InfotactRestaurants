import express from "express";
import { createOrder, getDailyRevenue, getOrder, getUserOrders, getYesterdayRevenue } from "../controllers/orderController.js";

const router = express.Router();

// router.post("/", createOrder);
// router.get("/:id", getOrder);
// router.get("/user/:userId", getUserOrders);

router.post("/", createOrder);

// more specific route first
router.get("/user/:userId", getUserOrders);

// generic route after
router.get("/:id", getOrder);

//.......extra.........
// New revenue route
router.get("/revenue/:restaurantId", getDailyRevenue);
router.get("/revenue/yesterday/:restaurantId", getYesterdayRevenue);


export default router;
