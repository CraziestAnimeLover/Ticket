import express from "express";
import { bookTicket, getMyBookings } from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, bookTicket);
router.get("/my", verifyToken, getMyBookings);

export default router;
