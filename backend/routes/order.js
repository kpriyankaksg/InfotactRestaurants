import express from "express";
import { createOrder, getOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

// router.post("/", createOrder);
// router.get("/:id", getOrder);
// router.get("/user/:userId", getUserOrders);

router.post("/", createOrder);

// more specific route first
router.get("/user/:userId", getUserOrders);

// generic route after
router.get("/:id", getOrder);

export default router;
