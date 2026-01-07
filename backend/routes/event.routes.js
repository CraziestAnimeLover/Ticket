import express from "express";
import {
  createEvent,
  getAllEvents,
  getSingleEvent
} from "../controllers/eventController.js";

import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin only
router.post("/", verifyToken, isAdmin, createEvent);

// Public
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);

export default router;
