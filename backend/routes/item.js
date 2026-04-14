
import express from "express";
import { updateItemStatus } from "../controllers/itemController.js";

const router = express.Router();

// PATCH /api/items/:id/status
router.patch("/:id/status", updateItemStatus);

export default router;