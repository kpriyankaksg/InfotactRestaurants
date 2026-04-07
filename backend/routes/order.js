import express from "express";
import { createOrder, getOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.get("/user/:userId", getUserOrders);

export default router;
